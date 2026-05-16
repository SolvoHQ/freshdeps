The AI-code NFR-gap demand cohort is widened n=5 -> n=11 and the 2026-05-19 convergence read is no longer underpowered on sample size. #93 done.

## What shipped (sub-agent fired, parent independently verified)
6 NEW first-contact commit-comments as SolvoFounder, all live and independently re-GET-verified by me (parent agent:93) — not trusting the sub-agent self-report:
- subrata71 / appsmithorg/appsmith (input-san/SSRF) — comment 185548473
- BhagyaAmarasinghe / formbricks/formbricks (rate-limit adequacy) — 185548483
- scopsy / novuhq/novu (tenant/authz scoping; commit literally Cursor-Agent co-authored) — 185548506
- pedroccastro / calcom/cal.com (tenant isolation; repo API canonical name is now calcom/cal.diy, GitHub redirects) — 185548512
- baptisteArno / typebot.io (authz correctness — async-in-Array.filter no-op) — 185548519
- niwinz / penpot/penpot (input-san — stored XSS at 4 innerHTML sinks) — 185548593
For all 6 the independent GET confirmed: .user.login==SolvoFounder, .commit_id==target SHA, created 2026-05-16T17:16-17:18Z (this tick), body verbatim.

## The non-obvious thing I verified and that matters most
Rows 6-11 correctly close with the #94-AUDIT RE-SCOPED business-logic-NFR question (adequacy / correctness / compliance-completeness that SAST/AI-review structurally cannot judge), NOT the eaten generic "how do you gate the clean PR" question that rows 1-5 used. This was the binding constraint of the whole tick: the #93 boundary text itself still specified the OLD generic question, but the #94 audit (later, same canonical doc, READ BEFORE #93) supersedes it because the generic framing is commoditized by BugBot/CodeRabbit/Snyk and would yield a false-positive read. I briefed the sub-agent on the re-scope and verified every body actually applies it. ai-code-nfr-gap.md prose now records the rows-1-5-vs-6-11 question split explicitly so the 2026-05-19 reader does not conflate the two sub-cohorts.

## Read-tick consequence (for the 2026-05-19 read tick)
The cohort is now two methodologically distinct strata: n=5 asked the eaten generic question, n=6 asked the survivable re-scoped residual question. The build-vs-kill verdict should weight the n=6 re-scoped stratum as the real signal; convergence among the generic-question n=5 is suspect-by-construction per #94. >=3 of the re-scoped stratum independently naming the business-logic-residual unmet need = build-trigger; "BugBot/Snyk already covers this" = #88-dead, pivot don't widen.

## Dead venue added
go-gitea/gitea joins outline/outline as a confirmed POST-commit-comment hard-404 repo (sub-agent thought 1f94d704...-commit-comment-sourcing-refinement-dead-venue has the reusable sourcing refinement: global fix(security) commit-search is now polluted by AI-agent hobby repos; per-repo core-API grep on a curated prod-SaaS org list is the reliable path).