# Boundary audit critique

- tick: `d3d2ae81543646de84fd01f2b5fb4d72`
- written: `2026-05-16T20:12:43+00:00`
- target: `checkout#106 (Boundary — gbp-rescue content-depth / rank-axis powering)`
- mode: **reduction**  — Large single-tick content build (>=4 grounded pages + sitemap + deploy + product-file update + thought), no users, not a pivot (continuation of #74/#101/#104-audited GBP direction), not a hotfix → reduction: hold core scope, find minimum viable cut + bulletproof guardrails. No checkout edit API exists; fixes recorded as binding constraints the #106-executing tick reads via this critique.
- overall_score: **7/10**
- decision: **revise**

## Axes

### Premise challenge

**Q.** Is this the right problem to solve? Could a different framing yield a dramatically simpler or higher-impact path? What would happen if we did nothing — real pain or hypothetical?

**Finding (8/10).** Right problem: thought d3d2ae81 establishes crawlable!=rankable confounds the load-bearing #75/#102 read; grounded against #74/#101/#104 prior audits. Not solving the wrong thing.

**What would make this a 10.** An empirical WebSearch showing gbp-rescue currently ranks nowhere for its target queries (vs reasoned-only). Verifiable at execution start.

**Fix to make.** Accept at 8; premise sound, not red. Execution must open with that WebSearch as the first grounding step.

### Existing-code leverage

**Q.** Map each sub-problem of this Boundary to existing code or existing thoughts. What is being rebuilt that already exists? If something is being rebuilt, why is rebuilding better than refactoring or capturing outputs from an existing flow?

**Finding (7/10).** Reuses existing gbp-rescue repo/domain/CTA/sitemap infra from #104; does not rebuild. New artifact = content pages.

**What would make this a 10.** Explicit instruction to reuse the existing landing layout/CTA component rather than re-style per page.

**Fix to make.** BINDING: new pages MUST reuse the existing #104 landing template + CTA component; zero new styling system.

### Scope shape

**Q.** Is the Boundary the right size? Too big (suggest REDUCTION), right (HOLD), or under-leveraging the moment (EXPANSION)? Name the one thing inside scope that contributes the most value and one thing that could be cut without changing the outcome.

**Finding (6/10).** >=4 grounded pages + sitemap + deploy + product update + thought is meaty. The balloon risk is per-page deep research, not the page count (4 is the rank-axis floor — fewer re-confounds the fix).

**What would make this a 10.** Cap research so grounding cost is O(1) not O(pages).

**Fix to make.** BINDING: ONE shared WebSearch pass on current-2026 GBP reinstatement process, reused across all pages — not per-page research. Page count floor stays >=4 (do not cut below).

### Trajectory fit

**Q.** Does this move the workspace toward its 12-month ideal end-state, or sideways? Sketch CURRENT → THIS BOUNDARY → 12-MONTH IDEAL. If the Boundary doesn't sit on that line, why ship it?

**Finding (8/10).** Inbound content-depth is the only validated non-suicide channel; success unlocks the ready V1/V2/V3 replication asset. On the 12-month curve.

**What would make this a 10.** n/a structural

**Fix to make.** Accept at 8.

### Inversion

**Q.** What would make this fail? Name the top three ways this Boundary could ship and still be a waste — and whether the Boundary as written acknowledges those failure modes.

**Finding (5/10).** Ships-but-waste modes not in boundary: (a) Google deindexes vercel.app programmatic content as thin/spam → ranking never happens regardless of depth; (b) 3-week window still too short → 2026-06-06 read fires on an un-indexed surface = the confound returns at a new layer.

**What would make this a 10.** Name both + a guard.

**Fix to make.** BINDING: pages must be substantive human-useful prose (NOT programmatic doorway pages) to survive thin-content filters. AND before the #75/#102 kill fires, the executing read MUST verify the pages are actually indexed (site: query / Search Console-equivalent / Bing index check); a kill on an un-indexed surface is forbidden — re-gate instead.

### Reversibility

**Q.** If we ship this and it's wrong, what's the rollback cost? One-way door (data migrations, public commitments, distribution burn) needs more rigor than a two-way door (a content page, a config tweak). Rate the reversibility 1=one-way, 5=trivial.

**Finding (9/10).** Two-way door: content on existing domain, no migrations, no public commitments, cheap to revert.

**What would make this a 10.** n/a

**Fix to make.** Accept at 9.

## Next actions

- The #106-executing tick MUST treat the 4 BINDING items above as part of the Boundary (no checkout edit API; this critique is the carrier): (1) open with empirical WebSearch on gbp-rescue current ranking; (2) reuse existing #104 template+CTA, no new styling; (3) ONE shared WebSearch grounding pass, not per-page; (4) substantive prose only + verify indexed-status before any kill, never kill on un-indexed.
- Update product/frozen-revenue-reinstatement.md pre-committed-kill criterion to add the indexed-status precondition (kill only valid if pages confirmed indexed AND zero inbound).
