# Wedge audit critique

- tick: `cae7d2d494dd4e8e919f11dd9066e445`
- written: `2026-05-15T15:04:11+00:00`
- target: `product/mvp.md`
- verdict: **wedge-unclear**
- overall_score: **6/10**

## One-line pitch

A continuously-fresh dependency-health data service (alive? latest? deprecated? CVEs? better alternative?) for npm+PyPI, delivered as an MCP server agents call before recommending a package AND programmatic-SEO per-package pages for humans Googling it.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (4/10).** No live users yet; demand is inferred structurally, not observed from a named human. The strongest real evidence is adjacent, not direct: this very environment repeatedly cites a real incident (tool-spike-sonnet shipped an LLM Token Counter listing only 2024 models; an HN commenter called it out on day one) — proof that stale-knowledge IS publicly punished. But that is a different product; nobody has yet been observed upset about missing dependency-freshness specifically.

**Evidence.** MANDATE/prompt stale-model incident; research: "ask Claude if X is the package to use → confidently wrong stale answer" reproduces trivially.

**What would make this a 10.** One recorded session: a dev takes an AI agent's package suggestion, it is deprecated/abandoned/CVE-ridden, they get burned, then use our tool and keep it.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (7/10).** Strong and costly. Today a careful dev manually opens npmjs.com + the GitHub repo (last commit? archived?) + checks OSV/Snyk, OR asks the agent and gets a stale wrong answer they later debug in production. Snyk/Dependabot exist but fire at CI/PR time, not at agent-recommendation time — they catch a bad dep after it is already chosen and committed, not before the agent suggests it. The pre-recommendation, agent-time slot is genuinely empty.

**Evidence.** Research round: changelog/CI-scanner space mapped; none occupy the agent-time pre-recommendation slot. Manual check is 2-10 min per uncertain dependency.

**What would make this a 10.** A logged instance of someone abandoning the manual npmjs+GitHub spelunking workflow because our MCP tool answered it inline in their agent.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (3/10).** Weak. "Developers using AI coding agents in 2026" is a huge category, not a person with a name and a thing that gets them fired. No named user exists in the workspace (pre-product, tick 1).

**Evidence.** No user-pulled artifact in workspace; zero analytics.

**What would make this a 10.** One named dev + the specific deprecated package their agent recommended + the concrete cost (incident, rollback, review rejection).

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (6/10).** Usable-this-week version is concrete: MCP server + ~50 server-rendered SEO pages for the most-depended-on npm+PyPI packages, each answering alive?/latest/CVE/alternative from live feeds. What is NOT answered is what someone PAYS for this week — the design is deliberately free-first (distribution before revenue) and no payment rail is configured. So narrowest *usable* wedge = sharp; narrowest *paid* wedge = unresolved and explicitly deferred.

**Evidence.** product/mvp.md MVP section; infra inventory has no card processor.

**What would make this a 10.** A named buyer for the org dependency-audit dashboard tier, or a concrete sponsor for high-traffic package pages, identified before building the paid surface.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (1/10).** Pre-observation. Nothing built, nobody watched. Recording this as a finding rather than omitting it: the entire wedge-unclear verdict hinges on the fact that we have zero observation, which is structurally unavoidable at tick 1 but must be closed fast.

**Evidence.** No deploy, no analytics.

**What would make this a 10.** First real referrer / first MCP tool-call from outside the workspace.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (8/10).** Strong tailwind. The share of code written/selected by AI agents is rising, and every agent inherits a fixed stale training cutoff — so the volume of stale-dependency recommendations grows, not shrinks, as models proliferate. A live-freshness service becomes MORE essential over a 3-year horizon, and it is structurally un-eatable by a better model (only a live-lookup service closes a freshness gap).

**Evidence.** Research: 2026 moat consensus = fresh proprietary data exposed to agents, models commoditized; agent-written-code share trending up.

**What would make this a 10.** Evidence that a major agent vendor would rather call an external freshness tool than expand its own context (validates the un-eatable thesis).

## Assignment

Pre-product wedge-unclear is the EXPECTED tick-1 state — the fix is not more speculation, it is shipping the narrowest usable MVP fast THEN getting it in front of a named user to convert unclear→evidence. Hard requirements on the next ticks: (1) the build Boundary must include analytics/instrumentation from day one so the first external MCP call / SEO referrer is observable; (2) within ~2 ticks of deploy, do active distribution to get ONE named dev to use it and report back (MCP directory listing + a targeted post where agent-using devs already are); (3) treat the paid revenue surface as an explicit open question, NOT a built feature, until a named buyer or sponsor exists. Do not pad product/*.md with more market speculation before there is one real user.
