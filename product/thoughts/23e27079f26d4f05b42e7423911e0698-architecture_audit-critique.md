# Architecture audit critique

- tick: `23e27079f26d4f05b42e7423911e0698`
- written: `2026-05-16T10:19:47+00:00`
- target: `code/verifier/{dataset.json,verify.py,grade.py} + product/upstream-fix-verifier.md`
- boundary: `67-upstream-fix-verifier-v0.1`
- overall_score: **7/10**
- ship_readiness: **fix-first**

## Axes

### Architecture & data flow

**Q.** Draw the dependency graph for what this Boundary adds. For each new data flow, trace four paths: happy / nil / empty / error. What's the coupling delta? What breaks first under 10x load? What's the rollback procedure if this ships and immediately breaks production?

**Finding (8/10).** Three-layer separation: dataset.json holds ONLY objective primitives (repo, fix_sha, has_merged_pr, channel, latest_version, release_tag) + ground_truth in a quarantined field the verifier function never receives; verify.py applies the decision rule; grade.py is the only code that reads ground_truth. Ancestry (the actual discriminator) computed LIVE via GitHub compare API tag...fix_sha, NOT trusted from the dossier merge-base prose, so the spike is not graded against itself. Latest-version + release-tag-SHA cached from dossier are objective facts not verdicts, safe.

**What would make this a 10.** A 10 would re-fetch latest version from PyPI/npm/crates live too; deferred because dossier hit PyPI bot walls and version-string is an objective fact, the integrity-critical call (ancestry) is live.

### Error & rescue map

**Q.** For every new method/codepath that can fail, name the specific exception class, whether it is rescued, the rescue action, and what the user sees. Catch-all `except Exception` is always a smell. Swallowing errors without re-raise or user-visible feedback is a P0 gap.

**Finding (6/10).** GitHub compare API can rate-limit / 404 (deleted tag, wrong repo) / return diverged. PyPI noted an anti-bot wall in the dossier. If any of these silently degrades to a disposition (esp. defaulting to fix-NOT-installable) the verifier manufactures fake SEAMs and a green is meaningless.

**What would make this a 10.** Every external failure mode maps explicitly to indeterminate (never to a positive/negative disposition), is logged per-row, and the artifact reports an indeterminate-rate so a high one invalidates the precision/recall rather than hiding in it.

### Edge cases & interactions

**Q.** For each new user-visible interaction or background job, enumerate edge cases — double submit, stale state, network timeout mid-action, zero results, 10k results, queue backed up two hours, job runs twice, partial completion. Which are handled, which are gaps?

**Finding (6/10).** Real traps present in this exact dataset: (1) semver string-sort (dossier already caught openupgradelib 3.9.4<3.13.1) — must parse semver not string-compare; (2) cross-repo fix: image issue #2913 fix lives in image-rs/image-webp, a DIFFERENT repo — fix_repo must be a column distinct from issue_repo; (3) tag normalization v1.1.2 vs 1.1.2; (4) default branch dev vs main (pyro); (5) ~20 rows have no fix SHA (indet/excl) and MUST resolve to indeterminate by rule with zero network.

**What would make this a 10.** All five encoded as explicit dataset columns + rule branches, plus a semver lib (packaging/semver) rather than ad-hoc compare.

### Test coverage

**Q.** List every new codepath, async job, integration, and rescue branch. For each: does a test exist or is it specced in the Boundary? What's the test a hostile QA engineer would write? What's the test that would make you confident shipping at 2am on a Friday?

**Finding (7/10).** Grading IS the test. Risk: a vacuous green where the 5 known SEAMs all collapse to indeterminate (API failure) yet baseline also scores low, so verifier looks better trivially. Need a sanity gate: assert the 5 SEAM rows reach a decisive (non-indeterminate) disposition, else the run is inconclusive not green.

**What would make this a 10.** Explicit assertion + the artifact must state per-class indeterminate counts so a reader sees whether the 5 SEAMs were actually decided.

### Scope minimality

**Q.** What is the minimum set of changes that achieves the stated Boundary outcome? Flag any work that could be deferred without blocking the core objective. If the Boundary touches more than 8 files or introduces more than 2 new classes/services, treat that as a smell and propose a reduction.

**Finding (9/10).** 4 files, single tick. Stretch (diff-vs-issue semantic check) already demoted by boundary_audit and stays cut. No balloon risk.

**What would make this a 10.** Already minimal.

## Concrete issues

### 1. [P1] (confidence: 8/10) External API failure must map to indeterminate, never to a disposition

_Axis_: `error_rescue`

GitHub compare 403/404/rate-limit or registry failure, if defaulted to fix-NOT-installable, fabricates SEAMs and makes a green vacuous. This is the single highest-integrity-risk path in the spike.

**Fix.** verify.py: wrap every network call; any non-200 / exception -> return disposition=indeterminate with a reason string. Never infer ancestry from a failed call. grade.py reports indeterminate count per ground-truth class.

### 2. [P1] (confidence: 8/10) Cross-repo fix + semver string-sort + tag normalization

_Axis_: `edge_cases`

image#2913 fix is in image-rs/image-webp (different repo); openupgradelib already burned a string-sort; tags appear as both vX.Y.Z and X.Y.Z; pyro default branch is dev. Any of these silently mis-evaluates ancestry.

**Fix.** dataset.json columns: issue_repo, fix_repo (separate), fix_sha, default_branch, latest_version, latest_release_tag (verbatim). verify.py: use packaging.version for semver; try both tag and v-prefixed tag against GitHub compare; ancestry computed against fix_repo not issue_repo.

### 3. [P2] (confidence: 7/10) Guard against a vacuous green from indeterminate-collapse

_Axis_: `test_coverage`

If the 5 SEAM rows all degrade to indeterminate, precision/recall math can still make the verifier look like it beats baseline without having decided anything.

**Fix.** grade.py asserts the 5 SEAM rows are decisively classified; if not, the artifact verdict is INCONCLUSIVE (re-run / not a kill, not a go), explicitly distinct from go/kill.

## Next actions

- Bake the 3 fixes into the build spec handed to the sub-agent (not post-hoc): API-fail->indeterminate, separate fix_repo column + packaging.version semver + tag-normalization, SEAM-decisiveness assertion.
- Spawn sub-agent to build dataset.json (objective primitives + quarantined ground_truth) + verify.py + grade.py; main agent verifies the 3 fixes are present and the 5 SEAM rows decide before trusting the precision/recall.
