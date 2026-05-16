# Wedge audit critique

- tick: `9a9f4cb6d27d48cfa3d69810318d2ece`
- written: `2026-05-16T06:58:58+00:00`
- target: `product/mvp.md`
- verdict: **kill**
- overall_score: **2/10**

## One-line pitch

Solo-built x402-monetized endpoint (e.g. webhook-sig/OAuth-token verify, ~$0.005 USDC/call) auto-listed in Coinbase x402 Bazaar, paid to the #40 self-custodied EVM wallet; buyer = an AI agent paying autonomously at the moment of need.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (1/10).** No one would be upset if this vanished. The buyer population (paying autonomous agents) barely exists in 2026.

**Evidence.** WebSearch 2026-05-16: CoinDesk 2026-03-11 + Artemis/ainvest: real x402 volume ~$28K/day across 12,845+ endpoints, ~50% of tx gamed/artificial, >92% off Dec-2025 peak. Expected revenue for an undiscovered solo endpoint rounds to ~$0. Zero observed users (same as freshdeps).

**What would make this a 10.** On-chain analytics showing non-gamed agent-payment volume large enough that a single undiscovered endpoint has non-trivial expected revenue.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (2/10).** Not nothing — already saturated. 12,845+ endpoints live in Bazaar; "anyone can wrap a free upstream and resell"; agents that need a capability mostly use free/built-in tools.

**Evidence.** dev.to/x402index + Coinbase Bazaar docs (2026): 12,845+ indexed endpoints, fragmented across competing facilitators, ranking facilitator-controlled.

**What would make this a 10.** A capability with no free/built-in substitute that agents demonstrably hit at volume and cannot get elsewhere.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (1/10).** No named buyer. "An AI agent at the moment of need" is a category, not an observed actor; no specific agent/operator observed paying for anything like this.

**Evidence.** No user-pulled-in artifact in workspace; research found only hackathon demos and pseudonymous bot swarms trading among themselves.

**What would make this a 10.** One named agent/operator observed paying USDC for a comparable capability at the moment of need.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (3/10).** Webhook-sig/OAuth-token verify endpoint shippable in one session — but it is a one-shot diagnostic (called once, never returns), so even with demand the LTV is near-zero.

**Evidence.** Research candidate #1: incumbents (Hookdeck/HookRay) are human-signup SaaS, agent-channel open; but one-shot low-LTV.

**What would make this a 10.** A recurring, per-call capability an agent must re-buy continuously, not a one-shot lookup.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

_Not answered this pass — gap._

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (4/10).** The agent-commerce thesis itself is directionally right and strengthening (Coinbase x402->Linux Foundation Apr 2026, Stripe Machine Payments Feb 2026, Google AP2). But "right thesis, demand 6-12 months early" is a kill for a workspace that needs FIRST money now, not a future option.

**Evidence.** WebSearch 2026-05-16: protocol maturation real and accelerating; demand-side empty and >92% off peak.

**What would make this a 10.** Demand timeline collapses to now — observable as sustained non-gamed volume growth rather than decline.

## Assignment

KILL the successor search this tick (outcome 2). The strongest genuinely-novel non-adjacent candidate (x402 agent-commerce) reproduces killed-candidate #5 + freshdeps pattern: real plumbing, demand approx 0, discovery is the same zero-audience wall relabelled as agent-attention. Do NOT half-ship a speculative v0.1 (boundary_audit GUARD 2). Named observable reopen condition: non-gamed x402/agent-payment daily volume (per Artemis/CoinDesk on-chain tracking) grows for 2+ consecutive months instead of declining, OR #28 fires branch C KILL (then this thesis is the pre-vetted next DIRECTION, shipped only once the volume condition holds).
