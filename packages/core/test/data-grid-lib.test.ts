/* eslint-disable sonarjs/no-duplicate-string */
import type { BaseDrawArgs } from "../src/index.js";
import { getDataEditorTheme, mergeAndRealizeTheme, type FullTheme } from "../src/common/styles.js";
import {
    remapForDnDState,
    type MappedGridColumn,
    drawLastUpdateUnderlay,
    computeMultilineTextLayoutExternal,
} from "../src/internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type Rectangle } from "../src/internal/data-grid/data-grid-types.js";
import { vi, type Mocked, expect, describe, test, it, beforeEach } from "vitest";
import { drawImage } from "../src/cells/image-cell.js";
import type { ImageWindowLoader } from "../src/internal/data-grid/image-window-loader-interface.js";

function makeCol(title: string, sourceIndex: number, sticky: boolean, width: number): MappedGridColumn {
    return {
        title,
        sourceIndex,
        sticky,
        width,
        group: undefined,
        grow: undefined,
        headerRowMarkerAlwaysVisible: undefined,
        headerRowMarkerTheme: undefined,
        headerRowMarkerDisabled: undefined,
        hasMenu: undefined,
        icon: undefined,
        id: undefined,
        menuIcon: undefined,
        indicatorIcon: undefined,
        overlayIcon: undefined,
        style: undefined,
        themeOverride: undefined,
        trailingRowOptions: undefined,
        growOffset: undefined,
        rowMarker: undefined,
        rowMarkerChecked: undefined,
    };
}

describe("remapForDnDState", () => {
    const sampleColumns: MappedGridColumn[] = [
        makeCol("Column 1", 0, true, 50),
        makeCol("Column 2", 1, false, 60),
        makeCol("Column 3", 2, true, 70),
    ];

    it("should return the same array if dndState is undefined", () => {
        const result = remapForDnDState(sampleColumns);
        expect(result).toEqual(sampleColumns);
    });

    it("should move item from a lower index to a higher index", () => {
        const result = remapForDnDState(sampleColumns, { src: 0, dest: 2 });
        expect(result[2].title).toEqual("Column 1");
    });

    it("should move item from a higher index to a lower index", () => {
        const result = remapForDnDState(sampleColumns, { src: 2, dest: 0 });
        expect(result[0].title).toEqual("Column 3");
    });

    it("should not move item if dragged to its current position", () => {
        const result = remapForDnDState(sampleColumns, { src: 1, dest: 1 });
        expect(result).toEqual(sampleColumns);
    });

    it("should move the first item to the last position", () => {
        const result = remapForDnDState(sampleColumns, { src: 0, dest: 2 });
        expect(result[2].title).toEqual("Column 1");
    });

    it("should move the last item to the first position", () => {
        const result = remapForDnDState(sampleColumns, { src: 2, dest: 0 });
        expect(result[0].title).toEqual("Column 3");
    });

    it("should keep the sticky property unchanged", () => {
        const result = remapForDnDState(sampleColumns, { src: 0, dest: 2 });
        for (const [index, column] of sampleColumns.entries()) {
            expect(result[index].sticky).toEqual(column.sticky);
        }
    });
});

describe("drawImage", () => {
    let mockCtx: Mocked<CanvasRenderingContext2D>;
    let mockImageLoader: Mocked<ImageWindowLoader>;
    let mockTheme: FullTheme;
    let mockRect: Rectangle;

    beforeEach(() => {
        // Initialize your mocks here
        mockCtx = {
            drawImage: vi.fn(),
            moveTo: vi.fn(),
            arcTo: vi.fn(),
            save: vi.fn(),
            restore: vi.fn(),
            clip: vi.fn(),
            beginPath: vi.fn(),
        } as any;

        mockImageLoader = {
            loadOrGetImage: vi.fn((_a, _b, _c) => new HTMLImageElement()),
            setCallback: vi.fn(),
            setWindow: vi.fn(),
        };

        mockTheme = mergeAndRealizeTheme(getDataEditorTheme());

        mockRect = {
            x: 0,
            y: 0,
            width: 100,
            height: 56,
        };
    });

    test("renders with basic input", () => {
        const baseDrawArgs: BaseDrawArgs = {
            ctx: mockCtx,
            theme: mockTheme,
            cellFillColor: mockTheme.bgCell,
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                readonly: true,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            spriteManager: {} as any,
        };

        const mockImage = new Image();
        mockImage.width = 50;
        mockImage.height = 50;
        mockImageLoader.loadOrGetImage.mockReturnValueOnce(mockImage);

        drawImage(baseDrawArgs, ["sample-url"], 5);

        expect(mockCtx.drawImage).toHaveBeenCalledWith(
            mockImage,
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number)
        );
    });

    test("renders with rounding", () => {
        const baseDrawArgs = {
            ctx: mockCtx,
            theme: mockTheme,
            cellFillColor: mockTheme.bgCell,
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                readonly: true,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: vi.fn(),
            spriteManager: {} as any,
        };

        const mockImage = new Image();
        mockImage.width = 50;
        mockImage.height = 50;
        mockImageLoader.loadOrGetImage.mockReturnValueOnce(mockImage);

        drawImage(baseDrawArgs, ["sample-url"], 5);

        expect(mockCtx.save).toHaveBeenCalled();
        expect(mockCtx.clip).toHaveBeenCalled();
        expect(mockCtx.restore).toHaveBeenCalled();
        expect(mockCtx.arcTo).toHaveBeenCalled();
    });

    test("renders aligned to the right", () => {
        const baseDrawArgs = {
            ctx: mockCtx,
            theme: mockTheme,
            cellFillColor: mockTheme.bgCell,
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                readonly: true,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: vi.fn(),
            spriteManager: {} as any,
        };

        const mockImage = new Image();
        mockImage.width = 50;
        mockImage.height = 50;
        mockImageLoader.loadOrGetImage.mockReturnValueOnce(mockImage);

        drawImage(baseDrawArgs, ["sample-url"], 0, "right");

        const expectedX = mockRect.x + mockRect.width - mockTheme.cellHorizontalPadding - mockImage.width;
        expect(mockCtx.drawImage).toHaveBeenCalledWith(
            mockImage,
            expectedX,
            expect.any(Number),
            expect.any(Number),
            expect.any(Number)
        );
    });

    test("renders aligned to the center", () => {
        const baseDrawArgs = {
            ctx: mockCtx,
            theme: mockTheme,
            cellFillColor: mockTheme.bgCell,
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                readonly: true,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: vi.fn(),
            spriteManager: {} as any,
        };

        const mockImage = new Image();
        mockImage.width = 50;
        mockImage.height = 50;
        mockImageLoader.loadOrGetImage.mockReturnValueOnce(mockImage);

        drawImage(baseDrawArgs, ["sample-url"], 0, "center");

        const expectedX = mockRect.x + mockRect.width / 2 - mockImage.width / 2;
        expect(mockCtx.drawImage).toHaveBeenCalledWith(
            mockImage,
            expectedX,
            expect.any(Number),
            expect.any(Number),
            expect.any(Number)
        );
    });

    test("does not render with invalid data", () => {
        const baseDrawArgs = {
            ctx: mockCtx,
            theme: mockTheme,
            cellFillColor: mockTheme.bgCell,
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                readonly: true,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: vi.fn(),
            spriteManager: {} as any,
        };

        drawImage(baseDrawArgs, [""], 5);

        expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });
});

describe("drawWithLastUpdate", () => {
    const mockCtx: Mocked<CanvasRenderingContext2D> = {} as any;
    let mockTheme: FullTheme;
    let mockRect: Rectangle;

    beforeEach(() => {
        mockCtx.fillRect = vi.fn();
        mockCtx.fillStyle = "";
        mockCtx.globalAlpha = 1;

        mockTheme = mergeAndRealizeTheme(getDataEditorTheme(), { bgSearchResult: "some-color" });

        mockRect = {
            x: 10,
            y: 20,
            width: 50,
            height: 60,
        };
    });

    it("should do nothing if lastUpdate is undefined", () => {
        const result = drawLastUpdateUnderlay(
            {
                ctx: mockCtx,
                theme: mockTheme,
                cellFillColor: mockTheme.bgCell,
                rect: mockRect,
                cell: { kind: GridCellKind.Text, allowOverlay: false, data: "Test", displayData: "Test" },
                col: 0,
                row: 0,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                hyperWrapping: false,
                imageLoader: {} as any,
                spriteManager: {} as any,
            },
            undefined,
            1000,
            undefined,
            false,
            false
        );

        expect(mockCtx.fillStyle).toBe("");
        expect(result).toBe(false);
    });

    it("should not animate if progress is >= animTime", () => {
        const lastUpdate = 400;
        const frameTime = 1000;

        const result = drawLastUpdateUnderlay(
            {
                ctx: mockCtx,
                theme: mockTheme,
                cellFillColor: mockTheme.bgCell,
                rect: mockRect,
                cell: { kind: GridCellKind.Text, allowOverlay: false, data: "Test", displayData: "Test" },
                col: 0,
                row: 0,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                hyperWrapping: false,
                imageLoader: {} as any,
                spriteManager: {} as any,
            },
            lastUpdate,
            frameTime,
            undefined,
            false,
            false
        );

        expect(mockCtx.fillStyle).toBe("");
        expect(result).toBe(false);
    });

    it("should animate if progress is < animTime", () => {
        const lastUpdate = 600;
        const frameTime = 1000;

        const result = drawLastUpdateUnderlay(
            {
                ctx: mockCtx,
                theme: mockTheme,
                cellFillColor: mockTheme.bgCell,
                rect: mockRect,
                cell: { kind: GridCellKind.Text, allowOverlay: false, data: "Test", displayData: "Test" },
                col: 0,
                row: 0,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                hyperWrapping: false,
                imageLoader: {} as any,
                spriteManager: {} as any,
            },
            lastUpdate,
            frameTime,
            undefined,
            false,
            false
        );

        expect(mockCtx.fillStyle).toBe(mockTheme.bgSearchResult);
        expect(mockCtx.fillRect).toHaveBeenCalledWith(
            mockRect.x + 1,
            mockRect.y + 1,
            mockRect.width - 1,
            mockRect.height - 1
        );
        expect(result).toBe(true);
    });

    it("should update lastPrep's fillStyle if defined", () => {
        const lastUpdate = 600;
        const frameTime = 1000;
        const mockLastPrep = { fillStyle: "", deprep: vi.fn(), font: "some-font", renderer: {} };

        drawLastUpdateUnderlay(
            {
                ctx: mockCtx,
                theme: mockTheme,
                cellFillColor: mockTheme.bgCell,
                rect: mockRect,
                cell: { kind: GridCellKind.Text, allowOverlay: false, data: "Test", displayData: "Test" },
                col: 0,
                row: 0,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                hyperWrapping: false,
                imageLoader: {} as any,
                spriteManager: {} as any,
            },
            lastUpdate,
            frameTime,
            mockLastPrep,
            false,
            false
        );

        expect(mockLastPrep.fillStyle).toBe(mockTheme.bgSearchResult);
    });
});

describe("computeMultilineTextLayout", () => {
    vi.mock("canvas-hypertxt", () => ({
        split: (_ctx: unknown, text: string, _font: string, _w: number, _hyperWrapping: boolean) => {
            return text.split("\n");
        },
        clearCache: vi.fn(),
    }));

    let mockCtx: Mocked<CanvasRenderingContext2D>;
    let theme: FullTheme;
    let defaultArgs: BaseDrawArgs;

    beforeEach(() => {
        mockCtx = {
            font: "",
            measureText: vi.fn().mockReturnValue({
                actualBoundingBoxAscent: 10,
                actualBoundingBoxDescent: 2,
                width: 50,
            }),
        } as any;

        theme = mergeAndRealizeTheme(getDataEditorTheme());
        defaultArgs = {
            ctx: mockCtx,
            theme,
            cellFillColor: theme.bgCell,
            rect: { x: 0, y: 0, width: 200, height: 100 },
            cell: { kind: GridCellKind.Text, allowOverlay: false, data: "", displayData: "" },
            col: 0,
            row: 0,
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            imageLoader: {} as any,
            spriteManager: {} as any,
        };
    });

    it("should compute height dimensions from emHeight and theme", () => {
        const result = computeMultilineTextLayoutExternal(defaultArgs, "Test");

        expect(result.emHeight).toBe(12);
        expect(result.lineHeight).toBeCloseTo(theme.lineHeight * result.emHeight);
        expect(result.desiredHeight).toBeCloseTo(result.actualHeight + theme.cellVerticalPadding);
    });

    it("should split text with explicit newlines", () => {
        const result = computeMultilineTextLayoutExternal(
            {
                ...defaultArgs,
                rect: { x: 0, y: 0, width: 500, height: 500 },
            },
            "Line 1\nLine 2\nLine 3"
        );

        expect(result.split.length).toBe(3);
        expect(result.actualHeight).toBeCloseTo(result.emHeight + result.lineHeight * (result.split.length - 1));
    });

    it("should set mustClip to true when content overflows cell height", () => {
        const result = computeMultilineTextLayoutExternal(
            {
                ...defaultArgs,
                rect: { x: 0, y: 0, width: 20, height: 5 },
            },
            "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10"
        );

        expect(result.mustClip).toBe(true);
    });

    it("should not clip when content fits within cell height", () => {
        const result = computeMultilineTextLayoutExternal(
            {
                ...defaultArgs,
                rect: { x: 0, y: 0, width: 500, height: 500 },
            },
            "Short"
        );

        expect(result.split.length).toBe(1);
        expect(result.mustClip).toBe(false);
    });

    it("should handle lines that wrap at cell width and extend beyond a single line", async () => {
        const canvasHypertxt = await import("canvas-hypertxt");
        const splitSpy = vi
            .spyOn(canvasHypertxt, "split")
            .mockImplementation((_ctx: unknown, text: string, _font: string, w: number, _hyperWrapping: boolean) => {
                // Simulate wrapping: each explicit line that exceeds the available width
                // gets broken into multiple wrapped lines
                const explicitLines = text.split("\n");
                const result: string[] = [];
                for (const line of explicitLines) {
                    // Approximate: assume ~10px per char, wrap when line exceeds width
                    const charsPerLine = Math.max(1, Math.floor(w / 10));
                    for (let i = 0; i < line.length; i += charsPerLine) {
                        result.push(line.slice(i, i + charsPerLine));
                    }
                }
                return result;
            });

        const narrowWidth = 60; // allows ~6 chars per line
        const result = computeMultilineTextLayoutExternal(
            {
                ...defaultArgs,
                rect: { x: 0, y: 0, width: narrowWidth, height: 5000 },
            },
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        );

        // Each line is a long lorem ipsum sentence (~100+ chars) at ~6 chars/line, wrapping heavily
        // 4 explicit newline-separated lines, each wrapping to many lines
        // Total split lines should be more than the 4 explicit newline-separated lines
        expect(result.split.length).toBeGreaterThan(4);
        expect(result.actualHeight).toBeCloseTo(result.emHeight + result.lineHeight * (result.split.length - 1));
        expect(result.desiredHeight).toBeCloseTo(result.actualHeight + theme.cellVerticalPadding);
        // With many wrapped lines in a tall cell, content should fit
        expect(result.mustClip).toBe(false);

        splitSpy.mockRestore();
    });

    it("should center optimalY vertically within the cell", () => {
        const rect = { x: 0, y: 50, width: 500, height: 200 };
        const result = computeMultilineTextLayoutExternal(
            {
                ...defaultArgs,
                rect,
            },
            "Centered"
        );

        expect(result.optimalY).toBeCloseTo(rect.y + rect.height / 2 - result.actualHeight / 2);
    });
});
