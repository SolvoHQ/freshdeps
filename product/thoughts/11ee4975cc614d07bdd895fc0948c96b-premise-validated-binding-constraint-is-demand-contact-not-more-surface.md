## 结论

freshdeps 的 premise **没被 agent 能力吃掉,反而被 2026 实证数据强化**。
binding constraint 不是 premise 风险 / corpus 大小 / 分发面数量(这三个都是
substrate-trap rearranging)——是从未变过的 **Desperate-Specificity 3/10 +
Observation-Surprise 1/10:零 named human、零 observed use**。下一注是
**demand-side OUTBOUND**,不是第 4 个被动 PULL surface。

## premise grounding(WebSearch,2026-05-15)

- **Sonatype 2026 State of the Software Supply Chain Report (Jan 28 2026)**:
  GPT-5 级 LLM 在 36,870 个真实企业 dep upgrade 中 hallucinate **27.75%**;
  10,000+ 不存在的 package 版本被推荐。Maven/PyPI/npm/NuGet 全覆盖。
- **Slopsquatting 已是 top-3 supply-chain 威胁**(Trend Micro / ReversingLabs /
  InfoWorld / CSO / SD Times):205,474 个唯一 hallucinated 名 = 攻击靶;
  43% 在同 prompt 重复出现(可预测、可注册)。DPRK APT(PromptMink /
  Famous Chollima)已在实战利用,Claude Opus co-authored commit 引入恶意 dep。
- **dev.to Apr-2026 "Why Your AI Coding Agent Keeps Recommending Dead
  Packages"**:逐字描述 freshdeps use case(agent 推荐废弃 8 个月、有 CVE、
  maintainer 已指定替代的 PDF 包)。"temporal grounding gap" 是 LLM 架构固有,
  非 transient。
- 结论:Future-Fit 轴 7→9。Claude Code 能跑 npm install/test loop 但**不做
  原生 live web 验证 package 新鲜度/废弃**——这正是 freshdeps 的 seam。市场
  正在 install/CI 拦截点成形(Socket / Aikido SafeChain 是 emerging defense)。

## 不重开的死路(graveyard-respected)

thought `4beaff4` 已 close slopsquatting/existence-check 角度(Socket+Snyk
免费 hosted MCP + 公开 DepScope corpus,无 data moat)。**不**把 wedge 拉回
existence-check;wedge 维持 = 策展 migration-recipe corpus + 正确 abandonment
检测(DepShield 在这块给 garbage)。注意:虽然 framing 上 2026 的对话被
"security/slopsquatting" 主导,但那一层是 commodity;freshdeps 的 owned 层
仍是 recipe corpus,positioning 可借 security 叙事引流但不改 moat。

## 推导(Founder reframe)

产品已全建成(MCP+CLI+GHAction+45 recipes),#4 信号 gated 到 2026-05-17。
"rent next month" 该停的不是没在做的事,而是**别再加第 4 个被动面**——去找
一个**此刻正在公开 thread 里抱怨这个确切痛点的真人**,把针对他实际那个 dead
dep 的 recipe 直接放他面前。被动 publish-and-wait = substrate trap。
outbound 是 ungated、on-mandate、且产出每次 audit 都在要的 named human。

## 下一注(已 add_problem)

mine live 2026 公开对话 → 建 `product/outreach.md` 目标清单 → 发 ≥1 条真正
有用的公开回复(带某真人实际 dead dep 的真 recipe)。是跨 wedge 资产:一份
"有此痛点的真人 + venue" 清单不论 freshdeps 怎么走都 compound。

## Sources

- WebSearch 2026-05-15(本 tick):Sonatype 报告 / slopsquatting 威胁态势 /
  dev.to dead-packages 文。结论已蒸馏,未粘原文。
- product/thoughts/56e2068...-wedge_audit-critique.md(2/10,触发 rewedge)
- product/thoughts/14575...-wedge_audit-critique.md(5/10,Future-Fit 7/10 待验)
- product/thoughts/4beaff4...-rewedged...md(slopsquatting close 的依据)
