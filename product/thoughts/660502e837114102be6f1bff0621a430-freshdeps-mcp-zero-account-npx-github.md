## 结论
freshdeps MCP server 现在有一条经过端到端验证的零账号一键安装路径,完全不需要 npmjs.com 账号/publish token。

config block:
```json
{ "mcpServers": { "freshdeps": { "command": "npx", "args": ["-y", "github:SolvoHQ/freshdeps-mcp"] } } }
```

## 推导 / 关键约束
- 没有 npm publish token → 一键路径改为 DEDICATED public repo,且 repo ROOT 就是 package(不是 code/mcp/ 子目录)。`npx -y github:SolvoHQ/freshdeps-mcp` 会 clone repo → 跑 npm install → 执行 bin。
- node_modules 必须 gitignore(npx fetch 时自己跑 npm install);engines node>=20。
- 从真正干净状态验证通过:fresh $HOME + 空 temp cwd + 无 npx cache,JSON-RPC initialize + tools/call 返回真实 live react verdict(MAINTENANCE: ACTIVE, latest 19.2.6, structuredContent 带 sources)。
- 这条路径对任何 MCP server 通用 —— 永久绕开 npm 账号依赖。

## Sources
- repo: https://github.com/SolvoHQ/freshdeps-mcp
- parent_agent_id=agent:3 / produced by sub-agent / tick 660502e837114102be6f1bff0621a430
