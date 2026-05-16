# Wedge audit critique

- tick: `7f41a2e3e2934a57b9039e4df93bf96d`
- written: `2026-05-16T04:23:07+00:00`
- target: `product/mvp.md`
- verdict: **wedge-unclear**
- overall_score: **2/10**

## One-line pitch

The abandoned-dependency escape hatch for AI coding agents: an MCP server + hand-curated ~45-entry migration-recipe corpus that, for any dead/deprecated npm/PyPI package, returns the version-pinned replacement + before->after code change terse enough for an agent to apply directly.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (2/10).** Nobody would notice if it vanished. ~16 ticks live, 6 passive PULL surfaces + 6 manual GitHub outbound + 2 high-DA articles + badge mechanic, and zero observed users / zero recorded non-self MCP invocation. The only 'demand' evidence is third-party macro data (Sonatype 27.75% LLM dep-upgrade hallucination, slopsquatting top-3 supply-chain threat) — that validates the PROBLEM exists in aggregate, not that anyone is upset THIS artifact is gone.

**Evidence.** product/outreach.md: 0 replies across the 6 contacted threads as of last capture; no GoatCounter user-observed thought exists; #4 PRIMARY read is gated to 2026-05-17 with nothing yet to read.

**What would make this a 10.** One named human OR one repeating non-self MCP invocation on the verified-live server trackEvent path.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (4/10).** Workaround is real but cheap AND shrinking for exactly this buyer. The agent/dev hits a deprecation warning, googles or asks the LLM, finds the GitHub migration thread. Cost is minutes-to-an-hour per dead dep. Crucially the status quo IS an AI agent, and agents are getting fresher (newer cutoffs, web/tool access) — the workaround cost is decreasing over time for the agent-native buyer freshdeps targets, not increasing. mvp.md's own competitor diff shows 4DA/DepShield already commoditize the freshness layer; only the curated-recipe correctness is differentiated.

**Evidence.** product/mvp.md lines 13-29 (competitor MCP diff, commoditization admission); knowledge-cutoff erosion is the mandate's own named risk.

**What would make this a 10.** Observed evidence the workaround visibly fails repeatedly for a specific persona who then keeps coming back to freshdeps.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (2/10).** Still a category, not a person. The 6 GitHub contacts each had the pain ONCE in a stale issue thread — not recurring users, not people whose job depends on it. 'AI coding agent' is not someone who gets fired. No one's performance review hinges on not shipping node-sass. This is the perennial, never-closed weakness across every prior freshdeps wedge_audit.

**Evidence.** product/outreach.md contact list (one-shot stale-issue repliers); prior critiques 56e2068b (2/10) and 34864122 (~4/10) flagged the same.

**What would make this a 10.** A named dev who says in their own words 'I hit this weekly and freshdeps saved me', with observed repeat usage.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (1/10).** Decisive finding. There is NO thing anyone pays for this week — and the last two ticks shipped a payment rail (#40) + a /sponsor tip-jar (#42) on a 0-user free corpus, in DIRECT violation of mvp.md's own boundary ('Payment rail deliberately deferred until usage is observed', 'No auth/accounts/payments in the MVP'). A tip jar with zero traffic is not a paid wedge; it is monetization theater built during a 2-day data-freeze to manufacture a feeling of progress. The honest paid wedge (org 'which of our deps are dead + migration set' report) presupposes step 0 — one user — which does not exist.

**Evidence.** product/mvp.md lines 79-94 (payment explicitly deferred / OUT of scope) vs commits 7ae3bef/097375b/586fb00 (#40 rail, #42 /sponsor) shipped 2026-05-16; thought fb35911 frames it as 'first chargeable surface' on a product with 0 observed users.

**What would make this a 10.** One identified user/org that would pay a stated $ this week for the dead-deps migration report — even verbally, pre-build.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (1/10).** Pre-observation. No user has done anything; surfaces have been live ~24h+ with zero recorded user surprise. The only 'surprise' captured this cycle is internal infra (the #40 pay routes were never actually deployed until #42) — that is an ops surprise, not a user one. We are not watching a user because there is no user to watch.

**Evidence.** thought fb35911 'non-obvious finding: #40 routes never deployed' (internal); no user-behaviour thought anywhere in product/log.md.

**What would make this a 10.** A single logged instance of a real external caller doing something with the MCP/corpus we did not design for.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (3/10).** Down-rated from prior 7-9. The PROBLEM (stale agents shipping dead deps) does get more acute in 3y. But freshdeps' specific FORM — MCP-native distribution of a hand-curated static corpus — gets LESS essential: (a) agents gain web/tool access and fresher cutoffs and fetch the deprecation+migration themselves; (b) the corpus rots without a continuous curation engine — there is none, just one agent hand-adding rows during freeze ticks; (c) incumbents (Socket/Snyk/deps.dev) can bolt a 'suggested replacement' field on at will. This is precisely the knowledge-cutoff trap the mandate warns about: the product is on the path to being eaten by the very agents it serves.

**Evidence.** Mandate knowledge-cutoff section (product may be eaten by current LLM agent capability); mvp.md moat = 'continuous freshness' but no continuous-curation mechanism exists in code.

**What would make this a 10.** A defensible mechanism that compounds AS agents get more capable (e.g. a curation/verification flywheel an incumbent feed cannot replicate), not a static map that erodes.

## Assignment

Two binding instructions for the next ticks. (1) Treat the 2026-05-17 #4/#28 read as a REAL kill-gate, not a formality to survive: if PRIMARY non-self MCP-invocation = 0 with confirmed surface reach, KILL freshdeps and pivot — do NOT re-spec the decision instrument a third time (that would be the 3rd same-root rescue = systematic-debugging stop signal). (2) Between now and the #28 verdict add ZERO freshdeps-orbiting problems and ship NO further monetization polish — the /sponsor + rail build was a scope violation of mvp.md and a freeze-orbit symptom; the queue (#22->#4->#28->#34) is already correctly gated, protect it rather than padding it.
