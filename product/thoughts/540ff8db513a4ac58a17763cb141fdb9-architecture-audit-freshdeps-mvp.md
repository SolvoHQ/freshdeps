## Verdict: fix-first -> corrections baked into design before any code. Overall 8/10.

## Findings that changed the design (WebSearch-verified, training was stale)
1. **Vercel server-side custom-event track() is Pro/Enterprise-gated.** We are
   free Hobby. Original plan (instrument MCP/API calls via
   @vercel/analytics/server track()) silently does nothing on free tier.
   wedge_audit binding constraint #1 (first external MCP call / SEO referrer
   MUST be observable from day one) would have been quietly violated.
   CORRECTION: use **GoatCounter** (free, privacy-light, no card) as the
   single analytics layer — JS pixel on SEO pages + server-side
   fire-and-forget GET to the GoatCounter count endpoint on every
   /api/verdict and MCP tool call. Durable across days (the first external
   call may arrive days later; Vercel Hobby function logs are ephemeral so
   logs alone are insufficient for the core wedge-validation signal). Plus
   structured console event lines as cheap belt-and-suspenders.
2. **MCP SDK**: the @modelcontextprotocol/sdk current stable is v1.29.x.
   Pin ^1.29 (NOT the v2-alpha @modelcontextprotocol/server). API: McpServer
   + StdioServerTransport + registerTool; Zod is a peer dep.

## Correctness rules baked in (trust premise of the product)
- A fetch failure / upstream timeout must **never** render as a
  falsely-positive healthy/alive verdict. Each upstream (npm registry,
  PyPI JSON, GitHub API, OSV.dev) wrapped in timeout + try/catch returning
  a typed partial; verdict carries an explicit partial/unknown state
  surfaced visibly on the page and in JSON. Silently-empty -> false-healthy
  is the os-alt-class P0 here.
- **Never hallucinate a suggested alternative.** Curated static map only;
  null/none when unknown. Inventing replacements destroys credibility — the
  whole pitch is "fresh + correct where the LLM is confidently wrong".

## Edge cases to handle in verdict lib
- npm scoped pkg @scope/name -> URL-encode slash. PyPI name normalization
  (case-insensitive, underscore vs hyphen).
- Package exists but no repository field -> maintenance signal unknown,
  do not crash.
- GitHub repo URL variants (git+https, .git suffix, monorepo subdir) ->
  tolerant parse.
- OSV ecosystem casing is exact: npm and PyPI.
- npm deprecation flag on version/package. PyPI has no deprecated flag ->
  use yanked + last-release age.
- 404 from registry -> verdict found:false, render a clean not-found page
  (not 500).

## Scope
~12-15 files but cohesive (multi-surface MVP is the Boundary). Keep all
verdict logic in ONE module with small pure helpers; do not over-split.
ISR revalidate (~6h) on SEO pages so build does not hammer upstreams and
pages stay fresh; generateStaticParams for ~40 curated popular pkgs, other
pkgs render on-demand via dynamic route.
