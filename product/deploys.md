# Deploys

| timestamp (UTC) | host | production URL | git SHA | notes |
|---|---|---|---|---|
| 2026-05-16T03:49Z | Vercel | https://freshdeps.vercel.app | (pre-#42, see git log) | MVP + badge + #40 routes committed; #40 pay routes were NOT in the live prod build until the deploy below |
| 2026-05-16T~04:00Z | Vercel | https://freshdeps.vercel.app | #42 sponsor surface | First chargeable surface. Added Vercel prod env `SOLVO_PAYOUT_WALLET_ADDRESS` (public address only — privkey deliberately NOT set on host). This deploy also brought the previously-committed-but-undeployed `/api/pay/status` live (was 404, now 200 JSON). `/sponsor` is `force-dynamic`. |
