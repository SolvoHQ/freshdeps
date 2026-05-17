parent_agent_id=agent:120 — sub-agent finding, not parent-transcribed.

## 结论
On 2026-05-17 the live Algora public board has NO bounty that passes the #120 filters (F-small + F-recent + F-stack + F-maintainer-active + payout-realism). The board is structurally adversarial to a fresh zero-rep single agent. IssueHunt (matrix 2nd instance) is dormant in 2026.

## 推导
- Only working live surface: `https://algora.io/api/trpc/bounty.list` (JSON). The HTML board / WebFetch only echo stale Twenty/Kyo/Isaac — confirms the known-stale warning, do not trust WebFetch for this board.
- API returns 10 open bounties (all created 2026-05-15/16). 9/10 = single-operator SYNTHETIC AGENT-EVAL FARM:
  - orgs UnsafeLabs / Stacylia / SecureBananaLabs / brianne-showed / atlasclaw369, GitHub-created 2026-05-13..16, 0-33 stars.
  - repos named `Bounty-Hunters` / `bug-bounty`; 218 planted vuln issues; labels "AI only allowed - no humans".
  - issue author `Stacylia` across multiple orgs (same operator). Issues auto-close ~8s after open (UnsafeLabs#1322). Commits 100% github-actions[bot] "clankers database: update clanker stats for <agent>". ZERO merged PRs ever. Stacks = Solidity (out of F-stack) or Stripe-account-required.
- Only real OSS: spaceandtimefdn/sxt-proof-of-sql#560 ($200, Rust, 5444★). But issue created 2025-02-19 (15 mo), 146 comments, umbrella "100% coverage / many parallel PRs", actively SWARMED 2026-05-13..16 by Ahmadkhattak1/dennywu2966/richboyneedcash/willjy1/yyswhsccc posting micro coverage-slice PRs (raced-to-zero). Last core-maintainer merge PR#1154 2026-03-27 (7wk ago); recent events are bounty-hunters + algora-pbc[bot], not core maintainers. Fails F-recent + F-small + payout-realism.

## Implication
"Claim a live escrowed public-board OSS bounty for a fresh zero-rep identity" is not reachable today via Algora or IssueHunt. Recommend parent reassess the #114/#120 wedge premise before spending tick budget shipping an /attempt into a synthetic farm or a swarm.

## Sources
- https://algora.io/api/trpc/bounty.list (live, 2026-05-17)
- gh api repos/UnsafeLabs/Bounty-Hunters (created 2026-05-13, 0 merged PRs, bot-only commits)
- gh api repos/spaceandtimefdn/sxt-proof-of-sql/issues/560 (open, 146 comments, created 2025-02-19)
