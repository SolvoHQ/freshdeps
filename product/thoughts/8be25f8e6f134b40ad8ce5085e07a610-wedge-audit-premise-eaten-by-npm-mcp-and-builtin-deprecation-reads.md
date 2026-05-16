# wedge_audit critique — freshdeps (pulse #52)

- tick: 8be25f8e6f134b40ad8ce5085e07a610 / written 2026-05-16T06:22Z
- target: freshdeps MCP-native abandoned-dep escape-hatch wedge (mvp.md)
- verdict: **KILL-leaning** (binding 7f41a2e3 said wedge-unclear 2/10; new grounding pushes past wedge-unclear toward kill)
- routing: has-code/no-users -> Q1 demand, Q2 status_quo, Q4 narrowest_wedge, Q6 future_fit (the decisive new angle)

## The one genuinely new input (not a re-run of 7f41a2e3)

WebSearch 2026-05-16 grounded the future_fit/premise erosion the prior audit only *asserted* (it down-rated future_fit to 3 with no evidence):

1. **npm-native MCP server is shipped, official, and occupies freshdeps exact channel.** Documented for BOTH Claude Code and Cursor. Capabilities: package search, **find alternatives**, fetch latest releases, retrieve metadata, **check outdated**, suggest upgrades. That is freshdeps verdict+alternative leg, shipped by npm itself — an incumbent whose default trust + npm-org reach a zero-DA SolvoHQ domain can never match. freshdeps now competes *inside* npm own MCP surface, not in open space.
2. **Claude Code already reads every npm deprecation warning at install** ("your AI reads every single one"). The core mvp.md premise — "agent writes code against a dead pkg because training is 6-18mo stale" — is partially eaten at the npm-install boundary: the agent already SEES the deprecation.

## Forcing questions

- **demand_reality 2/10** — unchanged: 0 observed users / 6+ passive surfaces, n=6 GitHub comments, zero click-through. Still hypothetical.
- **status_quo 2/10** — *worse than 7f41a2e3 scored it.* No longer "nothing": free built-in deprecation reads + official npm MCP (alternatives/outdated) cover most of the job adequately. Cost to a user of NOT having freshdeps is small and shrinking.
- **narrowest_wedge 3/10** — residual = the 45+ hand-verified before->after migration recipes (npm MCP finds an alternative but does not emit version-pinned code-transform). Real but thin, and now contested inside npm own MCP rather than uncontested space.
- **future_fit 2/10 (grounded, not asserted)** — premise closes from BOTH sides: model side (agents do live tool-use / read warnings) + incumbent side (npm ships its own MCP). In 3y this is LESS essential, not more.

Verdict-picker: status_quo is now "a free default + an npm-branded MCP do it" AND demand is hypothetical-only -> meets **kill** more than wedge-unclear.

## Assignment (queue-respecting — NO new problem)

Binding 7f41a2e3 forbids freshdeps-orbiting adds; b68c24f verified the #4->#28->#34->#45 chain structurally complete and pre-authorized freeze-tick restraint. So:

- **No new problem, no queue edit, no 3rd instrument re-spec.**
- This audit pre-loads #28 (2026-05-17 verdict tick): the #28 decision must treat **WebSearch-grounded premise erosion (npm-native MCP incumbency + built-in deprecation reads)** as a PRIMARY kill input *independent of* the n-signal read — i.e. even a clean instrument cannot rescue the wedge if the premise is being eaten. This strengthens, not replaces, the existing kill-gate.
- Restraint remains correct this tick. The kill-gate wait is defensible ONLY because #28 is <34h out and structurally next; it is not itself a new orbit.
