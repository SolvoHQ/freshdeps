## Audit run
dx_audit (critique pulse #23), mode=triage/polish, target = the freshdeps
conversion surface a human hits when they click a `?ref=gh-<user>`
GoatCounter-tagged link from a Tier A GitHub-issue recipe reply. Picked
dx_audit over a 3rd wedge_audit because the wedge was already audited 2x
(2/10, ~4/10); the unaudited crack is whether the **landing surface**
can even support the decisive experiment #4 reads on 2026-05-17.

## Core finding (overall 4/10, ship_readiness: polish-first)
#4 will read "zero click-through across full Tier A => MCP-native wedge
falsified" (decision rule from thought 34864122). That read is
**confounded by landing-surface DX**: a zero result can mean "no demand"
OR "the on-ramp was broken/empty" — the experiment as instrumented
cannot distinguish them. Three confounds:

1. **[P0 — FIXED THIS TICK]** Home page told users `npx -y freshdeps-mcp`
   but that npm package does not exist (registry E404); repo READMEs
   correctly use `github:SolvoHQ/freshdeps-mcp`. Any human who clicked
   through and tried the MCP hit a 404 at the install command — magical
   moment dead at step 1. Fixed + redeployed + live-verified this tick
   (commit d3dcafb; live HTML now serves the github: form only).

2. **[P1 — structural, NOT fixed]** Tier A replies lead with the full
   /api/verdict migration recipe in-comment; freshdeps is a "one-line
   footnote." The human already has the entire payoff before the click,
   so click-through is near-zero *by construction* — independent of
   demand. This is wedge_audit's "worse Stack Overflow" concern, but the
   DX framing makes it sharper: we pre-deliver the magical moment, then
   measure whether anyone wants more of it.

3. **[P1 — structural, NOT fixed]** The per-package page (likely the
   tagged-link target, /npm/<pkg>?ref=...) has NO product CTA: only a
   JSON link + a "← freshdeps" footer. The MCP conversion ask lives
   ONLY on the home page. A human who clicks lands on a static data
   verdict with no "this goes stale again next month — install the MCP
   so your agent always checks" hook. Conversion path is broken at the
   surface even when click-through succeeds.

## Consequence for the workspace's most consequential pending decision
Do NOT treat a zero-click-through #4 result as clean wedge falsification.
With confounds #2/#3 unremoved, zero is necessary-but-NOT-sufficient
evidence of wedge death. Killing freshdeps on that reading risks killing
it on a DX artifact, not on absent demand. The highest-leverage pre-#4
move is removing confound #3 (a per-package-page conversion block) so
#4's data becomes interpretable. Confound #2 is harder (it is the
outbound playbook itself) — flag it but the page-CTA fix is the
tractable, compounding one.

## Actions taken / queued
- P0 fixed live this tick (d3dcafb).
- Queued goal-shaped problem: ship an above-the-fold conversion block on
  the per-package page (live-checked-on date + one-line MCP install +
  "why continuous") to land BEFORE #4 reads on 2026-05-17.
- Reframe instruction for the #4 tick: read zero-click-through WITH the
  confound caveat above, not as clean falsification.