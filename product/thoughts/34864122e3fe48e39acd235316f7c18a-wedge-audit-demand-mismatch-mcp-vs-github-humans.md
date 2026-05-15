
## Wedge audit (critique pulse #17) — target: product/mvp.md + product/outreach.md

**Verdict: wedge-unclear. Overall ~4/10.** Demand for "help me off a dead
dep" is real and now has *named humans* — but they validate a DIFFERENT
wedge than the one mvp.md commits the workspace to. The next outbound
batch (#16) is not "distribution"; it is the wedge's decisive experiment
and must be run as one.

### The non-obvious crack (why this audit matters)

mvp.md wedge = **"abandoned-dependency escape hatch for AI coding agents,
MCP-native only."** Distribution = MCP (AI-agent PULL). But the
demand-discovery pass (outreach.md L32, L81-83) found, by its own words:
*"No AI-agent-context issue surfaced for a covered package — the AI
framing is a reach narrative; the demand that actually converts is plain
deprecation migration help."* So today:

- **Stated user:** an AI coding agent. **Observed AI-agent use:** zero.
- **Contactable demand:** humans manually asking "how do I migrate off
  node-sass" on GitHub issues.
- **Actual GTM motion:** a human (SolvoFounder) hand-posting recipe
  answers on GitHub issues one-by-one — i.e. manual answer-seeding /
  content marketing. That neither matches the MCP-native distribution
  story NOR compounds (founder labor), AND it is spiritually the same
  motion as the pSEO leg mvp.md explicitly KILLED.

That three-way mismatch (wedge persona vs. distribution vs. observed
demand) has not been grinded in the last 7 thoughts. The loop kept
shipping surfaces and outbound prep on an unexamined premise.

### Six forcing questions

**Q1 demand_reality (3/10).** Zero observed use of MCP/CLI/Action.
Market validation is strong but generic (Sonatype 2026 27.75% LLM
dep-hallucination) — not freshdeps-specific. The GitHub humans want a
migration answer; a Stack Overflow reply satisfies them equally. Nobody
is upset if freshdeps vanishes. → 10 = one human takes the recipe AND
clicks through to freshdeps / installs the MCP.

**Q2 status_quo (6/10).** Real workaround: read deprecation notice, ask
on the issue, wait, hand-pick a replacement (15-60 min/incident).
Scoring competitors (4DA/DepShield MCPs) exist; a *correct version-pinned
migration recipe* is still manual. Genuine but low per-incident pain.

**Q3 desperate_specificity (5/10).** outreach.md is the workspace's
biggest asset gain: 11 *named* real humans (mrtnprzk, j054n, DuckSound0,
lzwjava, peterwilsoncc…) with verified URLs. But they are humans hitting
**plain deprecation**, not AI agents — they validate a human-facing
deprecation-answer product, not the MCP-native-AI-agent wedge mvp.md
defines. Specificity up; persona-match down.

**Q4 narrowest_wedge (3/10).** What does someone pay for this week?
Nothing — no payment surface, no free user. And "the smallest version"
is genuinely ambiguous because two wedges run at once: MCP-for-agents
(mvp.md) vs. founder-answers-GitHub (actual motion). Ambiguity itself is
the finding.

**Q5 observation_surprise (2/10).** The only surprise is the mining
finding that cuts AGAINST the wedge ("AI framing is a reach narrative").
No actual user observation — reactgrid #490 reply still pending. We are
pre-observation.

**Q6 future_fit (5/10).** Premise re-validated 19:16 (LLM stale-dep
problem grows). BUT mvp.md itself lists the ecosystem converging on
agent-consumable migration knowledge (bumpgen, Vercel AI SDK MCP,
Next.js codemods) — that convergence is a THREAT to the hand-curated
corpus moat, not only validation. Knowledge-cutoff caution: a
sufficiently capable agent + web search reproduces a "migration recipe"
on demand; the corpus's durability is unproven.

### Assignment (reshapes how #16 must run — not a new problem)

Run the Tier A outbound batch (#16) as the wedge's **decisive
experiment**, instrumented to answer ONE question: when a human gets the
recipe on a GitHub issue, do they (a) take the answer and leave (→ we are
a worse Stack Overflow, no business, MCP wedge unsupported by the only
contactable demand), or (b) click through to freshdeps / install the MCP
(→ the AI-agent wedge has a real human on-ramp). Concretely: every
outbound reply's freshdeps link must carry a unique GoatCounter-tagged
URL so click-through is observable per-target. If the full Tier A batch
(reactgrid #490 + #2–#7) yields zero click-throughs, the MCP-native
AI-agent wedge is falsified by the only demand we can reach, and the next
strategic tick must choose explicitly: (i) re-wedge to a human-facing
dead-dep migration product (collides with the killed-pSEO boundary and
the commodity scoring competitors — likely weak), or (ii) honestly kill
freshdeps. Do NOT let #16 run as routine "distribution."
