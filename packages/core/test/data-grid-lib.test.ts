/* eslint-disable sonarjs/no-duplicate-string */
import type { BaseDrawArgs } from "../src";
import { getDataEditorTheme, type Theme } from "../src/common/styles";
import { remapForDnDState, type MappedGridColumn, drawImage } from "../src/data-grid/data-grid-lib";
import { GridCellKind, type ImageWindowLoader, type Rectangle } from "../src/data-grid/data-grid-types";

describe("remapForDnDState", () => {
    const sampleColumns: MappedGridColumn[] = [
        { title: "Column 1", sourceIndex: 0, sticky: true, width: 50 },
        { title: "Column 2", sourceIndex: 1, sticky: false, width: 60 },
        { title: "Column 3", sourceIndex: 2, sticky: true, width: 70 },
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
    let mockCtx: jest.Mocked<CanvasRenderingContext2D>;
    let mockImageLoader: jest.Mocked<ImageWindowLoader>;
    let mockTheme: Theme;
    let mockRect: Rectangle;

    beforeEach(() => {
        // Initialize your mocks here
        mockCtx = {
            drawImage: jest.fn(),
            moveTo: jest.fn(),
            arcTo: jest.fn(),
            save: jest.fn(),
            restore: jest.fn(),
            clip: jest.fn(),
        } as any;

        mockImageLoader = {
            loadOrGetImage: jest.fn((_a, _b, _c) => new HTMLImageElement()),
            setCallback: jest.fn(),
            setWindow: jest.fn(),
        };

        mockTheme = getDataEditorTheme();

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
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                allowAdd: false,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: jest.fn(),
            spriteManager: {} as any,
        };

        const mockImage = new Image();
        mockImage.width = 50;
        mockImage.height = 50;
        mockImageLoader.loadOrGetImage.mockReturnValueOnce(mockImage);

        drawImage(baseDrawArgs, ["sample-url"]);

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
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                allowAdd: false,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: jest.fn(),
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
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                allowAdd: false,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: jest.fn(),
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
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                allowAdd: false,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: jest.fn(),
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
            col: 0,
            row: 0,
            rect: mockRect,
            imageLoader: mockImageLoader,
            cell: {
                kind: GridCellKind.Image as const,
                allowAdd: false,
                allowOverlay: false,
                data: ["sample-url"],
            },
            highlighted: false,
            hoverAmount: 0,
            hoverX: undefined,
            hoverY: undefined,
            hyperWrapping: false,
            requestAnimationFrame: jest.fn(),
            spriteManager: {} as any,
        };

        drawImage(baseDrawArgs, [""]);

        expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });
});
