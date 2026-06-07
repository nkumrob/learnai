import { describe, it, expect } from "vitest";
import {
  computeStreakFromTimestamps,
  isStreakAtRisk,
} from "./streak";

const DAY = 86_400_000;
const NOON_UTC = (yyyy: number, mm: number, dd: number) =>
  Date.UTC(yyyy, mm - 1, dd, 12, 0, 0);

describe("computeStreakFromTimestamps", () => {
  it("returns 0 with no passes", () => {
    expect(computeStreakFromTimestamps([])).toBe(0);
  });

  it("returns 1 for a single pass today", () => {
    const now = NOON_UTC(2026, 6, 6);
    expect(computeStreakFromTimestamps([now], now)).toBe(1);
  });

  it("returns 1 for a single pass yesterday — streak is alive but un-extended", () => {
    const now = NOON_UTC(2026, 6, 6);
    expect(computeStreakFromTimestamps([now - DAY], now)).toBe(1);
  });

  it("returns 0 if last pass was more than 1 day ago", () => {
    const now = NOON_UTC(2026, 6, 6);
    expect(computeStreakFromTimestamps([now - 2 * DAY], now)).toBe(0);
  });

  it("counts consecutive days ending today", () => {
    const now = NOON_UTC(2026, 6, 6);
    const days = [now, now - DAY, now - 2 * DAY, now - 3 * DAY];
    expect(computeStreakFromTimestamps(days, now)).toBe(4);
  });

  it("counts consecutive days ending yesterday", () => {
    const now = NOON_UTC(2026, 6, 6);
    // No pass today, but 3 prior days
    const days = [now - DAY, now - 2 * DAY, now - 3 * DAY];
    expect(computeStreakFromTimestamps(days, now)).toBe(3);
  });

  it("breaks on a gap day in the middle", () => {
    const now = NOON_UTC(2026, 6, 6);
    // Today, yesterday, then skip 2 days back gap
    const days = [now, now - DAY, now - 3 * DAY, now - 4 * DAY];
    expect(computeStreakFromTimestamps(days, now)).toBe(2);
  });

  it("dedups multiple passes on the same calendar day", () => {
    const now = NOON_UTC(2026, 6, 6);
    // Two passes today + one yesterday
    const days = [now, now - 10 * 60 * 1000, now - DAY];
    expect(computeStreakFromTimestamps(days, now)).toBe(2);
  });

  it("handles unordered input", () => {
    const now = NOON_UTC(2026, 6, 6);
    const days = [now - 2 * DAY, now, now - DAY];
    expect(computeStreakFromTimestamps(days, now)).toBe(3);
  });
});

describe("isStreakAtRisk", () => {
  it("false when no streak", () => {
    expect(isStreakAtRisk(0, null)).toBe(false);
  });

  it("false when there is a pass today", () => {
    const now = NOON_UTC(2026, 6, 6);
    expect(isStreakAtRisk(3, now, now)).toBe(false);
  });

  it("true when last pass was yesterday", () => {
    const now = NOON_UTC(2026, 6, 6);
    expect(isStreakAtRisk(3, now - DAY, now)).toBe(true);
  });
});
