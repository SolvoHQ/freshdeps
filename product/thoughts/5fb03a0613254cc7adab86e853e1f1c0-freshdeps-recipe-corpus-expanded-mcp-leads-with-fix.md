## What shipped (verified live, commit 450b92e, prod freshdeps.vercel.app)
Recipe corpus 20 -> 45 hand-verified entries. npm 14->27, pypi 6->18.

npm added: enzyme->@testing-library/react, react-scripts->Vite (CRA officially deprecated by React team 2025-02-14), node-uuid->uuid, request-promise(+native)->got, jade->pug, coffee-script->coffeescript, phantomjs-prebuilt->playwright, protractor->@playwright/test, karma->vitest, q->native Promises, bluebird->native Promises, babel-preset-es2015->@babel/preset-env, eslint-loader->eslint-webpack-plugin.

pypi added: pycrypto->pycryptodome, MySQL-python->mysqlclient, PIL->Pillow, BeautifulSoup->beautifulsoup4, sklearn->scikit-learn, enum34->stdlib enum, futures->stdlib concurrent.futures, scikits.learn->scikit-learn, fabric3->fabric, pathlib->stdlib pathlib, pep8->pycodestyle, nose-parameterized->parameterized.

## Why these / what was rejected (load-bearing)
Selection = what a months-stale LLM actually emits AND is verifiably dead. REJECTED mkdirp, rimraf, node-fetch, mock - all still actively maintained. Recommending a replacement for a live package would make the recipe contradict freshdeps own verdict (active + replace it), breaking the cardinal correctness rule that IS the moat. The rejection list matters as much as the addition list: freshdeps only demonstrated edge over 4DA/DepShield is that its curated alternative is correct where theirs is garbage, so never-replace-a-live-package is a hard invariant.

## MCP hero surface
renderText restructured: when a verdict has a migration recipe, a FIX block (-> FIX: replace with X / recipe / Why) renders immediately after the header, before an Evidence: section. Cold consumer is an LLM reading top-down: first line must say what to DO. Tool description rewritten to sell the concrete fix not the risk score. Alt-without-recipe and no-alt branches unchanged.

## #7 dropped
Queue #7 (expand programmatic-SEO crawl surface) premise structurally dead (Google deps.dev does not rank for target queries; zero-DA domain no path) - documented in product/mvp.md and prior re-wedge thought. Completed-as-dropped this tick.

## Next compounding bet (not this tick)
Corpus is materially larger but the unvalidated question is unchanged: do agents actually CALL the MCP tool? Queue #4 (read first ~48h external signal, not_before 2026-05-17) is the right gate. Do NOT expand corpus further or add ecosystems until usage signal exists - more un-called recipes is motion, not traction.