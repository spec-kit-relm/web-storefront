---
description: "Service repos: read this repo's slice of a central product feature and prepare /speckit.specify"
---

# Relm: hand off a product feature to this repository

## User Input

$ARGUMENTS

The input must contain the Feature ID `RELM-<n>`. If it does not, ask for it and stop.

## Steps

1. Identify this repository's name (`git remote get-url origin`, last path segment).
2. Locate the central feature: `../product-specs/specs/<NNN>-*/` where NNN is `<n>` zero-padded
   to three digits. If the sibling checkout is missing, ask the user to run
   `../product-specs/workspace/clone-all.sh` or to paste the central `spec.md` and `impact.md`.
3. From `impact.md`, extract this repository's row: role, stories/scenarios, slice size, owner,
   interfaces provided/consumed, and its position in the rollout order.
4. From `contracts.lock.md`, extract the versions this repository must provide or consume. If a
   consumed contract is not `locked`, warn that planning will be blocked on Gate 2.
5. Produce a **handoff brief** in the chat (do not write files):
   - the user stories and Given/When/Then scenarios assigned to this repo, with their central
     scenario IDs `RELM-<n>/US<k>/AS<m>`;
   - the contracts to provide/consume with versions;
   - constraints from the central spec (success criteria, edge cases) that apply here.
6. Print the exact next command for the user, for example:
   ```text
   /speckit.specify RELM-<n> <short-name>: <one-paragraph slice description from the brief>
   ```
   and remind them that the Relm `/speckit.specify` wrapper will use `--number <n>` so the
   directory and branch match every other repository.
