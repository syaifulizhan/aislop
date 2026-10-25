#!/usr/bin/env bash
# Hardened fork test run: upstream suite minus the tests that assert telemetry,
# update-check and telemetry-gated prompts are ON (they are compiled off here),
# plus tests/fork-hardening.test.ts which proves nothing leaves the machine.
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm -s build
pnpm exec vitest run \
  --exclude 'tests/telemetry/client.test.ts' \
  --exclude 'tests/telemetry/fatal.test.ts' \
  --exclude 'tests/telemetry/lifecycle.test.ts' \
  --exclude 'tests/update-notifier.test.ts' \
  --exclude 'tests/pilot-invitation.test.ts' \
  --exclude '**/node_modules/**'
