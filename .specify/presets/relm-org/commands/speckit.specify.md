---
description: Create or update a feature specification, following Relm feature-ID numbering and central-spec handoff rules.
strategy: wrap
---

## Relm pre-flight (runs BEFORE the core instructions below)

1. **Feature ID.** Find `RELM-<n>` in the user input. If it is missing, ask for it and stop:
   every feature (cross-repo or repo-local) has a parent `Feature` issue in
   `spec-kit-relm/product-specs` and `<n>` is that issue number (PRD-1).
2. **Numbering.** When the core instructions run the feature-creation script, ALWAYS pass
   `--number <n>` and a `--short-name` that matches the product feature's short name (read it from
   the central spec directory name if available). The result must be `specs/<NNN>-<short-name>/`
   and branch `<NNN>-<short-name>` — identical in every participating repository.
3. **Central spec.** If this repository is not `product-specs`, look for the central spec at
   `../product-specs/specs/<NNN>-*/spec.md` (sibling checkout). Do not assume a link gives you
   another repository's files: if the file is not readable, ask the user to paste the relevant
   user stories, acceptance scenarios, and `impact.md` row for this repository.
4. **Slice, don't copy.** A repository spec covers only this repository's slice (the stories and
   scenarios `impact.md` assigns to it). Reuse the central scenario IDs (`RELM-<n>/US<k>/AS<m>`)
   verbatim for shared scenarios; add repo-specific scenarios after them.
5. **No HOW.** The spec stays technology-agnostic (ORG-2). Interface details go to
   `/speckit.plan` and the provider's contract, not here.

{CORE_TEMPLATE}

## Relm post-flight (runs AFTER the core instructions above)

- Fill the **Relm Traceability** section completely (Feature ID, central spec link, repository
  role, contracts provided/consumed, stories covered). Leave nothing in brackets.
- Keep `**Status**: Draft` until review; tell the user the next step is `/speckit.clarify`, and
  for product features `/speckit.checklist` by QA.
