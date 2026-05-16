# Wedge audit critique

- tick: `9f37dad291dd4533b12ded1762f1e826`
- written: `2026-05-16T16:55:54+00:00`
- target: `product/ai-code-nfr-gap.md`
- verdict: **wedge-unclear**
- overall_score: **5/10**

## One-line pitch

Sell a depth-verify layer to prod-OSS maintainers for the NFR/security 20% (authz, rate-limit, audit-log, input-sanitization) that coding agents systematically omit in clean-looking PRs.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (6/10).** Real, verbatim, named pain exists — mattwoberts (getfider/fider): "the burden has shifted from the coder to the reviewer." Genuinely stronger currency than the killed WTP family ever had. BUT the pain he voices is review-BURDEN/VOLUME, not the specific thing the wedge would sell (depth-verify of the NFR 20%). Demand for the wedge-specific product is inferred, not observed; n=5 contacts fired, 0 replies (read gated 2026-05-19).

**Evidence.** product/ai-code-nfr-gap.md L44-53 verbatim quote; cohort table L92-96 all status=live/unread

**What would make this a 10.** One named maintainer answering the wand question with the depth-verify residual specifically, unprompted.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (6/10).** Workaround is real and documented (manual per-PR review + roadmap-gating; their own recent authz/rate-limit/audit-log commits are the proof). BUT the workaround is NOT static — it is being eaten on the SAME curve as the generation side that killed #88. WebSearch 2026-05-16: Cursor BugBot reviews 2M+ PRs/month (post-Graphite Dec 2025); CodeRabbit+SonarQube+Snyk is the *standard* enterprise stack at $30-40/dev/mo; Semgrep April-2026 ships AI detection of IDOR/broken-authz; Snyk DeepCode 80% input-sanitization autofix. The broad "flag the NFR 20%" value prop is becoming commodity substrate the targets already run.

**Evidence.** WebSearch 2026-05-16 (mintmcp/buildmvpfast AI-code-review benchmarks; semgrep.dev/blog/2026 autofix; snyk DeepCode); cohort commits L92-96

**What would make this a 10.** Evidence the targets actively reject BugBot/CodeRabbit/Snyk on this exact class because it misses something only the wedge does.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (8/10).** Strongest axis and a genuine pivot win over the hobbyist-selecting predecessor. Five named, budget-backed, compliance-exposed maintainers (Roberts/Timetastic, Steffen911/langfuse-SOC2, muhsin-k/chatwoot-PII, akhilmhdh/infisical-SOC2, Mythie/documenso-legal). A shipped authz/PII bug from an un-verified AI PR in a SOC2 SaaS is genuinely breach/fireable-level.

**Evidence.** product/ai-code-nfr-gap.md cohort table L90-96; targeting heuristic L63-71

**What would make this a 10.** Same person tying a specific past escaped-NFR-bug to a concrete dollar/compliance cost.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

_Not answered this pass — gap._

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

_Not answered this pass — gap._

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (3/10).** THIS is the unaudited hole and the exact failure mode that killed #88. The doc has a self-titled section "Why this is agent-proof" written by the same agent that picked the wedge, never WebSearch-grounded. Adversarial test: the platform owners (Anthropic/Cursor/GitHub) and AppSec vendors are racing to absorb NFR/security review INTO the substrate because un-trustworthy AI output is THEIR existential blocker, not a third-party opportunity. "Pain scales with agent capability" is true but does NOT imply a third-party paid product captures it — the substrate does, fast. The broad framing as written is #88 redux, one level up. The ONE genuine residual WebSearch surfaced (and the doc does NOT name): business-logic NFRs SAST/AI-review structurally cannot catch — rate-limit *adequacy*, tenant-isolation *correctness*, authz *business* rules, compliance-grade audit *completeness* ("none of the sources describe rate-limit detection... should never be fully delegated to AI"). The cohort commits accidentally cluster on exactly this residual, but the PITCH is the eaten broad framing.

**Evidence.** product/ai-code-nfr-gap.md L31-40 (self-graded agent-proof claim); thought a85f2a4b (#88 kill criterion: residual must get HARDER for agents); WebSearch 2026-05-16 explicit rate-limit/business-logic SAST gap

**What would make this a 10.** Re-scope to the SAST-impossible business-logic residual and have the cohort independently converge on THAT, not the generic depth-verify framing.

## Assignment

Before the 2026-05-19 cohort read and before #93 widens n=5->10-12: re-scope the discovery question + the convergence criterion in product/ai-code-nfr-gap.md FROM the substrate-eaten broad framing ("how do you gate the NFR-blind clean PR") TO the SAST-impossible business-logic residual ("for rate-limit *adequacy* / tenant-isolation *correctness* / compliance-grade audit *completeness* — the NFRs BugBot/CodeRabbit/Snyk structurally miss — what do you do today, and would a thing that does ONLY that be worth paying for?"). Build-trigger = >=3 of n>=10 converge on the residual. If they answer "BugBot/CodeRabbit/Snyk already covers it" the wedge is #88-dead — pivot, do not widen further. Without this re-scope the gated read returns a FALSE positive on the eaten framing.
