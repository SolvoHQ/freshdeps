# Supply-Yield Live Test — wedge SUPPLY ceiling (problem #70)

One-shot, hard-capped LIVE run of the discovery→#67-verifier pipeline against
a real-time GitHub candidate stream. Measures the **supply** unknown that
#67 (frozen filter) and #63 (demand, 2026-05-20) both leave open:
*verifier-passing actionable opportunities per unit live-scan*.

Wedge under test: "named-dev zero-agenda-fix" — a named dev reports a concrete
recent bug; a specific merged commit/PR on the default branch fixes it; that
fix is NOT in the latest installable release on PyPI / npm / crates.io; we
hand them the exact VCS-pin install command (pure help, zero agenda).

---

## 0. PRE-REGISTRATION (written 2026-05-16T10:47Z, BEFORE any results)

### 0a. Sampling method (fixed, reproducible, non-cherry-picked)

- **Source:** GitHub Issues Search API `GET /search/issues`.
- **Query (verbatim, fixed):**
  `("not been released" OR "not released yet" OR "hasn't been released" OR "not yet been released" OR "please cut a release") is:issue created:>=2026-04-16`
- **Ordering:** `sort=created&order=desc` (deterministic; no best-match,
  no hand-pick of repos).
- **Recency window:** issues created 2026-04-16 .. 2026-05-16 (fixed 30-day
  window ending at the tick date).
- **Sample:** the first **60** issues returned in `created desc` order.
  No filtering, skipping, or re-ranking by hand — the first 60 are the
  sample, full stop.

Rationale for an OR-of-phrases single query: the seam's own reporters use
these literal phrasings ("hasn't been released yet", "no release is
available yet containing the fix" — see discovery-batch2-dossier.md). A
single fixed query keeps the run reproducible and non-cherry-picked, per
the #70 Boundary ("a defined, reproducible, non-cherry-picked query … not
hand-picked repos"). Query recall is a known limitation — accounted for by
the asymmetric kill bar (0c).

### 0b. Scan budget cap (hard)

- ≤ **60** issues enriched + verified (the sample above).
- ≤ **400** GitHub core API calls total (≈6.7/issue: timeline, linked-PR,
  merge-commit, repo manifest, latest release, fallbacks). Core budget
  remaining at pre-reg: 4978 — cap is self-imposed, not a rate ceiling.
- ≤ **15 min** wall-clock for the enrichment+verify pass.
- Run aborts at whichever cap binds first; partial results are reported
  honestly with the cap that bound.

### 0c. Pre-registered KILL threshold (binary, set before results)

Let **P** = count of verifier-passing candidates (#67 verify() as-is
returns `fix-NOT-yet-installable`) from the 60-issue scan that ALSO pass
hand-precision on the dossier rubric (0d) — i.e. true actionable SEAMs.

- **KILL input:** `P < 3` (effective yield `< 0.05` true SEAM per scanned
  issue). At this level a single capped live scan cannot produce enough
  fresh, real opportunities to sustain a zero-agenda outreach engine; the
  supply ceiling is too low to justify building the engine, *independent
  of any #63 demand verdict*.
- **GO / de-risk input:** `P ≥ 3` (yield `≥ 0.05`/scanned-issue). Supply
  ceiling is high enough to de-risk #63 and the per-scan number defines
  the engine throughput.

The bar is deliberately **asymmetric / lenient toward GO**: the
frozen-dossier baseline yielded 5 true SEAM from 36 *hand-curated*
seam-shaped issues (0.139/issue). One-shot automated sourcing is strictly
weaker than hand-curation, so a kill is only declared if even a reasonable
automated query yields near-zero — that isolates "no supply" from "weak
one-shot sourcing". A low P with high raw-candidate count + high
indeterminate rate is reported as a *sourcing-limited inconclusive with a
named bounded follow-up* (not a silent kill), per #70 done-criteria.

### 0d. Hand-precision rubric (SAME as discovery-batch2-dossier.md)

A verifier-passing candidate is scored **true SEAM** by hand iff ALL hold:
1. **Named dev** filed/owns the issue (real GH handle, not a bot).
2. **Concrete recent bug** with a repro/stack-trace/specific symptom (not a
   feature request, docs nit, or vague "doesn't work").
3. A **specific merged commit/PR on the default branch** is the fix.
4. That fix is **NOT** in the latest *installable* release on
   pip/npm/crates (semver-aware, string-sort trap avoided).
5. **Channel ∈ {pypi, npm, crates}** (Maven/RubyGems/tarball/Hex = excl).
This is the exact rubric that labelled the 36 dossier rows; the live
precision number is therefore directly comparable to the #67 1.00 baseline.

---

## 1. RESULTS (capped run executed 2026-05-16; raw: product/artifacts/supply-scan-raw-70.json)

### 1a. Cap that bound
**None** — issue-count was the limiter: all 60 pre-registered sample issues
were processed. 195 GitHub API calls used (cap 400). 283 s wall-clock
(cap 900 s). No rate-limit, no aborts, 0 per-issue enrich errors. The
result is NOT truncated by any budget cap.

### 1b. Raw candidates surfaced
**60** issues (full pre-registered sample; the fixed query returned ≥60 in
the 2026-04-16..2026-05-16 window).

### 1c. Verifier-passing count (verify() as-is)
**3** of 60 returned `fix-NOT-yet-installable`. 57 of 60 `indeterminate`
(no resolvable same-repo merged-PR fix_sha / no release tag /
out-of-channel — verify()'s own returns, not script failures). 0
`fix-IS-in-installable-release`.

The 3 verifier-passing:
1. home-assistant/core#170838 — Mincka — fix `816544b5…` not in tag
   `2026.5.2` (compare=diverged). PR #170871 base=`dev`.
2. home-assistant/core#170824 — frenck — fix `54da9649…` not in
   `2026.5.2` (compare=diverged). PR #170836 base=`dev`.
3. sdebruyn/dbt-fabric#120 — sdebruyn — fix `081d4d5a…` not in
   `v1.11.2` (compare=ahead). PR #119 base=`main`.

### 1d. Hand precision of the passing set (rubric 0d)
**0 / 3 = 0.00.** All three fail the dossier rubric:

- **#170838 (Mincka):** fails (5)/spirit — `home-assistant/core` is an
  *application*, not a pip/npm/cargo library a third party depends on
  (same class as the dossier's `nav` Django-app exclusion / "app-not-
  library"). No external dev pins a git rev of `homeassistant`; the fix
  is on `dev` and ships in the next routine HA release. Not the seam.
- **#170824 (frenck):** fails (2) and (1)/spirit — filed by the HA lead
  maintainer as an internal refactor task ("Group sequential
  async_add_executor_job calls"), not a concrete externally-reported bug;
  app-not-library. Not the seam.
- **dbt-fabric#120 (sdebruyn):** fails (2) and (1)/spirit — "Add Python
  3.14 support" is a feature/enhancement, self-filed by the repo's own
  owner (sdebruyn ⇒ sdebruyn/dbt-fabric). No external stuck dev, no
  concrete bug. Not the seam.

**Root cause (the load-bearing finding):** the #67 verifier's only
discriminator is the ancestry check "fix_sha not in latest release tag".
In *any* actively-developed repo with a `dev`/`main` integration branch
and periodic releases, **every routine merge after the last release tag
is trivially "ahead/diverged"** — so the check fires on normal
development, not on the rare "maintainer is sitting on a fix an external
dev is stuck on" seam. On the frozen dossier this defect was invisible
because humans had pre-filtered to true seams *before* verify() ran. On a
live stream the verifier passes routine maintainer merges. The 1.00
frozen precision is an artifact of hand-curated input and does **not**
transfer.

### 1e. Yield-per-scan vs frozen-dossier baseline
- **Frozen dossier (#67/batch-2):** hand-curated 36 seam-shaped issues →
  verifier-passing set 5/5, hand-precision 1.00 ⇒ 5 true SEAM / 36
  hand-screened = **0.139 true-SEAM per hand-screened issue**.
- **Live capped scan (#70):** automated query, 60 issues → verifier-
  passing 3/60, hand-precision **0/3** ⇒ **0.00 true-SEAM per
  live-scanned issue** (P = 0).
- The drop is not (only) sourcing recall (57/60 indeterminate is a known,
  pre-accounted one-shot-sourcing weakness). The decisive drop is
  *precision of the set the verifier DID pass*: 1.00 → 0.00.

### 1f. Binary GO / KILL read against 0c

**KILL input.** Pre-registered 0c: P (verifier-passing AND
hand-precision-confirmed) `< 3` ⇒ wedge-kill input. **P = 0 < 3.**

This is NOT the "sourcing-limited inconclusive" escape in 0c. That clause
protects against killing on sourcing *recall* (the 57 indeterminates
alone). The kill here is driven by **precision collapse on the candidates
the verifier did pass** (0/3) — a structural defect in the
discovery→#67-verifier pipeline, qualitatively stronger than and
independent of the recall weakness. The result is decisive, not
uncertain; no additional bounded run is required to reach the KILL read.

**Scope of the claim (honest bound):** what is killed is *the wedge
engine **as specified** = discovery → #67-verifier-as-the-filter*. Its
live true-SEAM supply ceiling is **0 per 60-issue scan**. A wedge engine
that automated the rubric-0d gates (external-stuck-dev vs maintainer;
concrete-bug vs feature/refactor; depended-on-library vs app) *might*
have non-zero supply — but #67 explicitly is not that, and #70's Boundary
explicitly forbids building it. So: **supply for the currently-specified
engine is killed; this is a hard KILL input for #63's wedge decision,
independent of any demand signal.** If #63 wants to test the
rubric-gated-engine hypothesis it must first re-spec the filter — a
separate, scoped Boundary, not an "uncertain" terminal here.
