# Quickstart: verify RELM-1 in web-storefront

```bash
npm ci && npm run gen:api
npx @stoplight/prism-cli mock -p 4010 contracts/vendor/inventory-api.yaml &
npx @stoplight/prism-cli mock -p 4020 contracts/vendor/orders-api.yaml &
INVENTORY_BASE_URL=http://localhost:4010 ORDERS_BASE_URL=http://localhost:4020 \
FLAG_STOCK_RESERVATION_PERCENT=100 npm run dev
```

| Scenario | How | Expect |
|----------|-----|--------|
| RELM-1/US1/AS1 | open `/checkout` | "Items held for 15:00", counting down |
| RELM-1/US1/AS2 | Prism `Prefer: code=409` on reservations | shortage list with "Use 1" |
| RELM-1/US1/AS3 | reload | same remaining time |
| RELM-1/US2/AS2 | double-click "Place order" | one confirmation |
| RELM-1/US2/AS3 | orders mock returns 409 `reservation-expired` | expired message + "Start checkout again" |
| WEB/RELM-1/US1/AS4 | `FLAG_STOCK_RESERVATION_PERCENT=0` | today's checkout |

Automated: `npm test` (component + consumer tests with axe).
