/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/no-for-loop */
import { deepEqual } from "../../../common/support.js";
import { type Rectangle } from "../data-grid-types.js";
import { getStickyWidth, type MappedGridColumn, getFreezeTrailingHeight } from "./data-grid-lib.js";
import { walkColumns } from "./data-grid-render.walk.js";
import type { DrawGridArg } from "./draw-grid-arg.js";

export interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly mustDrawFocusOnHeader: boolean;
    readonly mustDrawHighlightRingsOnHeader: boolean;
    readonly lastBuffer: "a" | "b" | undefined;
    aBufferScroll: [boolean, boolean] | undefined;
    bBufferScroll: [boolean, boolean] | undefined;
}

export function blitLastFrame(
    ctx: CanvasRenderingContext2D,
    blitSource: HTMLCanvasElement,
    blitSourceScroll: [boolean, boolean] | undefined,
    targetScroll: [boolean, boolean] | undefined,
    last: BlitData,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    freezeTrailingRows: number,
    width: number,
    height: number,
    rows: number,
    totalHeaderHeight: number,
    dpr: number,
    mappedColumns: readonly MappedGridColumn[],
    effectiveCols: readonly MappedGridColumn[],
    getRowHeight: number | ((r: number) => number),
    doubleBuffer: boolean
): {
    regions: Rectangle[];
} {
    const drawRegions: Rectangle[] = [];

    ctx.imageSmoothingEnabled = false;
    const minY = Math.min(last.cellYOffset, cellYOffset);
    const maxY = Math.max(last.cellYOffset, cellYOffset);
    let deltaY = 0;
    if (typeof getRowHeight === "number") {
        deltaY += (maxY - minY) * getRowHeight;
    } else {
        for (let i = minY; i < maxY; i++) {
            deltaY += getRowHeight(i);
        }
    }
    if (cellYOffset > last.cellYOffset) {
        deltaY = -deltaY;
    }
    deltaY += translateY - last.translateY;

    const minX = Math.min(last.cellXOffset, cellXOffset);
    const maxX = Math.max(last.cellXOffset, cellXOffset);
    let deltaX = 0;
    for (let i = minX; i < maxX; i++) {
        deltaX += mappedColumns[i].width;
    }
    if (cellXOffset > last.cellXOffset) {
        deltaX = -deltaX;
    }
    deltaX += translateX - last.translateX;

    const [stickyLeftWidth, stickyRightWidth] = getStickyWidth(effectiveCols);

    if (deltaX !== 0 && deltaY !== 0) {
        return {
            regions: [],
        };
    }

    const freezeTrailingRowsHeight =
        freezeTrailingRows > 0 ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) : 0;

    const blitWidth = width - stickyLeftWidth - Math.abs(deltaX) - stickyRightWidth;
    const blitHeight = height - totalHeaderHeight - freezeTrailingRowsHeight - Math.abs(deltaY) - 1;

    if (blitWidth > 150 && blitHeight > 150) {
        const args = {
            sx: 0,
            sy: 0,
            sw: width * dpr,
            sh: height * dpr,
            dx: 0,
            dy: 0,
            dw: width * dpr,
            dh: height * dpr,
        };

        // blit Y
        if (deltaY > 0) {
            // scrolling up
            args.sy = (totalHeaderHeight + 1) * dpr;
            args.sh = blitHeight * dpr;
            args.dy = (deltaY + totalHeaderHeight + 1) * dpr;
            args.dh = blitHeight * dpr;

            drawRegions.push({
                x: 0,
                y: totalHeaderHeight,
                width: width,
                height: deltaY + 1,
            });
        } else if (deltaY < 0) {
            // scrolling down
            args.sy = (-deltaY + totalHeaderHeight + 1) * dpr;
            args.sh = blitHeight * dpr;
            args.dy = (totalHeaderHeight + 1) * dpr;
            args.dh = blitHeight * dpr;

            drawRegions.push({
                x: 0,
                y: height + deltaY - freezeTrailingRowsHeight,
                width: width,
                height: -deltaY + freezeTrailingRowsHeight,
            });
        }

        // blit X
        if (deltaX > 0) {
            // pixels moving right
            args.sx = stickyLeftWidth * dpr;
            args.sw = blitWidth * dpr;
            args.dx = (deltaX + stickyLeftWidth) * dpr;
            args.dw = blitWidth * dpr;

            drawRegions.push({
                x: stickyLeftWidth - 1,
                y: 0,
                width: deltaX + 2, // extra width to account for first col not drawing a left side border
                height: height,
            });
        } else if (deltaX < 0) {
            // pixels moving left
            args.sx = (stickyLeftWidth - deltaX) * dpr;
            args.sw = blitWidth * dpr;
            args.dx = stickyLeftWidth * dpr;
            args.dw = blitWidth * dpr;

            drawRegions.push({
                x: width + deltaX,
                y: 0,
                width: -deltaX,
                height: height,
            });
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (doubleBuffer) {
            if (
                stickyLeftWidth > 0 &&
                deltaX !== 0 &&
                deltaY === 0 &&
                (targetScroll === undefined || blitSourceScroll?.[1] !== false)
            ) {
                // When double buffering the freeze columns can be offset by a couple pixels vertically between the two
                // buffers. We don't want to redraw them so we need to make sure to copy them between the buffers.
                const w = stickyLeftWidth * dpr;
                const h = height * dpr;
                ctx.drawImage(blitSource, 0, 0, w, h, 0, 0, w, h);
            }
            if (
                freezeTrailingRowsHeight > 0 &&
                deltaX === 0 &&
                deltaY !== 0 &&
                (targetScroll === undefined || blitSourceScroll?.[0] !== false)
            ) {
                const y = (height - freezeTrailingRowsHeight) * dpr;
                const w = width * dpr;
                const h = freezeTrailingRowsHeight * dpr;
                ctx.drawImage(blitSource, 0, y, w, h, 0, y, w, h);
            }
        }
        ctx.drawImage(blitSource, args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
        ctx.scale(dpr, dpr);
    }
    ctx.imageSmoothingEnabled = true;

    return {
        regions: drawRegions,
    };
}

export function blitResizedCol(
    last: BlitData,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    width: number,
    height: number,
    totalHeaderHeight: number,
    effectiveCols: readonly MappedGridColumn[],
    resizedIndex: number,
    freezeTrailingColumns: number
) {
    const drawRegions: Rectangle[] = [];

    // ctx.imageSmoothingEnabled = false;

    if (
        cellXOffset !== last.cellXOffset ||
        cellYOffset !== last.cellYOffset ||
        translateX !== last.translateX ||
        translateY !== last.translateY
    ) {
        return drawRegions;
    }

    walkColumns(
        effectiveCols,
        width,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        freezeTrailingColumns,
        (c, drawX, _drawY, clipX) => {
            if (c.sourceIndex === resizedIndex) {
                const x = Math.max(drawX, clipX) + 1;
                drawRegions.push({
                    x,
                    y: 0,
                    width: width - x,
                    height,
                });
                return true;
            }
        }
    );
    return drawRegions;
}

export function computeCanBlit(current: DrawGridArg, last: DrawGridArg | undefined): boolean | number {
    if (last === undefined) return false;
    if (
        current.width !== last.width ||
        current.height !== last.height ||
        current.theme !== last.theme ||
        current.headerHeight !== last.headerHeight ||
        current.rowHeight !== last.rowHeight ||
        current.rows !== last.rows ||
        current.freezeColumns !== last.freezeColumns ||
        current.getRowThemeOverride !== last.getRowThemeOverride ||
        current.isFocused !== last.isFocused ||
        current.isResizing !== last.isResizing ||
        current.verticalBorder !== last.verticalBorder ||
        current.getCellContent !== last.getCellContent ||
        current.highlightRegions !== last.highlightRegions ||
        current.selection !== last.selection ||
        current.dragAndDropState !== last.dragAndDropState ||
        current.prelightCells !== last.prelightCells ||
        current.touchMode !== last.touchMode ||
        current.maxScaleFactor !== last.maxScaleFactor
    ) {
        return false;
    }
    if (current.mappedColumns !== last.mappedColumns) {
        if (current.mappedColumns.length > 100 || current.mappedColumns.length !== last.mappedColumns.length) {
            // The array is big, let's just redraw the damned thing rather than check these all. Or the number of cols
            // changed in which case I dont want to figure out what happened.
            return false;
        }
        // We want to know if only one column has resized. If this is the case we can do a special left/right sliding
        // blit. Or just not redraw shit on the left.
        let resized: number | undefined;
        for (let i = 0; i < current.mappedColumns.length; i++) {
            const curCol = current.mappedColumns[i];
            const lastCol = last.mappedColumns[i];

            if (deepEqual(curCol, lastCol)) continue;

            // two columns changed, abort
            if (resized !== undefined) return false;

            if (curCol.width === lastCol.width) return false;

            const { width, ...curRest } = curCol;
            const { width: lastWidth, ...lastRest } = lastCol;

            // more than width changed, abort
            if (!deepEqual(curRest, lastRest)) return false;
            resized = i;
        }
        if (resized === undefined) {
            // we never found a changed column, cool, we can blit
            return true;
        }
        return resized;
    }
    return true;
}
