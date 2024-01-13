import { compareSmart } from "../src/use-column-sort.js";
import { expect, describe, test } from "vitest";

describe("use-column-sort", () => {
    describe("compareSmart", function () {
        test("it does not parse date formats into numbers when sorting", function () {
            expect(["2022-02-01", "2023-01-01", "2024-01-01"].sort(compareSmart)).toEqual([
                "2022-02-01",
                "2023-01-01",
                "2024-01-01",
            ]);

            expect(["2024-12-01", "2022-12-01", "2023-12-01"].sort(compareSmart)).toEqual([
                "2022-12-01",
                "2023-12-01",
                "2024-12-01",
            ]);

            // This is where parseFloat() starts to fool us
            expect(["2022-12-03", "2022-12-01", "2022-12-02"].sort(compareSmart)).toEqual([
                "2022-12-01",
                "2022-12-02",
                "2022-12-03",
            ]);
        });
    });
});
