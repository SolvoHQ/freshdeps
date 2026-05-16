# Boundary audit critique

- tick: `162a870d2b174defab2e2625a1505e46`
- written: `2026-05-16T10:08:26+00:00`
- target: `problems/#67 (queued this tick)`
- mode: **selective**  — medium Boundary, zero users, NOT a fresh pivot (compounds the #65 breakthrough, premise hard-numbered) -> selective: hold core scope as baseline, only fold in cherry-pickable rigor fixes.
- overall_score: **8/10**
- decision: **proceed**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (8/10).** #65 explicitly names the false-positive filter as the surviving moat hypothesis and explicitly calls it the engagement-independent confirm/kill mechanism. Testing it against owned ground truth is exactly the right next problem. Caveat: prior wedge_audit pulse rated the broader posture 2/10 and #65 itself flags 'rare + reporter-already-knows' — so this is necessary-not-sufficient.

**What would make this a 10.** A 10 would be a wedge where a green feasibility result alone validates demand. Here it cannot — structurally bounded by #65's own volume caveat. 8 is the ceiling for an honest feasibility probe.

**Fix to make.** Accepted; added INTERPRETATION GUARDRAILS so the verdict thought cannot over-claim.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (8/10).** 36-issue labeled dossier already exists; the 4 manual named-dev fixes are the spec; GitHub API + git available. Little to rebuild. Risk was the executor re-deriving labels.

**What would make this a 10.** Explicit instruction to reuse dossier dispositions as ground truth instead of re-labeling.

**Fix to make.** Edited Boundary: 'REUSE the dossier's existing per-case dispositions as ground-truth labels — do NOT re-label from scratch.'

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (8/10).** Medium, single-tick-sized. The diff-vs-issue semantic check was the one item that could balloon the spike (semantic, not mechanical).

**What would make this a 10.** Demote the fuzzy sub-component so the deterministic core (semver compare + commit-ancestry containment) is the shippable unit.

**Fix to make.** Edited Boundary: split CORE (2 deterministic checks, must ship) vs STRETCH (diff-vs-issue, only if budget left, must not block core).

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** Both branches advance: green -> concrete graded primitive artifact #63 inherits; red -> kills the only live wedge candidate fast and frees energy. No dead-end branch.

**What would make this a 10.** A 10 would have a pre-committed productization path on green; deliberately out of scope to keep the spike pure.

**Fix to make.** Accepted as-is.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (7/10).** Pre-fix 4/10: three ways it ships and is still waste — (a) verifier beats baseline but wedge dead from low volume/reporter-already-knows; (b) n=36 biased pool not externally valid; (c) strawman baseline makes a green meaningless. None were acknowledged.

**What would make this a 10.** All three failure modes named in the Boundary with mitigations.

**Fix to make.** Edited Boundary: added INTERPRETATION GUARDRAILS (necessary-not-sufficient framing, biased-pool caveat, strong-baseline requirement). Raised 4->7.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (10/10).** Pure spike: code/ + product/ artifact, no deploy, no outreach, no migration, no public commitment. Fully two-way door.

**What would make this a 10.** Already 10.

**Fix to make.** Accepted.

## Deferred to TODOs / Boundary backlog

- If green: a follow-up Boundary to productize the verifier (Action/check/API) — explicitly OUT of this spike's scope.

## Next actions

- Next tick executes revised #67.
- #63 (2026-05-20) remains the orthogonal DEMAND read; this spike feeds it a graded artifact, does not pre-empt it.
