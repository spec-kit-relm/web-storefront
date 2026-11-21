# Feature Specification: Stock reservation at checkout — storefront slice

**Feature Branch**: `001-stock-reservation`

**Created**: 2026-11-20

**Status**: Approved

**Input**: User description: "RELM-1 stock-reservation: web-storefront slice from the handoff brief — when the shopper starts checkout, hold the cart, show how long the hold lasts, explain shortages, place the order against the hold exactly once, and show an expired state with a way to start again. Everything behind a switch that can be turned on for a percentage of shoppers."

## Clarifications

### Session 2026-11-20

- Q: How is remaining time shown? → A: As minutes:seconds, updated every second visually; screen readers are told the time only at 5 min, 1 min and expiry.
- Q: What happens when the timer reaches zero while the shopper is on the page? → A: The page switches to the expired state immediately; the order button is disabled.
- Q: What does the shopper see when the feature is switched off? → A: Today's checkout, unchanged.
- Q: Can the shopper fix a shortage on the checkout page? → A: Yes — the short item shows the available quantity with a one-click "use N" action, then checkout starts again.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See the hold when checkout starts (Priority: P1)

The shopper opens checkout and sees that items are held and for how long.

**Why this priority**: Central US1 — the visible part of the feature.

**Independent Test**: With the switch on and a mocked in-stock cart, open checkout; the hold timer appears; reload shows the same remaining time.

**Acceptance Scenarios**:

1. **Given** an in-stock cart and the switch on, **When** the shopper opens checkout, **Then** a notice says items are held and shows the remaining time starting at 15:00. *[RELM-1/US1/AS1]*
2. **Given** a cart where one item is short, **When** the shopper opens checkout, **Then** the short item shows how many are available with an option to use that quantity, and no timer is shown. *[RELM-1/US1/AS2]*
3. **Given** an active hold, **When** the shopper reloads checkout, **Then** the same remaining time is shown (not reset). *[RELM-1/US1/AS3]*
4. **Given** the switch off, **When** the shopper opens checkout, **Then** today's checkout is shown with no hold notice.

---

### User Story 2 - Place the order once (Priority: P1)

Placing the order uses the hold, and repeated clicks never produce two orders.

**Why this priority**: Central US2 — duplicate orders and expired-hold confusion are the main risks.

**Independent Test**: Double-click "Place order" against mocks; one confirmation; with an expired-hold response, the expired message appears.

**Acceptance Scenarios**:

1. **Given** an active hold, **When** the shopper clicks "Place order" twice quickly, **Then** one confirmation page is shown for one order. *[RELM-1/US2/AS2]*
2. **Given** the hold expired, **When** the shopper places the order, **Then** a message says the hold expired and offers "Start checkout again". *[RELM-1/US2/AS3]*
3. **Given** a temporary failure, **When** the shopper places the order, **Then** a retry message is shown and retrying does not create a second order.

---

### User Story 3 - Expired hold on return (Priority: P2)

A shopper who comes back after the hold expired understands what happened and can continue.

**Why this priority**: Central US3/AS2 — reduces abandoned checkouts after expiry.

**Independent Test**: Load checkout with an expired hold (mocked); expired state with "Start checkout again".

**Acceptance Scenarios**:

1. **Given** the hold expired while the shopper was away, **When** checkout is shown, **Then** the expired state is shown with "Start checkout again" and the order button is disabled. *[RELM-1/US3/AS2]*
2. **Given** the timer reaches zero while the shopper is on the page, **When** it hits zero, **Then** the page switches to the expired state without a reload.

---

### Edge Cases

- Clock skew on the shopper's device: remaining time comes from the server's `remainingSeconds`, not the device clock.
- Two tabs open: the second tab shows the same hold; starting again in one tab makes the other show "cart changed — reload".
- Slow network on "Place order": button shows progress and is disabled; the same idempotency key is reused on retry.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: With the switch on, opening checkout MUST request a hold for the cart and show its remaining time.
- **FR-002**: Remaining time MUST come from the server and survive reloads.
- **FR-003**: Shortages MUST show the available quantity per item with a one-click adjustment.
- **FR-004**: "Place order" MUST send the hold and a per-attempt idempotency key that is reused on retries of the same attempt.
- **FR-005**: An expired hold MUST disable ordering and offer "Start checkout again".
- **FR-006**: The countdown MUST be announced to assistive technology only at 5 min, 1 min and expiry.
- **FR-007**: With the switch off, checkout MUST behave exactly as before.

### Key Entities *(include if feature involves data)*

- **Checkout session**: cart reference, hold reference, current attempt key — kept server-side.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95 % of checkout opens show the hold notice within 1 second (central SC-002).
- **SC-002**: Checkout conversion drops no more than 1 percentage point (central SC-004).
- **SC-003**: Zero serious or critical accessibility violations on checkout states.

## Assumptions

- The storefront server (Next.js) calls inventory and orders with a service token; browsers never call services directly.

---

## Relm Traceability *(mandatory — ORG-1, PRD-1, QA-2)*

**Feature ID**: RELM-1
**Central spec**: [product-specs/specs/001-stock-reservation/spec.md](https://github.com/spec-kit-relm/product-specs/blob/main/specs/001-stock-reservation/spec.md)
**Repository role**: consumer
**Contracts provided**: none
**Contracts consumed**: inventory-api@1.1.0 (pinned), orders-api@1.3.0 (pinned)
**Product stories covered**: RELM-1 US1 (AS1–AS3), US2 (AS2, AS3), US3 (AS2)

**Status lifecycle**: Draft → In Review → Approved → Implemented → Released

### Scenario IDs
Central scenario IDs in brackets. Repository-only scenarios (US1 AS4, US2 AS3, US3 AS2) use
`WEB/RELM-1/US<k>/AS<m>` in test titles.
