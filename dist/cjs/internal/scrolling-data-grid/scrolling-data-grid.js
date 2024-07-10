"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const data_grid_dnd_js_1 = __importDefault(require("../data-grid-dnd/data-grid-dnd.js"));
const infinite_scroller_js_1 = require("./infinite-scroller.js");
const GridScroller = p => {
    const { columns, rows, rowHeight, headerHeight, groupHeaderHeight, enableGroups, freezeColumns, experimental, nonGrowWidth, clientSize, className, onVisibleRegionChanged, scrollRef, preventDiagonalScrolling, rightElement, rightElementProps, overscrollX, overscrollY, initialSize, smoothScrollX = false, smoothScrollY = false, isDraggable, } = p;
    const { paddingRight, paddingBottom } = experimental ?? {};
    const [clientWidth, clientHeight] = clientSize;
    const last = React.useRef();
    const lastX = React.useRef();
    const lastY = React.useRef();
    const lastSize = React.useRef();
    const width = nonGrowWidth + Math.max(0, overscrollX ?? 0);
    let height = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
    if (typeof rowHeight === "number") {
        height += rows * rowHeight;
    }
    else {
        for (let r = 0; r < rows; r++) {
            height += rowHeight(r);
        }
    }
    if (overscrollY !== undefined) {
        height += overscrollY;
    }
    const lastArgs = React.useRef();
    const processArgs = React.useCallback(() => {
        if (lastArgs.current === undefined)
            return;
        const args = { ...lastArgs.current };
        let x = 0;
        let tx = args.x < 0 ? -args.x : 0;
        let cellRight = 0;
        let cellX = 0;
        args.x = args.x < 0 ? 0 : args.x;
        let stickyColWidth = 0;
        for (let i = 0; i < freezeColumns; i++) {
            stickyColWidth += columns[i].width;
        }
        for (const c of columns) {
            const cx = x - stickyColWidth;
            if (args.x >= cx + c.width) {
                x += c.width;
                cellX++;
                cellRight++;
            }
            else if (args.x > cx) {
                x += c.width;
                if (smoothScrollX) {
                    tx += cx - args.x;
                }
                else {
                    cellX++;
                }
                cellRight++;
            }
            else if (args.x + args.width > cx) {
                x += c.width;
                cellRight++;
            }
            else {
                break;
            }
        }
        let ty = 0;
        let cellY = 0;
        let cellBottom = 0;
        if (typeof rowHeight === "number") {
            if (smoothScrollY) {
                cellY = Math.floor(args.y / rowHeight);
                ty = cellY * rowHeight - args.y;
            }
            else {
                cellY = Math.ceil(args.y / rowHeight);
            }
            cellBottom = Math.ceil(args.height / rowHeight) + cellY;
            if (ty < 0)
                cellBottom++;
        }
        else {
            let y = 0;
            for (let row = 0; row < rows; row++) {
                const rh = rowHeight(row);
                const cy = y + (smoothScrollY ? 0 : rh / 2);
                if (args.y >= y + rh) {
                    y += rh;
                    cellY++;
                    cellBottom++;
                }
                else if (args.y > cy) {
                    y += rh;
                    if (smoothScrollY) {
                        ty += cy - args.y;
                    }
                    else {
                        cellY++;
                    }
                    cellBottom++;
                }
                else if (args.y + args.height > rh / 2 + y) {
                    y += rh;
                    cellBottom++;
                }
                else {
                    break;
                }
            }
        }
        const rect = {
            x: cellX,
            y: cellY,
            width: cellRight - cellX,
            height: cellBottom - cellY,
        };
        const oldRect = last.current;
        if (oldRect === undefined ||
            oldRect.y !== rect.y ||
            oldRect.x !== rect.x ||
            oldRect.height !== rect.height ||
            oldRect.width !== rect.width ||
            lastX.current !== tx ||
            lastY.current !== ty ||
            args.width !== lastSize.current?.[0] ||
            args.height !== lastSize.current?.[1]) {
            onVisibleRegionChanged?.({
                x: cellX,
                y: cellY,
                width: cellRight - cellX,
                height: cellBottom - cellY,
            }, args.width, args.height, args.paddingRight ?? 0, tx, ty);
            last.current = rect;
            lastX.current = tx;
            lastY.current = ty;
            lastSize.current = [args.width, args.height];
        }
    }, [columns, rowHeight, rows, onVisibleRegionChanged, freezeColumns, smoothScrollX, smoothScrollY]);
    const onScrollUpdate = React.useCallback((args) => {
        lastArgs.current = args;
        processArgs();
    }, [processArgs]);
    React.useEffect(() => {
        processArgs();
    }, [processArgs]);
    return (React.createElement(infinite_scroller_js_1.InfiniteScroller, { scrollRef: scrollRef, className: className, kineticScrollPerfHack: experimental?.kineticScrollPerfHack, preventDiagonalScrolling: preventDiagonalScrolling, draggable: isDraggable === true || typeof isDraggable === "string", scrollWidth: width + (paddingRight ?? 0), scrollHeight: height + (paddingBottom ?? 0), clientHeight: clientHeight, rightElement: rightElement, paddingBottom: paddingBottom, paddingRight: paddingRight, rightElementProps: rightElementProps, update: onScrollUpdate, initialSize: initialSize },
        React.createElement(data_grid_dnd_js_1.default, { eventTargetRef: scrollRef, width: clientWidth, height: clientHeight, accessibilityHeight: p.accessibilityHeight, canvasRef: p.canvasRef, cellXOffset: p.cellXOffset, cellYOffset: p.cellYOffset, columns: p.columns, disabledRows: p.disabledRows, enableGroups: p.enableGroups, fillHandle: p.fillHandle, firstColAccessible: p.firstColAccessible, fixedShadowX: p.fixedShadowX, fixedShadowY: p.fixedShadowY, freezeColumns: p.freezeColumns, getCellContent: p.getCellContent, getCellRenderer: p.getCellRenderer, getGroupDetails: p.getGroupDetails, getRowThemeOverride: p.getRowThemeOverride, groupHeaderHeight: p.groupHeaderHeight, headerHeight: p.headerHeight, highlightRegions: p.highlightRegions, imageWindowLoader: p.imageWindowLoader, isFilling: p.isFilling, isFocused: p.isFocused, lockColumns: p.lockColumns, maxColumnWidth: p.maxColumnWidth, minColumnWidth: p.minColumnWidth, onHeaderMenuClick: p.onHeaderMenuClick, onHeaderIndicatorClick: p.onHeaderIndicatorClick, onMouseMove: p.onMouseMove, prelightCells: p.prelightCells, rowHeight: p.rowHeight, rows: p.rows, selection: p.selection, theme: p.theme, freezeTrailingRows: p.freezeTrailingRows, hasAppendRow: p.hasAppendRow, translateX: p.translateX, translateY: p.translateY, onColumnProposeMove: p.onColumnProposeMove, verticalBorder: p.verticalBorder, drawFocusRing: p.drawFocusRing, drawHeader: p.drawHeader, drawCell: p.drawCell, experimental: p.experimental, gridRef: p.gridRef, headerIcons: p.headerIcons, isDraggable: p.isDraggable, onCanvasBlur: p.onCanvasBlur, onCanvasFocused: p.onCanvasFocused, onCellFocused: p.onCellFocused, onColumnMoved: p.onColumnMoved, onColumnResize: p.onColumnResize, onColumnResizeEnd: p.onColumnResizeEnd, onColumnResizeStart: p.onColumnResizeStart, onContextMenu: p.onContextMenu, onDragEnd: p.onDragEnd, onDragLeave: p.onDragLeave, onDragOverCell: p.onDragOverCell, onDragStart: p.onDragStart, onDrop: p.onDrop, onItemHovered: p.onItemHovered, onKeyDown: p.onKeyDown, onKeyUp: p.onKeyUp, onMouseDown: p.onMouseDown, onMouseUp: p.onMouseUp, onRowMoved: p.onRowMoved, smoothScrollX: p.smoothScrollX, smoothScrollY: p.smoothScrollY, resizeIndicator: p.resizeIndicator })));
};
exports.default = GridScroller;
//# sourceMappingURL=scrolling-data-grid.js.map