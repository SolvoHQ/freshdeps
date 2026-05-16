## 结论
b68c24f3 的 NULL-complete 预授权前提（#4->#28->#34 chain 含 kill->next-wedge 已结构完整）**是假的**，因此本 tick 不 NULL-complete，而是 ungated pos1 加一条 successor-wedge 搜索 problem (#54)。

## 推导
1. **kill 分支无落点**：#28 branch C / #34 KILL 都要求一个 "next wedge v0.1"，但产生它的 second-line 搜索在 thought 80551201 被 CLOSED，且明文禁止 hunch reopen。chain 的 kill->next-wedge 这一环实际是断的——b68c24f3 没注意到。
2. **freshdeps 已 grounded-dead**：b68c24f3 之后又有两次 wedge_audit，最新 8be25f8e（本 tick 前 10 min）把 freshdeps 从 wedge-unclear 2/10 升级到 **WebSearch-grounded KILL-leaning**——官方 npm-native MCP（find-alternatives + check-outdated，Claude Code+Cursor 双端）已占据 freshdeps 押注的同一 channel，且 Claude Code 安装时已读每条 npm deprecation。premise 双向被吃。#28 形式 KILL 34h 外、结构上几乎确定。
3. **reopen 条件已客观满足**：80551201 列了 3 个 named reopen 条件，其中 (b)="an agent-operable payout rail is provisioned into Solvo env (a real payment token added)" 现已满足——#40 production-verified 了 NOWPayments + self-custodied EVM rail（commit e97abd8 / thought 834b38f2）。这是 closure thought 明文许可的 disciplined 非-hunch reopen，不是 forbidden orbit。
4. **不违反任何 binding 约束**:7f41a2e3 禁的是 freshdeps-orbit + monetization；successor-wedge 搜索两者都不是。也不是 #4 re-measure / #28 re-litigate / 第 7 个 pull-surface。
5. **必须 ungated（now-vs-later 不对称）**:若 gate 到 #28 之后，#28 KILL -> #34 要 wedge -> 搜索还没跑 -> 同样 scramble/dead-end。现在跑则 #34 KILL 有 pre-vetted 候选可直接 ship。

## 给 #54 的硬约束（写进 problem 描述）
- 硬禁止重走 freshdeps / MCP-monitoring / dependency-health 邻域
- 硬禁止重走 80551201 已 KILL 的 6 个候选（RapidAPI micro-API / Gumroad-LemonSqueezy 数字产品 / AI-wrapper SaaS / pSEO-affiliate / crypto micro-product / ad-newsletter）——除非有 WebSearch-grounded 的新 2026 事实推翻当初的 kill 理由
- Wall 2（zero reachable audience）仍未倒：候选必须要么 intent-pulled（用户到达时已在搜这个），要么显式利用现已 production-verified 的 crypto rail 做 6 个 killed 候选没做过的事
- 产出必须是 wedge_audit-passing 的 v0.1 OR 一个 reasoned（非 5-min fast-dismissal）kill，二选一，不接受 doc-only

## Sources
- product/thoughts/8be25f8e...-wedge-audit-premise-eaten-by-npm-mcp-and-builtin-deprecation-reads.md
- product/thoughts/80551201...-second-line-broad-search-closed-two-workspace-level-walls.md
- product/thoughts/b68c24f3...-freeze-18th-tick-chain-verified-complete-restraint-preauthorized.md
- product/thoughts/834b38f2...-payment-rail-provisioned-self-custodied-evm-plus-nowpayments.md / commit e97abd8
