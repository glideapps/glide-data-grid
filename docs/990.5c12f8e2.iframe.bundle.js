"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[990],{

/***/ "./packages/core/src/internal/scrolling-data-grid/scrolling-data-grid.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ scrolling_data_grid)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/lodash/clamp.js
var clamp = __webpack_require__("./node_modules/lodash/clamp.js");
var clamp_default = /*#__PURE__*/__webpack_require__.n(clamp);
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid.tsx + 10 modules
var data_grid = __webpack_require__("./packages/core/src/internal/data-grid/data-grid.tsx");
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-dnd/data-grid-dnd.tsx




function offsetColumnSize(column, width, min, max) {
  var _column$growOffset;
  return clamp_default()(Math.round(width - ((_column$growOffset = column.growOffset) !== null && _column$growOffset !== void 0 ? _column$growOffset : 0)), Math.ceil(min), Math.floor(max));
}
const DataGridDnd = p => {
  var _ref;
  const [resizeColStartX, setResizeColStartX] = react.useState();
  const [resizeCol, setResizeCol] = react.useState();
  const [dragCol, setDragCol] = react.useState();
  const [dropCol, setDropCol] = react.useState();
  const [dragColActive, setDragColActive] = react.useState(false);
  const [dragStartX, setDragStartX] = react.useState();
  const [dragRow, setDragRow] = react.useState();
  const [dropRow, setDropRow] = react.useState();
  const [dragRowActive, setDragRowActive] = react.useState(false);
  const [dragStartY, setDragStartY] = react.useState();
  const {
    onHeaderMenuClick,
    getCellContent,
    onColumnMoved,
    onColumnResize,
    onColumnResizeStart,
    onColumnResizeEnd,
    gridRef,
    maxColumnWidth,
    minColumnWidth,
    onRowMoved,
    lockColumns,
    onColumnProposeMove,
    onMouseDown,
    onMouseUp,
    onItemHovered,
    onDragStart,
    canvasRef
  } = p;
  const canResize = ((_ref = onColumnResize !== null && onColumnResize !== void 0 ? onColumnResize : onColumnResizeEnd) !== null && _ref !== void 0 ? _ref : onColumnResizeStart) !== undefined;
  const {
    columns,
    selection
  } = p;
  const selectedColumns = selection.columns;
  const onItemHoveredImpl = react.useCallback(args => {
    const [col, row] = args.location;
    if (dragCol !== undefined && dropCol !== col && col >= lockColumns) {
      setDragColActive(true);
      setDropCol(col);
    } else if (dragRow !== undefined && row !== undefined) {
      setDragRowActive(true);
      setDropRow(Math.max(0, row));
    } else {
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args);
    }
  }, [dragCol, dragRow, dropCol, onItemHovered, lockColumns]);
  const canDragCol = onColumnMoved !== undefined;
  const onMouseDownImpl = react.useCallback(args => {
    if (args.button === 0) {
      const [col, row] = args.location;
      if (args.kind === "out-of-bounds" && args.isEdge && canResize) {
        var _gridRef$current;
        const bounds = gridRef === null || gridRef === void 0 || (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.getBounds(columns.length - 1, -1);
        if (bounds !== undefined) {
          setResizeColStartX(bounds.x);
          setResizeCol(columns.length - 1);
        }
      } else if (args.kind === "header" && col >= lockColumns) {
        const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
        if (args.isEdge && canResize && canvas) {
          var _columns$col$growOffs;
          setResizeColStartX(args.bounds.x);
          setResizeCol(col);
          const rect = canvas.getBoundingClientRect();
          const scale = rect.width / canvas.offsetWidth;
          const width = args.bounds.width / scale;
          onColumnResizeStart === null || onColumnResizeStart === void 0 || onColumnResizeStart(columns[col], width, col, width + ((_columns$col$growOffs = columns[col].growOffset) !== null && _columns$col$growOffs !== void 0 ? _columns$col$growOffs : 0));
        } else if (args.kind === "header" && canDragCol) {
          setDragStartX(args.bounds.x);
          setDragCol(col);
        }
      } else if (args.kind === "cell" && lockColumns > 0 && col === 0 && row !== undefined && onRowMoved !== undefined) {
        setDragStartY(args.bounds.y);
        setDragRow(row);
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args);
  }, [onMouseDown, canResize, lockColumns, onRowMoved, gridRef, columns, canDragCol, onColumnResizeStart, canvasRef]);
  const onHeaderMenuClickMangled = react.useCallback((col, screenPosition) => {
    if (dragColActive || dragRowActive) return;
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col, screenPosition);
  }, [dragColActive, dragRowActive, onHeaderMenuClick]);
  const lastResizeWidthRef = react.useRef(-1);
  const clearAll = react.useCallback(() => {
    lastResizeWidthRef.current = -1;
    setDragRow(undefined);
    setDropRow(undefined);
    setDragStartY(undefined);
    setDragRowActive(false);
    setDragCol(undefined);
    setDropCol(undefined);
    setDragStartX(undefined);
    setDragColActive(false);
    setResizeCol(undefined);
    setResizeColStartX(undefined);
  }, []);
  const onMouseUpImpl = react.useCallback((args, isOutside) => {
    if (args.button === 0) {
      if (resizeCol !== undefined) {
        var _columns$resizeCol$gr;
        if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.hasIndex(resizeCol)) === true) {
          for (const c of selectedColumns) {
            var _col$growOffset;
            if (c === resizeCol) continue;
            const col = columns[c];
            const newSize = offsetColumnSize(col, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
            onColumnResize === null || onColumnResize === void 0 || onColumnResize(col, newSize, c, newSize + ((_col$growOffset = col.growOffset) !== null && _col$growOffset !== void 0 ? _col$growOffset : 0));
          }
        }
        const ns = offsetColumnSize(columns[resizeCol], lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
        onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(columns[resizeCol], ns, resizeCol, ns + ((_columns$resizeCol$gr = columns[resizeCol].growOffset) !== null && _columns$resizeCol$gr !== void 0 ? _columns$resizeCol$gr : 0));
        if (selectedColumns.hasIndex(resizeCol)) {
          for (const c of selectedColumns) {
            var _col$growOffset2;
            if (c === resizeCol) continue;
            const col = columns[c];
            const s = offsetColumnSize(col, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
            onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(col, s, c, s + ((_col$growOffset2 = col.growOffset) !== null && _col$growOffset2 !== void 0 ? _col$growOffset2 : 0));
          }
        }
      }
      clearAll();
      if (dragCol !== undefined && dropCol !== undefined) {
        onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(dragCol, dropCol);
      }
      if (dragRow !== undefined && dropRow !== undefined) {
        onRowMoved === null || onRowMoved === void 0 || onRowMoved(dragRow, dropRow);
      }
    }
    onMouseUp === null || onMouseUp === void 0 || onMouseUp(args, isOutside);
  }, [onMouseUp, resizeCol, dragCol, dropCol, dragRow, dropRow, selectedColumns, onColumnResizeEnd, columns, minColumnWidth, maxColumnWidth, onColumnResize, onColumnMoved, onRowMoved, clearAll]);
  const dragOffset = react.useMemo(() => {
    if (dragCol === undefined || dropCol === undefined) return undefined;
    if (dragCol === dropCol) return undefined;
    if ((onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(dragCol, dropCol)) === false) return undefined;
    return {
      src: dragCol,
      dest: dropCol
    };
  }, [dragCol, dropCol, onColumnProposeMove]);
  const onMouseMove = react.useCallback(event => {
    const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
    if (dragCol !== undefined && dragStartX !== undefined) {
      const diff = Math.abs(event.clientX - dragStartX);
      if (diff > 20) {
        setDragColActive(true);
      }
    } else if (dragRow !== undefined && dragStartY !== undefined) {
      const diff = Math.abs(event.clientY - dragStartY);
      if (diff > 20) {
        setDragRowActive(true);
      }
    } else if (resizeCol !== undefined && resizeColStartX !== undefined && canvas) {
      var _column$growOffset2;
      const rect = canvas.getBoundingClientRect();
      const scale = rect.width / canvas.offsetWidth;
      const newWidth = (event.clientX - resizeColStartX) / scale;
      const column = columns[resizeCol];
      const ns = offsetColumnSize(column, newWidth, minColumnWidth, maxColumnWidth);
      onColumnResize === null || onColumnResize === void 0 || onColumnResize(column, ns, resizeCol, ns + ((_column$growOffset2 = column.growOffset) !== null && _column$growOffset2 !== void 0 ? _column$growOffset2 : 0));
      lastResizeWidthRef.current = newWidth;
      if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.first()) === resizeCol) {
        for (const c of selectedColumns) {
          var _col$growOffset3;
          if (c === resizeCol) continue;
          const col = columns[c];
          const s = offsetColumnSize(col, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
          onColumnResize === null || onColumnResize === void 0 || onColumnResize(col, s, c, s + ((_col$growOffset3 = col.growOffset) !== null && _col$growOffset3 !== void 0 ? _col$growOffset3 : 0));
        }
      }
    }
  }, [dragCol, dragStartX, dragRow, dragStartY, resizeCol, resizeColStartX, columns, minColumnWidth, maxColumnWidth, onColumnResize, selectedColumns, canvasRef]);
  const getMangledCellContent = react.useCallback((cell, forceStrict) => {
    if (dragRow === undefined || dropRow === undefined) return getCellContent(cell, forceStrict);
    let [col, row] = cell;
    if (row === dropRow) {
      row = dragRow;
    } else {
      if (row > dropRow) row -= 1;
      if (row >= dragRow) row += 1;
    }
    return getCellContent([col, row], forceStrict);
  }, [dragRow, dropRow, getCellContent]);
  const onDragStartImpl = react.useCallback(args => {
    onDragStart === null || onDragStart === void 0 || onDragStart(args);
    if (!args.defaultPrevented()) {
      clearAll();
    }
  }, [clearAll, onDragStart]);
  return (0,jsx_runtime.jsx)(data_grid/* default */.Z, {
    accessibilityHeight: p.accessibilityHeight,
    canvasRef: p.canvasRef,
    cellXOffset: p.cellXOffset,
    cellYOffset: p.cellYOffset,
    columns: p.columns,
    disabledRows: p.disabledRows,
    drawFocusRing: p.drawFocusRing,
    drawHeader: p.drawHeader,
    drawCell: p.drawCell,
    enableGroups: p.enableGroups,
    eventTargetRef: p.eventTargetRef,
    experimental: p.experimental,
    fillHandle: p.fillHandle,
    firstColAccessible: p.firstColAccessible,
    fixedShadowX: p.fixedShadowX,
    fixedShadowY: p.fixedShadowY,
    freezeColumns: p.freezeColumns,
    getCellRenderer: p.getCellRenderer,
    getGroupDetails: p.getGroupDetails,
    getRowThemeOverride: p.getRowThemeOverride,
    groupHeaderHeight: p.groupHeaderHeight,
    headerHeight: p.headerHeight,
    headerIcons: p.headerIcons,
    height: p.height,
    highlightRegions: p.highlightRegions,
    imageWindowLoader: p.imageWindowLoader,
    resizeColumn: resizeCol,
    isDraggable: p.isDraggable,
    isFilling: p.isFilling,
    isFocused: p.isFocused,
    onCanvasBlur: p.onCanvasBlur,
    onCanvasFocused: p.onCanvasFocused,
    onCellFocused: p.onCellFocused,
    onContextMenu: p.onContextMenu,
    onDragEnd: p.onDragEnd,
    onDragLeave: p.onDragLeave,
    onDragOverCell: p.onDragOverCell,
    onDrop: p.onDrop,
    onKeyDown: p.onKeyDown,
    onKeyUp: p.onKeyUp,
    onMouseMove: p.onMouseMove,
    prelightCells: p.prelightCells,
    rowHeight: p.rowHeight,
    rows: p.rows,
    selection: p.selection,
    smoothScrollX: p.smoothScrollX,
    smoothScrollY: p.smoothScrollY,
    theme: p.theme,
    freezeTrailingRows: p.freezeTrailingRows,
    hasAppendRow: p.hasAppendRow,
    translateX: p.translateX,
    translateY: p.translateY,
    verticalBorder: p.verticalBorder,
    width: p.width,
    getCellContent: getMangledCellContent,
    isResizing: resizeCol !== undefined,
    onHeaderMenuClick: onHeaderMenuClickMangled,
    isDragging: dragColActive,
    onItemHovered: onItemHoveredImpl,
    onDragStart: onDragStartImpl,
    onMouseDown: onMouseDownImpl,
    allowResize: canResize,
    onMouseUp: onMouseUpImpl,
    dragAndDropState: dragOffset,
    onMouseMoveRaw: onMouseMove,
    ref: gridRef
  });
};
DataGridDnd.displayName = "DataGridDnd";
/* harmony default export */ const data_grid_dnd = (DataGridDnd);
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/src/common/resize-detector.ts

function useResizeDetector(initialSize) {
  const ref = (0,react.useRef)(null);
  const [size, setSize] = (0,react.useState)({
    width: initialSize === null || initialSize === void 0 ? void 0 : initialSize[0],
    height: initialSize === null || initialSize === void 0 ? void 0 : initialSize[1]
  });
  (0,react.useLayoutEffect)(() => {
    const resizeCallback = entries => {
      for (const entry of entries) {
        const {
          width,
          height
        } = entry && entry.contentRect || {};
        setSize(cv => cv.width === width && cv.height === height ? cv : {
          width,
          height
        });
      }
    };
    const resizeObserver = new window.ResizeObserver(resizeCallback);
    if (ref.current) {
      resizeObserver.observe(ref.current, undefined);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);
  return {
    ref,
    ...size
  };
}
// EXTERNAL MODULE: ./packages/core/src/common/browser-detect.ts
var browser_detect = __webpack_require__("./packages/core/src/common/browser-detect.ts");
// EXTERNAL MODULE: ./packages/core/src/common/utils.tsx
var utils = __webpack_require__("./packages/core/src/common/utils.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/scrolling-data-grid/use-kinetic-scroll.ts

const useKineticScroll = (isEnabled, callback, targetScroller) => {
  const rafId = (0,react.useRef)(null);
  const isTouching = (0,react.useRef)(null);
  const lastScrollPosition = (0,react.useRef)(null);
  const sameCount = (0,react.useRef)(0);
  const callbackRef = (0,react.useRef)(callback);
  callbackRef.current = callback;
  const scrollEl = targetScroller.current;
  (0,react.useEffect)(() => {
    const handleScroll = () => {
      if (isTouching.current === false && scrollEl !== null) {
        var _lastScrollPosition$c, _lastScrollPosition$c2;
        const currentScrollPosition = [scrollEl.scrollLeft, scrollEl.scrollTop];
        if (((_lastScrollPosition$c = lastScrollPosition.current) === null || _lastScrollPosition$c === void 0 ? void 0 : _lastScrollPosition$c[0]) === currentScrollPosition[0] && ((_lastScrollPosition$c2 = lastScrollPosition.current) === null || _lastScrollPosition$c2 === void 0 ? void 0 : _lastScrollPosition$c2[1]) === currentScrollPosition[1]) {
          if (sameCount.current > 10) {
            lastScrollPosition.current = null;
            isTouching.current = null;
            return;
          } else {
            sameCount.current++;
          }
        } else {
          sameCount.current = 0;
          callbackRef.current(currentScrollPosition[0], currentScrollPosition[1]);
          lastScrollPosition.current = currentScrollPosition;
        }
        rafId.current = window.setTimeout(handleScroll, 1000 / 120);
      }
    };
    const startTouch = () => {
      isTouching.current = true;
      lastScrollPosition.current = null;
      if (rafId.current !== null) {
        window.clearTimeout(rafId.current);
        rafId.current = null;
      }
    };
    const endTouch = event => {
      if (event.touches.length === 0) {
        isTouching.current = false;
        sameCount.current = 0;
        rafId.current = window.setTimeout(handleScroll, 1000 / 120);
      }
    };
    if (isEnabled && scrollEl !== null) {
      const element = scrollEl;
      element.addEventListener("touchstart", startTouch);
      element.addEventListener("touchend", endTouch);
      return () => {
        element.removeEventListener("touchstart", startTouch);
        element.removeEventListener("touchend", endTouch);
        if (rafId.current !== null) {
          window.clearTimeout(rafId.current);
        }
      };
    }
  }, [isEnabled, scrollEl]);
};
/* harmony default export */ const use_kinetic_scroll = (useKineticScroll);
;// CONCATENATED MODULE: ./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx









const _exp = /*#__PURE__*/() => p => p.isSafari ? "scroll" : "auto";
const ScrollRegionStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "ScrollRegionStyle",
  class: "sj2f20c",
  propsAsIs: false,
  vars: {
    "sj2f20c-0": [_exp()]
  }
});
function useTouchUpDelayed(delay) {
  const [hasTouches, setHasTouches] = react.useState(false);
  const safeWindow = typeof window === "undefined" ? null : window;
  const cbTimer = react.useRef(0);
  (0,utils/* useEventListener */.OR)("touchstart", react.useCallback(() => {
    window.clearTimeout(cbTimer.current);
    setHasTouches(true);
  }, []), safeWindow, true, false);
  (0,utils/* useEventListener */.OR)("touchend", react.useCallback(e => {
    if (e.touches.length === 0) {
      cbTimer.current = window.setTimeout(() => setHasTouches(false), delay);
    }
  }, [delay]), safeWindow, true, false);
  return hasTouches;
}
const InfiniteScroller = p => {
  var _rightElementProps$st, _rightElementProps$fi, _lastProps$current, _lastProps$current2;
  const {
    children,
    clientHeight,
    scrollHeight,
    scrollWidth,
    update,
    draggable,
    className,
    preventDiagonalScrolling = false,
    paddingBottom = 0,
    paddingRight = 0,
    rightElement,
    rightElementProps,
    kineticScrollPerfHack = false,
    scrollRef,
    initialSize
  } = p;
  const padders = [];
  const rightElementSticky = (_rightElementProps$st = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.sticky) !== null && _rightElementProps$st !== void 0 ? _rightElementProps$st : false;
  const rightElementFill = (_rightElementProps$fi = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.fill) !== null && _rightElementProps$fi !== void 0 ? _rightElementProps$fi : false;
  const offsetY = react.useRef(0);
  const lastScrollY = react.useRef(0);
  const scroller = react.useRef(null);
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  const lastScrollPosition = react.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: undefined
  });
  const rightWrapRef = react.useRef(null);
  const hasTouches = useTouchUpDelayed(200);
  const [isIdle, setIsIdle] = react.useState(true);
  const idleTimer = react.useRef(0);
  react.useLayoutEffect(() => {
    if (!isIdle || hasTouches || lastScrollPosition.current.lockDirection === undefined) return;
    const el = scroller.current;
    if (el === null) return;
    const [lx, ly] = lastScrollPosition.current.lockDirection;
    if (lx !== undefined) {
      el.scrollLeft = lx;
    } else if (ly !== undefined) {
      el.scrollTop = ly;
    }
    lastScrollPosition.current.lockDirection = undefined;
  }, [hasTouches, isIdle]);
  const onScroll = react.useCallback((scrollLeft, scrollTop) => {
    var _scrollTop, _scrollLeft, _lock$, _lock$2, _rightWrapRef$current, _rightWrapRef$current2;
    const el = scroller.current;
    if (el === null) return;
    scrollTop = (_scrollTop = scrollTop) !== null && _scrollTop !== void 0 ? _scrollTop : el.scrollTop;
    scrollLeft = (_scrollLeft = scrollLeft) !== null && _scrollLeft !== void 0 ? _scrollLeft : el.scrollLeft;
    const lastScrollTop = lastScrollPosition.current.scrollTop;
    const lastScrollLeft = lastScrollPosition.current.scrollLeft;
    const dx = scrollLeft - lastScrollLeft;
    const dy = scrollTop - lastScrollTop;
    if (hasTouches && dx !== 0 && dy !== 0 && (Math.abs(dx) > 3 || Math.abs(dy) > 3) && preventDiagonalScrolling && lastScrollPosition.current.lockDirection === undefined) {
      lastScrollPosition.current.lockDirection = Math.abs(dx) < Math.abs(dy) ? [lastScrollLeft, undefined] : [undefined, lastScrollTop];
    }
    const lock = lastScrollPosition.current.lockDirection;
    scrollLeft = (_lock$ = lock === null || lock === void 0 ? void 0 : lock[0]) !== null && _lock$ !== void 0 ? _lock$ : scrollLeft;
    scrollTop = (_lock$2 = lock === null || lock === void 0 ? void 0 : lock[1]) !== null && _lock$2 !== void 0 ? _lock$2 : scrollTop;
    lastScrollPosition.current.scrollLeft = scrollLeft;
    lastScrollPosition.current.scrollTop = scrollTop;
    const cWidth = el.clientWidth;
    const cHeight = el.clientHeight;
    const newY = scrollTop;
    const delta = lastScrollY.current - newY;
    const scrollableHeight = el.scrollHeight - cHeight;
    lastScrollY.current = newY;
    if (scrollableHeight > 0 && (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) && scrollHeight > el.scrollHeight + 5) {
      const prog = newY / scrollableHeight;
      const recomputed = (scrollHeight - cHeight) * prog;
      offsetY.current = recomputed - newY;
    }
    if (lock !== undefined) {
      window.clearTimeout(idleTimer.current);
      setIsIdle(false);
      idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);
    }
    update({
      x: scrollLeft,
      y: newY + offsetY.current,
      width: cWidth - paddingRight,
      height: cHeight - paddingBottom,
      paddingRight: (_rightWrapRef$current = (_rightWrapRef$current2 = rightWrapRef.current) === null || _rightWrapRef$current2 === void 0 ? void 0 : _rightWrapRef$current2.clientWidth) !== null && _rightWrapRef$current !== void 0 ? _rightWrapRef$current : 0
    });
  }, [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]);
  use_kinetic_scroll(kineticScrollPerfHack && browser_detect/* browserIsSafari.value */.Pq.value, onScroll, scroller);
  const onScrollRef = react.useRef(onScroll);
  onScrollRef.current = onScroll;
  const lastProps = react.useRef();
  const didFirstScroll = react.useRef(false);
  react.useLayoutEffect(() => {
    if (didFirstScroll.current) onScroll();else didFirstScroll.current = true;
  }, [onScroll, paddingBottom, paddingRight]);
  const setRefs = react.useCallback(instance => {
    scroller.current = instance;
    if (scrollRef !== undefined) {
      scrollRef.current = instance;
    }
  }, [scrollRef]);
  let key = 0;
  let h = 0;
  padders.push((0,jsx_runtime.jsx)("div", {
    style: {
      width: scrollWidth,
      height: 0
    }
  }, key++));
  while (h < scrollHeight) {
    const toAdd = Math.min(5000000, scrollHeight - h);
    padders.push((0,jsx_runtime.jsx)("div", {
      style: {
        width: 0,
        height: toAdd
      }
    }, key++));
    h += toAdd;
  }
  const {
    ref,
    width,
    height
  } = useResizeDetector(initialSize);
  if (typeof window !== "undefined" && (((_lastProps$current = lastProps.current) === null || _lastProps$current === void 0 ? void 0 : _lastProps$current.height) !== height || ((_lastProps$current2 = lastProps.current) === null || _lastProps$current2 === void 0 ? void 0 : _lastProps$current2.width) !== width)) {
    window.setTimeout(() => onScrollRef.current(), 0);
    lastProps.current = {
      width,
      height
    };
  }
  if ((width !== null && width !== void 0 ? width : 0) === 0 || (height !== null && height !== void 0 ? height : 0) === 0) return (0,jsx_runtime.jsx)("div", {
    ref: ref
  });
  return (0,jsx_runtime.jsx)("div", {
    ref: ref,
    children: (0,jsx_runtime.jsxs)(ScrollRegionStyle, {
      isSafari: browser_detect/* browserIsSafari.value */.Pq.value,
      children: [(0,jsx_runtime.jsx)("div", {
        className: "dvn-underlay",
        children: children
      }), (0,jsx_runtime.jsx)("div", {
        ref: setRefs,
        style: lastProps.current,
        draggable: draggable,
        onDragStart: e => {
          if (!draggable) {
            e.stopPropagation();
            e.preventDefault();
          }
        },
        className: "dvn-scroller " + (className !== null && className !== void 0 ? className : ""),
        onScroll: () => onScroll(),
        children: (0,jsx_runtime.jsxs)("div", {
          className: "dvn-scroll-inner" + (rightElement === undefined ? " dvn-hidden" : ""),
          children: [(0,jsx_runtime.jsx)("div", {
            className: "dvn-stack",
            children: padders
          }), rightElement !== undefined && (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [!rightElementFill && (0,jsx_runtime.jsx)("div", {
              className: "dvn-spacer"
            }), (0,jsx_runtime.jsx)("div", {
              ref: rightWrapRef,
              style: {
                height,
                maxHeight: clientHeight - Math.ceil(dpr % 1),
                position: "sticky",
                top: 0,
                paddingLeft: 1,
                marginBottom: -40,
                marginRight: paddingRight,
                flexGrow: rightElementFill ? 1 : undefined,
                right: rightElementSticky ? paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0 : undefined,
                pointerEvents: "auto"
              },
              children: rightElement
            })]
          })]
        })
      })]
    })
  });
};
InfiniteScroller.displayName = "InfiniteScroller";

__webpack_require__("./packages/core/src/internal/scrolling-data-grid/infinite-scroller.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/scrolling-data-grid/scrolling-data-grid.tsx




const GridScroller = p => {
  const {
    columns,
    rows,
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    enableGroups,
    freezeColumns,
    experimental,
    nonGrowWidth,
    clientSize,
    className,
    onVisibleRegionChanged,
    scrollRef,
    preventDiagonalScrolling,
    rightElement,
    rightElementProps,
    overscrollX,
    overscrollY,
    initialSize,
    smoothScrollX = false,
    smoothScrollY = false,
    isDraggable
  } = p;
  const {
    paddingRight,
    paddingBottom
  } = experimental !== null && experimental !== void 0 ? experimental : {};
  const [clientWidth, clientHeight] = clientSize;
  const last = react.useRef();
  const lastX = react.useRef();
  const lastY = react.useRef();
  const lastSize = react.useRef();
  const width = nonGrowWidth + Math.max(0, overscrollX !== null && overscrollX !== void 0 ? overscrollX : 0);
  let height = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
  if (typeof rowHeight === "number") {
    height += rows * rowHeight;
  } else {
    for (let r = 0; r < rows; r++) {
      height += rowHeight(r);
    }
  }
  if (overscrollY !== undefined) {
    height += overscrollY;
  }
  const lastArgs = react.useRef();
  const processArgs = react.useCallback(() => {
    var _lastSize$current, _lastSize$current2;
    if (lastArgs.current === undefined) return;
    const args = {
      ...lastArgs.current
    };
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
      } else if (args.x > cx) {
        x += c.width;
        if (smoothScrollX) {
          tx += cx - args.x;
        } else {
          cellX++;
        }
        cellRight++;
      } else if (args.x + args.width > cx) {
        x += c.width;
        cellRight++;
      } else {
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
      } else {
        cellY = Math.ceil(args.y / rowHeight);
      }
      cellBottom = Math.ceil(args.height / rowHeight) + cellY;
      if (ty < 0) cellBottom++;
    } else {
      let y = 0;
      for (let row = 0; row < rows; row++) {
        const rh = rowHeight(row);
        const cy = y + (smoothScrollY ? 0 : rh / 2);
        if (args.y >= y + rh) {
          y += rh;
          cellY++;
          cellBottom++;
        } else if (args.y > cy) {
          y += rh;
          if (smoothScrollY) {
            ty += cy - args.y;
          } else {
            cellY++;
          }
          cellBottom++;
        } else if (args.y + args.height > rh / 2 + y) {
          y += rh;
          cellBottom++;
        } else {
          break;
        }
      }
    }
    const rect = {
      x: cellX,
      y: cellY,
      width: cellRight - cellX,
      height: cellBottom - cellY
    };
    const oldRect = last.current;
    if (oldRect === undefined || oldRect.y !== rect.y || oldRect.x !== rect.x || oldRect.height !== rect.height || oldRect.width !== rect.width || lastX.current !== tx || lastY.current !== ty || args.width !== ((_lastSize$current = lastSize.current) === null || _lastSize$current === void 0 ? void 0 : _lastSize$current[0]) || args.height !== ((_lastSize$current2 = lastSize.current) === null || _lastSize$current2 === void 0 ? void 0 : _lastSize$current2[1])) {
      var _args$paddingRight;
      onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 || onVisibleRegionChanged({
        x: cellX,
        y: cellY,
        width: cellRight - cellX,
        height: cellBottom - cellY
      }, args.width, args.height, (_args$paddingRight = args.paddingRight) !== null && _args$paddingRight !== void 0 ? _args$paddingRight : 0, tx, ty);
      last.current = rect;
      lastX.current = tx;
      lastY.current = ty;
      lastSize.current = [args.width, args.height];
    }
  }, [columns, rowHeight, rows, onVisibleRegionChanged, freezeColumns, smoothScrollX, smoothScrollY]);
  const onScrollUpdate = react.useCallback(args => {
    lastArgs.current = args;
    processArgs();
  }, [processArgs]);
  react.useEffect(() => {
    processArgs();
  }, [processArgs]);
  return (0,jsx_runtime.jsx)(InfiniteScroller, {
    scrollRef: scrollRef,
    className: className,
    kineticScrollPerfHack: experimental === null || experimental === void 0 ? void 0 : experimental.kineticScrollPerfHack,
    preventDiagonalScrolling: preventDiagonalScrolling,
    draggable: isDraggable === true || typeof isDraggable === "string",
    scrollWidth: width + (paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0),
    scrollHeight: height + (paddingBottom !== null && paddingBottom !== void 0 ? paddingBottom : 0),
    clientHeight: clientHeight,
    rightElement: rightElement,
    paddingBottom: paddingBottom,
    paddingRight: paddingRight,
    rightElementProps: rightElementProps,
    update: onScrollUpdate,
    initialSize: initialSize,
    children: (0,jsx_runtime.jsx)(data_grid_dnd, {
      eventTargetRef: scrollRef,
      width: clientWidth,
      height: clientHeight,
      accessibilityHeight: p.accessibilityHeight,
      canvasRef: p.canvasRef,
      cellXOffset: p.cellXOffset,
      cellYOffset: p.cellYOffset,
      columns: p.columns,
      disabledRows: p.disabledRows,
      enableGroups: p.enableGroups,
      fillHandle: p.fillHandle,
      firstColAccessible: p.firstColAccessible,
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
      isFilling: p.isFilling,
      isFocused: p.isFocused,
      lockColumns: p.lockColumns,
      maxColumnWidth: p.maxColumnWidth,
      minColumnWidth: p.minColumnWidth,
      onHeaderMenuClick: p.onHeaderMenuClick,
      onMouseMove: p.onMouseMove,
      prelightCells: p.prelightCells,
      rowHeight: p.rowHeight,
      rows: p.rows,
      selection: p.selection,
      theme: p.theme,
      freezeTrailingRows: p.freezeTrailingRows,
      hasAppendRow: p.hasAppendRow,
      translateX: p.translateX,
      translateY: p.translateY,
      onColumnProposeMove: p.onColumnProposeMove,
      verticalBorder: p.verticalBorder,
      drawFocusRing: p.drawFocusRing,
      drawHeader: p.drawHeader,
      drawCell: p.drawCell,
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
    })
  });
};
GridScroller.displayName = "GridScroller";
/* harmony default export */ const scrolling_data_grid = (GridScroller);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx":
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
___CSS_LOADER_EXPORT___.push([module.id, ".sj2f20c .dvn-scroller{overflow:var(--sj2f20c-0);-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}.sj2f20c .dvn-hidden{visibility:hidden;}.sj2f20c .dvn-scroll-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;pointer-events:none;}.sj2f20c .dvn-scroll-inner > *{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}.sj2f20c .dvn-scroll-inner .dvn-spacer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}.sj2f20c .dvn-scroll-inner .dvn-stack{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.sj2f20c .dvn-underlay > *{position:absolute;left:0;top:0;}.sj2f20c canvas{outline:none;}.sj2f20c canvas *{height:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvc2Nyb2xsaW5nLWRhdGEtZ3JpZC9pbmZpbml0ZS1zY3JvbGxlci50c3giXSwibmFtZXMiOlsiLnNqMmYyMGMiXSwibWFwcGluZ3MiOiJBQVMwQkEiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9zY3JvbGxpbmctZGF0YS1ncmlkL2luZmluaXRlLXNjcm9sbGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcmVzaXplLWRldGVjdG9yLmpzXCI7XG5pbXBvcnQgeyBicm93c2VySXNTYWZhcmkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Jyb3dzZXItZGV0ZWN0LmpzXCI7XG5pbXBvcnQgeyB1c2VFdmVudExpc3RlbmVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlscy5qc1wiO1xuaW1wb3J0IHVzZUtpbmV0aWNTY3JvbGwgZnJvbSBcIi4vdXNlLWtpbmV0aWMtc2Nyb2xsLmpzXCI7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBTY3JvbGxSZWdpb25TdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgLmR2bi1zY3JvbGxlciB7XG4gICAgICAgIG92ZXJmbG93OiAke3AgPT4gcC5pc1NhZmFyaSA/IFwic2Nyb2xsXCIgOiBcImF1dG9cIn07XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgLmR2bi1oaWRkZW4ge1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLmR2bi1zY3JvbGwtaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgICAgICA+ICoge1xuICAgICAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuZHZuLXNwYWNlciB7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAuZHZuLXN0YWNrIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmR2bi11bmRlcmxheSA+ICoge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICB9XG5cbiAgICBjYW52YXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuXG4gICAgICAgICoge1xuICAgICAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmZ1bmN0aW9uIHVzZVRvdWNoVXBEZWxheWVkKGRlbGF5KSB7XG4gIGNvbnN0IFtoYXNUb3VjaGVzLCBzZXRIYXNUb3VjaGVzXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgc2FmZVdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogd2luZG93O1xuICBjb25zdCBjYlRpbWVyID0gUmVhY3QudXNlUmVmKDApO1xuICB1c2VFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChjYlRpbWVyLmN1cnJlbnQpO1xuICAgIHNldEhhc1RvdWNoZXModHJ1ZSk7XG4gIH0sIFtdKSwgc2FmZVdpbmRvdywgdHJ1ZSwgZmFsc2UpO1xuICB1c2VFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgUmVhY3QudXNlQ2FsbGJhY2soZSA9PiB7XG4gICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNiVGltZXIuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHNldEhhc1RvdWNoZXMoZmFsc2UpLCBkZWxheSk7XG4gICAgfVxuICB9LCBbZGVsYXldKSwgc2FmZVdpbmRvdywgdHJ1ZSwgZmFsc2UpO1xuICByZXR1cm4gaGFzVG91Y2hlcztcbn1cbmV4cG9ydCBjb25zdCBJbmZpbml0ZVNjcm9sbGVyID0gcCA9PiB7XG4gIHZhciBfcmlnaHRFbGVtZW50UHJvcHMkc3QsIF9yaWdodEVsZW1lbnRQcm9wcyRmaSwgX2xhc3RQcm9wcyRjdXJyZW50LCBfbGFzdFByb3BzJGN1cnJlbnQyO1xuICBjb25zdCB7XG4gICAgY2hpbGRyZW4sXG4gICAgY2xpZW50SGVpZ2h0LFxuICAgIHNjcm9sbEhlaWdodCxcbiAgICBzY3JvbGxXaWR0aCxcbiAgICB1cGRhdGUsXG4gICAgZHJhZ2dhYmxlLFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcmV2ZW50RGlhZ29uYWxTY3JvbGxpbmcgPSBmYWxzZSxcbiAgICBwYWRkaW5nQm90dG9tID0gMCxcbiAgICBwYWRkaW5nUmlnaHQgPSAwLFxuICAgIHJpZ2h0RWxlbWVudCxcbiAgICByaWdodEVsZW1lbnRQcm9wcyxcbiAgICBraW5ldGljU2Nyb2xsUGVyZkhhY2sgPSBmYWxzZSxcbiAgICBzY3JvbGxSZWYsXG4gICAgaW5pdGlhbFNpemVcbiAgfSA9IHA7XG4gIGNvbnN0IHBhZGRlcnMgPSBbXTtcbiAgY29uc3QgcmlnaHRFbGVtZW50U3RpY2t5ID0gKF9yaWdodEVsZW1lbnRQcm9wcyRzdCA9IHJpZ2h0RWxlbWVudFByb3BzID09PSBudWxsIHx8IHJpZ2h0RWxlbWVudFByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByaWdodEVsZW1lbnRQcm9wcy5zdGlja3kpICE9PSBudWxsICYmIF9yaWdodEVsZW1lbnRQcm9wcyRzdCAhPT0gdm9pZCAwID8gX3JpZ2h0RWxlbWVudFByb3BzJHN0IDogZmFsc2U7XG4gIGNvbnN0IHJpZ2h0RWxlbWVudEZpbGwgPSAoX3JpZ2h0RWxlbWVudFByb3BzJGZpID0gcmlnaHRFbGVtZW50UHJvcHMgPT09IG51bGwgfHwgcmlnaHRFbGVtZW50UHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJpZ2h0RWxlbWVudFByb3BzLmZpbGwpICE9PSBudWxsICYmIF9yaWdodEVsZW1lbnRQcm9wcyRmaSAhPT0gdm9pZCAwID8gX3JpZ2h0RWxlbWVudFByb3BzJGZpIDogZmFsc2U7XG4gIGNvbnN0IG9mZnNldFkgPSBSZWFjdC51c2VSZWYoMCk7XG4gIGNvbnN0IGxhc3RTY3JvbGxZID0gUmVhY3QudXNlUmVmKDApO1xuICBjb25zdCBzY3JvbGxlciA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgZHByID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IDEgOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgY29uc3QgbGFzdFNjcm9sbFBvc2l0aW9uID0gUmVhY3QudXNlUmVmKHtcbiAgICBzY3JvbGxMZWZ0OiAwLFxuICAgIHNjcm9sbFRvcDogMCxcbiAgICBsb2NrRGlyZWN0aW9uOiB1bmRlZmluZWRcbiAgfSk7XG4gIGNvbnN0IHJpZ2h0V3JhcFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgaGFzVG91Y2hlcyA9IHVzZVRvdWNoVXBEZWxheWVkKDIwMCk7XG4gIGNvbnN0IFtpc0lkbGUsIHNldElzSWRsZV0gPSBSZWFjdC51c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgaWRsZVRpbWVyID0gUmVhY3QudXNlUmVmKDApO1xuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNJZGxlIHx8IGhhc1RvdWNoZXMgfHwgbGFzdFNjcm9sbFBvc2l0aW9uLmN1cnJlbnQubG9ja0RpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBzY3JvbGxlci5jdXJyZW50O1xuICAgIGlmIChlbCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IFtseCwgbHldID0gbGFzdFNjcm9sbFBvc2l0aW9uLmN1cnJlbnQubG9ja0RpcmVjdGlvbjtcbiAgICBpZiAobHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWwuc2Nyb2xsTGVmdCA9IGx4O1xuICAgIH0gZWxzZSBpZiAobHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWwuc2Nyb2xsVG9wID0gbHk7XG4gICAgfVxuICAgIGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gIH0sIFtoYXNUb3VjaGVzLCBpc0lkbGVdKTtcbiAgY29uc3Qgb25TY3JvbGwgPSBSZWFjdC51c2VDYWxsYmFjaygoc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wKSA9PiB7XG4gICAgdmFyIF9zY3JvbGxUb3AsIF9zY3JvbGxMZWZ0LCBfbG9jayQsIF9sb2NrJDIsIF9yaWdodFdyYXBSZWYkY3VycmVudCwgX3JpZ2h0V3JhcFJlZiRjdXJyZW50MjtcbiAgICBjb25zdCBlbCA9IHNjcm9sbGVyLmN1cnJlbnQ7XG4gICAgaWYgKGVsID09PSBudWxsKSByZXR1cm47XG4gICAgc2Nyb2xsVG9wID0gKF9zY3JvbGxUb3AgPSBzY3JvbGxUb3ApICE9PSBudWxsICYmIF9zY3JvbGxUb3AgIT09IHZvaWQgMCA/IF9zY3JvbGxUb3AgOiBlbC5zY3JvbGxUb3A7XG4gICAgc2Nyb2xsTGVmdCA9IChfc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQpICE9PSBudWxsICYmIF9zY3JvbGxMZWZ0ICE9PSB2b2lkIDAgPyBfc2Nyb2xsTGVmdCA6IGVsLnNjcm9sbExlZnQ7XG4gICAgY29uc3QgbGFzdFNjcm9sbFRvcCA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LnNjcm9sbFRvcDtcbiAgICBjb25zdCBsYXN0U2Nyb2xsTGVmdCA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LnNjcm9sbExlZnQ7XG4gICAgY29uc3QgZHggPSBzY3JvbGxMZWZ0IC0gbGFzdFNjcm9sbExlZnQ7XG4gICAgY29uc3QgZHkgPSBzY3JvbGxUb3AgLSBsYXN0U2Nyb2xsVG9wO1xuICAgIGlmIChoYXNUb3VjaGVzICYmIGR4ICE9PSAwICYmIGR5ICE9PSAwICYmIChNYXRoLmFicyhkeCkgPiAzIHx8IE1hdGguYWJzKGR5KSA+IDMpICYmIHByZXZlbnREaWFnb25hbFNjcm9sbGluZyAmJiBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5sb2NrRGlyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb24gPSBNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhkeSkgPyBbbGFzdFNjcm9sbExlZnQsIHVuZGVmaW5lZF0gOiBbdW5kZWZpbmVkLCBsYXN0U2Nyb2xsVG9wXTtcbiAgICB9XG4gICAgY29uc3QgbG9jayA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb247XG4gICAgc2Nyb2xsTGVmdCA9IChfbG9jayQgPSBsb2NrID09PSBudWxsIHx8IGxvY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvY2tbMF0pICE9PSBudWxsICYmIF9sb2NrJCAhPT0gdm9pZCAwID8gX2xvY2skIDogc2Nyb2xsTGVmdDtcbiAgICBzY3JvbGxUb3AgPSAoX2xvY2skMiA9IGxvY2sgPT09IG51bGwgfHwgbG9jayA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9ja1sxXSkgIT09IG51bGwgJiYgX2xvY2skMiAhPT0gdm9pZCAwID8gX2xvY2skMiA6IHNjcm9sbFRvcDtcbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgY29uc3QgY1dpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgY0hlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBuZXdZID0gc2Nyb2xsVG9wO1xuICAgIGNvbnN0IGRlbHRhID0gbGFzdFNjcm9sbFkuY3VycmVudCAtIG5ld1k7XG4gICAgY29uc3Qgc2Nyb2xsYWJsZUhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCAtIGNIZWlnaHQ7XG4gICAgbGFzdFNjcm9sbFkuY3VycmVudCA9IG5ld1k7XG4gICAgaWYgKHNjcm9sbGFibGVIZWlnaHQgPiAwICYmIChNYXRoLmFicyhkZWx0YSkgPiAyMDAwIHx8IG5ld1kgPT09IDAgfHwgbmV3WSA9PT0gc2Nyb2xsYWJsZUhlaWdodCkgJiYgc2Nyb2xsSGVpZ2h0ID4gZWwuc2Nyb2xsSGVpZ2h0ICsgNSkge1xuICAgICAgY29uc3QgcHJvZyA9IG5ld1kgLyBzY3JvbGxhYmxlSGVpZ2h0O1xuICAgICAgY29uc3QgcmVjb21wdXRlZCA9IChzY3JvbGxIZWlnaHQgLSBjSGVpZ2h0KSAqIHByb2c7XG4gICAgICBvZmZzZXRZLmN1cnJlbnQgPSByZWNvbXB1dGVkIC0gbmV3WTtcbiAgICB9XG4gICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChpZGxlVGltZXIuY3VycmVudCk7XG4gICAgICBzZXRJc0lkbGUoZmFsc2UpO1xuICAgICAgaWRsZVRpbWVyLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBzZXRJc0lkbGUodHJ1ZSksIDIwMCk7XG4gICAgfVxuICAgIHVwZGF0ZSh7XG4gICAgICB4OiBzY3JvbGxMZWZ0LFxuICAgICAgeTogbmV3WSArIG9mZnNldFkuY3VycmVudCxcbiAgICAgIHdpZHRoOiBjV2lkdGggLSBwYWRkaW5nUmlnaHQsXG4gICAgICBoZWlnaHQ6IGNIZWlnaHQgLSBwYWRkaW5nQm90dG9tLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAoX3JpZ2h0V3JhcFJlZiRjdXJyZW50ID0gKF9yaWdodFdyYXBSZWYkY3VycmVudDIgPSByaWdodFdyYXBSZWYuY3VycmVudCkgPT09IG51bGwgfHwgX3JpZ2h0V3JhcFJlZiRjdXJyZW50MiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3JpZ2h0V3JhcFJlZiRjdXJyZW50Mi5jbGllbnRXaWR0aCkgIT09IG51bGwgJiYgX3JpZ2h0V3JhcFJlZiRjdXJyZW50ICE9PSB2b2lkIDAgPyBfcmlnaHRXcmFwUmVmJGN1cnJlbnQgOiAwXG4gICAgfSk7XG4gIH0sIFtwYWRkaW5nQm90dG9tLCBwYWRkaW5nUmlnaHQsIHNjcm9sbEhlaWdodCwgdXBkYXRlLCBwcmV2ZW50RGlhZ29uYWxTY3JvbGxpbmcsIGhhc1RvdWNoZXNdKTtcbiAgdXNlS2luZXRpY1Njcm9sbChraW5ldGljU2Nyb2xsUGVyZkhhY2sgJiYgYnJvd3NlcklzU2FmYXJpLnZhbHVlLCBvblNjcm9sbCwgc2Nyb2xsZXIpO1xuICBjb25zdCBvblNjcm9sbFJlZiA9IFJlYWN0LnVzZVJlZihvblNjcm9sbCk7XG4gIG9uU2Nyb2xsUmVmLmN1cnJlbnQgPSBvblNjcm9sbDtcbiAgY29uc3QgbGFzdFByb3BzID0gUmVhY3QudXNlUmVmKCk7XG4gIGNvbnN0IGRpZEZpcnN0U2Nyb2xsID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkRmlyc3RTY3JvbGwuY3VycmVudCkgb25TY3JvbGwoKTtlbHNlIGRpZEZpcnN0U2Nyb2xsLmN1cnJlbnQgPSB0cnVlO1xuICB9LCBbb25TY3JvbGwsIHBhZGRpbmdCb3R0b20sIHBhZGRpbmdSaWdodF0pO1xuICBjb25zdCBzZXRSZWZzID0gUmVhY3QudXNlQ2FsbGJhY2soaW5zdGFuY2UgPT4ge1xuICAgIHNjcm9sbGVyLmN1cnJlbnQgPSBpbnN0YW5jZTtcbiAgICBpZiAoc2Nyb2xsUmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjcm9sbFJlZi5jdXJyZW50ID0gaW5zdGFuY2U7XG4gICAgfVxuICB9LCBbc2Nyb2xsUmVmXSk7XG4gIGxldCBrZXkgPSAwO1xuICBsZXQgaCA9IDA7XG4gIHBhZGRlcnMucHVzaChfanN4KFwiZGl2XCIsIHtcbiAgICBzdHlsZToge1xuICAgICAgd2lkdGg6IHNjcm9sbFdpZHRoLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfVxuICB9LCBrZXkrKykpO1xuICB3aGlsZSAoaCA8IHNjcm9sbEhlaWdodCkge1xuICAgIGNvbnN0IHRvQWRkID0gTWF0aC5taW4oNTAwMDAwMCwgc2Nyb2xsSGVpZ2h0IC0gaCk7XG4gICAgcGFkZGVycy5wdXNoKF9qc3goXCJkaXZcIiwge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogdG9BZGRcbiAgICAgIH1cbiAgICB9LCBrZXkrKykpO1xuICAgIGggKz0gdG9BZGQ7XG4gIH1cbiAgY29uc3Qge1xuICAgIHJlZixcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfSA9IHVzZVJlc2l6ZURldGVjdG9yKGluaXRpYWxTaXplKTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgKCgoX2xhc3RQcm9wcyRjdXJyZW50ID0gbGFzdFByb3BzLmN1cnJlbnQpID09PSBudWxsIHx8IF9sYXN0UHJvcHMkY3VycmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xhc3RQcm9wcyRjdXJyZW50LmhlaWdodCkgIT09IGhlaWdodCB8fCAoKF9sYXN0UHJvcHMkY3VycmVudDIgPSBsYXN0UHJvcHMuY3VycmVudCkgPT09IG51bGwgfHwgX2xhc3RQcm9wcyRjdXJyZW50MiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xhc3RQcm9wcyRjdXJyZW50Mi53aWR0aCkgIT09IHdpZHRoKSkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IG9uU2Nyb2xsUmVmLmN1cnJlbnQoKSwgMCk7XG4gICAgbGFzdFByb3BzLmN1cnJlbnQgPSB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH07XG4gIH1cbiAgaWYgKCh3aWR0aCAhPT0gbnVsbCAmJiB3aWR0aCAhPT0gdm9pZCAwID8gd2lkdGggOiAwKSA9PT0gMCB8fCAoaGVpZ2h0ICE9PSBudWxsICYmIGhlaWdodCAhPT0gdm9pZCAwID8gaGVpZ2h0IDogMCkgPT09IDApIHJldHVybiBfanN4KFwiZGl2XCIsIHtcbiAgICByZWY6IHJlZlxuICB9KTtcbiAgcmV0dXJuIF9qc3goXCJkaXZcIiwge1xuICAgIHJlZjogcmVmLFxuICAgIGNoaWxkcmVuOiBfanN4cyhTY3JvbGxSZWdpb25TdHlsZSwge1xuICAgICAgaXNTYWZhcmk6IGJyb3dzZXJJc1NhZmFyaS52YWx1ZSxcbiAgICAgIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJkdm4tdW5kZXJsYXlcIixcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICB9KSwgX2pzeChcImRpdlwiLCB7XG4gICAgICAgIHJlZjogc2V0UmVmcyxcbiAgICAgICAgc3R5bGU6IGxhc3RQcm9wcy5jdXJyZW50LFxuICAgICAgICBkcmFnZ2FibGU6IGRyYWdnYWJsZSxcbiAgICAgICAgb25EcmFnU3RhcnQ6IGUgPT4ge1xuICAgICAgICAgIGlmICghZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lOiBcImR2bi1zY3JvbGxlciBcIiArIChjbGFzc05hbWUgIT09IG51bGwgJiYgY2xhc3NOYW1lICE9PSB2b2lkIDAgPyBjbGFzc05hbWUgOiBcIlwiKSxcbiAgICAgICAgb25TY3JvbGw6ICgpID0+IG9uU2Nyb2xsKCksXG4gICAgICAgIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcImR2bi1zY3JvbGwtaW5uZXJcIiArIChyaWdodEVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiIGR2bi1oaWRkZW5cIiA6IFwiXCIpLFxuICAgICAgICAgIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZHZuLXN0YWNrXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogcGFkZGVyc1xuICAgICAgICAgIH0pLCByaWdodEVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBfanN4cyhfRnJhZ21lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbIXJpZ2h0RWxlbWVudEZpbGwgJiYgX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkdm4tc3BhY2VyXCJcbiAgICAgICAgICAgIH0pLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgcmVmOiByaWdodFdyYXBSZWYsXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogY2xpZW50SGVpZ2h0IC0gTWF0aC5jZWlsKGRwciAlIDEpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInN0aWNreVwiLFxuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogMSxcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IC00MCxcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogcGFkZGluZ1JpZ2h0LFxuICAgICAgICAgICAgICAgIGZsZXhHcm93OiByaWdodEVsZW1lbnRGaWxsID8gMSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICByaWdodDogcmlnaHRFbGVtZW50U3RpY2t5ID8gcGFkZGluZ1JpZ2h0ICE9PSBudWxsICYmIHBhZGRpbmdSaWdodCAhPT0gdm9pZCAwID8gcGFkZGluZ1JpZ2h0IDogMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjaGlsZHJlbjogcmlnaHRFbGVtZW50XG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfSlcbiAgICAgIH0pXVxuICAgIH0pXG4gIH0pO1xufTtcbkluZmluaXRlU2Nyb2xsZXIuZGlzcGxheU5hbWUgPSBcIkluZmluaXRlU2Nyb2xsZXJcIjsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx","webpack://./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx"],"names":[".sj2f20c"],"mappings":"AAS0BA,uBAAAA,yBAAAA,CAAAA,oCAAAA,CAAAA,gCAAAA,CAAAA,4BAAAA,CAAAA,CAAAA,qBAAAA,iBAAAA,CAAAA,CAAAA,2BAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,mBAAAA,CAAAA,CAAAA,+BAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,CAAAA,uCAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,CAAAA,sCAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,CAAAA,2BAAAA,iBAAAA,CAAAA,MAAAA,CAAAA,KAAAA,CAAAA,CAAAA,gBAAAA,YAAAA,CAAAA,CAAAA,kBAAAA,QAAAA,CAAAA;ACR1B,m5aAAm5a","sourcesContent":["import { styled } from \"@linaria/react\";\nimport * as React from \"react\";\nimport { useResizeDetector } from \"../../common/resize-detector.js\";\nimport { browserIsSafari } from \"../../common/browser-detect.js\";\nimport { useEventListener } from \"../../common/utils.js\";\nimport useKineticScroll from \"./use-kinetic-scroll.js\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { Fragment as _Fragment } from \"react/jsx-runtime\";\nimport { jsxs as _jsxs } from \"react/jsx-runtime\";\nconst ScrollRegionStyle = styled.div`\n    .dvn-scroller {\n        overflow: ${p => p.isSafari ? \"scroll\" : \"auto\"};\n        transform: translate3d(0, 0, 0);\n    }\n\n    .dvn-hidden {\n        visibility: hidden;\n    }\n\n    .dvn-scroll-inner {\n        display: flex;\n        pointer-events: none;\n\n        > * {\n            flex-shrink: 0;\n        }\n\n        .dvn-spacer {\n            flex-grow: 1;\n        }\n\n        .dvn-stack {\n            display: flex;\n            flex-direction: column;\n        }\n    }\n\n    .dvn-underlay > * {\n        position: absolute;\n        left: 0;\n        top: 0;\n    }\n\n    canvas {\n        outline: none;\n\n        * {\n            height: 0;\n        }\n    }\n`;\nfunction useTouchUpDelayed(delay) {\n  const [hasTouches, setHasTouches] = React.useState(false);\n  const safeWindow = typeof window === \"undefined\" ? null : window;\n  const cbTimer = React.useRef(0);\n  useEventListener(\"touchstart\", React.useCallback(() => {\n    window.clearTimeout(cbTimer.current);\n    setHasTouches(true);\n  }, []), safeWindow, true, false);\n  useEventListener(\"touchend\", React.useCallback(e => {\n    if (e.touches.length === 0) {\n      cbTimer.current = window.setTimeout(() => setHasTouches(false), delay);\n    }\n  }, [delay]), safeWindow, true, false);\n  return hasTouches;\n}\nexport const InfiniteScroller = p => {\n  var _rightElementProps$st, _rightElementProps$fi, _lastProps$current, _lastProps$current2;\n  const {\n    children,\n    clientHeight,\n    scrollHeight,\n    scrollWidth,\n    update,\n    draggable,\n    className,\n    preventDiagonalScrolling = false,\n    paddingBottom = 0,\n    paddingRight = 0,\n    rightElement,\n    rightElementProps,\n    kineticScrollPerfHack = false,\n    scrollRef,\n    initialSize\n  } = p;\n  const padders = [];\n  const rightElementSticky = (_rightElementProps$st = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.sticky) !== null && _rightElementProps$st !== void 0 ? _rightElementProps$st : false;\n  const rightElementFill = (_rightElementProps$fi = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.fill) !== null && _rightElementProps$fi !== void 0 ? _rightElementProps$fi : false;\n  const offsetY = React.useRef(0);\n  const lastScrollY = React.useRef(0);\n  const scroller = React.useRef(null);\n  const dpr = typeof window === \"undefined\" ? 1 : window.devicePixelRatio;\n  const lastScrollPosition = React.useRef({\n    scrollLeft: 0,\n    scrollTop: 0,\n    lockDirection: undefined\n  });\n  const rightWrapRef = React.useRef(null);\n  const hasTouches = useTouchUpDelayed(200);\n  const [isIdle, setIsIdle] = React.useState(true);\n  const idleTimer = React.useRef(0);\n  React.useLayoutEffect(() => {\n    if (!isIdle || hasTouches || lastScrollPosition.current.lockDirection === undefined) return;\n    const el = scroller.current;\n    if (el === null) return;\n    const [lx, ly] = lastScrollPosition.current.lockDirection;\n    if (lx !== undefined) {\n      el.scrollLeft = lx;\n    } else if (ly !== undefined) {\n      el.scrollTop = ly;\n    }\n    lastScrollPosition.current.lockDirection = undefined;\n  }, [hasTouches, isIdle]);\n  const onScroll = React.useCallback((scrollLeft, scrollTop) => {\n    var _scrollTop, _scrollLeft, _lock$, _lock$2, _rightWrapRef$current, _rightWrapRef$current2;\n    const el = scroller.current;\n    if (el === null) return;\n    scrollTop = (_scrollTop = scrollTop) !== null && _scrollTop !== void 0 ? _scrollTop : el.scrollTop;\n    scrollLeft = (_scrollLeft = scrollLeft) !== null && _scrollLeft !== void 0 ? _scrollLeft : el.scrollLeft;\n    const lastScrollTop = lastScrollPosition.current.scrollTop;\n    const lastScrollLeft = lastScrollPosition.current.scrollLeft;\n    const dx = scrollLeft - lastScrollLeft;\n    const dy = scrollTop - lastScrollTop;\n    if (hasTouches && dx !== 0 && dy !== 0 && (Math.abs(dx) > 3 || Math.abs(dy) > 3) && preventDiagonalScrolling && lastScrollPosition.current.lockDirection === undefined) {\n      lastScrollPosition.current.lockDirection = Math.abs(dx) < Math.abs(dy) ? [lastScrollLeft, undefined] : [undefined, lastScrollTop];\n    }\n    const lock = lastScrollPosition.current.lockDirection;\n    scrollLeft = (_lock$ = lock === null || lock === void 0 ? void 0 : lock[0]) !== null && _lock$ !== void 0 ? _lock$ : scrollLeft;\n    scrollTop = (_lock$2 = lock === null || lock === void 0 ? void 0 : lock[1]) !== null && _lock$2 !== void 0 ? _lock$2 : scrollTop;\n    lastScrollPosition.current.scrollLeft = scrollLeft;\n    lastScrollPosition.current.scrollTop = scrollTop;\n    const cWidth = el.clientWidth;\n    const cHeight = el.clientHeight;\n    const newY = scrollTop;\n    const delta = lastScrollY.current - newY;\n    const scrollableHeight = el.scrollHeight - cHeight;\n    lastScrollY.current = newY;\n    if (scrollableHeight > 0 && (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) && scrollHeight > el.scrollHeight + 5) {\n      const prog = newY / scrollableHeight;\n      const recomputed = (scrollHeight - cHeight) * prog;\n      offsetY.current = recomputed - newY;\n    }\n    if (lock !== undefined) {\n      window.clearTimeout(idleTimer.current);\n      setIsIdle(false);\n      idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);\n    }\n    update({\n      x: scrollLeft,\n      y: newY + offsetY.current,\n      width: cWidth - paddingRight,\n      height: cHeight - paddingBottom,\n      paddingRight: (_rightWrapRef$current = (_rightWrapRef$current2 = rightWrapRef.current) === null || _rightWrapRef$current2 === void 0 ? void 0 : _rightWrapRef$current2.clientWidth) !== null && _rightWrapRef$current !== void 0 ? _rightWrapRef$current : 0\n    });\n  }, [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]);\n  useKineticScroll(kineticScrollPerfHack && browserIsSafari.value, onScroll, scroller);\n  const onScrollRef = React.useRef(onScroll);\n  onScrollRef.current = onScroll;\n  const lastProps = React.useRef();\n  const didFirstScroll = React.useRef(false);\n  React.useLayoutEffect(() => {\n    if (didFirstScroll.current) onScroll();else didFirstScroll.current = true;\n  }, [onScroll, paddingBottom, paddingRight]);\n  const setRefs = React.useCallback(instance => {\n    scroller.current = instance;\n    if (scrollRef !== undefined) {\n      scrollRef.current = instance;\n    }\n  }, [scrollRef]);\n  let key = 0;\n  let h = 0;\n  padders.push(_jsx(\"div\", {\n    style: {\n      width: scrollWidth,\n      height: 0\n    }\n  }, key++));\n  while (h < scrollHeight) {\n    const toAdd = Math.min(5000000, scrollHeight - h);\n    padders.push(_jsx(\"div\", {\n      style: {\n        width: 0,\n        height: toAdd\n      }\n    }, key++));\n    h += toAdd;\n  }\n  const {\n    ref,\n    width,\n    height\n  } = useResizeDetector(initialSize);\n  if (typeof window !== \"undefined\" && (((_lastProps$current = lastProps.current) === null || _lastProps$current === void 0 ? void 0 : _lastProps$current.height) !== height || ((_lastProps$current2 = lastProps.current) === null || _lastProps$current2 === void 0 ? void 0 : _lastProps$current2.width) !== width)) {\n    window.setTimeout(() => onScrollRef.current(), 0);\n    lastProps.current = {\n      width,\n      height\n    };\n  }\n  if ((width !== null && width !== void 0 ? width : 0) === 0 || (height !== null && height !== void 0 ? height : 0) === 0) return _jsx(\"div\", {\n    ref: ref\n  });\n  return _jsx(\"div\", {\n    ref: ref,\n    children: _jsxs(ScrollRegionStyle, {\n      isSafari: browserIsSafari.value,\n      children: [_jsx(\"div\", {\n        className: \"dvn-underlay\",\n        children: children\n      }), _jsx(\"div\", {\n        ref: setRefs,\n        style: lastProps.current,\n        draggable: draggable,\n        onDragStart: e => {\n          if (!draggable) {\n            e.stopPropagation();\n            e.preventDefault();\n          }\n        },\n        className: \"dvn-scroller \" + (className !== null && className !== void 0 ? className : \"\"),\n        onScroll: () => onScroll(),\n        children: _jsxs(\"div\", {\n          className: \"dvn-scroll-inner\" + (rightElement === undefined ? \" dvn-hidden\" : \"\"),\n          children: [_jsx(\"div\", {\n            className: \"dvn-stack\",\n            children: padders\n          }), rightElement !== undefined && _jsxs(_Fragment, {\n            children: [!rightElementFill && _jsx(\"div\", {\n              className: \"dvn-spacer\"\n            }), _jsx(\"div\", {\n              ref: rightWrapRef,\n              style: {\n                height,\n                maxHeight: clientHeight - Math.ceil(dpr % 1),\n                position: \"sticky\",\n                top: 0,\n                paddingLeft: 1,\n                marginBottom: -40,\n                marginRight: paddingRight,\n                flexGrow: rightElementFill ? 1 : undefined,\n                right: rightElementSticky ? paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0 : undefined,\n                pointerEvents: \"auto\"\n              },\n              children: rightElement\n            })]\n          })]\n        })\n      })]\n    })\n  });\n};\nInfiniteScroller.displayName = \"InfiniteScroller\";",".sj2f20c .dvn-scroller{overflow:var(--sj2f20c-0);-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}.sj2f20c .dvn-hidden{visibility:hidden;}.sj2f20c .dvn-scroll-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;pointer-events:none;}.sj2f20c .dvn-scroll-inner > *{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}.sj2f20c .dvn-scroll-inner .dvn-spacer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}.sj2f20c .dvn-scroll-inner .dvn-stack{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.sj2f20c .dvn-underlay > *{position:absolute;left:0;top:0;}.sj2f20c canvas{outline:none;}.sj2f20c canvas *{height:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvc2Nyb2xsaW5nLWRhdGEtZ3JpZC9pbmZpbml0ZS1zY3JvbGxlci50c3giXSwibmFtZXMiOlsiLnNqMmYyMGMiXSwibWFwcGluZ3MiOiJBQVMwQkEiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9zY3JvbGxpbmctZGF0YS1ncmlkL2luZmluaXRlLXNjcm9sbGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcmVzaXplLWRldGVjdG9yLmpzXCI7XG5pbXBvcnQgeyBicm93c2VySXNTYWZhcmkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Jyb3dzZXItZGV0ZWN0LmpzXCI7XG5pbXBvcnQgeyB1c2VFdmVudExpc3RlbmVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlscy5qc1wiO1xuaW1wb3J0IHVzZUtpbmV0aWNTY3JvbGwgZnJvbSBcIi4vdXNlLWtpbmV0aWMtc2Nyb2xsLmpzXCI7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBTY3JvbGxSZWdpb25TdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgLmR2bi1zY3JvbGxlciB7XG4gICAgICAgIG92ZXJmbG93OiAke3AgPT4gcC5pc1NhZmFyaSA/IFwic2Nyb2xsXCIgOiBcImF1dG9cIn07XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgLmR2bi1oaWRkZW4ge1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLmR2bi1zY3JvbGwtaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgICAgICA+ICoge1xuICAgICAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuZHZuLXNwYWNlciB7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAuZHZuLXN0YWNrIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmR2bi11bmRlcmxheSA+ICoge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICB9XG5cbiAgICBjYW52YXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuXG4gICAgICAgICoge1xuICAgICAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmZ1bmN0aW9uIHVzZVRvdWNoVXBEZWxheWVkKGRlbGF5KSB7XG4gIGNvbnN0IFtoYXNUb3VjaGVzLCBzZXRIYXNUb3VjaGVzXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgc2FmZVdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogd2luZG93O1xuICBjb25zdCBjYlRpbWVyID0gUmVhY3QudXNlUmVmKDApO1xuICB1c2VFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChjYlRpbWVyLmN1cnJlbnQpO1xuICAgIHNldEhhc1RvdWNoZXModHJ1ZSk7XG4gIH0sIFtdKSwgc2FmZVdpbmRvdywgdHJ1ZSwgZmFsc2UpO1xuICB1c2VFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgUmVhY3QudXNlQ2FsbGJhY2soZSA9PiB7XG4gICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNiVGltZXIuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHNldEhhc1RvdWNoZXMoZmFsc2UpLCBkZWxheSk7XG4gICAgfVxuICB9LCBbZGVsYXldKSwgc2FmZVdpbmRvdywgdHJ1ZSwgZmFsc2UpO1xuICByZXR1cm4gaGFzVG91Y2hlcztcbn1cbmV4cG9ydCBjb25zdCBJbmZpbml0ZVNjcm9sbGVyID0gcCA9PiB7XG4gIHZhciBfcmlnaHRFbGVtZW50UHJvcHMkc3QsIF9yaWdodEVsZW1lbnRQcm9wcyRmaSwgX2xhc3RQcm9wcyRjdXJyZW50LCBfbGFzdFByb3BzJGN1cnJlbnQyO1xuICBjb25zdCB7XG4gICAgY2hpbGRyZW4sXG4gICAgY2xpZW50SGVpZ2h0LFxuICAgIHNjcm9sbEhlaWdodCxcbiAgICBzY3JvbGxXaWR0aCxcbiAgICB1cGRhdGUsXG4gICAgZHJhZ2dhYmxlLFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcmV2ZW50RGlhZ29uYWxTY3JvbGxpbmcgPSBmYWxzZSxcbiAgICBwYWRkaW5nQm90dG9tID0gMCxcbiAgICBwYWRkaW5nUmlnaHQgPSAwLFxuICAgIHJpZ2h0RWxlbWVudCxcbiAgICByaWdodEVsZW1lbnRQcm9wcyxcbiAgICBraW5ldGljU2Nyb2xsUGVyZkhhY2sgPSBmYWxzZSxcbiAgICBzY3JvbGxSZWYsXG4gICAgaW5pdGlhbFNpemVcbiAgfSA9IHA7XG4gIGNvbnN0IHBhZGRlcnMgPSBbXTtcbiAgY29uc3QgcmlnaHRFbGVtZW50U3RpY2t5ID0gKF9yaWdodEVsZW1lbnRQcm9wcyRzdCA9IHJpZ2h0RWxlbWVudFByb3BzID09PSBudWxsIHx8IHJpZ2h0RWxlbWVudFByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByaWdodEVsZW1lbnRQcm9wcy5zdGlja3kpICE9PSBudWxsICYmIF9yaWdodEVsZW1lbnRQcm9wcyRzdCAhPT0gdm9pZCAwID8gX3JpZ2h0RWxlbWVudFByb3BzJHN0IDogZmFsc2U7XG4gIGNvbnN0IHJpZ2h0RWxlbWVudEZpbGwgPSAoX3JpZ2h0RWxlbWVudFByb3BzJGZpID0gcmlnaHRFbGVtZW50UHJvcHMgPT09IG51bGwgfHwgcmlnaHRFbGVtZW50UHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJpZ2h0RWxlbWVudFByb3BzLmZpbGwpICE9PSBudWxsICYmIF9yaWdodEVsZW1lbnRQcm9wcyRmaSAhPT0gdm9pZCAwID8gX3JpZ2h0RWxlbWVudFByb3BzJGZpIDogZmFsc2U7XG4gIGNvbnN0IG9mZnNldFkgPSBSZWFjdC51c2VSZWYoMCk7XG4gIGNvbnN0IGxhc3RTY3JvbGxZID0gUmVhY3QudXNlUmVmKDApO1xuICBjb25zdCBzY3JvbGxlciA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgZHByID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IDEgOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgY29uc3QgbGFzdFNjcm9sbFBvc2l0aW9uID0gUmVhY3QudXNlUmVmKHtcbiAgICBzY3JvbGxMZWZ0OiAwLFxuICAgIHNjcm9sbFRvcDogMCxcbiAgICBsb2NrRGlyZWN0aW9uOiB1bmRlZmluZWRcbiAgfSk7XG4gIGNvbnN0IHJpZ2h0V3JhcFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgaGFzVG91Y2hlcyA9IHVzZVRvdWNoVXBEZWxheWVkKDIwMCk7XG4gIGNvbnN0IFtpc0lkbGUsIHNldElzSWRsZV0gPSBSZWFjdC51c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgaWRsZVRpbWVyID0gUmVhY3QudXNlUmVmKDApO1xuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNJZGxlIHx8IGhhc1RvdWNoZXMgfHwgbGFzdFNjcm9sbFBvc2l0aW9uLmN1cnJlbnQubG9ja0RpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBzY3JvbGxlci5jdXJyZW50O1xuICAgIGlmIChlbCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IFtseCwgbHldID0gbGFzdFNjcm9sbFBvc2l0aW9uLmN1cnJlbnQubG9ja0RpcmVjdGlvbjtcbiAgICBpZiAobHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWwuc2Nyb2xsTGVmdCA9IGx4O1xuICAgIH0gZWxzZSBpZiAobHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWwuc2Nyb2xsVG9wID0gbHk7XG4gICAgfVxuICAgIGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gIH0sIFtoYXNUb3VjaGVzLCBpc0lkbGVdKTtcbiAgY29uc3Qgb25TY3JvbGwgPSBSZWFjdC51c2VDYWxsYmFjaygoc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wKSA9PiB7XG4gICAgdmFyIF9zY3JvbGxUb3AsIF9zY3JvbGxMZWZ0LCBfbG9jayQsIF9sb2NrJDIsIF9yaWdodFdyYXBSZWYkY3VycmVudCwgX3JpZ2h0V3JhcFJlZiRjdXJyZW50MjtcbiAgICBjb25zdCBlbCA9IHNjcm9sbGVyLmN1cnJlbnQ7XG4gICAgaWYgKGVsID09PSBudWxsKSByZXR1cm47XG4gICAgc2Nyb2xsVG9wID0gKF9zY3JvbGxUb3AgPSBzY3JvbGxUb3ApICE9PSBudWxsICYmIF9zY3JvbGxUb3AgIT09IHZvaWQgMCA/IF9zY3JvbGxUb3AgOiBlbC5zY3JvbGxUb3A7XG4gICAgc2Nyb2xsTGVmdCA9IChfc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQpICE9PSBudWxsICYmIF9zY3JvbGxMZWZ0ICE9PSB2b2lkIDAgPyBfc2Nyb2xsTGVmdCA6IGVsLnNjcm9sbExlZnQ7XG4gICAgY29uc3QgbGFzdFNjcm9sbFRvcCA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LnNjcm9sbFRvcDtcbiAgICBjb25zdCBsYXN0U2Nyb2xsTGVmdCA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LnNjcm9sbExlZnQ7XG4gICAgY29uc3QgZHggPSBzY3JvbGxMZWZ0IC0gbGFzdFNjcm9sbExlZnQ7XG4gICAgY29uc3QgZHkgPSBzY3JvbGxUb3AgLSBsYXN0U2Nyb2xsVG9wO1xuICAgIGlmIChoYXNUb3VjaGVzICYmIGR4ICE9PSAwICYmIGR5ICE9PSAwICYmIChNYXRoLmFicyhkeCkgPiAzIHx8IE1hdGguYWJzKGR5KSA+IDMpICYmIHByZXZlbnREaWFnb25hbFNjcm9sbGluZyAmJiBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5sb2NrRGlyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb24gPSBNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhkeSkgPyBbbGFzdFNjcm9sbExlZnQsIHVuZGVmaW5lZF0gOiBbdW5kZWZpbmVkLCBsYXN0U2Nyb2xsVG9wXTtcbiAgICB9XG4gICAgY29uc3QgbG9jayA9IGxhc3RTY3JvbGxQb3NpdGlvbi5jdXJyZW50LmxvY2tEaXJlY3Rpb247XG4gICAgc2Nyb2xsTGVmdCA9IChfbG9jayQgPSBsb2NrID09PSBudWxsIHx8IGxvY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvY2tbMF0pICE9PSBudWxsICYmIF9sb2NrJCAhPT0gdm9pZCAwID8gX2xvY2skIDogc2Nyb2xsTGVmdDtcbiAgICBzY3JvbGxUb3AgPSAoX2xvY2skMiA9IGxvY2sgPT09IG51bGwgfHwgbG9jayA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9ja1sxXSkgIT09IG51bGwgJiYgX2xvY2skMiAhPT0gdm9pZCAwID8gX2xvY2skMiA6IHNjcm9sbFRvcDtcbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24uY3VycmVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgY29uc3QgY1dpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgY0hlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBuZXdZID0gc2Nyb2xsVG9wO1xuICAgIGNvbnN0IGRlbHRhID0gbGFzdFNjcm9sbFkuY3VycmVudCAtIG5ld1k7XG4gICAgY29uc3Qgc2Nyb2xsYWJsZUhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCAtIGNIZWlnaHQ7XG4gICAgbGFzdFNjcm9sbFkuY3VycmVudCA9IG5ld1k7XG4gICAgaWYgKHNjcm9sbGFibGVIZWlnaHQgPiAwICYmIChNYXRoLmFicyhkZWx0YSkgPiAyMDAwIHx8IG5ld1kgPT09IDAgfHwgbmV3WSA9PT0gc2Nyb2xsYWJsZUhlaWdodCkgJiYgc2Nyb2xsSGVpZ2h0ID4gZWwuc2Nyb2xsSGVpZ2h0ICsgNSkge1xuICAgICAgY29uc3QgcHJvZyA9IG5ld1kgLyBzY3JvbGxhYmxlSGVpZ2h0O1xuICAgICAgY29uc3QgcmVjb21wdXRlZCA9IChzY3JvbGxIZWlnaHQgLSBjSGVpZ2h0KSAqIHByb2c7XG4gICAgICBvZmZzZXRZLmN1cnJlbnQgPSByZWNvbXB1dGVkIC0gbmV3WTtcbiAgICB9XG4gICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChpZGxlVGltZXIuY3VycmVudCk7XG4gICAgICBzZXRJc0lkbGUoZmFsc2UpO1xuICAgICAgaWRsZVRpbWVyLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBzZXRJc0lkbGUodHJ1ZSksIDIwMCk7XG4gICAgfVxuICAgIHVwZGF0ZSh7XG4gICAgICB4OiBzY3JvbGxMZWZ0LFxuICAgICAgeTogbmV3WSArIG9mZnNldFkuY3VycmVudCxcbiAgICAgIHdpZHRoOiBjV2lkdGggLSBwYWRkaW5nUmlnaHQsXG4gICAgICBoZWlnaHQ6IGNIZWlnaHQgLSBwYWRkaW5nQm90dG9tLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAoX3JpZ2h0V3JhcFJlZiRjdXJyZW50ID0gKF9yaWdodFdyYXBSZWYkY3VycmVudDIgPSByaWdodFdyYXBSZWYuY3VycmVudCkgPT09IG51bGwgfHwgX3JpZ2h0V3JhcFJlZiRjdXJyZW50MiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3JpZ2h0V3JhcFJlZiRjdXJyZW50Mi5jbGllbnRXaWR0aCkgIT09IG51bGwgJiYgX3JpZ2h0V3JhcFJlZiRjdXJyZW50ICE9PSB2b2lkIDAgPyBfcmlnaHRXcmFwUmVmJGN1cnJlbnQgOiAwXG4gICAgfSk7XG4gIH0sIFtwYWRkaW5nQm90dG9tLCBwYWRkaW5nUmlnaHQsIHNjcm9sbEhlaWdodCwgdXBkYXRlLCBwcmV2ZW50RGlhZ29uYWxTY3JvbGxpbmcsIGhhc1RvdWNoZXNdKTtcbiAgdXNlS2luZXRpY1Njcm9sbChraW5ldGljU2Nyb2xsUGVyZkhhY2sgJiYgYnJvd3NlcklzU2FmYXJpLnZhbHVlLCBvblNjcm9sbCwgc2Nyb2xsZXIpO1xuICBjb25zdCBvblNjcm9sbFJlZiA9IFJlYWN0LnVzZVJlZihvblNjcm9sbCk7XG4gIG9uU2Nyb2xsUmVmLmN1cnJlbnQgPSBvblNjcm9sbDtcbiAgY29uc3QgbGFzdFByb3BzID0gUmVhY3QudXNlUmVmKCk7XG4gIGNvbnN0IGRpZEZpcnN0U2Nyb2xsID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkRmlyc3RTY3JvbGwuY3VycmVudCkgb25TY3JvbGwoKTtlbHNlIGRpZEZpcnN0U2Nyb2xsLmN1cnJlbnQgPSB0cnVlO1xuICB9LCBbb25TY3JvbGwsIHBhZGRpbmdCb3R0b20sIHBhZGRpbmdSaWdodF0pO1xuICBjb25zdCBzZXRSZWZzID0gUmVhY3QudXNlQ2FsbGJhY2soaW5zdGFuY2UgPT4ge1xuICAgIHNjcm9sbGVyLmN1cnJlbnQgPSBpbnN0YW5jZTtcbiAgICBpZiAoc2Nyb2xsUmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjcm9sbFJlZi5jdXJyZW50ID0gaW5zdGFuY2U7XG4gICAgfVxuICB9LCBbc2Nyb2xsUmVmXSk7XG4gIGxldCBrZXkgPSAwO1xuICBsZXQgaCA9IDA7XG4gIHBhZGRlcnMucHVzaChfanN4KFwiZGl2XCIsIHtcbiAgICBzdHlsZToge1xuICAgICAgd2lkdGg6IHNjcm9sbFdpZHRoLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfVxuICB9LCBrZXkrKykpO1xuICB3aGlsZSAoaCA8IHNjcm9sbEhlaWdodCkge1xuICAgIGNvbnN0IHRvQWRkID0gTWF0aC5taW4oNTAwMDAwMCwgc2Nyb2xsSGVpZ2h0IC0gaCk7XG4gICAgcGFkZGVycy5wdXNoKF9qc3goXCJkaXZcIiwge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogdG9BZGRcbiAgICAgIH1cbiAgICB9LCBrZXkrKykpO1xuICAgIGggKz0gdG9BZGQ7XG4gIH1cbiAgY29uc3Qge1xuICAgIHJlZixcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfSA9IHVzZVJlc2l6ZURldGVjdG9yKGluaXRpYWxTaXplKTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgKCgoX2xhc3RQcm9wcyRjdXJyZW50ID0gbGFzdFByb3BzLmN1cnJlbnQpID09PSBudWxsIHx8IF9sYXN0UHJvcHMkY3VycmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xhc3RQcm9wcyRjdXJyZW50LmhlaWdodCkgIT09IGhlaWdodCB8fCAoKF9sYXN0UHJvcHMkY3VycmVudDIgPSBsYXN0UHJvcHMuY3VycmVudCkgPT09IG51bGwgfHwgX2xhc3RQcm9wcyRjdXJyZW50MiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xhc3RQcm9wcyRjdXJyZW50Mi53aWR0aCkgIT09IHdpZHRoKSkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IG9uU2Nyb2xsUmVmLmN1cnJlbnQoKSwgMCk7XG4gICAgbGFzdFByb3BzLmN1cnJlbnQgPSB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH07XG4gIH1cbiAgaWYgKCh3aWR0aCAhPT0gbnVsbCAmJiB3aWR0aCAhPT0gdm9pZCAwID8gd2lkdGggOiAwKSA9PT0gMCB8fCAoaGVpZ2h0ICE9PSBudWxsICYmIGhlaWdodCAhPT0gdm9pZCAwID8gaGVpZ2h0IDogMCkgPT09IDApIHJldHVybiBfanN4KFwiZGl2XCIsIHtcbiAgICByZWY6IHJlZlxuICB9KTtcbiAgcmV0dXJuIF9qc3goXCJkaXZcIiwge1xuICAgIHJlZjogcmVmLFxuICAgIGNoaWxkcmVuOiBfanN4cyhTY3JvbGxSZWdpb25TdHlsZSwge1xuICAgICAgaXNTYWZhcmk6IGJyb3dzZXJJc1NhZmFyaS52YWx1ZSxcbiAgICAgIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJkdm4tdW5kZXJsYXlcIixcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICB9KSwgX2pzeChcImRpdlwiLCB7XG4gICAgICAgIHJlZjogc2V0UmVmcyxcbiAgICAgICAgc3R5bGU6IGxhc3RQcm9wcy5jdXJyZW50LFxuICAgICAgICBkcmFnZ2FibGU6IGRyYWdnYWJsZSxcbiAgICAgICAgb25EcmFnU3RhcnQ6IGUgPT4ge1xuICAgICAgICAgIGlmICghZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lOiBcImR2bi1zY3JvbGxlciBcIiArIChjbGFzc05hbWUgIT09IG51bGwgJiYgY2xhc3NOYW1lICE9PSB2b2lkIDAgPyBjbGFzc05hbWUgOiBcIlwiKSxcbiAgICAgICAgb25TY3JvbGw6ICgpID0+IG9uU2Nyb2xsKCksXG4gICAgICAgIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcImR2bi1zY3JvbGwtaW5uZXJcIiArIChyaWdodEVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiIGR2bi1oaWRkZW5cIiA6IFwiXCIpLFxuICAgICAgICAgIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZHZuLXN0YWNrXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogcGFkZGVyc1xuICAgICAgICAgIH0pLCByaWdodEVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBfanN4cyhfRnJhZ21lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbIXJpZ2h0RWxlbWVudEZpbGwgJiYgX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkdm4tc3BhY2VyXCJcbiAgICAgICAgICAgIH0pLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgcmVmOiByaWdodFdyYXBSZWYsXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogY2xpZW50SGVpZ2h0IC0gTWF0aC5jZWlsKGRwciAlIDEpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInN0aWNreVwiLFxuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogMSxcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IC00MCxcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogcGFkZGluZ1JpZ2h0LFxuICAgICAgICAgICAgICAgIGZsZXhHcm93OiByaWdodEVsZW1lbnRGaWxsID8gMSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICByaWdodDogcmlnaHRFbGVtZW50U3RpY2t5ID8gcGFkZGluZ1JpZ2h0ICE9PSBudWxsICYmIHBhZGRpbmdSaWdodCAhPT0gdm9pZCAwID8gcGFkZGluZ1JpZ2h0IDogMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjaGlsZHJlbjogcmlnaHRFbGVtZW50XG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfSlcbiAgICAgIH0pXVxuICAgIH0pXG4gIH0pO1xufTtcbkluZmluaXRlU2Nyb2xsZXIuZGlzcGxheU5hbWUgPSBcIkluZmluaXRlU2Nyb2xsZXJcIjsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/internal/scrolling-data-grid/infinite-scroller.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx":
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_infinite_scroller_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/scrolling-data-grid/infinite-scroller.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_infinite_scroller_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_infinite_scroller_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_infinite_scroller_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_infinite_scroller_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=990.5c12f8e2.iframe.bundle.js.map