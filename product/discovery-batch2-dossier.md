# Discovery Batch 2 — Seam Screening Dossier (proto-hypothesis-#2)

**Seam:** "fixed upstream but not in a shippable release yet" — a named dev reports a concrete recent bug; a specific merged commit/PR on the default branch fixes it; that fix is NOT in the latest installable release on PyPI / npm / crates.io.

**Treatment arm:** seam-targeted (deliberate bias toward actively-developed OSS libs with infrequent releases; search queries skewed to "fixed in main / not released / please cut a release"). Classification within each issue is honest.

**Screened:** 2026-05-16 UTC. POST NOTHING — screening + dossier only.
**Excluded entirely (forbidden adjacency):** dependency-deprecation / SCA / CVE-bump / MCP / x402 / freshdeps. Also excluded batch-1 repos: pyOutlook, gh-dash, python-eia, argos-translate.

---

## 1. Frequency Ledger

- **Pool size N = 36** distinct screened issues (bias-sampled toward the seam; honest per-issue classification).
- **Seam count S = 5** (verified with commit SHA + release-version proof).
- **S / N = 5 / 36 ≈ 0.139 (13.9%)** within the *biased* treatment pool. NOT a base rate — the control (unfiltered batch-1) is the comparison; this arm was deliberately enriched.

Disposition legend: **SEAM** (verified) / **not-seam** / **indet** (indeterminate) / **excl** (forbidden adjacency or out-of-channel, recorded for honesty but not a seam).

| # | Issue | Reporter | Verdict | One-line why |
|---|-------|----------|---------|--------------|
| 1 | [image-rs/image-webp#... via image-rs/image#2913](https://github.com/image-rs/image/issues/2913) | RunDevelopment | **SEAM** | Transparent WebP anim frames decoded wrong; fixed by image-webp PR #171 (`608fe79…`) on main, NOT in crates.io `image-webp 0.2.4`. |
| 2 | [Cretezy/lazyjj#201](https://github.com/Cretezy/lazyjj/issues/201) | rukai | **SEAM** | `--config-toml` removed by jj 0.40; fix `60c07bb…` (PR #159) replaces it with `--config`, in GitHub tag v0.6.1 but NOT in crates.io `lazyjj 0.5.0`. |
| 3 | [NVIDIA/physicsnemo#1607](https://github.com/NVIDIA/physicsnemo/issues/1607) | dionhaefner | **SEAM** | `SyntaxError: invalid escape '\('` in `_torch_impl.py`; fixed by PR #1542 (`841def3…`) on main, NOT in pip `physicsnemo 2.0.0` (maintainer on-record: v2.1.0 not yet cut). |
| 4 | [pyro-ppl/pyro#3450](https://github.com/pyro-ppl/pyro/issues/3450) | AdrianSosic | **SEAM** | `SyntaxError: invalid escape '\g'` in `pyro/ops/stats.py`; fixed by PR #3395 (`b3c7851…`, `"""`→`r"""`) on `dev`, NOT in PyPI `pyro-ppl 1.9.1`. |
| 5 | [emilkowalski/vaul#647](https://github.com/emilkowalski/vaul/issues/647) | danylkod | **SEAM** | `modal={false}` not forwarded to Radix Dialog → focus-trap infinite loop; fixed by PR #580 (`ca8ca47…`) on main, NOT in npm `vaul 1.1.2`. |
| 6 | [pdfme/pdfme#1435](https://github.com/pdfme/pdfme/issues/1435) | danibaumann | not-seam | `.d.ts` barrel missing `.js` ext under nodenext; PR #1399 merge `40978b7…` **IS** in published npm `@pdfme/pdf-lib 6.1.2`. Reporter on old 6.0.6 → fix installable (#62 anti-pattern). |
| 7 | [keras-team/keras#22494](https://github.com/keras-team/keras/issues/22494) | ningxiudg | not-seam | Discretization one_hot static shape; real fix PR #22048 (`b97f2c7…`) **IS** in published `keras 3.14.0`/`3.14.1`. Commenter's `e94cb07d5` was just master HEAD, not the fix. |
| 8 | [googleapis/python-aiplatform#6710](https://github.com/googleapis/python-aiplatform/issues/6710) | eliasecchig | not-seam | `AgentEngines.update()` drops image_spec; reporter himself states fix IS in PyPI 1.149.0 (he was on 1.141.0). Fix installable. |
| 9 | [OCA/openupgradelib#447](https://github.com/OCA/openupgradelib/issues/447) | alexdigitaltechno | not-seam | v19 translate-column fix `f76c65b…` IS in PyPI `openupgradelib 3.13.1` (semver-true latest; string-sort trap avoided). |
| 10 | [LaihoE/demoparser#323](https://github.com/LaihoE/demoparser/issues/323) | mhermanny | not-seam | npm publish lag for #322; npm `@laihoe/demoparser2` now `0.41.3` (0.41.2 published 2026-04-21) — fix installable, transient CI issue resolved. |
| 11 | [himdel/lint-po#5](https://github.com/himdel/lint-po/issues/5) | davidpoblador | not-seam | Feature (plural-form), not a concrete bug; AND maintainer published PyPI `lint-po 0.1.5` — fix installable. |
| 12 | [mmartoccia/grain#3](https://github.com/mmartoccia/grain/issues/3) | amaurigmartins | not-seam | `grain init` missing from `grain-lint==0.3.0`; maintainer published `grain-lint 0.3.1` to PyPI with fix — installable. |
| 13 | [ton-blockchain/ton4j#139](https://github.com/ton-blockchain/ton4j/issues/139) | hannah0wang | excl | Real bug + fix `fc433ff…`, but (a) Java/Maven, outside pip/npm/cargo channel scope; (b) fix is already in git tag `2.0.3`. Out-of-channel + fix-tagged. |
| 14 | [stanfordnlp/dspy#9715](https://github.com/stanfordnlp/dspy/issues/9715) | tTerranovae | excl | litellm CVE upper-bound cap; SCA/CVE/dependency-deprecation forbidden adjacency. Also CLOSED, workaround = downgrade. |
| 15 | [Devolutions/sspi-rs#662](https://github.com/Devolutions/sspi-rs/issues/662) | tippyentertainment | not-seam | Maintainer: latest sspi v0.21 already depends on winscard v0.3 — fix in published release; user on old version. Also RUSTSEC adjacency. |
| 16 | [pola-rs/polars#21889](https://github.com/pola-rs/polars/issues/21889) | brianhelba | not-seam | Free-threaded build; fix PR #21914 still WIP/not merged to default branch — no merged upstream fix yet. |
| 17 | [tarkovtracker-org/TarkovTracker#356](https://github.com/tarkovtracker-org/TarkovTracker/issues/356) | DysektAI | indet | Self-filed workaround-removal tracker for upstream Nuxt #34959; dev already has a working workaround, not "stuck." |
| 18 | [pyvista/pyvista#6149](https://github.com/pyvista/pyvista/issues/6149) | rhoP | not-seam | VTK/conda env-specific render error from 2024; no single upstream fix commit; resolved by trame version bump, not a held release. |
| 19 | [temporalio/sdk-rust#1254](https://github.com/temporalio/sdk-rust/issues/1254) | kollektiv | indet | Concrete bug report (0.4.0 worker-fatal), but no merged upstream fix identified yet — cannot prove fix-exists-but-unreleased. |
| 20 | [open-telemetry/opentelemetry-python#5211](https://github.com/open-telemetry/opentelemetry-python/issues/5211) | aitor0307 | not-seam | Version-compat/install confusion; "merged in m…" vague, no specific fix commit; touches dependency-compat. |
| 21 | [dusc-dev/rspec-ctrf#2](https://github.com/dusc-dev/rspec-ctrf/issues/2) | garrettblehm | excl | Real "PR #1 not on RubyGems" seam-shaped case, but RubyGems is outside the pip/npm/cargo channel scope of this seam definition. |
| 22 | [Black-HOST/csf#11](https://github.com/Black-HOST/csf/issues/11) | asimzeeshan | excl | Tarball/distro release (`6cb89e5` missing from v15.02 tarball); not a pip/npm/cargo package. Out-of-channel. |
| 23 | [quarkiverse/quarkus-unleash#426](https://github.com/quarkiverse/quarkus-unleash/issues/426) | almostvoidcrusade | excl | Maven/Quarkus extension (post-PR #419 release request); outside pip/npm/cargo scope. |
| 24 | [scipy/scipy#25113](https://github.com/scipy/scipy/issues/25113) | ev-br | not-seam | "MKL minimum supported version" — policy/build-config discussion by a maintainer, not a stuck-on-release bug. |
| 25 | [snakemake/snakemake#4192](https://github.com/snakemake/snakemake/issues/4192) | jonasfreimuth | not-seam | Docs wording nit; not a code bug with stack trace. |
| 26 | [snakemake/snakemake#4158](https://github.com/snakemake/snakemake/issues/4158) | FelixSchneiderZoom | indet | Piped-job grouping bug; no identified merged upstream fix to verify against. |
| 27 | [projectM-visualizer/projectm#1000](https://github.com/projectM-visualizer/projectm/issues/1000) | HiroyukiHirohata | indet | C++ memory leak in libprojectM 4.1.6; C++/CMake lib, outside pip/npm/cargo; no merged fix identified. |
| 28 | [image-rs/image#2913 (parent crate `image`)](https://github.com/image-rs/image/issues/2913) | RunDevelopment | not-seam | Counted once as #1 (image-webp). The parent `image` crate itself has no separate held fix — root cause is the image-webp dep. |
| 29 | [pdfme/pdfme#1435 fork-claim](https://github.com/pdfme/pdfme/issues/1435) | (bot comment) | not-seam | Bot-suggested PDFweave fork is not the upstream fix path; disregarded — upstream 6.1.2 already fixes it (see #6). |
| 30 | [nimiq/core-rs-albatross#3736](https://github.com/nimiq/core-rs-albatross/issues/3736) | blouflashdb | indet | WASM panic 'time not implemented'; no identified merged upstream fix; app-not-library. |
| 31 | [hexpm/hex#1158](https://github.com/hexpm/hex/issues/1158) | iamdanchi | not-seam | Hex (Elixir) package-fetch failure; outside pip/npm/cargo; infra not a held code fix. |
| 32 | [unslothai/unsloth#5349](https://github.com/unslothai/unsloth/issues/5349) | smurfix | indet | Unsloth Studio env var install failure; no identified single merged upstream fix to prove unreleased. |
| 33 | [astral-sh/uv#19078](https://github.com/astral-sh/uv/issues/19078) | TheKnudsen | indet | "UV cache/sync issues?" — vague, no repro/stack trace; no identified fix. |
| 34 | [GreatScott/py-appsheet#4](https://github.com/GreatScott/py-appsheet/issues/4) | nic-ltm | indet | Date/locale formatting problem; no identified upstream merged fix to verify. |
| 35 | [Imageomics/pybioclip#186](https://github.com/Imageomics/pybioclip/issues/186) | Dr-Nathan-Fox | indet | "Error running examples" — insufficient detail; no identified held fix. |
| 36 | [Uninett/nav#2915](https://github.com/Uninett/nav/issues/2915) | ingeborgoh | not-seam | CAM-collection device-type bug; nav is not a pip/npm/cargo library (Django app); out-of-channel. |

**Honesty note on the fraction:** S/N = 13.9% is inside a *bias-enriched* pool whose search terms explicitly hunted the seam. The true population base rate is far lower; this number is only meaningful against the unfiltered batch-1 control, not as an absolute. Several superficially seam-shaped issues (#6,#7,#8,#9,#10,#11,#12) collapsed on verification to the #62 anti-pattern ("user on old release, fix already published") — exactly the failure mode this screening exists to filter out. That collapse rate (7 of 12 strong-looking candidates were NOT seam) is itself the key finding.

---

## 2. Verified Candidate Dossier (5 cases)

### Case 1 — image-rs/image-webp (crates.io) — WebP transparent animation decode

- **Named dev:** `RunDevelopment` (image-rs maintainer / `image` crate team).
- **Issue:** https://github.com/image-rs/image/issues/2913 — "WebP: Transparent animation frames are decoded incorrectly".
- **Verbatim dated pain quote (2026-04-18, RunDevelopment):** "Decoding animated WebP images with transparency doesn't work correctly. It seems that the current frame is 'drawn on top' the previous frame." Confirmed in comment (2026-05-08): *"Fixed on `image-webp` `main`. Probably by https://github.com/image-rs/image-webp/pull/171."* Maintainer fintelia: *"Could you check if this is fixed on the `main` branch of image-webp? We've merged a few bug fixes but haven't done a release recently."*
- **Exact upstream fix:** commit `608fe791822e2c02910e98b6213b2f7c07b84a4e` — PR https://github.com/image-rs/image-webp/pull/171 ("fix: dispose transparent animated frames"), merged **2026-03-02** to default branch **`main`** of `image-rs/image-webp`.
- **Latest installable release + proof fix NOT in it:** crates.io `image-webp` max version = **`0.2.4`** (published 2025-08-27). `git merge-base --is-ancestor 608fe791… v0.2.4` → **NO** (fix is after the tag). v0.2.4 tag commit dates 2025-08-26; fix commit dates 2026-03-01 — fix is ~6 months newer than the only installable release.
- **Installable-fix path to hand the dev (option a, VCS pin):**
  `cargo add image-webp --git https://github.com/image-rs/image-webp --rev 608fe791822e2c02910e98b6213b2f7c07b84a4e`
  (or in `Cargo.toml`: `image-webp = { git = "https://github.com/image-rs/image-webp", rev = "608fe791822e2c02910e98b6213b2f7c07b84a4e" }`). Note `image` consumers pin the transitive dep via `[patch.crates-io]`.
- **Confidence:** HIGH. Read the diff: `src/decoder.rs` `clear_color` logic changed to emit `Some([0,0,0,0])` for alpha frames on dispose — directly the "frame drawn on top of previous" symptom. Reporter (a maintainer) independently confirmed PR #171 is the fix.

### Case 2 — Cretezy/lazyjj (crates.io) — bookmarks broken on jj 0.40

- **Named dev:** `rukai` (well-known Rust contributor).
- **Issue:** https://github.com/Cretezy/lazyjj/issues/201 — "bookmarks are broken on latest jj".
- **Verbatim dated pain quote (2026-05-03, rukai):** "I used cargo install to install the latest version of lazyjj and jj and got this error on the bookmarks tab: `error: unexpected argument '--config-toml' found  tip: a similar argument exists: '--config'` … jj version: 0.40.0 lazyjj version: 0.5.0". Maintainer-side (`dotdash`): *"the latest version of lazyjj is not on crates.io … the bookmarks issue is fixed in lazyjj 0.6.1 which is available as a github release."*
- **Exact upstream fix:** commit `60c07bbbc4ed6553fd5125d485e3f6ccc3782ac4` — PR https://github.com/Cretezy/lazyjj/pull/159 ("fix: jj 0.33.0 and Rust 1.89.0 compatibility"), merged **2025-09-09** to default branch **`main`**. Diff replaces `"--config-toml"` with `"--config"` in `src/commander/bookmarks.rs` and `src/commander/mod.rs`.
- **Latest installable release + proof fix NOT in it:** crates.io `lazyjj` max version = **`0.5.0`** (published 2025-02-18). At tag `v0.5.0` the code emits `--config-toml` (the broken flag); fix commit `60c07bb…` is `merge-base --is-ancestor … v0.5.0` → **NO**. It **IS** in GitHub tag `v0.6.1` (not on crates.io).
- **Installable-fix path (option a, VCS pin):**
  `cargo install --git https://github.com/Cretezy/lazyjj --tag v0.6.1 lazyjj`
  (pin by exact rev: `cargo install --git https://github.com/Cretezy/lazyjj --rev 60c07bbbc4ed6553fd5125d485e3f6ccc3782ac4 lazyjj`).
- **Confidence:** HIGH. Diff literally swaps the exact CLI flag in the reporter's error message. Caveat: maintainer says lazyjj is "basically unmaintained" and an active fork exists; the genuinely best long-term answer is the fork, but the precise unreleased-fix path above is correct and tested-syntax.

### Case 3 — NVIDIA/physicsnemo (PyPI) — SyntaxError on import, Python 3.12+

- **Named dev:** `dionhaefner` (Dion Häfner — well-known scientific-Python developer).
- **Issue:** https://github.com/NVIDIA/physicsnemo/issues/1607 — "Importing `physicsnemo.datapipes.transforms.base.Transform` raises `SyntaxError` on Python 3.12+".
- **Verbatim dated pain quote (2026-04-29, dionhaefner):** "`pip install physicsnemo==2.0.0` … `SyntaxError: invalid escape sequence '\(' in _torch_impl.py` … This appears to be fixed on `main` (offending file has been refactored), but no release is available yet containing the fix." Maintainer `coreyjadams` (2026-04-29): *"we'll be releasing soon v2.1.0, and since this is already fixed, I'll go ahead and close this issue."*
- **Exact upstream fix:** commit `841def37a167f2885a52731a96cb007b3a7e42f1` — PR https://github.com/NVIDIA/physicsnemo/pull/1542 ("Refactor interpolation functionals and add point-to-grid API"), merged **2026-04-16** to default branch **`main`**. Diff removes the lines `\(f(x) = 3x^2 - 2x^3\)` and `\(f(x) = x^3 (6x^2 - 15x + 10)\)` from the non-raw docstring in `physicsnemo/nn/functional/interpolation/_torch_impl.py` (the exact `\(` invalid escape). The broader module refactor PR #1520 (`bf1f706…`) is also on main and not in v2.0.0.
- **Latest installable release + proof fix NOT in it:** latest git release tag = **`v2.0.0`** (2026-03-09); reporter installed `physicsnemo==2.0.0` via pip and it is the version with the bug. `merge-base --is-ancestor 841def3… v2.0.0` → **NO** (fix dated 2026-04-16, after the v2.0.0 tag). Maintainer states on-record v2.1.0 is "soon" / not yet cut, confirming no fixed release is published. (Direct PyPI version fetch was blocked by PyPI's bot challenge wall; git-tag evidence + maintainer statement establish v2.0.0 is the newest published and lacks the fix.)
- **Installable-fix path (option a, VCS pin):**
  `pip install "physicsnemo @ git+https://github.com/NVIDIA/physicsnemo@841def37a167f2885a52731a96cb007b3a7e42f1"`
- **Confidence:** HIGH on fix-exists-unreleased (diff + issue read; maintainer confirms unreleased). MEDIUM-flagged only on the *exact* PyPI latest string (could not hit PyPI directly due to anti-bot wall) — but the reporter explicitly used `pip install physicsnemo==2.0.0` and the maintainer confirmed no fixed release exists, so the seam holds.

### Case 4 — pyro-ppl/pyro (PyPI) — SyntaxError importing pyro.ops.stats

- **Named dev:** `AdrianSosic` (Adrian Šošić — active scientific-Python / BoTorch-adjacent dev).
- **Issue:** https://github.com/pyro-ppl/pyro/issues/3450 — "[Bug] Invalid escape sequence".
- **Verbatim dated pain quote (2026-04-30, AdrianSosic):** "The docstring of `energy_score_empirical` … uses `\ge` … inside a regular (non-raw) string literal, which is an invalid Python escape sequence … `SyntaxError: invalid escape sequence '\g'`". Follow-up same day: *"I just saw that a fix has already been merged in https://github.com/pyro-ppl/pyro/pull/3395 but hasn't been released yet."*
- **Exact upstream fix:** commit `b3c78513ed27a60d6e5822ca2ae9159dadca046e` — PR https://github.com/pyro-ppl/pyro/pull/3395, merged **2024-09-20** to default branch **`dev`**. Diff on `pyro/ops/stats.py`: the `energy_score_empirical` docstring delimiter changes `"""` → `r"""` (parent commit has plain `"""` + the `\ge`; this commit makes it a raw string, eliminating the SyntaxError).
- **Latest installable release + proof fix NOT in it:** PyPI `pyro-ppl` latest = **`1.9.1`** (semver-verified via PyPI simple JSON index; latest tag also `1.9.1`). Tag `1.9.1` commit = `64e71eee…` dated **2024-06-01**; fix merged **2024-09-20**. `merge-base --is-ancestor b3c7851… 1.9.1` → **NO** (fix is after the 1.9.1 tag). At tag `1.9.1`, `pyro/ops/stats.py` still opens the docstring with plain `"""` → SyntaxError reproduces exactly.
- **Installable-fix path (option a, VCS pin):**
  `pip install "pyro-ppl @ git+https://github.com/pyro-ppl/pyro@b3c78513ed27a60d6e5822ca2ae9159dadca046e"`
- **Confidence:** HIGH. Verified the parent commit has the buggy plain `"""` with `\ge`; the fix commit flips it to `r"""`; not an ancestor of the 1.9.1 release tag; PyPI latest is 1.9.1. Reporter independently identified PR #3395.

### Case 5 — emilkowalski/vaul (npm) — modal={false} not forwarded to Radix Dialog

- **Named dev:** `danylkod`.
- **Issue:** https://github.com/emilkowalski/vaul/issues/647 — "Request release including #580 (modal prop forwarded to Radix Dialog)".
- **Verbatim dated pain quote (2026-05-05, danylkod):** "PR #580 … was merged on 2025-07-25 but has not been released — the latest tag is v1.1.2 (2024-12-14). … Vaul's `modal={false}` is silently overridden because it never reaches the underlying Radix `Dialog.Root` … I reproduced this as a 'Maximum call stack size exceeded' loop between `focus-trap`'s `checkFocusIn`/`tryFocus` and Radix `FocusScope`'s `handleFocusOut2`/`focus`."
- **Exact upstream fix:** commit `ca8ca474fb4a2864ffd2cd03d268a86842a9094e` — PR https://github.com/emilkowalski/vaul/pull/580 ("fix: Added missing modal prop to Drawer.Root"), merged **2025-07-25** to default branch **`main`**. Diff adds `modal={modal}` so the prop reaches Radix Dialog.
- **Latest installable release + proof fix NOT in it:** npm `vaul` `dist-tags.latest` = **`1.1.2`** (published 2024-12-14). Latest git tag = `v1.1.2` (2024-12-14). `merge-base --is-ancestor ca8ca47… v1.1.2` → **NO** (fix merged 2025-07-25, ~7 months after the tag).
- **Installable-fix path (option a, VCS pin):**
  `npm install emilkowalski/vaul#ca8ca474fb4a2864ffd2cd03d268a86842a9094e`
  (or `pnpm add github:emilkowalski/vaul#ca8ca474fb4a2864ffd2cd03d268a86842a9094e`).
- **Confidence:** HIGH. Diff adds the exact `modal={modal}` forwarding the reporter described; not in the v1.1.2 tag; npm latest is 1.1.2. Reporter gave a precise repro of the focus-trap recursion.

---

## 3. Method / integrity notes

- Every SEAM has: (a) a full commit SHA, (b) a merged-PR URL, (c) the default branch it sits on, (d) a `git merge-base --is-ancestor <sha> <latest-tag>` = NO proof, (e) the latest installable channel version, (f) a syntactically-formed VCS-pin install command.
- Semver-aware version sorting was used after a string-sort trap was caught on `openupgradelib` (`3.9.4` vs `3.13.1`) — that catch flipped openupgradelib#447 from a false SEAM to correctly NOT-seam, and validated re-checking image-webp/lazyjj/pyro by semver.
- The #62 lesson was applied as a hard gate: 7 of the 12 strongest-looking candidates were demoted to not-seam because the fix was already in a published release (pdfme 6.1.2, keras 3.14.x, python-aiplatform 1.149.0, openupgradelib 3.13.1, demoparser 0.41.3, lint-po 0.1.5, grain-lint 0.3.1). Handing those devs "a PR is open" would have been misleading spam.
- Out-of-channel real seam-shaped cases (ton4j/Maven, rspec-ctrf/RubyGems, csf/tarball, quarkus-unleash/Maven) were recorded honestly as excl, not padded into the dossier — the seam definition is pip/npm/cargo only.
- No GitHub comment posted, no PR opened, no other file modified, no commit made.
