# freshdeps-cli

Zero-install scanner that finds **dead / deprecated / abandoned** npm & PyPI
dependencies in your repo and prints the **hand-verified migration recipe** to
fix each one. Use it as a CI gate: non-zero exit when dead deps are present.

## What it does (and does not)

It scans your manifests, asks the live [freshdeps](https://freshdeps.vercel.app)
verdict API which dependencies are dead, and — when a dependency is dead and a
curated recipe exists — prints the exact replacement package and the
before→after change to apply.

**This is not a generic SCA / SBOM / CVE / license scanner.** It answers one
question only: *"is this dependency dead, and what do I replace it with?"* For
vulnerability/license scanning use a dedicated tool.

Manifests detected: `package.json` (npm), `requirements.txt` and
`pyproject.toml` (PyPI — both PEP 621 and Poetry).

## Zero-install usage

```sh
npx -y github:SolvoHQ/freshdeps-cli            # scan current dir
npx -y github:SolvoHQ/freshdeps-cli ./service  # scan a subdir
npx -y github:SolvoHQ/freshdeps-cli --json     # machine-readable
npx -y github:SolvoHQ/freshdeps-cli --no-fail  # report only, never exit non-zero
```

Requires **Node ≥ 20** (uses built-in `fetch`). No runtime dependencies.

## Example output

```
freshdeps — scanned 2 dependencies via https://freshdeps.vercel.app

✗ 1 dead dependency:

• request (npm) — maintenance: abandoned
  ➜ FIX: replace request with got
     npm i got && replace require('request') usage with got(...) (promise-based)
     Why: request is deprecated and unmaintained; got is the maintained successor.

freshdeps: 1 dead / 2 scanned (0 unreachable)
```

## GitHub Action

```yaml
name: freshdeps
on: [push, pull_request]
jobs:
  deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: SolvoHQ/freshdeps-cli@main
        with:
          path: .
          fail-on-dead: "true"
```

When run under GitHub Actions a markdown table of dead deps + recipes is
appended to the job summary automatically.

## pre-commit

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: freshdeps
        name: freshdeps dead-dependency gate
        entry: npx -y github:SolvoHQ/freshdeps-cli
        language: system
        pass_filenames: false
```

## Environment variables

| Var | Default | Purpose |
| --- | --- | --- |
| `FRESHDEPS_API_BASE` | `https://freshdeps.vercel.app` | verdict API base URL |
| `GOATCOUNTER_CODE` | _(unset)_ | optional analytics code (fire-and-forget) |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | no dead deps found (or `--no-fail`) |
| `1` | ≥ 1 dead dependency found |
| `2` | unexpected internal error |

Unreachable / unverifiable packages are **always printed** but never cause a
non-zero exit on their own — a flaky API or a private package must not turn
into a red pipeline. Silent-degrade is never acceptable: every skipped package
is reported.

## Curated-map only

The migration recipe is **always** a hand-verified curated entry returned by
the API. The CLI never invents, infers, or hallucinates a recipe or
alternative — if there is no curated recipe it says so explicitly.

Node ≥ 20 required.
