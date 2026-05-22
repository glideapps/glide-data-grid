import { describe, expect, it } from "vitest";
import { sectionCellRenderer } from "../src/cells/section-cell.js";
import { RenderStateProvider } from "../src/common/render-state-provider.js";
import { mergeAndRealizeTheme } from "../src/common/styles.js";
import { CompactSelection, getDefaultTheme, GridCellKind } from "../src/index.js";
import { type InnerGridCell, InnerGridCellKind, type Rectangle } from "../src/internal/data-grid/data-grid-types.js";
import { SpriteManager } from "../src/internal/data-grid/data-grid-sprites.js";
import type { ImageWindowLoader } from "../src/internal/data-grid/image-window-loader-interface.js";
import { drawCells } from "../src/internal/data-grid/render/data-grid-render.cells.js";
import { drawGrid } from "../src/internal/data-grid/render/data-grid-render.js";
import type { DrawGridArg } from "../src/internal/data-grid/render/draw-grid-arg.js";
import type { MappedGridColumn } from "../src/internal/data-grid/render/data-grid-lib.js";
import { overdrawStickyBoundaries } from "../src/internal/data-grid/render/data-grid-render.lines.js";

type CanvasDrawCall = {
    readonly type: string;
    readonly props: Record<string, unknown>;
};

function get2dContext(): CanvasRenderingContext2D & {
    __getDrawCalls(): CanvasDrawCall[];
    __getEvents(): CanvasDrawCall[];
} {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        throw new Error("Cannot get a 2d context");
    }

    return ctx as CanvasRenderingContext2D & {
        __getDrawCalls(): CanvasDrawCall[];
        __getEvents(): CanvasDrawCall[];
    };
}

function makeColumn(sourceIndex: number, sticky: boolean): MappedGridColumn {
    return {
        sourceIndex,
        sticky,
        width: 80,
        title: "",
        id: `${sourceIndex}`,
        group: "",
        grow: 0,
        hasMenu: false,
        icon: undefined,
        menuIcon: undefined,
        overlayIcon: undefined,
        indicatorIcon: undefined,
        style: undefined,
        themeOverride: undefined,
        trailingRowOptions: undefined,
        growOffset: 0,
        rowMarker: undefined,
        rowMarkerChecked: undefined,
        headerRowMarkerTheme: undefined,
        headerRowMarkerAlwaysVisible: false,
        headerRowMarkerDisabled: false,
    } as MappedGridColumn;
}

function makeDrawGridArg(
    contexts: {
        readonly canvasCtx: CanvasRenderingContext2D;
        readonly headerCanvasCtx: CanvasRenderingContext2D;
        readonly bufferACtx: CanvasRenderingContext2D;
        readonly bufferBCtx: CanvasRenderingContext2D;
    },
    translateX: number,
    columns: readonly MappedGridColumn[],
    getCellContent: DrawGridArg["getCellContent"],
    lastBlitData: DrawGridArg["lastBlitData"],
    theme: DrawGridArg["theme"],
    selection: DrawGridArg["selection"]
): DrawGridArg {
    return {
        ...contexts,
        width: 240,
        height: 160,
        cellXOffset: 0,
        cellYOffset: 0,
        translateX,
        translateY: 0,
        mappedColumns: columns,
        enableGroups: false,
        freezeColumns: 1,
        dragAndDropState: undefined,
        theme,
        headerHeight: 36,
        groupHeaderHeight: 0,
        disabledRows: CompactSelection.empty(),
        rowHeight: row => (row === 0 ? 44 : 32),
        verticalBorder: () => true,
        isResizing: false,
        resizeCol: undefined,
        isFocused: true,
        drawFocus: true,
        selection,
        fillHandle: false,
        freezeTrailingRows: 0,
        hasAppendRow: false,
        hyperWrapping: false,
        rows: 3,
        getCellContent,
        overrideCursor: () => undefined,
        getGroupDetails: () => ({ name: "" }),
        getRowThemeOverride: undefined,
        drawHeaderCallback: undefined,
        drawCellCallback: undefined,
        prelightCells: undefined,
        highlightRegions: undefined,
        imageLoader: {
            loadOrGetImage: () => undefined,
            setCallback: () => undefined,
            setWindow: () => undefined,
        } as ImageWindowLoader,
        lastBlitData,
        damage: undefined,
        hoverValues: [],
        hoverInfo: undefined,
        spriteManager: new SpriteManager(undefined, () => undefined),
        maxScaleFactor: 1,
        touchMode: false,
        renderStrategy: "single-buffer",
        enqueue: () => undefined,
        renderStateProvider: new RenderStateProvider(),
        getCellRenderer: cell => (cell.kind === InnerGridCellKind.Section ? sectionCellRenderer : undefined),
        minimumCellWidth: 0,
        resizeIndicator: "none",
    };
}

describe("drawCells", () => {
    it("draws split section spans on both sides of frozen columns", () => {
        const ctx = get2dContext();
        const theme = mergeAndRealizeTheme(getDefaultTheme());
        const columns = [makeColumn(0, true), makeColumn(1, false), makeColumn(2, false)];
        const sectionCell: InnerGridCell = {
            kind: InnerGridCellKind.Section,
            allowOverlay: false,
            title: "Frozen section title that should continue across columns",
            span: [0, 2],
        };

        const spans = drawCells(
            ctx,
            columns,
            columns,
            140,
            36,
            -24,
            0,
            0,
            1,
            () => 44,
            () => sectionCell,
            () => ({ name: "" }),
            undefined,
            CompactSelection.empty(),
            true,
            true,
            0,
            false,
            [],
            undefined,
            {
                columns: CompactSelection.empty(),
                rows: CompactSelection.empty(),
                current: undefined,
            },
            undefined,
            undefined,
            {} as ImageWindowLoader,
            {} as SpriteManager,
            [],
            undefined,
            undefined,
            false,
            theme,
            () => undefined,
            new RenderStateProvider(),
            () => sectionCellRenderer,
            () => undefined,
            0
        );

        const textCalls = ctx.__getDrawCalls().filter(call => call.type === "fillText");
        const backgroundCalls = ctx
            .__getDrawCalls()
            .filter(
                call =>
                    call.type === "fillRect" &&
                    (call.props as Rectangle).y === 36 &&
                    (call.props as Rectangle).height === 44
            );

        expect(textCalls).toHaveLength(2);
        expect(textCalls.map(call => call.props.text)).toEqual([
            "Frozen section title that should continue across columns",
            "Frozen section title that should continue across columns",
        ]);
        expect(textCalls.map(call => call.props.x)).toEqual([
            theme.cellHorizontalPadding * 2,
            theme.cellHorizontalPadding * 2,
        ]);
        expect(backgroundCalls.map(call => call.props.width)).toEqual([80, 160]);
        expect(spans).toEqual([
            { x: 0, y: 36, width: 80, height: 44 },
            { x: 79, y: 36, width: 137, height: 44 },
        ]);
    });

    it("does not overdraw frozen boundaries through section rows", () => {
        const ctx = get2dContext();
        const theme = mergeAndRealizeTheme(getDefaultTheme());
        const columns = [makeColumn(0, true), makeColumn(1, false)];
        const loadingCell: InnerGridCell = {
            kind: GridCellKind.Loading,
            allowOverlay: false,
        };
        const sectionCell: InnerGridCell = {
            kind: InnerGridCellKind.Section,
            allowOverlay: false,
            title: "Section",
            span: [0, 1],
        };

        overdrawStickyBoundaries(
            ctx,
            columns,
            160,
            180,
            0,
            3,
            36,
            0,
            0,
            () => true,
            () => 44,
            ([, row]) => (row === 1 ? sectionCell : loadingCell),
            theme
        );

        const lineCalls = ctx.__getEvents().filter(call => call.type === "moveTo" || call.type === "lineTo");

        expect(lineCalls).toEqual([
            expect.objectContaining({ type: "moveTo", props: { x: 80.5, y: 0 } }),
            expect.objectContaining({ type: "lineTo", props: { x: 80.5, y: 80 } }),
            expect.objectContaining({ type: "moveTo", props: { x: 80.5, y: 124 } }),
            expect.objectContaining({ type: "lineTo", props: { x: 80.5, y: 180 } }),
        ]);
    });

    it("redraws section rows after horizontal blits", () => {
        const canvasCtx = get2dContext();
        const theme = mergeAndRealizeTheme(getDefaultTheme());
        const columns = [makeColumn(0, true), makeColumn(1, false), makeColumn(2, false), makeColumn(3, false)];
        const sectionCell: InnerGridCell = {
            kind: InnerGridCellKind.Section,
            allowOverlay: false,
            title: "Frozen section title that should repaint after horizontal scroll",
            span: [0, 3],
        };
        const loadingCell: InnerGridCell = {
            kind: GridCellKind.Loading,
            allowOverlay: false,
        };
        const getCellContent: DrawGridArg["getCellContent"] = ([, row]) => (row === 0 ? sectionCell : loadingCell);
        const lastBlitData: DrawGridArg["lastBlitData"] = { current: undefined };
        const selection: DrawGridArg["selection"] = {
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        };
        const contexts = {
            canvasCtx,
            headerCanvasCtx: get2dContext(),
            bufferACtx: get2dContext(),
            bufferBCtx: get2dContext(),
        };

        const firstArg = makeDrawGridArg(contexts, 0, columns, getCellContent, lastBlitData, theme, selection);
        drawGrid(firstArg, undefined);

        const drawCallCount = canvasCtx.__getDrawCalls().length;
        const secondArg = makeDrawGridArg(contexts, -24, columns, getCellContent, lastBlitData, theme, selection);
        drawGrid(secondArg, firstArg);

        const textCalls = canvasCtx
            .__getDrawCalls()
            .slice(drawCallCount)
            .filter(
                call =>
                    call.type === "fillText" &&
                    call.props.text === "Frozen section title that should repaint after horizontal scroll"
            );

        expect(textCalls).toHaveLength(2);
        expect(textCalls.map(call => call.props.x)).toEqual([
            theme.cellHorizontalPadding * 2,
            theme.cellHorizontalPadding * 2,
        ]);
    });
});
