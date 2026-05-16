import { NextResponse } from "next/server";
import { findAlternative } from "@/data/alternatives";
import { trackEvent } from "@/lib/analytics";
import type { Ecosystem } from "@/lib/verdict";

/**
 * Embeddable shields.io-style dependency-health badge, sourced ONLY from the
 * hand-curated migration corpus (data/alternatives.ts) — never a live feed.
 * In corpus  -> red  "deps | dead — migrate →"
 * Not in it  -> green "deps | maintained"
 * The badge state changes only when the corpus changes (i.e. on deploy), so
 * it is aggressively CDN-cacheable. The verdict source being the hand corpus
 * is exactly what makes this incumbent-irreproducible.
 */

function isEcosystem(v: string): v is Ecosystem {
  return v === "npm" || v === "pypi";
}

// Rough Verdana-11 per-char advance (px). textLength makes the renderer
// stretch glyphs to fit, so an approximate sum is visually fine for v0.1.
function textWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    if ("iIl.':;|!".includes(ch)) w += 3.3;
    else if ("ftrj()[]- ".includes(ch)) w += 4.6;
    else if ("mwMW—→".includes(ch)) w += 10.5;
    else if (ch >= "A" && ch <= "Z") w += 8.2;
    else w += 7;
  }
  return Math.ceil(w);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function badgeSvg(label: string, message: string, color: string): string {
  const PAD = 6;
  const labelTextW = textWidth(label);
  const msgTextW = textWidth(message);
  const labelW = labelTextW + PAD * 2;
  const msgW = msgTextW + PAD * 2;
  const total = labelW + msgW;
  // text anchors, *10 (the canonical shields flat template scales by .1)
  const labelX = (labelW / 2) * 10;
  const msgX = (labelW + msgW / 2) * 10;
  const labelTL = labelTextW * 10;
  const msgTL = msgTextW * 10;
  const L = escapeXml(label);
  const M = escapeXml(message);
  const aria = `${label}: ${message}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="20" role="img" aria-label="${escapeXml(
    aria,
  )}">
<title>${escapeXml(aria)}</title>
<linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
<clipPath id="r"><rect width="${total}" height="20" rx="3" fill="#fff"/></clipPath>
<g clip-path="url(#r)">
<rect width="${labelW}" height="20" fill="#555"/>
<rect x="${labelW}" width="${msgW}" height="20" fill="${color}"/>
<rect width="${total}" height="20" fill="url(#s)"/>
</g>
<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
<text aria-hidden="true" x="${labelX}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${labelTL}">${L}</text>
<text x="${labelX}" y="140" transform="scale(.1)" textLength="${labelTL}">${L}</text>
<text aria-hidden="true" x="${msgX}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${msgTL}">${M}</text>
<text x="${msgX}" y="140" transform="scale(.1)" textLength="${msgTL}">${M}</text>
</g>
</svg>`;
}

const HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  // Corpus only changes on deploy -> cache hard; SWR keeps READMEs fast.
  "Cache-Control":
    "public, max-age=600, s-maxage=86400, stale-while-revalidate=604800",
};

function svgResponse(label: string, message: string, color: string) {
  return new NextResponse(badgeSvg(label, message, color), {
    status: 200,
    headers: HEADERS,
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ecosystem: string; pkg: string }> },
) {
  const { ecosystem, pkg } = await params;

  // pkg arrives as e.g. "node-sass.svg" — decode then strip a .svg suffix.
  let name = decodeURIComponent(pkg);
  name = name.replace(/\.svg$/i, "");

  if (!isEcosystem(ecosystem) || name.trim().length === 0) {
    return svgResponse("deps", "unknown", "#9f9f9f");
  }

  // Independent instrument: a distinct event namespace. Does NOT touch the
  // #4 / Tier-A ?ref click-through tags — those live on the package page.
  trackEvent("badge_render", `/badge/${ecosystem}/${name}`);

  const alt = findAlternative(ecosystem, name);
  if (alt) {
    return svgResponse("deps", "dead — migrate →", "#e05d44");
  }
  return svgResponse("deps", "maintained", "#4c1");
}
