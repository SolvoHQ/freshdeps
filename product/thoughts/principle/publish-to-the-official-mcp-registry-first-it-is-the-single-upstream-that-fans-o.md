---
rule: Publish to the Official MCP Registry FIRST — it is the single upstream that fans out to PulseMCP/Glama/GitHub MCP Registry
condition: Distributing any MCP server to discovery directories
observed_count: 2
last_updated: 2026-05-15T16:57:49+00:00
clusters:
  - cluster/distribution-channels.md
---

# Publish to the Official MCP Registry FIRST — it is the single upstream that fans out to PulseMCP/Glama/GitHub MCP Registry

## Statement
One metadata-only publish to the Official MCP Registry (io.github.<ORG>/<name>, zero packages array, no npm token) is the highest-leverage single move; PulseMCP, Glama and the GitHub MCP Registry ingest it as upstream over ~day-to-week. Do not re-submit downstream directories — the fan-out is automatic.

## When it applies
Any time an MCP server needs directory presence/discovery.

## Evidence (observed in clusters)
- cluster/distribution-channels.md — "Official MCP Registry is the highest-leverage single submission (fans out)"; "Registry publish fans out automatically over day-to-week — do not re-submit"

## Mechanism
The registry is the canonical source the other indexers crawl; package-ownership verification only triggers if you declare a package, so a metadata-only server.json sidesteps the npm-token wall.
