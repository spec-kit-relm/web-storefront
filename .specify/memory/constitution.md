<!--
Sync Impact Report
- Version change: template → 1.0.0 (initial ratification)
- Part A: RELM:ORG-BASELINE v1.0.0 (synced, unchanged)
- Part B: RELM:TEAM-FRONTEND v1.0.0 (synced, unchanged)
- Part C: added WEB-1, WEB-2, WEB-3, WEB-4, WEB-5
- Templates: provided by presets relm-org + relm-frontend (runtime resolution, no file edits)
- Deferred TODOs: none
-->
# web-storefront Constitution

> **How this constitution is layered (Relm SDD).**
> Part A is the organization baseline and Part B is the team overlay. Both are synced from
> `spec-kit-relm/speckit-platform` and MUST NOT be edited in this repository. Part C holds this
> repository's own amendments: they may add or tighten rules, never relax Parts A or B.
> Every Spec Kit command reads this file; `/speckit.analyze` treats any MUST violation as CRITICAL.

<!-- BEGIN RELM:ORG-BASELINE v1.0.0 | source: spec-kit-relm/speckit-platform/presets/relm-org/templates/constitution-template.md | DO NOT EDIT OUTSIDE speckit-platform -->
## Part A — Relm Organization Baseline (MUST)

These principles apply to every Relm repository. They are deliberately few and every one of
them names the check that enforces it. Lower layers (team overlay, repository amendments) may
**add or tighten** rules, never relax or contradict them.

### ORG-1 Spec before code
Any change that alters user-visible behavior, a public contract, or persisted data MUST trace to
a Spec Kit feature (`Feature: RELM-<n>`) or to a declared lightweight lane (`lane:bugfix`,
`lane:chore`) on the pull request.
*Check: `sdd-gates / pr-check`.*

### ORG-2 Specs describe WHAT and WHY, never HOW
`spec.md` contains no frameworks, languages, or storage choices. Every user story has
Given/When/Then acceptance scenarios and measurable success criteria. No
`[NEEDS CLARIFICATION]` marker may remain once a spec's status is `Approved` or later.
*Check: `sdd-gates / spec-lint`, `/speckit.analyze`.*

### ORG-3 Contract-first integration
Every cross-repository interaction (HTTP, events, shared schemas) is defined in a versioned
contract (OpenAPI 3.1 or AsyncAPI 3) with exactly one owning (provider) repository. Consumers pin a
version and treat vendored copies as read-only. Breaking changes require a MAJOR version and the
expand → migrate → contract sequence.
*Check: `contract-check` workflow, consumer review on contract PRs.*

### ORG-4 Tests prove the spec
Each acceptance scenario maps to at least one automated test that carries its scenario ID
(e.g. `RELM-1/US1/AS2`). Every interface touched by a feature has provider verification and
consumer contract tests, including negative cases. Tests land in the same pull request as the
behavior they verify.
*Check: CI test jobs, `/speckit.converge`, QA review.*

### ORG-5 Secure and private by default
No secrets in code, specs, prompts, or logs. Every endpoint enforces authentication and
authorization. Personal data is classified in `data-model.md` and never logged or sent to analytics.
*Check: secret scanning, CodeQL, dependency review, PR review.*

### ORG-6 Observable by design
Services emit structured logs carrying a trace ID and RED metrics (rate, errors, duration) per
endpoint or consumer. Every feature states how each success criterion is measured in production.
*Check: plan review (`Observability` section), dashboards linked before release.*

### ORG-7 Safe, reversible delivery
New behavior ships behind a feature flag, is deployed in the dependency order defined in the
product feature's `impact.md`, and has a rollback path written in `plan.md`.
*Check: plan review, release-readiness gate.*

### ORG-8 Simplicity, justified complexity
No new service, datastore, message broker, or major dependency without an accepted ADR. Any
deviation from these principles is recorded in the plan's Complexity Tracking table.
*Check: `/speckit.analyze`, architecture review.*

### ORG-9 Humans own AI output
A named human owns every pull request and reviews AI-generated code to the same standard as
hand-written code. `/speckit.analyze` reports **0 CRITICAL** findings before `/speckit.implement`,
implementation runs are scoped to one phase at a time, and `/speckit.converge` reports converged
before merge.
*Check: PR template, CODEOWNERS, `sdd-gates / pr-check`.*

### Organization governance
- **Precedence**: Org baseline (Part A) > team overlay (Part B) > repository amendments (Part C).
  If an agent finds a conflict between layers it MUST stop and report it, not choose.
- **Amendments**: only by pull request to `spec-kit-relm/speckit-platform` (`governance/`), reviewed
  by the SDD Guild plus one approver per discipline. Versioned with semantic versioning
  (MAJOR = principle removed/redefined, MINOR = principle added/expanded, PATCH = wording).
- **Propagation**: the propagation bot opens a sync PR in every repository. Repositories MUST be on
  the same MAJOR and at most one MINOR behind; `sdd-gates / constitution-check` fails otherwise.
- **Exceptions**: listed in Part C → *Exceptions* with an ADR link, an owner, and an expiry date.
<!-- END RELM:ORG-BASELINE -->



<!-- BEGIN RELM:TEAM-FRONTEND v1.0.0 | source: spec-kit-relm/speckit-platform/presets/relm-frontend/templates/constitution-template.md | owner: @spec-kit-relm/frontend | DO NOT EDIT OUTSIDE speckit-platform -->
## Part B — Frontend Team Overlay (MUST)

Applies to every user-facing application owned by `@spec-kit-relm/frontend`. Framework and
tooling specifics belong in Part C of each repository.

### FE-1 Accessible by default
UI meets WCAG 2.2 AA. Every interactive element is keyboard-operable and labelled; automated
axe checks report zero serious or critical violations on changed screens.
*Check: axe in component and E2E tests, design review.*

### FE-2 Every state is specified
For every screen or component a feature touches, the plan defines loading, empty, error,
partial, and success states, plus the copy for each. Error states map to the provider's
documented problem types.
*Check: plan review (`UI States` table), QA checklist `ux`.*

### FE-3 Contracts, not guesses
Frontend code talks to backend services only through API clients generated from the pinned
contract version. Hand-written requests to service endpoints are not allowed. Mock servers are
generated from the same pinned contract.
*Check: lint rule `no-restricted-imports` / `no-raw-fetch`, consumer contract tests.*

### FE-4 Performance budgets
Changed routes stay within budget: LCP < 2.5 s and INP < 200 ms at p75, and no route's JS bundle
grows by more than 10 % without a justified Complexity Tracking entry.
*Check: Lighthouse CI and bundle-size check on the PR.*

### FE-5 Design system and i18n
Use components from the design system; new primitives need a design-system PR first. No
user-facing string is hard-coded; all copy goes through the i18n catalog.
*Check: lint rules, design review.*

### FE-6 Privacy in the browser
No personal data in `localStorage`, URLs, or analytics payloads. Analytics events are declared in
the spec's tracking plan before they are implemented.
*Check: PR review, analytics schema validation.*
<!-- END RELM:TEAM-FRONTEND -->

## Part C — Repository Amendments (MUST)

### WEB-1 Next.js App Router, strict TypeScript
Next.js 15 App Router, React 19, TypeScript `strict` + `noUncheckedIndexedAccess`. Server
Components by default; `"use client"` only for interactive leaves (countdown, forms).
*Check: `npm run typecheck`, `next build` in CI.*

### WEB-2 Generated API clients only
Types and clients for Relm services are generated by `npm run gen:api` from
`contracts/vendor/*.yaml` into `src/api/generated/` (never edited, never committed). All service
calls go through `src/api/*.ts` wrappers built on those types (tightens FE-3).
*Check: `no-restricted-syntax` lint rule forbidding `fetch(` outside `src/api/`; consumer contract tests.*

### WEB-3 Test stack
Unit/component tests with Vitest + Testing Library + `vitest-axe`; component tests that verify a
scenario start with its ID. Cross-service journeys belong to `e2e-tests`, not here.
*Check: `npm test` in CI; axe assertions in component tests (FE-1).*

### WEB-4 Checkout state never leaks personal data
Reservation and order identifiers live in an HTTP-only, same-site cookie set by the server; no
cart contents, reservation IDs or personal data in `localStorage`, URLs or analytics (tightens FE-6).
*Check: PR review; analytics schema validation.*

### WEB-5 Copy through the i18n catalog
Every user-facing string is a key in `src/i18n/*.ts`; components never contain literal copy
(tightens FE-5).
*Check: i18n catalog test; lint rule `react/jsx-no-literals` on `app/` and `src/components/`.*

### Exceptions
None. <!-- Format: | Rule | Exception | ADR | Owner | Expires | -->

## Repository governance
- Part C is amended by pull request in this repository, approved by the CODEOWNERS of
  `.specify/memory/`, on a dedicated `governance/*` branch (never inside a feature branch).
- Parts A and B change only through the automated governance sync pull request.

**Version**: 1.0.0 | **Ratified**: 2026-11-21 | **Last Amended**: 2026-11-21
**Governance blocks**: RELM:ORG-BASELINE v1.0.0 · RELM:TEAM-FRONTEND v1.0.0
