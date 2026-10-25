# About this fork

A hardened fork of [scanaislop/aislop](https://github.com/scanaislop/aislop), used under
the original [MIT License](LICENSE). All credit for the scanner goes to its authors. This
fork is a drop-in replacement: same CLI, same MCP server (`aislop-mcp`), same rules and
scores. It only removes outbound network traffic.

## What is different

| Area | Upstream | This fork |
|---|---|---|
| Usage telemetry (PostHog) | On by default; opt out with `AISLOP_NO_TELEMETRY=1` / `DO_NOT_TRACK=1` | Compiled off; no event can be sent, whatever env or config says |
| npm update check | Daily request to the npm registry | Never runs; updates arrive by merging upstream |
| Telemetry-gated prompts (pilot invitation) | Shown after repeated scans | Not shown |

`tests/fork-hardening.test.ts` proves no `fetch` happens on the tracking, flush or update
paths. `scripts/fork-test.sh` runs the upstream suite minus the five test files that assert
those features are on.

## Staying in sync

Upstream is merged regularly (merge, never rebase). Each merge is built and tested with
`scripts/fork-test.sh` before the binary is installed.

## Install from this fork

```sh
pnpm install --frozen-lockfile && pnpm build && npm install -g .
```
