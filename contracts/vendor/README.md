# Vendored contracts (READ-ONLY)

Pinned copies of provider contracts (ORG-3, FE-3, WEB-2). Never edit. To update: re-vendor from
the provider's tag, update this table, run `npm run gen:api`.

| File | Provider | Version | Source tag | Vendored on | Locked by |
|------|----------|---------|------------|-------------|-----------|
| `inventory-api.yaml` | spec-kit-relm/inventory-service | 1.1.1 | `inventory-api-v1.1.1` | 2026-11-22 | RELM-2 `contracts.lock.md` |
| `orders-api.yaml` | spec-kit-relm/orders-service | 1.3.1 | `orders-api-v1.3.1` | 2026-11-22 | RELM-2 `contracts.lock.md` |

```bash
for c in inventory-service:inventory-api:1.1.1 orders-service:orders-api:1.3.1; do
  IFS=: read repo name ver <<<"$c"
  gh api "repos/spec-kit-relm/$repo/contents/contracts/$name.yaml?ref=$name-v$ver" \
    -H "Accept: application/vnd.github.raw" > "contracts/vendor/$name.yaml"
done
npm run gen:api
```
