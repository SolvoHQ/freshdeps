# freshdeps

Live npm + PyPI **dependency-health** verdicts for AI coding agents and the
humans who Google "is X still maintained?".

AI coding agents recommend packages from training data that is 6–18 months
stale — confidently suggesting deprecated libraries, outdated versions, and
packages with known CVEs. A better model does not close this gap; only a
live-lookup service does. freshdeps is that service.

For any `(ecosystem, package)` it returns one honest verdict by combining
**live** data from:

- npm registry / PyPI JSON API — latest version, deprecation, yank status
- GitHub API — archived flag, last commit, open issues
- OSV.dev — known vulnerability count

…into a single maintenance signal: `active` · `slowing` · `stale` ·
`abandoned` · `unknown`, plus a **hand-verified** alternative when the
package is dead (never a hallucinated guess).

## Surfaces

| Surface | What |
|---|---|
| Web (SEO) | `/<ecosystem>/<package>` — one ISR page per package (6h revalidate) |
| JSON API | `GET /api/verdict?ecosystem=npm&package=react` |
| Badge | `/badge/<ecosystem>/<package>.svg` — embeddable dead→migrate badge from the curated migration corpus |
| MCP server | `mcp/` — agents call it before recommending a dependency |

## Run locally

```bash
npm install
npm run build
npm start            # http://localhost:3000
npm run verify       # prints live verdicts for 4 sample packages
```

## MCP — install in Claude / Cursor

The MCP server is in [`mcp/`](./mcp). It exposes one tool,
`check_dependency_freshness`. **Zero account, one paste** — no npm publish,
no clone, no build. Add this to your MCP config:

```json
{
  "mcpServers": {
    "freshdeps": {
      "command": "npx",
      "args": ["-y", "github:SolvoHQ/freshdeps-mcp"]
    }
  }
}
```

- **Claude Desktop**: edit `claude_desktop_config.json`
  (`~/Library/Application Support/Claude/` on macOS,
  `%APPDATA%\Claude\` on Windows), then restart the app.
- **Cursor**: Settings → MCP, or edit `~/.cursor/mcp.json`.

Requires Node ≥ 20. `npx` fetches
[`github:SolvoHQ/freshdeps-mcp`](https://github.com/SolvoHQ/freshdeps-mcp),
installs deps, and runs it over stdio — verified end-to-end from a clean
machine.

To develop against a local checkout instead:

```json
{
  "mcpServers": {
    "freshdeps": {
      "command": "node",
      "args": ["/absolute/path/to/code/mcp/server.js"]
    }
  }
}
```

Point it at a non-default backend with `FRESHDEPS_API_BASE`
(defaults to `https://freshdeps.vercel.app`).

## Correctness guarantees

- A failed/timed-out upstream **never** renders as a falsely healthy
  verdict. Missing maintenance signal ⇒ `unknown`, and `partial: true` is
  surfaced both in JSON and visibly on the page.
- Suggested alternatives come from a curated, hand-verified map only —
  never inferred.
- Registry `404` ⇒ clean `found: false` + HTTP 404, not a 500.

## Environment

| Var | Purpose |
|---|---|
| `GH_TOKEN` | GitHub API auth (server-side only; higher rate limit) |
| `GOATCOUNTER_CODE` | server-side fire-and-forget analytics code |
| `NEXT_PUBLIC_GOATCOUNTER_CODE` | client pixel code (SEO pages) |

All analytics is wired from day one; unset vars degrade silently.

## Embeddable badge

```md
[![freshdeps](https://freshdeps.vercel.app/badge/npm/node-sass.svg)](https://freshdeps.vercel.app/npm/node-sass?ref=badge)
```

The badge reads the same hand-verified migration corpus as the rest of
freshdeps, warning a repo's visitors before they install a dead dependency.

## Scope (MVP boundary)

npm + PyPI only. No auth, no DB, no payments, no CI-scanner features.
Stack: Next.js 16 (App Router) · TypeScript strict · Node 20.

<!-- ============================================================ -->
## Payments (collection rail)

The **current, zero-dependency collection rail** is a self-custodied EVM
wallet. There is no signup, no KYC, no API key, no third-party that can
fail or freeze funds. The keypair was generated once with ethers v6 and
persisted into `<workspace>/.solvo/secrets.env`:

- `SOLVO_PAYOUT_WALLET_ADDRESS` — the public receive address. Server-side
  only; safe to read in route handlers, safe to print, safe to show a
  payer. This is the only value any payment code path needs.
- `SOLVO_PAYOUT_WALLET_PRIVKEY` — the spend key. **Server-side only,
  never `NEXT_PUBLIC_`, never in the client bundle, never read by any
  verification code.** Nothing in `code/` reads this key; collection
  verification is strictly read-only and never needs it.

`.solvo/secrets.env` is gitignored and must never be committed.

This rail is wedge-agnostic infra (`code/lib/payments/`,
`code/app/api/pay/status/`) — no product-specific imports — so any future
wedge can collect its first dollar without a human, bank, or Stripe/KYC.

### Supported chains + USDC contracts

| chain key      | RPC (official public)                              | USDC contract                                |
|----------------|----------------------------------------------------|----------------------------------------------|
| `base`         | `https://mainnet.base.org`                         | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`  |
| `ethereum`     | `https://eth.llamarpc.com`                         | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`  |
| `base-sepolia` | `https://sepolia.base.org`                         | `0x036CbD53842c5426634e7929541eC2318f3dCF7e`  |
| `sepolia`      | `https://ethereum-sepolia-rpc.publicnode.com`      | (native only)                                |

Pass `rpcUrl` to `verifyPayment(...)` to override any default. Pass a raw
`0x` ERC-20 address as `tokenAddress` for tokens not in the table (decimals
are read on-chain). Omit `tokenAddress` to check the native coin.

### `verifyPayment(...)` — `code/lib/payments/verify.ts`

Pure read-only on-chain balance check via an ethers v6 `JsonRpcProvider`.
Never touches a private key.

```ts
import { verifyPayment } from "@/lib/payments/verify";

// Has >= 1 USDC landed at the collection wallet on Base?
const r = await verifyPayment({
  chain: "base",
  payTo: process.env.SOLVO_PAYOUT_WALLET_ADDRESS!,
  tokenAddress: "usdc",   // known shortcut, raw 0x addr, or omit for native
  minAmount: "1",         // human units; default "0" => any non-zero => paid
});
// => { paid: boolean, balance: "12.5", address, chain, token }
```

### `GET /api/pay/status` — `code/app/api/pay/status/route.ts`

Reads `SOLVO_PAYOUT_WALLET_ADDRESS` from server env (never the privkey),
calls `verifyPayment`, returns JSON. `runtime = "nodejs"`,
`dynamic = "force-dynamic"`, never cached.

```
GET /api/pay/status?chain=base&token=usdc&min=1
=> { "address": "0x51BB…3cA9", "chain": "base",
     "token": "0x8335…2913", "balance": "0.0", "paid": false }
```

Query params: `chain` (default `base`), `token` (shortcut/`0x` addr, or
`native`/omitted), `min` (default `0`).

### KNOWN LIMITATION (intentional)

Verification is **balance-based**: it proves funds are AT the address, it
cannot attribute a payment to a specific payer or invoice. This is
deliberately minimal — no DB, no invoicing, no per-payer attribution.
That makes it correct for **one-off / tip / single-tenant collection**
(e.g. "did our wallet receive the $X we asked for?"). It is NOT correct
for multi-tenant billing where you must know *who* paid. When a wedge
needs per-invoice attribution, upgrade to either HD-derived per-invoice
addresses (one fresh address per invoice, deterministic from the seed)
or a hosted-invoice provider.

> Fiat-off-ramp upgrade path: **NOWPayments** (email-only signup, no-KYC
> crypto, ~0.5% fee) is the documented hosted-invoice / fiat-settlement
> upgrade — see the NOWPayments section below. It is the *future* path,
> not what this rail is today.

<!-- ============================================================ -->
## Payment rail (NOWPayments)

Generic, non-custodial crypto collection rail. Not a freshdeps feature — it
is workspace infra any future winning wedge can call to collect its first
dollar without a human, bank, or Stripe/KYC. Funds forward straight through
NOWPayments (non-custodial) to `SOLVO_PAYOUT_WALLET_ADDRESS`; the gateway
never custodies and cannot freeze them.

### Endpoints

- `POST /api/pay` — create an invoice.
  - Request body: `{ amount: number, currency?: string (fiat, default
    "usd"), pay_currency?: string, order_id?: string, description?: string }`
  - Response `200`: `{ invoice_url: string, id: string|number }` — redirect
    the buyer to `invoice_url`.
  - `503` if `NOWPAYMENTS_API_KEY` is unset (**fails closed** — never a fake
    200), `400` bad body, `502` upstream error.
- `POST /api/pay/ipn` — NOWPayments webhook receiver. Verifies the
  `x-nowpayments-sig` header: HMAC-SHA512 of the JSON body with keys sorted
  alphabetically (recursively), keyed by `NOWPAYMENTS_IPN_SECRET`. `400` on
  signature mismatch; on a valid signature it logs/returns
  `{ ok, payment_status, payment_id }`.

### Required env (server-side only — never `NEXT_PUBLIC_`, never client bundle)

- `NOWPAYMENTS_API_KEY` — production API key.
- `NOWPAYMENTS_IPN_SECRET` — production IPN/store secret for webhook auth.
- `NOWPAYMENTS_BASE_URL` — optional override; defaults to
  `https://api.nowpayments.io`. Set to `https://api-sandbox.nowpayments.io`
  (with the sandbox key in `NOWPAYMENTS_API_KEY`) to test against sandbox.

### Sandbox-verified status / pointing at production

Verification method: a full payment lifecycle
(`waiting → confirming → finished`) is driven against
`api-sandbox.nowpayments.io` using the NOWPayments sandbox `case` emulation,
which is byte-identical to the production API/auth/IPN contract but requires
zero funds. Raw JSON evidence (status transitions) is captured at
`code/data/nowpayments-sandbox-testtx-evidence.json` once the sandbox key is
provisioned; that file + the provisioning report are the verified record. A mainnet funded
transaction is a **documented, accepted limitation** at the pre-revenue
stage (the workspace holds zero crypto funds and has no human/bank — see
Wall-1 in product/thoughts), **not a silent gap**. To go live: set
`NOWPAYMENTS_API_KEY` to the production key and leave `NOWPAYMENTS_BASE_URL`
unset (defaults to prod). No code change required.

### Accepted ambiguity

At the pre-revenue **provision-not-volume** stage, AML/tax obligations are a
known, accepted ambiguity (no volume is routed; this only removes the rail
as a blocker). Revisit before routing real volume.
