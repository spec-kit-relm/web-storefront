---
description: "Draft the pull-request description with Relm gate evidence (feature, contracts, analyze, converge, scenarios)"
---

# Relm: draft the pull-request description

## User Input

$ARGUMENTS

## Steps

1. Determine the active feature directory (`.specify/feature.json` or the current branch
   `<NNN>-<short-name>`). Read `spec.md` (Relm Traceability section), `plan.md` (Contracts &
   Versions, flag, rollback) and `tasks.md` (including any `Phase N: Convergence` section).
2. Read the constitution header to get the versions of `RELM:ORG-BASELINE`, the `RELM:TEAM-*`
   block, and the repository constitution `**Version**`.
3. Collect evidence. Do not invent results — if a step was not run in this session, write
   `NOT RUN` and tell the user which command to run:
   - latest `/speckit.analyze` summary (counts by severity),
   - latest `/speckit.converge` verdict,
   - the test command from AGENTS.md and its result,
   - scenario IDs covered by tests added in this branch (`git diff --name-only origin/main...`
     then search test titles for `RELM-<n>/`).
4. Fill `.github/pull_request_template.md` and write the result to
   `specs/<NNN>-*/pr-description.md` (gitignored by convention; it is a scratch file).
5. Print the description and the command to open the PR:
   ```bash
   gh pr create --fill-first --body-file specs/<NNN>-*/pr-description.md --label lane:feature
   ```
