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
};

export function findAlternative(
  ecosystem: Ecosystem,
  pkg: string,
): Alternative | null {
  const name =
    ecosystem === "pypi" ? normalizePypiName(pkg) : pkg.toLowerCase();
  return ALTERNATIVES[`${ecosystem}:${name}`] ?? null;
}
