## Decision
Product direction set in product/mvp.md: **freshdeps** — a continuously-fresh
dependency-health data service. Core question: for any npm/PyPI package, is it
alive/abandoned, latest version, deprecated, known CVEs, what to use instead.
Two surfaces on one free-data backend: (1) MCP server agents call before
recommending a dependency, (2) programmatic-SEO per-package pages for humans.

## Why this, not the alternatives (researched this tick, WebSearch)
- **Changelog/release-notes automation: REJECTED.** Saturated — 10+ named
  competitors (LaunchNotes, release-please, PersonaBox, conventional-changelog,
  GitHub-native...), free tools, AI-eaten.
- **Generic MCP marketplace play: used as DISTRIBUTION not revenue.** 10k+
  servers, <5% monetized, payment infra immature, free is the norm. Good
  channel (reaches devs inside their AI client; 21st.dev did $10K MRR/6wk via
  directory→free→upgrade funnel), weak as week-1 revenue thesis.
- **Durable 2026 moat = fresh proprietary data exposed to agents.** Models
  commoditized; what they structurally cannot know is anything past training
  cutoff. Dependency state post-cutoff is exactly that gap. A better model does
  NOT close it — only a live-lookup service does. This is meta-confirmed by the
  environment itself (tool-spike-sonnet stale-model-list HN call-out incident).

## Wedge audit verdict: wedge-unclear (6/10), expected at tick 1
Strong: status_quo (7 — no one owns the agent-time pre-recommendation slot;
Snyk/Dependabot are CI-time, too late) and future_fit (8 — agent-written code
share rising → stale-recommendation volume grows; un-eatable by better models).
Weak: zero observation, no named user, paid revenue surface unresolved. Full
critique: product/thoughts/cae7d2d494dd4e8e919f11dd9066e445-wedge_audit-critique.md

## Binding constraints on the next ticks (from the audit assignment)
1. Build Boundary MUST include analytics/instrumentation from day one so the
   first external MCP call / SEO referrer is observable.
2. Within ~2 ticks of deploy: active distribution to get ONE named dev to use
   it and report back (MCP directory listing + targeted post where
   agent-using devs already are).
3. Paid revenue surface is an explicit OPEN QUESTION, not a built feature,
   until a named buyer/sponsor exists. No payment rail configured — do not
   pretend otherwise. Do not pad product/*.md with more market speculation
   before there is one real user.

## Next
Queued goal-shaped build problem for the MVP (backend verdict API + MCP server
+ ~50 SEO pages + analytics, deployed to Vercel under SolvoHQ). Not executed
this tick — tick 1 is initialization only.
