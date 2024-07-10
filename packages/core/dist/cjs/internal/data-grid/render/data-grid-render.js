"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawGrid = void 0;
const data_grid_lib_js_1 = require("./data-grid-lib.js");
const color_parser_js_1 = require("../color-parser.js");
const support_js_1 = require("../../../common/support.js");
const data_grid_render_walk_js_1 = require("./data-grid-render.walk.js");
const data_grid_render_cells_js_1 = require("./data-grid-render.cells.js");
const data_grid_render_header_js_1 = require("./data-grid-render.header.js");
const data_grid_render_lines_js_1 = require("./data-grid-render.lines.js");
const data_grid_render_blit_js_1 = require("./data-grid-render.blit.js");
const data_grid_render_rings_js_1 = require("./data-grid.render.rings.js");
// Future optimization opportunities
// - Create a cache of a buffer used to render the full view of a partially displayed column so that when
//   scrolling horizontally you can simply blit the pre-drawn column instead of continually paying the draw
//   cost as it slides into view.
// - The same as above but for partially displayed rows
// - Blit headers on horizontal scroll
// - Use webworker to load images, helpful with lots of large images
// - Retain mode for drawing cells. Instead of drawing cells as we come across them, first build a data
//   structure which contains all operations to perform, then sort them all by "prep" requirement, then do
//   all like operations at once.
function clipHeaderDamage(ctx, effectiveColumns, width, groupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage) {
    if (damage === undefined || damage.size === 0)
        return;
    ctx.beginPath();
    (0, data_grid_render_walk_js_1.walkGroups)(effectiveColumns, width, translateX, groupHeaderHeight, (span, _group, x, y, w, h) => {
        const hasItemInSpan = damage.hasItemInRectangle({
            x: span[0],
            y: -2,
            width: span[1] - span[0] + 1,
            height: 1,
        });
        if (hasItemInSpan) {
            ctx.rect(x, y, w, h);
        }
    });
    (0, data_grid_render_walk_js_1.walkColumns)(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _colDrawY, clipX) => {
        const diff = Math.max(0, clipX - drawX);
        const finalX = drawX + diff + 1;
        const finalWidth = c.width - diff - 1;
        if (damage.has([c.sourceIndex, -1])) {
            ctx.rect(finalX, groupHeaderHeight, finalWidth, totalHeaderHeight - groupHeaderHeight);
        }
    });
    ctx.clip();
}
function getLastRow(effectiveColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow) {
    let result = 0;
    (0, data_grid_render_walk_js_1.walkColumns)(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (_c, __drawX, colDrawY, _clipX, startRow) => {
        (0, data_grid_render_walk_js_1.walkRowsInCol)(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (_drawY, row, _rh, isSticky) => {
            if (!isSticky) {
                result = Math.max(row, result);
            }
        });
        return true;
    });
    return result;
}
function drawGrid(arg, lastArg) {
    const { canvasCtx, headerCanvasCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, enableGroups, freezeColumns, dragAndDropState, theme, drawFocus, headerHeight, groupHeaderHeight, disabledRows, rowHeight, verticalBorder, overrideCursor, isResizing, selection, fillHandle, freezeTrailingRows, rows, getCellContent, getGroupDetails, getRowThemeOverride, isFocused, drawHeaderCallback, prelightCells, drawCellCallback, highlightRegions, resizeCol, imageLoader, lastBlitData, hoverValues, hyperWrapping, hoverInfo, spriteManager, maxScaleFactor, hasAppendRow, touchMode, enqueue, renderStateProvider, getCellRenderer, renderStrategy, bufferACtx, bufferBCtx, damage, minimumCellWidth, resizeIndicator, } = arg;
    if (width === 0 || height === 0)
        return;
    const doubleBuffer = renderStrategy === "double-buffer";
    const dpr = Math.min(maxScaleFactor, Math.ceil(window.devicePixelRatio ?? 1));
    // if we are double buffering we need to make sure we can blit. If we can't we need to redraw the whole thing
    const canBlit = renderStrategy !== "direct" && (0, data_grid_render_blit_js_1.computeCanBlit)(arg, lastArg);
    const canvas = canvasCtx.canvas;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }
    const overlayCanvas = headerCanvasCtx.canvas;
    const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;
    const overlayHeight = totalHeaderHeight + 1; // border
    if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== overlayHeight * dpr) {
        overlayCanvas.width = width * dpr;
        overlayCanvas.height = overlayHeight * dpr;
        overlayCanvas.style.width = width + "px";
        overlayCanvas.style.height = overlayHeight + "px";
    }
    const bufferA = bufferACtx.canvas;
    const bufferB = bufferBCtx.canvas;
    if (doubleBuffer && (bufferA.width !== width * dpr || bufferA.height !== height * dpr)) {
        bufferA.width = width * dpr;
        bufferA.height = height * dpr;
        if (lastBlitData.current !== undefined)
            lastBlitData.current.aBufferScroll = undefined;
    }
    if (doubleBuffer && (bufferB.width !== width * dpr || bufferB.height !== height * dpr)) {
        bufferB.width = width * dpr;
        bufferB.height = height * dpr;
        if (lastBlitData.current !== undefined)
            lastBlitData.current.bBufferScroll = undefined;
    }
    const last = lastBlitData.current;
    if (canBlit === true &&
        cellXOffset === last?.cellXOffset &&
        cellYOffset === last?.cellYOffset &&
        translateX === last?.translateX &&
        translateY === last?.translateY)
        return;
    let mainCtx = null;
    if (doubleBuffer) {
        mainCtx = canvasCtx;
    }
    const overlayCtx = headerCanvasCtx;
    let targetCtx;
    if (!doubleBuffer) {
        targetCtx = canvasCtx;
    }
    else if (damage !== undefined) {
        targetCtx = last?.lastBuffer === "b" ? bufferBCtx : bufferACtx;
    }
    else {
        targetCtx = last?.lastBuffer === "b" ? bufferACtx : bufferBCtx;
    }
    const targetBuffer = targetCtx.canvas;
    const blitSource = doubleBuffer ? (targetBuffer === bufferA ? bufferB : bufferA) : canvas;
    const getRowHeight = typeof rowHeight === "number" ? () => rowHeight : rowHeight;
    overlayCtx.save();
    targetCtx.save();
    overlayCtx.beginPath();
    targetCtx.beginPath();
    overlayCtx.textBaseline = "middle";
    targetCtx.textBaseline = "middle";
    if (dpr !== 1) {
        overlayCtx.scale(dpr, dpr);
        targetCtx.scale(dpr, dpr);
    }
    const effectiveCols = (0, data_grid_lib_js_1.getEffectiveColumns)(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    let drawRegions = [];
    const mustDrawFocusOnHeader = drawFocus && selection.current?.cell[1] === cellYOffset && translateY === 0;
    let mustDrawHighlightRingsOnHeader = false;
    if (highlightRegions !== undefined) {
        for (const r of highlightRegions) {
            if (r.style !== "no-outline" && r.range.y === cellYOffset && translateY === 0) {
                mustDrawHighlightRingsOnHeader = true;
                break;
            }
        }
    }
    const drawHeaderTexture = () => {
        (0, data_grid_render_header_js_1.drawGridHeaders)(overlayCtx, effectiveCols, enableGroups, hoverInfo, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, theme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode);
        (0, data_grid_render_lines_js_1.drawGridLines)(overlayCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, undefined, undefined, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, true);
        overlayCtx.beginPath();
        overlayCtx.moveTo(0, overlayHeight - 0.5);
        overlayCtx.lineTo(width, overlayHeight - 0.5);
        overlayCtx.strokeStyle = (0, color_parser_js_1.blend)(theme.headerBottomBorderColor ?? theme.horizontalBorderColor ?? theme.borderColor, theme.bgHeader);
        overlayCtx.stroke();
        if (mustDrawHighlightRingsOnHeader) {
            (0, data_grid_render_rings_js_1.drawHighlightRings)(overlayCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
        }
        if (mustDrawFocusOnHeader) {
            (0, data_grid_render_rings_js_1.drawFillHandle)(overlayCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
        }
    };
    // handle damage updates by directly drawing to the target to avoid large blits
    if (damage !== undefined) {
        const viewRegionWidth = effectiveCols[effectiveCols.length - 1].sourceIndex + 1;
        const damageInView = damage.hasItemInRegion([
            {
                x: cellXOffset,
                y: -2,
                width: viewRegionWidth,
                height: 2,
            },
            {
                x: cellXOffset,
                y: cellYOffset,
                width: viewRegionWidth,
                height: 300,
            },
            {
                x: 0,
                y: cellYOffset,
                width: freezeColumns,
                height: 300,
            },
            {
                x: 0,
                y: -2,
                width: freezeColumns,
                height: 2,
            },
            {
                x: cellXOffset,
                y: rows - freezeTrailingRows,
                width: viewRegionWidth,
                height: freezeTrailingRows,
                when: freezeTrailingRows > 0,
            },
        ]);
        const doDamage = (ctx) => {
            (0, data_grid_render_cells_js_1.drawCells)(ctx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
            const selectionCurrent = selection.current;
            if (fillHandle &&
                drawFocus &&
                selectionCurrent !== undefined &&
                damage.has((0, data_grid_lib_js_1.rectBottomRight)(selectionCurrent.range))) {
                (0, data_grid_render_rings_js_1.drawFillHandle)(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
            }
        };
        if (damageInView) {
            doDamage(targetCtx);
            if (mainCtx !== null) {
                mainCtx.save();
                mainCtx.scale(dpr, dpr);
                mainCtx.textBaseline = "middle";
                doDamage(mainCtx);
                mainCtx.restore();
            }
            const doHeaders = damage.hasHeader();
            if (doHeaders) {
                clipHeaderDamage(overlayCtx, effectiveCols, width, groupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage);
                drawHeaderTexture();
            }
        }
        targetCtx.restore();
        overlayCtx.restore();
        return;
    }
    if (canBlit !== true ||
        cellXOffset !== last?.cellXOffset ||
        translateX !== last?.translateX ||
        mustDrawFocusOnHeader !== last?.mustDrawFocusOnHeader ||
        mustDrawHighlightRingsOnHeader !== last?.mustDrawHighlightRingsOnHeader) {
        drawHeaderTexture();
    }
    if (canBlit === true) {
        (0, support_js_1.assert)(blitSource !== undefined && last !== undefined);
        const { regions } = (0, data_grid_render_blit_js_1.blitLastFrame)(targetCtx, blitSource, blitSource === bufferA ? last.aBufferScroll : last.bBufferScroll, blitSource === bufferA ? last.bBufferScroll : last.aBufferScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, rowHeight, doubleBuffer);
        drawRegions = regions;
    }
    else if (canBlit !== false) {
        (0, support_js_1.assert)(last !== undefined);
        const resizedCol = canBlit;
        drawRegions = (0, data_grid_render_blit_js_1.blitResizedCol)(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedCol);
    }
    (0, data_grid_render_lines_js_1.overdrawStickyBoundaries)(targetCtx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme);
    const highlightRedraw = (0, data_grid_render_rings_js_1.drawHighlightRings)(targetCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
    // the overdraw may have nuked out our focus ring right edge.
    const focusRedraw = drawFocus
        ? (0, data_grid_render_rings_js_1.drawFillHandle)(targetCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows)
        : undefined;
    targetCtx.fillStyle = theme.bgCell;
    if (drawRegions.length > 0) {
        targetCtx.beginPath();
        for (const r of drawRegions) {
            targetCtx.rect(r.x, r.y, r.width, r.height);
        }
        targetCtx.clip();
        targetCtx.fill();
        targetCtx.beginPath();
    }
    else {
        targetCtx.fillRect(0, 0, width, height);
    }
    const spans = (0, data_grid_render_cells_js_1.drawCells)(targetCtx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
    (0, data_grid_render_lines_js_1.drawBlanks)(targetCtx, effectiveCols, mappedColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowThemeOverride, selection.rows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme);
    (0, data_grid_render_lines_js_1.drawExtraRowThemes)(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
    (0, data_grid_render_lines_js_1.drawGridLines)(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
    highlightRedraw?.();
    focusRedraw?.();
    if (isResizing && resizeIndicator !== "none") {
        (0, data_grid_render_walk_js_1.walkColumns)(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
            if (c.sourceIndex === resizeCol) {
                (0, data_grid_render_rings_js_1.drawColumnResizeOutline)(overlayCtx, x + c.width, 0, totalHeaderHeight + 1, (0, color_parser_js_1.blend)(theme.resizeIndicatorColor ?? theme.accentLight, theme.bgHeader));
                if (resizeIndicator === "full") {
                    (0, data_grid_render_rings_js_1.drawColumnResizeOutline)(targetCtx, x + c.width, totalHeaderHeight, height, (0, color_parser_js_1.blend)(theme.resizeIndicatorColor ?? theme.accentLight, theme.bgCell));
                }
                return true;
            }
            return false;
        });
    }
    if (mainCtx !== null) {
        mainCtx.fillStyle = theme.bgCell;
        mainCtx.fillRect(0, 0, width, height);
        mainCtx.drawImage(targetCtx.canvas, 0, 0);
    }
    const lastRowDrawn = getLastRow(effectiveCols, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow);
    imageLoader?.setWindow({
        x: cellXOffset,
        y: cellYOffset,
        width: effectiveCols.length,
        height: lastRowDrawn - cellYOffset,
    }, freezeColumns, Array.from({ length: freezeTrailingRows }, (_, i) => rows - 1 - i));
    const scrollX = last !== undefined && (cellXOffset !== last.cellXOffset || translateX !== last.translateX);
    const scrollY = last !== undefined && (cellYOffset !== last.cellYOffset || translateY !== last.translateY);
    lastBlitData.current = {
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        mustDrawFocusOnHeader,
        mustDrawHighlightRingsOnHeader,
        lastBuffer: doubleBuffer ? (targetBuffer === bufferA ? "a" : "b") : undefined,
        aBufferScroll: targetBuffer === bufferA ? [scrollX, scrollY] : last?.aBufferScroll,
        bBufferScroll: targetBuffer === bufferB ? [scrollX, scrollY] : last?.bBufferScroll,
    };
    targetCtx.restore();
    overlayCtx.restore();
}
exports.drawGrid = drawGrid;
//# sourceMappingURL=data-grid-render.js.map