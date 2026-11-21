# Preset `relm-frontend` — Relm Frontend Team

Relm frontend overlay: constitution Part B (FE-1..FE-6) and frontend plan sections (UI states, accessibility, performance, tracking).

| Provides | Strategy | File |
|---|---|---|
| template `constitution-template` | append | [`templates/constitution-template.md`](templates/constitution-template.md) |
| template `plan-template` | append | [`templates/plan-frontend.md`](templates/plan-frontend.md) |

Generated files: `templates/constitution-template.md` is generated from `governance/` by
`python scripts/relm_sdd.py build` — never edit it by hand.

Install: `specify preset add relm-frontend --priority 10` (Relm catalog) or `bootstrap/init-repo.sh`.
