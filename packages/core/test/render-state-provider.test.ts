import { expect, describe, it, beforeEach } from "vitest";
import {
    packColRowToNumber,
    unpackCol,
    unpackRow,
    unpackNumberToColRow,
    RenderStateProvider,
} from "../src/common/render-state-provider.js";
import type { Rectangle } from "../src/internal/data-grid/data-grid-types.js";

describe("Data Grid Utility Functions", () => {
    describe("packColRowToNumber and unpacking functions", () => {
        it("should correctly pack and unpack column and row numbers", () => {
            const col = 123;
            const row = 456;
            const packed = packColRowToNumber(col, row);
            const unpackedCol = unpackCol(packed);
            const unpackedRow = unpackRow(packed);
            expect(unpackedCol).to.equal(col);
            expect(unpackedRow).to.equal(row);
        });

        it("should correctly pack and unpack column headers", () => {
            const col = 123;
            const row = -1;
            const packed = packColRowToNumber(col, row);
            const unpackedCol = unpackCol(packed);
            const unpackedRow = unpackRow(packed);
            expect(unpackedCol).to.equal(col);
            expect(unpackedRow).to.equal(row);
        });

        it("should correctly pack and unpack column group headers", () => {
            const col = 123;
            const row = -2;
            const packed = packColRowToNumber(col, row);
            const unpackedCol = unpackCol(packed);
            const unpackedRow = unpackRow(packed);
            expect(unpackedCol).to.equal(col);
            expect(unpackedRow).to.equal(row);
        });

        it("should correctly unpack packed number to column and row", () => {
            const col = 789;
            const row = 101_112;
            const packed = packColRowToNumber(col, row);
            const [unpackedCol, unpackedRow] = unpackNumberToColRow(packed);
            expect(unpackedCol).to.equal(col);
            expect(unpackedRow).to.equal(row);
        });

        it("should support 2^21 columns with 2^32 rows", () => {
            const col = 2 ** 21 - 1;
            const row = 2 ** 32 - 4;
            const packed = packColRowToNumber(col, row);
            const [unpackedCol, unpackedRow] = unpackNumberToColRow(packed);
            expect(unpackedCol).to.equal(col);
            expect(unpackedRow).to.equal(row);
        });
    });

    describe("RenderStateProvider", () => {
        let renderStateProvider: RenderStateProvider;
        let testRectangle: Rectangle;

        beforeEach(() => {
            renderStateProvider = new RenderStateProvider();
            testRectangle = { x: 10, y: 20, width: 30, height: 40 };
        });

        it("should set and get values correctly", () => {
            const location = [5, 10] as const;
            const state = { some: "state" };
            renderStateProvider.setValue(location, state);
            expect(renderStateProvider.getValue(location)).to.deep.equal(state);
        });

        it("should update visible window and freeze columns correctly", () => {
            renderStateProvider.setValue([0, 30], "state");
            renderStateProvider.setValue([1, 0], "state");
            renderStateProvider.setWindow(testRectangle, 1, []);
            expect(renderStateProvider.getValue([0, 30])).to.equal("state");
            expect(renderStateProvider.getValue([1, 0])).to.equal(undefined);
        });
    });
});
