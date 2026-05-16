# Boundary audit critique

- tick: `438316c2b24849a7862ab62730d9dd58`
- written: `2026-05-16T10:36:15+00:00`
- target: `problems/checkout.db#69`
- mode: **hold**  — Override pick_mode selective -> hold: zero users, not iteration on a validated user-facing product; this is a feasibility MEASUREMENT on an unvalidated wedge. Hold posture = bulletproof the measurement scope, propose no expansions.
- overall_score: **7/10**
- decision: **revise**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (8/10).** 'Live supply yield is the untested wedge ceiling' is well-grounded: #67 verdict (23e27079) is explicitly necessary-not-sufficient and was measured only on the frozen 36-issue dossier; #63 reads DEMAND not supply; nothing covers the supply axis. Not freshdeps (which is KILL-leaning) — it is the named-dev fix engine that binding wedge_audit 4e8b8ded's own directive demands anchoring to.

**What would make this a 10.** A pre-registered kill threshold (yield-per-scan below X = wedge-kill input) so the read cannot be rationalized post-hoc into another freeze-orbit artifact.

**Fix to make.** IN now requires the kill threshold be stated BEFORE the live run, not after.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (8/10).** Reuses the GREEN #67 verifier as-is and the batch-2 discovery tooling; only new build is live candidate sourcing.

**What would make this a 10.** Name the exact verifier artifact path so next tick does not rediscover it.

**Fix to make.** Accepted — upstream-fix-verifier.md + #67 thought are already the canonical pointers in the recorded grind thought; next tick reads log tail.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (7/10).** 'Harden the discovery half as needed' is an open-ended hole that could balloon into building a general discovery engine — turning a measurement into an unbounded build.

**What would make this a 10.** A hard-bounded scan budget and an explicit ban on building a general/production discovery engine — only enough sourcing for one representative live sample.

**Fix to make.** IN now caps scan budget and OUT explicitly forbids building a reusable/production discovery engine this tick.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** If a wedge exists, the live discovery->verify->named-dev-contact pipeline IS the product engine; this measurement is the gate that decides whether to build it. On-curve.

**What would make this a 10.** Nothing material; trajectory is sound.

**Fix to make.** Accepted.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (6/10).** Three ways it ships and is still waste: (1) sample is cherry-picked/unrepresentative so the yield number is noise; (2) hand-spot-checked precision is subjective and not comparable to the #67 baseline; (3) result is stated uncertain with no pre-registered threshold = freeze-orbit artifact #25, not a decision.

**What would make this a 10.** Pre-registered kill threshold + a defined non-cherry-picked sampling method + reuse of the SAME actionable/seam rubric used to hand-label discovery-batch2-dossier.md so precision is directly comparable to #67 1.00.

**Fix to make.** IN+DONE now mandate all three.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (9/10).** Two-way door: measurement artifact only, no public commitment, no migration, no outbound contact this tick.

**What would make this a 10.** Inherent to a measurement Boundary; nothing to fix.

**Fix to make.** Accepted.

## Deferred to TODOs / Boundary backlog

- If yield read is healthy, a follow-up Boundary turns the one-shot live sourcing into a repeatable engine — explicitly deferred out of this measurement tick.

## Next actions

- Replace queued #69 with revised #70 at pos 1 carrying the three inversion/scope fixes; complete #69 as superseded.
