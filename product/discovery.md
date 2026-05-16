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
