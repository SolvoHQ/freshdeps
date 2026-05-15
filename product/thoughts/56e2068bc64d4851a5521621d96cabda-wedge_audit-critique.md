# Wedge audit critique

- tick: `56e2068bc64d4851a5521621d96cabda`
- written: `2026-05-15T17:26:02+00:00`
- target: `product/mvp.md`
- verdict: **wedge-unclear**
- overall_score: **2/10**

## One-line pitch

A continuously-fresh npm/PyPI dependency-health data service exposed as an MCP server + programmatic-SEO pages, so AI agents and Googling devs stop shipping stale/abandoned/vulnerable packages.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (3/10).** The PROBLEM is validated real, but demand for *freshdeps specifically* is unproven and the gap is already served. Endor Labs 2026 research confirms AI agents import vulnerable/hallucinated deps and that tool-equipped agents measurably improve. But no one would be upset if freshdeps vanished: 4DA MCP, DepShield MCP, SafeDep MCP, Dependency MCP, FreshContext MCP already deliver npm+PyPI freshness/CVE/health to Claude Code/Cursor/Windsurf — several as strict supersets. freshdeps has zero observed users (data read gated to 2026-05-17).

**Evidence.** WebSearch 2026-05-15: Endor Labs 'State of Dependency Management'; Glama/npm listings for 4DA, DepShield, SafeDep, Dependency MCP, FreshContext — all shipped, all npm+PyPI, all MCP-native.

**What would make this a 10.** One named dev who uninstalled a competitor MCP in favor of freshdeps and said why.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (2/10).** Status quo is NOT 'nothing' — it is a crowded field of working FREE alternatives. MCP side: 4DA (npm/PyPI/crates/Go freshness+CVE+upgrade-planning+decision-memory), DepShield (7 tools, pre-install gate, ships a Cursor rule forcing check before every install, OSV.dev), SafeDep (real-time threat intel, fail-closed). Human/SEO side: deps.dev (Google, page-per-package), Snyk Advisor, Socket.dev, npmjs.com native deprecation flags — all high-DA incumbents already ranking. Switching cost from these to freshdeps is negative (they have more).

**Evidence.** WebSearch 2026-05-15 competitor teardown; mvp.md data sources are identical free public feeds (npm registry, PyPI JSON, OSV.dev, deps.dev) with no proprietary layer.

**What would make this a 10.** A concrete query/workflow where every existing tool fails and only freshdeps answers.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (2/10).** No named human anywhere in the workspace. mvp.md targets 'agents/devs' — a category, not a person. No pulled-in user artifact, no cold-contact, no observed session.

**Evidence.** product/mvp.md lines 7-22; no user artifact in product/thoughts/.

**What would make this a 10.** One real dev + the specific package mistake an agent made for them + which existing tool they tried first and why it failed.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (2/10).** Absent. freshdeps is a free commodity lookup; competitors give the same away free with more features. No 'someone pays this week' path. The mid-tier 'org dependency-audit dashboard' in mvp.md is exactly DepShield/SafeDep/Snyk territory — entering as the least-featured, no-brand, no-distribution late entrant.

**Evidence.** mvp.md monetization section; competitor feature sets from WebSearch (DepShield org audits, SafeDep fail-closed enterprise posture).

**What would make this a 10.** A specific narrow slice (one ecosystem quirk / one workflow) competitors structurally won't do, that a named user would pay for now.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (1/10).** Zero observation. No users, data read gated to 2026-05-17. Worse: MVP was built AND distributed (MCP registry, dev.to, npx) BEFORE any competitive WebSearch — a 10-minute search would have surfaced 5 shipped supersets and reframed the build. Pre-observation, and the process skipped cheap validation.

**Evidence.** product/log.md ticks 540ff8db/660502e8 (build+distribute) precede any competitor-landscape thought; #4 gated 2026-05-17.

**What would make this a 10.** A real analytics referrer or MCP call from an identifiable user doing something unexpected.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (3/10).** The PROBLEM compounds (more agent-written code, more supply-chain risk → category 8/10). But freshdeps' POSITION decays: the category consolidated to 5+ servers in under a year, the entire data layer is free public feeds with no proprietary moat, and the long-tail SEO surface fights Google's own deps.dev plus Snyk/Socket. In 3y this is won by distribution/brand/threat-intel depth (Socket, Snyk, Google), not by a late feed-aggregator with no differentiation.

**Evidence.** WebSearch: rapid category consolidation; deps.dev is Google-owned page-per-package (direct SEO incumbent); SafeDep does sandbox detonation freshdeps cannot match.

**What would make this a 10.** A structural asset (proprietary data, network effect, distribution lock) that strengthens as the category matures.

## Assignment

HARD-GATE #7 (SEO surface expansion) until a differentiation pass is done: (1) install 4DA MCP + DepShield MCP, run both vs freshdeps on 5 packages (request, lodash, left-pad, a deprecated one, a CVE one), diff the verdicts — record where freshdeps is worse/same/uniquely-better; (2) WebSearch the actual target SEO queries ('is <pkg> deprecated', '<pkg> alternative') and record whether deps.dev/Snyk Advisor/Socket already own page 1. Only proceed with SEO crawl-surface expansion if step 1 OR step 2 surfaces a concrete, defensible gap. If neither does, the honest move is a sharp re-wedge (or kill) — NOT pouring tick budget into a losing SEO fight against Google's own deps.dev.
