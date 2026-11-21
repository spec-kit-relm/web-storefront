# Copilot instructions

Follow `AGENTS.md` at the repository root — it is the single source of operating instructions for
all coding agents in this repository. The rules that MUST hold are in
`.specify/memory/constitution.md` (Parts A and B are organization/team rules synced from
`spec-kit-relm/speckit-platform`; Part C is specific to this repository).

When reviewing pull requests, additionally check:
- the description contains `Feature: RELM-<n>` or a lane label, plus analyze/converge evidence;
- tests whose titles start with scenario IDs (`RELM-<n>/US<k>/AS<m>`) exist for new behavior;
- nothing under `contracts/vendor/` changed without provenance in `contracts/vendor/README.md`.
