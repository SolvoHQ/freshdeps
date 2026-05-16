# Upstream-Fix Verifier — v0.1 feasibility spike (problem #67)

## (a) Verdict status

**GREEN — verifier beats baseline.** The deterministic verifier achieves
precision 1.000 / recall 1.000 on SEAM detection vs. the strongest trivial
baseline at precision 0.385 / recall 1.000. The numbers support GREEN; this
file deliberately states **only which of {GREEN / RED / INCONCLUSIVE} the
numbers support** and makes no go/kill business call — that is the parent
agent's decision.

## (b) Mandatory caveat

> **n=36 from a deliberately seam-biased pool; precision/recall are NOT a
> population base rate.** The 36 rows were hand-curated from seam-SHAPED
> candidates. Real-world inflow is overwhelmingly non-seam, so the absolute
> precision here cannot be projected onto an unfiltered issue stream. What
> this spike establishes is *relative* discriminating power on seam-shaped
> input, plus that the live-ancestry check is the right discriminator.

## (c) Precision / recall (positive class = SEAM)

|            | VERIFIER       | BASELINE        |
|------------|----------------|-----------------|
| TP         | 5              | 5               |
| FP         | 0              | 8               |
| FN         | 0              | 0               |
| TN         | 31             | 23              |
| precision  | 1.000 (5/5)    | 0.385 (5/13)    |
| recall     | 1.000 (5/5)    | 1.000 (5/5)     |

Baseline = `has_linked_merged_pr is True` (the strongest trivial heuristic:
"issue has a linked merged PR → claim fixed/actionable"). It catches every
true SEAM but also fires on 8 negatives (the "#62 anti-pattern": fix already
shipped, or out-of-channel), collapsing precision to 0.385.

## (d) Confusion matrices

### Verifier (rows = GT, cols = predicted)

| GT \ pred | SEAM | not-SEAM | indeterminate |
|-----------|------|----------|---------------|
| SEAM      | 5    | 0        | 0             |
| not-seam  | 0    | 2        | 15            |
| indet     | 0    | 0        | 9             |
| excl      | 0    | 0        | 5             |

### Baseline (rows = GT, cols = baseline pred)

| GT \ pred | seam | not-seam |
|-----------|------|----------|
| SEAM      | 5    | 0        |
| not-seam  | 5    | 12       |
| indet     | 0    | 9        |
| excl      | 3    | 2        |

## (e) Indeterminate-rate per GT class (verifier)

| GT class | indeterminate / total | rate  |
|----------|-----------------------|-------|
| SEAM     | 0 / 5                 | 0.000 |
| not-seam | 15 / 17               | 0.882 |
| indet    | 9 / 9                 | 1.000 |
| excl     | 5 / 5                 | 1.000 |

The verifier abstains heavily on negatives (no fix sha / no release tag /
out-of-channel) rather than guessing — which is *why* it has zero false
positives. It is decisive precisely where the discriminator matters (all 5
true SEAMs) and abstains elsewhere. Abstention counts as predicted-negative
for binary scoring but is reported separately here.

## (f) SEAM-decisiveness gate

**PASSED.** All 5 GT==SEAM rows (ids 1–5) received a decisive disposition
(`fix-NOT-yet-installable`), none indeterminate. A GREEN is only valid when
this gate passes; it did. (If it had failed, the verdict would be forced to
INCONCLUSIVE and the grader would exit nonzero.)

All ancestry decisions for ids 1–5 were computed LIVE via the GitHub compare
API on `fix_repo` (statuses: ahead/ahead/diverged/ahead/ahead → all "fix not
in release tag"). Zero GitHub API failures across the full run.

## (g) Full per-row results

| id | issue_repo | channel | has_pr | verifier disposition | verifier reason | base pred | _ground_truth |
|----|------------|---------|--------|----------------------|-----------------|-----------|---------------|
| 1  | image-rs/image | crates | True | fix-NOT-yet-installable | fix_sha not in v0.2.4 (status=ahead) | True | SEAM |
| 2  | Cretezy/lazyjj | crates | True | fix-NOT-yet-installable | fix_sha not in v0.5.0 (status=ahead) | True | SEAM |
| 3  | NVIDIA/physicsnemo | pypi | True | fix-NOT-yet-installable | fix_sha not in v2.0.0 (status=diverged) | True | SEAM |
| 4  | pyro-ppl/pyro | pypi | True | fix-NOT-yet-installable | fix_sha not in 1.9.1 (status=ahead) | True | SEAM |
| 5  | emilkowalski/vaul | npm | True | fix-NOT-yet-installable | fix_sha not in v1.1.2 (status=ahead) | True | SEAM |
| 6  | pdfme/pdfme | npm | True | indeterminate | cannot resolve installable release tag | True | not-seam |
| 7  | keras-team/keras | pypi | True | fix-IS-in-installable-release | ancestor of v3.14.1 (status=behind) | True | not-seam |
| 8  | googleapis/python-aiplatform | pypi | True | indeterminate | no identifiable merged fix commit | True | not-seam |
| 9  | OCA/openupgradelib | pypi | True | fix-IS-in-installable-release | ancestor of 3.13.1 (status=behind) | True | not-seam |
| 10 | LaihoE/demoparser | npm | True | indeterminate | no identifiable merged fix commit | True | not-seam |
| 11 | himdel/lint-po | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 12 | mmartoccia/grain | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 13 | ton-blockchain/ton4j | out-of-channel | True | indeterminate | out-of-scope channel | True | excl |
| 14 | stanfordnlp/dspy | pypi | False | indeterminate | no identifiable merged fix commit | False | excl |
| 15 | Devolutions/sspi-rs | crates | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 16 | pola-rs/polars | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 17 | tarkovtracker-org/TarkovTracker | out-of-channel | False | indeterminate | out-of-scope channel | False | indet |
| 18 | pyvista/pyvista | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 19 | temporalio/sdk-rust | crates | False | indeterminate | no identifiable merged fix commit | False | indet |
| 20 | open-telemetry/opentelemetry-python | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 21 | dusc-dev/rspec-ctrf | out-of-channel | True | indeterminate | out-of-scope channel | True | excl |
| 22 | Black-HOST/csf | out-of-channel | False | indeterminate | out-of-scope channel | False | excl |
| 23 | quarkiverse/quarkus-unleash | out-of-channel | True | indeterminate | out-of-scope channel | True | excl |
| 24 | scipy/scipy | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 25 | snakemake/snakemake | pypi | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 26 | snakemake/snakemake | pypi | False | indeterminate | no identifiable merged fix commit | False | indet |
| 27 | projectM-visualizer/projectm | out-of-channel | False | indeterminate | out-of-scope channel | False | indet |
| 28 | image-rs/image | crates | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 29 | pdfme/pdfme | npm | False | indeterminate | no identifiable merged fix commit | False | not-seam |
| 30 | nimiq/core-rs-albatross | crates | False | indeterminate | no identifiable merged fix commit | False | indet |
| 31 | hexpm/hex | out-of-channel | False | indeterminate | out-of-scope channel | False | not-seam |
| 32 | unslothai/unsloth | pypi | False | indeterminate | no identifiable merged fix commit | False | indet |
| 33 | astral-sh/uv | pypi | False | indeterminate | no identifiable merged fix commit | False | indet |
| 34 | GreatScott/py-appsheet | pypi | False | indeterminate | no identifiable merged fix commit | False | indet |
| 35 | Imageomics/pybioclip | pypi | False | indeterminate | no identifiable merged fix commit | False | indet |
| 36 | Uninett/nav | out-of-channel | False | indeterminate | out-of-scope channel | False | not-seam |

## Anti-circularity note

`verify.py` never sees `_ground_truth` — `grade.py` physically `del`s the
key from a row copy and asserts its absence before calling `verify()`, and
`verify()` raises if the key is present. The SEAM/not-seam discriminator
(rows 1,2,3,4,5 vs 7,9) was computed live via `GET /repos/{fix_repo}/
compare/{release_tag}...{fix_sha}` — no "already shipped" conclusion was
copied from dossier prose. `latest_version` / `release_tag` are objective
git facts and are the only release-side inputs used (verbatim, never
string-sorted).

## Honest read of the limit

The verifier's power on THIS pool is concentrated in 7 rows that had a
resolvable (fix_sha, release_tag) pair (ids 1–5 SEAM, 7+9 already-shipped).
The other 29 collapse to `indeterminate` before any API call — meaning v0.1
is really a clean *false-positive filter on already-actionable candidates*,
not a from-scratch seam discoverer. That is exactly the moat hypothesis
under test (#62 anti-pattern filter), and on the 7 it can decide it is
perfect, but the high not-seam abstention rate (0.882) is the real-world
caveat the parent should weigh.
