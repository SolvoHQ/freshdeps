import { NextRequest, NextResponse } from "next/server";
import { getVerdict, type Ecosystem } from "@/lib/verdict";
import { trackEvent } from "@/lib/analytics";

export const dynamic = "force-dynamic";

function isEcosystem(v: string | null): v is Ecosystem {
  return v === "npm" || v === "pypi";
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const ecosystem = sp.get("ecosystem");
  const pkg = sp.get("package");

  if (!isEcosystem(ecosystem)) {
    return NextResponse.json(
      { error: "bad_request", message: "ecosystem must be 'npm' or 'pypi'" },
      { status: 400 },
    );
  }
  if (!pkg || pkg.trim().length === 0) {
    return NextResponse.json(
      { error: "bad_request", message: "package query param is required" },
      { status: 400 },
    );
  }

  trackEvent("verdict_api", `/api/verdict/${ecosystem}/${pkg}`);

  const verdict = await getVerdict(ecosystem, pkg.trim());

  if (!verdict.found) {
    return NextResponse.json(verdict, { status: 404 });
  }

  return NextResponse.json(verdict, {
    status: 200,
    headers: {
      // CDN-cache 1h, allow 6h stale-while-revalidate
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=21600",
    },
  });
}
