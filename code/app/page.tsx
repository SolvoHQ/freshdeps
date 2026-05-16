import Link from "next/link";
import SearchBox from "./search-box";

const SAMPLES: { eco: "npm" | "pypi"; pkg: string; note: string }[] = [
  { eco: "npm", pkg: "request", note: "deprecated" },
  { eco: "npm", pkg: "moment", note: "maintenance-mode" },
  { eco: "npm", pkg: "react", note: "active" },
  { eco: "npm", pkg: "left-pad", note: "infamous" },
  { eco: "npm", pkg: "colors", note: "sabotaged" },
  { eco: "pypi", pkg: "numpy", note: "active" },
  { eco: "pypi", pkg: "nose", note: "dead" },
  { eco: "pypi", pkg: "requests", note: "active" },
];

export default function Home() {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="brand">
            freshdeps<span className="blink">_</span>
          </span>
        </div>
      </div>

      <div className="wrap">
        <section className="hero">
          <h1>
            Is that package <span className="hl">still alive</span> — or is
            your agent guessing?
          </h1>
          <p className="lede">
            Every AI coding agent recommends npm / PyPI packages from training
            data that is 6–18 months stale. It confidently suggests deprecated
            libraries, outdated versions, and packages with known CVEs — because
            a model <em>cannot</em> know post-cutoff package state. freshdeps
            does a <strong>live lookup</strong> across the npm registry, PyPI,
            GitHub and the OSV vulnerability database and returns one honest
            verdict: alive, slowing, stale, or abandoned — plus what to use
            instead.
          </p>

          <SearchBox />
        </section>

        <div className="section-label">// sample verdicts</div>
        <div className="samples">
          {SAMPLES.map((s) => (
            <Link
              key={`${s.eco}:${s.pkg}`}
              className="sample"
              href={`/${s.eco}/${encodeURIComponent(s.pkg)}`}
            >
              <span>
                {s.pkg} <span className="eco">/ {s.note}</span>
              </span>
              <span className="eco">{s.eco}</span>
            </Link>
          ))}
        </div>

        <div className="section-label">// use it from your AI agent (MCP)</div>
        <p className="lede" style={{ marginTop: 0 }}>
          Add the MCP server so Claude / Cursor calls freshdeps{" "}
          <em>before</em> recommending a dependency:
        </p>
        <div className="snippet">
          {`{
  `}
          <span className="k">&quot;mcpServers&quot;</span>
          {`: {
    `}
          <span className="k">&quot;freshdeps&quot;</span>
          {`: {
      `}
          <span className="k">&quot;command&quot;</span>
          {`: `}
          <span className="s">&quot;npx&quot;</span>
          {`,
      `}
          <span className="k">&quot;args&quot;</span>
          {`: [`}
          <span className="s">&quot;-y&quot;</span>
          {`, `}
          <span className="s">&quot;github:SolvoHQ/freshdeps-mcp&quot;</span>
          {`]
    }
  }
}`}
        </div>

        <div className="section-label">// programmatic</div>
        <p className="apilink">
          JSON API:{" "}
          <code>GET /api/verdict?ecosystem=npm&amp;package=react</code>
        </p>

        <div className="section-label">// support</div>
        <p className="lede" style={{ marginTop: 0 }}>
          The corpus is free. If it saved your build,{" "}
          <Link href="/sponsor?ref=sponsor" style={{ color: "var(--accent)" }}>
            support the curation
          </Link>
          .
        </p>

        <footer>
          <span>freshdeps — live dependency health · npm + PyPI</span>
          <span>data: npm registry · PyPI · GitHub · OSV.dev</span>
        </footer>
      </div>
    </>
  );
}
