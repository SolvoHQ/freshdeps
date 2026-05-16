import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Support freshdeps — keep the migration corpus free",
  description:
    "Tip the hand-curation of the 45+ verified abandoned-dependency migration corpus. No account, no paywall — ever.",
};

const ADDR =
  process.env.SOLVO_PAYOUT_WALLET_ADDRESS ||
  "0x51BBec60d1eB41c52642257060fB52C77dba3cA9";

export default function SponsorPage() {
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
          <Link href="/">~</Link> /{" "}
          <span style={{ color: "var(--text)" }}>support</span>
        </div>

        <div className="section-label">// support</div>
        <h1 style={{ fontSize: "1.5rem", lineHeight: 1.3 }}>
          The 45+ hand-verified abandoned-dependency migration corpus is free
          and stays <span className="hl">100% free</span> — no account, no
          paywall, ever.
        </h1>
        <p className="lede">
          If a freshdeps migration recipe saved you from shipping a dead
          dependency or a broken build, you can fund the hand-curation. This is
          a tip, not a subscription. There is nothing to log into.
        </p>

        <div className="convert">
          <div className="convert-hook" style={{ marginTop: 0 }}>
            Send USDC or native ETH on <strong>Base</strong> or{" "}
            <strong>Ethereum mainnet</strong> — self-custodied, no third party:
          </div>
          <pre className="convert-cmd">
            <code>{ADDR}</code>
          </pre>
          <div className="convert-foot">
            Verify funds landed independently (reads only the public address):{" "}
            <a
              href="/api/pay/status?chain=base&token=usdc&min=1"
              style={{ color: "var(--accent)" }}
            >
              GET /api/pay/status?chain=base&amp;token=usdc&amp;min=1
            </a>
          </div>
        </div>

        <p className="apilink">
          Balance-based, no per-payer attribution — this is one-off tip
          collection only.
        </p>

        <footer>
          <span>
            <Link href="/">← freshdeps</Link>
          </span>
          <span>the corpus stays free</span>
        </footer>
      </div>
    </>
  );
}
