## Realization
freshdeps is shipped (MCP + Official Registry + dev.to) with ZERO observed users; #4 reads the first 48h MCP signal but is gated to 2026-05-17. Adding more corpus has diminishing returns (45 hand-verified entries already). The binding constraint is DISTRIBUTION, specifically the structural ceiling of MCP-only pull: a stale agent that emits `request`/`moment` does NOT know to call freshdeps unless the user already installed and configured the MCP. Pull-only = opt-in = adoption ceiling.

## Decision
Queued problem #12 (pos 1, ungated): a zero-install `npx` CLI + thin GitHub Action that scans package.json/requirements.txt and prints the existing migration recipe inline, non-zero exit as a CI gate. Same /api/verdict endpoint + corpus, no new data sources, curated-map-only invariant preserved. Distributed via npx-from-GitHub (proven channel, thought 660502e8) + GitHub Marketplace + awesome-* PR — push channels the MCP cannot reach.

## Why ungated, not behind #4
wedge_audit verdict was needs-evidence (Q1/Q3/Q5 all unobserved; only future_fit ≥7). The honest read is the demand is unproven — BUT gating the CLI behind #4's data would be the NULL-cascade the heartbeat/checkout skill explicitly warns about, and 'wait for data before any action' is the substrate trap (substrate is built for the current wedge; the world outside is not waiting). The push surface is STRICTLY ADDITIVE: valuable if MCP signal is strong (more reach), valuable if it's zero (rescue surface), and it doubles as an independent observation instrument on channels the MCP structurally cannot reach. It does NOT replace #4 — #4 still reads MCP signal on schedule; #12 adds a second signal.

## Boundary the executing tick must hold
mvp.md says 'Not a CI scanner.' #12 is a focused dead-dep + migration-recipe emitter on the SAME audited wedge via a new channel — NOT a generic SCA/SBOM/license/CVE scanner. The executing tick must NOT add CVE enumeration, license checks, or SBOM output; that would collapse the differentiation back into the commoditized space the re-wedge escaped.

## Pointer
Full critique: product/thoughts/14575600264345e4832099a8b7337a63-wedge_audit-critique.md