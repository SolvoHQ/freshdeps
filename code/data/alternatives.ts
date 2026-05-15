import { normalizePypiName, type Ecosystem } from "../lib/verdict";

export interface Alternative {
  name: string;
  reason: string;
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
  },
  "npm:moment": {
    name: "dayjs",
    reason: "moment is in maintenance mode; dayjs is a 2KB modern alternative.",
  },
  "npm:node-sass": {
    name: "sass",
    reason: "node-sass is deprecated; the Dart-based `sass` is the official path.",
  },
  "npm:querystring": {
    name: "URLSearchParams (built-in)",
    reason: "Node's legacy querystring is deprecated; use the WHATWG URLSearchParams.",
  },
  "npm:colors": {
    name: "chalk",
    reason: "colors had a sabotage incident (2022); chalk is the maintained standard.",
  },
  "npm:faker": {
    name: "@faker-js/faker",
    reason: "the original faker was sabotaged/unpublished; @faker-js/faker is the community fork.",
  },
  "npm:left-pad": {
    name: "String.prototype.padStart (built-in)",
    reason: "native string padding makes the dependency unnecessary.",
  },
  "npm:tslint": {
    name: "eslint",
    reason: "TSLint was deprecated in 2019 in favor of typescript-eslint.",
  },
  "npm:istanbul": {
    name: "nyc",
    reason: "the istanbul package is superseded by nyc / c8.",
  },
  "npm:gulp-util": {
    name: "fancy-log + plugin-error",
    reason: "gulp-util was deprecated and split into smaller modules.",
  },
  "npm:babel-core": {
    name: "@babel/core",
    reason: "Babel 6 packages are unmaintained; use the scoped @babel/* (v7+).",
  },
  "npm:bower": {
    name: "npm / yarn",
    reason: "Bower is deprecated; modern bundlers use npm/yarn package resolution.",
  },
  "npm:tape": {
    name: "vitest",
    reason: "tape is minimally maintained; vitest is a fast modern test runner.",
  },
  "npm:nodemon": {
    name: "node --watch (built-in)",
    reason: "Node 18+ ships a native --watch mode for most dev-restart needs.",
  },

  // ---- pypi ----
  "pypi:nose": {
    name: "pytest",
    reason: "nose is unmaintained (dead since ~2015); pytest is the standard.",
  },
  "pypi:nose2": {
    name: "pytest",
    reason: "nose2 sees little activity; pytest is the de-facto Python test runner.",
  },
  "pypi:python-dateutil": {
    name: "datetime / zoneinfo (stdlib)",
    reason: "Python 3.9+ stdlib zoneinfo covers most dateutil timezone use.",
  },
  "pypi:flask-restful": {
    name: "fastapi",
    reason: "flask-restful is largely dormant; FastAPI is the modern async API framework.",
  },
  "pypi:distribute": {
    name: "setuptools",
    reason: "distribute was merged back into setuptools years ago.",
  },
  "pypi:requests-oauthlib": {
    name: "authlib",
    reason: "authlib is more actively maintained for modern OAuth flows.",
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
