---
applyTo: "app/**,src/**"
---
- No literal user-facing strings — add keys to `src/i18n/en.ts` (WEB-5).
- No `fetch(` outside `src/api/`; use the wrappers built on `src/api/generated` types (WEB-2).
- Every new UI must implement the loading/empty/error/partial/success states listed in the
  feature plan's *UI states* table (FE-2) and pass axe in its component test (FE-1).
