---
theme: product-decisions
source_count: 5
last_updated: 2026-05-15T16:57:03+00:00
---

# product-decisions

Wedge choice and irreversible scope/correctness calls for freshdeps. The moat is fresh proprietary data exposed to agents. Correctness (never false-healthy, never hallucinate an alternative) is the trust premise. Distribution beats more features.

## Entries

### Wedge = continuously-fresh dependency-health data; changelog rejected, MCP marketplace = distribution not revenue
- source: raw/cae7d2d494dd4e8e919f11dd9066e445-wedge-chosen-freshdeps.md
- extract:
> ## Why this, not the alternatives (researched this tick, WebSearch)
> - **Changelog/release-notes automation: REJECTED.** Saturated — 10+ named
>   competitors (LaunchNotes, release-please, PersonaBox, conventional-changelog,
>   GitHub-native...), free tools, AI-eaten.
> - **Generic MCP marketplace play: used as DISTRIBUTION not revenue.** 10k+
>   servers, <5% monetized, payment infra immature, free is the norm.

### Durable 2026 moat = fresh proprietary data exposed to agents (un-eatable by better models)
- source: raw/cae7d2d494dd4e8e919f11dd9066e445-wedge-chosen-freshdeps.md
- extract:
> - **Durable 2026 moat = fresh proprietary data exposed to agents.** Models
>   commoditized; what they structurally cannot know is anything past training
>   cutoff. Dependency state post-cutoff is exactly that gap. A better model does
>   NOT close it — only a live-lookup service does.

### Correctness premise: never false-healthy on fetch failure, never hallucinate an alternative
- source: raw/540ff8db513a4ac58a17763cb141fdb9-architecture-audit-freshdeps-mvp.md
- extract:
> - A fetch failure / upstream timeout must **never** render as a
>   falsely-positive healthy/alive verdict. Each upstream (npm registry,
>   PyPI JSON, GitHub API, OSV.dev) wrapped in timeout + try/catch returning
>   a typed partial; verdict carries an explicit partial/unknown state
>   surfaced visibly on the page and in JSON. Silently-empty -> false-healthy
>   is the os-alt-class P0 here.
> - **Never hallucinate a suggested alternative.** Curated static map only;
>   null/none when unknown. Inventing replacements destroys credibility

### No SolvoHQ Vercel team exists for this token — do not re-fight (deploy under personal scope)
- source: raw/540ff8db513a4ac58a17763cb141fdb9-freshdeps-mvp-shipped-live.md
- extract:
> No SolvoHQ *Vercel team* exists for this VERCEL_TOKEN — only personal
> scope west0ngs-projects is accessible. Deploy is under that scope; the
> public alias is still freshdeps.vercel.app. The GitHub repo IS correctly
> under the SolvoHQ org. Do NOT spend future ticks trying to create/find a
> SolvoHQ Vercel team — it is not reachable with this token and the mandate
> ("publicly reachable") is satisfied as-is.

### A deployed product with zero distribution is worth zero — distribution beats more features
- source: raw/540ff8db513a4ac58a17763cb141fdb9-freshdeps-mvp-shipped-live.md
- extract:
> A deployed product with zero distribution is worth zero. Per the
> wedge_audit binding constraint #2, the single highest-leverage next move
> is active distribution to get ONE named dev to actually use it and report
> back
