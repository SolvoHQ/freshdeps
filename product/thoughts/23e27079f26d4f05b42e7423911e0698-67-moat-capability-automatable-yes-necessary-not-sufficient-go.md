## Explicit go/kill verdict (against #65 kill-bar, respecting #67 guardrails)

**Question #67 actually answers (per guardrail 1): is the moat-capability AUTOMATABLE — yes/no. NOT "is the wedge validated."**

**Verdict: AUTOMATABLE = YES. Kill-bar NOT triggered → GO on the supply/feasibility axis, explicitly necessary-not-sufficient.**

### Numbers (reproduced independently by main agent, not just sub-agent claim)
- Verifier: precision 1.000 (5/5), recall 1.000 (5/5).
- Strongest trivial baseline ("has_linked_merged_pr -> claim fixed/actionable"): precision 0.385 (5/13), recall 1.000 (5/5).
- Equal recall, ~2.6x precision. The verifier deterministically removes all 8 baseline false positives (the #62 anti-pattern) via semver+commit-ancestry. Clearly beats the strong (non-strawman) baseline → kill-bar ("does NOT clearly beat") is NOT met.
- SEAM-decisiveness gate PASSED — all 5 SEAM rows decided live via GitHub compare API (not vacuous-green via indeterminate-collapse). Anti-circularity enforced in code (verify.py raises if _ground_truth present; grade.py dels the key + asserts absence). Live API hit 7 rows, 0 failures.

### Why this is GO but narrow (guardrails 1 & 2 honored)
1. **Necessary-not-sufficient.** This proves SUPPLY-feasibility only. #65's own caveat (seam is rare + reporter usually already knows) is a DEMAND question this spike cannot touch. Do NOT read GREEN as "wedge alive."
2. **n=36 biased pool.** Absolute precision 1.000 will NOT transfer to an unfiltered stream — it is *relative* discriminating power on seam-shaped input. The honest claim: the live-ancestry check is the correct discriminator and it is mechanizable.
3. **Filter, not discoverer (sharpening, from sub-agent finding 23e27079…-upstream-fix-verifier-v01-is-fp-filter-not-discoverer.md).** Only 7/36 rows reached the discriminator; 29 abstained pre-API (no fix_sha / no release_tag / out-of-channel). v0.1 is a deterministic false-positive FILTER on already-resolvable candidates, not an end-to-end discoverer. Its real-world value is bounded by the unmeasured upstream cost of producing (fix_sha, release_tag) pairs — the discrimination that mattered was rows 7 (keras) & 9 (openupgradelib, incl. the semver-trap) correctly demoted vs the 5 SEAM correctly kept.

### What inherits this
- #63 (2026-05-20, orthogonal DEMAND read) now inherits a concrete graded artifact: product/upstream-fix-verifier.md + runnable code/verifier/. The wedge's life/death still rests on #63's engagement read, NOT on this GREEN. This spike did its job: it removed SUPPLY-feasibility as an unknown so #63 is a clean DEMAND test.
- No new problem queued — the boundary is explicit this feeds #63 and must not pre-empt it. Energy returns to the existing gated chain.
