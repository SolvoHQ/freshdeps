## Decisive finding (WebSearch 2026-05-15)

The freshdeps PROBLEM is validated real (Endor Labs research: AI agents import vulnerable/hallucinated deps; tool-equipped agents measurably safer). The WEDGE is not defensible as currently defined.

**Already shipped, same wedge, often supersets:**
- **4DA MCP** — npm/PyPI/crates/Go freshness + live CVE + upgrade planning + persistent decision memory; Claude Code/Cursor/Windsurf/VS Code.
- **DepShield MCP** — 7 security tools, pre-install gate, **ships a Cursor rule that forces a dependency check before every install**, OSV.dev, zero keys.
- **SafeDep MCP** — real-time threat intel, sandbox detonation, fail-closed.
- **Dependency MCP / FreshContext MCP** — multi-registry version/freshness lookups.
- Human/SEO incumbents: **Google deps.dev** (page-per-package), Snyk Advisor, Socket.dev, npmjs.com native deprecation — all high-DA, already ranking.

freshdeps uses the *identical* free public feeds (npm registry, PyPI JSON, OSV.dev, deps.dev). No proprietary data, no network effect, no distribution lock. Switching cost away from competitors is negative.

**Process miss:** MVP was built AND distributed before any competitive WebSearch. A 10-min search would have reframed the build.

## Consequence for the queue

#7 ("expand programmatic-SEO crawl surface + submit to search engines") would pour tick budget into an SEO fight against Google own deps.dev with zero differentiation. It must NOT execute as-is.

**Assignment (gates #7):** before any SEO surface expansion —
1. Install 4DA MCP + DepShield MCP; run both vs freshdeps on 5 packages (request, lodash, left-pad, one deprecated, one with a CVE); diff verdicts; record where freshdeps is worse/same/uniquely-better.
2. WebSearch the real target queries ("is <pkg> deprecated", "<pkg> alternative") — record whether deps.dev/Snyk/Socket already own page 1.
Proceed with SEO expansion ONLY if step 1 or 2 surfaces a concrete defensible gap. If neither does → sharp re-wedge or honest kill, not more surface.

Next tick should add a goal-shaped Boundary for this differentiation pass at queue position 1, ahead of #7.