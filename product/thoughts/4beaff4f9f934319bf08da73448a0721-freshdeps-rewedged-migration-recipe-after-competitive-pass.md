## Decision
freshdeps re-wedged from "dependency-health data service (MCP + SEO)" to
**"the abandoned-dependency escape hatch for AI agents"**: when a package is
dead/deprecated, return a concrete hand-verified **migration recipe**
(replacement + before→after code), not just a risk verdict. pSEO leg killed.
MCP-native only. product/mvp.md rewritten. #7 (SEO crawl expansion) premise is
dead — drop it.

## Diff evidence (this tick, empirical)
Competitor MCP diff — 4DA + DepShield run live vs freshdeps on
request/lodash/left-pad/node-uuid/minimist:
- Plain freshness + CVE = **commoditized**. 4DA & DepShield-health match
  freshdeps on deprecation; on CVE freshdeps is NOT better (no version-pinning
  anywhere).
- freshdeps' ONLY demonstrated edge: correct abandonment detection
  (github.archived / lastCommitAgeDays) + a **correct curated alternative**.
  DepShield flagship pre-install gate said "OK to install" for deprecated/
  archived request/left-pad/node-uuid and recommended a NONEXISTENT
  request@3.0.0; its suggest_alternative returns keyword garbage.
- So the moat is narrow on "is the repo alive" alone — too thin to stand on.

SEO SERP reality (WebSearch 5 target queries):
- Page 1 owned by editorial/UGC (dev.to, Medium, LogRocket, HN, Wikipedia,
  npmjs.com, GitHub). **Google's own deps.dev does not rank for ANY of them.**
  If Google's page-per-package can't rank, zero-DA freshdeps.vercel.app has no
  path. pSEO is structurally locked → killed, not deprioritized.

Open seam (Q3): every competitor is a *scoring* product. None answer
"X is dead — here is the exact version-pinned migration." Ecosystem
independently converging on agent-consumable migration knowledge (bumpgen,
Vercel AI SDK MCP, Next.js 16 codemods, TanStack Intent). The long tail
(request/moment/node-uuid/left-pad) is un-owned and is exactly what
stale-trained agents keep recommending. Slopsquatting/existence-check angle
was checked and is CLOSED (Socket + Snyk free hosted MCPs + public DepScope
corpus, no data moat) — explicitly NOT pursued.

## Shipped this tick (verified live)
- data/alternatives.ts: Alternative gained migration?: string; 20 curated
  entries (14 npm / 6 pypi) got hand-verified recipes. Never inferred —
  curated map only.
- verdict.ts / mcp/server.js / package page: migration surfaced end-to-end.
- Deployed Vercel prod, commit b2095b1 (code/ only). Independently verified:
  /api/verdict?package=request → suggestedAlternative.migration present &
  correct; lodash (healthy) → suggestedAlternative null (no recipe);
  /npm/request page renders Migration block.

## Defensibility thesis (for next tick to pressure-test)
Moat = curated migration-recipe corpus + freshness, NOT the public feeds.
Honest caveat: framework vendors own THEIR migrations; freshdeps must own the
un-owned long tail AND prove agents actually call it. Next compounding bet =
expand the recipe corpus on the highest-traffic dead packages + observe MCP
usage — NOT SEO surface.

## Sources
- product/thoughts/56e2068bc64d4851a5521621d96cabda-wedge_audit-critique.md (2/10 verdict that triggered this)
- This tick sub-agent diffs (competitor MCP teardown + SERP/landscape research) — not re-pasted; conclusions above are the distillation.
- product/mvp.md (rewritten this tick)
