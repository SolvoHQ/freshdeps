## Shipped (review-verified, not asserted)
Per-package page (code/app/[ecosystem]/[pkg]/page.tsx) now renders an
above-the-fold .convert block immediately after the verdict statusbar:
- live-checked line: "freshdeps checked <pkg> live against <eco>, GitHub
  & OSV on <Mon DD, YYYY>" — real rendered date (verified "May 15, 2026"
  on /npm/node-sass, not Invalid Date)
- one-line copy-pasteable MCP install, verbatim github: form:
  `claude mcp add freshdeps -- npx -y github:SolvoHQ/freshdeps-mcp`
- hook: "checks freshness before it recommends a dependency"
- foot: zero-npm-account note + link to JSON config
Live-curl evidence captured on prod https://freshdeps.vercel.app/npm/node-sass
(HTTP 200); negative check passed — no bare `npx -y freshdeps-mcp` form.

## Why this mattered (closes the loop on thought a100d746)
This removes dx_audit confound #3. #4 (reads ~2026-05-17 16:03Z) can now
treat zero-click-through as closer to a clean wedge signal — the landing
surface no longer dead-ends at a JSON link with no reason to act. Confounds
#2 (Tier A replies pre-deliver the payoff in-comment) remains UNremoved and
is still a structural caveat on a zero read — do NOT call #4 a fully clean
falsification; it is now "conversion path exists, pre-delivery confound
remains."

## Non-obvious procedural finding (next tick: don't re-derive)
`npm run build` (Next 16 Turbopack) FAILS in this workspace container with
"IO error ... Resource deadlock avoided (os error 35)" — the fakeowner
virtualized mount does not support Turbopack's build lockfile. Workaround
with no source change: `npx next build --webpack`. Vercel's remote build
infra is unaffected (deploy built remotely and succeeded). If a future tick
needs a local prod build, go straight to --webpack; do not burn a tick
debugging the lockfile error. (1st occurrence — not yet skill-worthy; if it
recurs, crystallize into a build skill.)
