import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/payments/verify";

// On-chain reads must run on the Node runtime (ethers needs node crypto/net)
// and must never be statically cached — balances change.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/pay/status?chain=base&token=usdc&min=1
 *
 * Reports whether the workspace's self-custodied collection wallet
 * (SOLVO_PAYOUT_WALLET_ADDRESS, server-side env only) has received funds.
 *
 * This handler reads ONLY the public address. It never reads, derives, or
 * exposes SOLVO_PAYOUT_WALLET_PRIVKEY — that key has no place on any
 * client-reachable path.
 *
 * Query params:
 *   chain  - chain key (default "base"). See lib/payments/verify CHAINS.
 *   token  - token shortcut/address, or "native" / omitted for native coin.
 *   min    - minimum amount (human units) for `paid` to be true (default 0).
 */
export async function GET(req: NextRequest) {
  const address = process.env.SOLVO_PAYOUT_WALLET_ADDRESS;
  if (!address) {
    return NextResponse.json(
      {
        error: "not_configured",
        message: "SOLVO_PAYOUT_WALLET_ADDRESS is not set on the server",
      },
      { status: 503 },
    );
  }

  const sp = req.nextUrl.searchParams;
  const chain = sp.get("chain")?.trim() || "base";
  const tokenParam = sp.get("token")?.trim();
  const min = sp.get("min")?.trim() || "0";

  // "native" / empty => native coin; otherwise pass through as shortcut/addr.
  const tokenAddress =
    !tokenParam || tokenParam.toLowerCase() === "native"
      ? undefined
      : tokenParam;

  try {
    const result = await verifyPayment({
      chain,
      payTo: address,
      tokenAddress,
      minAmount: min,
    });

    return NextResponse.json(
      {
        address: result.address,
        chain: result.chain,
        token: result.token,
        balance: result.balance,
        paid: result.paid,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "verify_failed",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
}
