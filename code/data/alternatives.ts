import { normalizePypiName, type Ecosystem } from "../lib/verdict";

export interface Alternative {
  name: string;
  reason: string;
  /** Hand-verified migration recipe (replacement + before→after). Curated only. */
  migration?: string;
}

/**
 * Curated, hand-verified replacements only. NEVER infer or hallucinate —
 * an invented alternative destroys the product's credibility. Anything not
 * in this map returns null.
 * Key format: `${ecosystem}:${normalized-name}`.
 */
const ALTERNATIVES: Record<string, Alternative> = {
  // ---- npm ----
  "npm:request": {
    name: "got",
    reason: "request is fully deprecated (no longer maintained since 2020).",
    migration:
      "const got = require('got'); const body = await got(url).text();  // replaces request(url, cb); npm i got",
  },
  "npm:moment": {
    name: "dayjs",
    reason: "moment is in maintenance mode; dayjs is a 2KB modern alternative.",
    migration:
      "dayjs().format('YYYY-MM-DD')  // dayjs is API-compatible for common ops; npm i dayjs",
  },
  "npm:node-sass": {
    name: "sass",
    reason: "node-sass is deprecated; the Dart-based `sass` is the official path.",
    migration:
      "npm rm node-sass && npm i -D sass  // Dart Sass is a drop-in for most build setups",
  },
  "npm:querystring": {
    name: "URLSearchParams (built-in)",
    reason: "Node's legacy querystring is deprecated; use the WHATWG URLSearchParams.",
    migration:
      "new URLSearchParams({a:'1'}).toString()  // replaces querystring.stringify; built-in, no dep",
  },
  "npm:colors": {
    name: "chalk",
    reason: "colors had a sabotage incident (2022); chalk is the maintained standard.",
    migration:
      "const chalk = require('chalk'); chalk.red('x')  // replaces require('colors'); 'x'.red; npm i chalk",
  },
  "npm:faker": {
    name: "@faker-js/faker",
    reason: "the original faker was sabotaged/unpublished; @faker-js/faker is the community fork.",
    migration:
      "const { faker } = require('@faker-js/faker'); faker.person.fullName()  // npm i @faker-js/faker",
  },
  "npm:left-pad": {
    name: "String.prototype.padStart (built-in)",
    reason: "native string padding makes the dependency unnecessary.",
    migration:
      "str.padStart(5, '0')  // native, replaces leftPad(str,5,'0'); no dependency needed",
  },
  "npm:tslint": {
    name: "eslint",
    reason: "TSLint was deprecated in 2019 in favor of typescript-eslint.",
    migration:
      "npm rm tslint && npm i -D eslint typescript-eslint && npx eslint --init",
  },
  "npm:istanbul": {
    name: "nyc",
    reason: "the istanbul package is superseded by nyc / c8.",
    migration:
      "npx nyc <your-test-cmd>  // replaces 'istanbul cover'; npm i -D nyc",
  },
  "npm:gulp-util": {
    name: "fancy-log + plugin-error",
    reason: "gulp-util was deprecated and split into smaller modules.",
    migration:
      "require('fancy-log') for logging, require('plugin-error') for PluginError  // gulp-util was split",
  },
  "npm:babel-core": {
    name: "@babel/core",
    reason: "Babel 6 packages are unmaintained; use the scoped @babel/* (v7+).",
    migration:
      "npm rm babel-core babel-cli && npm i -D @babel/core @babel/cli; rename presets to @babel/preset-*",
  },
  "npm:bower": {
    name: "npm / yarn",
    reason: "Bower is deprecated; modern bundlers use npm/yarn package resolution.",
    migration:
      "move bower.json deps into package.json; use 'npm install <pkg>' instead of 'bower install'",
  },
  "npm:tape": {
    name: "vitest",
    reason: "tape is minimally maintained; vitest is a fast modern test runner.",
    migration:
      "npm i -D vitest; replace test('x',t=>{t.equal(a,b)}) with test('x',()=>{expect(a).toBe(b)})",
  },
  "npm:nodemon": {
    name: "node --watch (built-in)",
    reason: "Node 18+ ships a native --watch mode for most dev-restart needs.",
    migration: "node --watch app.js  // replaces 'nodemon app.js' on Node 18+",
  },
  "npm:enzyme": {
    name: "@testing-library/react",
    reason:
      "enzyme is abandoned (last release 2019; no React 18/19 adapter ever shipped).",
    migration:
      "npm rm enzyme enzyme-adapter-react-16 && npm i -D @testing-library/react; replace shallow(<C/>) / wrapper.find('.x') with render(<C/>) + screen.getByRole/getByText",
  },
  "npm:react-scripts": {
    name: "Vite",
    reason:
      "Create React App was officially deprecated by the React team (Feb 2025); react-scripts has no active maintainers.",
    migration:
      "npm rm react-scripts && npm i -D vite @vitejs/plugin-react; move index.html to project root, add vite.config.js, scripts: dev='vite', build='vite build'",
  },
  "npm:node-uuid": {
    name: "uuid",
    reason: "node-uuid is deprecated; the registry redirects you to `uuid`.",
    migration:
      "npm rm node-uuid && npm i uuid; const { v4: uuidv4 } = require('uuid'); uuidv4()  // replaces require('node-uuid').v4()",
  },
  "npm:request-promise": {
    name: "got",
    reason:
      "request-promise is deprecated (it extends the dead request package).",
    migration:
      "npm rm request-promise && npm i got; const got = require('got'); const body = await got(url).text()  // replaces rp(url)",
  },
  "npm:request-promise-native": {
    name: "got",
    reason:
      "request-promise-native is deprecated (it extends the dead request package).",
    migration:
      "npm rm request-promise-native && npm i got; const got = require('got'); const json = await got(url).json()  // replaces rp(url)",
  },
  "npm:jade": {
    name: "pug",
    reason: "jade was renamed to pug; the jade package is deprecated.",
    migration:
      "npm rm jade && npm i pug; require('pug').renderFile(path, locals)  // identical template syntax, replaces require('jade')",
  },
  "npm:coffee-script": {
    name: "coffeescript",
    reason:
      "the npm package was renamed to `coffeescript` (no hyphen); coffee-script is deprecated.",
    migration:
      "npm rm coffee-script && npm i coffeescript; require('coffeescript/register')  // same API, new package name",
  },
  "npm:phantomjs-prebuilt": {
    name: "playwright",
    reason:
      "phantomjs-prebuilt is deprecated; PhantomJS development is suspended.",
    migration:
      "npm rm phantomjs-prebuilt && npm i -D playwright; const { chromium } = require('playwright'); const browser = await chromium.launch()  // headless Chromium replaces PhantomJS",
  },
  "npm:protractor": {
    name: "@playwright/test",
    reason:
      "Protractor is deprecated and reached end-of-life (Summer 2023).",
    migration:
      "npm rm protractor && npm i -D @playwright/test; rewrite element(by.css('x')) as page.locator('x'); npx playwright test",
  },
  "npm:karma": {
    name: "vitest",
    reason:
      "Karma is deprecated (Angular 20 deprecated it; removal in Angular 22).",
    migration:
      "npm rm karma karma-* && npm i -D vitest jsdom; replace karma.conf.js with vitest config (environment: 'jsdom'); npx vitest",
  },
  "npm:q": {
    name: "native Promises / async-await",
    reason: "the q package is deprecated; native Promises cover its API.",
    migration:
      "Q.defer() -> new Promise((resolve,reject)=>{}); Q.all(x) -> Promise.all(x); Q(v) -> Promise.resolve(v); no dependency needed",
  },
  "npm:bluebird": {
    name: "native Promises",
    reason:
      "bluebird is unmaintained (last release 2019); native V8 Promises are now faster and standard.",
    migration:
      "Promise.promisify(fn) -> require('util').promisify(fn); Promise.map(arr,fn) -> Promise.all(arr.map(fn)); drop the dependency",
  },
  "npm:babel-preset-es2015": {
    name: "@babel/preset-env",
    reason:
      "babel-preset-es2015 is deprecated; @babel/preset-env supersedes the year-based presets.",
    migration:
      "npm rm babel-preset-es2015 && npm i -D @babel/preset-env; in .babelrc replace presets:['es2015'] with presets:['@babel/preset-env']",
  },
  "npm:eslint-loader": {
    name: "eslint-webpack-plugin",
    reason:
      "eslint-loader is deprecated in favor of eslint-webpack-plugin.",
    migration:
      "npm rm eslint-loader && npm i -D eslint-webpack-plugin; remove the eslint-loader rule, add new ESLintPlugin() to webpack plugins[]",
  },

  // ---- pypi ----
  "pypi:nose": {
    name: "pytest",
    reason: "nose is unmaintained (dead since ~2015); pytest is the standard.",
    migration:
      "pip install pytest && pytest  // replaces nosetests; test discovery is automatic",
  },
  "pypi:nose2": {
    name: "pytest",
    reason: "nose2 sees little activity; pytest is the de-facto Python test runner.",
    migration: "pip install pytest && pytest  // test discovery is automatic",
  },
  "pypi:python-dateutil": {
    name: "datetime / zoneinfo (stdlib)",
    reason: "Python 3.9+ stdlib zoneinfo covers most dateutil timezone use.",
    migration:
      "from zoneinfo import ZoneInfo  # py3.9+ stdlib, replaces dateutil.tz for most tz use",
  },
  "pypi:flask-restful": {
    name: "fastapi",
    reason: "flask-restful is largely dormant; FastAPI is the modern async API framework.",
    migration:
      "pip install fastapi uvicorn; rewrite Resource classes as FastAPI path operations",
  },
  "pypi:distribute": {
    name: "setuptools",
    reason: "distribute was merged back into setuptools years ago.",
    migration:
      "remove distribute; modern setuptools already provides its functionality",
  },
  "pypi:requests-oauthlib": {
    name: "authlib",
    reason: "authlib is more actively maintained for modern OAuth flows.",
    migration:
      "pip install authlib; use authlib.integrations.requests_client.OAuth2Session",
  },
  "pypi:pycrypto": {
    name: "pycryptodome",
    reason:
      "pycrypto is dead (last release 2014) and has unpatched CVEs; pycryptodome is the maintained drop-in.",
    migration:
      "pip uninstall pycrypto && pip install pycryptodome; same `from Crypto.Cipher import AES` imports work unchanged",
  },
  "pypi:mysql-python": {
    name: "mysqlclient",
    reason:
      "MySQL-python is dead (Python 2 only, last release 2014); mysqlclient is the maintained fork.",
    migration:
      "pip install mysqlclient; import MySQLdb still works (mysqlclient keeps the MySQLdb module name)",
  },
  "pypi:pil": {
    name: "Pillow",
    reason:
      "PIL is dead (last release 2009, Python 2 only); Pillow is the maintained fork.",
    migration:
      "pip uninstall PIL && pip install Pillow; `from PIL import Image` keeps working (Pillow ships the PIL namespace)",
  },
  "pypi:beautifulsoup": {
    name: "beautifulsoup4",
    reason:
      "the bare `BeautifulSoup` package is BeautifulSoup 3 — unmaintained; use beautifulsoup4.",
    migration:
      "pip uninstall BeautifulSoup && pip install beautifulsoup4; `from bs4 import BeautifulSoup` (was `from BeautifulSoup import BeautifulSoup`)",
  },
  "pypi:sklearn": {
    name: "scikit-learn",
    reason:
      "the `sklearn` PyPI package is a deprecated shim (it now errors on install); install scikit-learn.",
    migration:
      "pip uninstall sklearn && pip install scikit-learn; the import `import sklearn` is unchanged — only the install name differs",
  },
  "pypi:enum34": {
    name: "enum (stdlib)",
    reason:
      "enum34 is a Python 3.4 backport; enum has been in the stdlib since Python 3.4.",
    migration:
      "pip uninstall enum34; `from enum import Enum` from the standard library — no dependency needed on Python 3",
  },
  "pypi:futures": {
    name: "concurrent.futures (stdlib)",
    reason:
      "the `futures` package is a Python 2 backport; concurrent.futures is stdlib on Python 3.2+.",
    migration:
      "pip uninstall futures; `from concurrent.futures import ThreadPoolExecutor` from the stdlib — no dependency needed",
  },
  "pypi:scikits-learn": {
    name: "scikit-learn",
    reason:
      "scikits.learn was renamed to scikit-learn years ago (last release 2011).",
    migration:
      "pip uninstall scikits.learn && pip install scikit-learn; `from sklearn import ...` is the import in both",
  },
  "pypi:fabric3": {
    name: "fabric",
    reason:
      "fabric3 was a stop-gap Py3 fork; modern fabric (2.x+) supports Python 3 natively.",
    migration:
      "pip uninstall fabric3 && pip install fabric; rewrite fabfile run()/local() using the Connection/task API of Fabric 2+",
  },
  "pypi:pathlib": {
    name: "pathlib (stdlib)",
    reason:
      "the PyPI pathlib backport is obsolete and breaks modern builds; pathlib is stdlib since Python 3.4.",
    migration:
      "pip uninstall pathlib; `from pathlib import Path` from the standard library — remove it from requirements entirely",
  },
  "pypi:pep8": {
    name: "pycodestyle",
    reason: "pep8 was renamed to pycodestyle; the pep8 package is deprecated.",
    migration:
      "pip uninstall pep8 && pip install pycodestyle; run `pycodestyle <path>` (same checks, new command name)",
  },
  "pypi:nose-parameterized": {
    name: "parameterized",
    reason:
      "nose-parameterized was renamed to `parameterized` and is deprecated.",
    migration:
      "pip uninstall nose-parameterized && pip install parameterized; `from parameterized import parameterized` (was `from nose_parameterized import parameterized`)",
  },
};

export function findAlternative(
  ecosystem: Ecosystem,
  pkg: string,
): Alternative | null {
  const name =
    ecosystem === "pypi" ? normalizePypiName(pkg) : pkg.toLowerCase();
  return ALTERNATIVES[`${ecosystem}:${name}`] ?? null;
}
