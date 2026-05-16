## Conclusion
The freshdeps #4→#28 decision instrument is now verified-live and re-specd to a power-honest, channel-matched rule. The architecture_audit P1 worst-case (client ?ref path a structurally-guaranteed dark zero) is FALSIFIED by direct observation.

## Instrument-liveness check (executed this tick, #38)
- Prod HTML at https://freshdeps.vercel.app/ embeds Next Script `//gc.zgo.at/count.js` with `data-goatcounter="https://freshdeps.goatcounter.com/count"` → NEXT_PUBLIC_GOATCOUNTER_CODE present at BUILD time.
- `vercel env ls`: NEXT_PUBLIC_GOATCOUNTER_CODE = Encrypted, **Production** scope (not Preview/Dev).
- Real-browser synthetic hit (Playwright, https://freshdeps.vercel.app/?ref=instrcheck-6ee8fe6e): count.js fired `POST freshdeps.goatcounter.com/count?p=%2F%3Fref%3Dinstrcheck-6ee8fe6e&...&q=%3Fref%3Dinstrcheck-6ee8fe6e => 200`.
- GoatCounter dashboard (Today): `instrcheck-6ee8fe6e` appeared in **Top Referrers** within 60s (1 hit). Screenshot code/goatcounter-referrers-instrcheck.png.
- **Instrument correction**: GoatCounter files `?ref=` values under the **Referrers** panel, NOT the **Campaigns** widget (Campaigns needs utm_*). The audit thought + outreach.md said "Campaigns widget" — wrong; fixed in outreach.md. #4 must read the Referrers panel.

Verdict: client ?ref capture path is LIVE end-to-end. Server trackEvent GOATCOUNTER_CODE path was already verified-live (thought 540ff8db).

## The re-specd rule (now in #4 + #28 descriptions in the queue DB)
- PRIMARY deciding signal = non-self MCP tool-invocation / agent /api/verdict event count on the verified-live server trackEvent path (channel-matched to the MCP-native wedge). Human ?ref-Referrers + dev.to = SUPPORTING-only.
- #4 = produce both signal tiers as actual figures + label deciding tier (numbers only, no verdict).
- #28 = A/B/C tree: (A) PRIMARY>0 → double-down; (B) PRIMARY=0 but supporting converted → channel re-point to the named CI-failure-interceptor (do NOT kill); (C) power-honest kill ONLY if PRIMARY=0 AND ≥1 passive MCP surface has independently-confirmed non-zero reach AND supporting=0. "Listed" ≠ "reached"; if reach unmeasurable → default (B), not kill.
- KILLED the on-record invalid null ("zero ?ref across n=6 Tier A = MCP wedge falsified", thought 34864122): underpowered (n=6 stale issues, zero-rep account, base-rate click≈0 even if product is excellent) + channel-confounded (human GitHub click ≠ MCP-agent demand). A bare zero ?ref falsifies ONLY the manual GitHub-comment GTM channel.

## Files changed
- problems/checkout.db: #4 and #28 descriptions rewritten (not_before gates 2026-05-17 preserved — #4 read NOT run this tick, per OUT).
- product/outreach.md: stale invalid-null + Campaigns→Referrers error corrected, pointed at the #38 rule.

## Source
product/thoughts/0450ea5842244c719304fe8a4824bdca-architecture-audit-falsification-instrument-cannot-produce-the-28-signal.md (the REWORK 4/10 audit that spawned #38)
