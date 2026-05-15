import { findAlternative } from "../data/alternatives";

export type Ecosystem = "npm" | "pypi";

export type MaintenanceSignal =
  | "active"
  | "slowing"
  | "stale"
  | "abandoned"
  | "unknown";

export interface GitHubInfo {
  owner: string;
  repo: string;
  archived: boolean;
  pushedAt: string | null;
  lastCommitAgeDays: number | null;
  openIssues: number | null;
}

export interface Verdict {
  ecosystem: Ecosystem;
  package: string;
  found: boolean;
  /** true if at least one upstream feed failed/timed out — data is incomplete. */
  partial: boolean;
  latestVersion: string | null;
  deprecated: boolean;
  deprecatedReason: string | null;
  yanked: boolean;
  lastReleaseAt: string | null;
  lastReleaseAgeDays: number | null;
  repositoryUrl: string | null;
  github: GitHubInfo | null;
  vulnCount: number | null;
  maintenance: MaintenanceSignal;
  suggestedAlternative: { name: string; reason: string } | null;
  checkedAt: string;
  /** which upstreams answered successfully (false = failed/timed out/not attempted). */
  sources: { registry: boolean; github: boolean; osv: boolean };
}

const DAY_MS = 86_400_000;
const TIMEOUT_MS = 6_000;

function ageDays(iso: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.round((Date.now() - t) / DAY_MS));
}

/** fetch with a hard ~6s timeout; resolves to null on ANY failure (never throws). */
async function safeFetch(
  url: string,
  init?: RequestInit,
): Promise<Response | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      headers: {
        "User-Agent": "freshdeps/0.1 (+https://freshdeps.vercel.app)",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** PEP 503 normalization: lowercase, collapse runs of [-_.] into a single '-'. */
export function normalizePypiName(name: string): string {
  return name.trim().toLowerCase().replace(/[-_.]+/g, "-");
}

/**
 * Tolerantly parse owner/repo from a repository URL.
 * Handles: git+https://, git://, ssh git@github.com:o/r, trailing .git,
 * monorepo subdir paths (github.com/o/r/tree/main/packages/x).
 */
export function parseGitHub(
  url: string | null | undefined,
): { owner: string; repo: string } | null {
  if (!url) return null;
  let s = url.trim();
  s = s.replace(/^git\+/, "");
  // ssh form: git@github.com:owner/repo(.git)
  const ssh = s.match(/git@github\.com:([^/]+)\/([^/#]+?)(?:\.git)?(?:[/#].*)?$/i);
  if (ssh) return { owner: ssh[1], repo: ssh[2] };
  // any URL containing github.com/owner/repo[...]
  const m = s.match(
    /github\.com[/:]([^/\s]+)\/([^/\s#?]+?)(?:\.git)?(?:[/#?].*)?$/i,
  );
  if (m) {
    const owner = m[1];
    const repo = m[2].replace(/\.git$/i, "");
    if (owner && repo) return { owner, repo };
  }
  return null;
}

/**
 * Maintenance verdict. CONSERVATIVE BY DESIGN (architecture-audit P0):
 * a missing/failed signal must never read as "alive". If we have NO real
 * activity data (no release date AND no commit date) the answer is "unknown",
 * never "active".
 *
 * Thresholds (most-recent of last-release / last-commit, in days):
 *  - archived || deprecated || yanked            -> abandoned (hard signal)
 *  - no release date AND no commit date          -> unknown   (no evidence)
 *  - <= 180  (~6mo)                              -> active
 *  - <= 365  (~12mo)                             -> slowing
 *  - <= 730  (~24mo)                             -> stale
 *  - >  730  (~24mo, no release AND no commit)   -> abandoned
 */
export function computeMaintenance(input: {
  archived: boolean;
  deprecated: boolean;
  yanked: boolean;
  lastReleaseAgeDays: number | null;
  lastCommitAgeDays: number | null;
}): MaintenanceSignal {
  if (input.archived || input.deprecated || input.yanked) return "abandoned";
  const r = input.lastReleaseAgeDays;
  const c = input.lastCommitAgeDays;
  if (r === null && c === null) return "unknown";
  const recent = Math.min(r ?? Infinity, c ?? Infinity);
  if (recent <= 180) return "active";
  if (recent <= 365) return "slowing";
  if (recent <= 730) return "stale";
  return "abandoned";
}

interface NpmResult {
  found: boolean;
  ok: boolean; // registry answered (not a network/timeout failure)
  latestVersion: string | null;
  deprecated: boolean;
  deprecatedReason: string | null;
  lastReleaseAt: string | null;
  repositoryUrl: string | null;
}

async function fetchNpm(pkg: string): Promise<NpmResult> {
  const blank: NpmResult = {
    found: false,
    ok: false,
    latestVersion: null,
    deprecated: false,
    deprecatedReason: null,
    lastReleaseAt: null,
    repositoryUrl: null,
  };
  // URL-encode the slash in @scope/name -> @scope%2Fname
  const encoded = pkg.startsWith("@")
    ? pkg.replace("/", "%2F")
    : encodeURIComponent(pkg);
  const res = await safeFetch(`https://registry.npmjs.org/${encoded}`);
  if (!res) return blank; // network/timeout: cannot confirm absence
  if (res.status === 404) return { ...blank, ok: true, found: false };
  if (!res.ok) return blank;
  let data: any;
  try {
    data = await res.json();
  } catch {
    return blank;
  }
  const latest: string | null = data?.["dist-tags"]?.latest ?? null;
  const manifest = latest ? data?.versions?.[latest] : undefined;
  const depField = manifest?.deprecated ?? data?.deprecated;
  const deprecated =
    typeof depField === "string" ? depField.length > 0 : Boolean(depField);
  const lastReleaseAt: string | null =
    (latest && data?.time?.[latest]) || data?.time?.modified || null;
  const repoUrl: string | null =
    manifest?.repository?.url ??
    (typeof manifest?.repository === "string" ? manifest.repository : null) ??
    data?.repository?.url ??
    (typeof data?.repository === "string" ? data.repository : null) ??
    null;
  return {
    found: true,
    ok: true,
    latestVersion: latest,
    deprecated,
    deprecatedReason: typeof depField === "string" ? depField : null,
    lastReleaseAt,
    repositoryUrl: repoUrl,
  };
}

interface PypiResult {
  found: boolean;
  ok: boolean;
  latestVersion: string | null;
  yanked: boolean;
  lastReleaseAt: string | null;
  repositoryUrl: string | null;
}

async function fetchPypi(pkg: string): Promise<PypiResult> {
  const blank: PypiResult = {
    found: false,
    ok: false,
    latestVersion: null,
    yanked: false,
    lastReleaseAt: null,
    repositoryUrl: null,
  };
  const name = normalizePypiName(pkg);
  const res = await safeFetch(
    `https://pypi.org/pypi/${encodeURIComponent(name)}/json`,
  );
  if (!res) return blank;
  if (res.status === 404) return { ...blank, ok: true, found: false };
  if (!res.ok) return blank;
  let data: any;
  try {
    data = await res.json();
  } catch {
    return blank;
  }
  const info = data?.info ?? {};
  const version: string | null = info.version ?? null;
  // PyPI has no "deprecated" flag; yanked is the closest hard signal.
  const files: any[] = (version && data?.releases?.[version]) || data?.urls || [];
  const yanked =
    Array.isArray(files) &&
    files.length > 0 &&
    files.every((f) => f?.yanked === true);
  let lastReleaseAt: string | null = null;
  for (const f of files) {
    const t: string | undefined = f?.upload_time_iso_8601 ?? f?.upload_time;
    if (t && (!lastReleaseAt || Date.parse(t) > Date.parse(lastReleaseAt))) {
      lastReleaseAt = t;
    }
  }
  // repo url: prefer project_urls entries that look like source, else home_page
  let repoUrl: string | null = null;
  const purls: Record<string, string> = info.project_urls ?? {};
  if (purls && typeof purls === "object") {
    const keys = Object.keys(purls);
    const pref =
      keys.find((k) => /source|repository|code/i.test(k)) ??
      keys.find((k) => /github\.com/i.test(purls[k])) ??
      keys.find((k) => /home|homepage/i.test(k));
    if (pref) repoUrl = purls[pref];
  }
  if (!repoUrl && typeof info.home_page === "string" && info.home_page) {
    repoUrl = info.home_page;
  }
  return {
    found: true,
    ok: true,
    latestVersion: version,
    yanked,
    lastReleaseAt,
    repositoryUrl: repoUrl,
  };
}

async function fetchGitHub(
  owner: string,
  repo: string,
): Promise<GitHubInfo | null> {
  const token = process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await safeFetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers },
  );
  if (!res || !res.ok) return null;
  let data: any;
  try {
    data = await res.json();
  } catch {
    return null;
  }
  const pushedAt: string | null = data?.pushed_at ?? null;
  // best-effort release cadence probe (optional, non-blocking on failure)
  void safeFetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`,
    { headers },
  ).catch(() => null);
  return {
    owner,
    repo,
    archived: Boolean(data?.archived),
    pushedAt,
    lastCommitAgeDays: ageDays(pushedAt),
    openIssues:
      typeof data?.open_issues_count === "number"
        ? data.open_issues_count
        : null,
  };
}

async function fetchOsv(
  ecosystem: Ecosystem,
  pkg: string,
): Promise<number | null> {
  const osvEco = ecosystem === "npm" ? "npm" : "PyPI"; // EXACT casing
  const name = ecosystem === "pypi" ? normalizePypiName(pkg) : pkg;
  const res = await safeFetch("https://api.osv.dev/v1/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ package: { name, ecosystem: osvEco } }),
  });
  if (!res || !res.ok) return null;
  try {
    const data: any = await res.json();
    return Array.isArray(data?.vulns) ? data.vulns.length : 0;
  } catch {
    return null;
  }
}

function notFoundVerdict(ecosystem: Ecosystem, pkg: string): Verdict {
  return {
    ecosystem,
    package: pkg,
    found: false,
    partial: false,
    latestVersion: null,
    deprecated: false,
    deprecatedReason: null,
    yanked: false,
    lastReleaseAt: null,
    lastReleaseAgeDays: null,
    repositoryUrl: null,
    github: null,
    vulnCount: null,
    maintenance: "unknown",
    suggestedAlternative: findAlternative(ecosystem, pkg),
    checkedAt: new Date().toISOString(),
    sources: { registry: true, github: false, osv: false },
  };
}

export async function getVerdict(
  ecosystem: Ecosystem,
  pkg: string,
): Promise<Verdict> {
  const reg = ecosystem === "npm" ? await fetchNpm(pkg) : await fetchPypi(pkg);

  // Explicit 404 -> clean not-found. (Network failure does NOT mean absent.)
  if (reg.ok && !reg.found) {
    return notFoundVerdict(ecosystem, pkg);
  }

  const registryOk = reg.ok;
  const repositoryUrl = reg.repositoryUrl;
  const gh = parseGitHub(repositoryUrl);

  const [github, vulnCount] = await Promise.all([
    gh ? fetchGitHub(gh.owner, gh.repo) : Promise.resolve(null),
    fetchOsv(ecosystem, pkg),
  ]);

  const deprecated = ecosystem === "npm" ? (reg as NpmResult).deprecated : false;
  const deprecatedReason =
    ecosystem === "npm" ? (reg as NpmResult).deprecatedReason : null;
  const yanked = ecosystem === "pypi" ? (reg as PypiResult).yanked : false;
  const lastReleaseAt = reg.lastReleaseAt;
  const lastReleaseAgeDays = ageDays(lastReleaseAt);

  const githubAttemptedAndFailed = gh !== null && github === null;
  // partial if: registry call itself failed, OR a github repo existed but
  // its fetch failed, OR OSV failed. Any missing signal => caution.
  const partial =
    !registryOk || githubAttemptedAndFailed || vulnCount === null;

  const maintenance = computeMaintenance({
    archived: github?.archived ?? false,
    deprecated,
    yanked,
    lastReleaseAgeDays,
    lastCommitAgeDays: github?.lastCommitAgeDays ?? null,
  });

  return {
    ecosystem,
    package: pkg,
    found: true,
    partial,
    latestVersion: reg.latestVersion,
    deprecated,
    deprecatedReason,
    yanked,
    lastReleaseAt,
    lastReleaseAgeDays,
    repositoryUrl,
    github,
    vulnCount,
    maintenance,
    suggestedAlternative: findAlternative(ecosystem, pkg),
    checkedAt: new Date().toISOString(),
    sources: {
      registry: registryOk,
      github: github !== null,
      osv: vulnCount !== null,
    },
  };
}
