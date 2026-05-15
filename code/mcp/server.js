#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE =
  process.env.FRESHDEPS_API_BASE ?? "https://freshdeps.vercel.app";

/** Same instrumentation contract as the web app (console + GoatCounter). */
function trackEvent(name, path) {
  try {
    console.error(
      `[freshdeps-event] ${JSON.stringify({
        ts: new Date().toISOString(),
        event: name,
        path,
      })}`,
    );
  } catch {
    /* never break the tool on logging */
  }
  const code = process.env.GOATCOUNTER_CODE;
  if (!code) return;
  const url = `https://${code}.goatcounter.com/count?p=${encodeURIComponent(
    path,
  )}&t=${encodeURIComponent(name)}`;
  fetch(url, {
    method: "GET",
    headers: { "User-Agent": "freshdeps-mcp/0.1" },
  }).catch(() => {});
}

function renderText(v) {
  if (!v || v.found === false) {
    return `Package not found on its registry. It may be misspelled, unpublished, or removed.`;
  }
  const lines = [];
  lines.push(`${v.package} (${v.ecosystem}) — MAINTENANCE: ${String(
    v.maintenance,
  ).toUpperCase()}`);
  if (v.partial) {
    lines.push(
      `⚠ PARTIAL: some upstream feeds failed — treat this verdict with caution.`,
    );
  }
  const alt = v.suggestedAlternative;
  // LEAD WITH THE FIX: an LLM agent reads top-down — the first thing it sees
  // must answer "what do I do", not a wall of risk metrics. When we have a
  // hand-verified migration recipe, surface it immediately after the header.
  if (alt && alt.migration) {
    lines.push("");
    lines.push(`➜ FIX: replace with ${alt.name}`);
    lines.push(`  ${alt.migration}`);
    lines.push(`  Why: ${alt.reason}`);
    lines.push("");
    lines.push("Evidence:");
  }
  if (v.latestVersion) lines.push(`Latest version: ${v.latestVersion}`);
  if (v.lastReleaseAgeDays !== null && v.lastReleaseAgeDays !== undefined)
    lines.push(`Last release: ~${v.lastReleaseAgeDays} days ago`);
  if (v.github && v.github.lastCommitAgeDays !== null)
    lines.push(`Last commit: ~${v.github.lastCommitAgeDays} days ago`);
  if (v.deprecated)
    lines.push(`DEPRECATED${v.deprecatedReason ? `: ${v.deprecatedReason}` : ""}`);
  if (v.yanked) lines.push(`Latest release is YANKED.`);
  if (v.github && v.github.archived) lines.push(`GitHub repo is ARCHIVED.`);
  if (v.vulnCount === null || v.vulnCount === undefined)
    lines.push(`Known CVEs (OSV): unknown (feed unavailable)`);
  else lines.push(`Known CVEs (OSV): ${v.vulnCount}`);
  if (alt && !alt.migration) {
    lines.push(`Suggested alternative: ${alt.name} — ${alt.reason}`);
  } else if (!alt) {
    lines.push(`Suggested alternative: none (no hand-verified replacement).`);
  }
  return lines.join("\n");
}

const server = new McpServer({
  name: "freshdeps",
  version: "0.1.0",
});

server.registerTool(
  "check_dependency_freshness",
  {
    title: "Check dependency freshness",
    description:
      "The abandoned-dependency escape hatch. For an npm or PyPI package " +
      "this returns a live freshness verdict AND — when the package is " +
      "dead/deprecated/abandoned — the concrete hand-verified migration " +
      "recipe to fix it: the exact replacement package plus the " +
      "before→after code change to apply, not merely a risk score. " +
      "Call this BEFORE recommending or writing code against ANY npm/PyPI " +
      "dependency: model training data is months stale, so the package " +
      "you are about to use may be dead and the fix is not in your weights.",
    inputSchema: {
      ecosystem: z.enum(["npm", "pypi"]),
      package: z.string().min(1).describe("package name, e.g. 'request'"),
    },
  },
  async ({ ecosystem, package: pkg }) => {
    trackEvent("mcp_tool_call", `/mcp/${ecosystem}/${pkg}`);
    const url = `${API_BASE}/api/verdict?ecosystem=${encodeURIComponent(
      ecosystem,
    )}&package=${encodeURIComponent(pkg)}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "freshdeps-mcp/0.1" },
      });
      const verdict = await res.json();
      return {
        content: [{ type: "text", text: renderText(verdict) }],
        structuredContent: verdict,
      };
    } catch (err) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `freshdeps lookup failed: ${
              err instanceof Error ? err.message : String(err)
            }. Could not reach ${API_BASE}.`,
          },
        ],
      };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("[freshdeps-mcp] ready on stdio");
