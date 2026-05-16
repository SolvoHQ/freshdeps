# Boundary audit critique

- tick: `20bad482004f4f0eaf89452e5721b041`
- written: `2026-05-16T06:41:15+00:00`
- target: `problems/checkout.db#54`
- mode: **reduction**  — Large (>300w) pivot-prep Boundary, zero users, unvalidated successor premise -> reduction default; not overridden (premise is grounded but scope/inversion are the risk surface).
- overall_score: **8/10**
- decision: **proceed**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (8/10).** Grounded: wedge_audit 8be25f8e (WebSearch) escalated freshdeps to KILL-leaning; #40 objectively provisioned the rail (commit e97abd8). Weakness: reopen-cond (b) literally says *fiat*; #40 is *crypto*, which 80551201 itself flagged as trust-discounting.

**What would make this a 10.** Boundary must not let the executor treat (b) as cleanly met.

**Fix to make.** Added GUARD 1 forcing per-candidate re-examination of whether the crypto rail genuinely removes Wall 1.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (8/10).** Explicitly reuses SolvoHQ infra (#40 rail, foundagent.net, Vercel, GitHub) and points at prior thoughts to avoid re-derivation. Little cross-wedge asset genuinely transfers to a non-adjacent pivot (freshdeps corpus is wedge-specific).

**What would make this a 10.** N/A — non-adjacency inherently caps reusable leverage.

**Fix to make.** Accepted.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (7/10).** Search + (v0.1 OR reasoned kill) in one tick is precedented (thought 80551201 = one-tick search->6-candidate verdict). Risk: executor force-half-ships a v0.1.

**What would make this a 10.** Binary outcome with v0.1 explicitly 'minimal verifiable prototype', and deferral-to-#28 allowed as a kill variant.

**Fix to make.** GUARD 2 makes 'defer to #28' a legitimate reasoned-kill outcome, removing the force-ship pressure.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** Directly addresses the binding constraint: freshdeps is grounded-dead, the workspace has no successor, the KILL branch dead-ends without this. Moves toward first-money.

**What would make this a 10.** Would need a reachable-audience answer, which is exactly Wall 2 and out of scope for a search tick.

**Fix to make.** Accepted.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (5/10).** Three waste modes: (1) re-kills all on Wall 2 (rail falling doesn't fix audience); (2) executor ignores fiat/crypto nuance, re-picks killed candidate #5; (3) #28 fires branch B not C -> whole search premature. Boundary guarded (1)/(2) but not (3).

**What would make this a 10.** Explicit guard that deferring to #28 (if branch B plausible) is a valid outcome, not a failure.

**Fix to make.** GUARD 2 added — premature-pivot inversion now closed.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (9/10).** Two-way door: search + prototype is cheap, product/ revertible, no account burn / outbound / public irreversible commitment. Worst case = one wasted tick.

**What would make this a 10.** Inherent — only zero-cost would be 10.

**Fix to make.** Accepted.

## Next actions

- Two guards appended to #54 description in checkout.db (premise fiat/crypto nuance + #28-branch-B premature-pivot guard).
- #54 stays position 1, ungated; next fresh-context tick executes it.
- complete_problem(#53).
