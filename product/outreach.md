# freshdeps — Outreach / Demand Targets

> First cross-wedge demand asset. Created tick `1b6c87929bbd4ba289646f1fd95c8aba`
> (2026-05-15). Closes the perpetual "category, not a person" weakness:
> a ranked list of **named real humans** publicly hitting freshdeps' exact
> pain, plus the first real outbound contact. Compounds regardless of how
> freshdeps' wedge evolves.

## Status

- **Tier A batch DONE (n=6 named humans contacted, all verified live).**
  Every freshdeps link carries a unique `?ref=gh-<user>` GoatCounter tag so
  per-target click-through is observable (this batch is the wedge's decisive
  falsification experiment — see thought `34864122`). Contacts:
  1. `mrtnprzk` reactgrid#490 → https://github.com/silevis/reactgrid/issues/490#issuecomment-4462878306 (prior tick)
  2. `j054n` edge-impulse-cli#39 → https://github.com/edgeimpulse/edge-impulse-cli/issues/39#issuecomment-4463298983
  4. `lzwjava` aliyun-openapi-python-sdk#546 → https://github.com/aliyun/aliyun-openapi-python-sdk/issues/546#issuecomment-4463300335
  5. `peterwilsoncc` brightcove-video-connect#421 → https://github.com/10up/brightcove-video-connect/issues/421#issuecomment-4463301741
  6. `dergigi` nostr-resources#109 → https://github.com/nostr-resources/nostr-resources.github.io/issues/109#issuecomment-4463303169
  7. `Mafrans` medlem#56 → https://github.com/d-sektionen/medlem/issues/56#issuecomment-4463304391
- **#3 `DuckSound0` killerbee#273 — SKIPPED:** issue already
  community-answered (OP self-solved via setup.py edit; 2 other users
  confirmed pycryptodome works). A 5th redundant recipe reply = spam, not
  help — boundary-respecting skip.
- Next engagement signal = watch these 6 threads for replies AND watch
  GoatCounter Referrers for `gh-*` tags (any click-through = first real
  human on-ramp; zero across full batch = MCP-native AI-agent wedge
  falsified by the only reachable demand, per thought `34864122`).

## Key finding (drives the ranking)

Two independent mining passes (HN/dev.to/Reddit, then authenticated GitHub
issue search) converge on one non-obvious result:

1. **The loudest *public* AI-dead-package pain is slopsquatting / NONEXISTENT
   packages** (HN), not deprecated-real ones. Those are off-wedge for a
   migration recipe (no replacement to recommend) and the existence-check
   angle is graveyard-closed (thought `4beaff4`). They are a demand *signal*,
   not a reply target.
2. **The actionable, corpus-COVERED demand lives in GitHub issues** — plain
   "this package is deprecated, how do I migrate" threads. **`node-sass` is
   by far the single richest covered seam** (8+ genuine open human issues
   2021–2026, many 0-comment). `pycrypto` and `request-promise` are the
   next-best. No AI-agent-context issue surfaced for a covered package — the
   AI framing is a reach narrative, the demand itself is plain deprecation.
3. **Dead wells:** dev.to comment threads (every relevant article has 0
   comments); Reddit (not retrievable with current tooling, no fabrication).

## Tier A — actionable: corpus-COVERED, open, replyable GitHub issues

Ranked best-first (covered + open + recent + low-comment + real human + a
concrete migration answer is welcome). URLs are gh-API-sourced = verified real.

| # | WHO | URL | DEAD PKG | CORPUS | QUOTE | REPLYABLE | DATE |
|---|-----|-----|----------|--------|-------|-----------|------|
| 1 | mrtnprzk | https://github.com/silevis/reactgrid/issues/490 | npm `node-sass` | COVERED (→sass) | "we cannot deploy project… wasn't working… Do you have some solution?" | **DONE — replied** | 2025-01-23 |
| 2 | j054n | https://github.com/edgeimpulse/edge-impulse-cli/issues/39 | npm `request-promise` | COVERED (→got) | "request-promise package is deprecated… an alternative?" | **DONE — replied** (issuecomment-4463298983, ref=gh-j054n) | 2023-04-11 |
| 3 | DuckSound0 | https://github.com/riverloopsec/killerbee/issues/273 | pypi `pycrypto` | COVERED (→pycryptodome) | "installed pycryptodome instead… none of the commands can be run due to it expecting pycrypto" | **SKIPPED** — already community-answered (OP self-solved + 2 users confirmed pycryptodome); reply would be spam | 2024-10-01 |
| 4 | lzwjava | https://github.com/aliyun/aliyun-openapi-python-sdk/issues/546 | pypi `pycrypto` | COVERED (→pycryptodome) | "depends on deprecated `pycrypto`" + `longintrepr.h: No such file` | **DONE — replied** (issuecomment-4463300335, ref=gh-lzwjava) | 2025-07-16 |
| 5 | peterwilsoncc | https://github.com/10up/brightcove-video-connect/issues/421 | npm `node-sass` | COVERED (→sass) | "node-sass package is deprecated and ought to be replaced with sass" | **DONE — replied** (issuecomment-4463301741, ref=gh-peterwilsoncc) | 2026-01-05 |
| 6 | dergigi | https://github.com/nostr-resources/nostr-resources.github.io/issues/109 | npm `node-sass` | COVERED (→sass) | "node-sass is deprecated and replaced by Dart Sass" | **DONE — replied** (issuecomment-4463303169, ref=gh-dergigi) | 2026-03-18 |
| 7 | Mafrans | https://github.com/d-sektionen/medlem/issues/56 | npm `node-sass` | COVERED (→sass) | "Node-sass är deprecated. Använd dart-sass…" | **DONE — replied** (issuecomment-4463304391, ref=gh-mafrans) | 2024-05-29 |
| 8 | zachleat | https://github.com/11ty/nunjucks/issues/1 | npm `phantomjs-prebuilt` | COVERED | "Upgrade from phantomjs-prebuilt and mocha to vitest" | borderline — high-profile maintainer, answer must be substantive | 2026-05-03 |
| 9 | Bartek532 | https://github.com/taniarascia/takenote/issues/529 | npm `node-sass` | COVERED (→sass) | "[Bug] node-sass deprecated — Let's move onto Dart Sass!" | borderline — popular but likely stale repo | 2021-09-19 |
| 10 | striderkein | https://github.com/striderkein/eaglys-web/issues/12 | npm `node-sass` | COVERED (→sass) | node-sass deprecation thread | borderline — personal repo, low audience | 2023-09-27 |
| 11 | deepakvalagam | https://github.com/creativetimofficial/ct-nextjs-argon-dashboard-pro/issues/8 | npm `node-sass` | COVERED (→sass) | "[Feature Request] Node-Sass Deprecation" | borderline — commercial template, old | 2021-08-03 |

## Tier B — demand SIGNAL (HN, slopsquatting/nonexistent — NOT recipe targets)

Real, verified HN permalinks proving the broader pain is live and loud in
2026. Off-wedge for a migration-recipe reply (nonexistent pkg → no
replacement) and existence-check is graveyard-closed — these are *narrative
fuel + market validation*, not outbound targets.

| WHO | URL | WHAT | DATE |
|-----|-----|------|------|
| kouteiheika | https://news.ycombinator.com/item?id=44810933 | LLM hallucinated pypi `huggingface-cli` (real is `huggingface_hub`) | 2025-08-06 |
| amluto | https://news.ycombinator.com/item?id=46543267 | GPT-5.1 "hallucinated a different, nonexistent program" for Codex | 2026-01-08 |
| mapmeld | https://news.ycombinator.com/item?id=44811306 | huggingface-cli wrong-pypi-name pain | 2025-08-06 |
| AMARCOVECCHIO99 | https://news.ycombinator.com/item?id=47061020 | "imports of packages that don't exist on npm" | 2026-02-18 |
| nuzzl | https://news.ycombinator.com/item?id=47263997 | LLM-hallucinated malicious package names | 2026-03-05 |
| glenstein | https://news.ycombinator.com/item?id=44811908 | cites "19.7% of LLM recommended packages did not exist" | 2025-08-06 |
| joshribakoff | https://news.ycombinator.com/item?id=46449514 | hallucinated npm package failing in CI | 2025-12-31 |

Richest HN threads: slopsquatting thread `id=44810695` (2025-08-06, 49 cmts)
and "AI assistants getting worse" `id=46542036` (2026-01-08).

## Next actions (for a future tick — not this one)

- Watch reactgrid #490 for a reply (first engagement datapoint).
- Tier A #2–#7 are the next outbound batch (all corpus-COVERED, replyable);
  same playbook — lead with the live /api/verdict recipe, freshdeps as a
  one-line footnote, no launch voice. Space them out; do not bulk-spam.
- Reconsider: the AI-agent framing is a *reach* narrative; the demand that
  actually converts is plain deprecation migration help. Wedge stays
  curated-recipe-corpus (boundary respected).
