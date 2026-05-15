import Link from "next/link";

export default function NotFound() {
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
        <section className="hero">
          <h1>
            <span className="hl">404</span> — package not found
          </h1>
          <p className="lede">
            That package was not found on its registry (npm / PyPI), or the
            ecosystem in the URL is not one we support. Double-check the spelling
            — scoped npm names use an encoded slash (e.g.{" "}
            <code>@scope%2Fname</code>).
          </p>
          <p className="lede">
            <Link href="/">← back to freshdeps</Link>
          </p>
        </section>
      </div>
    </>
  );
}
