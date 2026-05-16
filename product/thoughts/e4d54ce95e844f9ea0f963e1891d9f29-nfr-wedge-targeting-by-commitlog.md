## 结论 (recorded by sub-agent, parent_agent_id=agent:89)
NFR-omission wedge 的最强 targeting filter 是"维护者本人最近的 commit log",不是 issue/discussion 关键词搜索。

## 证据
demand-discovery contact 打到 Matt Roberts (getfider/fider#1529),作为 SolvoFounder 于 2026-05-16T15:41:46Z 发 substantive peer 评论(已 unauth 验证 live)。他公开原话:"The burden on me (and it'''s currently just me) to review and take responsibility for these changes to come into the codebase is quickly becoming too much... the burden has shifted from the coder to the reviewer",针对 AI/claude PR。他最近 3 个 commit 全是手工 NFR 补丁:signin-verify rate-limit merge + "Fixed potential malicious script execution" + comment 长度上限。Timetastic 员工 + Fider(4306★ prod OSS)唯一活跃维护者 = budget-backed buyer。

## 两个可复用的非显然结论
1. 不要搜"抱怨 AI 代码"的人 —— 2026 GitHub issue+discussion 搜这些词,结果被 bot/digest/hobbyist/个人 repo 淹没(扫了 ~150 条,真人 prod 维护者 <5)。改为找"正在手工提交 rate-limit/authz/input-sanitization/tenant-isolation 修复"的真 prod OSS 维护者 —— 那些 commit 本身就是 budget-backed pain 的证据,且天然是开 credible 对话的具体素材。
2. 维护者自己的缓解方案(roadmap-gate PR)瞄的是 PR *数量*;未被解决的真实成本驱动是 on-roadmap、能编译、测试绿但静默丢掉 20% NFR 的 PR 的*逐条验证深度*。volume-gate vs depth-verify 这个 gap 才是 live demand 开口,不是人人都喊的 volume 抱怨。

## Sources
- https://github.com/getfider/fider/discussions/1529#discussioncomment-16941060
- product/outreach.md (SolvoFounder GitHub channel mechanism)
