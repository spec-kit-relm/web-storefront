
---

## Relm Delivery Sections *(mandatory — ORG-3, ORG-5, ORG-6, ORG-7)*

### Contracts & Versions (ORG-3)

| Interface | Role | Contract file | Locked version | Change | Consumers / provider |
|-----------|------|---------------|----------------|--------|----------------------|
| [e.g. Inventory API — reservations] | [provides / consumes] | [contracts/inventory-api.yaml] | [1.1.0] | [none / additive / breaking] | [orders-service, web-storefront] |

> Provider repos: draft changes in `specs/NNN-*/contracts/`, then promote them to
> `contracts/<name>.yaml` in a **contract PR** reviewed by every consumer (Gate 2).
> Consumer repos: reference only versions listed in the product feature's `contracts.lock.md`.

### Observability (ORG-6)

| Success criterion (from spec) | Signal (metric / log / trace) | Dashboard or alert |
|-------------------------------|-------------------------------|--------------------|
| [SC-001] | [e.g. `reservation_created_total`, p95 latency] | [link or "to be created in T0xx"] |

### Feature flag, rollout & rollback (ORG-7)

- **Flag**: [`flag.name` — default off]
- **Rollout position** (from the product feature's `impact.md`): [e.g. 2 of 4 — after inventory-service]
- **Rollback**: [exact steps; consumers roll back before providers]

### Security & privacy (ORG-5)

- **AuthN / AuthZ**: [which scopes/roles each new endpoint or screen requires]
- **Personal data touched**: [fields + classification, or none]
- **Secrets / config**: [new config keys; never values]
