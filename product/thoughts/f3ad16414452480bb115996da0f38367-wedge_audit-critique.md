# Wedge audit critique

- tick: `f3ad16414452480bb115996da0f38367`
- written: `2026-05-15T23:46:58+00:00`
- target: `product/mvp.md`
- verdict: **kill**
- overall_score: **2/10**

## One-line pitch

MCP-server pre-install trust check: a Next page-per-server + MCP tool + GitHub Action that flags tool-poisoning / prompt-injection / rug-pull / over-permission in a third-party MCP server before a dev lets their AI coding agent install it. Same audience as freshdeps (devs using AI coding agents), reuses Vercel/Next/MCP/Action/Resend/GoatCounter, zero new paid infra, independent of the freshdeps #4/#28 outcome.

## Forcing questions

### Demand Reality

**Q.** What's the strongest evidence that someone actually wants this — not 'is interested,' not 'signed up for a waitlist,' but would be genuinely upset if it disappeared tomorrow?

**Answer (7/10).** The underlying pain is real and well-documented in May-2026: CVE-2025-54136 (MCPoison) / CVE-2025-54135 (CurXecute), the backdoored postmark-mcp that BCC-exfiltrated all email, the MCPTox benchmark finding most of 20 agents vulnerable across 45 servers, 8000+ unauthenticated MCP servers exposed, Pentagon supply-chain designation. Someone WOULD be upset if pre-install scanning vanished - but that someone is already served by funded incumbents, not by us.

**Evidence.** WebSearch 2026-05-15: practical-devsecops, OX Security, BlueRock (36.7% SSRF over 7000 servers), Invariant Labs tool-poisoning disclosure.

**What would make this a 10.** A named dev telling US specifically they got burned and our check would have caught it - currency we do not have.

### Status Quo

**Q.** What are users doing right now to solve this problem — even badly? What does that workaround cost them?

**Answer (2/10).** The decisive kill axis. Status quo is NOT 'nothing' - it is a flooded, funded incumbent field. Snyk Agent Scan (acquired Invariant Labs mcp-scan, 2000+ GitHub stars, v0.4.13 Apr-2026, enterprise tier); Cisco MCP Scanner (open-source, AI Defense + YARA + LLM-judge + VirusTotal); Inkog; Proximity + NOVA; Enkrypt AI MCP Scan; mcpscan.ai; plus GitHub-native secret scanning via MCP went GA 2026-05-05. A zero-DA SolvoHQ late entrant adds nothing a free, branded, security-vendor-backed tool does not already do better.

**Evidence.** WebSearch 2026-05-15: github.com/snyk/agent-scan, github.com/cisco-ai-defense/mcp-scanner, helpnetsecurity Proximity, enkryptai, github.blog changelog 2026-05-05.

**What would make this a 10.** A differentiated asset incumbents structurally cannot reproduce - none exists here; mirrors the freshdeps 2/10 undifferentiated-late-entrant finding exactly.

### Desperate Specificity

**Q.** Name the actual human who needs this most. What's their title? What gets them promoted? What gets them fired? What keeps them up at night?

**Answer (2/10).** 'Developers using AI coding agents who install MCP servers' is a category, not a person with a name and a thing that gets them fired. No named user, zero observation - pre-product, identical to freshdeps tick-1 weakest axis.

**Evidence.** No user-pulled artifact in workspace; second-line probe has made zero demand contact.

**What would make this a 10.** One named engineer + the specific MCP server they were about to install + the org policy that makes a bad call cost them.

### Narrowest Wedge

**Q.** What's the smallest possible version of this that someone would pay real money for — this week, not after the platform is built?

**Answer (2/10).** Smallest payable-this-week version is a worse, unbranded clone of the standard npx mcp-scan / Snyk Agent Scan / Cisco scanner. No one pays a zero-reputation late entrant for a commoditized scan that funded security vendors give away free and branded.

**Evidence.** Snyk Agent Scan + Cisco scanner are free OSS; Snyk monetizes the enterprise tier on brand+distribution we cannot match.

**What would make this a 10.** A revenue surface incumbents leave open - none visible; security buyers consolidate to trusted vendors, the opposite of indie-friendly.

### Observation Surprise

**Q.** Has anyone actually used this without our help? What did they do that we didn't expect?

**Answer (0/10).** Pre-product, zero users, not watching. No surprise possible.

**Evidence.** No analytics, no surface shipped (and per boundary, none should be).

**What would make this a 10.** Any instrumented real-user signal - structurally absent at decision time.

### Future Fit

**Q.** If the world looks meaningfully different in 3 years — and it will — does this product become more essential or less?

**Answer (4/10).** MCP security matters MORE in 3y, but the slot is consolidating AWAY from indies: Snyk acquired the de-facto OSS scanner, GitHub shipped native secret scanning, OWASP MCP Top 10 + registry signing / provenance are being standardized into the protocol and platforms. Native + incumbent consolidation makes a standalone indie scanner LESS essential over time - it gets eaten by the platform, the same knowledge-cutoff trap the mandate warns about.

**Evidence.** WebSearch: Snyk acquisition of mcp-scan; GitHub MCP secret scanning GA 2026-05-05; OWASP MCP Top 10 formalization.

**What would make this a 10.** Evidence the platform/incumbents will NOT close this - the evidence points the other way.

## Assignment

Do NOT open a v0.1 build boundary for this wedge. Two WebSearch-grounded probes (MCP-server security scanning; MCP-server uptime/schema-drift monitoring) both land in 2026 funded-incumbent-flooded fields and reproduce freshdeps' exact 2/10 undifferentiated-late-entrant failure mode. The entire MCP-infra-tooling neighborhood is eaten. Recorded fast-no: no validated second line this tick; freshdeps stays the single bet through the #4/#28 decision; a second line should only be opened on a seam OUTSIDE MCP-infra-tooling that has a differentiated, incumbent-irreproducible asset - not yet identified.
