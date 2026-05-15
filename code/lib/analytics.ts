/**
 * Always-on instrumentation. Two channels:
 *  1. A structured console line (Vercel runtime logs — cheap, zero-config).
 *  2. Fire-and-forget GoatCounter GET (durable across days) when
 *     GOATCOUNTER_CODE is set. Never blocks or throws into the request path.
 *
 * Wired from day one even before GOATCOUNTER_CODE is populated, so the very
 * first external MCP/SEO hit is observable (wedge-validation requirement).
 */
export function trackEvent(name: string, path: string): void {
  try {
    console.log(
      `[freshdeps-event] ${JSON.stringify({
        ts: new Date().toISOString(),
        event: name,
        path,
      })}`,
    );
  } catch {
    /* logging must never break the response */
  }

  const code = process.env.GOATCOUNTER_CODE;
  if (!code) return;

  const url = `https://${code}.goatcounter.com/count?p=${encodeURIComponent(
    path,
  )}&t=${encodeURIComponent(name)}`;

  void fetch(url, {
    method: "GET",
    headers: { "User-Agent": "freshdeps/0.1 (+server-event)" },
    // do not let analytics hold the response open
    keepalive: true,
  }).catch(() => {
    /* swallow — analytics is best-effort */
  });
}
