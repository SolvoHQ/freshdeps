# freshdeps

Live npm + PyPI **dependency-health** verdicts for AI coding agents and the
humans who Google "is X still maintained?".

AI coding agents recommend packages from training data that is 6–18 months
stale — confidently suggesting deprecated libraries, outdated versions, and
packages with known CVEs. A better model does not close this gap; only a
live-lookup service does. freshdeps is that service.

For any `(ecosystem, package)` it returns one honest verdict by combining
**live** data from:

- npm registry / PyPI JSON API — latest version, deprecation, yank status
- GitHub API — archived flag, last commit, open issues
- OSV.dev — known vulnerability count

…into a single maintenance signal: `active` · `slowing` · `stale` ·
`abandoned` · `unknown`, plus a **hand-verified** alternative when the
package is dead (never a hallucinated guess).

## Surfaces

| Surface | What |
|---|---|
| Web (SEO) | `/<ecosystem>/<package>` — one ISR page per package (6h revalidate) |
| JSON API | `GET /api/verdict?ecosystem=npm&package=react` |
| Badge | `/badge/<ecosystem>/<package>.svg` — embeddable dead→migrate badge from the curated migration corpus |
| MCP server | `mcp/` — agents call it before recommending a dependency |

## Run locally

```bash
npm install
npm run build
npm start            # http://localhost:3000
npm run verify       # prints live verdicts for 4 sample packages
```

## MCP — install in Claude / Cursor

The MCP server is in [`mcp/`](./mcp). It exposes one tool,
`check_dependency_freshness`. **Zero account, one paste** — no npm publish,
no clone, no build. Add this to your MCP config:

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

- **Claude Desktop**: edit `claude_desktop_config.json`
  (`~/Library/Application Support/Claude/` on macOS,
  `%APPDATA%\Claude\` on Windows), then restart the app.
- **Cursor**: Settings → MCP, or edit `~/.cursor/mcp.json`.

Requires Node ≥ 20. `npx` fetches
[`github:SolvoHQ/freshdeps-mcp`](https://github.com/SolvoHQ/freshdeps-mcp),
installs deps, and runs it over stdio — verified end-to-end from a clean
machine.

To develop against a local checkout instead:

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

Point it at a non-default backend with `FRESHDEPS_API_BASE`
(defaults to `https://freshdeps.vercel.app`).

## Correctness guarantees

- A failed/timed-out upstream **never** renders as a falsely healthy
  verdict. Missing maintenance signal ⇒ `unknown`, and `partial: true` is
  surfaced both in JSON and visibly on the page.
- Suggested alternatives come from a curated, hand-verified map only —
  never inferred.
- Registry `404` ⇒ clean `found: false` + HTTP 404, not a 500.

## Environment

| Var | Purpose |
|---|---|
| `GH_TOKEN` | GitHub API auth (server-side only; higher rate limit) |
| `GOATCOUNTER_CODE` | server-side fire-and-forget analytics code |
| `NEXT_PUBLIC_GOATCOUNTER_CODE` | client pixel code (SEO pages) |

All analytics is wired from day one; unset vars degrade silently.

## Embeddable badge

```md
[![freshdeps](https://freshdeps.vercel.app/badge/npm/node-sass.svg)](https://freshdeps.vercel.app/npm/node-sass?ref=badge)
```

The badge reads the same hand-verified migration corpus as the rest of
freshdeps, warning a repo's visitors before they install a dead dependency.

## Scope (MVP boundary)

npm + PyPI only. No auth, no DB, no payments, no CI-scanner features.
Stack: Next.js 16 (App Router) · TypeScript strict · Node 20.
