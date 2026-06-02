import { describe, expect, it } from "vitest";
import { computePlacement } from "./placement";

// answers = [experience, goal, technical]
describe("computePlacement", () => {
  it("routes 'understand AI' to fundamentals", () => {
    expect(computePlacement([2, 0, 1]).recommendedTrack).toBe("fundamentals");
  });

  it("routes a productivity goal to productivity", () => {
    expect(computePlacement([2, 1, 1]).recommendedTrack).toBe("productivity");
  });

  it("routes a prompting goal to prompting", () => {
    expect(computePlacement([2, 2, 1]).recommendedTrack).toBe("prompting");
  });

  it("routes an automation goal to automation", () => {
    expect(computePlacement([2, 3, 1]).recommendedTrack).toBe("automation");
  });

  it("routes a building goal to building when comfortable with code", () => {
    expect(computePlacement([3, 4, 2]).recommendedTrack).toBe("building");
  });

  it("routes building goal to automation when not technical", () => {
    expect(computePlacement([2, 4, 0]).recommendedTrack).toBe("automation");
  });

  it("overrides to fundamentals for a total beginner", () => {
    expect(computePlacement([0, 4, 2]).recommendedTrack).toBe("fundamentals");
  });

  it("does not override when beginner already wants fundamentals", () => {
    expect(computePlacement([0, 0, 0]).recommendedTrack).toBe("fundamentals");
  });

  it("defaults missing answers safely", () => {
    const r = computePlacement([]);
    expect(r.recommendedTrack).toBe("fundamentals");
    expect(r.startModuleOrder).toBe(1);
  });
});
