/* eslint-disable sonarjs/no-duplicate-string */
import type { BaseDrawArgs } from "../src/index.js";
import { getDataEditorTheme, mergeAndRealizeTheme, type FullTheme } from "../src/common/styles.js";
import {
    remapForDnDState,
    type MappedGridColumn,
    drawLastUpdateUnderlay,
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
