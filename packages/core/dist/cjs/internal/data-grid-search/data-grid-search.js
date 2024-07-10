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
/* eslint-disable unicorn/consistent-destructuring */
const React = __importStar(require("react"));
const data_grid_types_js_1 = require("../data-grid/data-grid-types.js");
const scrolling_data_grid_js_1 = __importDefault(require("../scrolling-data-grid/scrolling-data-grid.js"));
const data_grid_search_style_js_1 = require("./data-grid-search-style.js");
const support_js_1 = require("../../common/support.js");
// icons
const upArrow = (React.createElement("svg", { className: "button-icon", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 244l144-144 144 144M256 120v292" })));
const downArrow = (React.createElement("svg", { className: "button-icon", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 268l144 144 144-144M256 392V100" })));
const closeX = (React.createElement("svg", { className: "button-icon", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32", d: "M368 368L144 144M368 144L144 368" })));
const targetSearchTimeMS = 10;
const DataGridSearch = p => {
    const { canvasRef, cellYOffset, rows, columns, searchInputRef, searchValue, searchResults: searchResultsIn, onSearchValueChange, getCellsForSelection, onSearchResultsChanged, showSearch = false, onSearchClose, } = p;
    const [searchID] = React.useState(() => "search-box-" + Math.round(Math.random() * 1000));
    const [searchStringInner, setSearchStringInner] = React.useState("");
    const searchString = searchValue ?? searchStringInner;
    // always emit both, this allows the user to spy on the search value without controlling it.
    const setSearchString = React.useCallback((newVal) => {
        setSearchStringInner(newVal);
        onSearchValueChange?.(newVal);
    }, [onSearchValueChange]);
    const [searchStatus, setSearchStatus] = React.useState();
    const searchStatusRef = React.useRef(searchStatus);
    searchStatusRef.current = searchStatus;
    React.useEffect(() => {
        if (searchResultsIn === undefined)
            return;
        if (searchResultsIn.length > 0) {
            setSearchStatus(cv => ({
                rowsSearched: rows,
                results: searchResultsIn.length,
                selectedIndex: cv?.selectedIndex ?? -1,
            }));
        }
        else {
            setSearchStatus(undefined);
        }
    }, [rows, searchResultsIn]);
    const abortControllerRef = React.useRef();
    if (abortControllerRef.current === undefined)
        abortControllerRef.current = new AbortController();
    const searchHandle = React.useRef();
    const [searchResultsInner, setSearchResultsInner] = React.useState([]);
    const searchResults = searchResultsIn ?? searchResultsInner;
    const cancelSearch = React.useCallback(() => {
        if (searchHandle.current !== undefined) {
            window.cancelAnimationFrame(searchHandle.current);
            searchHandle.current = undefined;
            abortControllerRef.current.abort();
        }
    }, []);
    const cellYOffsetRef = React.useRef(cellYOffset);
    cellYOffsetRef.current = cellYOffset;
    const beginSearch = React.useCallback((str) => {
        const regex = new RegExp(str.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
        let startY = cellYOffsetRef.current;
        // Lets assume we can do 10 rows at a time
        // This is usually very safe and limits the damage for bad
        // performing sheets.
        let searchStride = Math.min(10, rows);
        let rowsSearched = 0;
        setSearchStatus(undefined);
        setSearchResultsInner([]);
        const runningResult = [];
        const tick = async () => {
            if (getCellsForSelection === undefined)
                return;
            const tStart = performance.now();
            const rowsLeft = rows - rowsSearched;
            let data = getCellsForSelection({
                x: 0,
                y: startY,
                width: columns.length,
                height: Math.min(searchStride, rowsLeft, rows - startY),
            }, abortControllerRef.current.signal);
            if (typeof data === "function") {
                data = await data();
            }
            let added = false;
            for (const [row, d] of data.entries()) {
                for (const [col, cell] of d.entries()) {
                    let testString;
                    switch (cell.kind) {
                        case data_grid_types_js_1.GridCellKind.Text:
                        case data_grid_types_js_1.GridCellKind.Number:
                            testString = cell.displayData;
                            break;
                        case data_grid_types_js_1.GridCellKind.Uri:
                        case data_grid_types_js_1.GridCellKind.Markdown:
                            testString = cell.data;
                            break;
                        case data_grid_types_js_1.GridCellKind.Boolean:
                            testString = typeof cell.data === "boolean" ? cell.data.toString() : undefined;
                            break;
                        case data_grid_types_js_1.GridCellKind.Image:
                        case data_grid_types_js_1.GridCellKind.Bubble:
                            // I know its lazy, but unless someone is actually
                            // searching for the whale emoji, this is pretty side effect
                            // free. And ya know... it's nice and easy to do...
                            testString = cell.data.join("🐳");
                            break;
                        case data_grid_types_js_1.GridCellKind.Custom:
                            testString = cell.copyData;
                            break;
                    }
                    if (testString !== undefined && regex.test(testString)) {
                        runningResult.push([col, row + startY]);
                        added = true;
                    }
                }
            }
            const tEnd = performance.now();
            if (added) {
                setSearchResultsInner([...runningResult]);
            }
            rowsSearched += data.length;
            (0, support_js_1.assert)(rowsSearched <= rows);
            const selectedIndex = searchStatusRef.current?.selectedIndex ?? -1;
            setSearchStatus({
                results: runningResult.length,
                rowsSearched,
                selectedIndex,
            });
            onSearchResultsChanged?.(runningResult, selectedIndex);
            if (startY + searchStride >= rows) {
                startY = 0;
            }
            else {
                startY += searchStride;
            }
            const tElapsed = tEnd - tStart;
            const rounded = Math.max(tElapsed, 1);
            const scalar = targetSearchTimeMS / rounded;
            searchStride = Math.ceil(searchStride * scalar);
            if (rowsSearched < rows && runningResult.length < 1000) {
                searchHandle.current = window.requestAnimationFrame(tick);
            }
        };
        cancelSearch();
        searchHandle.current = window.requestAnimationFrame(tick);
    }, [cancelSearch, columns.length, getCellsForSelection, onSearchResultsChanged, rows]);
    const onClose = React.useCallback(() => {
        onSearchClose?.();
        setSearchStatus(undefined);
        setSearchResultsInner([]);
        onSearchResultsChanged?.([], -1);
        cancelSearch();
        canvasRef?.current?.focus();
    }, [cancelSearch, canvasRef, onSearchClose, onSearchResultsChanged]);
    const onSearchChange = React.useCallback((event) => {
        setSearchString(event.target.value);
        if (searchResultsIn !== undefined)
            return;
        if (event.target.value === "") {
            setSearchStatus(undefined);
            setSearchResultsInner([]);
            cancelSearch();
        }
        else {
            beginSearch(event.target.value);
        }
    }, [beginSearch, cancelSearch, setSearchString, searchResultsIn]);
    React.useEffect(() => {
        if (showSearch && searchInputRef.current !== null) {
            setSearchString("");
            searchInputRef.current.focus({ preventScroll: true });
        }
    }, [showSearch, searchInputRef, setSearchString]);
    const onNext = React.useCallback((ev) => {
        ev?.stopPropagation?.();
        if (searchStatus === undefined)
            return;
        const newIndex = (searchStatus.selectedIndex + 1) % searchStatus.results;
        setSearchStatus({
            ...searchStatus,
            selectedIndex: newIndex,
        });
        onSearchResultsChanged?.(searchResults, newIndex);
    }, [searchStatus, onSearchResultsChanged, searchResults]);
    const onPrev = React.useCallback((ev) => {
        ev?.stopPropagation?.();
        if (searchStatus === undefined)
            return;
        let newIndex = (searchStatus.selectedIndex - 1) % searchStatus.results;
        if (newIndex < 0)
            newIndex += searchStatus.results;
        setSearchStatus({
            ...searchStatus,
            selectedIndex: newIndex,
        });
        onSearchResultsChanged?.(searchResults, newIndex);
    }, [onSearchResultsChanged, searchResults, searchStatus]);
    const onSearchKeyDown = React.useCallback((event) => {
        if (((event.ctrlKey || event.metaKey) && event.nativeEvent.code === "KeyF") || event.key === "Escape") {
            onClose();
            event.stopPropagation();
            event.preventDefault();
        }
        else if (event.key === "Enter") {
            if (event.shiftKey) {
                onPrev();
            }
            else {
                onNext();
            }
        }
    }, [onClose, onNext, onPrev]);
    // cancel search if the component is unmounted
    React.useEffect(() => {
        return () => {
            cancelSearch();
        };
    }, [cancelSearch]);
    const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);
    React.useEffect(() => {
        if (showSearch) {
            setIsAnimatingOut(true);
        }
        else {
            const timeoutId = setTimeout(() => setIsAnimatingOut(false), 150);
            return () => clearTimeout(timeoutId);
        }
    }, [showSearch]);
    const searchbox = React.useMemo(() => {
        if (!showSearch && !isAnimatingOut) {
            return null;
        }
        let resultString;
        if (searchStatus !== undefined) {
            resultString =
                searchStatus.results >= 1000
                    ? `over 1000`
                    : `${searchStatus.results} result${searchStatus.results !== 1 ? "s" : ""}`;
            if (searchStatus.selectedIndex >= 0) {
                resultString = `${searchStatus.selectedIndex + 1} of ${resultString}`;
            }
        }
        const cancelEvent = (ev) => {
            ev.stopPropagation();
        };
        const rowsSearchedProgress = Math.floor(((searchStatus?.rowsSearched ?? 0) / rows) * 100);
        const progressStyle = {
            width: `${rowsSearchedProgress}%`,
        };
        return (React.createElement(data_grid_search_style_js_1.SearchWrapper, { className: showSearch ? "" : "out", onMouseDown: cancelEvent, onMouseMove: cancelEvent, onMouseUp: cancelEvent, onClick: cancelEvent },
            React.createElement("div", { className: "gdg-search-bar-inner" },
                React.createElement("input", { id: searchID, "aria-hidden": !showSearch, "data-testid": "search-input", ref: searchInputRef, onChange: onSearchChange, value: searchString, tabIndex: showSearch ? undefined : -1, onKeyDownCapture: onSearchKeyDown }),
                React.createElement("button", { "aria-label": "Previous Result", "aria-hidden": !showSearch, tabIndex: showSearch ? undefined : -1, onClick: onPrev, disabled: (searchStatus?.results ?? 0) === 0 }, upArrow),
                React.createElement("button", { "aria-label": "Next Result", "aria-hidden": !showSearch, tabIndex: showSearch ? undefined : -1, onClick: onNext, disabled: (searchStatus?.results ?? 0) === 0 }, downArrow),
                onSearchClose !== undefined && (React.createElement("button", { "aria-label": "Close Search", "aria-hidden": !showSearch, "data-testid": "search-close-button", tabIndex: showSearch ? undefined : -1, onClick: onClose }, closeX))),
            searchStatus !== undefined ? (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gdg-search-status" },
                    React.createElement("div", { "data-testid": "search-result-area" }, resultString)),
                React.createElement("div", { className: "gdg-search-progress", style: progressStyle }))) : (React.createElement("div", { className: "gdg-search-status" },
                React.createElement("label", { htmlFor: searchID }, "Type to search")))));
    }, [
        showSearch,
        isAnimatingOut,
        searchStatus,
        rows,
        searchID,
        searchInputRef,
        onSearchChange,
        searchString,
        onSearchKeyDown,
        onPrev,
        onNext,
        onSearchClose,
        onClose,
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement(scrolling_data_grid_js_1.default, { prelightCells: searchResults, accessibilityHeight: p.accessibilityHeight, canvasRef: p.canvasRef, cellXOffset: p.cellXOffset, cellYOffset: p.cellYOffset, className: p.className, clientSize: p.clientSize, columns: p.columns, disabledRows: p.disabledRows, enableGroups: p.enableGroups, fillHandle: p.fillHandle, firstColAccessible: p.firstColAccessible, nonGrowWidth: p.nonGrowWidth, fixedShadowX: p.fixedShadowX, fixedShadowY: p.fixedShadowY, freezeColumns: p.freezeColumns, getCellContent: p.getCellContent, getCellRenderer: p.getCellRenderer, getGroupDetails: p.getGroupDetails, getRowThemeOverride: p.getRowThemeOverride, groupHeaderHeight: p.groupHeaderHeight, headerHeight: p.headerHeight, highlightRegions: p.highlightRegions, imageWindowLoader: p.imageWindowLoader, initialSize: p.initialSize, isFilling: p.isFilling, isFocused: p.isFocused, lockColumns: p.lockColumns, maxColumnWidth: p.maxColumnWidth, minColumnWidth: p.minColumnWidth, onHeaderMenuClick: p.onHeaderMenuClick, onHeaderIndicatorClick: p.onHeaderIndicatorClick, onMouseMove: p.onMouseMove, onVisibleRegionChanged: p.onVisibleRegionChanged, overscrollX: p.overscrollX, overscrollY: p.overscrollY, preventDiagonalScrolling: p.preventDiagonalScrolling, rightElement: p.rightElement, rightElementProps: p.rightElementProps, rowHeight: p.rowHeight, rows: p.rows, scrollRef: p.scrollRef, selection: p.selection, theme: p.theme, freezeTrailingRows: p.freezeTrailingRows, hasAppendRow: p.hasAppendRow, translateX: p.translateX, translateY: p.translateY, verticalBorder: p.verticalBorder, onColumnProposeMove: p.onColumnProposeMove, drawFocusRing: p.drawFocusRing, drawCell: p.drawCell, drawHeader: p.drawHeader, experimental: p.experimental, gridRef: p.gridRef, headerIcons: p.headerIcons, isDraggable: p.isDraggable, onCanvasBlur: p.onCanvasBlur, onCanvasFocused: p.onCanvasFocused, onCellFocused: p.onCellFocused, onColumnMoved: p.onColumnMoved, onColumnResize: p.onColumnResize, onColumnResizeEnd: p.onColumnResizeEnd, onColumnResizeStart: p.onColumnResizeStart, onContextMenu: p.onContextMenu, onDragEnd: p.onDragEnd, onDragLeave: p.onDragLeave, onDragOverCell: p.onDragOverCell, onDragStart: p.onDragStart, onDrop: p.onDrop, onItemHovered: p.onItemHovered, onKeyDown: p.onKeyDown, onKeyUp: p.onKeyUp, onMouseDown: p.onMouseDown, onMouseUp: p.onMouseUp, onRowMoved: p.onRowMoved, smoothScrollX: p.smoothScrollX, smoothScrollY: p.smoothScrollY, resizeIndicator: p.resizeIndicator }),
        searchbox));
};
exports.default = DataGridSearch;
//# sourceMappingURL=data-grid-search.js.map