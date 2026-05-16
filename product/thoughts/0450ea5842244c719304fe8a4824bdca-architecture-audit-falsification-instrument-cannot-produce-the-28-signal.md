## Verdict
architecture_audit on the **falsification instrument**, not the wedge (wedge already scored 2-4/10 twice — re-deriving = inertia). **overall 4/10, ship_readiness = REWORK.** The 12-freeze-tick + #4->#28->#34 decision chain is load-bearing on an experiment that cannot produce the binary signal #28 is contracted to read.

## P0 (conf 9) — the falsification null is uninterpretable: underpowered + confounded
Decision rule on record (thought 34864122 + outreach.md): *"zero click-through across full Tier A (n=6) = MCP-native AI-agent wedge falsified."* Two independent fatal flaws:
1. **Underpowered.** n=6 GitHub-issue comments, several on stale 2023-2025 issues, from a fresh zero-rep account. Base-rate click-through on one helpful comment in an old/low-traffic issue is ~0 *even for an excellent product*. So P(zero clicks | wedge good) ~= P(zero clicks | wedge bad). Inferring "wedge falsified" from this null is logically invalid.
2. **Confounded.** Wedge is *MCP-native AI agents*; instrument measures *human* click-through on *GitHub-issue* distribution. Thought 34864122 itself flagged this exact demand/channel mismatch — the experiment then measures the mismatched channel. A clean zero = "manual GitHub-comment GTM didn't convert" (a channel result), isolatable nothing about the MCP wedge.

Consequence: #28 ("make the decisive freshdeps wedge decision on the #4 signal", gated 2026-05-17T20:00) will be fed an uninterpretable null → decides on noise OR stalls into a 13th freeze tick. Either way the freeze does not end with a real decision.

## P1 (conf 8 unverified / 5 broken) — client ?ref capture path never verified live
code/app/layout.tsx:25 gates the GoatCounter count.js script behind **NEXT_PUBLIC_GOATCOUNTER_CODE**. Server-side trackEvent (lib/analytics.ts) uses a *different* var **GOATCOUNTER_CODE**. Only the server var's liveness was ever recorded (thought 540ff8db / goatcounter-analytics-live = MCP/SEO *server* hits). The human "?ref=gh-*" click-through — the literal thing #4 reads — depends on the *client* var + count.js loading in Vercel prod, and there is **zero recorded end-to-end verification** that a real ?ref click lands in the GoatCounter Campaigns widget. If NEXT_PUBLIC_GOATCOUNTER_CODE is absent in prod, #4 reads a *guaranteed structural zero* unrelated to user behavior — the exact os-alt silent-degrade pattern (build green, deploy green, instrument dark). WebSearch confirms GoatCounter DOES capture ?ref by default (campaign params = utm_campaign,utm_source,ref) — so the only failure point is the client-script gate, not GoatCounter semantics.

## P2 (conf 8) — the channel-matched signal exists and is already wired, but #4/#28 point at the wrong tab
For an *MCP-native* wedge the discriminating signal is **MCP tool-invocation events**, which server-side trackEvent already emits via the verified-live GOATCOUNTER_CODE path. #4/#28 are pointed at the human ?ref Referrers/Campaigns tab (low base-rate, confounded) instead of the MCP-invocation event count (channel-matched, already-verified-live). The interpretable experiment is sitting unused.

## Concrete re-spec (the fix #28 needs before 2026-05-17T16:03Z #4 gate)
1. **Re-specify #4/#28 decision rule**: primary signal = MCP tool-invocation event count (server GOATCOUNTER_CODE path) over the window, NOT human ?ref click-through. Human ?ref is a *supporting* not *deciding* signal.
2. **Replace the invalid null inference**: "zero MCP invocations across all passive surfaces over a defined window with non-zero surface reach" is the falsification, and even that needs an honest power caveat (n of distribution attempts, not n of GitHub comments). "zero GitHub clicks" alone falsifies the *GitHub-comment GTM channel*, not the wedge.
3. **End-to-end instrument check before the gate**: confirm NEXT_PUBLIC_GOATCOUNTER_CODE present in Vercel prod + fire one synthetic ?ref hit and confirm it lands in the Campaigns widget. Until this passes, any #4 zero is uninterpretable.

Queued #38 ungated to execute this re-spec + instrument verification before #4's 2026-05-17 read.