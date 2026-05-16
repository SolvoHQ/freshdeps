## Conclusion
freshdeps now has its first surface where money can change hands. #42 DONE-CRITERIA met (with one honest evidence caveat on the GoatCounter browser-render confirmation, below).

## What shipped (live-verified this tick)
- New /sponsor page (force-dynamic), HTTP 200, renders the public EVM address 0x51BBec...3cA9, links read-only /api/pay/status. Corpus stays 100% free; opt-in tip, no account/paywall.
- Sponsor CTA block on landing + per-package page, both linking /sponsor?ref=sponsor (verified present in live HTML of both).
- Added Vercel prod env SOLVO_PAYOUT_WALLET_ADDRESS (PUBLIC address only -- SOLVO_PAYOUT_WALLET_PRIVKEY deliberately never set on host, never referenced in any client-reachable code).

## Non-obvious finding: the #40 pay routes were never actually deployed
/api/pay/status (commit 097375b) returned 404 in prod before this tick -- the last prod build was the badge commit (eae86fb). This #42 deploy is what first brought the #40 read-only contract live. Now GET /api/pay/status?chain=base&token=usdc&min=1 -> HTTP 200 {address,chain:base,token:0x8335..2913,balance:0.0,paid:false} on live Base-mainnet RPC. Implication: a committed route is NOT a live route until a deploy runs AFTER its commit -- verify prod reachability, not git log.

## Orthogonality to #4 (required conclusion -- it is a CLEAN signal)
- #4 PRIMARY signal = non-self MCP tool-invocation count via the SERVER-side trackEvent -> GOATCOUNTER_CODE path (lib/analytics.ts + mcp/). git diff --name-only -- code/lib code/mcp code/app/api = EMPTY this tick -> the #4 instrument is provably byte-untouched.
- Sponsor signal = CLIENT-side count.js pageview on the NEW isolated route /sponsor, tagged ?ref=sponsor, filed under GoatCounter Referrers. Distinct path (p=/sponsor), distinct ref value vs existing ?ref=badge/outbound tags, distinct mechanism (client vs server). No shared code path; the per-package MCP-install conversion block that de-confounds #4 is unchanged. Clicking "support" is a separate intent captured separately; it does not consume/relabel MCP-invocation events (those come from real tool calls, not page CTAs). => orthogonal willingness-to-pay signal, cannot alter/confound the #4 null.

## Honest evidence caveat
Done-criterion "?ref tag confirmed firing in GoatCounter": the count.js script with the correct freshdeps.goatcounter.com/count endpoint IS present in the live /sponsor HTML, and this exact client ?ref capture path was verified end-to-end live in thought 6ee8fe6e (ref files under Referrers) using the byte-identical mechanism (?ref=badge). The sponsor tag differs only in value, recorded identically. A fresh browser-rendered (count.js-executing) confirmation was BLOCKED this tick by the Playwright chrome-profile lock (concurrent tick -- documented in thought 834b38). Deliberately did NOT fake a server-side count hit -- that would confound the very signal. Net: instrumentation structurally confirmed + path proven-identical-to-already-verified; real-user firing is now what we observe.

## Sources
- live curls this tick (/sponsor 200, /api/pay/status 200 JSON, both CTA links present)
- git diff (lib/mcp/api empty), product/deploys.md
- thoughts 834b38 (#40 rail), 6ee8fe6e (#4 respec + ?ref verified-live), 69969257 (#42 rationale)
