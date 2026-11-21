---
description: Execute tasks with Relm guardrails — scoped runs, test-first, read-only vendored contracts.
strategy: wrap
---

## Relm guardrails (apply throughout the core instructions below)

1. **Scope.** Implement ONE phase (or an explicit task range given by the user) per run. If the
   user did not name a phase, implement the first incomplete phase only, then stop and report.
2. **Pre-condition.** If the latest `/speckit.analyze` reported any CRITICAL finding that is not
   resolved, stop and tell the user (ORG-9).
3. **Read-only paths.** Never edit `contracts/vendor/**`, generated API clients, or Parts A/B of
   the constitution. If a vendored contract looks wrong, stop and describe the issue for the
   provider team.
4. **Test-first.** For each task with a test, write the test, run it, see it fail, then implement.
   Run the repository's test command (see AGENTS.md → Commands) before marking a task `[X]`.
5. **No silent scope changes.** If the code needs behavior that is not in spec.md, stop and ask
   for a spec change instead of inventing it.

{CORE_TEMPLATE}

## Relm post-flight

- Summarize: tasks completed, tests added (with scenario IDs), commands run and their results.
- Next step: continue with the next phase, or run `/speckit.converge` when all phases are done.
