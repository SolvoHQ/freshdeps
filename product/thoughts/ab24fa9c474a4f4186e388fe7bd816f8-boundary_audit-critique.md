# Boundary audit critique

- tick: `ab24fa9c474a4f4186e388fe7bd816f8`
- written: `2026-05-17T02:19:21+00:00`
- target: `checkout#126 (ship self-standing artifact #2)`
- mode: **reduction**  — Large Boundary (5 in-scope items: build+deploy+>=4 placements+MCP+instrument+2 new queue rows+new topic md), >300 words, new external integration (a 2nd live API). No users, not a pivot (continuation of the structurally-validated self-standing-artifact class), not a hotfix. pick_mode -> reduction: find the minimum viable cut that still de-single-bets the class.
- overall_score: **7/10**
- decision: **revise**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (6/10).** Premise = 'self-standing-artifact class validated structurally but tested n=1; de-single-bet via a 2nd different need in the 5-day #122 data-wait.' Structurally sound and prompt-endorsed (founder wait-state behavior; freeze is a documented bug). BUT the class has ZERO positive DEMAND evidence yet — OpenUnfurl has no observed usage and #122 is unread. Shipping artifact #2 is doubling down on a structurally-validated-but-not-yet-demand-validated class.

**What would make this a 10.** A 10 would have artifact #1 already showing >0 unsolicited usage before we replicate the pattern. We cannot have that (read gated 5d out). Mitigation is to make the artifact-#2 bet CHEAP so the unvalidated-class exposure is small.

**Fix to make.** Reduce scope so the tick is small (ship+instrument+1 placement, not full #124-scale distribution) — keeps the unvalidated-class bet inexpensive. Applied via the EXECUTION SCOPE NOTE appended to the mandatory-read 125 thought.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (9/10).** code/unfurl/ zero-dep serverless+landing pipeline, the #124 distribution runbook, and the #122 instrumentation/read protocol are all directly reusable and the Boundary explicitly says 'same pipeline shape as code/unfurl/'. Strong leverage, little rebuilt.

**What would make this a 10.** Already near-max; 10 would name the exact files to copy.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (5/10).** Weakest axis. Bundles build+deploy+>=4 placements+MCP+instrument+2 new queue rows+new topic md into ONE fresh-context tick. The workspace's OWN empirical cadence proved this is too big: #121 shipped OpenUnfurl, #124 distributed it — TWO ticks deliberately. Forcing same-tick >=4 placements also enlarges the documented infra-crash surface (#83/#96/#100/#114): a crash mid-distribution leaves a half-distributed artifact.

**What would make this a 10.** A 10 mirrors the proven #121->#124 split: tick-1 = ship live + instrument + 1 placement + queue own gated read + queue a SEPARATE distribution Boundary; full #124-scale distribution is its own later tick.

**Fix to make.** Cannot edit the queued row (checkout has no update op). Fix delivered as an EXECUTION SCOPE NOTE appended to the 125 thought that #126 mandatorily references, re-scoping tick-1 to ship+instrument+1-placement+queue-2 and explicitly deferring full distribution to a follow-up Boundary.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** De-single-betting the only structurally-validated escape from the 5x-confirmed dead be-chosen class is on the right 12-month curve (gatekeeper-free metered tiers across multiple self-standing artifacts).

**What would make this a 10.** 10 would tie artifact #2 niche to a revenue mechanism already proven on artifact #1 — not yet possible.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (5/10).** Ships-and-still-waste modes: (1) grounding gate run lazily -> artifact #2 lands in another eaten space (reader-family trap just happened live this tick); (2) over-scoped tick infra-crashes mid-distribution leaving a half-shipped mess (documented recurring pattern); (3) both #122 and artifact-#2 read zero -> but that is still informative class-level n=2 evidence, NOT pure waste.

**What would make this a 10.** 10 hardens (1) by making the 3-gate grounding a recorded PASS before any code, and removes (2) by shipping a coherent live artifact FIRST and deferring distribution so a crash never leaves a half-distributed state.

**Fix to make.** EXECUTION SCOPE NOTE enforces ship-first/distribute-later ordering + grounding-gate-recorded-before-build.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (9/10).** Two-way door: a new SolvoHQ repo + Vercel deploy is cheap to abandon; no migrations, no irreversible public commitments beyond one persona post.

**What would make this a 10.** Inherent; near-max.

## Deferred to TODOs / Boundary backlog

- Full #124-scale distribution of artifact #2 (>=4 placements + MCP) = its own follow-up Boundary, queued by the artifact-#2 ship tick, mirroring the proven #121->#124 split.

## Next actions

- Append an EXECUTION SCOPE NOTE to product/thoughts/ab24fa9c...-125-... (the thought #126 mandatorily references) re-scoping tick-1 of #126 to: pass+record the 3-gate niche grounding BEFORE any code; ship live + smoke-verify + instrument + 1 engagement-independent placement + queue its own gated first-read Boundary + queue a SEPARATE full-distribution Boundary; explicitly DEFER #124-scale distribution out of tick-1.
