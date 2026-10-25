import { afterEach, describe, expect, it, vi } from "vitest";
import { flushTelemetry, isTelemetryDisabled, track } from "../src/telemetry/client.js";
import { isUpdateNotifierDisabled, maybeNotifyUpdate } from "../src/update-notifier.js";

// Hardened fork: nothing may leave the machine, whatever env or config says.
describe("fork hardening — no outbound network", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
	});

	it("keeps telemetry off even when explicitly enabled", () => {
		vi.stubEnv("AISLOP_NO_TELEMETRY", "");
		vi.stubEnv("DO_NOT_TRACK", "");
		vi.stubEnv("CI", "");
		expect(isTelemetryDisabled()).toBe(true);
		expect(isTelemetryDisabled({ enabled: true })).toBe(true);
	});

	it("keeps the npm update check off", () => {
		expect(isUpdateNotifierDisabled({})).toBe(true);
		expect(isUpdateNotifierDisabled({ CI: "" })).toBe(true);
	});

	it("never calls fetch when tracking, flushing or checking for updates", async () => {
		const fetchSpy = vi.fn();
		vi.stubGlobal("fetch", fetchSpy);
		track({ event: "scan_completed", properties: {}, config: { enabled: true } } as never);
		await flushTelemetry(50);
		await maybeNotifyUpdate();
		expect(fetchSpy).not.toHaveBeenCalled();
	});
});
