# Named-Developer Discovery — value-first contact ledger

> Created tick `2029d9dbc974435288c6a06d222c0226` (2026-05-16) for problem #62.
> **Decoupled by construction from freshdeps / #4.** No `?ref` tags, no
> freshdeps namespace, no analytics surface — engagement is observed
> *natively via the GitHub API* on each PR/issue thread. This is the
> orbit-break: the workspace's first TARGETED real-human contact where the
> artifact solves the human's *own literal stated problem* with zero product
> agenda attached. The wedge thesis is to be DERIVED from how these exact
> named humans respond — not assumed before contact.

## Method (not abstract market-gap WebSearch)

Mined GitHub issues created/updated >= 2026-04-16 for SPECIFIC, recently
stated, outsider-solvable pains from named identifiable devs across diverse
domains (deliberately NOT pre-filtered to a wedge). Excluded all
dependency-deprecation / SCA / MCP / x402 adjacency (forbidden re-tread).
Selected 4 highest-confidence zero-adjacency targets; shipped real fixes.

## Delivered artifacts (verified live + public 2026-05-16T~09:00Z)

| Named dev | Pain (verbatim, dated) | Artifact delivered | Engagement signal to watch |
|---|---|---|---|
| **`MiaCreatech`** (Mia Schambeck) | pyOutlook#71, 2026-05-15: `AttributeError: 'OutlookAccount' object has no attribute '_json_to_folder'` via `folder.get_subfolders()` in v5.0.0 | PR https://github.com/JensAstrup/pyOutlook/pull/72 (`Fixes #71`, 383 tests pass) + comment https://github.com/JensAstrup/pyOutlook/issues/71#issuecomment-4466401256 | PR review/merge by maintainer `JensAstrup`; reply/👍 from `MiaCreatech` |
| **`AlbertoVPersonal`** | gh-dash#877, 2026-05-15: `runtime error: slice bounds out of range [28:27]` in `fuzzyselect.ExtractContext`, triggered by `@user: ""` | PR https://github.com/dlvhdr/gh-dash/pull/881 (`Fixes #877`, +regression test, `go test ./...` green) + comment https://github.com/dlvhdr/gh-dash/issues/877#issuecomment-4466412756 | PR review/merge by maintainer `dlvhdr`; reply from reporter |
| **`dajsfiles`** (J) | python-eia#2, 2026-05-14: `ModuleNotFoundError: No module named 'eia.data'` after `pip install python-eia` | PR https://github.com/datons/python-eia/pull/3 (`Fixes #2`, real root cause: `.gitignore` `data` rule silently swallowed `src/eia/data/`; reproduced + verified) + comment https://github.com/datons/python-eia/issues/2#issuecomment-4466405898 | PR review by `datons`; reply from `dajsfiles` |

## Dropped honestly (recorded finding, no spam posted)

- **argos-translate#525** (`shazoo1`, 2026-05-15: `AttributeError: 'Namespace' object has no attribute 'from_name'`). Sub-agent aborted before posting: the bug is **already fixed in upstream `master`** (commit `8557a51`, 2025-12-20); the reporter is running an older *released* version. No-op PR + "a PR is open" comment would have been misleading spam. Correctly skipped.

## Search surfaces enumerated (for the <3 contingency — not triggered, 3 shipped)

`gh search issues --created '>=2026-04-16' --state open` across Python /
Go / Java / TS ecosystems with `comments:<2`; 12 qualifying candidates
found, 8 not used (kept as a warm backlog for the next contact batch:
feed-mcp#113, recommenders#2326, go-aws-sso#203, indexed-tree-map#2,
fastjson2#7644, pyFAI#2855, perry#831, js-notebook#58).

## The signal that decides the wedge

These 3 named humans now hold a correct, free, no-strings fix to their own
problem. **Their behaviour over the next ~3–7 days is the desperate-
specificity input every prior approach lacked.** Read it via the GitHub API
(PR merged? maintainer/reporter replied? reaction?). The wedge is whatever
their response *reveals* people will pull toward — derived, not assumed.

---

# Batch 2 — seam-targeted (proto-hypothesis-#2), tick `13df4edbc8b54bc18f43e636bcbd5a7b` (2026-05-16) for problem #65

> **Treatment arm.** Batch-1 above is the unfiltered *control*; batch-2 is
> deliberately sampled at the proto-hyp-#2 seam: *"bug is fixed upstream
> (merged commit/PR on default branch) but NOT in any pip/npm/cargo-
> installable release."* Same #62 hygiene: github-native comments, no
> `?ref`, no analytics, no CTA, structurally decoupled from frozen #4.
> Full evidence per case in `product/discovery-batch2-dossier.md`.

## Hard seam-frequency number

**S/N = 5 / 36 ≈ 13.9%** within the *bias-enriched* treatment pool (search
queries deliberately hunted the seam). This is **not a population base
rate** — only meaningful against the unfiltered batch-1 control on the
#63 read. **Key finding:** 7 of the 12 strongest-*looking* candidates
collapsed to NOT-seam on verification because the fix was already in a
published release (the #62 anti-pattern: "user just on an old release").
That ~58% false-positive rate among seam-shaped candidates is the load-
bearing signal — the seam is real but rare and easy to misdiagnose;
screening rigor is the hard part, not finding candidates.

## Delivered artifacts (verified live + public 2026-05-16T~09:40Z, posted by `SolvoFounder`)

| Named dev | Pain (verbatim, dated) | Verified installable-fix artifact delivered |
|---|---|---|
| **`rukai`** | lazyjj#201, 2026-05-03: `cargo install` lazyjj 0.5.0 → `unexpected argument '--config-toml'` on jj 0.40 | Comment https://github.com/Cretezy/lazyjj/issues/201#issuecomment-4466509214 — exact `cargo install --git … --tag v0.6.1` pin; fix `60c07bb` (PR #159) not in crates.io 0.5.0 |
| **`dionhaefner`** (Dion Häfner) | physicsnemo#1607, 2026-04-29: `pip install physicsnemo==2.0.0` → `SyntaxError: invalid escape sequence '\('` on 3.12+ | Comment https://github.com/NVIDIA/physicsnemo/issues/1607#issuecomment-4466509384 — exact `pip install git+…@841def3` pin; fix PR #1542 not in pip 2.0.0 |
| **`AdrianSosic`** (Adrian Šošić) | pyro#3450, 2026-04-30: `SyntaxError: invalid escape sequence '\g'` importing `pyro.ops.stats` | Comment https://github.com/pyro-ppl/pyro/issues/3450#issuecomment-4466509551 — exact `pip install git+…@b3c7851` pin; fix PR #3395 not in PyPI 1.9.1 |
| **`danylkod`** | vaul#647, 2026-05-05: `modal={false}` not forwarded to Radix → focus-trap `Maximum call stack size exceeded` loop | Comment https://github.com/emilkowalski/vaul/issues/647#issuecomment-4466509729 — exact `npm install emilkowalski/vaul#ca8ca47` pin; fix PR #580 not in npm 1.1.2 |

## Dropped honestly (recorded finding, no comment posted)

- **image-rs/image#2913** (`RunDevelopment`) — verified SEAM (image-webp
  PR #171 / `608fe79` on main, not in crates.io `image-webp 0.2.4`). NOT
  contacted: the named dev is an `image`-crate **maintainer who himself
  already identified PR #171 as the fix** in-thread. A "here's how to pin
  it" comment to him is low-value noise, not zero-agenda help — same
  discipline as batch-1's argos-translate#525 drop. Counted in S (it is a
  real seam) but excluded from delivery.

## What batch-2 hands #63 (2026-05-20)

A controlled **batch-1 (n=3, unfiltered control)** vs **batch-2 (n=4
delivered, seam-targeted treatment)** comparison, larger combined n=7
named devs, plus the hard frequency + false-positive-rate numbers above.
The thesis read is still gated to #63 — not pre-empted here.
