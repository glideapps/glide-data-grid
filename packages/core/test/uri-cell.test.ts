/* eslint-disable sonarjs/no-duplicate-string */
import { describe, it, expect, vi } from "vitest";
import { GridCellKind, type UriCell } from "../src/internal/data-grid/data-grid-types.js";
import { uriCellRenderer } from "../src/cells/uri-cell.js";
import type { DrawArgs } from "../src/index.js";
import { getDataEditorTheme, mergeAndRealizeTheme } from "../src/common/styles.js";
import type { DrawStateTuple } from "../src/cells/cell-types.js";

const baseDrawArgs = {
    cellFillColor: "red",
    col: 0,
    row: 0,
    drawState: [undefined, () => undefined] as DrawStateTuple,
    frameTime: 0,
    highlighted: false,
    hoverAmount: 0,
    hyperWrapping: false,
    imageLoader: {} as any,
    overrideCursor: () => undefined,
    requestAnimationFrame: () => undefined,
    spriteManager: {} as any,
};

describe("uriCellRenderer", () => {
    const theme = mergeAndRealizeTheme(getDataEditorTheme());
    const mockCanvasContext = {
        save: vi.fn(),
        restore: vi.fn(),
        textBaseline: "top",
        stroke: vi.fn(),
        measureText: vi.fn(text => ({ width: text.length * 10, actualBoundingBoxAscent: 16 })),
        fillText: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
    } as any;

    it("getAccessibilityString returns correct string", () => {
        const cell: UriCell = { kind: GridCellKind.Uri, data: "http://example.com", allowOverlay: true };
        expect(uriCellRenderer.getAccessibilityString(cell)).toBe("http://example.com");
    });

    it("draw function applies underline on hover", () => {
        const cell: UriCell = {
            kind: GridCellKind.Uri,
            data: "http://example.com",
            hoverEffect: true,
            allowOverlay: true,
        };
        const drawArgs: DrawArgs<UriCell> = {
            ...baseDrawArgs,
            cell,
            theme,
            hoverAmount: 1,
            ctx: mockCanvasContext,
            rect: { x: 0, y: 0, width: 100, height: 120 },
            hoverX: 10,
            hoverY: 60,
        };
        uriCellRenderer.draw(drawArgs, cell);
        expect(mockCanvasContext.measureText).toHaveBeenCalledWith("http://example.com");
        expect(mockCanvasContext.stroke).toHaveBeenCalled();
    });

    it("onClick triggers onClickUri callback when clicked in the right area", () => {
        const onClickUriMock = vi.fn();
        const cell: UriCell = {
            kind: GridCellKind.Uri,
            data: "http://example.com",
            hoverEffect: true,
            onClickUri: onClickUriMock,
            allowOverlay: true,
        };
        const drawArgs: DrawArgs<UriCell> = {
            ...baseDrawArgs,
            cell,
            theme,
            ctx: mockCanvasContext,
            rect: { x: 0, y: 0, width: 100, height: 120 },
            hoverX: 10,
            hoverY: 10,
        };
        uriCellRenderer.draw(drawArgs, cell);
        uriCellRenderer.onClick?.({
            cell,
            bounds: { x: 0, y: 0, width: 100, height: 120 },
            posX: 10,
            posY: 60,
            theme,
            button: 0,
            buttons: 0,
            ctrlKey: false,
            isEdge: false,
            isTouch: false,
            location: [0, 0],
            metaKey: false,
            preventDefault: () => undefined,
            scrollEdge: [0, 0],
            shiftKey: false,
        });
        expect(onClickUriMock).toHaveBeenCalled();
    });

    it("measure returns correct width", () => {
        const cell: UriCell = { kind: GridCellKind.Uri, data: "http://example.com", allowOverlay: true };
        const width = uriCellRenderer.measure?.(mockCanvasContext, cell, theme);
        expect(width).toBe("http://example.com".length * 10 + theme.cellHorizontalPadding * 2);
    });

    it("onDelete clears cell data", () => {
        const cell: UriCell = { kind: GridCellKind.Uri, data: "http://example.com", allowOverlay: true };
        const updatedCell = uriCellRenderer.onDelete?.(cell);
        expect(updatedCell?.data).toBe("");
    });

    it("onPaste updates cell data correctly", () => {
        const cell: UriCell = { kind: GridCellKind.Uri, data: "http://example.com", allowOverlay: true };
        const pasteData = "http://newexample.com";
        const updatedCell = uriCellRenderer.onPaste(pasteData, cell, {
            rawValue: pasteData,
        });
        expect(updatedCell?.data).toBe(pasteData);
    });

    it("onClick triggers onClickUri callback on middle click (button 1)", () => {
        const onClickUriMock = vi.fn();
        const cell: UriCell = {
            kind: GridCellKind.Uri,
            data: "http://example.com",
            hoverEffect: true,
            onClickUri: onClickUriMock,
            allowOverlay: true,
        };
        const drawArgs: DrawArgs<UriCell> = {
            ...baseDrawArgs,
            cell,
            theme,
            ctx: mockCanvasContext,
            rect: { x: 0, y: 0, width: 100, height: 120 },
            hoverX: 10,
            hoverY: 10,
        };
        uriCellRenderer.draw(drawArgs, cell);
        uriCellRenderer.onClick?.({
            cell,
            bounds: { x: 0, y: 0, width: 100, height: 120 },
            posX: 10,
            posY: 60,
            theme,
            button: 1, // Middle click
            buttons: 0,
            ctrlKey: false,
            isEdge: false,
            isTouch: false,
            location: [0, 0],
            metaKey: false,
            preventDefault: () => undefined,
            scrollEdge: [0, 0],
            shiftKey: false,
        });
        expect(onClickUriMock).toHaveBeenCalled();
    });
});
