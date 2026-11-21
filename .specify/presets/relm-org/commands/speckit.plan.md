---
description: Create the implementation plan, applying Relm contract-first rules and the contract registry.
strategy: wrap
---

## Relm pre-flight (runs BEFORE the core instructions below)

1. Read `.specify/memory/constitution.md` Parts A, B and C. Fill the plan's **Constitution
   Check** with one row per MUST rule (ID, how this plan satisfies it, or the Complexity Tracking
   entry that justifies a deviation).
2. Read `contracts/` in this repository and, when available, `../product-specs/contracts/REGISTRY.md`
   and `../product-specs/specs/<NNN>-*/contracts.lock.md` to learn current owners and versions.
3. **If this repository provides an interface the feature changes:** draft the change in
   `specs/<NNN>-*/contracts/` first, bump the version (additive = MINOR, breaking = MAJOR with an
   expand → migrate → contract sequence), and list every consumer as a reviewer of the contract PR.
   Capture semantics, not only shapes: idempotency, retries, error/problem types, ordering.
4. **If this repository consumes an interface:** use ONLY the version in `contracts.lock.md`. If
   it is not locked yet, mark the dependency `BLOCKED: contract not locked` in the plan.
5. Never redesign another repository's internals; reference its contract instead.

{CORE_TEMPLATE}

## Relm post-flight (runs AFTER the core instructions above)

- Complete every **Relm Delivery Section** and every team section appended to the plan template.
- List open questions for the contract PR at the end of the plan under `## Contract Review Notes`.
