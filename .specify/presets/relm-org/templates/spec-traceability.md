
---

## Relm Traceability *(mandatory — ORG-1, PRD-1, QA-2)*

<!--
  Filled by /speckit.specify. CI (`sdd-gates / spec-lint`) fails if the Feature ID line is missing
  or does not match this directory's number. Keep each value on one line.
-->

**Feature ID**: RELM-[N] <!-- issue number of the parent Feature issue in spec-kit-relm/product-specs -->
**Central spec**: [link to product-specs/specs/NNN-short-name/spec.md, or "n/a — repository-local feature"]
**Repository role**: [product | provider | consumer | provider+consumer | verification]
**Contracts provided**: [e.g. inventory-api@1.1.0, or none]
**Contracts consumed**: [e.g. orders-api@1.3.0 (pinned), or none]
**Product stories covered**: [e.g. RELM-N US1, US2 — or "all"]

**Status lifecycle**: Draft → In Review → Approved → Implemented → Released
(update the `**Status**` line at the top of this file; `Approved` requires zero
`[NEEDS CLARIFICATION]` markers — ORG-2)

### Scenario IDs
Every acceptance scenario above is referenced as `RELM-[N]/US<k>/AS<m>` (story k, scenario m,
in the order written). Automated tests MUST start their title with this ID (QA-2).
