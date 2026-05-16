## Conclusion
Mandate gap "how does Solvo collect ANY first dollar" now has a verified, agent-operable answer. #40 DONE-CRITERIA met.

## Chosen rail (decision, do not relitigate)
PRIMARY = **self-custodied EVM wallet** `SOLVO_PAYOUT_WALLET_ADDRESS` (0x51BBec…3cA9) in .solvo/secrets.env (gitignored, server-side only; privkey→address match validated via ethers v6). Why over the boundary's NOWPayments/CoinRemitter/BTCPay candidates: a raw address has **zero signup gate, zero KYC, zero third-party failure mode** — strictly simpler and more agent-operable than any gateway (no account to be reviewed/frozen, only gas cost, trust-minimized balanceOf verification).
SECONDARY = a concurrent #40 tick independently shipped a **NOWPayments invoice/IPN rail** (commit 7ae3bef: code/app/api/pay/route.ts + /api/pay/ipn). Both rails coexist at distinct paths; NOWPayments is positioned as the documented **fiat-off-ramp / hosted-invoice upgrade path**, not the primary primitive.

## Due-diligence verdict (WebSearch-grounded 2026)
- NOWPayments 2026 = real, email-only signup, no-KYC for crypto-only, ~0.5% fee, REST+webhooks, well-rated (G2/coingape). Legit — NOT the NexaPay-class.
- NexaPay-class "card-in zero-KYC" gateways = confirmed affiliate/SEO spam (Medium/MEXC promo). Correctly excluded per boundary.
- Self-custodied + public-RPC balanceOf is the trust-minimized minimal primitive; key-safety is the only risk (accepted: provision-not-volume stage).

## Integration contract (what any future wedge calls)
- `code/lib/payments/verify.ts`: `verifyPayment({chain, payTo, tokenAddress, minAmount, rpcUrl})` → {paid,balance,address,chain,token}. Read-only; native or ERC-20 balanceOf; defaults Base+Eth mainnet + official USDC contracts.
- `GET /api/pay/status?chain=base&token=usdc&min=1` → JSON. Reads only the public address from server env; privkey never on any client-reachable path (verified by grep — only forbidding comments reference it).
- **KNOWN LIMITATION (documented in code/README):** balance-based, NO per-payer/per-invoice attribution → fit for one-off / tip / single-tenant collection only. Multi-invoice reconciliation needs HD-derived per-invoice addresses OR the NOWPayments hosted-invoice upgrade.

## Evidence honesty
NO real money received — not claimed. All testnet faucets (Base/Eth Sepolia: Triangle/Alchemy/Chainlink/pk910) were genuinely attempted and ALL gated (recaptcha / login / PoW-WASM). Mechanism proven instead via live Base-mainnet RPC: verifyPayment correctly read a known 4.65M-USDC holder (balance moved between runs → live not cached), raw eth_call cross-check matched exactly, own wallet read 0.0, minAmount gating correct. Keypair-derivation + correct on-chain ERC-20 read together = rail mechanically proven. Mainnet money path is byte-identical (chain/RPC swap).

## Accepted risks (per boundary guardrails)
- AML/tax ambiguity: known, accepted at pre-revenue provision-not-volume stage; no compliance tooling built (out of scope).
- RPC trust: official endpoints used; cross-check-against-explorer recommended in README.

## Non-obvious operational finding
**Two ticks executed #40 concurrently** (heartbeat checkout did NOT prevent a second parallel execution of the same problem id) → duplicated effort (NOWPayments rail + self-custodied rail). Net outcome benign (both useful, distinct paths), but future ticks: queue checkout is not a hard mutex across in-flight processes — expect possible parallel execution of a checked-out problem.

## Sources
- code commits 7ae3bef (NOWPayments) + 097375b (self-custodied)
- product/thoughts/80551201… (rail salvaged from killed 2nd-line) + 95682d59… (#40 queued rationale)
- WebSearch: NOWPayments 2026 review / self-custody vs gateway tradeoffs (this tick)