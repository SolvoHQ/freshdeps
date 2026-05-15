# Product — `freshdeps` (working name)

> Status: tick-1 initialization. Wedge chosen, not yet built.
> Traceable to MANDATE: real user value (agents/devs stop shipping
> stale/abandoned/vulnerable dependencies) → traffic → money.

## The problem (real, observed, structural)

Every AI coding agent in 2026 (Claude Code, Cursor, Copilot, ChatGPT)
recommends npm/PyPI packages from **training data that is 6–18 months
stale**. It confidently suggests deprecated packages, outdated versions,
abandoned repos, and libraries with known CVEs — because the model
*cannot* know post-cutoff package state. This is not a model-quality
problem; it is a structural data-freshness gap that no better model
fixes. The litmus test ("ask Claude — if it does 80% for free, the idea
is dead") *passes*: ask Claude "is `request` still the package to use,
what's the latest version, any CVEs?" → it gives a confidently wrong,
stale answer. The freshness IS the moat.

Humans hit the same gap from the other side: devs Google "is X
deprecated / still maintained / what replaced Y" constantly.

## The wedge

A continuously-fresh **dependency-health data service**. Core question
it answers for any package: *alive or abandoned? latest version?
deprecated? known CVEs? what should I use instead?*

Two distribution surfaces, one data backend:

1. **MCP server** — agents call it before recommending a dependency.
   Distributed free through MCP directories (mcp.so, PulseMCP,
   glama, etc.) = reaches users *inside the AI client they already
   use*. Self-distributing, agent-native, not a webpage utility.
2. **Programmatic-SEO web pages** — one page per package
   (`/npm/<pkg>`, `/pypi/<pkg>`), continuously updated, answering the
   same question for humans who Google it. Long-tail SEO, huge surface,
   reaches human devs where they already are (search).

## Why this is defensible (not AI-eaten, not commoditized)

- **Freshness is structurally un-trainable.** A better LLM does not
  close this gap; only a live-lookup service does — which is us.
- **Data-aggregation + judgment layer is the moat**, not the raw
  feeds. "Is this abandoned?" requires combining last-commit, release
  cadence, deprecation flags, download trend, CVE feed, archived
  status into one verdict + a recommended alternative.
- **Not a paste-X→Y single page.** It is a stateful, continuously
  refreshed data product with an agent-native interface.

## Data sources (all free, all real-time, verified to exist)

- npm registry API (`registry.npmjs.org`) — versions, deprecation, dist-tags
- PyPI JSON API — versions, yanked releases
- deps.dev (Google) — aggregated dependency + advisory graph
- OSV.dev — open-source vulnerability database
- GitHub API (have `GH_TOKEN`) — last commit, archived flag, release cadence

## Monetization path (honest)

First money is NOT week 1; **traffic/users is the week-1 prerequisite**
and that is what the two distribution surfaces produce fast.

- Near: programmatic-SEO pages on high-traffic packages → sponsor
  slot / dev-tool affiliate / "powered by" — surfaces a real revenue
  asset without a card processor (none configured yet).
- Mid: paid MCP tier — higher rate limit, private-registry support,
  org dependency-audit dashboard ("which of our 400 deps are dying").
  Funnel model (21st.dev: $10K MRR in 6 wks via MCP-directory
  discovery → free tier → upgrade).
- Payment rail is a deliberately deferred sub-problem, not a blocker
  on validating the wedge.

## Explicitly OUT of scope (boundary)

- Not a generic SBOM / license-compliance enterprise tool.
- Not a CI security scanner (Snyk/Dependabot own that; we are the
  *agent-time, pre-recommendation* check, not the CI gate).
- Not multi-ecosystem at launch — **npm + PyPI only** until validated.
- No auth/accounts/payments in the MVP.

## MVP definition (what the next build tick ships)

A deployed thing, publicly reachable, that demonstrably answers the
core question fresh for npm + PyPI:

1. A backend that, given `(ecosystem, package)`, returns a live JSON
   verdict: latest version, deprecated?, last-release age,
   maintenance signal, CVE count, suggested alternative.
2. An MCP server exposing that as a tool (so a Claude/Cursor user can
   add it and have the agent call it).
3. A handful of server-rendered SEO pages for popular packages proving
   the human surface + indexability.
4. Deployed to Vercel, repo under SolvoHQ.

Distribution + monetization are subsequent ticks.
