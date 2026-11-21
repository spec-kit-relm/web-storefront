@AGENTS.md

<!--
  Claude Code reads CLAUDE.md files from the repo root downwards and concatenates them.
  Keep all shared guidance in AGENTS.md (read by Copilot, Codex, Cursor, Gemini, ...) and only
  put Claude-specific notes below.
-->

## Claude Code notes
- Spec Kit commands are installed as skills: `/speckit-specify`, `/speckit-plan`, … and
  `/speckit-relm-handoff`, `/speckit-relm-pr`.
- When a sibling repository is needed for context (e.g. `../product-specs`), read it; never write
  to a sibling repository from a session started in this one.
