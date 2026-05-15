---
rule: A fetch/upstream failure must never render as a false-healthy verdict; instrument and set env BEFORE build so the product is never silently degraded
condition: Building a product whose correctness depends on live upstream calls, deployed to a build sandbox
observed_count: 2
last_updated: 2026-05-15T16:57:49+00:00
clusters:
  - cluster/product-decisions.md
  - cluster/tool-gotchas.md
---

# A fetch/upstream failure must never render as a false-healthy verdict; instrument and set env BEFORE build so the product is never silently degraded

## Statement
Silently-empty -> false-healthy is the os-alt-class P0. Wrap every upstream in timeout+try/catch returning a typed partial, surface partial/unknown explicitly, and set all required env vars into Production scope BEFORE the first deploy so the build does not bake in a degraded first pass.

## When it applies
Any verdict/data product where a missing source could be misread as a positive result.

## Evidence (observed in clusters)
- cluster/product-decisions.md — "Correctness premise: never false-healthy on fetch failure, never hallucinate an alternative"
- cluster/tool-gotchas.md — "Set env vars into Production scope BEFORE first deploy or product silently degrades"

## Mechanism
A green build + green deploy is not proof of a correct product; the failure (missing token -> all 'unknown' but no error) is invisible unless correctness is asserted independently against live output.
