# Implementation Plan: Stock reservation at checkout — storefront slice

**Branch**: `002-stock-reservation` | **Date**: 2026-11-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-stock-reservation/spec.md`

## Summary

Behind flag `checkout.stock-reservation`, the checkout route's Server Component creates (or reuses)
the cart's reservation via a server-side API wrapper over the generated inventory-api 1.1.1 types,
renders a `HoldNotice` client component (countdown from `remainingSeconds`, polite live-region
announcements at 5 min / 1 min / 0), a `ShortageList`, and a `PlaceOrderButton` that posts through a
Server Action to orders-api 1.3.1 with `reservationId` and a per-attempt `Idempotency-Key` kept in
an HTTP-only cookie. Problem types map to i18n messages.

## Technical Context

**Language/Version**: TypeScript 5.7 (strict), Node 22

**Primary Dependencies**: Next.js 15 (App Router, Server Actions), React 19, openapi-typescript (types from vendored contracts), Prism (mock server from the same contracts)

**Storage**: HTTP-only same-site cookie `relm_checkout` (cartId, reservationId, attemptKey) — no localStorage (WEB-4)

**Testing**: Vitest + Testing Library + vitest-axe; consumer contract tests with Prism mocks generated from `contracts/vendor/*.yaml`

**Target Platform**: Node 22 server + evergreen browsers

**Project Type**: web application (frontend + BFF in one Next.js app)

**Performance Goals**: hold notice visible ≤ 1 s p95 (server render includes reservation)

**Constraints**: LCP < 2.5 s, INP < 200 ms p75 on `/checkout`; JS delta ≤ +5 KB (countdown only)

**Scale/Scope**: 1 route changed (`/checkout`), 3 new components, 2 API wrappers

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | How this plan complies | Status |
|------|------------------------|--------|
| ORG-1/2 | RELM-2 local spec approved, technology-free | ✅ |
| ORG-3 | consumes inventory-api 1.1.1 + orders-api 1.3.1 — vendored, locked | ✅ |
| ORG-4 | Component tests with scenario IDs; consumer tests incl. 409/503 problems | ✅ |
| ORG-5 | No personal data stored client-side; service token server-side only | ✅ |
| ORG-6 | RUM timing for hold notice; analytics events (no PII) | ✅ |
| ORG-7 | Flag `checkout.stock-reservation` default off; percentage rollout | ✅ |
| ORG-8 | No new runtime dependency (countdown hand-written, ~1 KB) | ✅ |
| ORG-9 | Phase-sized runs | ✅ |
| FE-1 … FE-6 | UI states table, axe, generated types only, budgets, i18n, no PII | ✅ |
| WEB-1 … WEB-5 | App Router + RSC; `src/api` wrappers; Vitest + axe; HTTP-only cookie; i18n keys | ✅ |

## Project Structure

### Documentation (this feature)

```text
specs/002-stock-reservation/
├── plan.md  research.md  quickstart.md  tasks.md
```

### Source Code (repository root)

```text
app/checkout/page.tsx              Server Component: flag check, reservation create/reuse
app/checkout/actions.ts            Server Actions: placeOrder, restartCheckout
src/api/inventory.ts               wrapper over generated inventory types (server-only)
src/api/orders.ts                  wrapper over generated orders types (server-only)
src/api/problems.ts                problem type → i18n key mapping
src/components/checkout/HoldNotice.tsx        "use client" countdown + live region
src/components/checkout/ShortageList.tsx
src/components/checkout/PlaceOrderButton.tsx  "use client", disabled while pending/expired
src/flags.ts                       flag evaluation (percentage by cartId hash)
src/i18n/en.ts                     new checkout.* keys
```

**Structure Decision**: single Next.js app; service calls only on the server (`server-only` import guard).

## Complexity Tracking

> No constitution violations to justify.

---

## Relm Delivery Sections *(mandatory — ORG-3, ORG-5, ORG-6, ORG-7)*

### Contracts & Versions (ORG-3)

| Interface | Role | Contract file | Locked version | Change | Consumers / provider |
|-----------|------|---------------|----------------|--------|----------------------|
| Inventory API — reservations | consumes | `contracts/vendor/inventory-api.yaml` | 1.1.1 | — | provider: inventory-service |
| Orders API — placeOrder | consumes | `contracts/vendor/orders-api.yaml` | 1.3.1 | — | provider: orders-service |

### Observability (ORG-6)

| Success criterion (from spec) | Signal (metric / log / trace) | Dashboard or alert |
|-------------------------------|-------------------------------|--------------------|
| SC-001 notice ≤ 1 s p95 | RUM mark `checkout_hold_visible` | "Storefront — checkout" dashboard |
| SC-002 conversion | analytics funnel `checkout_started → order_confirmed` by flag variant | same dashboard, per rollout step |
| SC-003 a11y | axe CI results | CI |

### Feature flag, rollout & rollback (ORG-7)

- **Flag**: `checkout.stock-reservation` — default **off**; percentage by hash(cartId).
- **Rollout position** (from impact.md): 3 of 4 deploy (flag off), then step 5: 5 % → 50 % → 100 %.
- **Rollback**: flag off (immediate). Code rollback not required.

### Security & privacy (ORG-5)

- **AuthN / AuthZ**: service tokens with `inventory:reserve` / `orders:place` used only on the server.
- **Personal data touched**: none new; cookie holds opaque IDs only (WEB-4).
- **Secrets / config**: `INVENTORY_BASE_URL`, `ORDERS_BASE_URL`, `SERVICE_TOKEN` (secret), `FLAG_STOCK_RESERVATION_PERCENT`.

### Frontend: UI states (FE-2)

| Screen / component | Loading | Empty | Error (problem type → message key) | Partial | Success |
|--------------------|---------|-------|------------------------------------|---------|---------|
| HoldNotice | skeleton line (server-rendered, rarely seen) | n/a (no hold → not rendered) | `temporarily-unavailable` → `checkout.hold.unavailable` (checkout continues without hold, flag treated as off) | — | "Items held for mm:ss" |
| ShortageList | — | not rendered | — | `insufficient-stock` → `checkout.shortage.item` with "Use {n}" | — |
| PlaceOrderButton | "Placing order…" disabled | — | `reservation-expired` → `checkout.hold.expired` + "Start again"; `temporarily-unavailable` → `checkout.order.retry` | — | redirect to confirmation |
| Checkout (expired) | — | — | — | — | `checkout.hold.expiredOnReturn` + "Start checkout again"; order disabled |

### Frontend: accessibility (FE-1)

- Keyboard flow: ShortageList "Use N" buttons in DOM order; focus moves to the message after errors.
- Screen-reader announcements: `aria-live="polite"` region updated at 5:00, 1:00, 0:00 only (FR-006); visual timer is `aria-hidden`.
- axe scope: HoldNotice, ShortageList, PlaceOrderButton in all states (component tests).

### Frontend: performance budget (FE-4)

| Route | LCP p75 budget | INP p75 budget | JS bundle budget (delta) |
|-------|----------------|----------------|--------------------------|
| /checkout | < 2.5 s | < 200 ms | +5 KB max |

### Frontend: API clients & mocks (FE-3)

- Generated types: `npm run gen:api` from `contracts/vendor/inventory-api.yaml@1.1.0` and `orders-api.yaml@1.3.0`.
- Mock server: Prism (`npx @stoplight/prism-cli mock contracts/vendor/<name>.yaml`) for dev and consumer tests.

### Frontend: analytics tracking plan (FE-6)

| Event | Trigger | Properties (no PII) | Success criterion it measures |
|-------|---------|---------------------|-------------------------------|
| checkout_hold_shown | HoldNotice rendered | lineCount, ttlSeconds, variant | SC-001 |
| checkout_shortage_shown | ShortageList rendered | shortLineCount | — |
| checkout_hold_expired | expired state shown | where (onPage / onReturn) | — |
| order_confirmed (existing) | confirmation | variant | SC-002 |
