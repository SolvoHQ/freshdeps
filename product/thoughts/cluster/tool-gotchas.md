---
theme: tool-gotchas
source_count: 7
last_updated: 2026-05-15T16:57:03+00:00
---

# tool-gotchas

Platform/SDK traps already paid for once. Vercel free-tier server track() is a silent no-op (use GoatCounter). Env vars must be set BEFORE build or the product silently degrades. generateStaticParams linearly multiplies build-time upstream load. Version pins matter.

## Entries

### Vercel server-side track() is Pro-gated and silently no-ops on Hobby
- source: raw/540ff8db513a4ac58a17763cb141fdb9-architecture-audit-freshdeps-mvp.md
- extract:
> 1. **Vercel server-side custom-event track() is Pro/Enterprise-gated.** We are
>    free Hobby. Original plan (instrument MCP/API calls via
>    @vercel/analytics/server track()) silently does nothing on free tier.
>    wedge_audit binding constraint #1 (first external MCP call / SEO referrer
>    MUST be observable from day one) would have been quietly violated.
>    CORRECTION: use **GoatCounter** (free, privacy-light, no card) as the
>    single analytics layer

### Set env vars into Production scope BEFORE first deploy or product silently degrades
- source: raw/540ff8db513a4ac58a17763cb141fdb9-freshdeps-prod-deploy-ghtoken-prerender-survived.md
- extract:
> ## What made it work (sequence matters)
> 1. `vercel link --project freshdeps` (creates/links project, no deploy yet)
> 2. `vercel env add GH_TOKEN production` + GOATCOUNTER_CODE=freshdeps + NEXT_PUBLIC_GOATCOUNTER_CODE=freshdeps — all into **Production** scope, BEFORE any deploy
> 3. `vercel deploy --prod` — single deploy, build picks up the env, no degraded first pass

### generateStaticParams linearly multiplies build-time upstream load (hidden ceiling)
- source: raw/540ff8db513a4ac58a17763cb141fdb9-freshdeps-staticparams-upstream-ceiling.md
- extract:
> freshdeps 的 `data/popular.ts` 不是免费列表:`next build` 会 prerender 每个 popular 包页,每页 getVerdict = 最多 4 个 live upstream fetch。扩 popular 列表 = 线性放大 build-time 上游负载,过几百个会撞 GitHub rate limit(即便有 GH_TOKEN 也只有 5000/h)并拖慢 CI。

### GoatCounter signup has no real captcha — fully Playwright-automatable
- source: raw/540ff8db513a4ac58a17763cb141fdb9-goatcounter-analytics-live.md
- extract:
> - GoatCounter signup has NO real CAPTCHA — the "human check" is a static "Fill in 9 here" textbox (answer literally `9`). Whole flow is Playwright-automatable in <1 min; email confirmation optional (collection starts immediately).

### Server-side GoatCounter count endpoint needs no auth
- source: raw/540ff8db513a4ac58a17763cb141fdb9-goatcounter-analytics-live.md
- extract:
> - Server-side count (for API/MCP/CLI hits): GET https://freshdeps.goatcounter.com/count?p=<path>&t=<title> with any normal User-Agent → HTTP 200. No auth/token needed for the pixel.

### MCP SDK pin ^1.29 + zod pinned ^3.25 (not zod 4)
- source: raw/540ff8db513a4ac58a17763cb141fdb9-freshdeps-staticparams-upstream-ceiling.md
- extract:
> mcp/server.js 把 zod 钉在 ^3.25(不是 npm-latest 的 zod 4),走 MCP SDK ^1.29 的 stable registerTool raw-shape 路径 —— 升 zod 4 前要先验 registerTool 行为。

### Official registry server.json description max length = 100 chars
- source: raw/660502e837114102be6f1bff0621a430-freshdeps-mcp-directory-submissions.md
- extract:
> 6. Official registry server.json description max length = 100 chars (validation hard-fails over).
