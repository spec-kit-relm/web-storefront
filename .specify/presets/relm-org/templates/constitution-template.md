# [PROJECT_NAME] Constitution

> **How this constitution is layered (Relm SDD).**
> Part A is the organization baseline and Part B is the team overlay. Both are synced from
> `spec-kit-relm/speckit-platform` and MUST NOT be edited in this repository. Part C holds this
> repository's own amendments: they may add or tighten rules, never relax Parts A or B.
> Every Spec Kit command reads this file; `/speckit.analyze` treats any MUST violation as CRITICAL.

<!-- BEGIN RELM:ORG-BASELINE v1.0.0 | source: spec-kit-relm/speckit-platform/governance/org-baseline.md | DO NOT EDIT OUTSIDE speckit-platform -->
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
