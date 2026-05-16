# Boundary audit critique

- tick: `4d9bb0f22bfc4eb082bde2a8c1f86474`
- written: `2026-05-16T19:39:00+00:00`
- target: `problems/checkout.db#104`
- mode: **reduction**  — reduction: premise (inbound ever converts) still unvalidated (#101 observation_surprise 1/10); building 3 new landings before ANY powered inbound read is speculative over-build / freeze-in-costume. Minimum viable cut (de-rig + re-time the ONE existing read) achieves the core outcome of breaking the freeze-regenerator without the speculative 3x build.
- overall_score: **5/10**
- decision: **revise**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (6/10).** The real problem #104 names is correct and falsifiable: #75 reads ONE un-indexed page so it returns ~zero for SEO-physics reasons, not demand reasons, which regenerates the 28+ tick freeze. BUT #104 conflates two premises of very different confidence: (a) 'de-rig the existing read' (high-confidence, cheap, correct) and (b) 'build 3 NEW verticals' whose premise (inbound EVER converts) is still unvalidated per #101 wedge_audit observation_surprise 1/10 (zero named human ever reacted to any artifact).

**What would make this a 10.** Boundary scoped strictly to de-rigging the ONE existing GBP read; V1/V2/V3 replication explicitly gated on that now-powered read returning non-zero.

**Fix to make.** Reduce IN-SCOPE to: discoverability fix on existing gbp-rescue landing only. Move V1/V2/V3 build to a successor gated on the powered read.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (5/10).** gbp-rescue.vercel.app already exists and product/frozen-revenue-reinstatement.md grounding already exists. #104 rebuilds 3 landings from scratch BEFORE the existing template's own read is even powered — rebuilding the unproven before proving the built.

**What would make this a 10.** Use the 1 existing landing as the powered-read instrument; replicate only after it converts.

**Fix to make.** Same as premise fix — cut the 3x rebuild.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (4/10).** Too big. The single cuttable (and correctly cuttable) item is the entire V1/V2/V3 replication — that is exactly the speculative effort the #101 gate's effort-conservation logic was right to protect. #101's gate was only WRONG about the discoverability fix, not about the 3-vertical build.

**What would make this a 10.** Scope = discoverability + read-timing fix on the existing landing; nothing built speculatively.

**Fix to make.** Re-author description to discoverability-on-GBP-only + push #75 read gate to a realistic indexing window + pre-committed honest kill criterion.

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** Direction is right and on-curve: inbound-pull is the only validated non-suicide WTP-permitting channel in all workspace history; making its ONE instrument actually readable is the correct next move toward first revenue.

**What would make this a 10.** Already strong; trajectory unchanged by the reduction.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (3/10).** Top ways #104 ships and is still waste: (1) 3 landings built, inbound still zero because demand genuinely absent -> 3x wasted effort the #101 gate explicitly warned against; (2) SEO indexing takes WEEKS not days, so even a discoverability-fixed page is not ranked by the #75 2026-05-20 gate -> the read is STILL rigged, just by timing instead of by indexing — the gate DATE is the deeper bug; (3) splitting thin inbound signal across 3 separate vertical addresses dilutes an already near-zero signal.

**What would make this a 10.** Reduced scope kills (1) and (3). For (2): the Boundary must ALSO push the #75/#102 read gates out to a realistic post-indexing window and pre-commit an honest kill criterion, otherwise the freeze regenerates on a timing technicality.

**Fix to make.** Add to Boundary: re-gate #75/#102 to ~2026-06-06 (≈3wk indexing window) and define explicit kill: discoverability-fixed + realistic index window elapsed + inbound still zero => inbound channel honestly falsified for the category, jump by reachability-first inversion.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (7/10).** Two-way door; content/deploy cheap. But 3 new Vercel projects + 3 inbound addresses is more surface to unwind than a single discoverability patch.

**What would make this a 10.** Reduced scope (patch the 1 existing landing) is near-fully reversible.

**Fix to make.** Covered by the reduction.

## Deferred to TODOs / Boundary backlog

- V1/V2/V3 inbound-landing replication — successor Boundary, gated on the now-powered #75 read returning non-zero (preserves #101 effort-conservation for the genuinely speculative part).

## Next actions

- Re-author queued problem #104 description: scope = discoverability fix on existing gbp-rescue landing only (sitemap + IndexNow/search-console + >=1 legit inbound reference) + re-gate #75/#102 reads to a realistic ~3-week indexing window + pre-committed honest kill criterion.
- record_thought capturing the reduction rationale (the freeze-regenerator is BOTH un-indexed-page AND too-early read-gate; #101's gate was right about the 3x build, wrong only about discoverability+timing).
