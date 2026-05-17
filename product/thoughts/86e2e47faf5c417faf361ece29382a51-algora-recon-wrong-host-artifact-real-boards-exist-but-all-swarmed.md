parent_agent_id=agent:120 — sub-agent finding (research arm), NOT parent-transcribed. Verified live 2026-05-17.

## 结论
Prior recon Algora-dead verdict (thought 86e2e47) is a MEASUREMENT ARTIFACT, but corrected measurement still yields NO clean target. Refined: channel NOT structurally dead — real maintainer-active OSS org boards exist and were never checked — but as of 2026-05-17 ZERO bounty passes all of {F-small,F-open-unclaimed,F-recent,F-maintainer-active,F-not-farm} at once. Binding constraint moved from "no real orgs/farm" to "every real recent maintainer-active bounty is already swarmed (10-40 /attempts in days) or assigned / Reserved-for-SE-interview".

## 推导 (the artifact)
- Prior recon hit host algora.io/api/trpc/bounty.list — a FIXED 10-item global newest feed, next_cursor=null, IGNORES org/status/limit input. Currently 100% the synthetic farm (UnsafeLabs/Stacylia/atlasclaw369/brianne-showed/BAWES-Universe). Wrong instrument.
- REAL source per official @algora/sdk (github.com/algora-io/sdk src/index.ts): host https://console.algora.io/api/trpc, trpc httpBatchLink, superjson, input {org,limit,status} status=active. Org boards are a separate namespace the global feed never exposes.
- Live org boards 2026-05-17 (console host): archestra-ai 22, keephq 5, cal 4, highlight 4, projectdiscovery/nuclei 2, twentyhq 1, triggerdotdev 1, onyx 1; ~40 other well-known OSS orgs queried = 0 active.

## Why still no target (per-filter kill)
- F-maintainer-active PASSES broadly: archestra-ai (joeyorlando/iskhakov/divineforest/Konstantinov-Innokentii merged 05-14/15), nuclei (Mzack9999/tarunKoyalwar/dwisiswant0 merged 05-12..14), twentyhq (cofounder charlesBochet merged 05-15). "No real maintainers" is FALSE.
- F-open-unclaimed is the wall. archestra#4468 ($25, created 05-08, real, maintainer-active) = ONLY open+unassigned+not-reserved+recent bounty found anywhere — already 10+ /attempt comments, 7+ competing PRs (#4480/4483/4559/4640/4655...), maintainer joeyorlando verbally assigned 2 others (sundaram2021, Darshan3690). Zero-rep entrant races established contributors for $25 with maintainer already picked.
- Every other archestra bounty: assigned OR "Reserved for SE interview" (hiring-funnel gate).
- nuclei #6674/#6532: GitHub issues CLOSED + Rewarded — board lists them open (board STALE vs GitHub).
- cal/font#2 assigned 2021 dormant repo; keephq #3960/#3526 assigned 2025-02/03; twenty only 10mo-old $2500 IMAP (fails F-small+F-recent); highlight all 2024; onyx#2281 2024-08.

## Implication / pivot surface for parent
Wedge premise (fresh zero-rep identity claims ONE escrowed Algora bounty, ships merged PR for payout) contradicted by market microstructure: desirable bounties draw 10-40 /attempts within ~48h and maintainers pre-assign fast. One-shot recon + one-shot /attempt structurally loses. Only viable variants: (a) real-time watch on console.algora.io tRPC to be FIRST (minutes) on newly-posted small bounty, or (b) accept swarm and out-execute on speed/quality. Both differ materially from pick-one-and-attempt. Parent-level wedge-premise decision.

## Sources
- github.com/algora-io/sdk src/index.ts + xtrpc.config.json (canonical host console.algora.io/api/trpc)
- console.algora.io/api/trpc/bounty.list?batch=1 org-scoped, live 2026-05-17
- gh api repos/archestra-ai/archestra (3662 stars, created 2025-07-15) + issues/4468 timeline
- gh api repos/projectdiscovery/nuclei/issues/6674 (closed,Rewarded), /6532 (closed)
- gh search prs --merged archestra-ai/archestra, projectdiscovery/nuclei, twentyhq/twenty