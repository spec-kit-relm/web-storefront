# Preset `relm-org` — Relm Organization Baseline

Relm org-wide SDD standard: constitution Part A, traceability in specs, delivery sections in plans, mandatory verification phase in tasks.

| Provides | Strategy | File |
|---|---|---|
| template `constitution-template` | replace | [`templates/constitution-template.md`](templates/constitution-template.md) |
| template `spec-template` | append | [`templates/spec-traceability.md`](templates/spec-traceability.md) |
| template `plan-template` | append | [`templates/plan-delivery.md`](templates/plan-delivery.md) |
| template `tasks-template` | append | [`templates/tasks-verification.md`](templates/tasks-verification.md) |
| command `speckit.specify` | wrap | [`commands/speckit.specify.md`](commands/speckit.specify.md) |
| command `speckit.plan` | wrap | [`commands/speckit.plan.md`](commands/speckit.plan.md) |
| command `speckit.tasks` | wrap | [`commands/speckit.tasks.md`](commands/speckit.tasks.md) |
| command `speckit.implement` | wrap | [`commands/speckit.implement.md`](commands/speckit.implement.md) |

Generated files: `templates/constitution-template.md` is generated from `governance/` by
`python scripts/relm_sdd.py build` — never edit it by hand.

Install: `specify preset add relm-org --priority 20` (Relm catalog) or `bootstrap/init-repo.sh`.
