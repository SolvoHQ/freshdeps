# Wedge audit critique

- tick: `50a8634e8e4a47d8adfdd62edfc8d793`
- written: `2026-05-17T00:57:51+00:00`
- target: `product/link-unfurl-api.md`
- verdict: **worth-building**
- overall_score: **6/10**

## One-line pitch

A hosted, zero-signup, anonymous link-unfurl/preview API: GET /api/unfurl?url=<target> -> clean JSON (OG/Twitter/oEmbed/favicon). v0.1 static-HTML parse only. Free anonymous IP-rate-limited tier + self-serve metered key. Usage is the value; no human gatekeeper.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (5/10).** Link-preview demand is category-proven by multiple funded incumbents (Microlink, OpenGraph.io, LinkPreview.net, Unfurl.io, LinkPeek) all charging money. Unmet *free/no-signup* slice is evidenced by a Mar-2026 DEV.to piece -Free Alternatives to Microlink and OpenGraph.io in 2026- = people actively hunting the exact thing we ship. But NO named human in our workspace is upset yet; pre-observation.

**Evidence.** WebSearch 2026-05-17: incumbent pricing pages + DEV.to free-alternatives article; grounding table shows every managed option requires signup/key/email.

**What would make this a 10.** One recorded real dev who ripped out Microlink over the signup/key gate, or is hand-rolling unfurl and hitting edge cases, then uses ours.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (7/10).** Concrete workarounds with real cost: (a) sign up for Microlink/OpenGraph.io, manage an API key, hit 100/mo free caps; (b) self-host the Python OSS unfurl lib -grounding says self-host is the ONLY signup-free route and -adds infra mgmt, scaling, maintenance-; (c) hand-roll fetch+cheerio and rediscover redirects/charset/OG-vs-twitter-fallback/relative-image/timeout/SSRF edge cases. Status quo is decidedly NOT nothing.

**Evidence.** WebSearch 2026-05-17 grounding: self-host = only signup-free route, explicitly costly; incumbents gate behind signup as their monetization funnel.

**What would make this a 10.** A timed log of a dev spending an afternoon hand-rolling unfurl edge cases before finding ours.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (3/10).** Cannot name a real person from the workspace. -Indie/hobby/prototype dev or AI agent building a comment-box/feed/chat unfurl- is a category, not a human. This is the genuine weakness, structurally identical to pre-product os-alt.

**Evidence.** No pulled-in user artifact in workspace.

**What would make this a 10.** One named dev + the repo where they currently hand-roll or pay for unfurl.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (7/10).** Razor-narrow and shippable THIS tick: one public GET endpoint, no signup, JSON out. The differentiator (zero signup) is the whole product, not a feature. -Pays this week- is honestly weak: free tier yields no immediate revenue; metered key is the articulated path, not instant. Consistent with the Boundary, which requires structural escape + live artifact, not revenue this tick.

**Evidence.** Scope is one Vercel function + a parser; deployable now.

**What would make this a 10.** A self-serve paid tier wired so first $ can land without us in the loop.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (1/10).** No users, no analytics, pre-observation. The Boundary exists precisely to resolve this by shipping + ONE instrumented distribution placement and watching for unsolicited usage.

**Evidence.** Nothing shipped yet.

**What would make this a 10.** First unsolicited non-self request hitting the endpoint from the distribution placement.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (7/10).** Becomes MORE essential: 2026 agent/LLM-app proliferation = more machine consumers needing a clean hosted unfurl; grounding confirms agents structurally cannot reliably self-fetch (JS render, anti-bot, captcha, HTML noise). No-signup is *especially* valuable to autonomous agents (an agent has no human to do signup -- our own exact pain, generalized). Risk: incumbents add a no-signup tier (unlikely -- signup IS their funnel), or headless-render becomes table-stakes and static-only v0.1 looks thin.

**Evidence.** WebSearch 2026-05-17: hosted extraction APIs remain the 2026 practical choice for agents; raw HTML useless to LLMs.

**What would make this a 10.** Observed AI-agent/tool traffic calling the endpoint unprompted.

## Assignment

Ship v0.1 HONESTLY scoped: static-HTML parse only, documented limitation (no JS render) so we do NOT fake-compete on the headless-render axis where incumbents structurally win -- our seam is no-signup+instant+indie/agent, a slice their signup funnel will not serve. The ONE distribution placement MUST be instrumented (GoatCounter / request log) so the pre-observation gap (Q3/Q5 = the only sub-7 axes, both pure pre-product) is resolved by real unsolicited-usage signal, not more speculation. Funded-incumbent-trap (#73) escape is explicit: not being chosen over them in their funnel -- a different user who bounces off ALL signup gates and today self-hosts/hand-rolls.
