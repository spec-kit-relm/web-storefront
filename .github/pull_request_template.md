<!--
  Relm PR template. `sdd-gates / pr-check` reads this description.
  Pick ONE lane label: lane:feature | lane:bugfix | lane:chore | lane:governance
  Tip: /speckit.relm.pr fills this in from your spec, plan, tasks and test results.
-->

Feature: RELM-<n>
<!-- delete the line above for lane:bugfix / lane:chore / lane:governance PRs -->

## What and why
<!-- 2–4 sentences. Link the user stories this PR delivers. -->

## Traceability
- Central spec: `product-specs/specs/<NNN>-<short-name>/spec.md`
- Local spec / plan / tasks: `specs/<NNN>-<short-name>/`
- Phase(s) delivered: <!-- e.g. Phase 3 (US1) -->

## Contracts
- Provides: <!-- inventory-api@1.1.0 | none -->
- Consumes: <!-- orders-api@1.3.0 (locked in contracts.lock.md) | none -->

## Gate evidence (ORG-9)
- /speckit.analyze: <!-- paste the summary, e.g. "0 CRITICAL · 1 HIGH · 3 MEDIUM" -->
- /speckit.converge: <!-- "Converged", or the open convergence tasks (then this PR is not ready) -->
- Tests: <!-- unit ✔ integration ✔ contract (provider/consumer) ✔ -->
- Scenario IDs covered: <!-- RELM-<n>/US1/AS1, RELM-<n>/US1/AS2 -->

## Constitution
- Org baseline: v1.0.0 · Team overlay: v1.0.0 · Repo amendments: v<x.y.z>
- Exceptions used: none <!-- or rule + ADR link -->

## Checklist
- [ ] Feature flag defaults to off; rollback steps are in plan.md (ORG-7)
- [ ] No secrets / personal data in code, logs, fixtures, or prompts (ORG-5)
- [ ] If behavior or contract versions differ from the central spec, a `product-specs` PR is linked (PRD-6)
- [ ] I reviewed every AI-generated change in this PR as if I had written it (ORG-9)
