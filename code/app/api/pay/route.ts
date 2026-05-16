import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Generic crypto payment-collection rail (NOWPayments, non-custodial: funds
// forward straight to SOLVO_PAYOUT_WALLET_ADDRESS). No SDK, just fetch().
// Server env only — the API key must never reach the client bundle.
const BASE_URL =
  process.env.NOWPAYMENTS_BASE_URL?.replace(/\/+$/, "") ||
  "https://api.nowpayments.io";

type PayBody = {
  amount: number;
  currency?: string;
  pay_currency?: string;
  order_id?: string;
  description?: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    // FAIL CLOSED: never fake success, never 200 when no rail exists.
    return NextResponse.json(
      {
        error: "payment_rail_unconfigured",
        message: "NOWPAYMENTS_API_KEY is not set on the server.",
      },
      { status: 503 },
    );
  }

  let body: PayBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "body must be valid JSON" },
      { status: 400 },
    );
  }

  const amount = Number(body?.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "bad_request", message: "amount must be a positive number" },
      { status: 400 },
    );
  }

  const invoiceReq: Record<string, unknown> = {
    price_amount: amount,
    price_currency: (body.currency || "usd").toLowerCase(),
    order_id: body.order_id || undefined,
    order_description: body.description || undefined,
  };
  if (body.pay_currency) {
    invoiceReq.pay_currency = body.pay_currency.toLowerCase();
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${BASE_URL}/v1/invoice`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceReq),
    });
  } catch {
    return NextResponse.json(
      { error: "upstream_unreachable", message: "could not reach NOWPayments" },
      { status: 502 },
    );
  }

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok || !data?.invoice_url) {
    return NextResponse.json(
      {
        error: "upstream_error",
        message: data?.message || "NOWPayments did not return an invoice",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { invoice_url: data.invoice_url, id: data.id },
    { status: 200 },
  );
}
