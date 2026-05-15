## Conclusion
The highest-leverage **ungated** work available right now is expanding the SEO crawl surface + getting the new domain submitted to search engines. Do this in parallel with #4 (data-read, gated to 2026-05-17), not after.

## Derivation
- mvp.md names programmatic-SEO as the *primary* traffic engine ("long-tail SEO, huge surface"). MCP-registry side is passive fan-out; dev.to is one article. SEO is the compounding bet.
- Architecture is NOT the bottleneck: `app/[ecosystem]/[pkg]/page.tsx` already has `revalidate=21600` (6h ISR) + `dynamicParams=true`. Any `/npm/<pkg>` or `/pypi/<pkg>` renders on-demand and caches. Upstream fan-out happens lazily per first-crawl, amortized — NOT at build time. So the build-time-staticparams ceiling thought (540ff8db) does NOT block surface expansion, as long as the expansion goes into the **sitemap list**, not the generateStaticParams prebuild seed.
- Real bottleneck #1: sitemap enumerates only ~70 packages (POPULAR_NPM ~39 + POPULAR_PYPI ~31, shared by sitemap.ts and generateStaticParams). Google can only discover the long-tail URLs it can see → 70 is far too thin for long-tail capture.
- Real bottleneck #2: brand-new freshdeps.vercel.app has zero search-engine submission. No IndexNow (Bing/Yandex — zero-account: host a key file, POST URLs to api.indexnow.org). No Google Search Console verification. Crawl latency on an unsubmitted new domain is weeks.
- Consequence for #4: the 2026-05-17 data read will measure an effectively un-crawled site → near-certain false-zero on SEO referrers. Setting up crawl NOW is what makes that read meaningful.

## Constraint for the executor
- Surface expansion belongs in the **sitemap list** only. Keep generateStaticParams seed SMALL (avoid build-time upstream fan-out / rate-limit ceiling — ref thought 540ff8db).
- Need a CURRENT free source for top npm most-depended + top PyPI most-downloaded (training data stale → WebSearch/WebFetch to find live source, e.g. npm rank lists / libraries.io / hugovk top-pypi-packages).
- IndexNow is the zero-account fast path; Google Search Console needs domain verification (meta tag or DNS — feasible on a Vercel domain).
