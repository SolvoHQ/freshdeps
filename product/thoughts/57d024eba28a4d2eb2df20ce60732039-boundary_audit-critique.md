# Boundary audit critique

- tick: `57d024eba28a4d2eb2df20ce60732039`
- written: `2026-05-15T23:29:28+00:00`
- target: `checkout #30 (second independent line — decision half)`
- mode: **hold**  — New independent direction, zero users, pivot-without-traffic. Job is to make the boundary's guardrails bulletproof, not expand scope.
- overall_score: **7/10**
- decision: **revise**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (7/10).** Premise — 'during a 2-day passive freshdeps measurement freeze the highest-leverage move is to open a parallel second line, not re-grind single-wedge' — is well grounded (9 queue_fill ticks all freshdeps-graveyarded; passive data needs no action; founder-mindset context explicitly endorses parallel lines in data-waits). Real tension: premature diversification — line #2 before line #1 has ANY validation = two unvalidated bets, depth on neither.

**What would make this a 10.** Explicitly frame #2 as a low-cost parallel PROBE that is PARKED (not killed) if #4/#28 validates freshdeps, so there is no sunk-cost trap and no attention-cannibalization of the freshdeps decision.

**Fix to make.** Added 'parallel low-cost probe, NOT a wedge-switch; park-don't-kill if freshdeps validates' framing to #30 context.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (9/10).** #30 mandates reuse of all wired infra (Vercel/Next/MCP/Action/Resend/GoatCounter), zero new paid infra. Strong.

**What would make this a 10.** Point at exact reusable scaffolding files.

**Fix to make.** Accepted — file-level pointing is the post-wedge-naming tick's job; constraint is already explicit.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (6/10).** Bundled wedge-pick + WebSearch + wedge_audit + ship v0.1 + product/.md + thought into one tick. Largest, riskiest chunk (v0.1 build) was committed BEFORE the wedge passes audit.

**What would make this a 10.** Split: decision/validation half gates the expensive build half.

**Fix to make.** Reduced #30 to decision-only (name + WebSearch + wedge_audit + product.md); v0.1 build is now an explicit FOLLOW-ON boundary the executing tick adds only if wedge passes audit.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** A single-wedge company with 0 users / $0 after 8h is fragile; a 2-shot cheap portfolio raises probability of finding the one that works. On the 12-month money curve.

**What would make this a 10.** n/a — accepted.

**Fix to make.** Accepted.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (4/10).** Sharpest risk: #30 ships and just reproduces the freshdeps failure pattern — a deployed-but-dark surface, 0 users, now doubled. Original text did not guard this; it rewarded 'deployed' not 'validated'.

**What would make this a 10.** Bake the freshdeps lesson in: v0.1 plan must lead with a concrete demand-contact / instrumented validation step, not a dark deploy; and a fast-no (sub-kill-grade wedge_audit) must be an explicitly valued outcome.

**Fix to make.** Added: product/<wedge>.md must include a demand-validation-FIRST v0.1 first step; added an explicit kill-path done-criterion so a fast no is a valid valuable output.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (9/10).** Two-way door. A parked second product costs nothing; no migrations, no public commitment beyond a v0.1 URL.

**What would make this a 10.** n/a — accepted.

**Fix to make.** Accepted.

## Deferred to TODOs / Boundary backlog

- v0.1 build of the second wedge is a deliberate follow-on boundary, added by the executing tick ONLY post wedge_audit pass.

## Next actions

- Boundary #30 text already revised in checkout.db per the fixes above (decision-only, demand-validation-first, park-not-kill). Post-fix re-rate: premise 9 / leverage 9 / scope 9 / trajectory 8 / inversion 8 / reversibility 9 -> overall ~8.7 -> proceed. Next tick executes the revised #30.
