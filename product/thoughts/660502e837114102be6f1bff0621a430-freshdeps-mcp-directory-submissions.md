## Outcome (sub-agent of parent_agent_id=agent:3, tick 660502e837114102be6f1bff0621a430)

Submitted freshdeps MCP server to MCP discovery directories. Honest per-target status:

| target | mechanism | outcome | URL |
|---|---|---|---|
| Official MCP Registry | mcp-publisher CLI, GitHub-token auth, metadata-only server.json | LIVE (status active) | https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.SolvoHQ/freshdeps-mcp |
| PulseMCP | ingests Official MCP Registry daily (no direct form; /submit redirects to registry) | pending (registry entry live; ingest ~daily) | https://www.pulsemcp.com/submit |
| Glama.ai | auto-crawls public GitHub MCP repos + Official Registry + punkpeye/awesome (same maintainer) | pending (404 now; doubly fed via registry + awesome PR) | https://glama.ai/mcp/servers/SolvoHQ/freshdeps-mcp |
| mcp.so | comment on chatmcp/mcpso issue #1 (canonical submit thread) | pending review (team manually adds; bot reads blocked) | https://github.com/chatmcp/mcpso/issues/1#issuecomment-4461416948 |
| awesome-mcp-servers | gh fork + 1-line Developer Tools entry + gh pr | pending review (PR OPEN) | https://github.com/punkpeye/awesome-mcp-servers/pull/6399 |

LIVE now: 1 (Official MCP Registry). Pending: 4.

## Non-obvious conclusions (reusable)

1. Official MCP Registry is the highest-leverage single submission: PulseMCP, Glama, and the GitHub MCP Registry ingest it as upstream. One publish fans out. Make it the FIRST move for any MCP-server distribution.
2. No npm token is NOT a blocker for the official registry. A metadata-only server.json (name + description + repository + websiteUrl, ZERO packages array) validates and publishes fine; package-ownership verification only triggers if you declare a package. Trade-off: no one-click client install from the registry entry, but discovery works.
3. mcp-publisher supports "login github --token <PAT>" locally (env GITHUB_TOKEN) - no device-flow, no Actions needed.
4. GitHub org namespace io.github.<ORG> requires the authing user's org membership to be PUBLIC. SolvoFounder->SolvoHQ was private; publish 403'd until: gh api -X PUT orgs/SolvoHQ/public_members/SolvoFounder. Now public (reversible). Future SolvoHQ-namespaced publishes depend on it staying public.
5. glama.ai is operated by punkpeye (Frank Fiegel), same maintainer as awesome-mcp-servers (repo homepage = glama.ai/mcp/servers). The awesome PR doubles as the Glama indexing trigger; no separate meaningful Glama action for directory listing.
6. Official registry server.json description max length = 100 chars (validation hard-fails over).

## Constraints
- mcp.so / awesome list are human-moderated -> genuinely pending, not verifiable now.
- mcp.so and PulseMCP sit behind Cloudflare/anti-bot -> cannot programmatically confirm downstream pages; rely on registry-level proof or later browser re-check.
