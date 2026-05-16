## Differentiation gate (mandatory pre-build) — PASSED, build justified
WebSearch on deps.dev / Snyk / Socket / Libraries.io / shields.io:
- shields.io: only STATIC custom badges (text hand-written) — no curated dead→migrate corpus behind it.
- Snyk: badge is "Known Vulnerabilities" (CVE count) only; deprecation shows as an icon inside its dashboard UI, never an embeddable migrate-to-X badge. Exactly the "scoring engine" pattern mvp.md already names as the open seam.
- Socket.dev / deps.dev: no documented deprecated→migrate README badge at all.
- Greenkeeper: dead since 2020-06-03.
None ship an embeddable "this package is dead → migrate to X" badge sourced from a hand-curated migration corpus. The verdict source (45+ hand-verified corpus) is the incumbent-structurally-irreproducible asset, as the founder_grind thesis predicted.

## What shipped (independently live-verified this tick)
- New endpoint /badge/{ecosystem}/{pkg}.svg (code/app/badge/[ecosystem]/[pkg]/route.ts). Pure function over data/alternatives.ts corpus only — NO live upstream fetch, fast + hard-CDN-cacheable (cache HIT observed). In corpus → red "deps | dead — migrate →"; not in corpus → green "deps | maintained"; bad input → grey "deps | unknown" (always 200 SVG, never a broken README image). pypi case-normalization verified (/badge/pypi/PIL.svg → red).
- Embed block (markdown + HTML + live preview) on every per-package page; click-through carries an INDEPENDENT ?ref=badge GoatCounter tag — separate namespace from Tier-A/#4 tags, does NOT confound the #4 falsification read. Server-side render fires a distinct badge_render event.
- Two durable embed-loop seeds: SolvoHQ/freshdeps README + SolvoHQ/node-sass-to-sass-migration README (pushed to remote main, SHA 792f1b2, verified via gh api). Workspace commit eae86fb.

## Why this matters
Validated #12/#19/#26 pattern (new distribution MECHANIC for the corpus, separate ?ref namespace) — not a 7th pull-surface, not a pivot, not outbound. Badge lives in OTHER repos READMEs = compounding embed loop that pays off independently of how #4 (2026-05-17 16:03Z) / #28 resolve. freshdeps wedge/queue untouched.