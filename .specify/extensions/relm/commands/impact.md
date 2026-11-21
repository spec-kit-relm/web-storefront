---
description: "product-specs only: create impact.md and contracts.lock.md for the active product feature"
---

# Relm: build the impact map for a product feature

## User Input

$ARGUMENTS

## Preconditions

- You are in `spec-kit-relm/product-specs` (its constitution contains `RELM:TEAM-PRODUCT`).
  If not, stop and explain that impact maps live only in product-specs.
- The active feature (see `.specify/feature.json`, or the directory the user names) has a
  `spec.md` that has been through `/speckit.clarify`.

## Steps

1. Load the feature `spec.md`, `contracts/REGISTRY.md`, and `workspace/repositories.yml`
   (the catalog of Relm repositories, their teams, and the interfaces they own).
2. Render the templates with the Spec Kit resolver so presets apply:
   ```bash
   source .specify/scripts/bash/common.sh
   resolve_template_content impact-template "$PWD"           # -> impact.md
   resolve_template_content contracts-lock-template "$PWD"   # -> contracts.lock.md
   ```
3. For every user story and acceptance scenario, decide which repositories must change. Use
   the interfaces in `REGISTRY.md` to name providers and consumers. Do **not** design
   internals — only who changes, which interface, and whether the change is none/additive/breaking.
4. Propose the rollout order: providers before consumers, flags off; enabling the flag is the last
   step. Propose the rollback order: reverse, consumers first.
5. Estimate each repository slice; if any slice is larger than ~5 dev-days, recommend splitting
   the product feature (PRD-5).
6. Write `impact.md` and a `contracts.lock.md` whose rows are in status `draft`.
7. Report: participating repositories, owners to assign, contracts that need a contract PR, and
   the next step (Gate 1 spec review PR).
