import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVerdict, type Ecosystem, type Verdict } from "@/lib/verdict";
import { trackEvent } from "@/lib/analytics";
import { POPULAR_NPM, POPULAR_PYPI } from "@/data/popular";

export const revalidate = 21600; // 6h ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return [
    ...POPULAR_NPM.map((pkg) => ({ ecosystem: "npm", pkg })),
    ...POPULAR_PYPI.map((pkg) => ({ ecosystem: "pypi", pkg })),
  ];
}

type Params = { ecosystem: string; pkg: string };

function isEcosystem(v: string): v is Ecosystem {
  return v === "npm" || v === "pypi";
}

const STATUS_COLOR: Record<string, string> = {
  active: "var(--active)",
  slowing: "var(--slowing)",
  stale: "var(--stale)",
  abandoned: "var(--abandoned)",
  unknown: "var(--unknown)",
};

const STATUS_SUB: Record<string, string> = {
  active: "Released or committed within the last ~6 months.",
  slowing: "Some activity, but cadence has dropped (6–12 months).",
  stale: "No meaningful activity in 1–2 years.",
  abandoned: "Archived, deprecated/yanked, or silent for 2+ years.",
  unknown: "Not enough live signal to judge — treat with caution.",
};

function ageStr(days: number | null): string {
  if (days === null) return "unknown";
  if (days < 1) return "today";
  if (days < 45) return `${days}d ago`;
  const mo = Math.round(days / 30);
  if (mo < 24) return `${mo}mo ago`;
  return `${(days / 365).toFixed(1)}y ago`;
}

function summarize(v: Verdict): string {
  if (!v.found) return `${v.package} was not found on ${v.ecosystem}.`;
  const bits: string[] = [`maintenance: ${v.maintenance}`];
  if (v.latestVersion) bits.push(`latest ${v.latestVersion}`);
  if (v.lastReleaseAgeDays !== null)
    bits.push(`last release ${ageStr(v.lastReleaseAgeDays)}`);
  if (v.deprecated) bits.push("DEPRECATED");
  if (v.yanked) bits.push("yanked");
  if (v.vulnCount && v.vulnCount > 0) bits.push(`${v.vulnCount} known CVE(s)`);
  return bits.join(" · ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { ecosystem, pkg } = await params;
  const decoded = decodeURIComponent(pkg);
  if (!isEcosystem(ecosystem)) return { title: "Not found | freshdeps" };
  const v = await getVerdict(ecosystem, decoded);
  const eco = ecosystem === "npm" ? "npm" : "PyPI";
  if (!v.found) {
    return {
      title: `${decoded} not found on ${eco} | freshdeps`,
      robots: { index: false },
    };
  }
  const title = `${decoded} — is it still maintained? (${eco}) | freshdeps`;
  const description = `${decoded} on ${eco}: ${summarize(v)}. Live data from npm/PyPI, GitHub & OSV.`;
  const canonical = `/${ecosystem}/${encodeURIComponent(decoded)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { ecosystem, pkg } = await params;
  if (!isEcosystem(ecosystem)) notFound();
  const decoded = decodeURIComponent(pkg);

  trackEvent(`page_view_${ecosystem}`, `/${ecosystem}/${decoded}`);

  const v = await getVerdict(ecosystem, decoded);
  if (!v.found) notFound();

  const eco = ecosystem === "npm" ? "npm" : "PyPI";
  const color = STATUS_COLOR[v.maintenance] ?? "var(--unknown)";
  const checkedDate = new Date(v.checkedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const mcpOneLiner =
    "claude mcp add freshdeps -- npx -y github:SolvoHQ/freshdeps-mcp";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${decoded} dependency health (${eco})`,
    description: summarize(v),
    creator: { "@type": "Organization", name: "freshdeps" },
    dateModified: v.checkedAt,
    keywords: [decoded, eco, "deprecated", "maintained", "alternative"],
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <Link href="/" className="brand" style={{ color: "var(--text)" }}>
            freshdeps<span className="blink">_</span>
          </Link>
        </div>
      </div>

      <div className="wrap">
        <div className="crumb">
          <Link href="/">~</Link> / {ecosystem} /{" "}
          <span style={{ color: "var(--text)" }}>{decoded}</span>
        </div>

        <div className="pkg-head">
          <span className="pkg-name">{decoded}</span>
          <span className="pkg-eco">{eco}</span>
        </div>

        {v.partial ? (
          <div className="banner">
            ⚠ Some upstream data could not be fetched live — this verdict is
            partial. Treat it with caution.
          </div>
        ) : null}

        <div
          className="statusbar"
          style={{ ["--sc" as string]: color }}
        >
          <div className="status-word">{v.maintenance}</div>
          <div className="status-sub">{STATUS_SUB[v.maintenance]}</div>
        </div>

        <div className="convert">
          <div className="convert-live">
            ✓ freshdeps checked <strong>{decoded}</strong> live against{" "}
            {eco}, GitHub &amp; OSV on <strong>{checkedDate}</strong> — but it
            goes stale again.
          </div>
          <div className="convert-hook">
            Install the MCP so your AI agent checks freshness{" "}
            <em>before</em> it recommends a dependency:
          </div>
          <pre className="convert-cmd">
            <code>{mcpOneLiner}</code>
          </pre>
          <div className="convert-foot">
            One line. Works in Claude Code / Cursor / any MCP client (or paste
            the{" "}
            <Link href="/" style={{ color: "var(--accent)" }}>
              JSON config
            </Link>
            ). Zero npm account needed.
          </div>
        </div>

        <div className="grid">
          <div className="cell">
            <div className="lbl">Latest version</div>
            <div className="val">{v.latestVersion ?? "—"}</div>
          </div>
          <div className="cell">
            <div className="lbl">Last release</div>
            <div className="val muted">{ageStr(v.lastReleaseAgeDays)}</div>
          </div>
          <div className="cell">
            <div className="lbl">Last commit</div>
            <div className="val muted">
              {v.github ? ageStr(v.github.lastCommitAgeDays) : "no repo data"}
            </div>
          </div>
          <div className="cell">
            <div className="lbl">Known CVEs (OSV)</div>
            <div
              className={`val ${
                v.vulnCount === null
                  ? "muted"
                  : v.vulnCount > 0
                    ? "warn"
                    : "ok"
              }`}
            >
              {v.vulnCount === null ? "unknown" : v.vulnCount}
            </div>
          </div>
          <div className="cell">
            <div className="lbl">
              {ecosystem === "npm" ? "Deprecated" : "Yanked"}
            </div>
            <div
              className={`val ${
                (ecosystem === "npm" ? v.deprecated : v.yanked) ? "warn" : "ok"
              }`}
            >
              {ecosystem === "npm"
                ? v.deprecated
                  ? "YES"
                  : "no"
                : v.yanked
                  ? "YES"
                  : "no"}
            </div>
          </div>
          <div className="cell">
            <div className="lbl">Repo archived</div>
            <div
              className={`val ${
                v.github?.archived ? "warn" : v.github ? "ok" : "muted"
              }`}
            >
              {v.github ? (v.github.archived ? "YES" : "no") : "no repo data"}
            </div>
          </div>
        </div>

        {v.deprecated && v.deprecatedReason ? (
          <div className="banner" style={{ color: "var(--abandoned)", borderColor: "var(--abandoned)", background: "rgba(248,81,73,0.08)" }}>
            npm deprecation notice: {v.deprecatedReason}
          </div>
        ) : null}

        {v.suggestedAlternative ? (
          <div className="alt">
            <div className="lbl">Suggested alternative</div>
            <div className="name">{v.suggestedAlternative.name}</div>
            <div className="reason">{v.suggestedAlternative.reason}</div>
            {v.suggestedAlternative.migration ? (
              <>
                <div className="lbl" style={{ marginTop: 16 }}>
                  Migration
                </div>
                <pre className="snippet">{v.suggestedAlternative.migration}</pre>
              </>
            ) : null}
          </div>
        ) : (
          <div className="alt none">
            <div className="lbl">Suggested alternative</div>
            <div className="name">
              no curated alternative — we only suggest hand-verified
              replacements, never guesses.
            </div>
          </div>
        )}

        {(() => {
          const badgeUrl = `https://freshdeps.vercel.app/badge/${ecosystem}/${encodeURIComponent(
            decoded,
          )}.svg`;
          const linkUrl = `https://freshdeps.vercel.app/${ecosystem}/${encodeURIComponent(
            decoded,
          )}?ref=badge`;
          const md = `[![freshdeps](${badgeUrl})](${linkUrl})`;
          const html = `<a href="${linkUrl}"><img src="${badgeUrl}" alt="freshdeps: ${decoded}"></a>`;
          return (
            <div
              className="convert"
              style={{
                borderColor: "var(--border)",
                background: "var(--panel)",
              }}
            >
              <div className="convert-hook" style={{ marginTop: 0 }}>
                Embed this freshdeps badge in your README. It reads the same
                hand-verified migration corpus this page does — so it tells
                anyone who lands on your repo whether <strong>{decoded}</strong>{" "}
                is a dead end before they install it.
              </div>
              <p style={{ margin: "14px 0 8px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badgeUrl}
                  alt={`freshdeps badge for ${decoded}`}
                  height={20}
                />
              </p>
              <div className="convert-foot" style={{ marginTop: 0 }}>
                Markdown
              </div>
              <pre className="convert-cmd">
                <code>{md}</code>
              </pre>
              <div className="convert-foot">HTML</div>
              <pre className="convert-cmd">
                <code>{html}</code>
              </pre>
              <div className="convert-foot">
                The badge links back here with an independent{" "}
                <code>?ref=badge</code> tag.
              </div>
            </div>
          );
        })()}

        {v.repositoryUrl ? (
          <p className="apilink">
            Repository:{" "}
            <a href={v.repositoryUrl} rel="nofollow noopener">
              {v.repositoryUrl}
            </a>
          </p>
        ) : null}

        <div className="meta">
          checked {new Date(v.checkedAt).toISOString()} · sources: registry=
          {String(v.sources.registry)} github={String(v.sources.github)} osv=
          {String(v.sources.osv)}
        </div>
        <p className="apilink">
          JSON:{" "}
          <a href={`/api/verdict?ecosystem=${ecosystem}&package=${encodeURIComponent(decoded)}`}>
            /api/verdict?ecosystem={ecosystem}&amp;package={decoded}
          </a>
        </p>

        <footer>
          <span>
            <Link href="/">← freshdeps</Link>
          </span>
          <span>live · revalidated every 6h</span>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
