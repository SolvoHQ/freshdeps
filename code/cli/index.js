#!/usr/bin/env node
// freshdeps-cli — zero-install dead-dependency + migration-recipe scanner.
// Reuses the live freshdeps verdict API exclusively. No local corpus, no
// extra data sources, no runtime dependencies.
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, resolve } from "node:path";

const API_BASE =
  process.env.FRESHDEPS_API_BASE ?? "https://freshdeps.vercel.app";
const UA = "freshdeps-cli/0.1";
const REQ_TIMEOUT_MS = 8000;
const CONCURRENCY = 8;

/** Same instrumentation contract as the MCP/web app (console + GoatCounter).
 *  Fire-and-forget — must never break or block the CLI. */
function trackEvent(name, path) {
  try {
    console.error(
      `[freshdeps-event] ${JSON.stringify({
        ts: new Date().toISOString(),
        event: name,
        path,
      })}`,
    );
  } catch {
    /* never break the tool on logging */
  }
  const code = process.env.GOATCOUNTER_CODE;
  if (!code) return;
  const url = `https://${code}.goatcounter.com/count?p=${encodeURIComponent(
    path,
  )}&t=${encodeURIComponent(name)}`;
  fetch(url, { method: "GET", headers: { "User-Agent": UA } }).catch(() => {});
}

const HELP = `freshdeps — zero-install dead-dependency + migration-recipe scanner

Scans a repo's npm/PyPI manifests, asks the live freshdeps verdict API which
deps are dead/deprecated/abandoned, and prints the hand-verified migration
recipe to fix each one. CI gate: non-zero exit when dead deps are found.

USAGE
  npx -y github:SolvoHQ/freshdeps-cli [path] [flags]
  freshdeps [path] [flags]

  [path]        directory to scan (default ".")

FLAGS
  --json        machine-readable JSON output
  --no-fail     always exit 0 even if dead deps are found
  --help        show this help

MANIFESTS DETECTED
  package.json        (npm: deps/devDeps/optionalDeps/peerDeps)
  requirements.txt    (pypi)
  pyproject.toml      (pypi: PEP 621 + Poetry)

EXIT CODES
  0   no dead deps (or --no-fail)
  1   >=1 dead dependency found
  2   unexpected internal error

ENV
  FRESHDEPS_API_BASE   verdict API base (default https://freshdeps.vercel.app)
  GOATCOUNTER_CODE     optional analytics code (fire-and-forget pings)

NOTE
  This is NOT a generic SCA/SBOM/CVE/license scanner. It only reports what the
  freshdeps API returns — it never invents or infers a recipe or alternative.`;

function parseArgs(argv) {
  const flags = { json: false, help: false, noFail: false };
  let path = ".";
  let pathSet = false;
  for (const a of argv) {
    if (a === "--json") flags.json = true;
    else if (a === "--help" || a === "-h") flags.help = true;
    else if (a === "--no-fail") flags.noFail = true;
    else if (!a.startsWith("-") && !pathSet) {
      path = a;
      pathSet = true;
    }
  }
  return { path, flags };
}

// ---------- manifest parsing ----------

function parsePackageJson(file) {
  const out = [];
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return out;
  }
  for (const field of [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
  ]) {
    const obj = data?.[field];
    if (obj && typeof obj === "object") {
      for (const name of Object.keys(obj)) {
        if (name) out.push({ ecosystem: "npm", name });
      }
    }
  }
  return out;
}

/** Extract a bare PyPI package name from a requirement spec fragment.
 *  Stops at the first version/marker/extras delimiter. */
function barePyName(spec) {
  let s = spec.trim();
  if (!s) return null;
  // strip extras: pkg[extra1,extra2]
  const br = s.indexOf("[");
  if (br !== -1) s = s.slice(0, br);
  // name = leading run before any of = < > ~ ! ; space
  const m = s.match(/^[^=<>~!;\s]+/);
  if (!m) return null;
  const name = m[0].trim();
  return name || null;
}

function parseRequirementsTxt(file) {
  const out = [];
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return out;
  }
  for (let raw of text.split(/\r?\n/)) {
    // strip inline comments
    const hash = raw.indexOf("#");
    if (hash !== -1) raw = raw.slice(0, hash);
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("-")) continue; // -r, -e, --hash, etc.
    if (/^[a-z]+\+/i.test(line) || /:\/\//.test(line)) continue; // git+/url
    const name = barePyName(line);
    if (name) out.push({ ecosystem: "pypi", name });
  }
  return out;
}

/** Tolerant, dependency-free pyproject.toml parse. Handles PEP 621
 *  [project] dependencies/optional-dependencies arrays (incl. multi-line)
 *  and Poetry [tool.poetry(.group.*).dependencies] tables. */
function parsePyproject(file) {
  const out = [];
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return out;
  }
  const lines = text.split(/\r?\n/);

  const addPy = (name) => {
    if (!name) return;
    const n = name.trim();
    if (!n || n.toLowerCase() === "python") return;
    out.push({ ecosystem: "pypi", name: n });
  };

  // (a) PEP 621 array-style: dependencies = [ "foo>=1", ... ] possibly spanning
  // multiple lines. Also optional-dependencies = { grp = [ "x" ] }.
  // We scan for the start of a dependencies/optional-dependencies array and
  // collect quoted strings until the matching closing bracket.
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (
      /^\s*(dependencies|optional-dependencies)\b/.test(l) &&
      l.includes("[")
    ) {
      let buf = l.slice(l.indexOf("["));
      let depth = (buf.match(/\[/g) || []).length -
        (buf.match(/\]/g) || []).length;
      let j = i;
      while (depth > 0 && j + 1 < lines.length) {
        j++;
        buf += "\n" + lines[j];
        depth += (lines[j].match(/\[/g) || []).length -
          (lines[j].match(/\]/g) || []).length;
      }
      for (const q of buf.matchAll(/["']([^"']+)["']/g)) {
        const name = barePyName(q[1]);
        if (name) addPy(name);
      }
      i = j;
    }
  }

  // (b) Poetry table-style: [tool.poetry.dependencies] /
  // [tool.poetry.group.<name>.dependencies] — each subsequent `key = ...`
  // line until the next [section] header is a dependency name.
  let inPoetryDeps = false;
  for (const raw of lines) {
    const l = raw.trim();
    const header = l.match(/^\[([^\]]+)\]\s*$/);
    if (header) {
      const sec = header[1].trim();
      inPoetryDeps =
        /^tool\.poetry\.dependencies$/.test(sec) ||
        /^tool\.poetry\.group\.[^.]+\.dependencies$/.test(sec);
      continue;
    }
    if (!inPoetryDeps) continue;
    if (!l || l.startsWith("#")) continue;
    const kv = l.match(/^["']?([A-Za-z0-9._-]+)["']?\s*=/);
    if (kv) addPy(kv[1]);
  }

  return out;
}

function discover(dir) {
  const found = [];
  let any = false;
  const pj = join(dir, "package.json");
  if (existsSync(pj)) {
    any = true;
    found.push(...parsePackageJson(pj));
  }
  const rt = join(dir, "requirements.txt");
  if (existsSync(rt)) {
    any = true;
    found.push(...parseRequirementsTxt(rt));
  }
  const pp = join(dir, "pyproject.toml");
  if (existsSync(pp)) {
    any = true;
    found.push(...parsePyproject(pp));
  }
  // de-dupe (ecosystem,name)
  const seen = new Set();
  const deps = [];
  for (const d of found) {
    const key = `${d.ecosystem}:${d.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deps.push(d);
  }
  return { any, deps };
}

// ---------- verdict fetching ----------

async function fetchVerdict(dep) {
  const url = `${API_BASE}/api/verdict?ecosystem=${encodeURIComponent(
    dep.ecosystem,
  )}&package=${encodeURIComponent(dep.name)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQ_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA },
    });
    if (!res.ok) {
      return { dep, error: `HTTP ${res.status}` };
    }
    const verdict = await res.json();
    return { dep, verdict };
  } catch (err) {
    const reason =
      err && err.name === "AbortError"
        ? `timeout after ${REQ_TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : String(err);
    return { dep, error: reason };
  } finally {
    clearTimeout(timer);
  }
}

/** Simple fixed-size concurrency pool. */
async function runPool(deps, limit, worker) {
  const results = new Array(deps.length);
  let idx = 0;
  async function next() {
    while (idx < deps.length) {
      const cur = idx++;
      results[cur] = await worker(deps[cur]);
    }
  }
  const workers = [];
  for (let i = 0; i < Math.min(limit, deps.length); i++) {
    workers.push(next());
  }
  await Promise.all(workers);
  return results;
}

// ---------- classification ----------

function isDead(v) {
  return (
    v &&
    v.found === true &&
    (v.maintenance === "abandoned" ||
      v.deprecated === true ||
      v.yanked === true ||
      (v.github && v.github.archived === true))
  );
}

function classify(results) {
  const dead = [];
  const unverified = []; // partial-but-not-dead, or found:false
  const unreachable = []; // network/HTTP failures
  for (const r of results) {
    const { dep, verdict, error } = r;
    if (error) {
      unreachable.push({ dep, reason: error });
      continue;
    }
    if (!verdict || verdict.found === false) {
      unverified.push({ dep, kind: "not-found" });
      continue;
    }
    if (isDead(verdict)) {
      const alt = verdict.suggestedAlternative;
      dead.push({
        dep,
        maintenance: verdict.maintenance,
        partial: verdict.partial === true,
        alt: alt
          ? {
              name: alt.name,
              reason: alt.reason,
              migration:
                typeof alt.migration === "string" && alt.migration.length
                  ? alt.migration
                  : null,
            }
          : null,
      });
      continue;
    }
    // not dead — but if partial we cannot certify it healthy
    if (verdict.partial === true) {
      unverified.push({ dep, kind: "partial" });
    }
    // else: genuinely healthy → not listed
  }
  return { dead, unverified, unreachable };
}

// ---------- output ----------

function humanReport(scanned, c) {
  const out = [];
  out.push(`freshdeps — scanned ${scanned} dependenc${scanned === 1 ? "y" : "ies"} via ${API_BASE}`);
  out.push("");

  if (c.dead.length === 0) {
    out.push("✓ No dead/deprecated/abandoned dependencies found.");
  } else {
    out.push(`✗ ${c.dead.length} dead dependenc${c.dead.length === 1 ? "y" : "ies"}:`);
    out.push("");
    for (const d of c.dead) {
      const partialNote = d.partial
        ? " ⚠ partial data (some upstream feed failed) — treat with caution"
        : "";
      out.push(`• ${d.dep.name} (${d.dep.ecosystem}) — maintenance: ${d.maintenance}${partialNote}`);
      if (d.alt && d.alt.migration) {
        out.push(`  ➜ FIX: replace ${d.dep.name} with ${d.alt.name}`);
        out.push(`     ${d.alt.migration}`);
        out.push(`     Why: ${d.alt.reason}`);
      } else if (d.alt) {
        out.push(
          `  dead — suggested: ${d.alt.name} (${d.alt.reason}) [no curated migration recipe]`,
        );
      } else {
        out.push(`  dead — no curated migration recipe; manual review needed`);
      }
      out.push("");
    }
  }

  if (c.unverified.length) {
    out.push("Could not fully verify (treat with caution, NOT counted as healthy):");
    for (const u of c.unverified) {
      if (u.kind === "not-found") {
        out.push(
          `  ⚠ ${u.dep.name} (${u.dep.ecosystem}) — not found on registry (private/internal/typo?)`,
        );
      } else {
        out.push(
          `  ⚠ ${u.dep.name} (${u.dep.ecosystem}) — partial data (some upstream feed failed)`,
        );
      }
    }
    out.push("");
  }

  if (c.unreachable.length) {
    out.push("Could not check (network/API — NOT counted as dead):");
    for (const e of c.unreachable) {
      out.push(`  ⚠ could not check ${e.dep.name} (${e.dep.ecosystem}): ${e.reason}`);
    }
    out.push("");
  }

  out.push(
    `freshdeps: ${c.dead.length} dead / ${scanned} scanned (${c.unreachable.length} unreachable)`,
  );
  return out.join("\n");
}

function jsonReport(scanned, c) {
  return JSON.stringify(
    {
      scanned,
      dead: c.dead.map((d) => ({
        ecosystem: d.dep.ecosystem,
        name: d.dep.name,
        maintenance: d.maintenance,
        partial: d.partial,
        alternative: d.alt ? d.alt.name : null,
        migration: d.alt ? d.alt.migration : null,
      })),
      unverified: c.unverified.map((u) => ({
        ecosystem: u.dep.ecosystem,
        name: u.dep.name,
        reason: u.kind,
      })),
      unreachable: c.unreachable.map((e) => ({
        ecosystem: e.dep.ecosystem,
        name: e.dep.name,
        reason: e.reason,
      })),
    },
    null,
    2,
  );
}

/** Best-effort GitHub Actions step summary — must never throw. */
function writeStepSummary(scanned, c) {
  const file = process.env.GITHUB_STEP_SUMMARY;
  if (!file) return;
  try {
    const md = [];
    md.push(`### freshdeps — dead dependency gate`);
    md.push("");
    md.push(`Scanned **${scanned}** deps · **${c.dead.length}** dead · ${c.unreachable.length} unreachable`);
    md.push("");
    if (c.dead.length) {
      md.push(`| Package | Ecosystem | Status | Fix |`);
      md.push(`| --- | --- | --- | --- |`);
      for (const d of c.dead) {
        const fix =
          d.alt && d.alt.migration
            ? `→ ${d.alt.name}: ${d.alt.migration.replace(/\|/g, "\\|")}`
            : d.alt
              ? `→ ${d.alt.name} (no curated recipe)`
              : `manual review needed`;
        md.push(
          `| \`${d.dep.name}\` | ${d.dep.ecosystem} | ${d.maintenance} | ${fix} |`,
        );
      }
    }
    appendFileSync(file, md.join("\n") + "\n");
  } catch {
    /* best-effort: never fail the run on summary write */
  }
}

// ---------- main ----------

async function main() {
  const { path, flags } = parseArgs(process.argv.slice(2));
  if (flags.help) {
    console.log(HELP);
    return 0;
  }

  trackEvent("cli_scan", "/cli/scan");

  const dir = resolve(path);
  const { any, deps } = discover(dir);
  if (!any) {
    console.log(
      `freshdeps: no package.json / requirements.txt / pyproject.toml found in ${dir} — nothing to scan.`,
    );
    return 0;
  }
  if (deps.length === 0) {
    console.log(`freshdeps: manifest(s) found in ${dir} but no dependencies declared.`);
    return 0;
  }

  const results = await runPool(deps, CONCURRENCY, fetchVerdict);
  const c = classify(results);

  if (flags.json) {
    console.log(jsonReport(deps.length, c));
  } else {
    console.log(humanReport(deps.length, c));
  }
  writeStepSummary(deps.length, c);

  // Anti-silent-degrade exit-code rationale:
  // Only DEAD deps gate CI. Unreachable/unverified deps are ALWAYS printed
  // (never silently swallowed) but do NOT fail the build — a flaky API or a
  // private package must not turn into a red pipeline. A genuine internal
  // crash is caught below and exits 2, so a bug can never masquerade as 0.
  if (c.dead.length > 0 && !flags.noFail) return 1;
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(
      `freshdeps: internal error — ${
        err instanceof Error ? err.stack || err.message : String(err)
      }`,
    );
    process.exit(2);
  });
