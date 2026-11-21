# AGENTS.md — web-storefront

Customer-facing web app for Relm Commerce (Next.js 15 App Router + React 19, TypeScript strict).
Owned by `@spec-kit-relm/frontend`. **Consumer** of inventory-api and orders-api through
read-only copies in `contracts/vendor/`. The Next.js server is also the BFF: browsers never call
Relm services directly.
Rules that MUST hold are in `.specify/memory/constitution.md` (ORG-*, FE-*, WEB-1 … WEB-5).

## Commands
| Purpose | Command |
|---------|---------|
| Install deps | `npm ci` |
| Generate API types (after any vendored contract change) | `npm run gen:api` |
| Type check | `npm run typecheck` |
| Unit/component tests | `npm test` |
| Build | `npm run build` |
| Run locally | `npm run dev` (port 3000) |
| Mock services from contracts | `npm run mock` *(added by RELM-2 T003)* |

Run `npm run typecheck && npm test` before marking any task `[X]`.

## Layout
```text
app/                     routes (Server Components by default)
app/checkout/            checkout route (RELM-2 rebuilds it)
src/api/                 server-only wrappers over generated types — the ONLY place that calls services
src/api/generated/       openapi-typescript output (gitignored, never edit)
src/components/          UI components ("use client" only where interactive)
src/i18n/                message catalogs — all copy lives here
contracts/vendor/        READ-ONLY pinned contracts + provenance README
specs/NNN-*/             Spec Kit features
```

## Spec Kit in this repository
- Kind: `frontend` — presets `relm-org` + `relm-frontend`; extensions `git`, `github`, `relm`.
- `/speckit.specify RELM-<n> …` → `specs/<NNN>-<short-name>/`, branch `<NNN>-<short-name>`.
- Start a cross-repo slice with `/speckit.relm.handoff RELM-<n>`; plan only against versions in
  the feature's `contracts.lock.md`.
- Plans must fill the *UI states*, accessibility, performance, API client and tracking-plan tables.
- One phase per `/speckit.implement` run; then `/speckit.converge` and `/speckit.relm.pr`.
- Current feature: **RELM-2** `specs/002-stock-reservation/` — tasks ready, start with Phase 1.

## Conventions
- Component tests that verify a scenario start with its ID:
  `it('RELM-2/US1/AS1 HoldNotice shows 15:00 and counts down', …)`; every component test runs axe.
- Map problem `type` URIs to i18n keys in `src/api/problems.ts` — never show raw API errors.
- Feature flags via `src/flags.ts`; new behavior defaults off.
- Prefer Server Actions for mutations; pass opaque IDs only.

## Do not
- Edit `contracts/vendor/**` or `src/api/generated/**`.
- Call `fetch` from components or the browser to Relm services.
- Store cart, reservation or personal data in `localStorage` or URLs (WEB-4).
- Hard-code user-facing strings (WEB-5).
- Edit Parts A/B of the constitution.

## Gotchas
- `src/api/generated/` is gitignored: run `npm run gen:api` after cloning, or typecheck fails.
- Countdown must use server `remainingSeconds`, not `Date.now()` arithmetic on `expiresAt`.
