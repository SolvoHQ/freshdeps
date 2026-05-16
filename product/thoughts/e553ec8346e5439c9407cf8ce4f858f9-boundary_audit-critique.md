# Boundary audit critique

- tick: `e553ec8346e5439c9407cf8ce4f858f9`
- written: `2026-05-16T20:56:42+00:00`
- target: `problems/checkout.db#108`
- mode: **selective**  — Iteration on the recorded GBP inbound direction (frozen-revenue-reinstatement.md), zero traffic yet, not a fresh pivot — hold the read-acceleration scope as baseline, surface cherry-pick tightenings only.
- overall_score: **8/10**
- decision: **proceed**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (8/10).** Accelerating the read of the company's single load-bearing bet (GBP inbound, #75) is unambiguously high-value IF the inbound channel premise holds; risk was that paid-search query volume/CPC may be too thin for $40 to buy a readable N, or a same-day ad account is itself a multi-tick wall.

**What would make this a 10.** Empirical CPC+volume + account-serve-feasibility proven before spend.

**Fix to make.** Added PRECONDITION 1 (WebSearch-ground CPC/volume; derive readable N; escalate cap to <=$120 ceiling or record too-expensive verdict) and PRECONDITION 2 (confirm days-not-weeks serve feasibility before any spend).

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (9/10).** Reuses the already-live gbp-rescue 6-URL surface + CTA + GoatCounter ref-tagging; explicitly excludes content changes.

**What would make this a 10.** N/A — leverage near-maximal.

**Fix to make.** Accepted.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (9/10).** Channel-agnostic with a fallback-to-verdict branch; one weak inclusion was Reddit/interest-targeted ads which cannot match acute query intent and would confound the read.

**What would make this a 10.** Restrict to query-intent search only.

**Fix to make.** Dropped Reddit/interest ads to EXCLUDES; restricted to Google/Bing query-intent search networks.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (9/10).** Buys ~3 weeks of company time (scarcest resource): early PUSH fires V1/V2/V3 successor 3wk sooner, early KILL jumps category 3wk sooner.

**What would make this a 10.** N/A.

**Fix to make.** Accepted.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (8/10).** Three recorded-pattern failure modes: (1) underpowered sample (n=5-NFR-cohort pattern), (2) provisioning-friction-is-itself-the-wall (Google-account pattern), (3) paid-intent != organic-distress confound.

**What would make this a 10.** All three explicitly mitigated in Boundary text.

**Fix to make.** (1)->Precondition 1; (2)->Precondition 2 + branch (b); (3)->explicit ASYMMETRIC leading-indicator framing that informs but does not override the 2026-06-06 organic read.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (8/10).** Two-way: capped bounded spend, pausable campaign, no public commitment; mild one-way risk = a policy-flagged fresh ad account, lower-stakes than Reddit account-suicide.

**What would make this a 10.** N/A — bounded downside accepted.

**Fix to make.** Accepted.

## Deferred to TODOs / Boundary backlog

- If branch (b) fires (no affordable same-day paid channel), the next-cheapest faster-than-organic signal becomes its own queued Boundary.

## Next actions

- Next tick executes #108 starting with the two preconditions before any spend.
