import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

// NOWPayments IPN signature = HMAC-SHA512 of the JSON body with keys sorted
// alphabetically (recursively), keyed by NOWPAYMENTS_IPN_SECRET, compared
// against the x-nowpayments-sig header. Generic infra — no wedge coupling.

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortDeep((value as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return value;
}

export async function POST(req: NextRequest) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) {
    return NextResponse.json(
      {
        error: "ipn_unconfigured",
        message: "NOWPAYMENTS_IPN_SECRET is not set on the server.",
      },
      { status: 503 },
    );
  }

  const raw = await req.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "body must be valid JSON" },
      { status: 400 },
    );
  }

  const expected = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(sortDeep(parsed)))
    .digest("hex");
  const got = req.headers.get("x-nowpayments-sig") || "";

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(got, "utf8");
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!valid) {
    return NextResponse.json(
      { error: "invalid_signature" },
      { status: 400 },
    );
  }

  const p = parsed as Record<string, unknown>;
  // Valid, authenticated callback. Any future wedge keys off payment_status.
  console.log(
    `[nowpayments-ipn] payment_id=${p.payment_id} status=${p.payment_status} order_id=${p.order_id}`,
  );

  return NextResponse.json(
    { ok: true, payment_status: p.payment_status, payment_id: p.payment_id },
    { status: 200 },
  );
}
