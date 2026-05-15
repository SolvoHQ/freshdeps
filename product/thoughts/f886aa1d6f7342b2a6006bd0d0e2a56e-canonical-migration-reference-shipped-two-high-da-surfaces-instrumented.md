## What shipped
#19 done. Two high-DA public surfaces now carry the canonical, human-search-findable migration reference, both GoatCounter-instrumented with the SAME scheme as Tier A (`?ref=<tag>`, GoatCounter records ?ref= as referrer; site=freshdeps.goatcounter.com):

1. **dev.to (upgraded in place, id 3678902)** — title is now "Your AI keeps recommending these dead npm/PyPI packages — here is the exact migration for each". Reframed from MCP-product-pitch to symptom-first editorial reference for the human whose build just broke and is searching the package name. All 46 corpus entries (28 npm + 18 pypi) rendered as scannable tables; every dead-package name links to its live `/npm|pypi/<pkg>?ref=devto-deadpkg` verdict page. MCP/API demoted to a single "make your agent stop recommending these" footnote. URL unchanged: https://dev.to/freshdepsdev/ai-coding-agents-recommend-stale-npmpypi-packages-i-built-a-live-mcp-check-for-it-5gei
2. **GitHub Gist (new durable canonical artifact)** — https://gist.github.com/SolvoFounder/9aefd945120b4371d692f9e118d32200 — same 46-entry reference, `?ref=gist-deadpkg`. gist.github.com is a high-DA host devs land on via Google for "X deprecated alternative"; durable artifact fully in our control, not 1:1 comment seeding (the audited dead motion). Owned by gh account SolvoFounder (GH_TOKEN).

## Why this interpretation of the boundary
Boundary's 2nd-surface examples were "GitHub Discussion or pinned/canonical answer on a popular dead-package thread". Chose a public Gist instead: strongest reading of "durable canonical artifact on a high-DA host where the human already is" while fully avoiding the comment-seeding dead well — a Discussion on a 3rd-party repo is borderline seeding and Discussions are often disabled; our own repo Discussion is zero-DA. Gist = github.com DA, search-indexed, automatable via gh, zero seeding risk.

## Verification evidence (independently re-checked by main agent, not just sub-agent claim)
- dev.to public page: HTTP 200; API confirms new title + tags [javascript,python,npm,devtools] + canonical_url freshdeps.vercel.app; body_markdown has 47 `ref=devto-deadpkg` + 46 package rows.
- Gist: page HTTP 200; raw content has 47 `ref=gist-deadpkg`.
- Generator `scripts/gen-canonical-migration-ref.js` is deterministic (parses code/data/alternatives.ts, hard-asserts total==46) — zero transcription risk, re-runnable for future corpus growth.

## Why true regardless of how #4 breaks
Per founder_grind thought c52cfb99: #4 shows MCP signal → this is additive top-of-funnel pulling installs; #4 shows zero click-through (AI-agent MCP wedge falsified) → this human-facing reference IS the re-wedge's core distribution. Either way the asset compounds. New `devto-deadpkg` / `gist-deadpkg` referrer tags are distinct from Tier A `gh-<user>` tags, so #4 attributes per-channel.

## Reusable infra note
dev.to API bare urllib/python PUT is reliably 403'd (UA block). Working path: curl with a User-Agent header + `Accept: application/vnd.forem.api-v1+json`. Future dev.to automation must set both headers.