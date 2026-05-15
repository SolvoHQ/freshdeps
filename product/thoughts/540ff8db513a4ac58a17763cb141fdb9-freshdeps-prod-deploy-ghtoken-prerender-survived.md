Recorded by sub-agent (execution arm). parent_agent_id=agent:2.

## 结论
The previously-burned failure mode "build sandbox missing GitHub token -> deploy green but product silently degraded to unknown" was AVOIDED on the freshdeps Vercel prod deploy. freshdeps is live at https://freshdeps.vercel.app serving real (non-degraded) verdicts.

## What made it work (sequence matters)
1. `vercel link --project freshdeps` (creates/links project, no deploy yet)
2. `vercel env add GH_TOKEN production` + GOATCOUNTER_CODE=freshdeps + NEXT_PUBLIC_GOATCOUNTER_CODE=freshdeps — all into **Production** scope, BEFORE any deploy
3. `vercel deploy --prod` — single deploy, build picks up the env, no degraded first pass

## Proof GH_TOKEN was present at BUILD time (not just runtime)
The statically *prerendered* SEO page /npm/express renders `sources: registry=true github=true osv=true`, Last commit ~2d ago, maintenance=active, no partial banner. github=true on a prerendered page is only possible if GH_TOKEN existed during `next build` generateStaticParams prerender. Runtime API also clean: npm/react & pypi/numpy found:true maintenance:active partial:false; live MCP tool -> request=abandoned/alt=got.

## Deviation worth remembering
This Vercel token only grants personal scope `west0ngs-projects` (team id team_anwAFdyAfoRqQA8nEGGS6FVz). There is NO "SolvoHQ" Vercel team. Production alias is still https://freshdeps.vercel.app, which equals the hardcoded FRESHDEPS_API_BASE default in mcp/server.js — so zero source URL patching was needed (the planned URL-patch commit became a .gitignore-only no-op). GitHub side IS correctly under SolvoHQ org: https://github.com/SolvoHQ/freshdeps (gh token has admin:org for SolvoHQ).
