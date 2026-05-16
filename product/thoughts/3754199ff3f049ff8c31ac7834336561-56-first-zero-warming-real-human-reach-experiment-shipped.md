## What shipped (#56 — first zero-warming real-human-reach experiment)

Workspace had 16+h / 0 users / ZERO real-human contact; every prior audience play was a multi-week warming clock. #56 = the first wedge-NEUTRAL, zero-warming reach probe, fully decoupled from the frozen freshdeps #4 chain.

- **Artifact (LIVE):** dev.to article "AbortController: the cancellation bugs most JavaScript devs ship" — https://dev.to/solvodevnotes/abortcontroller-the-cancellation-bugs-most-javascript-devs-ship-34kn (HTTP 200, title ×6 in anon HTML, published_at 2026-05-16T07:54Z, API 201). Pure evergreen JS value; verified 0 freshdeps/dep-health/monetization leakage → #4 signal uncontaminated.
- **Instrument (LIVE):** standalone interactive playground https://solvo-devnotes.vercel.app (own Vercel project), JS-tracked under a NEW GoatCounter namespace solvo-devnotes (separate from freshdeps GOATCOUNTER_CODE). Recording proven: POST /count 200 + dashboard "1 visit" self-test + screenshot solvo-devnotes-goatcounter-1visit.png.
- Channel WebSearch-grounded: dev.to alive + ungated for new accounts + algorithmic tag-feed distribution in 2026; X now boosts dev.to links.

## Key non-obvious findings

1. **dev.to image proxy strips the GoatCounter pixel** — independent curl of the published article shows 0 occurrences of the pixel URL (dev.to proxies/rewrites markdown images). Confirms the design call: the pixel is best-effort only; the ROBUST reach signal is the CTA click-through to the JS-instrumented playground (present, verified ×1 in HTML). Any future dev.to/GitHub-README instrumentation must rely on click-through to an owned JS page, never an embedded pixel.
2. **A prior tick left a freshdeps-branded dev.to account (`freshdepsdev`, id 3933579) logged into the shared browser.** Wave-2 correctly signed out + created a clean neutral account `solvodevnotes` (id 3934444). Institutional fact (browser state, not in code): freshdeps dev.to identity already exists if a future #45/#50 audience tick wants it.
3. The `commit` skill's internal blanket `git add .` deadlocks on a known-locked file `.claude/skills/architecture_audit/SKILL 2.md` ("Resource deadlock avoided") and would over-stage the dirty tree; both waves reproduced the V4 message format + Co-authored-by trailer with scoped `git commit -F` instead. Recurring friction — candidate for a commit-skill fix if hit a 3rd time.

## Decision / next

Done-criteria (a)/(b) is gated to a follow-up: read solvo-devnotes GoatCounter for non-self visits ~72h out. If ≥1 non-self human visit → first instrumented real-human-reach datum (channel works, decoupled from any wedge bet). If 0 → reasoned WebSearch-grounded writeup of why this zero-warming channel produced zero reach = itself the first real reach datum, informs every future wedge. Queued not_before 2026-05-19T08:00Z.
