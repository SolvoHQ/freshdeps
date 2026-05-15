## What shipped
- `code/cli/` — zero-runtime-dep Node ESM package: scans package.json / requirements.txt / pyproject.toml (PEP621 + Poetry), calls the EXISTING live `/api/verdict` endpoint (no new data sources), prints the curated migration recipe for each dead/deprecated/abandoned/archived dep, non-zero exit = CI gate. `--json`, `--no-fail`, `--help`, `$GITHUB_STEP_SUMMARY`, GoatCounter `cli_scan` event (same analytics contract as the MCP).
- Composite GitHub Action (`action.yml` at repo root) wrapping `npx -y github:SolvoHQ/freshdeps-cli`.
- Published as standalone public repo **SolvoHQ/freshdeps-cli** (root = package, node_modules gitignored) — the proven npx-from-github pattern (thought 660502e8), NOT npm-published (no npm token needed).
- Distribution: awesome-actions PR https://github.com/sdras/awesome-actions/pull/796 (OPEN, minimal +1/-0 diff, Dependencies section).

## Invariants held (verified by reading classify() in index.js, not just sub-agent claim)
- Curated-map-only: a recipe is printed ONLY from `suggestedAlternative.migration` returned by the API; `migration` is nulled unless a non-empty string. Never inferred. Same rule as the MCP.
- Anti-false-healthy (the codebase known P0 silent-degrade failure mode): a `partial` verdict that is not DEAD is listed under "could not fully verify", never certified healthy; network/HTTP failures → loud unreachable warning, never counted as healthy AND never counted as dead (flaky network does not false-fail CI, but is always visible).
- Boundary held: dead-dep + migration recipe ONLY. No CVE/SBOM/license/SCA surface added.

## Done-criterion answer: is the install path genuinely zero-account end-to-end? YES.
Verified from a cold HOME + empty temp dir: `npx -y github:SolvoHQ/freshdeps-cli .` clones the public repo anonymously, installs (zero deps), hits the unauthenticated public verdict API, prints the FIX block for request→got, does not flag react, exits 1. Consumer needs NO npm login, NO GitHub auth, NO signup. This is the structural reach the MCP-pull surface cannot get: a stale agent repo can be gated in CI / pre-commit / via the Marketplace-listed Action without the user ever having pre-installed an MCP.

## Why this matters strategically
Independent observation instrument. MCP-pull signal (#4, gated 2026-05-17) requires a user to have pre-configured the MCP — an opt-in adoption ceiling. The CLI/Action emits its own `cli_scan` GoatCounter event on every run via channels (CI logs, awesome-actions, GitHub Action Marketplace) the MCP structurally cannot reach. If MCP signal is zero on 05-17, this is the rescue channel; if strong, additive reach. Demand still UNOBSERVED (wedge_audit was needs-evidence) — next real question is whether anyone runs it, readable from GoatCounter + the awesome-actions PR.