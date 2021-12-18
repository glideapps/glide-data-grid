import { describe, test, expect } from "jest-without-globals";
import { ease } from "./animation-manager";

describe("animation manager", () => {
    test("Smoke test easing", async () => {
        expect(ease.solve(0)).toBe(0);
        expect(ease.solve(0.1)).toBe(0.09479499730150565);
        expect(ease.solve(0.2)).toBe(0.2952445567168344);
        expect(ease.solve(0.3)).toBe(0.5133153550526887);
        expect(ease.solve(0.4)).toBe(0.682540506014571);
        expect(ease.solve(0.5)).toBe(0.8024033876954126);
        expect(ease.solve(0.6)).toBe(0.8852293098934655);
        expect(ease.solve(0.7)).toBe(0.9407646142979404);
        expect(ease.solve(0.8)).toBe(0.975625368854497);
        expect(ease.solve(0.9)).toBe(0.9943164775095211);
        expect(ease.solve(1)).toBe(1);
    });
});
