## The problem: your AI agent's package knowledge is months stale

I kept hitting the same failure mode while pair-coding with Claude and Cursor: the agent confidently recommends a package, I install it, and only later find out it was deprecated, the repo is archived, or the version it suggested has a known CVE.

This is structural, not a model quality issue. An LLM's package knowledge is frozen at its training cutoff — typically 6–18 months stale by the time you use it. In that window a library can get deprecated, hand off maintenance, archive its repo, or pick up a CVE. The model has no way to know any of that happened. A bigger or newer model does not fix this; it just moves the stale cutoff forward a few months. The only real fix is a **live lookup at recommendation time**.

So I built a small thing to do exactly that lookup, and wired it into the agent via MCP so the check happens *before* the recommendation reaches me.

## What I built

**Freshdeps** returns one honest maintenance verdict for an npm or PyPI package by combining three live sources at request time:

- the package registry (npm / PyPI) — latest version, deprecation, yanked releases
- the GitHub API — last commit/release age, archived flag, open issues
- [OSV.dev](https://osv.dev) — open vulnerability count

It collapses those into a single verdict — `active`, `slowing`, `stale`, `abandoned`, or `unknown` — plus the supporting facts (latest version, release/commit age, deprecated/yanked/archived flags, CVE count) and a hand-verified alternative when something is clearly dead.

There are two surfaces over the same backend:

**1. Web + JSON API** — for humans and scripts:

- Page: `https://freshdeps.vercel.app/npm/react`
- API: `GET https://freshdeps.vercel.app/api/verdict?ecosystem=npm&package=react`

```json
{
  "ecosystem": "npm",
  "package": "react",
  "latestVersion": "19.2.6",
  "deprecated": false,
  "lastReleaseAgeDays": 9,
  "github": { "archived": false, "lastCommitAgeDays": 1, "openIssues": 1302 },
  "vulnCount": 2,
  "maintenance": "active",
  "suggestedAlternative": null,
  "sources": { "registry": true, "github": true, "osv": true }
}
```

**2. MCP server** — so the agent checks before it recommends, which is the part I actually care about.

## How the MCP integration works

The server exposes exactly one tool:

```
check_dependency_freshness(ecosystem: "npm" | "pypi", package: string)
  → live maintenance verdict + latest version + release/commit age
    + deprecation/yank/archived flags + OSV CVE count
    + hand-verified alternative if the package is dead
```

One tool, one job. When the agent is about to suggest a dependency, it can call this and get ground truth instead of recalling a stale fact. In practice the useful pattern is a project rule like *"before recommending or adding any npm/PyPI dependency, call `check_dependency_freshness` and don't recommend anything that comes back `abandoned` or with open CVEs."*

Install is one paste into your MCP client config — **no account, no API key**. It runs straight from GitHub via `npx`:

```json
{"mcpServers":{"freshdeps":{"command":"npx","args":["-y","github:SolvoHQ/freshdeps-mcp"]}}}
```

That works in any MCP-capable client (Claude Desktop, Cursor, etc.). It's also published to the official MCP Registry as `io.github.SolvoHQ/freshdeps-mcp`. MCP server source: <https://github.com/SolvoHQ/freshdeps-mcp>

## Honest about the limits

This is an MVP and I'd rather say so than oversell it:

- **npm and PyPI only.** No Go, crates, RubyGems, Maven yet.
- **No auth, no database.** Verdicts are computed live per request, so the first hit on a cold, never-seen package is a bit slow (subsequent reads are cached by the platform).
- The `active` / `abandoned` heuristic is a judgment call built from release age, commit age, archived status and deprecation. It's deliberately conservative, but it will disagree with you on some packages you know well.
- Unauthenticated GitHub API calls are rate-limited; under load some verdicts can come back `partial` (registry-only) rather than failing.

None of these are hard blockers for the core use case, but you should know them before you trust it in a workflow.

## Asking for feedback

Two specific things I'd genuinely like input on:

1. **Which ecosystems matter most to you beyond npm/PyPI?** That ordering decides what I build next.
2. **Does the abandoned-vs-active call match your judgment** on packages you know deeply? Pick a few, hit the API, tell me where it's wrong — that heuristic only gets better with disagreement.

Try it on a package you already have an opinion about:
`https://freshdeps.vercel.app/npm/<your-package>` or the JSON API above. It's open source; the MCP repo is linked above. Thanks for reading.
