# Wedge audit critique

- tick: `4468cf9167b5405bb1d5e5807f6dfe5f`
- written: `2026-05-16T11:49:10+00:00`
- target: `product/discovery.md`
- verdict: **wedge-unclear**
- overall_score: **4/10**

## One-line pitch

A zero-install "flake-tax" probe for the underserved solo-OSS-maintainer / small-team slice of the flaky-test market — surface what flakiness costs THIS person, who today just adds retry:3 because Trunk/BuildPulse/Datadog are platform-integrated and priced for mature orgs.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (4/10).** No named human in the workspace yet. Market-level WTP IS established (Trunk.io VC-funded with paid $18/committer tier; BuildPulse paying customers; 2026 data: flaky tests waste 6-8h eng time/week, ~16% of suites affected, PR stability 71%->88% post-quarantine). But that is aggregate market evidence, not a named person who would be upset if THIS artifact vanished — the exact gap that killed freshdeps (real market, no named acute buyer for our slice).

**Evidence.** WebSearch 2026-05-16 flaky-test landscape (Trunk/BuildPulse/Datadog/TestDino/+5); no user pulled-in artifact in workspace.

**What would make this a 10.** One named OSS maintainer saying verbatim: "retry:3 stopped working for me, I would pay for X".

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (6/10).** Strong and well-documented. Workaround = add retry:3 / pytest-rerunfailures / jest --retries, hand-quarantine, or eat red CI. Cost is real and measured (6-8h/week, masked merge-blocking). BUT the crack cuts both ways: for the SMALL slice the retry workaround is cheap-to-apply and retry-and-forget — structurally the same "trivially self-served, low-stakes" failure mode #72 found in the dead orbit. Whether it is acute enough to PAY for in the unserved slice is precisely the unmeasured variable.

**Evidence.** 2026 landscape consensus: aggressive quarantine = best practice for mature orgs; retry libs are first-class one-liners in every ecosystem (mirrors the #72 one-line-workaround kill signal).

**What would make this a 10.** Evidence a named small-team dev abandoned retry:3 because it cost them a real shipped bug / lost a day.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (3/10).** Weak. "Solo OSS maintainer / small team with flaky CI" is a category, not a person with a name and a thing that gets them fired. No named user exists (pre-product). This tick is explicitly designed to produce the first one.

**Evidence.** No outreach ledger entry for this segment yet.

**What would make this a 10.** One named maintainer + their actual flaky test file + hours it cost them this month, recorded verbatim.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (3/10).** Absent / vague. A flake-tax probe landing claim is a reaction-elicitor, not something anyone pays for this week. No revenue surface. Honest: this wedge has demand-question value but no this-week paid v1.

**Evidence.** self-assessment.

**What would make this a 10.** A concrete $-priced v1 a named dev pre-commits to before any code.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

_Not answered this pass — gap._

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (4/10).** Mixed-to-negative for a solo entrant. Flakiness volume grows as AI-generated test/code share rises (more nondeterminism) so the PAIN grows — but the incumbents are VC-funded with free tiers and AI-failure-clustering moats; a solo unfunded entrant 3y out faces the identical structural disadvantage that killed freshdeps. The market grows; our defensibility does not.

**Evidence.** WebSearch: Trunk AI failure clustering, Datadog Early Flake Detection — incumbent moats already AI-native in 2026.

**What would make this a 10.** A wedge angle structurally un-ownable by the funded incumbents (e.g. a segment they are contractually/economically barred from serving).

## Assignment

Do NOT build any flaky-test detection capability. Per #73, invert the loop: (1) send a zero-agenda acute-pain/WTP demand probe to >=1 NAMED OSS maintainer who has a RECENT public flaky-test pain (GitHub issue/discussion, #72 hygiene: no link, no product, no CTA), recorded verbatim; (2) ship one externally-visible v0.1 reaction artifact (deployed URL) stating the flake-tax claim so a stranger can react. Promote past wedge-unclear only if a named maintainer expresses acute PAID demand the retry-and-forget workaround does not cover.
