# freshdeps-mcp

MCP server exposing **live npm / PyPI dependency-health verdicts** so AI
coding agents can check a package *before* recommending it — closing the
6–18 month staleness gap in model training data.

## Tool

### `check_dependency_freshness`

| Input | Type |
|---|---|
| `ecosystem` | `"npm"` \| `"pypi"` |
| `package` | string |

Returns a concise human-readable summary **and** structured content:
maintenance signal (`active`/`slowing`/`stale`/`abandoned`/`unknown`),
latest version, last release/commit age, deprecation/yank/archived flags,
known CVE count (OSV), and a hand-verified alternative if the package is
dead.

It calls `${FRESHDEPS_API_BASE}/api/verdict` (default
`https://freshdeps.vercel.app`).

## Install (Claude Desktop / Cursor) — zero account, one paste

No npm account, no clone, no build. Paste this into your MCP config:

```json
{
  "mcpServers": {
    "freshdeps": {
      "command": "npx",
      "args": ["-y", "github:SolvoHQ/freshdeps-mcp"]
    }
  }
}
```

- **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json`
  (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows), then
  restart Claude Desktop.
- **Cursor**: Settings → MCP → add the same block (or edit
  `~/.cursor/mcp.json`).

Requires Node ≥ 20 on PATH. `npx` fetches
[`github:SolvoHQ/freshdeps-mcp`](https://github.com/SolvoHQ/freshdeps-mcp),
installs deps, and runs the server over stdio — verified end-to-end from a
clean machine.

### Develop locally (secondary)

To run from a checkout of this repo instead:

```json
{
  "mcpServers": {
    "freshdeps": {
      "command": "node",
      "args": ["/absolute/path/to/code/mcp/server.js"]
    }
  }
}
```

## Run / test manually

```bash
npm install
FRESHDEPS_API_BASE=http://localhost:3100 node server.js
```

The server speaks JSON-RPC over stdio (`StdioServerTransport`).

## Env

| Var | Purpose |
|---|---|
| `FRESHDEPS_API_BASE` | backend base URL (default prod) |
| `GOATCOUNTER_CODE` | optional fire-and-forget usage analytics |
