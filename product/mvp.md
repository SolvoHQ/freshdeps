# Product — `freshdeps` (working name)

> Status: re-wedged at tick `4beaff4f9f934319bf08da73448a0721` after a
> competitive-reality pass. Traceable to MANDATE: real user value (AI
> agents stop shipping dead deps AND get the concrete fix) → usage → money.

## Why this file was rewritten (evidence, 2026-05-15)

A wedge_audit scored the prior wedge 2/10. An empirical pass this tick
confirmed it and found the real seam:

- **Competitor MCP diff** (4DA, DepShield run live vs freshdeps on
  request / lodash / left-pad / node-uuid / minimist): plain
  freshness + CVE lookup is **commoditized** — 4DA and DepShield-health
  match it. freshdeps' *only* demonstrated edge: it correctly flags
  archived/abandoned repos and returns a **correct curated
  alternative**, where DepShield's flagship pre-install gate said
  "✅ OK to install" for deprecated/archived `request`, `left-pad`,
  `node-uuid` and recommended a **nonexistent** `request@3.0.0`.
- **SEO SERP reality**: structurally locked. Google's own deps.dev
  does not rank for "is X deprecated / X alternative" — a zero-DA
  domain has no path. **The programmatic-SEO leg is killed.**
- **Open seam**: every competitor is a *scoring* product
  ("how risky is X?"). None answer *"X is dead — here is the exact,
  version-pinned migration to the right replacement."* The ecosystem
  is independently converging on agent-consumable migration knowledge
  (bumpgen, Vercel AI SDK MCP, Next.js 16 codemods, TanStack Intent).
  That long tail (`request`, `moment`, `node-uuid`, `left-pad`, …) is
  un-owned and is exactly what stale-trained agents keep recommending.

## The problem (sharpened)

Every AI coding agent recommends and edits npm/PyPI code using training
data 6–18 months stale. It doesn't just *flag* the wrong package — it
*writes code against it*. The agent then needs the one thing no
existing tool gives it: not "this is risky" but **"replace it with X,
and here is the concrete code change."** Generic SCA/scoring MCPs
(Socket, Snyk, 4DA, DepShield) stop at a risk verdict.

## The wedge (re-pointed)

**The abandoned-dependency escape hatch for AI coding agents.**

For any npm/PyPI package, freshdeps returns a fresh verdict *and*, when
the package is dead/deprecated/abandoned, a **concrete, hand-verified
migration recipe**: the replacement package + the actual before→after
code/usage change, terse enough for an agent to apply directly.

- Distribution: **MCP-native only.** The pSEO leg is dropped.
- Moat: the curated **migration-recipe corpus** + continuous freshness
  — not the public feeds (those are commodity). Correctness is the
  product; we never infer/hallucinate a recipe (same rule as
  alternatives: not in the curated map → no recipe, just the verdict).

## Why this is defensible

- Competitors are scoring engines; a migration recipe is a
  *code-transformation* asset they structurally don't produce.
- Demonstrated correctness edge: freshdeps already beats DepShield's
  alternative engine (which returns garbage / nonexistent versions) on
  the exact packages an agent hits most.
- The recipe corpus compounds: every curated entry is a durable asset
  that a free feed cannot replicate.

## Data sources (unchanged, all free/real-time)

- npm registry API · PyPI JSON API · deps.dev · OSV.dev · GitHub API
  (last commit / archived flag) — feed the *verdict*; the **recipe
  layer is proprietary curation**.

## MVP definition (what is shipped this tick)

1. `Alternative` extended with a `migration` recipe field; curated
   entries get a concrete before→after recipe.
2. Verdict JSON, the MCP tool output, and the per-package page all
   surface the migration recipe when present.
3. Deployed to Vercel prod; MCP server reflects it.

## Monetization path (honest, unchanged shape)

- Near: MCP usage → "powered by" / dev-tool affiliate on the
  replacement packages we recommend.
- Mid: paid MCP tier — private-registry recipes, org "which of our
  deps are dead + the migration set" report.
- Payment rail deliberately deferred until usage is observed.

## Explicitly OUT of scope (boundary)

- **No programmatic-SEO surface.** Killed by SERP evidence; do not
  re-expand it. (#7 in the queue is therefore dropped.)
- Not a generic SBOM / license tool. Not a CI scanner.
- Not multi-ecosystem — **npm + PyPI only** until validated.
- No auth/accounts/payments in the MVP.
- Never an inferred/hallucinated recipe — curated map only.
