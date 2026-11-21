# web-storefront

**The Relm Commerce web shop.** Next.js 15 (App Router), React 19, TypeScript strict.

Owner: `@spec-kit-relm/frontend` · Spec Kit project, kind **frontend** (presets `relm-org` +
`relm-frontend`, extensions `git`, `github`, `relm`) · Consumer of **inventory-api** and **orders-api**

## Interfaces consumed

| Contract | Version (pinned) | Provider |
|----------|------------------|----------|
| [`contracts/vendor/inventory-api.yaml`](contracts/vendor/inventory-api.yaml) | 1.1.0 | inventory-service |
| [`contracts/vendor/orders-api.yaml`](contracts/vendor/orders-api.yaml) | 1.3.0 | orders-service |

Provenance and the re-vendoring procedure: [`contracts/vendor/README.md`](contracts/vendor/README.md).

## Run it

```bash
npm ci
npm run gen:api      # types from the vendored contracts (WEB-2)
npm run dev          # http://localhost:3000
npm test && npm run build
```

## How we work in this repository — in order

1. **Rules**: [`.specify/memory/constitution.md`](.specify/memory/constitution.md) (ORG-*,
   FE-1 … FE-6, WEB-1 … WEB-5) and [`AGENTS.md`](AGENTS.md).
2. **Handoff**: `/speckit.relm.handoff RELM-<n>` — your stories, scenarios and locked contract versions.
3. **Specify + clarify** the UI slice (behavior only, no components).
4. **Plan** against locked versions: `/speckit.plan` fills UI states, accessibility, performance,
   generated clients and tracking plan. Vendor the locked contracts first.
5. **Tasks + analyze** → 0 CRITICAL, issues, plan PR (Gate 3).
6. **Implement** one phase per run against Prism mocks — no need to wait for the backend.
7. **Converge**, `/speckit.relm.pr`, ship with the flag **off**; the tech lead enables it in
   `impact.md` order.

## Current feature

| Feature | Directory | Role | State |
|---------|-----------|------|-------|
| RELM-1 Stock reservation at checkout | [`specs/001-stock-reservation/`](specs/001-stock-reservation/) | consumer (3rd in rollout, flag `checkout.stock-reservation`) | Approved · contracts locked · [tasks](specs/001-stock-reservation/tasks.md) ready — **next: `/speckit.implement Phase 1`** |

## Gates on every PR

`sdd / sdd-gates`, `contracts / contract-check` (vendored provenance), `ci / test` (types, tests,
build), one `@spec-kit-relm/frontend` approval.
