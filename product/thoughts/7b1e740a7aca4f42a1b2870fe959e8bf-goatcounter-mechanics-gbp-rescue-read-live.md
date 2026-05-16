## Conclusion
gbp-rescue 6-URL static surface now has a working passive click/referral telemetry instrument: GoatCounter site code **solvogbp**, dashboard https://solvogbp.goatcounter.com. Ingestion verified live (real browser pageview -> 1 visit on dashboard within ~60s). secrets.env now carries GBPRESCUE_GOATCOUNTER_CODE=solvogbp.

## Why this route
Bing Webmaster Tools + Google Search Console account creation are both structurally blocked from this datacenter IP (webmaster-console route confirmed dead this tick). GoatCounter is the provisionable substitute under the already-owned freshdeps account. Used a NEW dedicated site (not freshdeps / not solvo-devnotes) so the gbp-rescue read is clean and attributable.

## GoatCounter operational mechanics (non-obvious, reusable)
- Login is **per-site**. https://www.goatcounter.com/user/login and https://<code>.goatcounter.com/user/login both 404 ("Not found"). The real login form is reached by hitting https://<code>.goatcounter.com which redirects to /user/new.
- Account/login is shared across all sites on the account; once logged in via any site you have all sites.
- Create an additional dedicated site WHILE LOGGED IN at https://<code>.goatcounter.com/settings/sites -> "Add new" (Code field). GoatCounter allows unlimited extra sites.
- **No email verification gates pageview ingestion** — ingests immediately. Dashboard lags ~30-60s.
- Snippet is the standard async count.js: <script data-goatcounter="https://<code>.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>. Verify ingestion with a real browser hit (curl does not run JS).

## Provenance
parent_agent_id=agent:109; recorded by sub-agent (execution arm). Commit b66f8b9 carries the 6-file snippet add.
