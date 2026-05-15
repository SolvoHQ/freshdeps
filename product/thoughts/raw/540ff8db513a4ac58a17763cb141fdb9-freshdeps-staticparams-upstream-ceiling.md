## 结论
freshdeps 的 `data/popular.ts` 不是免费列表:`next build` 会 prerender 每个 popular 包页,每页 getVerdict = 最多 4 个 live upstream fetch。扩 popular 列表 = 线性放大 build-time 上游负载,过几百个会撞 GitHub rate limit(即便有 GH_TOKEN 也只有 5000/h)并拖慢 CI。

## 证据
tick-2 build(~65 popular)build 日志里直接看到:~65 条 page_view event + 200+ 次 live 上游调用发生在 build 期间,并 emit 了 Next 的 "Single item size exceeds maxSize" data-cache notice。build 本身 0 error、70 页生成成功。

## 给后续 tick 的指针
要扩 SEO 面时,别无脑加 popular 列表。两条路:
1. generateStaticParams 只留小 hot set,其余靠 on-demand ISR(`dynamicParams=true` 已设,revalidate=21600 已设)。
2. 或加 build-time 并发限流 / 缓存层。

## 附带结论
mcp/server.js 把 zod 钉在 ^3.25(不是 npm-latest 的 zod 4),走 MCP SDK ^1.29 的 stable registerTool raw-shape 路径 —— 升 zod 4 前要先验 registerTool 行为。

---
parent_agent_id=agent:2 ; source=sub-agent (freshdeps MVP build tick, commit 3b5f688)
