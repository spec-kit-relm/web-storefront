# Research: Stock reservation at checkout — storefront slice

## Decision 1 — Where the reservation is created
- **Decision**: in the `/checkout` Server Component, before first paint; reuse the reservation in the cookie if `GET /v1/reservations/{id}` says `active` and the cart is unchanged.
- **Rationale**: notice visible with the first HTML (SC-001); no client-side service calls (WEB-2, ORG-5).
- **Alternative rejected**: client-side effect after hydration (adds a round trip, flashes the old checkout).

## Decision 2 — Countdown source of truth
- **Decision**: server sends `remainingSeconds`; the client computes a deadline from `performance.now()` at hydration.
- **Rationale**: immune to device clock skew (spec Edge Cases).

## Decision 3 — Idempotency key lifecycle
- **Decision**: new UUID per *attempt* stored in the cookie when the button is first pressed; reused on retries after 503/timeouts; cleared after confirmation or `reservation-expired`.
- **Rationale**: double-clicks and network retries hit orders-api with the same key → one order (RELM-2/US2/AS2).

## Decision 4 — Mocks
- **Decision**: Prism mock servers from the vendored contracts for local dev and consumer tests; examples for 409 `insufficient-stock`, 409 `reservation-expired`, 503.
- **Rationale**: FE-3 — mocks never drift from the pinned contract.
