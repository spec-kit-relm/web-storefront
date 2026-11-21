---
description: Generate tasks, applying Relm's mandatory test, contract and verification rules.
strategy: wrap
---

## Relm rules for task generation (apply while following the core instructions below)

- Tests are **not optional** at Relm (ORG-4): for every user story phase, generate test tasks
  before implementation tasks, even if the core template marks tests as optional.
- For every interface in the plan's *Contracts & Versions* table, add provider-verification or
  consumer-contract test tasks, including at least one negative case (error/problem type,
  duplicate request, timeout).
- Test task descriptions start with the scenario ID they cover (`RELM-<n>/US<k>/AS<m>`).
- Add a task for the feature flag (default off) in the Foundational phase.
- Keep each phase small enough for one scoped `/speckit.implement` run (≈ 5–12 tasks).
- Always end with **Phase R: Relm Verification & Handoff** exactly as in the template.

{CORE_TEMPLATE}
