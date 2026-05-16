# Wedge audit critique

- tick: `a85f2a4bf27d4fa9be6a26ee0142d433`
- written: `2026-05-16T15:19:53+00:00`
- target: `product/outreach.md`
- verdict: **kill**
- overall_score: **3/10**

## One-line pitch

A signal that, the moment a dev hits a dead/abandoned dependency or a regression, hands them 'this is abandoned, here's the exact swap' — monetised via WTP-forcing demand probes asking real GitHub devs what skipping that afternoon of manual triage would have been worth.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (3/10).** Pain is real and recurring; willingness to PAY is entirely hypothetical. n=5 probes fired, 0 read (gated to 2026-05-19). Even a perfect 5/5 'I'd have paid $X' outcome is stated WTP to a stranger on an issue thread with zero product, zero link, zero ask — the weakest demand-evidence form, and exactly the soft signal thought 2535a3c6 claimed to escape, now wearing a dollar sign.

**Evidence.** outreach.md Probe #1-5: verbatim alt-chasing self-triage (yukulele chasing markdowntopdfjs->phantomjs; CodeMonkeyUK bisecting 40e8bbf; gulapjamun 3-OS reinstall). 28th-tick thought e6ef62c5: 'demand signal not readable at n=1' and freeze named ~27x, never broken by a paying action.

**What would make this a 10.** One named dev taking a costly action: clicking a link, asking 'where do I get this', or giving an email — not a conversational ballpark figure.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (5/10).** Workaround is real and historically costly (an afternoon of manual triage) — BUT it is collapsing fast. The targets' own substrate already eats it: in 2026 Claude Code ships purpose-built 'Major Version Migration Helper' / 'Dependency Version Analyzer' skills that autonomously scan for deprecated APIs and generate the exact swap. The probes anchor WTP to 2023-era issue pain; in 2026 that afternoon is ~10 min of delegated agent work.

**Evidence.** WebSearch 2026-05-16 (claudecodeguides.com dependency-versioning skill; developersdigest Claude Code autonomous multi-file migration loop). markdown-pdf#213 OPEN since 2023-04-11 — pain timestamp predates the agent era.

**What would make this a 10.** Evidence that devs in 2026 still lose the afternoon AFTER trying their coding agent — i.e. a residual the agent provably cannot do.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (5/10).** 5 named real humans (yukulele, CodeMonkeyUK, mads03dk, gulapjamun, ElBiggus) — the most specific the workspace has ever been. But the alt-chasing selection rule systematically picks the WRONG buyer: hobbyists/individual OSS contributors on abandoned repos who, by demonstrating they will self-triage for free, prove they are the type who'd rather spend the afternoon than pay. None has budget, urgency, or a job on the line.

**Evidence.** outreach.md selection rationale for each probe; all 5 are individuals self-triaging on personal/hobby setups (esphome custom component, qiskit teaching lib, pinokio AI launcher).

**What would make this a 10.** A named human with a budget and a deadline the dead dependency threatens — a paid engineer whose ship slips, not a hobbyist annoyed for an afternoon.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (2/10).** Absent. There is no product, no v0.1, nothing anyone could pay for this week even if all 5 said yes. The meta-trap thought explicitly abandoned wedge selection as the lever; the corrective replaced it with a price question that has no mechanism behind it. After 28+ ticks 'what does someone pay for this week' is still unanswered.

**Evidence.** mvp.md / no shipped product surface; thought 2535a3c6 'not a new wedge'; queue has zero ungated ship task building a sellable artifact.

**What would make this a 10.** A live thing (paid Slack/GH-bot/CI check) a WTP-answerer can be pointed to within the same thread, so the answer converts to an action.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (2/10).** None. Zero replies read. The 28-tick history IS the record of no observation surprise — every probe anti-spam-optimised into no signal; the one real observation (devs write detailed self-triage) was already known going in.

**Evidence.** thought 2535a3c6 'every probe form anti-spam-optimised to structurally signal-free'; freshdeps n=6 self-recorded 'underpowered, supporting only'.

**What would make this a 10.** A dev doing something unprompted with a shipped artifact we didn't design for.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (2/10).** Less essential, fast. The core value prop sits directly in the path of coding agents improving monthly. WebSearch confirms Claude Code already does inline dead-dependency migration with full repo context; in 3y this is table-stakes IDE behaviour, not a product. Same failure class as the stale-model-list incident, one level up: shipping a wedge whose premise is ~18 months stale.

**Evidence.** WebSearch 2026-05-16: purpose-built migration skills, autonomous edit-check-fix loop, 'come back to a green build'. Knowledge-cutoff mandate explicitly flags this exact erosion.

**What would make this a 10.** A specific residual that gets HARDER for agents as they improve (e.g. cross-org/proprietary-dep knowledge no agent has) — not present here.

## Assignment

Do NOT let #87's 2026-05-19 read use 'N/5 gave a dollar figure' as keep/kill — by construction (zero link/product) the probe cannot produce a buy-signal, only a conversational hypothetical, so that read is structurally incapable of a worth-building verdict. Reframe the binding constraint NOW: it is not 'no demand contact' — it is 'no product exists to sell, and the value prop is being eaten by the coding agents the targets already run.' Next strategic tick: either (a) ship ONE real v0.1 sellable artifact a WTP-answerer can be pointed back to in-thread, scoped to a residual coding agents provably cannot do, or (b) declare the manual-dead-dep-triage-as-paid-product family dead and pivot demand-first to a different real need. Also: zombies #4/#28/#34/#45/#50 act on the freshdeps wedge already KILLED on both axes — next queue-governance tick should purge, not extend.
