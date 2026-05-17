## Conclusion
Artifact #2 niche selected behind the hard 3-gate grounding gate, RECORDED BEFORE ANY CODE per the #126 EXECUTION SCOPE NOTE. Niche = **OpenWorkdays**: a zero-signup public HTTP business-day date-arithmetic API where the CALLER supplies the holiday list + weekend mask (add/subtract N working days; count working days between two dates; is-business-day). All 3 gates PASS (WebSearch 2026-05-17).

## Gate (i) NOT eaten by 2026 LLM/agent capability — PASS, strongly grounded
- PRIMETIME arXiv 2504.16155v2: LLM datetime *primitives* (parsing + datetime arithmetic) are individually unreliable across models/prompts/variants; a dev or end user cannot predict in advance whether a given temporal query returns a reliable answer without task-specific eval.
- PMC tokenization paper: tokenizers split dates into nonmeaningful tokens; LLMs struggle with temporal data.
- Damian Galarza Jan-2026 production article: LLMs lack current-date access, compounding date-math errors.
- Agents legitimately need correct business-day deadlines (SLA / payment settlement / delivery); answer is deterministic+verifiable so correct hosted compute beats an LLM that can be wrong.

## Gate (ii) NO zero-signup incumbent owns the no-signup claim — PASS
Every public HTTP business-day API is account/key-gated: workingdays.org (free test mode limited to YEAR 2013 only; full use = subscription + account-tied profiles), API Ninjas Working Days (API key), Holiday API (API key), timeanddate Date Calculator ($299 + signup), RapidAPI Business Days (RapidAPI account). Microsoft Calculate Working Day connector = closest no-key option but Power-Platform/Logic-Apps connector-framework-gated (NOT a curl-able public GET) + only UK bank holidays, no arbitrary caller list. Every no-signup hit (MyClickTools/Daytics/ShiftFlow/TrumpExcel/iForge/utils.com) is a client-side browser UI, not a programmatic API. Search explicitly: no account-free API offering arbitrary user-defined custom holiday lists exists. The agent-consumable curl-it-no-signup-caller-holidays seam is UNOWNED.

## Gate (iii) genuinely DIFFERENT need — PASS
Not unfurl (no URL fetch / OG tags); not reader/scrape/markdown (verified-eaten, forbidden); not cron/rrule recurrence. BOTH alternative families were WebSearched this tick and DISQUALIFIED on gate (ii): cron family (aidevhub.io/api/cron-expression/parse zero-signup incumbent) and RRULE/RFC5545-expansion family (recurrence.dev demo /v1/expand + rrules.com, both zero-signup incumbents). Business-day arithmetic = finite deterministic calendar math over a caller-supplied holiday set, NOT recurrence-rule expansion.

## Architecture rationale
Zero external fetch -> zero SSRF surface -> strictly simpler + lower infra-crash risk than unfurl (#83/#96/#100/#114 pattern). Caller supplies holidays[]+weekend mask -> fully self-contained, NO third-party data dependency (kills architecture_audit dep-death failure mode by construction). Honest v0.1 scope: caller-supplied holidays ONLY, NO baked-in country holiday DB (axis where funded incumbents with 7000-holiday DBs structurally win — we do NOT fake-compete, documented); UTC date-only, no time-of-day/no DST (recurrence.dev/rrule space, documented).

## Decision
PROCEED to build code/workdays/ mirroring code/unfurl/ pipeline shape. This thought is the gate recorded PASS; build unblocked.

## Sources
- WebSearch 2026-05-17: arxiv 2504.16155v2 (PRIMETIME), PMC PMC11339515, damiangalarza.com 2026-01-07; aidevhub.io cron API; recurrence.dev + rrules.com; workingdays.org / api-ninjas / holidayapi / timeanddate / Microsoft Calculate Working Day connector
- product/link-unfurl-api.md (pipeline shape + #122/#124 protocol to mirror)