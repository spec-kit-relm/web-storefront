
---

## Phase R: Relm Verification & Handoff *(mandatory, always the last phase — ORG-3, ORG-4, ORG-9, PRD-6)*

- [ ] TR01 Provider verification and consumer contract tests pass against the locked contract versions, including negative cases
- [ ] TR02 Every acceptance scenario `RELM-[N]/US<k>/AS<m>` in scope has an automated test whose title starts with that ID
- [ ] TR03 Feature flag defaults to off; rollback steps from plan.md verified in a non-production environment
- [ ] TR04 Run `/speckit.converge`; resolve every appended convergence task until it reports **Converged**
- [ ] TR05 If shipped behavior or contract versions differ from the central spec, open a PR in `product-specs` updating `spec.md` / `contracts.lock.md`
- [ ] TR06 Open the pull request with the Relm PR template (Feature ID, contracts, analyze + converge evidence, scenario coverage)
