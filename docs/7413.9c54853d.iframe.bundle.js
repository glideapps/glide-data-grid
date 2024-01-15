"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7413],{

/***/ "./packages/core/src/data-editor-all.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "F": () => (/* binding */ DataEditorAll)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./packages/core/src/common/support.ts
var support = __webpack_require__("./packages/core/src/common/support.ts");
// EXTERNAL MODULE: ./node_modules/lodash/clamp.js
var clamp = __webpack_require__("./node_modules/lodash/clamp.js");
var clamp_default = /*#__PURE__*/__webpack_require__.n(clamp);
// EXTERNAL MODULE: ./node_modules/lodash/uniq.js
var uniq = __webpack_require__("./node_modules/lodash/uniq.js");
var uniq_default = /*#__PURE__*/__webpack_require__.n(uniq);
// EXTERNAL MODULE: ./node_modules/lodash/flatten.js
var flatten = __webpack_require__("./node_modules/lodash/flatten.js");
var flatten_default = /*#__PURE__*/__webpack_require__.n(flatten);
// EXTERNAL MODULE: ./node_modules/lodash/range.js
var range = __webpack_require__("./node_modules/lodash/range.js");
var range_default = /*#__PURE__*/__webpack_require__.n(range);
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("./node_modules/lodash/debounce.js");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-types.ts
var data_grid_types = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/scrolling-data-grid/scrolling-data-grid.tsx + 4 modules
var scrolling_data_grid = __webpack_require__("./packages/core/src/internal/scrolling-data-grid/scrolling-data-grid.tsx");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx

const SearchWrapper = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "SearchWrapper",
  class: "slyseh9",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/data-grid-search/data-grid-search-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx");
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-search/data-grid-search.tsx








const upArrow = (0,jsx_runtime.jsx)("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512",
  children: (0,jsx_runtime.jsx)("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 244l144-144 144 144M256 120v292"
  })
});
const downArrow = (0,jsx_runtime.jsx)("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512",
  children: (0,jsx_runtime.jsx)("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 268l144 144 144-144M256 392V100"
  })
});
const closeX = (0,jsx_runtime.jsx)("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512",
  children: (0,jsx_runtime.jsx)("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "32",
    d: "M368 368L144 144M368 144L144 368"
  })
});
const targetSearchTimeMS = 10;
const DataGridSearch = p => {
  const {
    canvasRef,
    cellYOffset,
    rows,
    columns,
    searchInputRef,
    searchValue,
    searchResults: searchResultsIn,
    onSearchValueChange,
    getCellsForSelection,
    onSearchResultsChanged,
    showSearch = false,
    onSearchClose
  } = p;
  const [searchID] = react.useState(() => "search-box-" + Math.round(Math.random() * 1000));
  const [searchStringInner, setSearchStringInner] = react.useState("");
  const searchString = searchValue !== null && searchValue !== void 0 ? searchValue : searchStringInner;
  const setSearchString = react.useCallback(newVal => {
    setSearchStringInner(newVal);
    onSearchValueChange === null || onSearchValueChange === void 0 || onSearchValueChange(newVal);
  }, [onSearchValueChange]);
  const [searchStatus, setSearchStatus] = react.useState();
  const searchStatusRef = react.useRef(searchStatus);
  searchStatusRef.current = searchStatus;
  react.useEffect(() => {
    if (searchResultsIn === undefined) return;
    if (searchResultsIn.length > 0) {
      setSearchStatus(cv => {
        var _cv$selectedIndex;
        return {
          rowsSearched: rows,
          results: searchResultsIn.length,
          selectedIndex: (_cv$selectedIndex = cv === null || cv === void 0 ? void 0 : cv.selectedIndex) !== null && _cv$selectedIndex !== void 0 ? _cv$selectedIndex : -1
        };
      });
    } else {
      setSearchStatus(undefined);
    }
  }, [rows, searchResultsIn]);
  const abortControllerRef = react.useRef(new AbortController());
  const searchHandle = react.useRef();
  const [searchResultsInner, setSearchResultsInner] = react.useState([]);
  const searchResults = searchResultsIn !== null && searchResultsIn !== void 0 ? searchResultsIn : searchResultsInner;
  const cancelSearch = react.useCallback(() => {
    if (searchHandle.current !== undefined) {
      window.cancelAnimationFrame(searchHandle.current);
      searchHandle.current = undefined;
      abortControllerRef.current.abort();
    }
  }, []);
  const cellYOffsetRef = react.useRef(cellYOffset);
  cellYOffsetRef.current = cellYOffset;
  const beginSearch = react.useCallback(str => {
    const regex = new RegExp(str.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let startY = cellYOffsetRef.current;
    let searchStride = Math.min(10, rows);
    let rowsSearched = 0;
    setSearchStatus(undefined);
    setSearchResultsInner([]);
    const runningResult = [];
    const tick = async () => {
      var _searchStatusRef$curr, _searchStatusRef$curr2;
      if (getCellsForSelection === undefined) return;
      const tStart = performance.now();
      const rowsLeft = rows - rowsSearched;
      let data = getCellsForSelection({
        x: 0,
        y: startY,
        width: columns.length,
        height: Math.min(searchStride, rowsLeft, rows - startY)
      }, abortControllerRef.current.signal);
      if (typeof data === "function") {
        data = await data();
      }
      let added = false;
      for (const [row, d] of data.entries()) {
        for (const [col, cell] of d.entries()) {
          let testString;
          switch (cell.kind) {
            case data_grid_types/* GridCellKind.Text */.p6.Text:
            case data_grid_types/* GridCellKind.Number */.p6.Number:
              testString = cell.displayData;
              break;
            case data_grid_types/* GridCellKind.Uri */.p6.Uri:
            case data_grid_types/* GridCellKind.Markdown */.p6.Markdown:
              testString = cell.data;
              break;
            case data_grid_types/* GridCellKind.Boolean */.p6.Boolean:
              testString = typeof cell.data === "boolean" ? cell.data.toString() : undefined;
              break;
            case data_grid_types/* GridCellKind.Image */.p6.Image:
            case data_grid_types/* GridCellKind.Bubble */.p6.Bubble:
              testString = cell.data.join("🐳");
              break;
            case data_grid_types/* GridCellKind.Custom */.p6.Custom:
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
      (0,support/* assert */.hu)(rowsSearched <= rows);
      const selectedIndex = (_searchStatusRef$curr = (_searchStatusRef$curr2 = searchStatusRef.current) === null || _searchStatusRef$curr2 === void 0 ? void 0 : _searchStatusRef$curr2.selectedIndex) !== null && _searchStatusRef$curr !== void 0 ? _searchStatusRef$curr : -1;
      setSearchStatus({
        results: runningResult.length,
        rowsSearched,
        selectedIndex
      });
      onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(runningResult, selectedIndex);
      if (startY + searchStride >= rows) {
        startY = 0;
      } else {
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
  const onClose = react.useCallback(() => {
    var _canvasRef$current;
    onSearchClose === null || onSearchClose === void 0 || onSearchClose();
    setSearchStatus(undefined);
    setSearchResultsInner([]);
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged([], -1);
    cancelSearch();
    canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus();
  }, [cancelSearch, canvasRef, onSearchClose, onSearchResultsChanged]);
  const onSearchChange = react.useCallback(event => {
    setSearchString(event.target.value);
    if (searchResultsIn !== undefined) return;
    if (event.target.value === "") {
      setSearchStatus(undefined);
      setSearchResultsInner([]);
      cancelSearch();
    } else {
      beginSearch(event.target.value);
    }
  }, [beginSearch, cancelSearch, setSearchString, searchResultsIn]);
  react.useEffect(() => {
    if (showSearch && searchInputRef.current !== null) {
      setSearchString("");
      searchInputRef.current.focus({
        preventScroll: true
      });
    }
  }, [showSearch, searchInputRef, setSearchString]);
  const onNext = react.useCallback(ev => {
    var _ev$stopPropagation;
    ev === null || ev === void 0 || (_ev$stopPropagation = ev.stopPropagation) === null || _ev$stopPropagation === void 0 || _ev$stopPropagation.call(ev);
    if (searchStatus === undefined) return;
    const newIndex = (searchStatus.selectedIndex + 1) % searchStatus.results;
    setSearchStatus({
      ...searchStatus,
      selectedIndex: newIndex
    });
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(searchResults, newIndex);
  }, [searchStatus, onSearchResultsChanged, searchResults]);
  const onPrev = react.useCallback(ev => {
    var _ev$stopPropagation2;
    ev === null || ev === void 0 || (_ev$stopPropagation2 = ev.stopPropagation) === null || _ev$stopPropagation2 === void 0 || _ev$stopPropagation2.call(ev);
    if (searchStatus === undefined) return;
    let newIndex = (searchStatus.selectedIndex - 1) % searchStatus.results;
    if (newIndex < 0) newIndex += searchStatus.results;
    setSearchStatus({
      ...searchStatus,
      selectedIndex: newIndex
    });
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(searchResults, newIndex);
  }, [onSearchResultsChanged, searchResults, searchStatus]);
  const onSearchKeyDown = react.useCallback(event => {
    if ((event.ctrlKey || event.metaKey) && event.nativeEvent.code === "KeyF" || event.key === "Escape") {
      onClose();
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === "Enter") {
      if (event.shiftKey) {
        onPrev();
      } else {
        onNext();
      }
    }
  }, [onClose, onNext, onPrev]);
  react.useEffect(() => {
    return () => {
      cancelSearch();
    };
  }, [cancelSearch]);
  const [isAnimatingOut, setIsAnimatingOut] = react.useState(false);
  react.useEffect(() => {
    if (showSearch) {
      setIsAnimatingOut(true);
    } else {
      const timeoutId = setTimeout(() => setIsAnimatingOut(false), 150);
      return () => clearTimeout(timeoutId);
    }
  }, [showSearch]);
  const searchbox = react.useMemo(() => {
    var _searchStatus$rowsSea, _searchStatus$results, _searchStatus$results2;
    if (!showSearch && !isAnimatingOut) {
      return null;
    }
    let resultString;
    if (searchStatus !== undefined) {
      resultString = searchStatus.results >= 1000 ? `over 1000` : `${searchStatus.results} result${searchStatus.results !== 1 ? "s" : ""}`;
      if (searchStatus.selectedIndex >= 0) {
        resultString = `${searchStatus.selectedIndex + 1} of ${resultString}`;
      }
    }
    const cancelEvent = ev => {
      ev.stopPropagation();
    };
    const rowsSearchedProgress = Math.floor(((_searchStatus$rowsSea = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.rowsSearched) !== null && _searchStatus$rowsSea !== void 0 ? _searchStatus$rowsSea : 0) / rows * 100);
    const progressStyle = {
      width: `${rowsSearchedProgress}%`
    };
    return (0,jsx_runtime.jsxs)(SearchWrapper, {
      className: showSearch ? "" : "out",
      onMouseDown: cancelEvent,
      onMouseMove: cancelEvent,
      onMouseUp: cancelEvent,
      onClick: cancelEvent,
      children: [(0,jsx_runtime.jsxs)("div", {
        className: "gdg-search-bar-inner",
        children: [(0,jsx_runtime.jsx)("input", {
          id: searchID,
          "aria-hidden": !showSearch,
          "data-testid": "search-input",
          ref: searchInputRef,
          onChange: onSearchChange,
          value: searchString,
          tabIndex: showSearch ? undefined : -1,
          onKeyDownCapture: onSearchKeyDown
        }), (0,jsx_runtime.jsx)("button", {
          "aria-label": "Previous Result",
          "aria-hidden": !showSearch,
          tabIndex: showSearch ? undefined : -1,
          onClick: onPrev,
          disabled: ((_searchStatus$results = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results !== void 0 ? _searchStatus$results : 0) === 0,
          children: upArrow
        }), (0,jsx_runtime.jsx)("button", {
          "aria-label": "Next Result",
          "aria-hidden": !showSearch,
          tabIndex: showSearch ? undefined : -1,
          onClick: onNext,
          disabled: ((_searchStatus$results2 = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results2 !== void 0 ? _searchStatus$results2 : 0) === 0,
          children: downArrow
        }), onSearchClose !== undefined && (0,jsx_runtime.jsx)("button", {
          "aria-label": "Close Search",
          "aria-hidden": !showSearch,
          "data-testid": "search-close-button",
          tabIndex: showSearch ? undefined : -1,
          onClick: onClose,
          children: closeX
        })]
      }), searchStatus !== undefined ? (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [(0,jsx_runtime.jsx)("div", {
          className: "gdg-search-status",
          children: (0,jsx_runtime.jsx)("div", {
            "data-testid": "search-result-area",
            children: resultString
          })
        }), (0,jsx_runtime.jsx)("div", {
          className: "gdg-search-progress",
          style: progressStyle
        })]
      }) : (0,jsx_runtime.jsx)("div", {
        className: "gdg-search-status",
        children: (0,jsx_runtime.jsx)("label", {
          htmlFor: searchID,
          children: "Type to search"
        })
      })]
    });
  }, [showSearch, isAnimatingOut, searchStatus, rows, searchID, searchInputRef, onSearchChange, searchString, onSearchKeyDown, onPrev, onNext, onSearchClose, onClose]);
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(scrolling_data_grid/* default */.Z, {
      prelightCells: searchResults,
      accessibilityHeight: p.accessibilityHeight,
      canvasRef: p.canvasRef,
      cellXOffset: p.cellXOffset,
      cellYOffset: p.cellYOffset,
      className: p.className,
      clientSize: p.clientSize,
      columns: p.columns,
      disabledRows: p.disabledRows,
      enableGroups: p.enableGroups,
      fillHandle: p.fillHandle,
      firstColAccessible: p.firstColAccessible,
      nonGrowWidth: p.nonGrowWidth,
      fixedShadowX: p.fixedShadowX,
      fixedShadowY: p.fixedShadowY,
      freezeColumns: p.freezeColumns,
      getCellContent: p.getCellContent,
      getCellRenderer: p.getCellRenderer,
      getGroupDetails: p.getGroupDetails,
      getRowThemeOverride: p.getRowThemeOverride,
      groupHeaderHeight: p.groupHeaderHeight,
      headerHeight: p.headerHeight,
      highlightRegions: p.highlightRegions,
      imageWindowLoader: p.imageWindowLoader,
      initialSize: p.initialSize,
      isFilling: p.isFilling,
      isFocused: p.isFocused,
      lockColumns: p.lockColumns,
      maxColumnWidth: p.maxColumnWidth,
      minColumnWidth: p.minColumnWidth,
      onHeaderMenuClick: p.onHeaderMenuClick,
      onMouseMove: p.onMouseMove,
      onVisibleRegionChanged: p.onVisibleRegionChanged,
      overscrollX: p.overscrollX,
      overscrollY: p.overscrollY,
      preventDiagonalScrolling: p.preventDiagonalScrolling,
      rightElement: p.rightElement,
      rightElementProps: p.rightElementProps,
      rowHeight: p.rowHeight,
      rows: p.rows,
      scrollRef: p.scrollRef,
      selection: p.selection,
      theme: p.theme,
      freezeTrailingRows: p.freezeTrailingRows,
      hasAppendRow: p.hasAppendRow,
      translateX: p.translateX,
      translateY: p.translateY,
      verticalBorder: p.verticalBorder,
      onColumnProposeMove: p.onColumnProposeMove,
      drawFocusRing: p.drawFocusRing,
      drawCell: p.drawCell,
      drawHeader: p.drawHeader,
      experimental: p.experimental,
      gridRef: p.gridRef,
      headerIcons: p.headerIcons,
      isDraggable: p.isDraggable,
      onCanvasBlur: p.onCanvasBlur,
      onCanvasFocused: p.onCanvasFocused,
      onCellFocused: p.onCellFocused,
      onColumnMoved: p.onColumnMoved,
      onColumnResize: p.onColumnResize,
      onColumnResizeEnd: p.onColumnResizeEnd,
      onColumnResizeStart: p.onColumnResizeStart,
      onContextMenu: p.onContextMenu,
      onDragEnd: p.onDragEnd,
      onDragLeave: p.onDragLeave,
      onDragOverCell: p.onDragOverCell,
      onDragStart: p.onDragStart,
      onDrop: p.onDrop,
      onItemHovered: p.onItemHovered,
      onKeyDown: p.onKeyDown,
      onKeyUp: p.onKeyUp,
      onMouseDown: p.onMouseDown,
      onMouseUp: p.onMouseUp,
      onRowMoved: p.onRowMoved,
      smoothScrollX: p.smoothScrollX,
      smoothScrollY: p.smoothScrollY
    }), searchbox]
  });
};
/* harmony default export */ const data_grid_search = (DataGridSearch);
// EXTERNAL MODULE: ./packages/core/src/common/browser-detect.ts
var browser_detect = __webpack_require__("./packages/core/src/common/browser-detect.ts");
// EXTERNAL MODULE: ./packages/core/src/common/styles.ts
var styles = __webpack_require__("./packages/core/src/common/styles.ts");
// EXTERNAL MODULE: ./packages/core/src/common/utils.tsx
var utils = __webpack_require__("./packages/core/src/common/utils.tsx");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-lib.ts
var data_grid_lib = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-lib.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/click-outside-container/click-outside-container.tsx
var click_outside_container = __webpack_require__("./packages/core/src/internal/click-outside-container/click-outside-container.tsx");
;// CONCATENATED MODULE: ./packages/core/src/data-editor/group-rename.tsx




const _exp = /*#__PURE__*/() => p => Math.max(16, p.targetHeight - 10);
const RenameInput = /*#__PURE__*/(0,dist/* styled */.z)('input')({
  name: "RenameInput",
  class: "r1fzhvm4",
  propsAsIs: false,
  vars: {
    "r1fzhvm4-0": [_exp(), "px"]
  }
});
const GroupRename = p => {
  const {
    bounds,
    group,
    onClose,
    canvasBounds,
    onFinish
  } = p;
  const [value, setValue] = react.useState(group);
  return (0,jsx_runtime.jsx)(click_outside_container/* default */.Z, {
    style: {
      position: "absolute",
      left: bounds.x - canvasBounds.left + 1,
      top: bounds.y - canvasBounds.top,
      width: bounds.width - 2,
      height: bounds.height
    },
    className: "c181oggi",
    onClickOutside: onClose,
    children: (0,jsx_runtime.jsx)(RenameInput, {
      targetHeight: bounds.height,
      "data-testid": "group-rename-input",
      value: value,
      onBlur: onClose,
      onFocus: e => e.target.setSelectionRange(0, value.length),
      onChange: e => setValue(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          onFinish(value);
        } else if (e.key === "Escape") {
          onClose();
        }
      },
      autoFocus: true
    })
  });
};
GroupRename.displayName = "GroupRename";

__webpack_require__("./packages/core/src/data-editor/group-rename.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/group-rename.tsx");
;// CONCATENATED MODULE: ./packages/core/src/data-editor/use-column-sizer.ts


const defaultSize = 150;
function measureCell(ctx, cell, theme, getCellRenderer) {
  var _r$measure, _r$measure2;
  const r = getCellRenderer(cell);
  return (_r$measure = r === null || r === void 0 || (_r$measure2 = r.measure) === null || _r$measure2 === void 0 ? void 0 : _r$measure2.call(r, ctx, cell, theme)) !== null && _r$measure !== void 0 ? _r$measure : defaultSize;
}
function measureColumn(ctx, theme, c, colIndex, selectedData, minColumnWidth, maxColumnWidth, removeOutliers, getCellRenderer) {
  let max = 0;
  const sizes = selectedData === undefined ? [] : selectedData.map(row => {
    const r = measureCell(ctx, row[colIndex], theme, getCellRenderer);
    max = Math.max(max, r);
    return r;
  });
  if (sizes.length > 5 && removeOutliers) {
    max = 0;
    let sum = 0;
    for (const size of sizes) {
      sum += size;
    }
    const average = sum / sizes.length;
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] >= average * 2) {
        sizes[i] = 0;
      } else {
        max = Math.max(max, sizes[i]);
      }
    }
  }
  max = Math.max(max, ctx.measureText(c.title).width + 16 + (c.icon === undefined ? 0 : 28));
  const final = Math.max(Math.ceil(minColumnWidth), Math.min(Math.floor(maxColumnWidth), Math.ceil(max)));
  return {
    ...c,
    width: final
  };
}
function useColumnSizer(columns, rows, getCellsForSelection, clientWidth, minColumnWidth, maxColumnWidth, theme, getCellRenderer, abortController) {
  const rowsRef = react.useRef(rows);
  const getCellsForSelectionRef = react.useRef(getCellsForSelection);
  const themeRef = react.useRef(theme);
  rowsRef.current = rows;
  getCellsForSelectionRef.current = getCellsForSelection;
  themeRef.current = theme;
  const [canvas, ctx] = react.useMemo(() => {
    if (typeof window === "undefined") return [null, null];
    const offscreen = document.createElement("canvas");
    offscreen.style["display"] = "none";
    offscreen.style["opacity"] = "0";
    offscreen.style["position"] = "fixed";
    return [offscreen, offscreen.getContext("2d", {
      alpha: false
    })];
  }, []);
  react.useLayoutEffect(() => {
    if (canvas) document.documentElement.append(canvas);
    return () => {
      canvas === null || canvas === void 0 || canvas.remove();
    };
  }, [canvas]);
  const memoMap = react.useRef({});
  const lastColumns = react.useRef();
  const [selectedData, setSelectionData] = react.useState();
  react.useLayoutEffect(() => {
    const getCells = getCellsForSelectionRef.current;
    if (getCells === undefined || columns.every(data_grid_types/* isSizedGridColumn */.Sq)) return;
    let computeRows = Math.max(1, 10 - Math.floor(columns.length / 10000));
    let tailRows = 0;
    if (computeRows < rowsRef.current && computeRows > 1) {
      computeRows--;
      tailRows = 1;
    }
    const computeArea = {
      x: 0,
      y: 0,
      width: columns.length,
      height: Math.min(rowsRef.current, computeRows)
    };
    const tailComputeArea = {
      x: 0,
      y: rowsRef.current - 1,
      width: columns.length,
      height: 1
    };
    const fn = async () => {
      const getResult = getCells(computeArea, abortController.signal);
      const tailGetResult = tailRows > 0 ? getCells(tailComputeArea, abortController.signal) : undefined;
      let toSet;
      if (typeof getResult === "object") {
        toSet = getResult;
      } else {
        toSet = await (0,data_grid_types/* resolveCellsThunk */.rL)(getResult);
      }
      if (tailGetResult !== undefined) {
        if (typeof tailGetResult === "object") {
          toSet = [...toSet, ...tailGetResult];
        } else {
          toSet = [...toSet, ...(await (0,data_grid_types/* resolveCellsThunk */.rL)(tailGetResult))];
        }
      }
      lastColumns.current = columns;
      setSelectionData(toSet);
    };
    void fn();
  }, [abortController.signal, columns]);
  return react.useMemo(() => {
    const getRaw = () => {
      if (columns.every(data_grid_types/* isSizedGridColumn */.Sq)) {
        return columns;
      }
      if (ctx === null) {
        return columns.map(c => {
          if ((0,data_grid_types/* isSizedGridColumn */.Sq)(c)) return c;
          return {
            ...c,
            width: defaultSize
          };
        });
      }
      ctx.font = themeRef.current.baseFontFull;
      return columns.map((c, colIndex) => {
        if ((0,data_grid_types/* isSizedGridColumn */.Sq)(c)) return c;
        if (memoMap.current[c.id] !== undefined) {
          return {
            ...c,
            width: memoMap.current[c.id]
          };
        }
        if (selectedData === undefined || lastColumns.current !== columns || c.id === undefined) {
          return {
            ...c,
            width: defaultSize
          };
        }
        const r = measureColumn(ctx, theme, c, colIndex, selectedData, minColumnWidth, maxColumnWidth, true, getCellRenderer);
        memoMap.current[c.id] = r.width;
        return r;
      });
    };
    let result = getRaw();
    let totalWidth = 0;
    let totalGrow = 0;
    const distribute = [];
    for (const [i, c] of result.entries()) {
      totalWidth += c.width;
      if (c.grow !== undefined && c.grow > 0) {
        totalGrow += c.grow;
        distribute.push(i);
      }
    }
    if (totalWidth < clientWidth && distribute.length > 0) {
      const writeable = [...result];
      const extra = clientWidth - totalWidth;
      let remaining = extra;
      for (let di = 0; di < distribute.length; di++) {
        var _result$i$grow;
        const i = distribute[di];
        const weighted = ((_result$i$grow = result[i].grow) !== null && _result$i$grow !== void 0 ? _result$i$grow : 0) / totalGrow;
        const toAdd = di === distribute.length - 1 ? remaining : Math.min(remaining, Math.floor(extra * weighted));
        writeable[i] = {
          ...result[i],
          growOffset: toAdd,
          width: result[i].width + toAdd
        };
        remaining -= toAdd;
      }
      result = writeable;
    }
    return {
      sizedColumns: result,
      nonGrowWidth: totalWidth
    };
  }, [clientWidth, columns, ctx, selectedData, theme, minColumnWidth, maxColumnWidth, getCellRenderer]);
}
;// CONCATENATED MODULE: ./packages/core/src/common/is-hotkey.ts

function checkKey(key, args) {
  if (key === undefined) return false;
  if (key.length > 1 && key.startsWith("_")) {
    const keycode = Number.parseInt(key.slice(1));
    return keycode === args.keyCode;
  }
  if (key.length === 1 && key >= "a" && key <= "z") {
    return key.toUpperCase().codePointAt(0) === args.keyCode;
  }
  return key === args.key;
}
function isHotkey(hotkey, args, details) {
  const result = isHotkeyInner(hotkey, args);
  if (result) details.didMatch = true;
  return result;
}
function isHotkeyInner(hotkey, args) {
  if (hotkey.length === 0) return false;
  if (hotkey.includes("|")) {
    const parts = hotkey.split("|");
    for (const part of parts) {
      if (isHotkeyInner(part, args)) return true;
    }
    return false;
  }
  let wantCtrl = false;
  let wantShift = false;
  let wantAlt = false;
  let wantMeta = false;
  const split = hotkey.split("+");
  const key = split.pop();
  if (!checkKey(key, args)) return false;
  if (split[0] === "any") return true;
  for (const accel of split) {
    switch (accel) {
      case "ctrl":
        wantCtrl = true;
        break;
      case "shift":
        wantShift = true;
        break;
      case "alt":
        wantAlt = true;
        break;
      case "meta":
        wantMeta = true;
        break;
      case "primary":
        if (browser_detect/* browserIsOSX.value */.FR.value) {
          wantMeta = true;
        } else {
          wantCtrl = true;
        }
        break;
    }
  }
  return args.altKey === wantAlt && args.ctrlKey === wantCtrl && args.shiftKey === wantShift && args.metaKey === wantMeta;
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/use-selection-behavior.ts


function useSelectionBehavior(gridSelection, setGridSelection, rangeBehavior, columnBehavior, rowBehavior, rangeSelect) {
  const setCurrent = react.useCallback((value, expand, append, trigger) => {
    var _gridSelection$curren, _gridSelection$curren2;
    if ((rangeSelect === "cell" || rangeSelect === "multi-cell") && value !== undefined) {
      value = {
        ...value,
        range: {
          x: value.cell[0],
          y: value.cell[1],
          width: 1,
          height: 1
        }
      };
    }
    const rangeMixable = rangeBehavior === "mixed" && (append || trigger === "drag");
    const allowColumnCoSelect = columnBehavior === "mixed" && rangeMixable;
    const allowRowCoSelect = rowBehavior === "mixed" && rangeMixable;
    let newVal = {
      current: value === undefined ? undefined : {
        ...value,
        rangeStack: trigger === "drag" ? (_gridSelection$curren = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.rangeStack) !== null && _gridSelection$curren !== void 0 ? _gridSelection$curren : [] : []
      },
      columns: allowColumnCoSelect ? gridSelection.columns : data_grid_types/* CompactSelection.empty */.EV.empty(),
      rows: allowRowCoSelect ? gridSelection.rows : data_grid_types/* CompactSelection.empty */.EV.empty()
    };
    const addLastRange = append && (rangeSelect === "multi-rect" || rangeSelect === "multi-cell");
    if (addLastRange && newVal.current !== undefined && gridSelection.current !== undefined) {
      newVal = {
        ...newVal,
        current: {
          ...newVal.current,
          rangeStack: [...gridSelection.current.rangeStack, gridSelection.current.range]
        }
      };
    }
    setGridSelection(newVal, expand);
  }, [columnBehavior, gridSelection, rangeBehavior, rangeSelect, rowBehavior, setGridSelection]);
  const setSelectedRows = react.useCallback((newRows, append, allowMixed) => {
    var _newRows;
    newRows = (_newRows = newRows) !== null && _newRows !== void 0 ? _newRows : gridSelection.rows;
    if (append !== undefined) {
      newRows = newRows.add(append);
    }
    let newVal;
    if (rowBehavior === "exclusive" && newRows.length > 0) {
      newVal = {
        current: undefined,
        columns: data_grid_types/* CompactSelection.empty */.EV.empty(),
        rows: newRows
      };
    } else {
      const rangeMixed = allowMixed && rangeBehavior === "mixed";
      const columnMixed = allowMixed && columnBehavior === "mixed";
      const current = !rangeMixed ? undefined : gridSelection.current;
      newVal = {
        current,
        columns: columnMixed ? gridSelection.columns : data_grid_types/* CompactSelection.empty */.EV.empty(),
        rows: newRows
      };
    }
    setGridSelection(newVal, false);
  }, [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]);
  const setSelectedColumns = react.useCallback((newCols, append, allowMixed) => {
    var _newCols;
    newCols = (_newCols = newCols) !== null && _newCols !== void 0 ? _newCols : gridSelection.columns;
    if (append !== undefined) {
      newCols = newCols.add(append);
    }
    let newVal;
    if (columnBehavior === "exclusive" && newCols.length > 0) {
      newVal = {
        current: undefined,
        rows: data_grid_types/* CompactSelection.empty */.EV.empty(),
        columns: newCols
      };
    } else {
      const rangeMixed = allowMixed && rangeBehavior === "mixed";
      const rowMixed = allowMixed && rowBehavior === "mixed";
      const current = !rangeMixed ? undefined : gridSelection.current;
      newVal = {
        current,
        rows: rowMixed ? gridSelection.rows : data_grid_types/* CompactSelection.empty */.EV.empty(),
        columns: newCols
      };
    }
    setGridSelection(newVal, false);
  }, [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]);
  return [setCurrent, setSelectedRows, setSelectedColumns];
}
;// CONCATENATED MODULE: ./packages/core/src/data-editor/use-cells-for-selection.ts


function useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortController, rows) {
  const getCellsForSelectionDirectWhenValid = react.useCallback(rect => {
    var _getCellsForSelection;
    if (getCellsForSelectionIn === true) {
      const result = [];
      for (let y = rect.y; y < rect.y + rect.height; y++) {
        const row = [];
        for (let x = rect.x; x < rect.x + rect.width; x++) {
          if (x < 0 || y >= rows) {
            row.push({
              kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
              allowOverlay: false
            });
          } else {
            row.push(getCellContent([x, y]));
          }
        }
        result.push(row);
      }
      return result;
    }
    return (_getCellsForSelection = getCellsForSelectionIn === null || getCellsForSelectionIn === void 0 ? void 0 : getCellsForSelectionIn(rect, abortController.signal)) !== null && _getCellsForSelection !== void 0 ? _getCellsForSelection : [];
  }, [abortController.signal, getCellContent, getCellsForSelectionIn, rows]);
  const getCellsForSelectionDirect = getCellsForSelectionIn !== undefined ? getCellsForSelectionDirectWhenValid : undefined;
  const getCellsForSelectionMangled = react.useCallback(rect => {
    if (getCellsForSelectionDirect === undefined) return [];
    const newRect = {
      ...rect,
      x: rect.x - rowMarkerOffset
    };
    if (newRect.x < 0) {
      newRect.x = 0;
      newRect.width--;
      const r = getCellsForSelectionDirect(newRect, abortController.signal);
      if (typeof r === "function") {
        return async () => (await r()).map(row => [{
          kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
          allowOverlay: false
        }, ...row]);
      }
      return r.map(row => [{
        kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
        allowOverlay: false
      }, ...row]);
    }
    return getCellsForSelectionDirect(newRect, abortController.signal);
  }, [abortController.signal, getCellsForSelectionDirect, rowMarkerOffset]);
  const getCellsForSelection = getCellsForSelectionIn !== undefined ? getCellsForSelectionMangled : undefined;
  return [getCellsForSelection, getCellsForSelectionDirect];
}
// EXTERNAL MODULE: ./packages/core/src/data-editor/data-editor-fns.ts
var data_editor_fns = __webpack_require__("./packages/core/src/data-editor/data-editor-fns.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-editor-container/data-grid-container.tsx



function toCss(x) {
  if (typeof x === "string") return x;
  return `${x}px`;
}
const data_grid_container_exp = /*#__PURE__*/() => p => p.innerWidth;
const _exp2 = /*#__PURE__*/() => p => p.innerHeight;
const Wrapper = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "Wrapper",
  class: "w2q57ts",
  propsAsIs: false,
  vars: {
    "w2q57ts-0": [data_grid_container_exp()],
    "w2q57ts-1": [_exp2()]
  }
});
const DataEditorContainer = p => {
  const {
    inWidth,
    inHeight,
    children,
    ...rest
  } = p;
  return (0,jsx_runtime.jsx)(Wrapper, {
    innerHeight: toCss(inHeight),
    innerWidth: toCss(inWidth),
    ...rest,
    children: children
  });
};
DataEditorContainer.displayName = "DataEditorContainer";

__webpack_require__("./packages/core/src/internal/data-editor-container/data-grid-container.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-editor-container/data-grid-container.tsx");
;// CONCATENATED MODULE: ./packages/core/src/data-editor/use-autoscroll.ts

const maxPxPerMs = 2;
const msToFullSpeed = 1300;
function useAutoscroll(scrollDirection, scrollRef, onScroll) {
  const speedScalar = react.useRef(0);
  const [xDir, yDir] = scrollDirection !== null && scrollDirection !== void 0 ? scrollDirection : [0, 0];
  react.useEffect(() => {
    if (xDir === 0 && yDir === 0) {
      speedScalar.current = 0;
      return;
    }
    let cancelled = false;
    let lastTime = 0;
    const scrollFn = curTime => {
      if (cancelled) return;
      if (lastTime === 0) {
        lastTime = curTime;
      } else {
        var _scrollRef$current;
        const step = curTime - lastTime;
        speedScalar.current = Math.min(1, speedScalar.current + step / msToFullSpeed);
        const motion = speedScalar.current ** 1.618 * step * maxPxPerMs;
        (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollBy(xDir * motion, yDir * motion);
        lastTime = curTime;
        onScroll === null || onScroll === void 0 || onScroll();
      }
      window.requestAnimationFrame(scrollFn);
    };
    window.requestAnimationFrame(scrollFn);
    return () => {
      cancelled = true;
    };
  }, [scrollRef, xDir, yDir, onScroll]);
}
// EXTERNAL MODULE: ./packages/core/src/data-editor/copy-paste.ts
var copy_paste = __webpack_require__("./packages/core/src/data-editor/copy-paste.ts");
;// CONCATENATED MODULE: ./packages/core/src/data-editor/use-rem-adjuster.ts


function useRemAdjuster(_ref) {
  let {
    rowHeight: rowHeightIn,
    headerHeight: headerHeightIn,
    groupHeaderHeight: groupHeaderHeightIn,
    theme: themeIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    scaleToRem,
    remSize
  } = _ref;
  const [rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY] = react.useMemo(() => {
    var _themeIn$headerIconSi, _themeIn$cellHorizont, _themeIn$cellVertical;
    if (!scaleToRem || remSize === 16) return [rowHeightIn, headerHeightIn, groupHeaderHeightIn, themeIn, overscrollXIn, overscrollYIn];
    const scaler = remSize / 16;
    const rh = rowHeightIn;
    const bt = (0,styles/* getDataEditorTheme */.Zu)();
    return [typeof rh === "number" ? rh * scaler : n => Math.ceil(rh(n) * scaler), Math.ceil(headerHeightIn * scaler), Math.ceil(groupHeaderHeightIn * scaler), {
      ...themeIn,
      headerIconSize: ((_themeIn$headerIconSi = themeIn === null || themeIn === void 0 ? void 0 : themeIn.headerIconSize) !== null && _themeIn$headerIconSi !== void 0 ? _themeIn$headerIconSi : bt.headerIconSize) * scaler,
      cellHorizontalPadding: ((_themeIn$cellHorizont = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellHorizontalPadding) !== null && _themeIn$cellHorizont !== void 0 ? _themeIn$cellHorizont : bt.cellHorizontalPadding) * scaler,
      cellVerticalPadding: ((_themeIn$cellVertical = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellVerticalPadding) !== null && _themeIn$cellVertical !== void 0 ? _themeIn$cellVertical : bt.cellVerticalPadding) * scaler
    }, Math.ceil((overscrollXIn !== null && overscrollXIn !== void 0 ? overscrollXIn : 0) * scaler), Math.ceil((overscrollYIn !== null && overscrollYIn !== void 0 ? overscrollYIn : 0) * scaler)];
  }, [groupHeaderHeightIn, headerHeightIn, overscrollXIn, overscrollYIn, remSize, rowHeightIn, scaleToRem, themeIn]);
  return {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  };
}
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-render.ts
var data_grid_render = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-render.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/color-parser.ts
var color_parser = __webpack_require__("./packages/core/src/internal/data-grid/color-parser.ts");
// EXTERNAL MODULE: ./packages/core/src/common/math.ts
var math = __webpack_require__("./packages/core/src/common/math.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/event-args.ts
var event_args = __webpack_require__("./packages/core/src/internal/data-grid/event-args.ts");
// EXTERNAL MODULE: ./packages/core/src/data-editor/data-editor-keybindings.ts
var data_editor_keybindings = __webpack_require__("./packages/core/src/data-editor/data-editor-keybindings.ts");
;// CONCATENATED MODULE: ./packages/core/src/data-editor/data-editor.tsx






























const DataGridOverlayEditor = react.lazy(async () => await __webpack_require__.e(/* import() */ 903).then(__webpack_require__.bind(__webpack_require__, "./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx")));
let idCounter = 0;
function getSpanStops(cells) {
  return uniq_default()(flatten_default()(flatten_default()(cells).filter(c => c.span !== undefined).map(c => {
    var _c$span$, _c$span, _c$span$2, _c$span2;
    return range_default()(((_c$span$ = (_c$span = c.span) === null || _c$span === void 0 ? void 0 : _c$span[0]) !== null && _c$span$ !== void 0 ? _c$span$ : 0) + 1, ((_c$span$2 = (_c$span2 = c.span) === null || _c$span2 === void 0 ? void 0 : _c$span2[1]) !== null && _c$span$2 !== void 0 ? _c$span$2 : 0) + 1);
  })));
}
function shiftSelection(input, offset) {
  if (input === undefined || offset === 0 || input.columns.length === 0 && input.current === undefined) return input;
  return {
    current: input.current === undefined ? undefined : {
      cell: [input.current.cell[0] + offset, input.current.cell[1]],
      range: {
        ...input.current.range,
        x: input.current.range.x + offset
      },
      rangeStack: input.current.rangeStack.map(r => ({
        ...r,
        x: r.x + offset
      }))
    },
    rows: input.rows,
    columns: input.columns.offset(offset)
  };
}
const loadingCell = {
  kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
  allowOverlay: false
};
const emptyGridSelection = {
  columns: data_grid_types/* CompactSelection.empty */.EV.empty(),
  rows: data_grid_types/* CompactSelection.empty */.EV.empty(),
  current: undefined
};
const DataEditorImpl = (p, forwardedRef) => {
  var _visibleRegion$height, _visibleRegion$width, _gridSelection$curren5, _gridSelectionOuter$c, _gridSelectionOuter$c2;
  const [gridSelectionInner, setGridSelectionInner] = react.useState(emptyGridSelection);
  const [overlay, setOverlay] = react.useState();
  const searchInputRef = react.useRef(null);
  const canvasRef = react.useRef(null);
  const [mouseState, setMouseState] = react.useState();
  const scrollRef = react.useRef(null);
  const lastSent = react.useRef();
  const safeWindow = typeof window === "undefined" ? null : window;
  const {
    rowMarkers = "none",
    rowMarkerWidth: rowMarkerWidthRaw,
    imageEditorOverride,
    getRowThemeOverride,
    markdownDivCreateNode,
    width,
    height,
    columns: columnsIn,
    rows,
    getCellContent,
    onCellClicked,
    onCellActivated,
    onFillPattern,
    onFinishedEditing,
    coercePasteValue,
    drawHeader: drawHeaderIn,
    drawCell: drawCellIn,
    onHeaderClicked,
    onColumnProposeMove,
    spanRangeBehavior = "default",
    onGroupHeaderClicked,
    onCellContextMenu,
    className,
    onHeaderContextMenu,
    getCellsForSelection: getCellsForSelectionIn,
    onGroupHeaderContextMenu,
    onGroupHeaderRenamed,
    onCellEdited,
    onCellsEdited,
    onSearchResultsChanged: onSearchResultsChangedIn,
    searchResults,
    onSearchValueChange,
    searchValue,
    onKeyDown: onKeyDownIn,
    onKeyUp: onKeyUpIn,
    keybindings: keybindingsIn,
    onRowAppended,
    onColumnMoved,
    validateCell: validateCellIn,
    highlightRegions: highlightRegionsIn,
    rangeSelect = "rect",
    columnSelect = "multi",
    rowSelect = "multi",
    rangeSelectionBlending = "exclusive",
    columnSelectionBlending = "exclusive",
    rowSelectionBlending = "exclusive",
    onDelete: onDeleteIn,
    onDragStart,
    onMouseMove,
    onPaste,
    copyHeaders = false,
    freezeColumns = 0,
    cellActivationBehavior = "second-click",
    rowSelectionMode = "auto",
    rowMarkerStartIndex = 1,
    rowMarkerTheme,
    onHeaderMenuClick,
    getGroupDetails,
    onSearchClose: onSearchCloseIn,
    onItemHovered,
    onSelectionCleared,
    showSearch: showSearchIn,
    onVisibleRegionChanged,
    gridSelection: gridSelectionOuter,
    onGridSelectionChange,
    minColumnWidth: minColumnWidthIn = 50,
    maxColumnWidth: maxColumnWidthIn = 500,
    maxColumnAutoWidth: maxColumnAutoWidthIn,
    provideEditor,
    trailingRowOptions,
    freezeTrailingRows = 0,
    allowedFillDirections = "orthogonal",
    scrollOffsetX,
    scrollOffsetY,
    verticalBorder,
    onDragOverCell,
    onDrop,
    onColumnResize: onColumnResizeIn,
    onColumnResizeEnd: onColumnResizeEndIn,
    onColumnResizeStart: onColumnResizeStartIn,
    customRenderers: additionalRenderers,
    fillHandle,
    drawFocusRing,
    experimental,
    fixedShadowX,
    fixedShadowY,
    headerIcons,
    imageWindowLoader,
    initialSize,
    isDraggable,
    onDragLeave,
    onRowMoved,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    preventDiagonalScrolling,
    rightElement,
    rightElementProps,
    trapFocus = false,
    smoothScrollX,
    smoothScrollY,
    scaleToRem = false,
    rowHeight: rowHeightIn = 34,
    headerHeight: headerHeightIn = 36,
    groupHeaderHeight: groupHeaderHeightIn = headerHeightIn,
    theme: themeIn,
    isOutsideClick,
    renderers
  } = p;
  const minColumnWidth = Math.max(minColumnWidthIn, 20);
  const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
  const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn !== null && maxColumnAutoWidthIn !== void 0 ? maxColumnAutoWidthIn : maxColumnWidth, minColumnWidth);
  const docStyle = react.useMemo(() => {
    if (typeof window === "undefined") return {
      fontSize: "16px"
    };
    return window.getComputedStyle(document.documentElement);
  }, []);
  const fontSizeStr = docStyle.fontSize;
  const remSize = react.useMemo(() => Number.parseFloat(fontSizeStr), [fontSizeStr]);
  const {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  } = useRemAdjuster({
    groupHeaderHeight: groupHeaderHeightIn,
    headerHeight: headerHeightIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    remSize,
    rowHeight: rowHeightIn,
    scaleToRem,
    theme: themeIn
  });
  const keybindings = (0,data_editor_keybindings/* useKeybindingsWithDefaults */.uh)(keybindingsIn);
  const rowMarkerWidth = rowMarkerWidthRaw !== null && rowMarkerWidthRaw !== void 0 ? rowMarkerWidthRaw : rows > 10000 ? 48 : rows > 1000 ? 44 : rows > 100 ? 36 : 32;
  const hasRowMarkers = rowMarkers !== "none";
  const rowMarkerOffset = hasRowMarkers ? 1 : 0;
  const showTrailingBlankRow = onRowAppended !== undefined;
  const lastRowSticky = (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true;
  const [showSearchInner, setShowSearchInner] = react.useState(false);
  const showSearch = showSearchIn !== null && showSearchIn !== void 0 ? showSearchIn : showSearchInner;
  const onSearchClose = react.useCallback(() => {
    if (onSearchCloseIn !== undefined) {
      onSearchCloseIn();
    } else {
      setShowSearchInner(false);
    }
  }, [onSearchCloseIn]);
  const gridSelectionOuterMangled = react.useMemo(() => {
    return gridSelectionOuter === undefined ? undefined : shiftSelection(gridSelectionOuter, rowMarkerOffset);
  }, [gridSelectionOuter, rowMarkerOffset]);
  const gridSelection = gridSelectionOuterMangled !== null && gridSelectionOuterMangled !== void 0 ? gridSelectionOuterMangled : gridSelectionInner;
  const abortControllerRef = react.useRef(new AbortController());
  react.useEffect(() => {
    return () => {
      abortControllerRef === null || abortControllerRef === void 0 || abortControllerRef.current.abort();
    };
  }, []);
  const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortControllerRef.current, rows);
  const validateCell = react.useCallback((cell, newValue, prevValue) => {
    if (validateCellIn === undefined) return true;
    const item = [cell[0] - rowMarkerOffset, cell[1]];
    return validateCellIn === null || validateCellIn === void 0 ? void 0 : validateCellIn(item, newValue, prevValue);
  }, [rowMarkerOffset, validateCellIn]);
  const expectedExternalGridSelection = react.useRef(gridSelectionOuter);
  const setGridSelection = react.useCallback((newVal, expand) => {
    if (expand) {
      newVal = (0,data_editor_fns/* expandSelection */.hb)(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortControllerRef.current);
    }
    if (onGridSelectionChange !== undefined) {
      expectedExternalGridSelection.current = shiftSelection(newVal, -rowMarkerOffset);
      onGridSelectionChange(expectedExternalGridSelection.current);
    } else {
      setGridSelectionInner(newVal);
    }
  }, [onGridSelectionChange, getCellsForSelection, rowMarkerOffset, spanRangeBehavior]);
  const onColumnResize = (0,utils/* whenDefined */.qJ)(onColumnResizeIn, react.useCallback((_, w, ind, wg) => {
    onColumnResizeIn === null || onColumnResizeIn === void 0 || onColumnResizeIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  }, [onColumnResizeIn, rowMarkerOffset, columnsIn]));
  const onColumnResizeEnd = (0,utils/* whenDefined */.qJ)(onColumnResizeEndIn, react.useCallback((_, w, ind, wg) => {
    onColumnResizeEndIn === null || onColumnResizeEndIn === void 0 || onColumnResizeEndIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  }, [onColumnResizeEndIn, rowMarkerOffset, columnsIn]));
  const onColumnResizeStart = (0,utils/* whenDefined */.qJ)(onColumnResizeStartIn, react.useCallback((_, w, ind, wg) => {
    onColumnResizeStartIn === null || onColumnResizeStartIn === void 0 || onColumnResizeStartIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  }, [onColumnResizeStartIn, rowMarkerOffset, columnsIn]));
  const drawHeader = (0,utils/* whenDefined */.qJ)(drawHeaderIn, react.useCallback((args, draw) => {
    var _drawHeaderIn;
    return (_drawHeaderIn = drawHeaderIn === null || drawHeaderIn === void 0 ? void 0 : drawHeaderIn({
      ...args,
      columnIndex: args.columnIndex - rowMarkerOffset
    }, draw)) !== null && _drawHeaderIn !== void 0 ? _drawHeaderIn : false;
  }, [drawHeaderIn, rowMarkerOffset]));
  const drawCell = (0,utils/* whenDefined */.qJ)(drawCellIn, react.useCallback((args, draw) => {
    var _drawCellIn;
    return (_drawCellIn = drawCellIn === null || drawCellIn === void 0 ? void 0 : drawCellIn({
      ...args,
      col: args.col - rowMarkerOffset
    }, draw)) !== null && _drawCellIn !== void 0 ? _drawCellIn : false;
  }, [drawCellIn, rowMarkerOffset]));
  const onDelete = react.useCallback(sel => {
    if (onDeleteIn !== undefined) {
      const result = onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
      if (typeof result === "boolean") {
        return result;
      }
      return shiftSelection(result, rowMarkerOffset);
    }
    return true;
  }, [onDeleteIn, rowMarkerOffset]);
  const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(gridSelection, setGridSelection, rangeSelectionBlending, columnSelectionBlending, rowSelectionBlending, rangeSelect);
  const mergedTheme = react.useMemo(() => {
    return (0,styles/* mergeAndRealizeTheme */.yR)((0,styles/* getDataEditorTheme */.Zu)(), theme);
  }, [theme]);
  const [clientSize, setClientSize] = react.useState([0, 0, 0]);
  const rendererMap = react.useMemo(() => {
    if (renderers === undefined) return {};
    const result = {};
    for (const r of renderers) {
      result[r.kind] = r;
    }
    return result;
  }, [renderers]);
  const getCellRenderer = react.useCallback(cell => {
    if (cell.kind !== data_grid_types/* GridCellKind.Custom */.p6.Custom) {
      return rendererMap[cell.kind];
    }
    return additionalRenderers === null || additionalRenderers === void 0 ? void 0 : additionalRenderers.find(x => x.isMatch(cell));
  }, [additionalRenderers, rendererMap]);
  let {
    sizedColumns: columns,
    nonGrowWidth
  } = useColumnSizer(columnsIn, rows, getCellsForSeletionDirect, clientSize[0] - (rowMarkerOffset === 0 ? 0 : rowMarkerWidth) - clientSize[2], minColumnWidth, maxColumnAutoWidth, mergedTheme, getCellRenderer, abortControllerRef.current);
  if (rowMarkers !== "none") nonGrowWidth += rowMarkerWidth;
  const enableGroups = react.useMemo(() => {
    return columns.some(c => c.group !== undefined);
  }, [columns]);
  const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
  const numSelectedRows = gridSelection.rows.length;
  const rowMarkerHeader = rowMarkers === "none" ? "" : numSelectedRows === 0 ? data_grid_types/* headerCellUnheckedMarker */.YK : numSelectedRows === rows ? data_grid_types/* headerCellCheckedMarker */.qT : data_grid_types/* headerCellIndeterminateMarker */.iJ;
  const mangledCols = react.useMemo(() => {
    if (rowMarkers === "none") return columns;
    return [{
      title: rowMarkerHeader,
      width: rowMarkerWidth,
      icon: undefined,
      hasMenu: false,
      style: "normal",
      themeOverride: rowMarkerTheme
    }, ...columns];
  }, [columns, rowMarkerWidth, rowMarkers, rowMarkerHeader, rowMarkerTheme]);
  const [visibleRegionY, visibleRegionTy] = react.useMemo(() => {
    return [scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0, scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0];
  }, [scrollOffsetY, rowHeight]);
  const visibleRegionRef = react.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  });
  const visibleRegionInput = react.useMemo(() => {
    var _visibleRegionRef$cur, _visibleRegionRef$cur2;
    return {
      x: visibleRegionRef.current.x,
      y: visibleRegionY,
      width: (_visibleRegionRef$cur = visibleRegionRef.current.width) !== null && _visibleRegionRef$cur !== void 0 ? _visibleRegionRef$cur : 1,
      height: (_visibleRegionRef$cur2 = visibleRegionRef.current.height) !== null && _visibleRegionRef$cur2 !== void 0 ? _visibleRegionRef$cur2 : 1,
      ty: visibleRegionTy
    };
  }, [visibleRegionTy, visibleRegionY]);
  const hasJustScrolled = react.useRef(false);
  const [visibleRegion, setVisibleRegion, empty] = (0,utils/* useStateWithReactiveInput */.ig)(visibleRegionInput);
  visibleRegionRef.current = visibleRegion;
  const vScrollReady = ((_visibleRegion$height = visibleRegion.height) !== null && _visibleRegion$height !== void 0 ? _visibleRegion$height : 1) > 1;
  react.useLayoutEffect(() => {
    if (scrollOffsetY !== undefined && scrollRef.current !== null && vScrollReady) {
      if (scrollRef.current.scrollTop === scrollOffsetY) return;
      scrollRef.current.scrollTop = scrollOffsetY;
      if (scrollRef.current.scrollTop !== scrollOffsetY) {
        empty();
      }
      hasJustScrolled.current = true;
    }
  }, [scrollOffsetY, vScrollReady, empty]);
  const hScrollReady = ((_visibleRegion$width = visibleRegion.width) !== null && _visibleRegion$width !== void 0 ? _visibleRegion$width : 1) > 1;
  react.useLayoutEffect(() => {
    if (scrollOffsetX !== undefined && scrollRef.current !== null && hScrollReady) {
      if (scrollRef.current.scrollLeft === scrollOffsetX) return;
      scrollRef.current.scrollLeft = scrollOffsetX;
      if (scrollRef.current.scrollLeft !== scrollOffsetX) {
        empty();
      }
      hasJustScrolled.current = true;
    }
  }, [scrollOffsetX, hScrollReady, empty]);
  const cellXOffset = visibleRegion.x + rowMarkerOffset;
  const cellYOffset = visibleRegion.y;
  const gridRef = react.useRef(null);
  const focus = react.useCallback(immediate => {
    if (immediate === true) {
      var _gridRef$current;
      (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.focus();
    } else {
      window.requestAnimationFrame(() => {
        var _gridRef$current2;
        (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 || _gridRef$current2.focus();
      });
    }
  }, []);
  const mangledRows = showTrailingBlankRow ? rows + 1 : rows;
  const mangledOnCellsEdited = react.useCallback(items => {
    const mangledItems = rowMarkerOffset === 0 ? items : items.map(x => ({
      ...x,
      location: [x.location[0] - rowMarkerOffset, x.location[1]]
    }));
    const r = onCellsEdited === null || onCellsEdited === void 0 ? void 0 : onCellsEdited(mangledItems);
    if (r !== true) {
      for (const i of mangledItems) onCellEdited === null || onCellEdited === void 0 || onCellEdited(i.location, i.value);
    }
    return r;
  }, [onCellEdited, onCellsEdited, rowMarkerOffset]);
  const [fillHighlightRegion, setFillHighlightRegion] = react.useState();
  const highlightRange = gridSelection.current !== undefined && gridSelection.current.range.width * gridSelection.current.range.height > 1 ? gridSelection.current.range : undefined;
  const highlightRegions = react.useMemo(() => {
    if ((highlightRegionsIn === undefined || highlightRegionsIn.length === 0) && highlightRange === undefined && fillHighlightRegion === undefined) return undefined;
    const regions = [];
    if (highlightRegionsIn !== undefined) {
      for (const r of highlightRegionsIn) {
        const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
        if (maxWidth > 0) {
          regions.push({
            color: r.color,
            range: {
              ...r.range,
              x: r.range.x + rowMarkerOffset,
              width: Math.min(maxWidth, r.range.width)
            },
            style: r.style
          });
        }
      }
    }
    if (fillHighlightRegion !== undefined) {
      regions.push({
        color: (0,color_parser/* withAlpha */.fG)(mergedTheme.accentColor, 0),
        range: fillHighlightRegion,
        style: "dashed"
      });
    }
    if (highlightRange !== undefined) {
      regions.push({
        color: (0,color_parser/* withAlpha */.fG)(mergedTheme.accentColor, 0.5),
        range: highlightRange,
        style: "solid-outline"
      });
    }
    return regions.length > 0 ? regions : undefined;
  }, [fillHighlightRegion, highlightRange, highlightRegionsIn, mangledCols.length, mergedTheme.accentColor, rowMarkerOffset]);
  const mangledColsRef = react.useRef(mangledCols);
  mangledColsRef.current = mangledCols;
  const getMangledCellContent = react.useCallback(function (_ref) {
    let [col, row] = _ref;
    let forceStrict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
    const isRowMarkerCol = col === 0 && hasRowMarkers;
    if (isRowMarkerCol) {
      if (isTrailing) {
        return loadingCell;
      }
      return {
        kind: data_grid_types/* InnerGridCellKind.Marker */.$o.Marker,
        allowOverlay: false,
        checked: (gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.rows.hasIndex(row)) === true,
        markerKind: rowMarkers === "clickable-number" ? "number" : rowMarkers,
        row: rowMarkerStartIndex + row,
        drawHandle: onRowMoved !== undefined,
        cursor: rowMarkers === "clickable-number" ? "pointer" : undefined
      };
    } else if (isTrailing) {
      var _trailingRowOptions$h, _c$trailingRowOptions;
      const isFirst = col === rowMarkerOffset;
      const maybeFirstColumnHint = isFirst ? (_trailingRowOptions$h = trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.hint) !== null && _trailingRowOptions$h !== void 0 ? _trailingRowOptions$h : "" : "";
      const c = mangledColsRef.current[col];
      if ((c === null || c === void 0 || (_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.disabled) === true) {
        return loadingCell;
      } else {
        var _c$trailingRowOptions2, _c$trailingRowOptions3, _c$trailingRowOptions4, _c$trailingRowOptions5;
        const hint = (_c$trailingRowOptions2 = c === null || c === void 0 || (_c$trailingRowOptions3 = c.trailingRowOptions) === null || _c$trailingRowOptions3 === void 0 ? void 0 : _c$trailingRowOptions3.hint) !== null && _c$trailingRowOptions2 !== void 0 ? _c$trailingRowOptions2 : maybeFirstColumnHint;
        const icon = (_c$trailingRowOptions4 = c === null || c === void 0 || (_c$trailingRowOptions5 = c.trailingRowOptions) === null || _c$trailingRowOptions5 === void 0 ? void 0 : _c$trailingRowOptions5.addIcon) !== null && _c$trailingRowOptions4 !== void 0 ? _c$trailingRowOptions4 : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.addIcon;
        return {
          kind: data_grid_types/* InnerGridCellKind.NewRow */.$o.NewRow,
          hint,
          allowOverlay: false,
          icon
        };
      }
    } else {
      const outerCol = col - rowMarkerOffset;
      if (forceStrict || (experimental === null || experimental === void 0 ? void 0 : experimental.strict) === true) {
        var _vr$extras, _vr$extras2, _vr$extras3;
        const vr = visibleRegionRef.current;
        const isOutsideMainArea = vr.x > outerCol || outerCol > vr.x + vr.width || vr.y > row || row > vr.y + vr.height || row >= rowsRef.current;
        const isSelected = outerCol === ((_vr$extras = vr.extras) === null || _vr$extras === void 0 || (_vr$extras = _vr$extras.selected) === null || _vr$extras === void 0 ? void 0 : _vr$extras[0]) && row === ((_vr$extras2 = vr.extras) === null || _vr$extras2 === void 0 ? void 0 : _vr$extras2.selected[1]);
        let isInFreezeArea = false;
        if (((_vr$extras3 = vr.extras) === null || _vr$extras3 === void 0 ? void 0 : _vr$extras3.freezeRegions) !== undefined) {
          for (const fr of vr.extras.freezeRegions) {
            if ((0,data_grid_render/* pointInRect */.qr)(fr, outerCol, row)) {
              isInFreezeArea = true;
              break;
            }
          }
        }
        if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
          return loadingCell;
        }
      }
      let result = getCellContent([outerCol, row]);
      if (rowMarkerOffset !== 0 && result.span !== undefined) {
        result = {
          ...result,
          span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset]
        };
      }
      return result;
    }
  }, [showTrailingBlankRow, mangledRows, hasRowMarkers, gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.rows, onRowMoved, rowMarkers, rowMarkerOffset, trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.hint, trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.addIcon, experimental === null || experimental === void 0 ? void 0 : experimental.strict, getCellContent, rowMarkerStartIndex]);
  const mangledGetGroupDetails = react.useCallback(group => {
    var _getGroupDetails;
    let result = (_getGroupDetails = getGroupDetails === null || getGroupDetails === void 0 ? void 0 : getGroupDetails(group)) !== null && _getGroupDetails !== void 0 ? _getGroupDetails : {
      name: group
    };
    if (onGroupHeaderRenamed !== undefined && group !== "") {
      var _result$actions;
      result = {
        icon: result.icon,
        name: result.name,
        overrideTheme: result.overrideTheme,
        actions: [...((_result$actions = result.actions) !== null && _result$actions !== void 0 ? _result$actions : []), {
          title: "Rename",
          icon: "renameIcon",
          onClick: e => setRenameGroup({
            group: result.name,
            bounds: e.bounds
          })
        }]
      };
    }
    return result;
  }, [getGroupDetails, onGroupHeaderRenamed]);
  const setOverlaySimple = react.useCallback(val => {
    var _mangledGetGroupDetai;
    const [col, row] = val.cell;
    const column = mangledCols[col];
    const groupTheme = (column === null || column === void 0 ? void 0 : column.group) !== undefined ? (_mangledGetGroupDetai = mangledGetGroupDetails(column.group)) === null || _mangledGetGroupDetai === void 0 ? void 0 : _mangledGetGroupDetai.overrideTheme : undefined;
    const colTheme = column === null || column === void 0 ? void 0 : column.themeOverride;
    const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
    setOverlay({
      ...val,
      theme: (0,styles/* mergeAndRealizeTheme */.yR)(mergedTheme, groupTheme, colTheme, rowTheme, val.content.themeOverride)
    });
  }, [getRowThemeOverride, mangledCols, mangledGetGroupDetails, mergedTheme]);
  const reselect = react.useCallback((bounds, fromKeyboard, initialValue) => {
    if (gridSelection.current === undefined) return;
    const [col, row] = gridSelection.current.cell;
    const c = getMangledCellContent([col, row]);
    if (c.kind !== data_grid_types/* GridCellKind.Boolean */.p6.Boolean && c.allowOverlay) {
      let content = c;
      if (initialValue !== undefined) {
        switch (content.kind) {
          case data_grid_types/* GridCellKind.Number */.p6.Number:
            {
              const d = (0,support/* maybe */.wY)(() => initialValue === "-" ? -0 : Number.parseFloat(initialValue), 0);
              content = {
                ...content,
                data: Number.isNaN(d) ? 0 : d
              };
              break;
            }
          case data_grid_types/* GridCellKind.Text */.p6.Text:
          case data_grid_types/* GridCellKind.Markdown */.p6.Markdown:
          case data_grid_types/* GridCellKind.Uri */.p6.Uri:
            content = {
              ...content,
              data: initialValue
            };
            break;
        }
      }
      setOverlaySimple({
        target: bounds,
        content,
        initialValue,
        cell: [col, row],
        highlight: initialValue === undefined,
        forceEditMode: initialValue !== undefined
      });
    } else if (c.kind === data_grid_types/* GridCellKind.Boolean */.p6.Boolean && fromKeyboard && c.readonly !== true) {
      var _gridRef$current3;
      mangledOnCellsEdited([{
        location: gridSelection.current.cell,
        value: {
          ...c,
          data: (0,data_editor_fns/* toggleBoolean */.D$)(c.data)
        }
      }]);
      (_gridRef$current3 = gridRef.current) === null || _gridRef$current3 === void 0 || _gridRef$current3.damage([{
        cell: gridSelection.current.cell
      }]);
    }
  }, [getMangledCellContent, gridSelection, mangledOnCellsEdited, setOverlaySimple]);
  const focusOnRowFromTrailingBlankRow = react.useCallback((col, row) => {
    var _gridRef$current4;
    const bounds = (_gridRef$current4 = gridRef.current) === null || _gridRef$current4 === void 0 ? void 0 : _gridRef$current4.getBounds(col, row);
    if (bounds === undefined || scrollRef.current === null) {
      return;
    }
    const content = getMangledCellContent([col, row]);
    if (!content.allowOverlay) {
      return;
    }
    setOverlaySimple({
      target: bounds,
      content,
      initialValue: undefined,
      highlight: true,
      cell: [col, row],
      forceEditMode: true
    });
  }, [getMangledCellContent, setOverlaySimple]);
  const scrollTo = react.useCallback(function (col, row) {
    let dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "both";
    let paddingX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let paddingY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    if (scrollRef.current !== null) {
      const grid = gridRef.current;
      const canvas = canvasRef.current;
      const trueCol = typeof col !== "number" ? col.unit === "cell" ? col.amount : undefined : col;
      const trueRow = typeof row !== "number" ? row.unit === "cell" ? row.amount : undefined : row;
      const desiredX = typeof col !== "number" && col.unit === "px" ? col.amount : undefined;
      const desiredY = typeof row !== "number" && row.unit === "px" ? row.amount : undefined;
      if (grid !== null && canvas !== null) {
        let targetRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        let scrollX = 0;
        let scrollY = 0;
        if (trueCol !== undefined || trueRow !== undefined) {
          var _grid$getBounds;
          targetRect = (_grid$getBounds = grid.getBounds((trueCol !== null && trueCol !== void 0 ? trueCol : 0) + rowMarkerOffset, trueRow !== null && trueRow !== void 0 ? trueRow : 0)) !== null && _grid$getBounds !== void 0 ? _grid$getBounds : targetRect;
          if (targetRect.width === 0 || targetRect.height === 0) return;
        }
        const scrollBounds = canvas.getBoundingClientRect();
        const scale = scrollBounds.width / canvas.offsetWidth;
        if (desiredX !== undefined) {
          targetRect = {
            ...targetRect,
            x: desiredX - scrollBounds.left - scrollRef.current.scrollLeft,
            width: 1
          };
        }
        if (desiredY !== undefined) {
          targetRect = {
            ...targetRect,
            y: desiredY + scrollBounds.top - scrollRef.current.scrollTop,
            height: 1
          };
        }
        if (targetRect !== undefined) {
          const bounds = {
            x: targetRect.x - paddingX,
            y: targetRect.y - paddingY,
            width: targetRect.width + 2 * paddingX,
            height: targetRect.height + 2 * paddingY
          };
          let frozenWidth = 0;
          for (let i = 0; i < freezeColumns; i++) {
            frozenWidth += columns[i].width;
          }
          let trailingRowHeight = 0;
          const freezeTrailingRowsEffective = freezeTrailingRows + (lastRowSticky ? 1 : 0);
          if (freezeTrailingRowsEffective > 0) {
            trailingRowHeight = (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(mangledRows, freezeTrailingRowsEffective, rowHeight);
          }
          let sLeft = frozenWidth * scale + scrollBounds.left + rowMarkerOffset * rowMarkerWidth * scale;
          let sRight = scrollBounds.right;
          let sTop = scrollBounds.top + totalHeaderHeight * scale;
          let sBottom = scrollBounds.bottom - trailingRowHeight * scale;
          const minx = targetRect.width + paddingX * 2;
          switch (options === null || options === void 0 ? void 0 : options.hAlign) {
            case "start":
              sRight = sLeft + minx;
              break;
            case "end":
              sLeft = sRight - minx;
              break;
            case "center":
              sLeft = Math.floor((sLeft + sRight) / 2) - minx / 2;
              sRight = sLeft + minx;
              break;
          }
          const miny = targetRect.height + paddingY * 2;
          switch (options === null || options === void 0 ? void 0 : options.vAlign) {
            case "start":
              sBottom = sTop + miny;
              break;
            case "end":
              sTop = sBottom - miny;
              break;
            case "center":
              sTop = Math.floor((sTop + sBottom) / 2) - miny / 2;
              sBottom = sTop + miny;
              break;
          }
          if (sLeft > bounds.x) {
            scrollX = bounds.x - sLeft;
          } else if (sRight < bounds.x + bounds.width) {
            scrollX = bounds.x + bounds.width - sRight;
          }
          if (sTop > bounds.y) {
            scrollY = bounds.y - sTop;
          } else if (sBottom < bounds.y + bounds.height) {
            scrollY = bounds.y + bounds.height - sBottom;
          }
          if (dir === "vertical" || typeof col === "number" && col < freezeColumns) {
            scrollX = 0;
          } else if (dir === "horizontal" || typeof row === "number" && row >= mangledRows - freezeTrailingRowsEffective) {
            scrollY = 0;
          }
          if (scrollX !== 0 || scrollY !== 0) {
            if (scale !== 1) {
              scrollX /= scale;
              scrollY /= scale;
            }
            scrollRef.current.scrollTo(scrollX + scrollRef.current.scrollLeft, scrollY + scrollRef.current.scrollTop);
          }
        }
      }
    }
  }, [rowMarkerOffset, freezeTrailingRows, rowMarkerWidth, totalHeaderHeight, freezeColumns, columns, mangledRows, lastRowSticky, rowHeight]);
  const focusCallback = react.useRef(focusOnRowFromTrailingBlankRow);
  const getCellContentRef = react.useRef(getCellContent);
  const rowsRef = react.useRef(rows);
  focusCallback.current = focusOnRowFromTrailingBlankRow;
  getCellContentRef.current = getCellContent;
  rowsRef.current = rows;
  const appendRow = react.useCallback(async function (col) {
    var _c$trailingRowOptions6;
    let openOverlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const c = mangledCols[col];
    if ((c === null || c === void 0 || (_c$trailingRowOptions6 = c.trailingRowOptions) === null || _c$trailingRowOptions6 === void 0 ? void 0 : _c$trailingRowOptions6.disabled) === true) {
      return;
    }
    const appendResult = onRowAppended === null || onRowAppended === void 0 ? void 0 : onRowAppended();
    let r = undefined;
    let bottom = true;
    if (appendResult !== undefined) {
      r = await appendResult;
      if (r === "top") bottom = false;
      if (typeof r === "number") bottom = false;
    }
    let backoff = 0;
    const doFocus = () => {
      if (rowsRef.current <= rows) {
        if (backoff < 500) {
          window.setTimeout(doFocus, backoff);
        }
        backoff = 50 + backoff * 2;
        return;
      }
      const row = typeof r === "number" ? r : bottom ? rows : 0;
      scrollToRef.current(col - rowMarkerOffset, row);
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, false, false, "edit");
      const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
      if (cell.allowOverlay && (0,data_grid_types/* isReadWriteCell */.Qo)(cell) && cell.readonly !== true && openOverlay) {
        window.setTimeout(() => {
          focusCallback.current(col, row);
        }, 0);
      }
    };
    doFocus();
  }, [mangledCols, onRowAppended, rowMarkerOffset, rows, setCurrent]);
  const getCustomNewRowTargetColumn = react.useCallback(col => {
    var _columns$col$trailing, _columns$col;
    const customTargetColumn = (_columns$col$trailing = (_columns$col = columns[col]) === null || _columns$col === void 0 || (_columns$col = _columns$col.trailingRowOptions) === null || _columns$col === void 0 ? void 0 : _columns$col.targetColumn) !== null && _columns$col$trailing !== void 0 ? _columns$col$trailing : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.targetColumn;
    if (typeof customTargetColumn === "number") {
      const customTargetOffset = hasRowMarkers ? 1 : 0;
      return customTargetColumn + customTargetOffset;
    }
    if (typeof customTargetColumn === "object") {
      const maybeIndex = columnsIn.indexOf(customTargetColumn);
      if (maybeIndex >= 0) {
        const customTargetOffset = hasRowMarkers ? 1 : 0;
        return maybeIndex + customTargetOffset;
      }
    }
    return undefined;
  }, [columns, columnsIn, hasRowMarkers, trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.targetColumn]);
  const lastSelectedRowRef = react.useRef();
  const lastSelectedColRef = react.useRef();
  const themeForCell = react.useCallback((cell, pos) => {
    var _mangledCols$col;
    const [col, row] = pos;
    return (0,styles/* mergeAndRealizeTheme */.yR)(mergedTheme, (_mangledCols$col = mangledCols[col]) === null || _mangledCols$col === void 0 ? void 0 : _mangledCols$col.themeOverride, getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row), cell.themeOverride);
  }, [getRowThemeOverride, mangledCols, mergedTheme]);
  const handleSelect = react.useCallback(args => {
    var _gridSelection$curren, _gridSelection$curren2;
    const isMultiKey = browser_detect/* browserIsOSX.value */.FR.value ? args.metaKey : args.ctrlKey;
    const isMultiRow = isMultiKey && rowSelect === "multi";
    const isMultiCol = isMultiKey && columnSelect === "multi";
    const [col, row] = args.location;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const [cellCol, cellRow] = (_gridSelection$curren = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.cell) !== null && _gridSelection$curren !== void 0 ? _gridSelection$curren : [];
    if (args.kind === "cell") {
      lastSelectedColRef.current = undefined;
      lastMouseSelectLocation.current = [col, row];
      if (col === 0 && hasRowMarkers) {
        if (showTrailingBlankRow === true && row === rows || rowMarkers === "number" || rowSelect === "none") return;
        const markerCell = getMangledCellContent(args.location);
        if (markerCell.kind !== data_grid_types/* InnerGridCellKind.Marker */.$o.Marker) {
          return;
        }
        if (onRowMoved !== undefined) {
          var _renderer$onClick;
          const renderer = getCellRenderer(markerCell);
          (0,support/* assert */.hu)((renderer === null || renderer === void 0 ? void 0 : renderer.kind) === data_grid_types/* InnerGridCellKind.Marker */.$o.Marker);
          const postClick = renderer === null || renderer === void 0 || (_renderer$onClick = renderer.onClick) === null || _renderer$onClick === void 0 ? void 0 : _renderer$onClick.call(renderer, {
            ...args,
            cell: markerCell,
            posX: args.localEventX,
            posY: args.localEventY,
            bounds: args.bounds,
            theme: themeForCell(markerCell, args.location),
            preventDefault: () => undefined
          });
          if (postClick === undefined || postClick.checked === markerCell.checked) return;
        }
        setOverlay(undefined);
        focus();
        const isSelected = selectedRows.hasIndex(row);
        const lastHighlighted = lastSelectedRowRef.current;
        if (rowSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastHighlighted !== undefined && selectedRows.hasIndex(lastHighlighted)) {
          const newSlice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];
          if (isMultiRow || rowSelectionMode === "multi") {
            setSelectedRows(undefined, newSlice, true);
          } else {
            setSelectedRows(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(newSlice), undefined, isMultiRow);
          }
        } else if (isMultiRow || args.isTouch || rowSelectionMode === "multi") {
          if (isSelected) {
            setSelectedRows(selectedRows.remove(row), undefined, true);
          } else {
            setSelectedRows(undefined, row, true);
            lastSelectedRowRef.current = row;
          }
        } else if (isSelected && selectedRows.length === 1) {
          setSelectedRows(data_grid_types/* CompactSelection.empty */.EV.empty(), undefined, isMultiKey);
        } else {
          setSelectedRows(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(row), undefined, isMultiKey);
          lastSelectedRowRef.current = row;
        }
      } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
        const customTargetColumn = getCustomNewRowTargetColumn(col);
        void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col);
      } else {
        if (cellCol !== col || cellRow !== row) {
          var _gridSelection$curren3;
          const cell = getMangledCellContent(args.location);
          const renderer = getCellRenderer(cell);
          if ((renderer === null || renderer === void 0 ? void 0 : renderer.onSelect) !== undefined) {
            let prevented = false;
            renderer.onSelect({
              ...args,
              cell,
              posX: args.localEventX,
              posY: args.localEventY,
              bounds: args.bounds,
              preventDefault: () => prevented = true,
              theme: themeForCell(cell, args.location)
            });
            if (prevented) {
              return;
            }
          }
          const isLastStickyRow = lastRowSticky && row === rows;
          const startedFromLastSticky = lastRowSticky && gridSelection !== undefined && ((_gridSelection$curren3 = gridSelection.current) === null || _gridSelection$curren3 === void 0 ? void 0 : _gridSelection$curren3.cell[1]) === rows;
          if ((args.shiftKey || args.isLongTouch === true) && cellCol !== undefined && cellRow !== undefined && gridSelection.current !== undefined && !startedFromLastSticky) {
            if (isLastStickyRow) {
              return;
            }
            const left = Math.min(col, cellCol);
            const right = Math.max(col, cellCol);
            const top = Math.min(row, cellRow);
            const bottom = Math.max(row, cellRow);
            setCurrent({
              ...gridSelection.current,
              range: {
                x: left,
                y: top,
                width: right - left + 1,
                height: bottom - top + 1
              }
            }, true, isMultiKey, "click");
            lastSelectedRowRef.current = undefined;
            focus();
          } else {
            setCurrent({
              cell: [col, row],
              range: {
                x: col,
                y: row,
                width: 1,
                height: 1
              }
            }, true, isMultiKey, "click");
            lastSelectedRowRef.current = undefined;
            setOverlay(undefined);
            focus();
          }
        }
      }
    } else if (args.kind === "header") {
      lastMouseSelectLocation.current = [col, row];
      setOverlay(undefined);
      if (hasRowMarkers && col === 0) {
        lastSelectedRowRef.current = undefined;
        lastSelectedColRef.current = undefined;
        if (rowSelect === "multi") {
          if (selectedRows.length !== rows) {
            setSelectedRows(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection([0, rows]), undefined, isMultiKey);
          } else {
            setSelectedRows(data_grid_types/* CompactSelection.empty */.EV.empty(), undefined, isMultiKey);
          }
          focus();
        }
      } else {
        const lastCol = lastSelectedColRef.current;
        if (columnSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastCol !== undefined && selectedColumns.hasIndex(lastCol)) {
          const newSlice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];
          if (isMultiCol) {
            setSelectedColumns(undefined, newSlice, isMultiKey);
          } else {
            setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(newSlice), undefined, isMultiKey);
          }
        } else if (isMultiCol) {
          if (selectedColumns.hasIndex(col)) {
            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
          } else {
            setSelectedColumns(undefined, col, isMultiKey);
          }
          lastSelectedColRef.current = col;
        } else if (columnSelect !== "none") {
          setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(col), undefined, isMultiKey);
          lastSelectedColRef.current = col;
        }
        lastSelectedRowRef.current = undefined;
        focus();
      }
    } else if (args.kind === event_args/* groupHeaderKind */.mr) {
      lastMouseSelectLocation.current = [col, row];
    } else if (args.kind === event_args/* outOfBoundsKind */.Xv && !args.isMaybeScrollbar) {
      setGridSelection(emptyGridSelection, false);
      setOverlay(undefined);
      focus();
      onSelectionCleared === null || onSelectionCleared === void 0 || onSelectionCleared();
      lastSelectedRowRef.current = undefined;
      lastSelectedColRef.current = undefined;
    }
  }, [appendRow, columnSelect, focus, getCellRenderer, getCustomNewRowTargetColumn, getMangledCellContent, gridSelection, hasRowMarkers, lastRowSticky, onSelectionCleared, onRowMoved, rowMarkerOffset, rowMarkers, rowSelect, rowSelectionMode, rows, setCurrent, setGridSelection, setSelectedColumns, setSelectedRows, showTrailingBlankRow, themeForCell]);
  const isActivelyDraggingHeader = react.useRef(false);
  const lastMouseSelectLocation = react.useRef();
  const touchDownArgs = react.useRef(visibleRegion);
  const mouseDownData = react.useRef();
  const onMouseDown = react.useCallback(args => {
    isPrevented.current = false;
    touchDownArgs.current = visibleRegionRef.current;
    if (args.button !== 0 && args.button !== 1) {
      mouseDownData.current = undefined;
      return;
    }
    const time = performance.now();
    mouseDownData.current = {
      button: args.button,
      time,
      location: args.location
    };
    if ((args === null || args === void 0 ? void 0 : args.kind) === "header") {
      isActivelyDraggingHeader.current = true;
    }
    const fh = args.kind === "cell" && args.isFillHandle;
    if (!fh && args.kind !== "cell" && args.isEdge) return;
    setMouseState({
      previousSelection: gridSelection,
      fillHandle: fh
    });
    lastMouseSelectLocation.current = undefined;
    if (!args.isTouch && args.button === 0 && !fh) {
      handleSelect(args);
    } else if (!args.isTouch && args.button === 1) {
      lastMouseSelectLocation.current = args.location;
    }
  }, [gridSelection, handleSelect]);
  const [renameGroup, setRenameGroup] = react.useState();
  const handleGroupHeaderSelection = react.useCallback(args => {
    if (args.kind !== event_args/* groupHeaderKind */.mr || columnSelect !== "multi") {
      return;
    }
    const isMultiKey = browser_detect/* browserIsOSX.value */.FR.value ? args.metaKey : args.ctrlKey;
    const [col] = args.location;
    const selectedColumns = gridSelection.columns;
    if (col < rowMarkerOffset) return;
    const needle = mangledCols[col];
    let start = col;
    let end = col;
    for (let i = col - 1; i >= rowMarkerOffset; i--) {
      if (!(0,data_grid_lib/* isGroupEqual */.PU)(needle.group, mangledCols[i].group)) break;
      start--;
    }
    for (let i = col + 1; i < mangledCols.length; i++) {
      if (!(0,data_grid_lib/* isGroupEqual */.PU)(needle.group, mangledCols[i].group)) break;
      end++;
    }
    focus();
    if (isMultiKey) {
      if (selectedColumns.hasAll([start, end + 1])) {
        let newVal = selectedColumns;
        for (let index = start; index <= end; index++) {
          newVal = newVal.remove(index);
        }
        setSelectedColumns(newVal, undefined, isMultiKey);
      } else {
        setSelectedColumns(undefined, [start, end + 1], isMultiKey);
      }
    } else {
      setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection([start, end + 1]), undefined, isMultiKey);
    }
  }, [columnSelect, focus, gridSelection.columns, mangledCols, rowMarkerOffset, setSelectedColumns]);
  const isPrevented = react.useRef(false);
  const normalSizeColumn = react.useCallback(async col => {
    if (getCellsForSelection !== undefined && onColumnResize !== undefined) {
      const start = visibleRegionRef.current.y;
      const end = visibleRegionRef.current.height;
      let cells = getCellsForSelection({
        x: col,
        y: start,
        width: 1,
        height: Math.min(end, rows - start)
      }, abortControllerRef.current.signal);
      if (typeof cells !== "object") {
        cells = await cells();
      }
      const inputCol = columns[col - rowMarkerOffset];
      const offscreen = document.createElement("canvas");
      const ctx = offscreen.getContext("2d", {
        alpha: false
      });
      if (ctx !== null) {
        ctx.font = mergedTheme.baseFontFull;
        const newCol = measureColumn(ctx, mergedTheme, inputCol, 0, cells, minColumnWidth, maxColumnWidth, false, getCellRenderer);
        onColumnResize === null || onColumnResize === void 0 || onColumnResize(inputCol, newCol.width, col, newCol.width);
      }
    }
  }, [columns, getCellsForSelection, maxColumnWidth, mergedTheme, minColumnWidth, onColumnResize, rowMarkerOffset, rows, getCellRenderer]);
  const [scrollDir, setScrollDir] = react.useState();
  const fillPattern = react.useCallback(async (previousSelection, currentSelection) => {
    var _previousSelection$cu, _gridRef$current5;
    const patternRange = (_previousSelection$cu = previousSelection.current) === null || _previousSelection$cu === void 0 ? void 0 : _previousSelection$cu.range;
    if (patternRange === undefined || getCellsForSelection === undefined || currentSelection.current === undefined) {
      return;
    }
    const currentRange = currentSelection.current.range;
    if (onFillPattern !== undefined) {
      let canceled = false;
      onFillPattern({
        fillDestination: {
          ...currentRange,
          x: currentRange.x - rowMarkerOffset
        },
        patternSource: {
          ...patternRange,
          x: patternRange.x - rowMarkerOffset
        },
        preventDefault: () => canceled = true
      });
      if (canceled) return;
    }
    let cells = getCellsForSelection(patternRange, abortControllerRef.current.signal);
    if (typeof cells !== "object") cells = await cells();
    const pattern = cells;
    const editItemList = [];
    for (let x = 0; x < currentRange.width; x++) {
      for (let y = 0; y < currentRange.height; y++) {
        const cell = [currentRange.x + x, currentRange.y + y];
        if ((0,data_grid_lib/* itemIsInRect */.X4)(cell, patternRange)) continue;
        const patternCell = pattern[y % patternRange.height][x % patternRange.width];
        if ((0,data_grid_types/* isInnerOnlyCell */.rs)(patternCell) || !(0,data_grid_types/* isReadWriteCell */.Qo)(patternCell)) continue;
        editItemList.push({
          location: cell,
          value: {
            ...patternCell
          }
        });
      }
    }
    mangledOnCellsEdited(editItemList);
    (_gridRef$current5 = gridRef.current) === null || _gridRef$current5 === void 0 || _gridRef$current5.damage(editItemList.map(c => ({
      cell: c.location
    })));
  }, [getCellsForSelection, mangledOnCellsEdited, onFillPattern, rowMarkerOffset]);
  const fillRight = react.useCallback(() => {
    if (gridSelection.current === undefined || gridSelection.current.range.width <= 1) return;
    const firstColSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          width: 1
        }
      }
    };
    void fillPattern(firstColSelection, gridSelection);
  }, [fillPattern, gridSelection]);
  const fillDown = react.useCallback(() => {
    if (gridSelection.current === undefined || gridSelection.current.range.height <= 1) return;
    const firstRowSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          height: 1
        }
      }
    };
    void fillPattern(firstRowSelection, gridSelection);
  }, [fillPattern, gridSelection]);
  const onMouseUp = react.useCallback((args, isOutside) => {
    var _mouse$previousSelect, _lastMouseSelectLocat;
    const mouse = mouseState;
    setMouseState(undefined);
    setFillHighlightRegion(undefined);
    setScrollDir(undefined);
    isActivelyDraggingHeader.current = false;
    if (isOutside) return;
    if ((mouse === null || mouse === void 0 ? void 0 : mouse.fillHandle) === true && gridSelection.current !== undefined && ((_mouse$previousSelect = mouse.previousSelection) === null || _mouse$previousSelect === void 0 ? void 0 : _mouse$previousSelect.current) !== undefined) {
      if (fillHighlightRegion === undefined) return;
      const newRange = {
        ...gridSelection,
        current: {
          ...gridSelection.current,
          range: (0,math/* combineRects */.qZ)(mouse.previousSelection.current.range, fillHighlightRegion)
        }
      };
      void fillPattern(mouse.previousSelection, newRange);
      setGridSelection(newRange, true);
      return;
    }
    const [col, row] = args.location;
    const [lastMouseDownCol, lastMouseDownRow] = (_lastMouseSelectLocat = lastMouseSelectLocation.current) !== null && _lastMouseSelectLocat !== void 0 ? _lastMouseSelectLocat : [];
    const preventDefault = () => {
      isPrevented.current = true;
    };
    const handleMaybeClick = a => {
      const isValidClick = a.isTouch || lastMouseDownCol === col && lastMouseDownRow === row;
      if (isValidClick) {
        onCellClicked === null || onCellClicked === void 0 || onCellClicked([col - rowMarkerOffset, row], {
          ...a,
          preventDefault
        });
      }
      if (a.button === 1) return !isPrevented.current;
      if (!isPrevented.current) {
        const c = getMangledCellContent(args.location);
        const r = getCellRenderer(c);
        if (r !== undefined && r.onClick !== undefined && isValidClick) {
          const newVal = r.onClick({
            ...a,
            cell: c,
            posX: a.localEventX,
            posY: a.localEventY,
            bounds: a.bounds,
            theme: themeForCell(c, args.location),
            preventDefault
          });
          if (newVal !== undefined && !(0,data_grid_types/* isInnerOnlyCell */.rs)(newVal) && (0,data_grid_types/* isEditableGridCell */.T9)(newVal)) {
            var _gridRef$current6;
            mangledOnCellsEdited([{
              location: a.location,
              value: newVal
            }]);
            (_gridRef$current6 = gridRef.current) === null || _gridRef$current6 === void 0 || _gridRef$current6.damage([{
              cell: a.location
            }]);
          }
        }
        if (isPrevented.current || gridSelection.current === undefined) return false;
        let shouldActivate = false;
        switch (cellActivationBehavior) {
          case "double-click":
          case "second-click":
            {
              var _mouse$previousSelect2;
              if ((mouse === null || mouse === void 0 || (_mouse$previousSelect2 = mouse.previousSelection) === null || _mouse$previousSelect2 === void 0 || (_mouse$previousSelect2 = _mouse$previousSelect2.current) === null || _mouse$previousSelect2 === void 0 ? void 0 : _mouse$previousSelect2.cell) === undefined) break;
              const [selectedCol, selectedRow] = gridSelection.current.cell;
              const [prevCol, prevRow] = mouse.previousSelection.current.cell;
              const isClickOnSelected = col === selectedCol && col === prevCol && row === selectedRow && row === prevRow;
              shouldActivate = isClickOnSelected && (a.isDoubleClick === true || cellActivationBehavior === "second-click");
              break;
            }
          case "single-click":
            {
              shouldActivate = true;
              break;
            }
        }
        if (shouldActivate) {
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row]);
          reselect(a.bounds, false);
          return true;
        }
      }
      return false;
    };
    const clickLocation = args.location[0] - rowMarkerOffset;
    if (args.isTouch) {
      const vr = visibleRegionRef.current;
      const touchVr = touchDownArgs.current;
      if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
        return;
      }
      if (args.isLongTouch === true) {
        var _gridSelection$curren4;
        if (args.kind === "cell" && (0,data_grid_lib/* itemsAreEqual */.pU)((_gridSelection$curren4 = gridSelection.current) === null || _gridSelection$curren4 === void 0 ? void 0 : _gridSelection$curren4.cell, args.location)) {
          onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([clickLocation, args.location[1]], {
            ...args,
            preventDefault
          });
          return;
        } else if (args.kind === "header" && gridSelection.columns.hasIndex(col)) {
          onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(clickLocation, {
            ...args,
            preventDefault
          });
          return;
        } else if (args.kind === event_args/* groupHeaderKind */.mr) {
          if (clickLocation < 0) {
            return;
          }
          onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(clickLocation, {
            ...args,
            preventDefault
          });
          return;
        }
      }
      if (args.kind === "cell") {
        if (!handleMaybeClick(args)) {
          handleSelect(args);
        }
      } else if (args.kind === event_args/* groupHeaderKind */.mr) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...args,
          preventDefault
        });
      } else {
        if (args.kind === event_args/* headerKind */.aZ) {
          onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
            ...args,
            preventDefault
          });
        }
        handleSelect(args);
      }
      return;
    }
    if (args.kind === "header") {
      if (clickLocation < 0) {
        return;
      }
      if (args.isEdge) {
        if (args.isDoubleClick === true) {
          void normalSizeColumn(col);
        }
      } else if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
        onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
          ...args,
          preventDefault
        });
      }
    }
    if (args.kind === event_args/* groupHeaderKind */.mr) {
      if (clickLocation < 0) {
        return;
      }
      if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...args,
          preventDefault
        });
        if (!isPrevented.current) {
          handleGroupHeaderSelection(args);
        }
      }
    }
    if (args.kind === "cell" && (args.button === 0 || args.button === 1)) {
      handleMaybeClick(args);
    }
    lastMouseSelectLocation.current = undefined;
  }, [mouseState, gridSelection, rowMarkerOffset, fillHighlightRegion, fillPattern, setGridSelection, onCellClicked, getMangledCellContent, getCellRenderer, cellActivationBehavior, themeForCell, mangledOnCellsEdited, onCellActivated, reselect, onCellContextMenu, onHeaderContextMenu, onGroupHeaderContextMenu, handleSelect, onGroupHeaderClicked, onHeaderClicked, normalSizeColumn, handleGroupHeaderSelection]);
  const onMouseMoveImpl = react.useCallback(args => {
    const a = {
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    };
    onMouseMove === null || onMouseMove === void 0 || onMouseMove(a);
    if (mouseState !== undefined && args.buttons === 0) {
      setMouseState(undefined);
      setFillHighlightRegion(undefined);
      setScrollDir(undefined);
      isActivelyDraggingHeader.current = false;
    }
    setScrollDir(cv => {
      var _mouseDownData$curren, _mouseDownData$curren2;
      if (isActivelyDraggingHeader.current) return [args.scrollEdge[0], 0];
      if (args.scrollEdge[0] === (cv === null || cv === void 0 ? void 0 : cv[0]) && args.scrollEdge[1] === cv[1]) return cv;
      return mouseState === undefined || ((_mouseDownData$curren = (_mouseDownData$curren2 = mouseDownData.current) === null || _mouseDownData$curren2 === void 0 ? void 0 : _mouseDownData$curren2.location[0]) !== null && _mouseDownData$curren !== void 0 ? _mouseDownData$curren : 0) < rowMarkerOffset ? undefined : args.scrollEdge;
    });
  }, [mouseState, onMouseMove, rowMarkerOffset]);
  const onHeaderMenuClickInner = react.useCallback((col, screenPosition) => {
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col - rowMarkerOffset, screenPosition);
  }, [onHeaderMenuClick, rowMarkerOffset]);
  const currentCell = gridSelection === null || gridSelection === void 0 || (_gridSelection$curren5 = gridSelection.current) === null || _gridSelection$curren5 === void 0 ? void 0 : _gridSelection$curren5.cell;
  const onVisibleRegionChangedImpl = react.useCallback((region, clientWidth, clientHeight, rightElWidth, tx, ty) => {
    hasJustScrolled.current = false;
    let selected = currentCell;
    if (selected !== undefined) {
      selected = [selected[0] - rowMarkerOffset, selected[1]];
    }
    const freezeRegion = freezeColumns === 0 ? undefined : {
      x: 0,
      y: region.y,
      width: freezeColumns,
      height: region.height
    };
    const freezeRegions = [];
    if (freezeRegion !== undefined) freezeRegions.push(freezeRegion);
    if (freezeTrailingRows > 0) {
      freezeRegions.push({
        x: region.x - rowMarkerOffset,
        y: rows - freezeTrailingRows,
        width: region.width,
        height: freezeTrailingRows
      });
      if (freezeColumns > 0) {
        freezeRegions.push({
          x: 0,
          y: rows - freezeTrailingRows,
          width: freezeColumns,
          height: freezeTrailingRows
        });
      }
    }
    const newRegion = {
      x: region.x - rowMarkerOffset,
      y: region.y,
      width: region.width,
      height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
      tx,
      ty,
      extras: {
        selected,
        freezeRegion,
        freezeRegions
      }
    };
    visibleRegionRef.current = newRegion;
    setVisibleRegion(newRegion);
    setClientSize([clientWidth, clientHeight, rightElWidth]);
    onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 || onVisibleRegionChanged(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
  }, [currentCell, rowMarkerOffset, showTrailingBlankRow, rows, freezeColumns, freezeTrailingRows, setVisibleRegion, onVisibleRegionChanged]);
  const onColumnMovedImpl = (0,utils/* whenDefined */.qJ)(onColumnMoved, react.useCallback((startIndex, endIndex) => {
    onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
    if (columnSelect !== "none") {
      setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(endIndex), undefined, true);
    }
  }, [columnSelect, onColumnMoved, rowMarkerOffset, setSelectedColumns]));
  const isActivelyDragging = react.useRef(false);
  const onDragStartImpl = react.useCallback(args => {
    if (args.location[0] === 0 && rowMarkerOffset > 0) {
      args.preventDefault();
      return;
    }
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
    if (!args.defaultPrevented()) {
      isActivelyDragging.current = true;
    }
    setMouseState(undefined);
  }, [onDragStart, rowMarkerOffset]);
  const onDragEnd = react.useCallback(() => {
    isActivelyDragging.current = false;
  }, []);
  const hoveredRef = react.useRef();
  const onItemHoveredImpl = react.useCallback(args => {
    var _mouseDownData$curren3, _mouseDownData$curren4;
    if ((0,event_args/* mouseEventArgsAreEqual */.PN)(args, hoveredRef.current)) return;
    hoveredRef.current = args;
    if ((mouseDownData === null || mouseDownData === void 0 || (_mouseDownData$curren3 = mouseDownData.current) === null || _mouseDownData$curren3 === void 0 ? void 0 : _mouseDownData$curren3.button) !== undefined && mouseDownData.current.button >= 1) return;
    if (args.buttons !== 0 && mouseState !== undefined && ((_mouseDownData$curren4 = mouseDownData.current) === null || _mouseDownData$curren4 === void 0 ? void 0 : _mouseDownData$curren4.location[0]) === 0 && args.location[0] === 0 && rowMarkerOffset === 1 && rowSelect === "multi" && mouseState.previousSelection && !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) && gridSelection.rows.hasIndex(mouseDownData.current.location[1])) {
      const start = Math.min(mouseDownData.current.location[1], args.location[1]);
      const end = Math.max(mouseDownData.current.location[1], args.location[1]) + 1;
      setSelectedRows(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection([start, end]), undefined, false);
    }
    if (args.buttons !== 0 && mouseState !== undefined && gridSelection.current !== undefined && !isActivelyDragging.current && !isActivelyDraggingHeader.current && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
      var _mouseState$previousS;
      const [selectedCol, selectedRow] = gridSelection.current.cell;
      let [col, row] = args.location;
      if (row < 0) {
        row = visibleRegionRef.current.y;
      }
      if (mouseState.fillHandle === true && ((_mouseState$previousS = mouseState.previousSelection) === null || _mouseState$previousS === void 0 ? void 0 : _mouseState$previousS.current) !== undefined) {
        const prevRange = mouseState.previousSelection.current.range;
        row = Math.min(row, lastRowSticky ? rows - 1 : rows);
        const rect = (0,math/* getClosestRect */.vN)(prevRange, col, row, allowedFillDirections);
        setFillHighlightRegion(rect);
      } else {
        const startedFromLastStickyRow = lastRowSticky && selectedRow === rows;
        if (startedFromLastStickyRow) return;
        const landedOnLastStickyRow = lastRowSticky && row === rows;
        if (landedOnLastStickyRow) {
          if (args.kind === event_args/* outOfBoundsKind */.Xv) row--;else return;
        }
        col = Math.max(col, rowMarkerOffset);
        const deltaX = col - selectedCol;
        const deltaY = row - selectedRow;
        const newRange = {
          x: deltaX >= 0 ? selectedCol : col,
          y: deltaY >= 0 ? selectedRow : row,
          width: Math.abs(deltaX) + 1,
          height: Math.abs(deltaY) + 1
        };
        setCurrent({
          ...gridSelection.current,
          range: newRange
        }, true, false, "drag");
      }
    }
    onItemHovered === null || onItemHovered === void 0 || onItemHovered({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
  }, [allowedFillDirections, mouseState, rowMarkerOffset, rowSelect, gridSelection, rangeSelect, onItemHovered, setSelectedRows, lastRowSticky, rows, setCurrent]);
  const adjustSelectionOnScroll = react.useCallback(() => {
    const args = hoveredRef.current;
    if (args === undefined) return;
    const [xDir, yDir] = args.scrollEdge;
    let [col, row] = args.location;
    const visible = visibleRegionRef.current;
    if (xDir === -1) {
      var _visible$extras$freez, _visible$extras;
      col = (_visible$extras$freez = (_visible$extras = visible.extras) === null || _visible$extras === void 0 || (_visible$extras = _visible$extras.freezeRegion) === null || _visible$extras === void 0 ? void 0 : _visible$extras.x) !== null && _visible$extras$freez !== void 0 ? _visible$extras$freez : visible.x;
    } else if (xDir === 1) {
      col = visible.x + visible.width;
    }
    if (yDir === -1) {
      row = Math.max(0, visible.y);
    } else if (yDir === 1) {
      row = Math.min(rows - 1, visible.y + visible.height);
    }
    col = clamp_default()(col, 0, mangledCols.length - 1);
    row = clamp_default()(row, 0, rows - 1);
    onItemHoveredImpl({
      ...args,
      location: [col, row]
    });
  }, [mangledCols.length, onItemHoveredImpl, rows]);
  useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);
  const adjustSelection = react.useCallback(direction => {
    if (gridSelection.current === undefined) return;
    const [x, y] = direction;
    const [col, row] = gridSelection.current.cell;
    const old = gridSelection.current.range;
    let left = old.x;
    let right = old.x + old.width;
    let top = old.y;
    let bottom = old.y + old.height;
    if (y !== 0) {
      switch (y) {
        case 2:
          {
            bottom = rows;
            top = row;
            scrollTo(0, bottom, "vertical");
            break;
          }
        case -2:
          {
            top = 0;
            bottom = row + 1;
            scrollTo(0, top, "vertical");
            break;
          }
        case 1:
          {
            if (top < row) {
              top++;
              scrollTo(0, top, "vertical");
            } else {
              bottom = Math.min(rows, bottom + 1);
              scrollTo(0, bottom, "vertical");
            }
            break;
          }
        case -1:
          {
            if (bottom > row + 1) {
              bottom--;
              scrollTo(0, bottom, "vertical");
            } else {
              top = Math.max(0, top - 1);
              scrollTo(0, top, "vertical");
            }
            break;
          }
        default:
          {
            (0,support/* assertNever */.vE)(y);
          }
      }
    }
    if (x !== 0) {
      if (x === 2) {
        right = mangledCols.length;
        left = col;
        scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
      } else if (x === -2) {
        left = rowMarkerOffset;
        right = col + 1;
        scrollTo(left - rowMarkerOffset, 0, "horizontal");
      } else {
        let disallowed = [];
        if (getCellsForSelection !== undefined) {
          const cells = getCellsForSelection({
            x: left,
            y: top,
            width: right - left - rowMarkerOffset,
            height: bottom - top
          }, abortControllerRef.current.signal);
          if (typeof cells === "object") {
            disallowed = getSpanStops(cells);
          }
        }
        if (x === 1) {
          let done = false;
          if (left < col) {
            if (disallowed.length > 0) {
              const target = range_default()(left + 1, col + 1).find(n => !disallowed.includes(n - rowMarkerOffset));
              if (target !== undefined) {
                left = target;
                done = true;
              }
            } else {
              left++;
              done = true;
            }
            if (done) scrollTo(left, 0, "horizontal");
          }
          if (!done) {
            right = Math.min(mangledCols.length, right + 1);
            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
          }
        } else if (x === -1) {
          let done = false;
          if (right > col + 1) {
            if (disallowed.length > 0) {
              const target = range_default()(right - 1, col, -1).find(n => !disallowed.includes(n - rowMarkerOffset));
              if (target !== undefined) {
                right = target;
                done = true;
              }
            } else {
              right--;
              done = true;
            }
            if (done) scrollTo(right - rowMarkerOffset, 0, "horizontal");
          }
          if (!done) {
            left = Math.max(rowMarkerOffset, left - 1);
            scrollTo(left - rowMarkerOffset, 0, "horizontal");
          }
        } else {
          (0,support/* assertNever */.vE)(x);
        }
      }
    }
    setCurrent({
      cell: gridSelection.current.cell,
      range: {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      }
    }, true, false, "keyboard-select");
  }, [getCellsForSelection, gridSelection, mangledCols.length, rowMarkerOffset, rows, scrollTo, setCurrent]);
  const updateSelectedCell = react.useCallback((col, row, fromEditingTrailingRow, freeMove) => {
    const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
    col = clamp_default()(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
    row = clamp_default()(row, 0, rowMax);
    if (col === (currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) && row === (currentCell === null || currentCell === void 0 ? void 0 : currentCell[1])) return false;
    if (freeMove && gridSelection.current !== undefined) {
      const newStack = [...gridSelection.current.rangeStack];
      if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
        newStack.push(gridSelection.current.range);
      }
      setGridSelection({
        ...gridSelection,
        current: {
          cell: [col, row],
          range: {
            x: col,
            y: row,
            width: 1,
            height: 1
          },
          rangeStack: newStack
        }
      }, true);
    } else {
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-nav");
    }
    if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
      lastSent.current = undefined;
    }
    scrollTo(col - rowMarkerOffset, row);
    return true;
  }, [mangledRows, rowMarkerOffset, columns.length, currentCell, gridSelection, scrollTo, setGridSelection, setCurrent]);
  const onFinishEditing = react.useCallback((newValue, movement) => {
    if ((overlay === null || overlay === void 0 ? void 0 : overlay.cell) !== undefined && newValue !== undefined && (0,data_grid_types/* isEditableGridCell */.T9)(newValue)) {
      mangledOnCellsEdited([{
        location: overlay.cell,
        value: newValue
      }]);
      window.requestAnimationFrame(() => {
        var _gridRef$current7;
        (_gridRef$current7 = gridRef.current) === null || _gridRef$current7 === void 0 || _gridRef$current7.damage([{
          cell: overlay.cell
        }]);
      });
    }
    focus(true);
    setOverlay(undefined);
    const [movX, movY] = movement;
    if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
      const isEditingTrailingRow = gridSelection.current.cell[1] === mangledRows - 1 && newValue !== undefined;
      updateSelectedCell(clamp_default()(gridSelection.current.cell[0] + movX, 0, mangledCols.length - 1), clamp_default()(gridSelection.current.cell[1] + movY, 0, mangledRows - 1), isEditingTrailingRow, false);
    }
    onFinishedEditing === null || onFinishedEditing === void 0 || onFinishedEditing(newValue, movement);
  }, [overlay === null || overlay === void 0 ? void 0 : overlay.cell, focus, gridSelection, onFinishedEditing, mangledOnCellsEdited, mangledRows, updateSelectedCell, mangledCols.length]);
  const overlayID = react.useMemo(() => {
    return `gdg-overlay-${idCounter++}`;
  }, []);
  const deleteRange = react.useCallback(r => {
    var _gridRef$current8;
    focus();
    const editList = [];
    for (let x = r.x; x < r.x + r.width; x++) {
      for (let y = r.y; y < r.y + r.height; y++) {
        const cellValue = getCellContent([x - rowMarkerOffset, y]);
        if (!cellValue.allowOverlay && cellValue.kind !== data_grid_types/* GridCellKind.Boolean */.p6.Boolean) continue;
        let newVal = undefined;
        if (cellValue.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom) {
          var _toDelete$provideEdit;
          const toDelete = getCellRenderer(cellValue);
          const editor = toDelete === null || toDelete === void 0 || (_toDelete$provideEdit = toDelete.provideEditor) === null || _toDelete$provideEdit === void 0 ? void 0 : _toDelete$provideEdit.call(toDelete, cellValue);
          if ((toDelete === null || toDelete === void 0 ? void 0 : toDelete.onDelete) !== undefined) {
            newVal = toDelete.onDelete(cellValue);
          } else if ((0,data_grid_types/* isObjectEditorCallbackResult */.DP)(editor)) {
            var _editor$deletedValue;
            newVal = editor === null || editor === void 0 || (_editor$deletedValue = editor.deletedValue) === null || _editor$deletedValue === void 0 ? void 0 : _editor$deletedValue.call(editor, cellValue);
          }
        } else if ((0,data_grid_types/* isEditableGridCell */.T9)(cellValue) && cellValue.allowOverlay || cellValue.kind === data_grid_types/* GridCellKind.Boolean */.p6.Boolean) {
          var _toDelete$onDelete;
          const toDelete = getCellRenderer(cellValue);
          newVal = toDelete === null || toDelete === void 0 || (_toDelete$onDelete = toDelete.onDelete) === null || _toDelete$onDelete === void 0 ? void 0 : _toDelete$onDelete.call(toDelete, cellValue);
        }
        if (newVal !== undefined && !(0,data_grid_types/* isInnerOnlyCell */.rs)(newVal) && (0,data_grid_types/* isEditableGridCell */.T9)(newVal)) {
          editList.push({
            location: [x, y],
            value: newVal
          });
        }
      }
    }
    mangledOnCellsEdited(editList);
    (_gridRef$current8 = gridRef.current) === null || _gridRef$current8 === void 0 || _gridRef$current8.damage(editList.map(x => ({
      cell: x.location
    })));
  }, [focus, getCellContent, getCellRenderer, mangledOnCellsEdited, rowMarkerOffset]);
  const overlayOpen = overlay !== undefined;
  const handleFixedKeybindings = react.useCallback(event => {
    const cancel = () => {
      event.stopPropagation();
      event.preventDefault();
    };
    const details = {
      didMatch: false
    };
    const {
      bounds
    } = event;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const keys = keybindings;
    if (!overlayOpen && isHotkey(keys.clear, event, details)) {
      setGridSelection(emptyGridSelection, false);
      onSelectionCleared === null || onSelectionCleared === void 0 || onSelectionCleared();
    } else if (!overlayOpen && isHotkey(keys.selectAll, event, details)) {
      var _gridSelection$curren6, _gridSelection$curren7;
      setGridSelection({
        columns: data_grid_types/* CompactSelection.empty */.EV.empty(),
        rows: data_grid_types/* CompactSelection.empty */.EV.empty(),
        current: {
          cell: (_gridSelection$curren6 = (_gridSelection$curren7 = gridSelection.current) === null || _gridSelection$curren7 === void 0 ? void 0 : _gridSelection$curren7.cell) !== null && _gridSelection$curren6 !== void 0 ? _gridSelection$curren6 : [rowMarkerOffset, 0],
          range: {
            x: rowMarkerOffset,
            y: 0,
            width: columnsIn.length,
            height: rows
          },
          rangeStack: []
        }
      }, false);
    } else if (isHotkey(keys.search, event, details)) {
      var _searchInputRef$curre;
      searchInputRef === null || searchInputRef === void 0 || (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 || _searchInputRef$curre.focus({
        preventScroll: true
      });
      setShowSearchInner(true);
    } else if (isHotkey(keys.delete, event, details)) {
      var _onDelete;
      const callbackResult = (_onDelete = onDelete === null || onDelete === void 0 ? void 0 : onDelete(gridSelection)) !== null && _onDelete !== void 0 ? _onDelete : true;
      if (callbackResult !== false) {
        const toDelete = callbackResult === true ? gridSelection : callbackResult;
        if (toDelete.current !== undefined) {
          deleteRange(toDelete.current.range);
          for (const r of toDelete.current.rangeStack) {
            deleteRange(r);
          }
        }
        for (const r of toDelete.rows) {
          deleteRange({
            x: rowMarkerOffset,
            y: r,
            width: columnsIn.length,
            height: 1
          });
        }
        for (const col of toDelete.columns) {
          deleteRange({
            x: col,
            y: 0,
            width: 1,
            height: rows
          });
        }
      }
    }
    if (details.didMatch) {
      cancel();
      return true;
    }
    if (gridSelection.current === undefined) return false;
    let [col, row] = gridSelection.current.cell;
    let freeMove = false;
    let cancelOnlyOnMove = false;
    if (isHotkey(keys.scrollToSelectedCell, event, details)) {
      scrollToRef.current(col - rowMarkerOffset, row);
    } else if (columnSelect !== "none" && isHotkey(keys.selectColumn, event, details)) {
      if (selectedColumns.hasIndex(col)) {
        setSelectedColumns(selectedColumns.remove(col), undefined, true);
      } else {
        if (columnSelect === "single") {
          setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(col), undefined, true);
        } else {
          setSelectedColumns(undefined, col, true);
        }
      }
    } else if (rowSelect !== "none" && isHotkey(keys.selectRow, event, details)) {
      if (selectedRows.hasIndex(row)) {
        setSelectedRows(selectedRows.remove(row), undefined, true);
      } else {
        if (rowSelect === "single") {
          setSelectedRows(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(row), undefined, true);
        } else {
          setSelectedRows(undefined, row, true);
        }
      }
    } else if (!overlayOpen && bounds !== undefined && isHotkey(keys.activateCell, event, details)) {
      if (row === rows && showTrailingBlankRow) {
        window.setTimeout(() => {
          const customTargetColumn = getCustomNewRowTargetColumn(col);
          void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col);
        }, 0);
      } else {
        onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row]);
        reselect(bounds, true);
      }
    } else if (gridSelection.current.range.height > 1 && isHotkey(keys.downFill, event, details)) {
      fillDown();
    } else if (gridSelection.current.range.width > 1 && isHotkey(keys.rightFill, event, details)) {
      fillRight();
    } else if (isHotkey(keys.goToNextPage, event, details)) {
      row += Math.max(1, visibleRegionRef.current.height - 4);
    } else if (isHotkey(keys.goToPreviousPage, event, details)) {
      row -= Math.max(1, visibleRegionRef.current.height - 4);
    } else if (isHotkey(keys.goToFirstCell, event, details)) {
      setOverlay(undefined);
      row = 0;
      col = 0;
    } else if (isHotkey(keys.goToLastCell, event, details)) {
      setOverlay(undefined);
      row = Number.MAX_SAFE_INTEGER;
      col = Number.MAX_SAFE_INTEGER;
    } else if (isHotkey(keys.selectToFirstCell, event, details)) {
      setOverlay(undefined);
      adjustSelection([-2, -2]);
    } else if (isHotkey(keys.selectToLastCell, event, details)) {
      setOverlay(undefined);
      adjustSelection([2, 2]);
    } else if (!overlayOpen) {
      if (isHotkey(keys.goDownCell, event, details)) {
        row += 1;
      } else if (isHotkey(keys.goUpCell, event, details)) {
        row -= 1;
      } else if (isHotkey(keys.goRightCell, event, details)) {
        col += 1;
      } else if (isHotkey(keys.goLeftCell, event, details)) {
        col -= 1;
      } else if (isHotkey(keys.goDownCellRetainSelection, event, details)) {
        row += 1;
        freeMove = true;
      } else if (isHotkey(keys.goUpCellRetainSelection, event, details)) {
        row -= 1;
        freeMove = true;
      } else if (isHotkey(keys.goRightCellRetainSelection, event, details)) {
        col += 1;
        freeMove = true;
      } else if (isHotkey(keys.goLeftCellRetainSelection, event, details)) {
        col -= 1;
        freeMove = true;
      } else if (isHotkey(keys.goToLastRow, event, details)) {
        row = rows - 1;
      } else if (isHotkey(keys.goToFirstRow, event, details)) {
        row = Number.MIN_SAFE_INTEGER;
      } else if (isHotkey(keys.goToLastColumn, event, details)) {
        col = Number.MAX_SAFE_INTEGER;
      } else if (isHotkey(keys.goToFirstColumn, event, details)) {
        col = Number.MIN_SAFE_INTEGER;
      } else if (rangeSelect === "rect" || rangeSelect === "multi-rect") {
        if (isHotkey(keys.selectGrowDown, event, details)) {
          adjustSelection([0, 1]);
        } else if (isHotkey(keys.selectGrowUp, event, details)) {
          adjustSelection([0, -1]);
        } else if (isHotkey(keys.selectGrowRight, event, details)) {
          adjustSelection([1, 0]);
        } else if (isHotkey(keys.selectGrowLeft, event, details)) {
          adjustSelection([-1, 0]);
        } else if (isHotkey(keys.selectToLastRow, event, details)) {
          adjustSelection([0, 2]);
        } else if (isHotkey(keys.selectToFirstRow, event, details)) {
          adjustSelection([0, -2]);
        } else if (isHotkey(keys.selectToLastColumn, event, details)) {
          adjustSelection([2, 0]);
        } else if (isHotkey(keys.selectToFirstColumn, event, details)) {
          adjustSelection([-2, 0]);
        }
      }
      cancelOnlyOnMove = details.didMatch;
    } else {
      if (isHotkey(keys.closeOverlay, event, details)) {
        setOverlay(undefined);
      }
      if (isHotkey(keys.acceptOverlayDown, event, details)) {
        setOverlay(undefined);
        row++;
      }
      if (isHotkey(keys.acceptOverlayUp, event, details)) {
        setOverlay(undefined);
        row--;
      }
      if (isHotkey(keys.acceptOverlayLeft, event, details)) {
        setOverlay(undefined);
        col--;
      }
      if (isHotkey(keys.acceptOverlayRight, event, details)) {
        setOverlay(undefined);
        col++;
      }
    }
    const moved = updateSelectedCell(col, row, false, freeMove);
    const didMatch = details.didMatch;
    if (didMatch && (moved || !cancelOnlyOnMove || trapFocus)) {
      cancel();
    }
    return didMatch;
  }, [overlayOpen, gridSelection, keybindings, columnSelect, rowSelect, rangeSelect, rowMarkerOffset, rows, updateSelectedCell, setGridSelection, onSelectionCleared, columnsIn.length, onDelete, trapFocus, deleteRange, setSelectedColumns, setSelectedRows, showTrailingBlankRow, getCustomNewRowTargetColumn, appendRow, onCellActivated, reselect, fillDown, fillRight, adjustSelection]);
  const onKeyDown = react.useCallback(event => {
    let cancelled = false;
    if (onKeyDownIn !== undefined) {
      onKeyDownIn({
        ...event,
        cancel: () => {
          cancelled = true;
        }
      });
    }
    if (cancelled) return;
    if (handleFixedKeybindings(event)) return;
    if (gridSelection.current === undefined) return;
    const [col, row] = gridSelection.current.cell;
    const vr = visibleRegionRef.current;
    if (!event.metaKey && !event.ctrlKey && gridSelection.current !== undefined && event.key.length === 1 && /[ -~]/g.test(event.key) && event.bounds !== undefined && (0,data_grid_types/* isReadWriteCell */.Qo)(getCellContent([col - rowMarkerOffset, Math.max(0, Math.min(row, rows - 1))]))) {
      if ((!lastRowSticky || row !== rows) && (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)) {
        return;
      }
      reselect(event.bounds, true, event.key);
      event.stopPropagation();
      event.preventDefault();
    }
  }, [onKeyDownIn, handleFixedKeybindings, gridSelection, getCellContent, rowMarkerOffset, rows, lastRowSticky, reselect]);
  const onContextMenu = react.useCallback((args, preventDefault) => {
    const adjustedCol = args.location[0] - rowMarkerOffset;
    if (args.kind === "header") {
      onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === event_args/* groupHeaderKind */.mr) {
      if (adjustedCol < 0) {
        return;
      }
      onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === "cell") {
      const [col, row] = args.location;
      onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([adjustedCol, row], {
        ...args,
        preventDefault
      });
      if (!(0,data_grid_lib/* gridSelectionHasItem */.pZ)(gridSelection, args.location)) {
        updateSelectedCell(col, row, false, false);
      }
    }
  }, [gridSelection, onCellContextMenu, onGroupHeaderContextMenu, onHeaderContextMenu, rowMarkerOffset, updateSelectedCell]);
  const onPasteInternal = react.useCallback(async e => {
    var _scrollRef$current, _canvasRef$current;
    if (!keybindings.paste) return;
    function pasteToCell(inner, target, rawValue, formatted) {
      var _rawValue$join, _rawValue$toString;
      const stringifiedRawValue = typeof rawValue === "object" ? (_rawValue$join = rawValue === null || rawValue === void 0 ? void 0 : rawValue.join("\n")) !== null && _rawValue$join !== void 0 ? _rawValue$join : "" : (_rawValue$toString = rawValue === null || rawValue === void 0 ? void 0 : rawValue.toString()) !== null && _rawValue$toString !== void 0 ? _rawValue$toString : "";
      if (!(0,data_grid_types/* isInnerOnlyCell */.rs)(inner) && (0,data_grid_types/* isReadWriteCell */.Qo)(inner) && inner.readonly !== true) {
        const coerced = coercePasteValue === null || coercePasteValue === void 0 ? void 0 : coercePasteValue(stringifiedRawValue, inner);
        if (coerced !== undefined && (0,data_grid_types/* isEditableGridCell */.T9)(coerced)) {
          if (false) {}
          return {
            location: target,
            value: coerced
          };
        }
        const r = getCellRenderer(inner);
        if (r === undefined) return undefined;
        if (r.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom) {
          var _onPaste, _ref2;
          (0,support/* assert */.hu)(inner.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom);
          const newVal = (_onPaste = (_ref2 = r).onPaste) === null || _onPaste === void 0 ? void 0 : _onPaste.call(_ref2, stringifiedRawValue, inner.data);
          if (newVal === undefined) return undefined;
          return {
            location: target,
            value: {
              ...inner,
              data: newVal
            }
          };
        } else {
          var _r$onPaste;
          const newVal = (_r$onPaste = r.onPaste) === null || _r$onPaste === void 0 ? void 0 : _r$onPaste.call(r, stringifiedRawValue, inner, {
            formatted,
            formattedString: typeof formatted === "string" ? formatted : formatted === null || formatted === void 0 ? void 0 : formatted.join("\n"),
            rawValue
          });
          if (newVal === undefined) return undefined;
          (0,support/* assert */.hu)(newVal.kind === inner.kind);
          return {
            location: target,
            value: newVal
          };
        }
      }
      return undefined;
    }
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const focused = ((_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.contains(document.activeElement)) === true || ((_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.contains(document.activeElement)) === true;
    let target;
    if (gridSelection.current !== undefined) {
      target = [gridSelection.current.range.x, gridSelection.current.range.y];
    } else if (selectedColumns.length === 1) {
      var _selectedColumns$firs;
      target = [(_selectedColumns$firs = selectedColumns.first()) !== null && _selectedColumns$firs !== void 0 ? _selectedColumns$firs : 0, 0];
    } else if (selectedRows.length === 1) {
      var _selectedRows$first;
      target = [rowMarkerOffset, (_selectedRows$first = selectedRows.first()) !== null && _selectedRows$first !== void 0 ? _selectedRows$first : 0];
    }
    if (focused && target !== undefined) {
      var _gridRef$current9;
      let data;
      let text;
      const textPlain = "text/plain";
      const textHtml = "text/html";
      if (navigator.clipboard.read !== undefined) {
        const clipboardContent = await navigator.clipboard.read();
        for (const item of clipboardContent) {
          if (item.types.includes(textHtml)) {
            const htmlBlob = await item.getType(textHtml);
            const html = await htmlBlob.text();
            const decoded = (0,copy_paste/* decodeHTML */.p)(html);
            if (decoded !== undefined) {
              data = decoded;
              break;
            }
          }
          if (item.types.includes(textPlain)) {
            text = await (await item.getType(textPlain)).text();
          }
        }
      } else if (navigator.clipboard.readText !== undefined) {
        text = await navigator.clipboard.readText();
      } else if (e !== undefined && (e === null || e === void 0 ? void 0 : e.clipboardData) !== null) {
        if (e.clipboardData.types.includes(textHtml)) {
          const html = e.clipboardData.getData(textHtml);
          data = (0,copy_paste/* decodeHTML */.p)(html);
        }
        if (data === undefined && e.clipboardData.types.includes(textPlain)) {
          text = e.clipboardData.getData(textPlain);
        }
      } else {
        return;
      }
      const [targetCol, targetRow] = target;
      const editList = [];
      do {
        if (onPaste === undefined) {
          var _ref3, _text, _data;
          const cellData = getMangledCellContent(target);
          const rawValue = (_ref3 = (_text = text) !== null && _text !== void 0 ? _text : (_data = data) === null || _data === void 0 ? void 0 : _data.map(r => r.map(cb => cb.rawValue).join("\t")).join("\t")) !== null && _ref3 !== void 0 ? _ref3 : "";
          const newVal = pasteToCell(cellData, target, rawValue, undefined);
          if (newVal !== undefined) {
            editList.push(newVal);
          }
          break;
        }
        if (data === undefined) {
          if (text === undefined) return;
          data = (0,data_editor_fns/* unquote */.I8)(text);
        }
        if (onPaste === false || typeof onPaste === "function" && (onPaste === null || onPaste === void 0 ? void 0 : onPaste([target[0] - rowMarkerOffset, target[1]], data.map(r => r.map(cb => {
          var _cb$rawValue$toString, _cb$rawValue;
          return (_cb$rawValue$toString = (_cb$rawValue = cb.rawValue) === null || _cb$rawValue === void 0 ? void 0 : _cb$rawValue.toString()) !== null && _cb$rawValue$toString !== void 0 ? _cb$rawValue$toString : "";
        })))) !== true) {
          return;
        }
        for (const [row, dataRow] of data.entries()) {
          if (row + targetRow >= rows) break;
          for (const [col, dataItem] of dataRow.entries()) {
            const index = [col + targetCol, row + targetRow];
            const [writeCol, writeRow] = index;
            if (writeCol >= mangledCols.length) continue;
            if (writeRow >= mangledRows) continue;
            const cellData = getMangledCellContent(index);
            const newVal = pasteToCell(cellData, index, dataItem.rawValue, dataItem.formatted);
            if (newVal !== undefined) {
              editList.push(newVal);
            }
          }
        }
      } while (false);
      mangledOnCellsEdited(editList);
      (_gridRef$current9 = gridRef.current) === null || _gridRef$current9 === void 0 || _gridRef$current9.damage(editList.map(c => ({
        cell: c.location
      })));
    }
  }, [coercePasteValue, getCellRenderer, getMangledCellContent, gridSelection, keybindings.paste, mangledCols.length, mangledOnCellsEdited, mangledRows, onPaste, rowMarkerOffset, rows]);
  (0,utils/* useEventListener */.OR)("paste", onPasteInternal, safeWindow, false, true);
  const onCopy = react.useCallback(async (e, ignoreFocus) => {
    var _scrollRef$current2, _canvasRef$current2;
    if (!keybindings.copy) return;
    const focused = ignoreFocus === true || ((_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.contains(document.activeElement)) === true || ((_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 ? void 0 : _canvasRef$current2.contains(document.activeElement)) === true;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const copyToClipboardWithHeaders = (cells, columnIndexes) => {
      if (!copyHeaders) {
        (0,data_editor_fns/* copyToClipboard */.vQ)(cells, columnIndexes, e);
      } else {
        const headers = columnIndexes.map(index => ({
          kind: data_grid_types/* GridCellKind.Text */.p6.Text,
          data: columnsIn[index].title,
          displayData: columnsIn[index].title,
          allowOverlay: false
        }));
        (0,data_editor_fns/* copyToClipboard */.vQ)([headers, ...cells], columnIndexes, e);
      }
    };
    if (focused && getCellsForSelection !== undefined) {
      if (gridSelection.current !== undefined) {
        let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
        if (typeof thunk !== "object") {
          thunk = await thunk();
        }
        copyToClipboardWithHeaders(thunk, range_default()(gridSelection.current.range.x - rowMarkerOffset, gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset));
      } else if (selectedRows !== undefined && selectedRows.length > 0) {
        const toCopy = [...selectedRows];
        const cells = toCopy.map(rowIndex => {
          const thunk = getCellsForSelection({
            x: rowMarkerOffset,
            y: rowIndex,
            width: columnsIn.length,
            height: 1
          }, abortControllerRef.current.signal);
          if (typeof thunk === "object") {
            return thunk[0];
          }
          return thunk().then(v => v[0]);
        });
        if (cells.some(x => x instanceof Promise)) {
          const settled = await Promise.all(cells);
          copyToClipboardWithHeaders(settled, range_default()(columnsIn.length));
        } else {
          copyToClipboardWithHeaders(cells, range_default()(columnsIn.length));
        }
      } else if (selectedColumns.length > 0) {
        const results = [];
        const cols = [];
        for (const col of selectedColumns) {
          let thunk = getCellsForSelection({
            x: col,
            y: 0,
            width: 1,
            height: rows
          }, abortControllerRef.current.signal);
          if (typeof thunk !== "object") {
            thunk = await thunk();
          }
          results.push(thunk);
          cols.push(col - rowMarkerOffset);
        }
        if (results.length === 1) {
          copyToClipboardWithHeaders(results[0], cols);
        } else {
          const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));
          copyToClipboardWithHeaders(toCopy, cols);
        }
      }
    }
  }, [columnsIn, getCellsForSelection, gridSelection, keybindings.copy, rowMarkerOffset, rows, copyHeaders]);
  (0,utils/* useEventListener */.OR)("copy", onCopy, safeWindow, false, false);
  const onCut = react.useCallback(async e => {
    var _scrollRef$current3, _canvasRef$current3;
    if (!keybindings.cut) return;
    const focused = ((_scrollRef$current3 = scrollRef.current) === null || _scrollRef$current3 === void 0 ? void 0 : _scrollRef$current3.contains(document.activeElement)) === true || ((_canvasRef$current3 = canvasRef.current) === null || _canvasRef$current3 === void 0 ? void 0 : _canvasRef$current3.contains(document.activeElement)) === true;
    if (!focused) return;
    await onCopy(e);
    if (gridSelection.current !== undefined) {
      let effectiveSelection = {
        current: {
          cell: gridSelection.current.cell,
          range: gridSelection.current.range,
          rangeStack: []
        },
        rows: data_grid_types/* CompactSelection.empty */.EV.empty(),
        columns: data_grid_types/* CompactSelection.empty */.EV.empty()
      };
      const onDeleteResult = onDelete === null || onDelete === void 0 ? void 0 : onDelete(effectiveSelection);
      if (onDeleteResult === false) return;
      effectiveSelection = onDeleteResult === true ? effectiveSelection : onDeleteResult;
      if (effectiveSelection.current === undefined) return;
      deleteRange(effectiveSelection.current.range);
    }
  }, [deleteRange, gridSelection, keybindings.cut, onCopy, onDelete]);
  (0,utils/* useEventListener */.OR)("cut", onCut, safeWindow, false, false);
  const onSearchResultsChanged = react.useCallback((results, navIndex) => {
    if (onSearchResultsChangedIn !== undefined) {
      if (rowMarkerOffset !== 0) {
        results = results.map(item => [item[0] - rowMarkerOffset, item[1]]);
      }
      onSearchResultsChangedIn(results, navIndex);
      return;
    }
    if (results.length === 0 || navIndex === -1) return;
    const [col, row] = results[navIndex];
    if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
      return;
    }
    lastSent.current = [col, row];
    updateSelectedCell(col, row, false, false);
  }, [onSearchResultsChangedIn, rowMarkerOffset, updateSelectedCell]);
  const [outCol, outRow] = (_gridSelectionOuter$c = gridSelectionOuter === null || gridSelectionOuter === void 0 || (_gridSelectionOuter$c2 = gridSelectionOuter.current) === null || _gridSelectionOuter$c2 === void 0 ? void 0 : _gridSelectionOuter$c2.cell) !== null && _gridSelectionOuter$c !== void 0 ? _gridSelectionOuter$c : [];
  const scrollToRef = react.useRef(scrollTo);
  scrollToRef.current = scrollTo;
  react.useLayoutEffect(() => {
    var _expectedExternalGrid, _expectedExternalGrid2;
    if (!hasJustScrolled.current && outCol !== undefined && outRow !== undefined && (outCol !== ((_expectedExternalGrid = expectedExternalGridSelection.current) === null || _expectedExternalGrid === void 0 || (_expectedExternalGrid = _expectedExternalGrid.current) === null || _expectedExternalGrid === void 0 ? void 0 : _expectedExternalGrid.cell[0]) || outRow !== ((_expectedExternalGrid2 = expectedExternalGridSelection.current) === null || _expectedExternalGrid2 === void 0 || (_expectedExternalGrid2 = _expectedExternalGrid2.current) === null || _expectedExternalGrid2 === void 0 ? void 0 : _expectedExternalGrid2.cell[1]))) {
      scrollToRef.current(outCol, outRow);
    }
    hasJustScrolled.current = false;
  }, [outCol, outRow]);
  const selectionOutOfBounds = gridSelection.current !== undefined && (gridSelection.current.cell[0] >= mangledCols.length || gridSelection.current.cell[1] >= mangledRows);
  react.useLayoutEffect(() => {
    if (selectionOutOfBounds) {
      setGridSelection(emptyGridSelection, false);
    }
  }, [selectionOutOfBounds, setGridSelection]);
  const disabledRows = react.useMemo(() => {
    if (showTrailingBlankRow === true && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.tint) === true) {
      return data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(mangledRows - 1);
    }
    return data_grid_types/* CompactSelection.empty */.EV.empty();
  }, [mangledRows, showTrailingBlankRow, trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.tint]);
  const mangledVerticalBorder = react.useCallback(col => {
    var _verticalBorder;
    return typeof verticalBorder === "boolean" ? verticalBorder : (_verticalBorder = verticalBorder === null || verticalBorder === void 0 ? void 0 : verticalBorder(col - rowMarkerOffset)) !== null && _verticalBorder !== void 0 ? _verticalBorder : true;
  }, [rowMarkerOffset, verticalBorder]);
  const renameGroupNode = react.useMemo(() => {
    if (renameGroup === undefined || canvasRef.current === null) return null;
    const {
      bounds,
      group
    } = renameGroup;
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    return (0,jsx_runtime.jsx)(GroupRename, {
      bounds: bounds,
      group: group,
      canvasBounds: canvasBounds,
      onClose: () => setRenameGroup(undefined),
      onFinish: newVal => {
        setRenameGroup(undefined);
        onGroupHeaderRenamed === null || onGroupHeaderRenamed === void 0 || onGroupHeaderRenamed(group, newVal);
      }
    });
  }, [onGroupHeaderRenamed, renameGroup]);
  const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + (hasRowMarkers ? 1 : 0));
  react.useImperativeHandle(forwardedRef, () => ({
    appendRow: (col, openOverlay) => appendRow(col + rowMarkerOffset, openOverlay),
    updateCells: damageList => {
      var _gridRef$current10;
      if (rowMarkerOffset !== 0) {
        damageList = damageList.map(x => ({
          cell: [x.cell[0] + rowMarkerOffset, x.cell[1]]
        }));
      }
      return (_gridRef$current10 = gridRef.current) === null || _gridRef$current10 === void 0 ? void 0 : _gridRef$current10.damage(damageList);
    },
    getBounds: (col, row) => {
      var _gridRef$current11;
      if ((canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current) === null || (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null) {
        return undefined;
      }
      if (col === undefined && row === undefined) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scale = rect.width / scrollRef.current.clientWidth;
        return {
          x: rect.x - scrollRef.current.scrollLeft * scale,
          y: rect.y - scrollRef.current.scrollTop * scale,
          width: scrollRef.current.scrollWidth * scale,
          height: scrollRef.current.scrollHeight * scale
        };
      }
      return (_gridRef$current11 = gridRef.current) === null || _gridRef$current11 === void 0 ? void 0 : _gridRef$current11.getBounds((col !== null && col !== void 0 ? col : 0) + rowMarkerOffset, row);
    },
    focus: () => {
      var _gridRef$current12;
      return (_gridRef$current12 = gridRef.current) === null || _gridRef$current12 === void 0 ? void 0 : _gridRef$current12.focus();
    },
    emit: async e => {
      switch (e) {
        case "delete":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: false,
            key: "Delete",
            keyCode: 46,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "fill-right":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: true,
            key: "r",
            keyCode: 82,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "fill-down":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: true,
            key: "d",
            keyCode: 68,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "copy":
          await onCopy(undefined, true);
          break;
        case "paste":
          await onPasteInternal();
          break;
      }
    },
    scrollTo,
    remeasureColumns: cols => {
      for (const col of cols) {
        void normalSizeColumn(col + rowMarkerOffset);
      }
    }
  }), [appendRow, normalSizeColumn, onCopy, onKeyDown, onPasteInternal, rowMarkerOffset, scrollTo]);
  const [selCol, selRow] = currentCell !== null && currentCell !== void 0 ? currentCell : [];
  const onCellFocused = react.useCallback(cell => {
    const [col, row] = cell;
    if (row === -1) {
      if (columnSelect !== "none") {
        setSelectedColumns(data_grid_types/* CompactSelection.fromSingleSelection */.EV.fromSingleSelection(col), undefined, false);
        focus();
      }
      return;
    }
    if (selCol === col && selRow === row) return;
    setCurrent({
      cell,
      range: {
        x: col,
        y: row,
        width: 1,
        height: 1
      }
    }, true, false, "keyboard-nav");
    scrollTo(col, row);
  }, [columnSelect, focus, scrollTo, selCol, selRow, setCurrent, setSelectedColumns]);
  const [isFocused, setIsFocused] = react.useState(false);
  const setIsFocusedDebounced = react.useRef(debounce_default()(val => {
    setIsFocused(val);
  }, 5));
  const onCanvasFocused = react.useCallback(() => {
    setIsFocusedDebounced.current(true);
    if (gridSelection.current === undefined && gridSelection.columns.length === 0 && gridSelection.rows.length === 0 && mouseState === undefined) {
      setCurrent({
        cell: [rowMarkerOffset, cellYOffset],
        range: {
          x: rowMarkerOffset,
          y: cellYOffset,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-select");
    }
  }, [cellYOffset, gridSelection, mouseState, rowMarkerOffset, setCurrent]);
  const onFocusOut = react.useCallback(() => {
    setIsFocusedDebounced.current(false);
  }, []);
  const [idealWidth, idealHeight] = react.useMemo(() => {
    var _experimental$scrollb;
    let h;
    const scrollbarWidth = (_experimental$scrollb = experimental === null || experimental === void 0 ? void 0 : experimental.scrollbarWidthOverride) !== null && _experimental$scrollb !== void 0 ? _experimental$scrollb : (0,utils/* getScrollBarWidth */.Iz)();
    const rowsCountWithTrailingRow = rows + (showTrailingBlankRow ? 1 : 0);
    if (typeof rowHeight === "number") {
      h = totalHeaderHeight + rowsCountWithTrailingRow * rowHeight;
    } else {
      let avg = 0;
      const toAverage = Math.min(rowsCountWithTrailingRow, 10);
      for (let i = 0; i < toAverage; i++) {
        avg += rowHeight(i);
      }
      avg = Math.floor(avg / toAverage);
      h = totalHeaderHeight + rowsCountWithTrailingRow * avg;
    }
    h += scrollbarWidth;
    const w = mangledCols.reduce((acc, x) => x.width + acc, 0) + scrollbarWidth;
    return [`${Math.min(100000, w)}px`, `${Math.min(100000, h)}px`];
  }, [mangledCols, experimental === null || experimental === void 0 ? void 0 : experimental.scrollbarWidthOverride, rowHeight, rows, showTrailingBlankRow, totalHeaderHeight]);
  return (0,jsx_runtime.jsx)(styles/* ThemeContext.Provider */.Ni.Provider, {
    value: mergedTheme,
    children: (0,jsx_runtime.jsxs)(DataEditorContainer, {
      style: (0,styles/* makeCSSStyle */.be)(mergedTheme),
      className: className,
      inWidth: width !== null && width !== void 0 ? width : idealWidth,
      inHeight: height !== null && height !== void 0 ? height : idealHeight,
      children: [(0,jsx_runtime.jsx)(data_grid_search, {
        fillHandle: fillHandle,
        drawFocusRing: drawFocusRing,
        experimental: experimental,
        fixedShadowX: fixedShadowX,
        fixedShadowY: fixedShadowY,
        getRowThemeOverride: getRowThemeOverride,
        headerIcons: headerIcons,
        imageWindowLoader: imageWindowLoader,
        initialSize: initialSize,
        isDraggable: isDraggable,
        onDragLeave: onDragLeave,
        onRowMoved: onRowMoved,
        overscrollX: overscrollX,
        overscrollY: overscrollY,
        preventDiagonalScrolling: preventDiagonalScrolling,
        rightElement: rightElement,
        rightElementProps: rightElementProps,
        smoothScrollX: smoothScrollX,
        smoothScrollY: smoothScrollY,
        className: className,
        enableGroups: enableGroups,
        onCanvasFocused: onCanvasFocused,
        onCanvasBlur: onFocusOut,
        canvasRef: canvasRef,
        onContextMenu: onContextMenu,
        theme: mergedTheme,
        cellXOffset: cellXOffset,
        cellYOffset: cellYOffset,
        accessibilityHeight: visibleRegion.height,
        onDragEnd: onDragEnd,
        columns: mangledCols,
        nonGrowWidth: nonGrowWidth,
        drawHeader: drawHeader,
        onColumnProposeMove: onColumnProposeMove,
        drawCell: drawCell,
        disabledRows: disabledRows,
        freezeColumns: mangledFreezeColumns,
        lockColumns: rowMarkerOffset,
        firstColAccessible: rowMarkerOffset === 0,
        getCellContent: getMangledCellContent,
        minColumnWidth: minColumnWidth,
        maxColumnWidth: maxColumnWidth,
        searchInputRef: searchInputRef,
        showSearch: showSearch,
        onSearchClose: onSearchClose,
        highlightRegions: highlightRegions,
        getCellsForSelection: getCellsForSelection,
        getGroupDetails: mangledGetGroupDetails,
        headerHeight: headerHeight,
        isFocused: isFocused,
        groupHeaderHeight: enableGroups ? groupHeaderHeight : 0,
        freezeTrailingRows: freezeTrailingRows + (showTrailingBlankRow && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true ? 1 : 0),
        hasAppendRow: showTrailingBlankRow,
        onColumnResize: onColumnResize,
        onColumnResizeEnd: onColumnResizeEnd,
        onColumnResizeStart: onColumnResizeStart,
        onCellFocused: onCellFocused,
        onColumnMoved: onColumnMovedImpl,
        onDragStart: onDragStartImpl,
        onHeaderMenuClick: onHeaderMenuClickInner,
        onItemHovered: onItemHoveredImpl,
        isFilling: (mouseState === null || mouseState === void 0 ? void 0 : mouseState.fillHandle) === true,
        onMouseMove: onMouseMoveImpl,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUpIn,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onDragOverCell: onDragOverCell,
        onDrop: onDrop,
        onSearchResultsChanged: onSearchResultsChanged,
        onVisibleRegionChanged: onVisibleRegionChangedImpl,
        clientSize: clientSize,
        rowHeight: rowHeight,
        searchResults: searchResults,
        searchValue: searchValue,
        onSearchValueChange: onSearchValueChange,
        rows: mangledRows,
        scrollRef: scrollRef,
        selection: gridSelection,
        translateX: visibleRegion.tx,
        translateY: visibleRegion.ty,
        verticalBorder: mangledVerticalBorder,
        gridRef: gridRef,
        getCellRenderer: getCellRenderer
      }), renameGroupNode, overlay !== undefined && (0,jsx_runtime.jsx)(react.Suspense, {
        fallback: null,
        children: (0,jsx_runtime.jsx)(DataGridOverlayEditor, {
          ...overlay,
          validateCell: validateCell,
          id: overlayID,
          getCellRenderer: getCellRenderer,
          className: (experimental === null || experimental === void 0 ? void 0 : experimental.isSubGrid) === true ? "click-outside-ignore" : undefined,
          provideEditor: provideEditor,
          imageEditorOverride: imageEditorOverride,
          onFinishEditing: onFinishEditing,
          markdownDivCreateNode: markdownDivCreateNode,
          isOutsideClick: isOutsideClick
        })
      })]
    })
  });
};
DataEditorImpl.displayName = "DataEditorImpl";
const DataEditor = react.forwardRef(DataEditorImpl);
// EXTERNAL MODULE: ./packages/core/src/cells/index.ts + 26 modules
var cells = __webpack_require__("./packages/core/src/cells/index.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/sprites.ts
const iconHead = `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">`;
const headerRowID = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}<rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${fg}"/></svg>`;
};
const headerCode = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}<rect x="2" y="2" width="16" height="16" rx="4" fill="${bg}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${fg}"/></svg>`;
};
const headerNumber = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${fg}"/>
  </svg>`;
};
const headerString = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${fg}"/>
</svg>`;
};
const headerBoolean = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
    <path
        d="M16.2222 2H3.77778C2.8 2 2 2.8 2 3.77778V16.2222C2 17.2 2.8 18 3.77778 18H16.2222C17.2 18 17.9911 17.2 17.9911 16.2222L18 3.77778C18 2.8 17.2 2 16.2222 2Z"
        fill="${bg}"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.66667 6.66669C5.73368 6.66669 4.16667 8.15907 4.16667 10C4.16667 11.841 5.73368 13.3334 7.66667 13.3334H12.3333C14.2663 13.3334 15.8333 11.841 15.8333 10C15.8333 8.15907 14.2663 6.66669 12.3333 6.66669H7.66667ZM12.5 12.5C13.8807 12.5 15 11.3807 15 10C15 8.61931 13.8807 7.50002 12.5 7.50002C11.1193 7.50002 10 8.61931 10 10C10 11.3807 11.1193 12.5 12.5 12.5Z"
        fill="${fg}"
    />
</svg>`;
};
const headerUri = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${fg}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${fg}"/>
</svg>
  `;
};
const renameIcon = props => {
  const bg = props.bgColor;
  return `${iconHead}
    <path stroke="${bg}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${bg}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${bg}"/>
  </svg>
`;
};
const headerAudioUri = headerUri;
const headerVideoUri = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${fg}"/>
</svg>`;
};
const headerEmoji = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 9.17A4.17 4.17 0 0 1 5.83 10 4.17 4.17 0 0 1 10 5.83 4.17 4.17 0 0 1 14.17 10 4.17 4.17 0 0 1 10 14.17z" fill="${fg}"/>
    <path d="M8.33 8.21a.83.83 0 1 0-.03 1.67.83.83 0 0 0 .03-1.67zm3.34 0a.83.83 0 1 0-.04 1.67.83.83 0 0 0 .04-1.67z" fill="${fg}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 13.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${fg}"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 11a5 5 0 1 1 .01-10.01A5 5 0 0 1 10 15z" fill="${fg}"/>
    <path d="M8 7.86a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2zm4 0a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2z" fill="${fg}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.53 11.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${fg}"/>
  </svg>`;
};
const headerImage = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${fg}"/>
</svg>`;
};
const headerPhone = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path fill="${fg}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${bg}"/>
  </svg>`;
};
const headerMarkdown = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${fg}"/>
  </svg>`;
};
const headerDate = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${fg}"/>
</svg>`;
};
const headerTime = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${fg}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${fg}"/>
  </svg>`;
};
const headerEmail = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${fg}"/>
</svg>`;
};
const headerReference = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${bg}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${bg}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${fg}"/>
  </svg>`;
};
const headerIfThenElse = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path fill="${fg}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${bg}"/>
</svg>`;
};
const headerSingleValue = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${fg}"/>
  </svg>`;
};
const headerLookup = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${fg}"/>
  </svg>`;
};
const headerTextTemplate = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${fg}"/>
</svg>`;
};
const headerMath = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${fg}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${fg}"/>
</svg>`;
};
const headerRollup = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${fg}"/>
  </svg>`;
};
const headerJoinStrings = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${fg}"/>
</svg>`;
};
const headerSplitString = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${fg}"/>
  </svg>`;
};
const headerGeoDistance = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${fg}"/>
</svg>`;
};
const headerArray = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${fg}"/>
</svg>`;
};
const rowOwnerOverlay = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15v1h14v-2.5c0-.87-.44-1.55-.98-2.04a6.19 6.19 0 0 0-1.9-1.14 12.1 12.1 0 0 0-2.48-.67A4 4 0 1 0 5 6a4 4 0 0 0 2.36 3.65c-.82.13-1.7.36-2.48.67-.69.28-1.37.65-1.9 1.13A2.8 2.8 0 0 0 2 13.5V15z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
  </svg>`;
};
const protectedColumnOverlay = props => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.43 6.04v-.18a3.86 3.86 0 0 0-7.72 0v.18A2.15 2.15 0 0 0 3 8.14v5.72C3 15.04 3.96 16 5.14 16H12c1.18 0 2.14-.96 2.14-2.14V8.14c0-1.03-.73-1.9-1.71-2.1zM7.86 6v-.14a.71.71 0 1 1 1.43 0V6H7.86z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
  </svg>
`;
};
const sprites = {
  headerRowID,
  headerNumber,
  headerCode,
  headerString,
  headerBoolean,
  headerAudioUri,
  headerVideoUri,
  headerEmoji,
  headerImage,
  headerUri,
  headerPhone,
  headerMarkdown,
  headerDate,
  headerTime,
  headerEmail,
  headerReference,
  headerIfThenElse,
  headerSingleValue,
  headerLookup,
  headerTextTemplate,
  headerMath,
  headerRollup,
  headerJoinStrings,
  headerSplitString,
  headerGeoDistance,
  headerArray,
  rowOwnerOverlay,
  protectedColumnOverlay,
  renameIcon
};
// EXTERNAL MODULE: ./packages/core/src/common/image-window-loader.ts
var image_window_loader = __webpack_require__("./packages/core/src/common/image-window-loader.ts");
;// CONCATENATED MODULE: ./packages/core/src/data-editor-all.tsx






const DataEditorAllImpl = (p, ref) => {
  const allSprites = react.useMemo(() => {
    return {
      ...sprites,
      ...p.headerIcons
    };
  }, [p.headerIcons]);
  const imageWindowLoader = react.useMemo(() => {
    var _p$imageWindowLoader;
    return (_p$imageWindowLoader = p.imageWindowLoader) !== null && _p$imageWindowLoader !== void 0 ? _p$imageWindowLoader : new image_window_loader/* default */.Z();
  }, [p.imageWindowLoader]);
  return (0,jsx_runtime.jsx)(DataEditor, {
    ...p,
    renderers: cells/* AllCellRenderers */.m,
    headerIcons: allSprites,
    ref: ref,
    imageWindowLoader: imageWindowLoader
  });
};
DataEditorAllImpl.displayName = "DataEditorAllImpl";
const DataEditorAll = react.forwardRef(DataEditorAllImpl);

/***/ }),

/***/ "./packages/core/src/data-editor/data-editor-keybindings.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ keybindingDefaults),
/* harmony export */   "uh": () => (/* binding */ useKeybindingsWithDefaults)
/* harmony export */ });
/* unused harmony export realizeKeybinds */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _common_browser_detect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/common/browser-detect.ts");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/common/utils.tsx");



const keybindingDefaults = {
  downFill: false,
  rightFill: false,
  clear: true,
  closeOverlay: true,
  acceptOverlayDown: true,
  acceptOverlayUp: true,
  acceptOverlayLeft: true,
  acceptOverlayRight: true,
  copy: true,
  paste: true,
  cut: true,
  search: false,
  delete: true,
  activateCell: true,
  scrollToSelectedCell: true,
  goToFirstCell: true,
  goToFirstColumn: true,
  goToFirstRow: true,
  goToLastCell: true,
  goToLastColumn: true,
  goToLastRow: true,
  goToNextPage: true,
  goToPreviousPage: true,
  selectToFirstCell: true,
  selectToFirstColumn: true,
  selectToFirstRow: true,
  selectToLastCell: true,
  selectToLastColumn: true,
  selectToLastRow: true,
  selectAll: true,
  selectRow: true,
  selectColumn: true,
  goUpCell: true,
  goRightCell: true,
  goDownCell: true,
  goLeftCell: true,
  goUpCellRetainSelection: true,
  goRightCellRetainSelection: true,
  goDownCellRetainSelection: true,
  goLeftCellRetainSelection: true,
  selectGrowUp: true,
  selectGrowRight: true,
  selectGrowDown: true,
  selectGrowLeft: true
};
function realizeKeybind(keybind, defaultVal) {
  if (keybind === true) return defaultVal;
  if (keybind === false) return "";
  return keybind;
}
function realizeKeybinds(keybinds) {
  const isOSX = _common_browser_detect_js__WEBPACK_IMPORTED_MODULE_1__/* .browserIsOSX.value */ .FR.value;
  return {
    activateCell: realizeKeybind(keybinds.activateCell, " |Enter|shift+Enter"),
    clear: realizeKeybind(keybinds.clear, "any+Escape"),
    closeOverlay: realizeKeybind(keybinds.closeOverlay, "any+Escape"),
    acceptOverlayDown: realizeKeybind(keybinds.acceptOverlayDown, "Enter"),
    acceptOverlayUp: realizeKeybind(keybinds.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: realizeKeybind(keybinds.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: realizeKeybind(keybinds.acceptOverlayRight, "Tab"),
    copy: keybinds.copy,
    cut: keybinds.cut,
    delete: realizeKeybind(keybinds.delete, isOSX ? "Backspace|Delete" : "Delete"),
    downFill: realizeKeybind(keybinds.downFill, "primary+_68"),
    scrollToSelectedCell: realizeKeybind(keybinds.scrollToSelectedCell, "primary+Enter"),
    goDownCell: realizeKeybind(keybinds.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: realizeKeybind(keybinds.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: realizeKeybind(keybinds.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: realizeKeybind(keybinds.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: realizeKeybind(keybinds.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: realizeKeybind(keybinds.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: realizeKeybind(keybinds.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: realizeKeybind(keybinds.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: realizeKeybind(keybinds.goToFirstCell, "primary+Home"),
    goToFirstColumn: realizeKeybind(keybinds.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: realizeKeybind(keybinds.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: realizeKeybind(keybinds.goToLastCell, "primary+End"),
    goToLastColumn: realizeKeybind(keybinds.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: realizeKeybind(keybinds.goToLastRow, "primary+ArrowDown"),
    goToNextPage: realizeKeybind(keybinds.goToNextPage, "PageDown"),
    goToPreviousPage: realizeKeybind(keybinds.goToPreviousPage, "PageUp"),
    paste: keybinds.paste,
    rightFill: realizeKeybind(keybinds.rightFill, "primary+_82"),
    search: realizeKeybind(keybinds.search, "primary+f"),
    selectAll: realizeKeybind(keybinds.selectAll, "primary+a"),
    selectColumn: realizeKeybind(keybinds.selectColumn, "ctrl+ "),
    selectGrowDown: realizeKeybind(keybinds.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: realizeKeybind(keybinds.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: realizeKeybind(keybinds.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: realizeKeybind(keybinds.selectGrowUp, "shift+ArrowUp"),
    selectRow: realizeKeybind(keybinds.selectRow, "shift+ "),
    selectToFirstCell: realizeKeybind(keybinds.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: realizeKeybind(keybinds.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: realizeKeybind(keybinds.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: realizeKeybind(keybinds.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: realizeKeybind(keybinds.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: realizeKeybind(keybinds.selectToLastRow, "primary+shift+ArrowDown")
  };
}
function useKeybindingsWithDefaults(keybindingsIn) {
  const keys = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .useDeepMemo */ .vE)(keybindingsIn);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    var _ref, _keys$goToNextPage, _ref2, _keys$goToPreviousPag, _ref3, _keys$goToFirstCell, _ref4, _keys$goToLastCell, _ref5, _keys$selectToFirstCe, _ref6, _keys$selectToLastCel;
    if (keys === undefined) return realizeKeybinds(keybindingDefaults);
    const withBackCompatApplied = {
      ...keys,
      goToNextPage: (_ref = (_keys$goToNextPage = keys === null || keys === void 0 ? void 0 : keys.goToNextPage) !== null && _keys$goToNextPage !== void 0 ? _keys$goToNextPage : keys === null || keys === void 0 ? void 0 : keys.pageDown) !== null && _ref !== void 0 ? _ref : keybindingDefaults.goToNextPage,
      goToPreviousPage: (_ref2 = (_keys$goToPreviousPag = keys === null || keys === void 0 ? void 0 : keys.goToPreviousPage) !== null && _keys$goToPreviousPag !== void 0 ? _keys$goToPreviousPag : keys === null || keys === void 0 ? void 0 : keys.pageUp) !== null && _ref2 !== void 0 ? _ref2 : keybindingDefaults.goToPreviousPage,
      goToFirstCell: (_ref3 = (_keys$goToFirstCell = keys === null || keys === void 0 ? void 0 : keys.goToFirstCell) !== null && _keys$goToFirstCell !== void 0 ? _keys$goToFirstCell : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref3 !== void 0 ? _ref3 : keybindingDefaults.goToFirstCell,
      goToLastCell: (_ref4 = (_keys$goToLastCell = keys === null || keys === void 0 ? void 0 : keys.goToLastCell) !== null && _keys$goToLastCell !== void 0 ? _keys$goToLastCell : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref4 !== void 0 ? _ref4 : keybindingDefaults.goToLastCell,
      selectToFirstCell: (_ref5 = (_keys$selectToFirstCe = keys === null || keys === void 0 ? void 0 : keys.selectToFirstCell) !== null && _keys$selectToFirstCe !== void 0 ? _keys$selectToFirstCe : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref5 !== void 0 ? _ref5 : keybindingDefaults.selectToFirstCell,
      selectToLastCell: (_ref6 = (_keys$selectToLastCel = keys === null || keys === void 0 ? void 0 : keys.selectToLastCell) !== null && _keys$selectToLastCel !== void 0 ? _keys$selectToLastCel : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref6 !== void 0 ? _ref6 : keybindingDefaults.selectToLastCell
    };
    return realizeKeybinds({
      ...keybindingDefaults,
      ...withBackCompatApplied
    });
  }, [keys]);
}

/***/ }),

/***/ "./packages/core/src/internal/click-outside-container/click-outside-container.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ClickOutsideContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");


class ClickOutsideContainer extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor() {
    super(...arguments);
    this.wrapperRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    this.clickOutside = event => {
      if (this.props.isOutsideClick && !this.props.isOutsideClick(event)) {
        return;
      }
      if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target)) {
        let node = event.target;
        while (node !== null) {
          if (node.classList.contains("click-outside-ignore")) {
            return;
          }
          node = node.parentElement;
        }
        this.props.onClickOutside();
      }
    };
  }
  componentDidMount() {
    document.addEventListener("touchend", this.clickOutside, true);
    document.addEventListener("mousedown", this.clickOutside, true);
    document.addEventListener("contextmenu", this.clickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener("touchend", this.clickOutside, true);
    document.removeEventListener("mousedown", this.clickOutside, true);
    document.removeEventListener("contextmenu", this.clickOutside, true);
  }
  render() {
    const {
      onClickOutside,
      isOutsideClick,
      ...rest
    } = this.props;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...rest,
      ref: this.wrapperRef,
      children: this.props.children
    });
  }
}
ClickOutsideContainer.displayName = "ClickOutsideContainer";

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/group-rename.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".r1fzhvm4{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;border:none;outline:none;background-color:var(--gdg-bg-header-has-focus);border-radius:9px;padding:0 8px;box-shadow:0 0 0 1px var(--gdg-border-color);color:var(--gdg-text-group-header);min-height:var(--r1fzhvm4-0);font:var(--gdg-header-font-style) var(--gdg-font-family);}\n.c181oggi{padding:0 8px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:var(--gdg-bg-header);}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3IvZ3JvdXAtcmVuYW1lLnRzeCJdLCJuYW1lcyI6WyIucjFmemh2bTQiLCIuYzE4MW9nZ2kiXSwibWFwcGluZ3MiOiJBQUtvQkE7QUE2QkxDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3IvZ3JvdXAtcmVuYW1lLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBsaW5hcmlhL2NvcmVcIjtcbmltcG9ydCBDbGlja091dHNpZGVDb250YWluZXIgZnJvbSBcIi4uL2ludGVybmFsL2NsaWNrLW91dHNpZGUtY29udGFpbmVyL2NsaWNrLW91dHNpZGUtY29udGFpbmVyLmpzXCI7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgUmVuYW1lSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICAgZmxleC1ncm93OiAxO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1oZWFkZXItaGFzLWZvY3VzKTtcbiAgICBib3JkZXItcmFkaXVzOiA5cHg7XG4gICAgcGFkZGluZzogMCA4cHg7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLWdkZy1ib3JkZXItY29sb3IpO1xuICAgIGNvbG9yOiB2YXIoLS1nZGctdGV4dC1ncm91cC1oZWFkZXIpO1xuICAgIG1pbi1oZWlnaHQ6ICR7cCA9PiBNYXRoLm1heCgxNiwgcC50YXJnZXRIZWlnaHQgLSAxMCl9cHg7XG4gICAgZm9udDogdmFyKC0tZ2RnLWhlYWRlci1mb250LXN0eWxlKSB2YXIoLS1nZGctZm9udC1mYW1pbHkpO1xuYDtcbmV4cG9ydCBjb25zdCBHcm91cFJlbmFtZSA9IHAgPT4ge1xuICBjb25zdCB7XG4gICAgYm91bmRzLFxuICAgIGdyb3VwLFxuICAgIG9uQ2xvc2UsXG4gICAgY2FudmFzQm91bmRzLFxuICAgIG9uRmluaXNoXG4gIH0gPSBwO1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKGdyb3VwKTtcbiAgcmV0dXJuIF9qc3goQ2xpY2tPdXRzaWRlQ29udGFpbmVyLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICBsZWZ0OiBib3VuZHMueCAtIGNhbnZhc0JvdW5kcy5sZWZ0ICsgMSxcbiAgICAgIHRvcDogYm91bmRzLnkgLSBjYW52YXNCb3VuZHMudG9wLFxuICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCAtIDIsXG4gICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHRcbiAgICB9LFxuICAgIGNsYXNzTmFtZTogY3NzYFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctaGVhZGVyKTtcbiAgICAgICAgICAgIGAsXG4gICAgb25DbGlja091dHNpZGU6IG9uQ2xvc2UsXG4gICAgY2hpbGRyZW46IF9qc3goUmVuYW1lSW5wdXQsIHtcbiAgICAgIHRhcmdldEhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIFwiZGF0YS10ZXN0aWRcIjogXCJncm91cC1yZW5hbWUtaW5wdXRcIixcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIG9uQmx1cjogb25DbG9zZSxcbiAgICAgIG9uRm9jdXM6IGUgPT4gZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdmFsdWUubGVuZ3RoKSxcbiAgICAgIG9uQ2hhbmdlOiBlID0+IHNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgIG9uS2V5RG93bjogZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgb25GaW5pc2godmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXV0b0ZvY3VzOiB0cnVlXG4gICAgfSlcbiAgfSk7XG59O1xuR3JvdXBSZW5hbWUuZGlzcGxheU5hbWUgPSBcIkdyb3VwUmVuYW1lXCI7Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/data-editor/group-rename.tsx","webpack://./packages/core/src/data-editor/group-rename.tsx"],"names":[".r1fzhvm4",".c181oggi"],"mappings":"AAKoBA,UAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,WAAAA,CAAAA,YAAAA,CAAAA,+CAAAA,CAAAA,iBAAAA,CAAAA,aAAAA,CAAAA,4CAAAA,CAAAA,kCAAAA,CAAAA,4BAAAA,CAAAA,wDAAAA,CAAAA;AA6BLC,UAAAA,aAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,qCAAAA,CAAAA;AChCf,u5FAAu5F","sourcesContent":["import React from \"react\";\nimport { styled } from \"@linaria/react\";\nimport { css } from \"@linaria/core\";\nimport ClickOutsideContainer from \"../internal/click-outside-container/click-outside-container.js\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nconst RenameInput = styled.input`\n    flex-grow: 1;\n    border: none;\n    outline: none;\n    background-color: var(--gdg-bg-header-has-focus);\n    border-radius: 9px;\n    padding: 0 8px;\n    box-shadow: 0 0 0 1px var(--gdg-border-color);\n    color: var(--gdg-text-group-header);\n    min-height: ${p => Math.max(16, p.targetHeight - 10)}px;\n    font: var(--gdg-header-font-style) var(--gdg-font-family);\n`;\nexport const GroupRename = p => {\n  const {\n    bounds,\n    group,\n    onClose,\n    canvasBounds,\n    onFinish\n  } = p;\n  const [value, setValue] = React.useState(group);\n  return _jsx(ClickOutsideContainer, {\n    style: {\n      position: \"absolute\",\n      left: bounds.x - canvasBounds.left + 1,\n      top: bounds.y - canvasBounds.top,\n      width: bounds.width - 2,\n      height: bounds.height\n    },\n    className: css`\n                padding: 0 8px;\n                display: flex;\n                align-items: center;\n                background-color: var(--gdg-bg-header);\n            `,\n    onClickOutside: onClose,\n    children: _jsx(RenameInput, {\n      targetHeight: bounds.height,\n      \"data-testid\": \"group-rename-input\",\n      value: value,\n      onBlur: onClose,\n      onFocus: e => e.target.setSelectionRange(0, value.length),\n      onChange: e => setValue(e.target.value),\n      onKeyDown: e => {\n        if (e.key === \"Enter\") {\n          onFinish(value);\n        } else if (e.key === \"Escape\") {\n          onClose();\n        }\n      },\n      autoFocus: true\n    })\n  });\n};\nGroupRename.displayName = \"GroupRename\";",".r1fzhvm4{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;border:none;outline:none;background-color:var(--gdg-bg-header-has-focus);border-radius:9px;padding:0 8px;box-shadow:0 0 0 1px var(--gdg-border-color);color:var(--gdg-text-group-header);min-height:var(--r1fzhvm4-0);font:var(--gdg-header-font-style) var(--gdg-font-family);}\n.c181oggi{padding:0 8px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:var(--gdg-bg-header);}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3IvZ3JvdXAtcmVuYW1lLnRzeCJdLCJuYW1lcyI6WyIucjFmemh2bTQiLCIuYzE4MW9nZ2kiXSwibWFwcGluZ3MiOiJBQUtvQkE7QUE2QkxDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3IvZ3JvdXAtcmVuYW1lLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBsaW5hcmlhL2NvcmVcIjtcbmltcG9ydCBDbGlja091dHNpZGVDb250YWluZXIgZnJvbSBcIi4uL2ludGVybmFsL2NsaWNrLW91dHNpZGUtY29udGFpbmVyL2NsaWNrLW91dHNpZGUtY29udGFpbmVyLmpzXCI7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgUmVuYW1lSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICAgZmxleC1ncm93OiAxO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1oZWFkZXItaGFzLWZvY3VzKTtcbiAgICBib3JkZXItcmFkaXVzOiA5cHg7XG4gICAgcGFkZGluZzogMCA4cHg7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLWdkZy1ib3JkZXItY29sb3IpO1xuICAgIGNvbG9yOiB2YXIoLS1nZGctdGV4dC1ncm91cC1oZWFkZXIpO1xuICAgIG1pbi1oZWlnaHQ6ICR7cCA9PiBNYXRoLm1heCgxNiwgcC50YXJnZXRIZWlnaHQgLSAxMCl9cHg7XG4gICAgZm9udDogdmFyKC0tZ2RnLWhlYWRlci1mb250LXN0eWxlKSB2YXIoLS1nZGctZm9udC1mYW1pbHkpO1xuYDtcbmV4cG9ydCBjb25zdCBHcm91cFJlbmFtZSA9IHAgPT4ge1xuICBjb25zdCB7XG4gICAgYm91bmRzLFxuICAgIGdyb3VwLFxuICAgIG9uQ2xvc2UsXG4gICAgY2FudmFzQm91bmRzLFxuICAgIG9uRmluaXNoXG4gIH0gPSBwO1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKGdyb3VwKTtcbiAgcmV0dXJuIF9qc3goQ2xpY2tPdXRzaWRlQ29udGFpbmVyLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICBsZWZ0OiBib3VuZHMueCAtIGNhbnZhc0JvdW5kcy5sZWZ0ICsgMSxcbiAgICAgIHRvcDogYm91bmRzLnkgLSBjYW52YXNCb3VuZHMudG9wLFxuICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCAtIDIsXG4gICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHRcbiAgICB9LFxuICAgIGNsYXNzTmFtZTogY3NzYFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctaGVhZGVyKTtcbiAgICAgICAgICAgIGAsXG4gICAgb25DbGlja091dHNpZGU6IG9uQ2xvc2UsXG4gICAgY2hpbGRyZW46IF9qc3goUmVuYW1lSW5wdXQsIHtcbiAgICAgIHRhcmdldEhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIFwiZGF0YS10ZXN0aWRcIjogXCJncm91cC1yZW5hbWUtaW5wdXRcIixcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIG9uQmx1cjogb25DbG9zZSxcbiAgICAgIG9uRm9jdXM6IGUgPT4gZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdmFsdWUubGVuZ3RoKSxcbiAgICAgIG9uQ2hhbmdlOiBlID0+IHNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgIG9uS2V5RG93bjogZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgb25GaW5pc2godmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXV0b0ZvY3VzOiB0cnVlXG4gICAgfSlcbiAgfSk7XG59O1xuR3JvdXBSZW5hbWUuZGlzcGxheU5hbWUgPSBcIkdyb3VwUmVuYW1lXCI7Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-editor-container/data-grid-container.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".w2q57ts{position:relative;min-width:10px;min-height:10px;max-width:100%;max-height:100%;width:var(--w2q57ts-0);height:var(--w2q57ts-1);overflow:hidden;overflow:clip;direction:ltr;}.w2q57ts > :first-child{position:absolute;left:0;top:0;width:100%;height:100%;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1lZGl0b3ItY29udGFpbmVyL2RhdGEtZ3JpZC1jb250YWluZXIudHN4Il0sIm5hbWVzIjpbIi53MnE1N3RzIl0sIm1hcHBpbmdzIjoiQUFPZ0JBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1lZGl0b3ItY29udGFpbmVyL2RhdGEtZ3JpZC1jb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiB0b0Nzcyh4KSB7XG4gIGlmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHg7XG4gIHJldHVybiBgJHt4fXB4YDtcbn1cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIG1pbi13aWR0aDogMTBweDtcbiAgICBtaW4taGVpZ2h0OiAxMHB4O1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuXG4gICAgd2lkdGg6ICR7cCA9PiBwLmlubmVyV2lkdGh9O1xuICAgIGhlaWdodDogJHtwID0+IHAuaW5uZXJIZWlnaHR9O1xuXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvdmVyZmxvdzogY2xpcDtcblxuICAgIGRpcmVjdGlvbjogbHRyO1xuXG4gICAgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IERhdGFFZGl0b3JDb250YWluZXIgPSBwID0+IHtcbiAgY29uc3Qge1xuICAgIGluV2lkdGgsXG4gICAgaW5IZWlnaHQsXG4gICAgY2hpbGRyZW4sXG4gICAgLi4ucmVzdFxuICB9ID0gcDtcbiAgcmV0dXJuIF9qc3goV3JhcHBlciwge1xuICAgIGlubmVySGVpZ2h0OiB0b0NzcyhpbkhlaWdodCksXG4gICAgaW5uZXJXaWR0aDogdG9Dc3MoaW5XaWR0aCksXG4gICAgLi4ucmVzdCxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgfSk7XG59O1xuRGF0YUVkaXRvckNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiRGF0YUVkaXRvckNvbnRhaW5lclwiOyJdfQ==*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-editor-container/data-grid-container.tsx","webpack://./packages/core/src/internal/data-editor-container/data-grid-container.tsx"],"names":[".w2q57ts"],"mappings":"AAOgBA,SAAAA,iBAAAA,CAAAA,cAAAA,CAAAA,eAAAA,CAAAA,cAAAA,CAAAA,eAAAA,CAAAA,sBAAAA,CAAAA,uBAAAA,CAAAA,eAAAA,CAAAA,aAAAA,CAAAA,aAAAA,CAAAA,CAAAA,wBAAAA,iBAAAA,CAAAA,MAAAA,CAAAA,KAAAA,CAAAA,UAAAA,CAAAA,WAAAA,CAAAA;ACNhB,+wDAA+wD","sourcesContent":["import { styled } from \"@linaria/react\";\nimport * as React from \"react\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nfunction toCss(x) {\n  if (typeof x === \"string\") return x;\n  return `${x}px`;\n}\nconst Wrapper = styled.div`\n    position: relative;\n\n    min-width: 10px;\n    min-height: 10px;\n    max-width: 100%;\n    max-height: 100%;\n\n    width: ${p => p.innerWidth};\n    height: ${p => p.innerHeight};\n\n    overflow: hidden;\n    overflow: clip;\n\n    direction: ltr;\n\n    > :first-child {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n    }\n`;\nexport const DataEditorContainer = p => {\n  const {\n    inWidth,\n    inHeight,\n    children,\n    ...rest\n  } = p;\n  return _jsx(Wrapper, {\n    innerHeight: toCss(inHeight),\n    innerWidth: toCss(inWidth),\n    ...rest,\n    children: children\n  });\n};\nDataEditorContainer.displayName = \"DataEditorContainer\";",".w2q57ts{position:relative;min-width:10px;min-height:10px;max-width:100%;max-height:100%;width:var(--w2q57ts-0);height:var(--w2q57ts-1);overflow:hidden;overflow:clip;direction:ltr;}.w2q57ts > :first-child{position:absolute;left:0;top:0;width:100%;height:100%;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1lZGl0b3ItY29udGFpbmVyL2RhdGEtZ3JpZC1jb250YWluZXIudHN4Il0sIm5hbWVzIjpbIi53MnE1N3RzIl0sIm1hcHBpbmdzIjoiQUFPZ0JBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1lZGl0b3ItY29udGFpbmVyL2RhdGEtZ3JpZC1jb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiB0b0Nzcyh4KSB7XG4gIGlmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHg7XG4gIHJldHVybiBgJHt4fXB4YDtcbn1cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIG1pbi13aWR0aDogMTBweDtcbiAgICBtaW4taGVpZ2h0OiAxMHB4O1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuXG4gICAgd2lkdGg6ICR7cCA9PiBwLmlubmVyV2lkdGh9O1xuICAgIGhlaWdodDogJHtwID0+IHAuaW5uZXJIZWlnaHR9O1xuXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvdmVyZmxvdzogY2xpcDtcblxuICAgIGRpcmVjdGlvbjogbHRyO1xuXG4gICAgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IERhdGFFZGl0b3JDb250YWluZXIgPSBwID0+IHtcbiAgY29uc3Qge1xuICAgIGluV2lkdGgsXG4gICAgaW5IZWlnaHQsXG4gICAgY2hpbGRyZW4sXG4gICAgLi4ucmVzdFxuICB9ID0gcDtcbiAgcmV0dXJuIF9qc3goV3JhcHBlciwge1xuICAgIGlubmVySGVpZ2h0OiB0b0NzcyhpbkhlaWdodCksXG4gICAgaW5uZXJXaWR0aDogdG9Dc3MoaW5XaWR0aCksXG4gICAgLi4ucmVzdCxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgfSk7XG59O1xuRGF0YUVkaXRvckNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiRGF0YUVkaXRvckNvbnRhaW5lclwiOyJdfQ==*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".slyseh9{position:absolute;top:4px;right:20px;background-color:var(--gdg-bg-cell);color:var(--gdg-text-dark);padding:8px;border:1px solid var(--gdg-border-color);border-radius:6px;font-size:var(--gdg-editor-font-size);-webkit-animation:gdg-search-fadein-slyseh9 0.15s forwards;animation:gdg-search-fadein-slyseh9 0.15s forwards;}.slyseh9.out{-webkit-animation:gdg-search-fadeout-slyseh9 0.15s forwards;animation:gdg-search-fadeout-slyseh9 0.15s forwards;}.slyseh9 .gdg-search-bar-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.slyseh9 .gdg-search-status{padding-top:4px;font-size:11px;}.slyseh9 .gdg-search-progress{position:absolute;height:4px;left:0;bottom:0;background-color:var(--gdg-text-light);}.slyseh9 input{width:220px;color:var(--gdg-textDark);background-color:var(--gdg-bg-cell);border:none;border-width:0;outline:none;}.slyseh9 button{width:24px;height:24px;padding:0;border:none;outline:none;background:none;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;color:var(--gdg-text-medium);}.slyseh9 button:hover{color:var(--gdg-text-dark);}.slyseh9 button .button-icon{width:16px;height:16px;}.slyseh9 button:disabled{opacity:0.4;pointer-events:none;}@-webkit-keyframes gdg-search-fadeout-slyseh9{from{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}to{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}}@keyframes gdg-search-fadeout-slyseh9{from{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}to{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}}@-webkit-keyframes gdg-search-fadein-slyseh9{from{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}to{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}}@keyframes gdg-search-fadein-slyseh9{from{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}to{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLXNlYXJjaC9kYXRhLWdyaWQtc2VhcmNoLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIuc2x5c2VoOSJdLCJtYXBwaW5ncyI6IkFBQzZCQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1zZWFyY2gvZGF0YS1ncmlkLXNlYXJjaC1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBTZWFyY2hXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctY2VsbCk7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWdkZy1ib3JkZXItY29sb3IpO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcblxuICAgIGZvbnQtc2l6ZTogdmFyKC0tZ2RnLWVkaXRvci1mb250LXNpemUpO1xuXG4gICAgJi5vdXQge1xuICAgICAgICBhbmltYXRpb246IGdkZy1zZWFyY2gtZmFkZW91dCAwLjE1cyBmb3J3YXJkcztcbiAgICB9XG4gICAgYW5pbWF0aW9uOiBnZGctc2VhcmNoLWZhZGVpbiAwLjE1cyBmb3J3YXJkcztcblxuICAgIC5nZGctc2VhcmNoLWJhci1pbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuXG4gICAgLmdkZy1zZWFyY2gtc3RhdHVzIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDRweDtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cblxuICAgIC5nZGctc2VhcmNoLXByb2dyZXNzIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy10ZXh0LWxpZ2h0KTtcbiAgICB9XG5cbiAgICBpbnB1dCB7XG4gICAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0RGFyayk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1jZWxsKTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgcGFkZGluZzogMDtcblxuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LW1lZGl1bSk7XG5cbiAgICAgICAgOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1nZGctdGV4dC1kYXJrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5idXR0b24taWNvbiB7XG4gICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpkaXNhYmxlZCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgZ2RnLXNlYXJjaC1mYWRlb3V0IHtcbiAgICAgICAgZnJvbSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQwMHB4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgZ2RnLXNlYXJjaC1mYWRlaW4ge1xuICAgICAgICBmcm9tIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MDBweCk7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB9XG4gICAgfVxuYDsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-search/data-grid-search-style.tsx","webpack://./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx"],"names":[".slyseh9"],"mappings":"AAC6BA,SAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,UAAAA,CAAAA,mCAAAA,CAAAA,0BAAAA,CAAAA,WAAAA,CAAAA,wCAAAA,CAAAA,iBAAAA,CAAAA,qCAAAA,CAAAA,0DAAAA,CAAAA,kDAAAA,CAAAA,CAAAA,aAAAA,2DAAAA,CAAAA,mDAAAA,CAAAA,CAAAA,+BAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,CAAAA,4BAAAA,eAAAA,CAAAA,cAAAA,CAAAA,CAAAA,8BAAAA,iBAAAA,CAAAA,UAAAA,CAAAA,MAAAA,CAAAA,QAAAA,CAAAA,sCAAAA,CAAAA,CAAAA,eAAAA,WAAAA,CAAAA,yBAAAA,CAAAA,mCAAAA,CAAAA,WAAAA,CAAAA,cAAAA,CAAAA,YAAAA,CAAAA,CAAAA,gBAAAA,UAAAA,CAAAA,WAAAA,CAAAA,SAAAA,CAAAA,WAAAA,CAAAA,YAAAA,CAAAA,eAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,cAAAA,CAAAA,4BAAAA,CAAAA,CAAAA,sBAAAA,0BAAAA,CAAAA,CAAAA,6BAAAA,UAAAA,CAAAA,WAAAA,CAAAA,CAAAA,yBAAAA,WAAAA,CAAAA,mBAAAA,CAAAA,CAAAA,8CAAAA,KAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,CAAAA,GAAAA,mCAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,CAAAA,CAAAA,sCAAAA,KAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,CAAAA,GAAAA,mCAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,CAAAA,CAAAA,6CAAAA,KAAAA,mCAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,CAAAA,GAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,CAAAA,CAAAA,qCAAAA,KAAAA,mCAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,CAAAA,GAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,CAAAA;ACA7B,mjGAAmjG","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const SearchWrapper = styled.div`\n    position: absolute;\n    top: 4px;\n    right: 20px;\n\n    background-color: var(--gdg-bg-cell);\n    color: var(--gdg-text-dark);\n\n    padding: 8px;\n    border: 1px solid var(--gdg-border-color);\n    border-radius: 6px;\n\n    font-size: var(--gdg-editor-font-size);\n\n    &.out {\n        animation: gdg-search-fadeout 0.15s forwards;\n    }\n    animation: gdg-search-fadein 0.15s forwards;\n\n    .gdg-search-bar-inner {\n        display: flex;\n    }\n\n    .gdg-search-status {\n        padding-top: 4px;\n        font-size: 11px;\n    }\n\n    .gdg-search-progress {\n        position: absolute;\n        height: 4px;\n        left: 0;\n        bottom: 0;\n\n        background-color: var(--gdg-text-light);\n    }\n\n    input {\n        width: 220px;\n        color: var(--gdg-textDark);\n        background-color: var(--gdg-bg-cell);\n        border: none;\n        border-width: 0;\n        outline: none;\n    }\n\n    button {\n        width: 24px;\n        height: 24px;\n        padding: 0;\n\n        border: none;\n        outline: none;\n        background: none;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        color: var(--gdg-text-medium);\n\n        :hover {\n            color: var(--gdg-text-dark);\n        }\n\n        .button-icon {\n            width: 16px;\n            height: 16px;\n        }\n\n        :disabled {\n            opacity: 0.4;\n            pointer-events: none;\n        }\n    }\n\n    @keyframes gdg-search-fadeout {\n        from {\n            transform: translateX(0);\n        }\n        to {\n            transform: translateX(400px);\n        }\n    }\n\n    @keyframes gdg-search-fadein {\n        from {\n            transform: translateX(400px);\n        }\n        to {\n            transform: translateX(0);\n        }\n    }\n`;",".slyseh9{position:absolute;top:4px;right:20px;background-color:var(--gdg-bg-cell);color:var(--gdg-text-dark);padding:8px;border:1px solid var(--gdg-border-color);border-radius:6px;font-size:var(--gdg-editor-font-size);-webkit-animation:gdg-search-fadein-slyseh9 0.15s forwards;animation:gdg-search-fadein-slyseh9 0.15s forwards;}.slyseh9.out{-webkit-animation:gdg-search-fadeout-slyseh9 0.15s forwards;animation:gdg-search-fadeout-slyseh9 0.15s forwards;}.slyseh9 .gdg-search-bar-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.slyseh9 .gdg-search-status{padding-top:4px;font-size:11px;}.slyseh9 .gdg-search-progress{position:absolute;height:4px;left:0;bottom:0;background-color:var(--gdg-text-light);}.slyseh9 input{width:220px;color:var(--gdg-textDark);background-color:var(--gdg-bg-cell);border:none;border-width:0;outline:none;}.slyseh9 button{width:24px;height:24px;padding:0;border:none;outline:none;background:none;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;color:var(--gdg-text-medium);}.slyseh9 button:hover{color:var(--gdg-text-dark);}.slyseh9 button .button-icon{width:16px;height:16px;}.slyseh9 button:disabled{opacity:0.4;pointer-events:none;}@-webkit-keyframes gdg-search-fadeout-slyseh9{from{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}to{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}}@keyframes gdg-search-fadeout-slyseh9{from{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}to{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}}@-webkit-keyframes gdg-search-fadein-slyseh9{from{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}to{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}}@keyframes gdg-search-fadein-slyseh9{from{-webkit-transform:translateX(400px);-ms-transform:translateX(400px);transform:translateX(400px);}to{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLXNlYXJjaC9kYXRhLWdyaWQtc2VhcmNoLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIuc2x5c2VoOSJdLCJtYXBwaW5ncyI6IkFBQzZCQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1zZWFyY2gvZGF0YS1ncmlkLXNlYXJjaC1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBTZWFyY2hXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctY2VsbCk7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWdkZy1ib3JkZXItY29sb3IpO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcblxuICAgIGZvbnQtc2l6ZTogdmFyKC0tZ2RnLWVkaXRvci1mb250LXNpemUpO1xuXG4gICAgJi5vdXQge1xuICAgICAgICBhbmltYXRpb246IGdkZy1zZWFyY2gtZmFkZW91dCAwLjE1cyBmb3J3YXJkcztcbiAgICB9XG4gICAgYW5pbWF0aW9uOiBnZGctc2VhcmNoLWZhZGVpbiAwLjE1cyBmb3J3YXJkcztcblxuICAgIC5nZGctc2VhcmNoLWJhci1pbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuXG4gICAgLmdkZy1zZWFyY2gtc3RhdHVzIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDRweDtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cblxuICAgIC5nZGctc2VhcmNoLXByb2dyZXNzIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy10ZXh0LWxpZ2h0KTtcbiAgICB9XG5cbiAgICBpbnB1dCB7XG4gICAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0RGFyayk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1jZWxsKTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgcGFkZGluZzogMDtcblxuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LW1lZGl1bSk7XG5cbiAgICAgICAgOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1nZGctdGV4dC1kYXJrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5idXR0b24taWNvbiB7XG4gICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpkaXNhYmxlZCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgZ2RnLXNlYXJjaC1mYWRlb3V0IHtcbiAgICAgICAgZnJvbSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQwMHB4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgZ2RnLXNlYXJjaC1mYWRlaW4ge1xuICAgICAgICBmcm9tIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MDBweCk7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB9XG4gICAgfVxuYDsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/data-editor/group-rename.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/group-rename.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_group_rename_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/group-rename.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_group_rename_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_group_rename_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_group_rename_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_group_rename_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-editor-container/data-grid-container.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-editor-container/data-grid-container.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_container_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-editor-container/data-grid-container.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-search/data-grid-search-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_search_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-search/data-grid-search-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_search_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_search_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_search_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_search_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=7413.9c54853d.iframe.bundle.js.map