---
description: "Task list for RELM-1 stock reservation — web-storefront slice"
---

# Tasks: Stock reservation at checkout — storefront slice

**Input**: Design documents from `/specs/001-stock-reservation/`

**Prerequisites**: plan.md, spec.md, research.md, vendored contracts inventory-api 1.1.0 + orders-api 1.3.0 (locked)

**Tests**: Mandatory at Relm (ORG-4). Component tests include axe assertions (FE-1).

**Organization**: grouped by user story; each phase fits one `/speckit.implement` run.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Add dev deps `@testing-library/react`, `@testing-library/user-event`, `jsdom`, `vitest-axe`, `@stoplight/prism-cli`, `server-only`; configure `vitest.config.ts` (jsdom, setup file with axe matchers)
- [ ] T002 [P] ESLint rules: forbid `fetch(` outside `src/api/` (WEB-2), `react/jsx-no-literals` in `app/` and `src/components/` (WEB-5)
- [ ] T003 [P] `npm run mock` script starting Prism for both vendored contracts (research Decision 4)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 `src/flags.ts`: `checkout.stock-reservation` percentage by hash(cartId), default off (ORG-7)
- [ ] T005 [P] `src/api/inventory.ts` (server-only): `createReservation`, `getReservation` on generated types; 300 ms timeout
- [ ] T006 [P] `src/api/orders.ts` (server-only): `placeOrder(reservationId, attemptKey)`
- [ ] T007 [P] `src/api/problems.ts`: problem `type` → i18n key mapping per plan UI-states table; unit tests for every documented problem type
- [ ] T008 Checkout cookie helpers (HTTP-only, same-site, opaque IDs only) in `src/checkout/session.ts` (WEB-4)
- [ ] T009 Consumer contract tests `src/api/*.contract.test.ts` against Prism mocks: 201, 409 `insufficient-stock`, 409 `reservation-expired`, 503 (ORG-4)
- [ ] T010 Add `checkout.*` keys to `src/i18n/en.ts` (WEB-5)

**Checkpoint**: typed, mocked access to both services

---

## Phase 3: User Story 1 - See the hold when checkout starts (Priority: P1) 🎯 MVP

### Tests for User Story 1 ⚠️

- [ ] T011 [P] [US1] Component test `RELM-1/US1/AS1 HoldNotice shows 15:00 and counts down` + axe
- [ ] T012 [P] [US1] Component test `RELM-1/US1/AS2 ShortageList shows available quantity with Use N` + axe
- [ ] T013 [P] [US1] Page test `RELM-1/US1/AS3 reload reuses reservation and remaining time` (mocked API wrapper)
- [ ] T014 [P] [US1] Page test `WEB/RELM-1/US1/AS4 flag off renders today's checkout`
- [ ] T015 [P] [US1] Component test: live region announces only at 5:00, 1:00, 0:00 (FR-006)

### Implementation for User Story 1

- [ ] T016 [US1] `HoldNotice.tsx` ("use client"): deadline from `remainingSeconds` (research Decision 2)
- [ ] T017 [US1] `ShortageList.tsx` with "Use N" → `restartCheckout` Server Action
- [ ] T018 [US1] `app/checkout/page.tsx`: flag check, create/reuse reservation (research Decision 1)
- [ ] T019 [US1] Analytics `checkout_hold_shown`, `checkout_shortage_shown`; RUM mark `checkout_hold_visible`

---

## Phase 4: User Story 2 - Place the order once (Priority: P1)

### Tests for User Story 2 ⚠️

- [ ] T020 [P] [US2] Component test `RELM-1/US2/AS2 double click sends one attempt key and shows one confirmation`
- [ ] T021 [P] [US2] Component test `RELM-1/US2/AS3 reservation-expired shows message and Start again` + axe
- [ ] T022 [P] [US2] Component test `WEB/RELM-1/US2/AS3 503 shows retry and reuses the attempt key`

### Implementation for User Story 2

- [ ] T023 [US2] `PlaceOrderButton.tsx` (pending/disabled states) and `placeOrder` Server Action with attempt-key lifecycle (research Decision 3)

---

## Phase 5: User Story 3 - Expired hold on return (Priority: P2)

### Tests for User Story 3 ⚠️

- [ ] T024 [P] [US3] Page test `RELM-1/US3/AS2 expired reservation on return shows expired state, order disabled` + axe
- [ ] T025 [P] [US3] Component test `WEB/RELM-1/US3/AS2 timer reaching zero switches to expired without reload`

### Implementation for User Story 3

- [ ] T026 [US3] Expired state in `page.tsx` + `HoldNotice` zero transition; analytics `checkout_hold_expired`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T027 [P] Lighthouse CI budget for `/checkout` and bundle-size check (+5 KB) in CI (FE-4)
- [ ] T028 [P] Dashboard "Storefront — checkout" with variant split (ORG-6)
- [ ] T029 Update `AGENTS.md` Layout and `README.md`

---

## Phase R: Relm Verification & Handoff *(mandatory, always the last phase — ORG-3, ORG-4, ORG-9, PRD-6)*

- [ ] TR01 Provider verification and consumer contract tests pass against the locked contract versions, including negative cases
- [ ] TR02 Every acceptance scenario `RELM-1/US<k>/AS<m>` in scope has an automated test whose title starts with that ID
- [ ] TR03 Feature flag defaults to off; rollback steps from plan.md verified in a non-production environment
- [ ] TR04 Run `/speckit.converge`; resolve every appended convergence task until it reports **Converged**
- [ ] TR05 If shipped behavior or contract versions differ from the central spec, open a PR in `product-specs` updating `spec.md` / `contracts.lock.md`
- [ ] TR06 Open the pull request with the Relm PR template (Feature ID, contracts, analyze + converge evidence, scenario coverage)

---

## Dependencies & Execution Order

- Phase 1 → 2 → US1 → US2 → US3 → 6 → R. Works entirely against Prism mocks; staging integration needs inventory Phase 3 and orders Phase 3 deployed.

## Implementation Strategy

- One `/speckit.implement` run per phase; PRs per phase. Ship with the flag off; QA enables it for test carts in staging.
