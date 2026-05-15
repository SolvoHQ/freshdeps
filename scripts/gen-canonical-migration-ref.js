#!/usr/bin/env node
/* Deterministic generator for the canonical dead-package migration reference.
   Renders the hand-verified corpus (code/data/alternatives.ts) into:
     - out/devto-body.md   (dev.to article body_markdown, ?ref=devto-deadpkg)
     - out/gist-body.md     (GitHub Gist canonical artifact, ?ref=gist-deadpkg)
   Zero transcription: every row comes from the corpus. */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../code/data/alternatives.ts"), "utf8");
const block = src.match(/const ALTERNATIVES[^{]*{([\s\S]*?)\n};/)[1];
const re = /"(npm|pypi):([^"]+)":\s*{\s*name:\s*"((?:[^"\\]|\\.)*)",\s*reason:\s*"((?:[^"\\]|\\.)*)",\s*migration:\s*\n?\s*"((?:[^"\\]|\\.)*)",?\s*}/g;

const npm = [], pypi = [];
let m;
while ((m = re.exec(block))) {
  const [, eco, pkg, name, reason, migration] = m;
  (eco === "npm" ? npm : pypi).push({ eco, pkg, name, reason, migration });
}
if (npm.length + pypi.length !== 46) {
  throw new Error(`Corpus parse mismatch: got ${npm.length}+${pypi.length}, expected 46`);
}

// Markdown table-cell sanitizer: keep it copy-pastable, never break the table.
const cell = (s) =>
  s.replace(/\\"/g, '"').replace(/`/g, "'").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ").trim();
const inlineCode = (s) => "`" + cell(s) + "`";

function rows(list, ref) {
  return list
    .map((e) => {
      const link = `https://freshdeps.vercel.app/${e.eco}/${e.pkg}?ref=${ref}`;
      const why = cell(e.reason);
      return `| [\`${e.pkg}\`](${link}) | \`${e.name}\` | ${why}<br>${inlineCode(e.migration)} |`;
    })
    .join("\n");
}

const HEAD = `| Dead package | Replace with | Why it's dead + the exact change |
|---|---|---|`;

function buildBody(ref, { h1, leadIn }) {
  return `${h1}## Your build broke. Your AI told you to install a dead package.

${leadIn} You search the package name. You land here.

This is a reference. Find your package in the tables below, copy the exact replacement and the one-line change. Every entry is **hand-verified** — there are no inferred or AI-guessed replacements here, which is the entire point: the thing that broke your build was a confident guess.

## Why your AI keeps doing this

An LLM's package knowledge is frozen at its training cutoff — typically 6–18 months stale by the time you use it. In that window a library gets deprecated, hands off maintenance, archives its repo, or picks up a CVE. The model has no way to know. A newer or bigger model does not fix this; it just moves the stale cutoff forward a few months. Sonatype's 2026 analysis put LLM dependency-upgrade hallucination near 27% across tens of thousands of enterprise upgrades — this is the default failure mode of AI-assisted dependency work, not an edge case.

The only real fix is a live lookup at recommendation time. The packages below are the ones stale agents recommend most often. Each package name links to a **live freshness verdict** (npm/PyPI registry + GitHub API + [OSV.dev](https://osv.dev), computed at request time) so you can confirm it is still dead before trusting this page.

## npm — dead package → exact migration

${HEAD}
${rows(npm, ref)}

## PyPI — dead package → exact migration

${HEAD}
${rows(pypi, ref)}

## Make your agent stop recommending these

Reading a table *after* the build breaks is the slow path. The fast path is the agent checking *before* it recommends. The same hand-verified corpus above sits behind a live API and a one-tool MCP server:

- JSON API, no account: \`GET https://freshdeps.vercel.app/api/verdict?ecosystem=npm&package=node-sass&ref=${ref}\`
- MCP server — one paste into your client config (Claude Desktop, Cursor, …), no account, no key:

\`\`\`json
{"mcpServers":{"freshdeps":{"command":"npx","args":["-y","github:SolvoHQ/freshdeps-mcp"]}}}
\`\`\`

With a project rule like *"before recommending or adding any npm/PyPI dependency, call \`check_dependency_freshness\` and don't recommend anything that comes back \`abandoned\`"*, this table stops being something you ever need to open.

## Notes & limits

- npm + PyPI only. The corpus is curated by hand and **never inferred** — if a package is not in the tables above, this page makes no claim about it.
- "Dead" means deprecated, unmaintained, archived, renamed, or superseded by the stdlib — the migration cell tells you which.
- Live verdicts are computed per request; under unauthenticated GitHub rate limits a verdict can come back registry-only rather than failing.
- Found one that's wrong, or a common dead package that's missing? That is the single most useful feedback — this corpus only improves with disagreement.

Source / MCP repo: <https://github.com/SolvoHQ/freshdeps-mcp>
`;
}

const devtoLead =
  "You asked Claude, Cursor, or Copilot for a library. It gave you a confident answer. You `npm install`ed (or `pip install`ed) it — and now your build throws a deprecation warning, a peer-dependency error, or just fails outright.";

const gistLead =
  "You asked an AI coding assistant for a library, installed what it confidently recommended, and your build broke — a deprecation warning, a peer-dependency error, or an outright failure.";

const devtoBody = buildBody("devto-deadpkg", { h1: "", leadIn: devtoLead });
const gistBody = buildBody("gist-deadpkg", {
  h1: "# Dead npm & PyPI packages → the exact, version-pinned migration for each (hand-verified, 2026)\n\n",
  leadIn: gistLead,
});

const outDir = path.join(__dirname, "out");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "devto-body.md"), devtoBody);
fs.writeFileSync(path.join(outDir, "gist-body.md"), gistBody);
console.log(`OK npm=${npm.length} pypi=${pypi.length} total=${npm.length + pypi.length}`);
console.log(`devto-body.md ${devtoBody.length}B / gist-body.md ${gistBody.length}B`);
