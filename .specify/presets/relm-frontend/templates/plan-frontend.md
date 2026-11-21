
### Frontend: UI states (FE-2)

| Screen / component | Loading | Empty | Error (problem type → message key) | Partial | Success |
|--------------------|---------|-------|------------------------------------|---------|---------|
| [CheckoutSummary] | [skeleton] | [n/a] | [`out-of-stock` → `checkout.error.outOfStock`] | [some items unavailable] | [timer visible] |

### Frontend: accessibility (FE-1)

- Keyboard flow: [tab order, focus management after errors]
- Screen-reader announcements: [live regions, labels]
- axe scope: [routes/components scanned in CI]

### Frontend: performance budget (FE-4)

| Route | LCP p75 budget | INP p75 budget | JS bundle budget (delta) |
|-------|----------------|----------------|--------------------------|
| [/checkout] | [< 2.5 s] | [< 200 ms] | [+5 KB max] |

### Frontend: API clients & mocks (FE-3)

- Generated clients: [package/version generated from contract@version]
- Mock server: [generated from the same pinned contract]

### Frontend: analytics tracking plan (FE-6)

| Event | Trigger | Properties (no PII) | Success criterion it measures |
|-------|---------|---------------------|-------------------------------|
| [checkout_reservation_shown] | [timer rendered] | [itemCount, ttlSeconds] | [SC-002] |
