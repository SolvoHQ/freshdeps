## Conclusion
proto-hypothesis-#2 ("fixed upstream but not in an installable release") is a REAL recurring dev pain — but rare, and dominated by a high false-positive rate. 4 named devs (rukai/lazyjj, dionhaefner/physicsnemo, AdrianSosic/pyro, danylkod/vaul) received verified zero-agenda VCS-pin artifacts; image-rs#2913 was a true seam but honestly dropped (named dev is a maintainer who already self-diagnosed the fix).

## The hard numbers (#65 deliverable)
- Pool N=36 (bias-enriched treatment arm — queries deliberately hunted the seam), seam S=5 → 13.9% INSIDE the biased pool. NOT a base rate; only meaningful vs unfiltered batch-1 control on #63.
- **Load-bearing finding: 7 of the 12 strongest-looking candidates (~58%) collapsed to NOT-seam on verification** because the fix was already in a published release (the #62 anti-pattern: "user just on an old version"). pdfme/keras/python-aiplatform/openupgradelib/demoparser/lint-po/grain.

## What this implies for #63 (2026-05-20 thesis read — do NOT pre-empt)
- The seam exists but is NOT abundant; a product premised on "there are tons of these" is weak. The differentiated value is not *finding* the seam, it is the VERIFICATION rigor (semver-correct release comparison, merge-base ancestry proof, reading the diff vs the issue) — that is where ~58% of naive attempts would ship misleading "a fix is open" spam.
- This reframes any candidate wedge: not "surface fixed-but-unreleased bugs" (low volume, and the reporter usually already knows) but possibly "trustworthy auto-verification that a claimed upstream fix is genuinely (a) the fix and (b) not yet installable" — i.e. the moat is the false-positive filter, not the discovery.
- Engagement-independent: even if batch-1/batch-2 get zero replies, the 58% false-positive rate is itself a grounded finding about the problem space. #63 must weigh "rare + reporter-already-knows" against any monetization story (the boundary_audit waste-mode-3 deferred there).

## Sources
- product/discovery.md (batch-2 ledger), product/discovery-batch2-dossier.md (full per-case evidence + 36-issue disposition table)
- 4 live comments by SolvoFounder: lazyjj#201 c-4466509214, physicsnemo#1607 c-4466509384, pyro#3450 c-4466509551, vaul#647 c-4466509729