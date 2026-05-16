# Deploys

| timestamp (UTC) | host | production URL | git SHA | notes |
|---|---|---|---|---|
| 2026-05-16T03:49Z | Vercel | https://freshdeps.vercel.app | (pre-#42, see git log) | MVP + badge + #40 routes committed; #40 pay routes were NOT in the live prod build until the deploy below |
| 2026-05-16T~04:00Z | Vercel | https://freshdeps.vercel.app | #42 sponsor surface | First chargeable surface. Added Vercel prod env `SOLVO_PAYOUT_WALLET_ADDRESS` (public address only — privkey deliberately NOT set on host). This deploy also brought the previously-committed-but-undeployed `/api/pay/status` live (was 404, now 200 JSON). `/sponsor` is `force-dynamic`. |
| 2026-05-16T~20:00Z | Vercel | https://gbp-rescue.vercel.app | #104 discoverability | De-rigged the inbound-pull read. Added `sitemap.xml` (HTTP 200, valid XML), `robots.txt` (HTTP 200, → sitemap), IndexNow key `bc408eeb4a1ab7eaa124b57647fdac72.txt` (HTTP 200). **IndexNow submission: `api.indexnow.org` → HTTP 202** for `https://gbp-rescue.vercel.app/` (Bing/Yandex/Seznam). Legit non-account-suicide inbound reference: public repo `https://github.com/SolvoHQ/gbp-rescue` links the live site. Page content untouched. Reads re-gated: #75 → 2026-06-06, #102 → 2026-06-07 (≈3-week indexing window). |
