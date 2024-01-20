"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4981],{

/***/ "./packages/core/dist/esm/common/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fg": () => (/* binding */ useTheme),
/* harmony export */   "Ni": () => (/* binding */ ThemeContext),
/* harmony export */   "Zu": () => (/* binding */ getDataEditorTheme),
/* harmony export */   "be": () => (/* binding */ makeCSSStyle),
/* harmony export */   "yR": () => (/* binding */ mergeAndRealizeTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");

function makeCSSStyle(theme) {
  var _theme$textGroupHeade, _theme$horizontalBord;
  return {
    "--gdg-accent-color": theme.accentColor,
    "--gdg-accent-fg": theme.accentFg,
    "--gdg-accent-light": theme.accentLight,
    "--gdg-text-dark": theme.textDark,
    "--gdg-text-medium": theme.textMedium,
    "--gdg-text-light": theme.textLight,
    "--gdg-text-bubble": theme.textBubble,
    "--gdg-bg-icon-header": theme.bgIconHeader,
    "--gdg-fg-icon-header": theme.fgIconHeader,
    "--gdg-text-header": theme.textHeader,
    "--gdg-text-group-header": (_theme$textGroupHeade = theme.textGroupHeader) !== null && _theme$textGroupHeade !== void 0 ? _theme$textGroupHeade : theme.textHeader,
    "--gdg-text-header-selected": theme.textHeaderSelected,
    "--gdg-bg-cell": theme.bgCell,
    "--gdg-bg-cell-medium": theme.bgCellMedium,
    "--gdg-bg-header": theme.bgHeader,
    "--gdg-bg-header-has-focus": theme.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": theme.bgHeaderHovered,
    "--gdg-bg-bubble": theme.bgBubble,
    "--gdg-bg-bubble-selected": theme.bgBubbleSelected,
    "--gdg-bg-search-result": theme.bgSearchResult,
    "--gdg-border-color": theme.borderColor,
    "--gdg-horizontal-border-color": (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor,
    "--gdg-drilldown-border": theme.drilldownBorder,
    "--gdg-link-color": theme.linkColor,
    "--gdg-cell-horizontal-padding": `${theme.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${theme.cellVerticalPadding}px`,
    "--gdg-header-font-style": theme.headerFontStyle,
    "--gdg-base-font-style": theme.baseFontStyle,
    "--gdg-marker-font-style": theme.markerFontStyle,
    "--gdg-font-family": theme.fontFamily,
    "--gdg-editor-font-size": theme.editorFontSize,
    ...(theme.roundingRadius === undefined ? {} : {
      "--gdg-rounding-radius": `${theme.roundingRadius}px`
    })
  };
}
const dataEditorBaseTheme = {
  accentColor: "#4F5DFF",
  accentFg: "#FFFFFF",
  accentLight: "rgba(62, 116, 253, 0.1)",
  textDark: "#313139",
  textMedium: "#737383",
  textLight: "#B2B2C0",
  textBubble: "#313139",
  bgIconHeader: "#737383",
  fgIconHeader: "#FFFFFF",
  textHeader: "#313139",
  textGroupHeader: "#313139BB",
  textHeaderSelected: "#FFFFFF",
  bgCell: "#FFFFFF",
  bgCellMedium: "#FAFAFB",
  bgHeader: "#F7F7F8",
  bgHeaderHasFocus: "#E9E9EB",
  bgHeaderHovered: "#EFEFF1",
  bgBubble: "#EDEDF3",
  bgBubbleSelected: "#FFFFFF",
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#4F5DFF",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerIconSize: 18,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  markerFontStyle: "9px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  editorFontSize: "13px",
  lineHeight: 1.4
};
function getDataEditorTheme() {
  return dataEditorBaseTheme;
}
const ThemeContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(dataEditorBaseTheme);
function useTheme() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext);
}
function mergeAndRealizeTheme(theme) {
  const merged = {
    ...theme
  };
  for (var _len = arguments.length, overlays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    overlays[_key - 1] = arguments[_key];
  }
  for (const overlay of overlays) {
    if (overlay !== undefined) {
      for (const key in overlay) {
        if (overlay.hasOwnProperty(key)) {
          merged[key] = overlay[key];
        }
      }
    }
  }
  if (merged.headerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.headerFontStyle !== merged.headerFontStyle) {
    merged.headerFontFull = `${merged.headerFontStyle} ${merged.fontFamily}`;
  }
  if (merged.baseFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.baseFontStyle !== merged.baseFontStyle) {
    merged.baseFontFull = `${merged.baseFontStyle} ${merged.fontFamily}`;
  }
  if (merged.markerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.markerFontStyle !== merged.markerFontStyle) {
    merged.markerFontFull = `${merged.markerFontStyle} ${merged.fontFamily}`;
  }
  return merged;
}

/***/ }),

/***/ "./packages/core/dist/esm/common/support.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NG": () => (/* binding */ proveType),
/* harmony export */   "hu": () => (/* binding */ assert),
/* harmony export */   "vE": () => (/* binding */ assertNever),
/* harmony export */   "vZ": () => (/* binding */ deepEqual),
/* harmony export */   "wY": () => (/* binding */ maybe)
/* harmony export */ });
function proveType(_val) {}
function panic() {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This should not happen";
  throw new Error(message);
}
function assert(fact) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Assertion failed";
  if (fact) return;
  return panic(message);
}
function assertNever(_never, msg) {
  return panic(msg !== null && msg !== void 0 ? msg : "Hell froze over");
}
function maybe(fn, defaultValue) {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
const has = Object.prototype.hasOwnProperty;
function deepEqual(foo, bar) {
  let ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && deepEqual(foo[len], bar[len]));
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

/***/ }),

/***/ "./packages/core/dist/esm/common/utils.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ht": () => (/* binding */ degreesToRadians),
/* harmony export */   "Iz": () => (/* binding */ getScrollBarWidth),
/* harmony export */   "MC": () => (/* binding */ Checkmark),
/* harmony export */   "OR": () => (/* binding */ useEventListener),
/* harmony export */   "Qo": () => (/* binding */ getSquareWidth),
/* harmony export */   "Qy": () => (/* binding */ useDebouncedMemo),
/* harmony export */   "Wy": () => (/* binding */ EditPencil),
/* harmony export */   "XC": () => (/* binding */ getSquareXPosFromAlign),
/* harmony export */   "ig": () => (/* binding */ useStateWithReactiveInput),
/* harmony export */   "jM": () => (/* binding */ makeAccessibilityStringForArray),
/* harmony export */   "kq": () => (/* binding */ getSquareBB),
/* harmony export */   "o7": () => (/* binding */ direction),
/* harmony export */   "qJ": () => (/* binding */ whenDefined),
/* harmony export */   "qq": () => (/* binding */ pointIsWithinBB),
/* harmony export */   "vE": () => (/* binding */ useDeepMemo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _support_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/dist/esm/common/support.js");



function useEventListener(eventName, handler, element, passive) {
  let capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const savedHandler = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  savedHandler.current = handler;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (element === null || element.addEventListener === undefined) return;
    const el = element;
    const eventListener = event => {
      var _savedHandler$current;
      (_savedHandler$current = savedHandler.current) === null || _savedHandler$current === void 0 || _savedHandler$current.call(el, event);
    };
    el.addEventListener(eventName, eventListener, {
      passive,
      capture
    });
    return () => {
      el.removeEventListener(eventName, eventListener, {
        capture
      });
    };
  }, [eventName, element, passive, capture]);
}
function whenDefined(obj, result) {
  return obj === undefined ? undefined : result;
}
const PI = Math.PI;
function degreesToRadians(degrees) {
  return degrees * PI / 180;
}
const getSquareBB = (posX, posY, squareSideLength) => ({
  x1: posX - squareSideLength / 2,
  y1: posY - squareSideLength / 2,
  x2: posX + squareSideLength / 2,
  y2: posY + squareSideLength / 2
});
const getSquareXPosFromAlign = (alignment, containerX, containerWidth, horizontalPadding, squareWidth) => {
  switch (alignment) {
    case "left":
      return Math.floor(containerX) + horizontalPadding + squareWidth / 2;
    case "center":
      return Math.floor(containerX + containerWidth / 2);
    case "right":
      return Math.floor(containerX + containerWidth) - horizontalPadding - squareWidth / 2;
  }
};
const getSquareWidth = (maxSize, containerHeight, verticalPadding) => Math.min(maxSize, containerHeight - verticalPadding * 2);
const pointIsWithinBB = (x, y, bb) => bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;
const EditPencil = props => {
  var _props$fgColor;
  const fg = (_props$fgColor = props.fgColor) !== null && _props$fgColor !== void 0 ? _props$fgColor : "currentColor";
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929",
    stroke: fg,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    vectorEffect: "non-scaling-stroke"
  }), react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z",
    stroke: fg,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    vectorEffect: "non-scaling-stroke"
  }));
};
const Checkmark = props => {
  var _props$fgColor2;
  const fg = (_props$fgColor2 = props.fgColor) !== null && _props$fgColor2 !== void 0 ? _props$fgColor2 : "currentColor";
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M19 6L10.3802 17L5.34071 11.8758",
    vectorEffect: "non-scaling-stroke",
    stroke: fg,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
function useDebouncedMemo(factory, deps, time) {
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(factory);
  const mountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => () => {
    mountedRef.current = false;
  }, []);
  const debouncedSetState = react__WEBPACK_IMPORTED_MODULE_0__.useRef(lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1___default()(x => {
    if (mountedRef.current) {
      setState(x);
    }
  }, time));
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    if (mountedRef.current) {
      debouncedSetState.current(() => factory());
    }
  }, deps);
  return state;
}
const rtlRange = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
const ltrRange = "A-Za-z\u00C0-\u00D6\u00D8-\u00F6" + "\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" + "\uFE00-\uFE6F\uFEFD-\uFFFF";
const rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
function direction(value) {
  return rtl.test(value) ? "rtl" : "not-rtl";
}
let scrollbarWidthCache = undefined;
function getScrollBarWidth() {
  if (typeof document === "undefined") return 0;
  if (scrollbarWidthCache !== undefined) return scrollbarWidthCache;
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  const outer = document.createElement("div");
  outer.id = "testScrollbar";
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.append(inner);
  document.body.append(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  scrollbarWidthCache = w1 - w2;
  return scrollbarWidthCache;
}
const empty = Symbol();
function useStateWithReactiveInput(inputState) {
  const inputStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([empty, inputState]);
  if (inputStateRef.current[1] !== inputState) {
    inputStateRef.current[0] = inputState;
  }
  inputStateRef.current[1] = inputState;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(inputState);
  const [, forceRender] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const setStateOuter = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(nv => {
    const s = inputStateRef.current[0];
    if (s !== empty) {
      nv = typeof nv === "function" ? nv(s) : nv;
      if (nv === s) return;
    }
    if (s !== empty) forceRender({});
    setState(pv => {
      if (typeof nv === "function") {
        return nv(s === empty ? pv : s);
      }
      return nv;
    });
    inputStateRef.current[0] = empty;
  }, []);
  const onEmpty = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    inputStateRef.current[0] = empty;
    forceRender({});
  }, []);
  return [inputStateRef.current[0] === empty ? state : inputStateRef.current[0], setStateOuter, onEmpty];
}
function makeAccessibilityStringForArray(arr) {
  if (arr.length === 0) {
    return "";
  }
  let index = 0;
  let count = 0;
  for (const str of arr) {
    count += str.length;
    if (count > 10000) break;
    index++;
  }
  return arr.slice(0, index).join(", ");
}
function useDeepMemo(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
  if (!(0,_support_js__WEBPACK_IMPORTED_MODULE_2__/* .deepEqual */ .vZ)(value, ref.current)) {
    ref.current = value;
  }
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ref.current, [ref.current]);
}

/***/ }),

/***/ "./packages/core/dist/esm/data-editor-all.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "F": () => (/* binding */ DataEditorAll)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/common/support.js
var support = __webpack_require__("./packages/core/dist/esm/common/support.js");
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
var lodash_range = __webpack_require__("./node_modules/lodash/range.js");
var range_default = /*#__PURE__*/__webpack_require__.n(lodash_range);
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("./node_modules/lodash/debounce.js");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/data-grid/data-grid-types.js
var data_grid_types = __webpack_require__("./packages/core/dist/esm/internal/data-grid/data-grid-types.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-lib.js
var data_grid_lib = __webpack_require__("./packages/core/dist/esm/internal/data-grid/render/data-grid-lib.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/render-state-provider.js

const rowShift = 1 << 21;
function packColRowToNumber(col, row) {
  return (row + 2) * rowShift + col;
}
function unpackCol(packed) {
  return packed % rowShift;
}
function unpackRow(packed) {
  return Math.floor(packed / rowShift) - 2;
}
function unpackNumberToColRow(packed) {
  const col = unpackCol(packed);
  const row = unpackRow(packed);
  return [col, row];
}
class WindowingTrackerBase {
  constructor() {
    this.visibleWindow = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.freezeCols = 0;
    this.freezeRows = [];
    this.isInWindow = packed => {
      const col = unpackCol(packed);
      const row = unpackRow(packed);
      const w = this.visibleWindow;
      const colInWindow = col >= w.x && col <= w.x + w.width || col < this.freezeCols;
      const rowInWindow = row >= w.y && row <= w.y + w.height || this.freezeRows.includes(row);
      return colInWindow && rowInWindow;
    };
  }
  setWindow(newWindow, freezeCols, freezeRows) {
    if (this.visibleWindow.x === newWindow.x && this.visibleWindow.y === newWindow.y && this.visibleWindow.width === newWindow.width && this.visibleWindow.height === newWindow.height && this.freezeCols === freezeCols && (0,support/* deepEqual */.vZ)(this.freezeRows, freezeRows)) return;
    this.visibleWindow = newWindow;
    this.freezeCols = freezeCols;
    this.freezeRows = freezeRows;
    this.clearOutOfWindow();
  }
}
class RenderStateProvider extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.cache = new Map();
    this.setValue = (location, state) => {
      this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };
    this.getValue = location => {
      return this.cache.get(packColRowToNumber(location[0], location[1]));
    };
    this.clearOutOfWindow = () => {
      for (const [key] of this.cache.entries()) {
        if (!this.isInWindow(key)) {
          this.cache.delete(key);
        }
      }
    };
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/cell-set.js

class CellSet {
  constructor() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.cells = void 0;
    this.cells = new Set(items.map(x => packColRowToNumber(x[0], x[1])));
  }
  add(cell) {
    this.cells.add(packColRowToNumber(cell[0], cell[1]));
  }
  has(cell) {
    if (cell === undefined) return false;
    return this.cells.has(packColRowToNumber(cell[0], cell[1]));
  }
  remove(cell) {
    this.cells.delete(packColRowToNumber(cell[0], cell[1]));
  }
  clear() {
    this.cells.clear();
  }
  get size() {
    return this.cells.size;
  }
  hasHeader() {
    for (const cellNumber of this.cells) {
      const row = unpackRow(cellNumber);
      if (row < 0) return true;
    }
    return false;
  }
  hasItemInRectangle(rect) {
    for (let row = rect.y; row < rect.y + rect.height; row++) {
      for (let col = rect.x; col < rect.x + rect.width; col++) {
        if (this.cells.has(packColRowToNumber(col, row))) {
          return true;
        }
      }
    }
    return false;
  }
  hasItemInRegion(rect) {
    for (const r of rect) {
      if (this.hasItemInRectangle(r)) {
        return true;
      }
    }
    return false;
  }
  *values() {
    for (const cellNumber of this.cells) {
      yield unpackNumberToColRow(cellNumber);
    }
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/data-grid-sprites.js

function getColors(variant, theme) {
  if (variant === "normal") {
    return [theme.bgIconHeader, theme.fgIconHeader];
  } else if (variant === "selected") {
    return ["white", theme.accentColor];
  } else {
    return [theme.accentColor, theme.bgHeader];
  }
}
class SpriteManager {
  constructor(headerIcons, onSettled) {
    this.onSettled = void 0;
    this.spriteMap = new Map();
    this.headerIcons = void 0;
    this.inFlight = 0;
    this.onSettled = onSettled;
    this.headerIcons = headerIcons !== null && headerIcons !== void 0 ? headerIcons : {};
  }
  drawSprite(sprite, variant, ctx, x, y, size, theme) {
    let alpha = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    const [bgColor, fgColor] = getColors(variant, theme);
    const rSize = size * Math.ceil(window.devicePixelRatio);
    const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;
    let spriteCanvas = this.spriteMap.get(key);
    if (spriteCanvas === undefined) {
      const spriteCb = this.headerIcons[sprite];
      if (spriteCb === undefined) return;
      spriteCanvas = document.createElement("canvas");
      const spriteCtx = spriteCanvas.getContext("2d");
      if (spriteCtx === null) return;
      const imgSource = new Image();
      imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(spriteCb({
        fgColor,
        bgColor
      }))}`;
      this.spriteMap.set(key, spriteCanvas);
      const promise = imgSource.decode();
      if (promise === undefined) return;
      this.inFlight++;
      promise.then(() => {
        spriteCtx.drawImage(imgSource, 0, 0, rSize, rSize);
      }).finally(() => {
        this.inFlight--;
        if (this.inFlight === 0) {
          this.onSettled();
        }
      });
    } else {
      if (alpha < 1) {
        ctx.globalAlpha = alpha;
      }
      ctx.drawImage(spriteCanvas, 0, 0, rSize, rSize, x, y, size, size);
      if (alpha < 1) {
        ctx.globalAlpha = 1;
      }
    }
  }
}
// EXTERNAL MODULE: ./packages/core/dist/esm/common/utils.js
var utils = __webpack_require__("./packages/core/dist/esm/common/utils.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/data-grid/color-parser.js
var color_parser = __webpack_require__("./packages/core/dist/esm/internal/data-grid/color-parser.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.walk.js


function getSkipPoint(drawRegions) {
  if (drawRegions.length === 0) return undefined;
  let drawRegionsLowestY;
  for (const dr of drawRegions) {
    var _drawRegionsLowestY;
    drawRegionsLowestY = Math.min((_drawRegionsLowestY = drawRegionsLowestY) !== null && _drawRegionsLowestY !== void 0 ? _drawRegionsLowestY : dr.y, dr.y);
  }
}
function walkRowsInCol(startRow, drawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipToY, cb) {
  var _skipToY;
  skipToY = (_skipToY = skipToY) !== null && _skipToY !== void 0 ? _skipToY : drawY;
  let y = drawY;
  let row = startRow;
  const rowEnd = rows - freezeTrailingRows;
  let didBreak = false;
  while (y < height && row < rowEnd) {
    const rh = getRowHeight(row);
    if (y + rh > skipToY && cb(y, row, rh, false, hasAppendRow && row === rows - 1) === true) {
      didBreak = true;
      break;
    }
    y += rh;
    row++;
  }
  if (didBreak) return;
  y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    row = rows - 1 - fr;
    const rh = getRowHeight(row);
    y -= rh;
    cb(y, row, rh, true, hasAppendRow && row === rows - 1);
  }
}
function walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  const drawY = totalHeaderHeight + translateY;
  for (const c of effectiveCols) {
    const drawX = c.sticky ? clipX : x + translateX;
    if (cb(c, drawX, drawY, clipX, cellYOffset) === true) {
      break;
    }
    x += c.width;
    clipX += c.sticky ? c.width : 0;
  }
}
function walkGroups(effectiveCols, width, translateX, groupHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  for (let index = 0; index < effectiveCols.length; index++) {
    var _startCol$group;
    const startCol = effectiveCols[index];
    let end = index + 1;
    let boxWidth = startCol.width;
    if (startCol.sticky) {
      clipX += boxWidth;
    }
    while (end < effectiveCols.length && (0,data_grid_lib/* isGroupEqual */.PU)(effectiveCols[end].group, startCol.group) && effectiveCols[end].sticky === effectiveCols[index].sticky) {
      const endCol = effectiveCols[end];
      boxWidth += endCol.width;
      end++;
      index++;
      if (endCol.sticky) {
        clipX += endCol.width;
      }
    }
    const t = startCol.sticky ? 0 : translateX;
    const localX = x + t;
    const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
    const w = Math.min(boxWidth - delta, width - (localX + delta));
    cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], (_startCol$group = startCol.group) !== null && _startCol$group !== void 0 ? _startCol$group : "", localX + delta, 0, w, groupHeaderHeight);
    x += boxWidth;
  }
}
function getSpanBounds(span, cellX, cellY, cellW, cellH, column, allColumns) {
  var _allColumns$find$sour, _allColumns$find;
  const [startCol, endCol] = span;
  let frozenRect;
  let contentRect;
  const firstNonSticky = (_allColumns$find$sour = (_allColumns$find = allColumns.find(x => !x.sticky)) === null || _allColumns$find === void 0 ? void 0 : _allColumns$find.sourceIndex) !== null && _allColumns$find$sour !== void 0 ? _allColumns$find$sour : 0;
  if (endCol > firstNonSticky) {
    const renderFromCol = Math.max(startCol, firstNonSticky);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= endCol; x++) {
      tempW += allColumns[x].width;
    }
    contentRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  if (firstNonSticky > startCol) {
    const renderToCol = Math.min(endCol, firstNonSticky - 1);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= startCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
      tempW += allColumns[x].width;
    }
    frozenRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  return [frozenRect, contentRect];
}
// EXTERNAL MODULE: ./packages/core/dist/esm/common/styles.js
var styles = __webpack_require__("./packages/core/dist/esm/common/styles.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/math.js

function getClosestRect(rect, px, py, allowedDirections) {
  if (allowedDirections === "any") return combineRects(rect, {
    x: px,
    y: py,
    width: 1,
    height: 1
  });
  if (allowedDirections === "vertical") px = rect.x;
  if (allowedDirections === "horizontal") py = rect.y;
  if ((0,data_grid_lib/* itemIsInRect */.X4)([px, py], rect)) {
    return undefined;
  }
  const distanceToLeft = px - rect.x;
  const distanceToRight = rect.x + rect.width - px;
  const distanceToTop = py - rect.y + 1;
  const distanceToBottom = rect.y + rect.height - py;
  const minDistance = Math.min(allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToLeft, allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToRight, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToTop, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToBottom);
  if (minDistance === distanceToBottom) {
    return {
      x: rect.x,
      y: rect.y + rect.height,
      width: rect.width,
      height: py - rect.y - rect.height + 1
    };
  } else if (minDistance === distanceToTop) {
    return {
      x: rect.x,
      y: py,
      width: rect.width,
      height: rect.y - py
    };
  } else if (minDistance === distanceToRight) {
    return {
      x: rect.x + rect.width,
      y: rect.y,
      width: px - rect.x - rect.width + 1,
      height: rect.height
    };
  } else {
    return {
      x: px,
      y: rect.y,
      width: rect.x - px,
      height: rect.height
    };
  }
}
function intersectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}
function pointInRect(rect, x, y) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
function combineRects(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const width = Math.max(a.x + a.width, b.x + b.width) - x;
  const height = Math.max(a.y + a.height, b.y + b.height) - y;
  return {
    x,
    y,
    width,
    height
  };
}
function rectContains(a, b) {
  return a.x <= b.x && a.y <= b.y && a.x + a.width >= b.x + b.width && a.y + a.height >= b.y + b.height;
}
function hugRectToTarget(rect, width, height, mod) {
  if (rect.x > width || rect.y > height || rect.x < 0 && rect.y < 0 && rect.x + rect.width > width && rect.y + rect.height > height) {
    return undefined;
  }
  if (rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= height) {
    return rect;
  }
  const leftMax = -4;
  const topMax = -4;
  const rightMax = width + 4;
  const bottomMax = height + 4;
  const leftOverflow = leftMax - rect.x;
  const rightOverflow = rect.x + rect.width - rightMax;
  const topOverflow = topMax - rect.y;
  const bottomOverflow = rect.y + rect.height - bottomMax;
  const left = leftOverflow > 0 ? rect.x + Math.floor(leftOverflow / mod) * mod : rect.x;
  const right = rightOverflow > 0 ? rect.x + rect.width - Math.floor(rightOverflow / mod) * mod : rect.x + rect.width;
  const top = topOverflow > 0 ? rect.y + Math.floor(topOverflow / mod) * mod : rect.y;
  const bottom = bottomOverflow > 0 ? rect.y + rect.height - Math.floor(bottomOverflow / mod) * mod : rect.y + rect.height;
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}
function splitRectIntoRegions(rect, splitIndicies, width, height, splitLocations) {
  const [lSplit, tSplit, rSplit, bSplit] = splitIndicies;
  const [lClip, tClip, rClip, bClip] = splitLocations;
  const {
    x: inX,
    y: inY,
    width: inW,
    height: inH
  } = rect;
  const result = [];
  if (inW <= 0 || inH <= 0) return result;
  const inRight = inX + inW;
  const inBottom = inY + inH;
  const isOverLeft = inX < lSplit;
  const isOverTop = inY < tSplit;
  const isOverRight = inX + inW > rSplit;
  const isOverBottom = inY + inH > bSplit;
  const isOverCenterVert = inX > lSplit && inX < rSplit || inRight > lSplit && inRight < rSplit || inX < lSplit && inRight > rSplit;
  const isOverCenterHoriz = inY > tSplit && inY < bSplit || inBottom > tSplit && inBottom < bSplit || inY < tSplit && inBottom > bSplit;
  const isOverCenter = isOverCenterVert && isOverCenterHoriz;
  if (isOverCenter) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: tClip,
        width: rClip - lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverTop) {
    const x = inX;
    const y = inY;
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: 0,
        width: lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = inY;
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: 0,
        width: rClip - lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverRight) {
    const x = Math.max(inX, rSplit);
    const y = inY;
    const right = inRight;
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: 0,
        width: width - rClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverLeft && isOverCenterHoriz) {
    const x = inX;
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: tClip,
        width: lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverRight && isOverCenterHoriz) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, tSplit);
    const right = inRight;
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: tClip,
        width: width - rClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverBottom) {
    const x = inX;
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: bClip,
        width: lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverBottom && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: bClip,
        width: rClip - lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverRight && isOverBottom) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, bSplit);
    const right = inRight;
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: bClip,
        width: width - rClip + 1,
        height: height - bClip + 1
      }
    });
  }
  return result;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.cells.js







const loadingCell = {
  kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
  allowOverlay: false
};
function drawCells(ctx, effectiveColumns, allColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, outerTheme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth) {
  var _damage$size;
  let toDraw = (_damage$size = damage === null || damage === void 0 ? void 0 : damage.size) !== null && _damage$size !== void 0 ? _damage$size : Number.MAX_SAFE_INTEGER;
  const frameTime = performance.now();
  let font = outerTheme.baseFontFull;
  ctx.font = font;
  const deprepArg = {
    ctx
  };
  const cellIndex = [0, 0];
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) : 0;
  let result;
  let handledSpans = undefined;
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawStartY, clipX, startRow) => {
    var _c$group;
    const diff = Math.max(0, clipX - drawX);
    const colDrawX = drawX + diff;
    const colDrawY = totalHeaderHeight + 1;
    const colWidth = c.width - diff;
    const colHeight = height - totalHeaderHeight - 1;
    if (drawRegions.length > 0) {
      let found = false;
      for (let i = 0; i < drawRegions.length; i++) {
        const dr = drawRegions[i];
        if (intersectRect(colDrawX, colDrawY, colWidth, colHeight, dr.x, dr.y, dr.width, dr.height)) {
          found = true;
          break;
        }
      }
      if (!found) return;
    }
    const reclip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
      ctx.clip();
    };
    const colSelected = selection.columns.hasIndex(c.sourceIndex);
    const groupTheme = getGroupDetails((_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "").overrideTheme;
    const colTheme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : (0,styles/* mergeAndRealizeTheme */.yR)(outerTheme, groupTheme, c.themeOverride);
    const colFont = colTheme.baseFontFull;
    if (colFont !== font) {
      font = colFont;
      ctx.font = colFont;
    }
    reclip();
    let prepResult = undefined;
    walkRowsInCol(startRow, colDrawStartY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky, isTrailingRow) => {
      var _c$trailingRowOptions, _c$trailingRowOptions2;
      if (row < 0) return;
      cellIndex[0] = c.sourceIndex;
      cellIndex[1] = row;
      if (damage !== undefined && !damage.has(cellIndex)) {
        return;
      }
      if (drawRegions.length > 0) {
        let found = false;
        for (let i = 0; i < drawRegions.length; i++) {
          const dr = drawRegions[i];
          if (intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height)) {
            found = true;
            break;
          }
        }
        if (!found) return;
      }
      const rowSelected = selection.rows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      const cell = row < rows ? getCellContent(cellIndex) : loadingCell;
      let cellX = drawX;
      let cellWidth = c.width;
      let drawingSpan = false;
      let skipContents = false;
      if (cell.span !== undefined) {
        const [startCol, endCol] = cell.span;
        const spanKey = `${row},${startCol},${endCol},${c.sticky}`;
        if (handledSpans === undefined) handledSpans = new Set();
        if (!handledSpans.has(spanKey)) {
          const areas = getSpanBounds(cell.span, drawX, drawY, c.width, rh, c, allColumns);
          const area = c.sticky ? areas[0] : areas[1];
          if (!c.sticky && areas[0] !== undefined) {
            skipContents = true;
          }
          if (area !== undefined) {
            cellX = area.x;
            cellWidth = area.width;
            handledSpans.add(spanKey);
            ctx.restore();
            prepResult = undefined;
            ctx.save();
            ctx.beginPath();
            const d = Math.max(0, clipX - area.x);
            ctx.rect(area.x + d, drawY, area.width - d, rh);
            if (result === undefined) {
              result = [];
            }
            result.push({
              x: area.x + d,
              y: drawY,
              width: area.width - d,
              height: rh
            });
            ctx.clip();
            drawingSpan = true;
          }
        } else {
          toDraw--;
          return;
        }
      }
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const trailingTheme = isTrailingRow && ((_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.themeOverride) !== undefined ? (_c$trailingRowOptions2 = c.trailingRowOptions) === null || _c$trailingRowOptions2 === void 0 ? void 0 : _c$trailingRowOptions2.themeOverride : undefined;
      const theme = cell.themeOverride === undefined && rowTheme === undefined && trailingTheme === undefined ? colTheme : (0,styles/* mergeAndRealizeTheme */.yR)(colTheme, rowTheme, trailingTheme, cell.themeOverride);
      ctx.beginPath();
      const isSelected = (0,data_grid_lib/* cellIsSelected */.Sb)(cellIndex, cell, selection);
      let accentCount = (0,data_grid_lib/* cellIsInRange */.H1)(cellIndex, cell, selection);
      const spanIsHighlighted = cell.span !== undefined && selection.columns.some(index => cell.span !== undefined && index >= cell.span[0] && index <= cell.span[1]);
      if (isSelected && !isFocused && drawFocus) {
        accentCount = 0;
      } else if (isSelected) {
        accentCount = Math.max(accentCount, 1);
      }
      if (spanIsHighlighted) {
        accentCount++;
      }
      if (!isSelected) {
        if (rowSelected) accentCount++;
        if (colSelected && !isTrailingRow) accentCount++;
      }
      const bgCell = cell.kind === data_grid_types/* GridCellKind.Protected */.p6.Protected ? theme.bgCellMedium : theme.bgCell;
      let fill;
      if (isSticky || bgCell !== outerTheme.bgCell) {
        fill = (0,color_parser/* blend */.NH)(bgCell, fill);
      }
      if (accentCount > 0 || rowDisabled) {
        if (rowDisabled) {
          fill = (0,color_parser/* blend */.NH)(theme.bgHeader, fill);
        }
        for (let i = 0; i < accentCount; i++) {
          fill = (0,color_parser/* blend */.NH)(theme.accentLight, fill);
        }
      } else if (prelightCells !== undefined) {
        for (const pre of prelightCells) {
          if (pre[0] === c.sourceIndex && pre[1] === row) {
            fill = (0,color_parser/* blend */.NH)(theme.bgSearchResult, fill);
            break;
          }
        }
      }
      if (highlightRegions !== undefined) {
        for (let i = 0; i < highlightRegions.length; i++) {
          const region = highlightRegions[i];
          const r = region.range;
          if (region.style !== "solid-outline" && r.x <= c.sourceIndex && c.sourceIndex < r.x + r.width && r.y <= row && row < r.y + r.height) {
            fill = (0,color_parser/* blend */.NH)(region.color, fill);
          }
        }
      }
      let didDamageClip = false;
      if (damage !== undefined) {
        const top = drawY + 1;
        const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - freezeTrailingRowsHeight);
        const h = bottom - top;
        if (h !== rh - 1 || cellX + 1 <= clipX) {
          didDamageClip = true;
          ctx.save();
          ctx.beginPath();
          ctx.rect(cellX + 1, top, cellWidth - 1, h);
          ctx.clip();
        }
        fill = fill === undefined ? theme.bgCell : (0,color_parser/* blend */.NH)(fill, theme.bgCell);
      }
      const isLastColumn = c.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (fill !== undefined) {
        ctx.fillStyle = fill;
        if (prepResult !== undefined) {
          prepResult.fillStyle = fill;
        }
        if (damage !== undefined) {
          ctx.fillRect(cellX + 1, drawY + 1, cellWidth - (isLastColumn ? 2 : 1), rh - (isLastRow ? 2 : 1));
        } else {
          ctx.fillRect(cellX, drawY, cellWidth, rh);
        }
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 0.6;
      }
      let hoverValue;
      for (let i = 0; i < hoverValues.length; i++) {
        const hv = hoverValues[i];
        if (hv.item[0] === c.sourceIndex && hv.item[1] === row) {
          hoverValue = hv;
          break;
        }
      }
      if (cellWidth > minimumCellWidth && !skipContents) {
        var _fill, _hoverValue$hoverAmou, _hoverValue;
        const cellFont = theme.baseFontFull;
        if (cellFont !== font) {
          ctx.font = cellFont;
          font = cellFont;
        }
        prepResult = drawCell(ctx, cell, c.sourceIndex, row, isLastColumn, isLastRow, cellX, drawY, cellWidth, rh, accentCount > 0, theme, (_fill = fill) !== null && _fill !== void 0 ? _fill : theme.bgCell, imageLoader, spriteManager, (_hoverValue$hoverAmou = (_hoverValue = hoverValue) === null || _hoverValue === void 0 ? void 0 : _hoverValue.hoverAmount) !== null && _hoverValue$hoverAmou !== void 0 ? _hoverValue$hoverAmou : 0, hoverInfo, hyperWrapping, frameTime, drawCellCallback, prepResult, enqueue, renderStateProvider, getCellRenderer, overrideCursor);
      }
      if (didDamageClip) {
        ctx.restore();
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 1;
      }
      toDraw--;
      if (drawingSpan) {
        var _prepResult, _prepResult$deprep;
        ctx.restore();
        (_prepResult = prepResult) === null || _prepResult === void 0 || (_prepResult$deprep = _prepResult.deprep) === null || _prepResult$deprep === void 0 || _prepResult$deprep.call(_prepResult, deprepArg);
        prepResult = undefined;
        reclip();
        font = colFont;
        ctx.font = colFont;
      }
      return toDraw <= 0;
    });
    ctx.restore();
    return toDraw <= 0;
  });
  return result;
}
const allocatedItem = [0, 0];
const reusableRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
const drawState = [undefined, () => undefined];
let animationFrameRequested = false;
function animRequest() {
  animationFrameRequested = true;
}
function drawCell(ctx, cell, col, row, isLastCol, isLastRow, x, y, w, h, highlighted, theme, finalCellFillColor, imageLoader, spriteManager, hoverAmount, hoverInfo, hyperWrapping, frameTime, drawCellCallback, lastPrep, enqueue, renderStateProvider, getCellRenderer, overrideCursor) {
  let hoverX;
  let hoverY;
  if (hoverInfo !== undefined && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
    hoverX = hoverInfo[1][0];
    hoverY = hoverInfo[1][1];
  }
  let result = undefined;
  allocatedItem[0] = col;
  allocatedItem[1] = row;
  reusableRect.x = x;
  reusableRect.y = y;
  reusableRect.width = w;
  reusableRect.height = h;
  drawState[0] = renderStateProvider.getValue(allocatedItem);
  drawState[1] = val => renderStateProvider.setValue(allocatedItem, val);
  animationFrameRequested = false;
  const args = {
    ctx,
    theme,
    col,
    row,
    cell,
    rect: reusableRect,
    highlighted,
    cellFillColor: finalCellFillColor,
    hoverAmount,
    frameTime,
    hoverX,
    drawState,
    hoverY,
    imageLoader,
    spriteManager,
    hyperWrapping,
    overrideCursor: hoverX !== undefined ? overrideCursor : undefined,
    requestAnimationFrame: animRequest
  };
  const needsAnim = (0,data_grid_lib/* drawLastUpdateUnderlay */.vr)(args, cell.lastUpdated, frameTime, lastPrep, isLastCol, isLastRow);
  const r = getCellRenderer(cell);
  if (r !== undefined) {
    var _lastPrep, _r$drawPrep;
    if (((_lastPrep = lastPrep) === null || _lastPrep === void 0 ? void 0 : _lastPrep.renderer) !== r) {
      var _lastPrep2, _lastPrep2$deprep;
      (_lastPrep2 = lastPrep) === null || _lastPrep2 === void 0 || (_lastPrep2$deprep = _lastPrep2.deprep) === null || _lastPrep2$deprep === void 0 || _lastPrep2$deprep.call(_lastPrep2, args);
      lastPrep = undefined;
    }
    const partialPrepResult = (_r$drawPrep = r.drawPrep) === null || _r$drawPrep === void 0 ? void 0 : _r$drawPrep.call(r, args, lastPrep);
    if (drawCellCallback !== undefined && !(0,data_grid_types/* isInnerOnlyCell */.rs)(args.cell)) {
      drawCellCallback(args, () => r.draw(args, cell));
    } else {
      r.draw(args, cell);
    }
    result = partialPrepResult === undefined ? undefined : {
      deprep: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.deprep,
      fillStyle: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.fillStyle,
      font: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.font,
      renderer: r
    };
  }
  if (needsAnim || animationFrameRequested) enqueue === null || enqueue === void 0 || enqueue(allocatedItem);
  return result;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/draw-checkbox.js




function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted) {
  var _theme$roundingRadius;
  let hoverX = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : -20;
  let hoverY = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -20;
  let maxSize = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 32;
  let alignment = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "center";
  const centerY = Math.floor(y + height / 2);
  const rectBordRadius = (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4;
  const checkBoxWidth = (0,utils/* getSquareWidth */.Qo)(maxSize, height, theme.cellVerticalPadding);
  const checkBoxHalfWidth = checkBoxWidth / 2;
  const posX = (0,utils/* getSquareXPosFromAlign */.XC)(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = (0,utils/* getSquareBB */.kq)(posX, centerY, checkBoxWidth);
  const hovered = (0,utils/* pointIsWithinBB */.qq)(x + hoverX, y + hoverY, bb);
  switch (checked) {
    case true:
      {
        ctx.beginPath();
        (0,data_grid_lib/* roundedRect */.NK)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        ctx.fillStyle = highlighted ? theme.accentColor : theme.textMedium;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxHalfWidth + checkBoxWidth / 4.23, centerY - checkBoxHalfWidth + checkBoxWidth / 1.97);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 2.42, centerY - checkBoxHalfWidth + checkBoxWidth / 1.44);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 1.29, centerY - checkBoxHalfWidth + checkBoxWidth / 3.25);
        ctx.strokeStyle = theme.bgCell;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    case data_grid_types/* BooleanEmpty */.qF:
    case false:
      {
        ctx.beginPath();
        (0,data_grid_lib/* roundedRect */.NK)(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
        ctx.lineWidth = 1;
        ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
        ctx.stroke();
        break;
      }
    case data_grid_types/* BooleanIndeterminate */.sd:
      {
        ctx.beginPath();
        (0,data_grid_lib/* roundedRect */.NK)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        ctx.fillStyle = hovered ? theme.textMedium : theme.textLight;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxWidth / 3, centerY);
        ctx.lineTo(posX + checkBoxWidth / 3, centerY);
        ctx.strokeStyle = theme.bgCell;
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    default:
      (0,support/* assertNever */.vE)(checked);
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.header.js








function drawGridHeaders(ctx, effectiveCols, enableGroups, hovered, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode) {
  var _hovered$;
  const totalHeaderHeight = headerHeight + groupHeaderHeight;
  if (totalHeaderHeight <= 0) return;
  ctx.fillStyle = outerTheme.bgHeader;
  ctx.fillRect(0, 0, width, totalHeaderHeight);
  const [hCol, hRow] = (_hovered$ = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$ !== void 0 ? _hovered$ : [];
  const font = outerTheme.headerFontFull;
  ctx.font = font;
  walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
    var _c$group, _hoverValues$find$hov, _hoverValues$find;
    if (damage !== undefined && !damage.has([c.sourceIndex, -1])) return;
    const diff = Math.max(0, clipX - x);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + diff, groupHeaderHeight, c.width - diff, headerHeight);
    ctx.clip();
    const groupTheme = getGroupDetails((_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "").overrideTheme;
    const theme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : (0,styles/* mergeAndRealizeTheme */.yR)(outerTheme, groupTheme, c.themeOverride);
    if (theme.bgHeader !== outerTheme.bgHeader) {
      ctx.fillStyle = theme.bgHeader;
      ctx.fill();
    }
    if (theme !== outerTheme) {
      ctx.font = theme.baseFontFull;
    }
    const selected = selection.columns.hasIndex(c.sourceIndex);
    const noHover = dragAndDropState !== undefined || isResizing;
    const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
    const hover = noHover ? 0 : (_hoverValues$find$hov = (_hoverValues$find = hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)) === null || _hoverValues$find === void 0 ? void 0 : _hoverValues$find.hoverAmount) !== null && _hoverValues$find$hov !== void 0 ? _hoverValues$find$hov : 0;
    const hasSelectedCell = (selection === null || selection === void 0 ? void 0 : selection.current) !== undefined && selection.current.cell[0] === c.sourceIndex;
    const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;
    const y = enableGroups ? groupHeaderHeight : 0;
    const xOffset = c.sourceIndex === 0 ? 0 : 1;
    if (selected) {
      ctx.fillStyle = bgFillStyle;
      ctx.fillRect(x + xOffset, y, c.width - xOffset, headerHeight);
    } else if (hasSelectedCell || hover > 0) {
      ctx.beginPath();
      ctx.rect(x + xOffset, y, c.width - xOffset, headerHeight);
      if (hasSelectedCell) {
        ctx.fillStyle = theme.bgHeaderHasFocus;
        ctx.fill();
      }
      if (hover > 0) {
        ctx.globalAlpha = hover;
        ctx.fillStyle = theme.bgHeaderHovered;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    drawHeader(ctx, x, y, c.width, headerHeight, c, selected, theme, hoveredBoolean, hasSelectedCell, hover, spriteManager, drawHeaderCallback, touchMode);
    ctx.restore();
  });
  if (enableGroups) {
    drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
  }
}
function drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$2;
  const xPad = 8;
  const [hCol, hRow] = (_hovered$2 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$2 !== void 0 ? _hovered$2 : [];
  let finalX = 0;
  walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
    var _groupTheme$textGroup;
    if (damage !== undefined && !damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === undefined ? theme : (0,styles/* mergeAndRealizeTheme */.yR)(theme, group.overrideTheme);
    const isHovered = hRow === -2 && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? groupTheme.bgHeaderHovered : groupTheme.bgHeader;
    if (fillColor !== theme.bgHeader) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.fillStyle = (_groupTheme$textGroup = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup !== void 0 ? _groupTheme$textGroup : groupTheme.textHeader;
    if (group !== undefined) {
      let drawX = x;
      if (group.icon !== undefined) {
        spriteManager.drawSprite(group.icon, "normal", ctx, drawX + xPad, (groupHeaderHeight - 20) / 2, 20, groupTheme);
        drawX += 26;
      }
      ctx.fillText(group.name, drawX + xPad, groupHeaderHeight / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.headerFontFull));
      if (group.actions !== undefined && isHovered) {
        var _hovered$3;
        const actionBoxes = getActionBoundsForGroup({
          x,
          y,
          width: w,
          height: h
        }, group.actions);
        ctx.beginPath();
        const fadeStartX = actionBoxes[0].x - 10;
        const fadeWidth = x + w - fadeStartX;
        ctx.rect(fadeStartX, 0, fadeWidth, groupHeaderHeight);
        const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
        const trans = (0,color_parser/* withAlpha */.fG)(fillColor, 0);
        grad.addColorStop(0, trans);
        grad.addColorStop(10 / fadeWidth, fillColor);
        grad.addColorStop(1, fillColor);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 0.6;
        const [mouseX, mouseY] = (_hovered$3 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$3 !== void 0 ? _hovered$3 : [-1, -1];
        for (let i = 0; i < group.actions.length; i++) {
          const action = group.actions[i];
          const box = actionBoxes[i];
          const actionHovered = pointInRect(box, mouseX + x, mouseY);
          if (actionHovered) {
            ctx.globalAlpha = 1;
          }
          spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
          if (actionHovered) {
            ctx.globalAlpha = 0.6;
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, groupHeaderHeight);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    finalX = x + w;
  });
  ctx.beginPath();
  ctx.moveTo(finalX + 0.5, 0);
  ctx.lineTo(finalX + 0.5, groupHeaderHeight);
  ctx.moveTo(0, groupHeaderHeight + 0.5);
  ctx.lineTo(width, groupHeaderHeight + 0.5);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1;
  ctx.stroke();
}
const menuButtonSize = 30;
function getHeaderMenuBounds(x, y, width, height, isRtl) {
  if (isRtl) return {
    x,
    y,
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
  return {
    x: x + width - menuButtonSize,
    y: Math.max(y, y + height / 2 - menuButtonSize / 2),
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
}
function getActionBoundsForGroup(box, actions) {
  const result = [];
  let x = box.x + box.width - 26 * actions.length;
  const y = box.y + box.height / 2 - 13;
  const height = 26;
  const width = 26;
  for (let i = 0; i < actions.length; i++) {
    result.push({
      x,
      y,
      width,
      height
    });
    x += 26;
  }
  return result;
}
function drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, isCheckboxHeader, menuBounds) {
  if (isCheckboxHeader) {
    let checked = undefined;
    if (c.title === data_grid_types/* headerCellCheckedMarker */.qT) checked = true;
    if (c.title === data_grid_types/* headerCellUnheckedMarker */.YK) checked = false;
    if (checked !== true) {
      ctx.globalAlpha = hoverAmount;
    }
    drawCheckbox(ctx, theme, checked, x, y, width, height, false, undefined, undefined, 18);
    if (checked !== true) {
      ctx.globalAlpha = 1;
    }
    return;
  }
  const xPad = theme.cellHorizontalPadding;
  const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;
  const shouldDrawMenu = c.hasMenu === true && (isHovered || touchMode && selected);
  const dirScalar = isRtl ? -1 : 1;
  let drawX = isRtl ? x + width - xPad : x + xPad;
  if (c.icon !== undefined) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    const headerSize = theme.headerIconSize;
    spriteManager.drawSprite(c.icon, variant, ctx, isRtl ? drawX - headerSize : drawX, y + (height - headerSize) / 2, headerSize, theme);
    if (c.overlayIcon !== undefined) {
      spriteManager.drawSprite(c.overlayIcon, selected ? "selected" : "special", ctx, isRtl ? drawX - headerSize + 9 : drawX + 9, y + ((height - 18) / 2 + 6), 18, theme);
    }
    drawX += Math.ceil(headerSize * 1.3) * dirScalar;
  }
  if (shouldDrawMenu && c.hasMenu === true && width > 35) {
    const fadeWidth = 35;
    const fadeStart = isRtl ? fadeWidth : width - fadeWidth;
    const fadeEnd = isRtl ? fadeWidth * 0.7 : width - fadeWidth * 0.7;
    const fadeStartPercent = fadeStart / width;
    const fadeEndPercent = fadeEnd / width;
    const grad = ctx.createLinearGradient(x, 0, x + width, 0);
    const trans = (0,color_parser/* withAlpha */.fG)(fillStyle, 0);
    grad.addColorStop(isRtl ? 1 : 0, fillStyle);
    grad.addColorStop(fadeStartPercent, fillStyle);
    grad.addColorStop(fadeEndPercent, trans);
    grad.addColorStop(isRtl ? 0 : 1, trans);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = fillStyle;
  }
  if (isRtl) {
    ctx.textAlign = "right";
  }
  ctx.fillText(c.title, drawX, y + height / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.headerFontFull));
  if (isRtl) {
    ctx.textAlign = "left";
  }
  if (shouldDrawMenu && c.hasMenu === true) {
    if (c.menuIcon === undefined || c.menuIcon === data_grid_types/* GridColumnMenuIcon.Triangle */.pN.Triangle) {
      ctx.beginPath();
      const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
      const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
      (0,data_grid_lib/* roundedPoly */.zu)(ctx, [{
        x: triangleX,
        y: triangleY
      }, {
        x: triangleX + 11,
        y: triangleY
      }, {
        x: triangleX + 5.5,
        y: triangleY + 6
      }], 1);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else if (c.menuIcon === data_grid_types/* GridColumnMenuIcon.Dots */.pN.Dots) {
      ctx.beginPath();
      const dotsX = menuBounds.x + menuBounds.width / 2;
      const dotsY = menuBounds.y + menuBounds.height / 2;
      (0,data_grid_lib/* drawMenuDots */.Ld)(ctx, dotsX, dotsY);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else {
      const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
      const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
      spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
    }
  }
}
function drawHeader(ctx, x, y, width, height, c, selected, theme, isHovered, hasSelectedCell, hoverAmount, spriteManager, drawHeaderCallback, touchMode) {
  const isCheckboxHeader = c.title.startsWith(data_grid_types/* headerCellCheckboxPrefix */.Gf);
  const isRtl = (0,utils/* direction */.o7)(c.title) === "rtl";
  const menuBounds = getHeaderMenuBounds(x, y, width, height, isRtl);
  if (drawHeaderCallback !== undefined) {
    let passCol = c;
    if (isCheckboxHeader) {
      passCol = {
        ...c,
        title: ""
      };
    }
    drawHeaderCallback({
      ctx,
      theme,
      rect: {
        x,
        y,
        width,
        height
      },
      column: passCol,
      columnIndex: passCol.sourceIndex,
      isSelected: selected,
      hoverAmount,
      isHovered,
      hasSelectedCell,
      spriteManager,
      menuBounds
    }, () => drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, isCheckboxHeader, menuBounds));
  } else {
    drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, isCheckboxHeader, menuBounds);
  }
}
// EXTERNAL MODULE: ./node_modules/lodash/groupBy.js
var groupBy = __webpack_require__("./node_modules/lodash/groupBy.js");
var groupBy_default = /*#__PURE__*/__webpack_require__.n(groupBy);
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.lines.js









function drawBlanks(ctx, effectiveColumns, allColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowTheme, selectedRows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme) {
  if (damage !== undefined || effectiveColumns[effectiveColumns.length - 1] !== allColumns[effectiveColumns.length - 1]) return;
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawY, clipX, startRow) => {
    if (c !== effectiveColumns[effectiveColumns.length - 1]) return;
    drawX += c.width;
    const x = Math.max(drawX, clipX);
    if (x > width) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, totalHeaderHeight + 1, 10000, height - totalHeaderHeight - 1);
    ctx.clip();
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky) => {
      if (!isSticky && drawRegions.length > 0 && !drawRegions.some(dr => intersectRect(drawX, drawY, 10000, rh, dr.x, dr.y, dr.width, dr.height))) {
        return;
      }
      const rowSelected = selectedRows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      ctx.beginPath();
      const rowTheme = getRowTheme === null || getRowTheme === void 0 ? void 0 : getRowTheme(row);
      const blankTheme = rowTheme === undefined ? theme : (0,styles/* mergeAndRealizeTheme */.yR)(theme, rowTheme);
      if (blankTheme.bgCell !== theme.bgCell) {
        ctx.fillStyle = blankTheme.bgCell;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
      if (rowDisabled) {
        ctx.fillStyle = blankTheme.bgHeader;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
      if (rowSelected) {
        ctx.fillStyle = blankTheme.accentLight;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
    });
    ctx.restore();
  });
}
function overdrawStickyBoundaries(ctx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme) {
  var _theme$horizontalBord;
  let drawFreezeBorder = false;
  for (const c of effectiveCols) {
    if (c.sticky) continue;
    drawFreezeBorder = verticalBorder(c.sourceIndex);
    break;
  }
  const hColor = (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor;
  const vColor = theme.borderColor;
  const drawX = drawFreezeBorder ? (0,data_grid_lib/* getStickyWidth */.G6)(effectiveCols) : 0;
  let vStroke;
  if (drawX !== 0) {
    vStroke = (0,color_parser/* blendCache */.mv)(vColor, theme.bgCell);
    ctx.beginPath();
    ctx.moveTo(drawX + 0.5, 0);
    ctx.lineTo(drawX + 0.5, height);
    ctx.strokeStyle = vStroke;
    ctx.stroke();
  }
  if (freezeTrailingRows > 0) {
    const hStroke = vColor === hColor && vStroke !== undefined ? vStroke : (0,color_parser/* blendCache */.mv)(hColor, theme.bgCell);
    const h = (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight);
    ctx.beginPath();
    ctx.moveTo(0, height - h + 0.5);
    ctx.lineTo(width, height - h + 0.5);
    ctx.strokeStyle = hStroke;
    ctx.stroke();
  }
}
function drawGridLines(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
  var _theme$horizontalBord2;
  let verticalOnly = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : false;
  if (spans !== undefined) {
    ctx.beginPath();
    ctx.save();
    ctx.rect(0, 0, width, height);
    for (const span of spans) {
      ctx.rect(span.x + 1, span.y + 1, span.width - 1, span.height - 1);
    }
    ctx.clip("evenodd");
  }
  const hColor = (_theme$horizontalBord2 = theme.horizontalBorderColor) !== null && _theme$horizontalBord2 !== void 0 ? _theme$horizontalBord2 : theme.borderColor;
  const vColor = theme.borderColor;
  let minX = 0;
  let maxX = width;
  let minY = 0;
  let maxY = height;
  if (drawRegions !== undefined && drawRegions.length > 0) {
    minX = Number.MAX_SAFE_INTEGER;
    minY = Number.MAX_SAFE_INTEGER;
    maxX = Number.MIN_SAFE_INTEGER;
    maxY = Number.MIN_SAFE_INTEGER;
    for (const r of drawRegions) {
      minX = Math.min(minX, r.x - 1);
      maxX = Math.max(maxX, r.x + r.width + 1);
      minY = Math.min(minY, r.y - 1);
      maxY = Math.max(maxY, r.y + r.height + 1);
    }
  }
  const toDraw = [];
  ctx.beginPath();
  let x = 0.5;
  for (let index = 0; index < effectiveCols.length; index++) {
    const c = effectiveCols[index];
    if (c.width === 0) continue;
    x += c.width;
    const tx = c.sticky ? x : x + translateX;
    if (tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
      toDraw.push({
        x1: tx,
        y1: Math.max(groupHeaderHeight, minY),
        x2: tx,
        y2: Math.min(height, maxY),
        color: vColor
      });
    }
  }
  let freezeY = height + 0.5;
  for (let i = rows - freezeTrailingRows; i < rows; i++) {
    const rh = getRowHeight(i);
    freezeY -= rh;
    toDraw.push({
      x1: minX,
      y1: freezeY,
      x2: maxX,
      y2: freezeY,
      color: hColor
    });
  }
  if (verticalOnly !== true) {
    let y = totalHeaderHeight + 0.5;
    let row = cellYOffset;
    const target = freezeY;
    while (y + translateY < target) {
      const ty = y + translateY;
      if (ty >= minY && ty <= maxY - 1) {
        var _ref, _rowTheme$horizontalB;
        const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
        toDraw.push({
          x1: minX,
          y1: ty,
          x2: maxX,
          y2: ty,
          color: (_ref = (_rowTheme$horizontalB = rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.horizontalBorderColor) !== null && _rowTheme$horizontalB !== void 0 ? _rowTheme$horizontalB : rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.borderColor) !== null && _ref !== void 0 ? _ref : hColor
        });
      }
      y += getRowHeight(row);
      row++;
    }
  }
  const groups = groupBy_default()(toDraw, line => line.color);
  for (const g of Object.keys(groups)) {
    ctx.strokeStyle = g;
    for (const line of groups[g]) {
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
    ctx.beginPath();
  }
  if (spans !== undefined) {
    ctx.restore();
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.blit.js




function blitLastFrame(ctx, blitSource, blitSourceScroll, targetScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, getRowHeight, doubleBuffer) {
  const drawRegions = [];
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
  let stickyWidth = (0,data_grid_lib/* getStickyWidth */.G6)(effectiveCols);
  if (stickyWidth > 0) stickyWidth++;
  if (deltaX !== 0 && deltaY !== 0) {
    return {
      regions: []
    };
  }
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) : 0;
  const blitWidth = width - stickyWidth - Math.abs(deltaX);
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
      dh: height * dpr
    };
    if (deltaY > 0) {
      args.sy = (totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (deltaY + totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: totalHeaderHeight,
        width: width,
        height: deltaY + 1
      });
    } else if (deltaY < 0) {
      args.sy = (-deltaY + totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: height + deltaY - freezeTrailingRowsHeight,
        width: width,
        height: -deltaY + freezeTrailingRowsHeight
      });
    }
    if (deltaX > 0) {
      args.sx = stickyWidth * dpr;
      args.sw = blitWidth * dpr;
      args.dx = (deltaX + stickyWidth) * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: stickyWidth - 1,
        y: 0,
        width: deltaX + 2,
        height: height
      });
    } else if (deltaX < 0) {
      args.sx = (stickyWidth - deltaX) * dpr;
      args.sw = blitWidth * dpr;
      args.dx = stickyWidth * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: width + deltaX,
        y: 0,
        width: -deltaX,
        height: height
      });
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (doubleBuffer) {
      if (stickyWidth > 0 && deltaX !== 0 && deltaY === 0 && (targetScroll === undefined || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[1]) !== false)) {
        const w = stickyWidth * dpr;
        const h = height * dpr;
        ctx.drawImage(blitSource, 0, 0, w, h, 0, 0, w, h);
      }
      if (freezeTrailingRowsHeight > 0 && deltaX === 0 && deltaY !== 0 && (targetScroll === undefined || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[0]) !== false)) {
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
    regions: drawRegions
  };
}
function blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedIndex) {
  const drawRegions = [];
  if (cellXOffset !== last.cellXOffset || cellYOffset !== last.cellYOffset || translateX !== last.translateX || translateY !== last.translateY) {
    return drawRegions;
  }
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _drawY, clipX) => {
    if (c.sourceIndex === resizedIndex) {
      const x = Math.max(drawX, clipX) + 1;
      drawRegions.push({
        x,
        y: 0,
        width: width - x,
        height
      });
      return true;
    }
  });
  return drawRegions;
}
function computeCanBlit(current, last) {
  if (last === undefined) return false;
  if (current.width !== last.width || current.height !== last.height || current.theme !== last.theme || current.headerHeight !== last.headerHeight || current.rowHeight !== last.rowHeight || current.rows !== last.rows || current.freezeColumns !== last.freezeColumns || current.getRowThemeOverride !== last.getRowThemeOverride || current.isFocused !== last.isFocused || current.isResizing !== last.isResizing || current.verticalBorder !== last.verticalBorder || current.getCellContent !== last.getCellContent || current.highlightRegions !== last.highlightRegions || current.selection !== last.selection || current.dragAndDropState !== last.dragAndDropState || current.prelightCells !== last.prelightCells || current.touchMode !== last.touchMode || current.maxScaleFactor !== last.maxScaleFactor) {
    return false;
  }
  if (current.mappedColumns !== last.mappedColumns) {
    if (current.mappedColumns.length > 100 || current.mappedColumns.length !== last.mappedColumns.length) {
      return false;
    }
    let resized;
    for (let i = 0; i < current.mappedColumns.length; i++) {
      const curCol = current.mappedColumns[i];
      const lastCol = last.mappedColumns[i];
      if ((0,support/* deepEqual */.vZ)(curCol, lastCol)) continue;
      if (resized !== undefined) return false;
      if (curCol.width === lastCol.width) return false;
      const {
        width,
        ...curRest
      } = curCol;
      const {
        width: lastWidth,
        ...lastRest
      } = lastCol;
      if (!(0,support/* deepEqual */.vZ)(curRest, lastRest)) return false;
      resized = i;
    }
    if (resized === undefined) {
      return true;
    }
    return resized;
  }
  return true;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid.render.rings.js







function drawHighlightRings(ctx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, allHighlightRegions, theme) {
  const highlightRegions = allHighlightRegions === null || allHighlightRegions === void 0 ? void 0 : allHighlightRegions.filter(x => x.style !== "no-outline");
  if (highlightRegions === undefined || highlightRegions.length === 0) return undefined;
  const freezeLeft = (0,data_grid_lib/* getStickyWidth */.G6)(mappedColumns);
  const freezeBottom = (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, rowHeight);
  const splitIndicies = [freezeColumns, 0, mappedColumns.length, rows - freezeTrailingRows];
  const splitLocations = [freezeLeft, 0, width, height - freezeBottom];
  const drawRects = highlightRegions.map(h => {
    var _h$style;
    const r = h.range;
    const style = (_h$style = h.style) !== null && _h$style !== void 0 ? _h$style : "dashed";
    return splitRectIntoRegions(r, splitIndicies, width, height, splitLocations).map(arg => {
      const rect = arg.rect;
      const topLeftBounds = (0,data_grid_lib/* computeBounds */.Ve)(rect.x, rect.y, width, height, groupHeaderHeight, headerHeight + groupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
      const bottomRightBounds = rect.width === 1 && rect.height === 1 ? topLeftBounds : (0,data_grid_lib/* computeBounds */.Ve)(rect.x + rect.width - 1, rect.y + rect.height - 1, width, height, groupHeaderHeight, headerHeight + groupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
      if (rect.x + rect.width >= mappedColumns.length) {
        bottomRightBounds.width -= 1;
      }
      if (rect.y + rect.height >= rows) {
        bottomRightBounds.height -= 1;
      }
      return {
        color: h.color,
        style,
        clip: arg.clip,
        rect: hugRectToTarget({
          x: topLeftBounds.x,
          y: topLeftBounds.y,
          width: bottomRightBounds.x + bottomRightBounds.width - topLeftBounds.x,
          height: bottomRightBounds.y + bottomRightBounds.height - topLeftBounds.y
        }, width, height, 8)
      };
    });
  });
  const drawCb = () => {
    ctx.lineWidth = 1;
    let dashed = false;
    for (const dr of drawRects) {
      for (const s of dr) {
        if ((s === null || s === void 0 ? void 0 : s.rect) !== undefined && intersectRect(0, 0, width, height, s.rect.x, s.rect.y, s.rect.width, s.rect.height)) {
          const wasDashed = dashed;
          const needsClip = !rectContains(s.clip, s.rect);
          if (needsClip) {
            ctx.save();
            ctx.rect(s.clip.x, s.clip.y, s.clip.width, s.clip.height);
            ctx.clip();
          }
          if (s.style === "dashed" && !dashed) {
            ctx.setLineDash([5, 3]);
            dashed = true;
          } else if ((s.style === "solid" || s.style === "solid-outline") && dashed) {
            ctx.setLineDash([]);
            dashed = false;
          }
          ctx.strokeStyle = s.style === "solid-outline" ? (0,color_parser/* blend */.NH)((0,color_parser/* blend */.NH)(s.color, theme.borderColor), theme.bgCell) : (0,color_parser/* withAlpha */.fG)(s.color, 1);
          ctx.strokeRect(s.rect.x + 0.5, s.rect.y + 0.5, s.rect.width - 1, s.rect.height - 1);
          if (needsClip) {
            ctx.restore();
            dashed = wasDashed;
          }
        }
      }
    }
    if (dashed) {
      ctx.setLineDash([]);
    }
  };
  drawCb();
  return drawCb;
}
function drawColumnResizeOutline(ctx, yOffset, xOffset, height, style) {
  ctx.beginPath();
  ctx.moveTo(yOffset, xOffset);
  ctx.lineTo(yOffset, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = style;
  ctx.stroke();
  ctx.globalAlpha = 1;
}
function drawFocusRing(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, allColumns, theme, totalHeaderHeight, selectedCell, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) {
  var _cell$span;
  if (selectedCell.current === undefined) return undefined;
  const range = selectedCell.current.range;
  const currentItem = selectedCell.current.cell;
  const fillHandleTarget = [range.x + range.width - 1, range.y + range.height - 1];
  if (currentItem[1] >= rows && fillHandleTarget[1] >= rows) return undefined;
  const mustDraw = effectiveCols.some(c => c.sourceIndex === currentItem[0] || c.sourceIndex === fillHandleTarget[0]);
  if (!mustDraw) return undefined;
  const [targetCol, targetRow] = selectedCell.current.cell;
  const cell = getCellContent(selectedCell.current.cell);
  const targetColSpan = (_cell$span = cell.span) !== null && _cell$span !== void 0 ? _cell$span : [targetCol, targetCol];
  const isStickyRow = targetRow >= rows - freezeTrailingRows;
  const stickRowHeight = freezeTrailingRows > 0 && !isStickyRow ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) - 1 : 0;
  const fillHandleRow = fillHandleTarget[1];
  let drawCb = undefined;
  let drawHandleCb = undefined;
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (col, drawX, colDrawY, clipX, startRow) => {
    if (col.sticky && targetCol > col.sourceIndex) return;
    const isBeforeTarget = col.sourceIndex < targetColSpan[0];
    const isAfterTarget = col.sourceIndex > targetColSpan[1];
    const isFillHandleCol = col.sourceIndex === fillHandleTarget[0];
    if (!isFillHandleCol && (isBeforeTarget || isAfterTarget)) {
      return;
    }
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (drawY, row, rh) => {
      if (row !== targetRow && row !== fillHandleRow) return;
      let cellX = drawX;
      let cellWidth = col.width;
      const isLastColumn = col.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (cell.span !== undefined) {
        const areas = getSpanBounds(cell.span, drawX, drawY, col.width, rh, col, allColumns);
        const area = col.sticky ? areas[0] : areas[1];
        if (area !== undefined) {
          cellX = area.x;
          cellWidth = area.width;
        }
      }
      const doHandle = row === fillHandleRow && isFillHandleCol && fillHandle;
      const doRing = row === targetRow && !isBeforeTarget && !isAfterTarget && drawCb === undefined;
      if (doHandle) {
        drawHandleCb = () => {
          var _col$themeOverride$ac, _col$themeOverride;
          if (clipX > cellX && !col.sticky && !doRing) {
            ctx.beginPath();
            ctx.rect(clipX, 0, width - clipX, height);
            ctx.clip();
          }
          ctx.beginPath();
          ctx.rect(cellX + cellWidth - 4, drawY + rh - 4, 4, 4);
          ctx.fillStyle = (_col$themeOverride$ac = (_col$themeOverride = col.themeOverride) === null || _col$themeOverride === void 0 ? void 0 : _col$themeOverride.accentColor) !== null && _col$themeOverride$ac !== void 0 ? _col$themeOverride$ac : theme.accentColor;
          ctx.fill();
        };
      }
      if (doRing) {
        drawCb = () => {
          var _col$themeOverride$ac2, _col$themeOverride2;
          if (clipX > cellX && !col.sticky) {
            ctx.beginPath();
            ctx.rect(clipX, 0, width - clipX, height);
            ctx.clip();
          }
          ctx.beginPath();
          ctx.rect(cellX + 0.5, drawY + 0.5, cellWidth - (isLastColumn ? 1 : 0), rh - (isLastRow ? 1 : 0));
          ctx.strokeStyle = (_col$themeOverride$ac2 = (_col$themeOverride2 = col.themeOverride) === null || _col$themeOverride2 === void 0 ? void 0 : _col$themeOverride2.accentColor) !== null && _col$themeOverride$ac2 !== void 0 ? _col$themeOverride$ac2 : theme.accentColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        };
      }
      return drawCb !== undefined && (fillHandle ? drawHandleCb !== undefined : true);
    });
    return drawCb !== undefined && (fillHandle ? drawHandleCb !== undefined : true);
  });
  if (drawCb === undefined && drawHandleCb === undefined) return undefined;
  const result = () => {
    var _drawCb, _drawHandleCb;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, totalHeaderHeight, width, height - totalHeaderHeight - stickRowHeight);
    ctx.clip();
    (_drawCb = drawCb) === null || _drawCb === void 0 || _drawCb();
    (_drawHandleCb = drawHandleCb) === null || _drawHandleCb === void 0 || _drawHandleCb();
    ctx.restore();
  };
  result();
  return result;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/render/data-grid-render.js











function clipHeaderDamage(ctx, effectiveColumns, width, groupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage) {
  if (damage === undefined || damage.size === 0) return;
  ctx.beginPath();
  walkGroups(effectiveColumns, width, translateX, groupHeaderHeight, (span, _group, x, y, w, h) => {
    const hasItemInSpan = damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    });
    if (hasItemInSpan) {
      ctx.rect(x, y, w, h);
    }
  });
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _colDrawY, clipX) => {
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
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (_c, __drawX, colDrawY, _clipX, startRow) => {
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (_drawY, row, _rh, isSticky) => {
      if (!isSticky) {
        result = Math.max(row, result);
      }
    });
    return true;
  });
  return result;
}
function drawGrid(arg, lastArg) {
  var _window$devicePixelRa, _selection$current;
  const {
    canvasCtx,
    headerCanvasCtx,
    width,
    height,
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mappedColumns,
    enableGroups,
    freezeColumns,
    dragAndDropState,
    theme,
    drawFocus,
    headerHeight,
    groupHeaderHeight,
    disabledRows,
    rowHeight,
    verticalBorder,
    overrideCursor,
    isResizing,
    selection,
    fillHandle,
    freezeTrailingRows,
    rows,
    getCellContent,
    getGroupDetails,
    getRowThemeOverride,
    isFocused,
    drawHeaderCallback,
    prelightCells,
    drawCellCallback,
    highlightRegions,
    resizeCol,
    imageLoader,
    lastBlitData,
    hoverValues,
    hyperWrapping,
    hoverInfo,
    spriteManager,
    maxScaleFactor,
    hasAppendRow,
    touchMode,
    enqueue,
    renderStateProvider,
    getCellRenderer,
    renderStrategy,
    bufferACtx,
    bufferBCtx,
    damage,
    minimumCellWidth
  } = arg;
  if (width === 0 || height === 0) return;
  const doubleBuffer = renderStrategy === "double-buffer";
  const dpr = Math.min(maxScaleFactor, Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1));
  const canBlit = renderStrategy !== "direct" && computeCanBlit(arg, lastArg);
  const canvas = canvasCtx.canvas;
  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }
  const overlayCanvas = headerCanvasCtx.canvas;
  const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;
  const overlayHeight = totalHeaderHeight + 1;
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
    if (lastBlitData.current !== undefined) lastBlitData.current.aBufferScroll = undefined;
  }
  if (doubleBuffer && (bufferB.width !== width * dpr || bufferB.height !== height * dpr)) {
    bufferB.width = width * dpr;
    bufferB.height = height * dpr;
    if (lastBlitData.current !== undefined) lastBlitData.current.bBufferScroll = undefined;
  }
  const last = lastBlitData.current;
  if (canBlit === true && cellXOffset === (last === null || last === void 0 ? void 0 : last.cellXOffset) && cellYOffset === (last === null || last === void 0 ? void 0 : last.cellYOffset) && translateX === (last === null || last === void 0 ? void 0 : last.translateX) && translateY === (last === null || last === void 0 ? void 0 : last.translateY)) return;
  let mainCtx = null;
  if (doubleBuffer) {
    mainCtx = canvasCtx;
  }
  const overlayCtx = headerCanvasCtx;
  let targetCtx;
  if (!doubleBuffer) {
    targetCtx = canvasCtx;
  } else if (damage !== undefined) {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferBCtx : bufferACtx;
  } else {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferACtx : bufferBCtx;
  }
  const targetBuffer = targetCtx.canvas;
  const blitSource = doubleBuffer ? targetBuffer === bufferA ? bufferB : bufferA : canvas;
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
  const effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
  let drawRegions = [];
  const mustDrawFocusOnHeader = drawFocus && ((_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell[1]) === cellYOffset && translateY === 0;
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
    var _ref, _theme$headerBottomBo;
    drawGridHeaders(overlayCtx, effectiveCols, enableGroups, hoverInfo, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, theme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode);
    drawGridLines(overlayCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, undefined, undefined, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, true);
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, overlayHeight - 0.5);
    overlayCtx.lineTo(width, overlayHeight - 0.5);
    overlayCtx.strokeStyle = (0,color_parser/* blend */.NH)((_ref = (_theme$headerBottomBo = theme.headerBottomBorderColor) !== null && _theme$headerBottomBo !== void 0 ? _theme$headerBottomBo : theme.horizontalBorderColor) !== null && _ref !== void 0 ? _ref : theme.borderColor, theme.bgHeader);
    overlayCtx.stroke();
    if (mustDrawHighlightRingsOnHeader) {
      drawHighlightRings(overlayCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
    }
    if (mustDrawFocusOnHeader) {
      drawFocusRing(overlayCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
    }
  };
  if (damage !== undefined) {
    const viewRegionWidth = effectiveCols[effectiveCols.length - 1].sourceIndex + 1;
    const damageInView = damage.hasItemInRegion([{
      x: cellXOffset,
      y: -2,
      width: viewRegionWidth,
      height: 2
    }, {
      x: cellXOffset,
      y: cellYOffset,
      width: viewRegionWidth,
      height: 300
    }, {
      x: 0,
      y: cellYOffset,
      width: freezeColumns,
      height: 300
    }, {
      x: cellXOffset,
      y: rows - freezeTrailingRows,
      width: viewRegionWidth,
      height: freezeTrailingRows,
      when: freezeTrailingRows > 0
    }]);
    const doDamage = ctx => {
      drawCells(ctx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
      const selectionCurrent = selection.current;
      if (fillHandle && drawFocus && selectionCurrent !== undefined && damage.has((0,data_grid_lib/* rectBottomRight */.zU)(selectionCurrent.range))) {
        drawFocusRing(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
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
  if (canBlit !== true || cellXOffset !== (last === null || last === void 0 ? void 0 : last.cellXOffset) || translateX !== (last === null || last === void 0 ? void 0 : last.translateX) || mustDrawFocusOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawFocusOnHeader) || mustDrawHighlightRingsOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawHighlightRingsOnHeader)) {
    drawHeaderTexture();
  }
  if (canBlit === true) {
    (0,support/* assert */.hu)(blitSource !== undefined && last !== undefined);
    const {
      regions
    } = blitLastFrame(targetCtx, blitSource, blitSource === bufferA ? last.aBufferScroll : last.bBufferScroll, blitSource === bufferA ? last.bBufferScroll : last.aBufferScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, rowHeight, doubleBuffer);
    drawRegions = regions;
  } else if (canBlit !== false) {
    (0,support/* assert */.hu)(last !== undefined);
    const resizedCol = canBlit;
    drawRegions = blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedCol);
  }
  overdrawStickyBoundaries(targetCtx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme);
  const highlightRedraw = drawHighlightRings(targetCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
  const focusRedraw = drawFocus ? drawFocusRing(targetCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) : undefined;
  targetCtx.fillStyle = theme.bgCell;
  if (drawRegions.length > 0) {
    targetCtx.beginPath();
    for (const r of drawRegions) {
      targetCtx.rect(r.x, r.y, r.width, r.height);
    }
    targetCtx.clip();
    targetCtx.fill();
    targetCtx.beginPath();
  } else {
    targetCtx.fillRect(0, 0, width, height);
  }
  const spans = drawCells(targetCtx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
  drawBlanks(targetCtx, effectiveCols, mappedColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowThemeOverride, selection.rows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme);
  drawGridLines(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  highlightRedraw === null || highlightRedraw === void 0 || highlightRedraw();
  focusRedraw === null || focusRedraw === void 0 || focusRedraw();
  if (isResizing) {
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
      if (c.sourceIndex === resizeCol) {
        var _theme$resizeIndicato, _theme$resizeIndicato2;
        drawColumnResizeOutline(overlayCtx, x + c.width, 0, totalHeaderHeight + 1, (0,color_parser/* blend */.NH)((_theme$resizeIndicato = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato !== void 0 ? _theme$resizeIndicato : theme.accentLight, theme.bgHeader));
        drawColumnResizeOutline(targetCtx, x + c.width, totalHeaderHeight, height, (0,color_parser/* blend */.NH)((_theme$resizeIndicato2 = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato2 !== void 0 ? _theme$resizeIndicato2 : theme.accentLight, theme.bgCell));
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
  imageLoader === null || imageLoader === void 0 || imageLoader.setWindow({
    x: cellXOffset,
    y: cellYOffset,
    width: effectiveCols.length,
    height: lastRowDrawn - cellYOffset
  }, freezeColumns, Array.from({
    length: freezeTrailingRows
  }, (_, i) => rows - 1 - i));
  const scrollX = last !== undefined && (cellXOffset !== last.cellXOffset || translateX !== last.translateX);
  const scrollY = last !== undefined && (cellYOffset !== last.cellYOffset || translateY !== last.translateY);
  lastBlitData.current = {
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mustDrawFocusOnHeader,
    mustDrawHighlightRingsOnHeader,
    lastBuffer: doubleBuffer ? targetBuffer === bufferA ? "a" : "b" : undefined,
    aBufferScroll: targetBuffer === bufferA ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.aBufferScroll,
    bBufferScroll: targetBuffer === bufferB ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.bBufferScroll
  };
  targetCtx.restore();
  overlayCtx.restore();
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/animation-manager.js


const hoverTime = 80;
function easeOutCubic(x) {
  const x1 = x - 1;
  return x1 * x1 * x1 + 1;
}
class AnimationManager {
  constructor(callback) {
    this.callback = void 0;
    this.currentHoveredItem = undefined;
    this.leavingItems = [];
    this.lastAnimationTime = void 0;
    this.addToLeavingItems = item => {
      const isAlreadyLeaving = this.leavingItems.some(i => (0,data_grid_lib/* itemsAreEqual */.pU)(i.item, item.item));
      if (isAlreadyLeaving) {
        return;
      }
      this.leavingItems.push(item);
    };
    this.removeFromLeavingItems = item => {
      var _leavingItem$hoverAmo;
      const leavingItem = this.leavingItems.find(e => (0,data_grid_lib/* itemsAreEqual */.pU)(e.item, item));
      this.leavingItems = this.leavingItems.filter(i => i !== leavingItem);
      return (_leavingItem$hoverAmo = leavingItem === null || leavingItem === void 0 ? void 0 : leavingItem.hoverAmount) !== null && _leavingItem$hoverAmo !== void 0 ? _leavingItem$hoverAmo : 0;
    };
    this.cleanUpLeavingElements = () => {
      this.leavingItems = this.leavingItems.filter(i => i.hoverAmount > 0);
    };
    this.shouldStep = () => {
      const hasLeavingItems = this.leavingItems.length > 0;
      const currentHoveredIsAnimating = this.currentHoveredItem !== undefined && this.currentHoveredItem.hoverAmount < 1;
      return hasLeavingItems || currentHoveredIsAnimating;
    };
    this.getAnimatingItems = () => {
      if (this.currentHoveredItem !== undefined) {
        return [...this.leavingItems, this.currentHoveredItem];
      }
      return this.leavingItems.map(x => ({
        ...x,
        hoverAmount: easeOutCubic(x.hoverAmount)
      }));
    };
    this.step = timestamp => {
      if (this.lastAnimationTime === undefined) {
        this.lastAnimationTime = timestamp;
      } else {
        const step = timestamp - this.lastAnimationTime;
        const delta = step / hoverTime;
        for (const item of this.leavingItems) {
          item.hoverAmount = clamp_default()(item.hoverAmount - delta, 0, 1);
        }
        if (this.currentHoveredItem !== undefined) {
          this.currentHoveredItem.hoverAmount = clamp_default()(this.currentHoveredItem.hoverAmount + delta, 0, 1);
        }
        const animating = this.getAnimatingItems();
        this.callback(animating);
        this.cleanUpLeavingElements();
      }
      if (this.shouldStep()) {
        this.lastAnimationTime = timestamp;
        window.requestAnimationFrame(this.step);
      } else {
        this.lastAnimationTime = undefined;
      }
    };
    this.setHovered = item => {
      var _this$currentHoveredI;
      if ((0,data_grid_lib/* itemsAreEqual */.pU)((_this$currentHoveredI = this.currentHoveredItem) === null || _this$currentHoveredI === void 0 ? void 0 : _this$currentHoveredI.item, item)) {
        return;
      }
      if (this.currentHoveredItem !== undefined) {
        this.addToLeavingItems(this.currentHoveredItem);
      }
      if (item !== undefined) {
        const hoverAmount = this.removeFromLeavingItems(item);
        this.currentHoveredItem = {
          item,
          hoverAmount
        };
      } else {
        this.currentHoveredItem = undefined;
      }
      if (this.lastAnimationTime === undefined) {
        window.requestAnimationFrame(this.step);
      }
    };
    this.callback = callback;
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/browser-detect.js
class Lazy {
  constructor(fn) {
    this.fn = void 0;
    this.val = void 0;
    this.fn = fn;
  }
  get value() {
    var _this$val;
    return (_this$val = this.val) !== null && _this$val !== void 0 ? _this$val : this.val = this.fn();
  }
}
function lazy(fn) {
  return new Lazy(fn);
}
const browserIsFirefox = lazy(() => window.navigator.userAgent.includes("Firefox"));
const browserIsSafari = lazy(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome"));
const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/use-animation-queue.js




function useAnimationQueue(draw) {
  const queue = react.useRef([]);
  const seq = react.useRef(0);
  const drawRef = react.useRef(draw);
  drawRef.current = draw;
  const loop = react.useCallback(() => {
    const requeue = () => window.requestAnimationFrame(fn);
    const fn = () => {
      const toDraw = queue.current.map(unpackNumberToColRow);
      queue.current = [];
      drawRef.current(new CellSet(toDraw));
      if (queue.current.length > 0) {
        seq.current++;
      } else {
        seq.current = 0;
      }
    };
    window.requestAnimationFrame(seq.current > 600 ? requeue : fn);
  }, []);
  return react.useCallback(item => {
    if (queue.current.length === 0) loop();
    const packed = packColRowToNumber(item[0], item[1]);
    if (queue.current.includes(packed)) return;
    queue.current.push(packed);
  }, [loop]);
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/event-args.js
const headerKind = "header";
const groupHeaderKind = "group-header";
const outOfBoundsKind = "out-of-bounds";
var OutOfBoundsRegionAxis;
(function (OutOfBoundsRegionAxis) {
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Start"] = -2] = "Start";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["StartPadding"] = -1] = "StartPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Center"] = 0] = "Center";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["EndPadding"] = 1] = "EndPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["End"] = 2] = "End";
})(OutOfBoundsRegionAxis || (OutOfBoundsRegionAxis = {}));
function mouseEventArgsAreEqual(args, other) {
  if (args === other) return true;
  if ((args === null || args === void 0 ? void 0 : args.kind) === "out-of-bounds") {
    return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]) && (args === null || args === void 0 ? void 0 : args.region[0]) === (other === null || other === void 0 ? void 0 : other.region[0]) && (args === null || args === void 0 ? void 0 : args.region[1]) === (other === null || other === void 0 ? void 0 : other.region[1]);
  }
  return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]);
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/data-grid.js



















const fillHandleClickSize = 6;
const getRowData = (cell, getCellRenderer) => {
  var _r$getAccessibilitySt;
  if (cell.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom) return cell.copyData;
  const r = getCellRenderer === null || getCellRenderer === void 0 ? void 0 : getCellRenderer(cell);
  return (_r$getAccessibilitySt = r === null || r === void 0 ? void 0 : r.getAccessibilityString(cell)) !== null && _r$getAccessibilitySt !== void 0 ? _r$getAccessibilitySt : "";
};
const DataGrid = (p, forwardedRef) => {
  var _p$translateX, _p$translateY, _experimental$enableF, _experimental$enableS, _eventTargetRef$curre, _eventTargetRef$curre2, _eventTargetRef$curre3, _eventTargetRef$curre4, _eventTargetRef$curre5, _eventTargetRef$curre6;
  const {
    width,
    height,
    accessibilityHeight,
    columns,
    cellXOffset: cellXOffsetReal,
    cellYOffset,
    headerHeight,
    fillHandle = false,
    groupHeaderHeight,
    rowHeight,
    rows,
    getCellContent,
    getRowThemeOverride,
    onHeaderMenuClick,
    enableGroups,
    isFilling,
    onCanvasFocused,
    onCanvasBlur,
    isFocused,
    selection,
    freezeColumns,
    onContextMenu,
    freezeTrailingRows,
    fixedShadowX = true,
    fixedShadowY = true,
    drawFocusRing = true,
    onMouseDown,
    onMouseUp,
    onMouseMoveRaw,
    onMouseMove,
    onItemHovered,
    dragAndDropState,
    firstColAccessible,
    onKeyDown,
    onKeyUp,
    highlightRegions,
    canvasRef,
    onDragStart,
    onDragEnd,
    eventTargetRef,
    isResizing,
    resizeColumn: resizeCol,
    isDragging,
    isDraggable = false,
    allowResize,
    disabledRows,
    hasAppendRow,
    getGroupDetails,
    theme,
    prelightCells,
    headerIcons,
    verticalBorder,
    drawCell: drawCellCallback,
    drawHeader: drawHeaderCallback,
    onCellFocused,
    onDragOverCell,
    onDrop,
    onDragLeave,
    imageWindowLoader,
    smoothScrollX = false,
    smoothScrollY = false,
    experimental,
    getCellRenderer
  } = p;
  const translateX = (_p$translateX = p.translateX) !== null && _p$translateX !== void 0 ? _p$translateX : 0;
  const translateY = (_p$translateY = p.translateY) !== null && _p$translateY !== void 0 ? _p$translateY : 0;
  const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));
  const ref = react.useRef(null);
  const imageLoader = imageWindowLoader;
  const damageRegion = react.useRef();
  const [scrolling, setScrolling] = react.useState(false);
  const hoverValues = react.useRef([]);
  const lastBlitData = react.useRef();
  const [hoveredItemInfo, setHoveredItemInfo] = react.useState();
  const [hoveredOnEdge, setHoveredOnEdge] = react.useState();
  const overlayRef = react.useRef(null);
  const [drawCursorOverride, setDrawCursorOverride] = react.useState();
  const [lastWasTouch, setLastWasTouch] = react.useState(false);
  const lastWasTouchRef = react.useRef(lastWasTouch);
  lastWasTouchRef.current = lastWasTouch;
  const spriteManager = react.useMemo(() => new SpriteManager(headerIcons, () => {
    lastArgsRef.current = undefined;
    lastDrawRef.current();
  }), [headerIcons]);
  const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;
  const scrollingStopRef = react.useRef(-1);
  const enableFirefoxRescaling = ((_experimental$enableF = experimental === null || experimental === void 0 ? void 0 : experimental.enableFirefoxRescaling) !== null && _experimental$enableF !== void 0 ? _experimental$enableF : false) && browserIsFirefox.value;
  const enableSafariRescaling = ((_experimental$enableS = experimental === null || experimental === void 0 ? void 0 : experimental.enableSafariRescaling) !== null && _experimental$enableS !== void 0 ? _experimental$enableS : false) && browserIsSafari.value;
  react.useLayoutEffect(() => {
    if (window.devicePixelRatio === 1 || !enableFirefoxRescaling && !enableSafariRescaling) return;
    if (scrollingStopRef.current !== -1) {
      setScrolling(true);
    }
    window.clearTimeout(scrollingStopRef.current);
    scrollingStopRef.current = window.setTimeout(() => {
      setScrolling(false);
      scrollingStopRef.current = -1;
    }, 200);
  }, [cellYOffset, cellXOffset, translateX, translateY, enableFirefoxRescaling, enableSafariRescaling]);
  const mappedColumns = (0,data_grid_lib/* useMappedColumns */.NZ)(columns, freezeColumns);
  const stickyX = fixedShadowX ? (0,data_grid_lib/* getStickyWidth */.G6)(mappedColumns, dragAndDropState) : 0;
  const getBoundsForItem = react.useCallback((canvas, col, row) => {
    const rect = canvas.getBoundingClientRect();
    if (col >= mappedColumns.length || row >= rows) {
      return undefined;
    }
    const scale = rect.width / width;
    const result = (0,data_grid_lib/* computeBounds */.Ve)(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
    if (scale !== 1) {
      result.x *= scale;
      result.y *= scale;
      result.width *= scale;
      result.height *= scale;
    }
    result.x += rect.x;
    result.y += rect.y;
    return result;
  }, [width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight]);
  const getMouseArgsForPosition = react.useCallback((canvas, posX, posY, ev) => {
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / width;
    const x = (posX - rect.left) / scale;
    const y = (posY - rect.top) / scale;
    const edgeDetectionBuffer = 5;
    const effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, undefined, translateX);
    let button = 0;
    let buttons = 0;
    if (ev instanceof MouseEvent) {
      button = ev.button;
      buttons = ev.buttons;
    }
    const col = (0,data_grid_lib/* getColumnIndexForX */.oK)(x, effectiveCols, translateX);
    const row = (0,data_grid_lib/* getRowIndexForY */.pV)(y, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows);
    const shiftKey = (ev === null || ev === void 0 ? void 0 : ev.shiftKey) === true;
    const ctrlKey = (ev === null || ev === void 0 ? void 0 : ev.ctrlKey) === true;
    const metaKey = (ev === null || ev === void 0 ? void 0 : ev.metaKey) === true;
    const isTouch = ev !== undefined && !(ev instanceof MouseEvent) || (ev === null || ev === void 0 ? void 0 : ev.pointerType) === "touch";
    const scrollEdge = [x < 0 ? -1 : width < x ? 1 : 0, y < totalHeaderHeight ? -1 : height < y ? 1 : 0];
    let result;
    if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
      const horizontal = x > width ? 1 : x < 0 ? -1 : 0;
      const vertical = y > height ? 1 : y < 0 ? -1 : 0;
      let innerHorizontal = horizontal * 2;
      let innerVertical = vertical * 2;
      if (horizontal === 0) innerHorizontal = col === -1 ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      if (vertical === 0) innerVertical = row === undefined ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      let isEdge = false;
      if (col === -1 && row === -1) {
        const b = getBoundsForItem(canvas, mappedColumns.length - 1, -1);
        (0,support/* assert */.hu)(b !== undefined);
        isEdge = posX < b.x + b.width + edgeDetectionBuffer;
      }
      const isMaybeScrollbar = x > width && x < width + (0,utils/* getScrollBarWidth */.Iz)() || y > height && y < height + (0,utils/* getScrollBarWidth */.Iz)();
      result = {
        kind: outOfBoundsKind,
        location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row !== null && row !== void 0 ? row : rows - 1],
        region: [innerHorizontal, innerVertical],
        shiftKey,
        ctrlKey,
        metaKey,
        isEdge,
        isTouch,
        button,
        buttons,
        scrollEdge,
        isMaybeScrollbar
      };
    } else if (row <= -1) {
      let bounds = getBoundsForItem(canvas, col, row);
      (0,support/* assert */.hu)(bounds !== undefined);
      let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;
      const previousCol = col - 1;
      if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
        var _mappedColumns$previo;
        isEdge = true;
        bounds = getBoundsForItem(canvas, previousCol, row);
        (0,support/* assert */.hu)(bounds !== undefined);
        result = {
          kind: enableGroups && row === -2 ? groupHeaderKind : headerKind,
          location: [previousCol, row],
          bounds: bounds,
          group: (_mappedColumns$previo = mappedColumns[previousCol].group) !== null && _mappedColumns$previo !== void 0 ? _mappedColumns$previo : "",
          isEdge,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      } else {
        var _mappedColumns$col$gr;
        result = {
          kind: enableGroups && row === -2 ? groupHeaderKind : headerKind,
          group: (_mappedColumns$col$gr = mappedColumns[col].group) !== null && _mappedColumns$col$gr !== void 0 ? _mappedColumns$col$gr : "",
          location: [col, row],
          bounds: bounds,
          isEdge,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      }
    } else {
      const bounds = getBoundsForItem(canvas, col, row);
      (0,support/* assert */.hu)(bounds !== undefined);
      const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;
      let isFillHandle = false;
      if (fillHandle && selection.current !== undefined) {
        const fillHandleLocation = (0,data_grid_lib/* rectBottomRight */.zU)(selection.current.range);
        const fillHandleCellBounds = getBoundsForItem(canvas, fillHandleLocation[0], fillHandleLocation[1]);
        if (fillHandleCellBounds !== undefined) {
          const handleLogicalCenterX = fillHandleCellBounds.x + fillHandleCellBounds.width - 2;
          const handleLogicalCenterY = fillHandleCellBounds.y + fillHandleCellBounds.height - 2;
          isFillHandle = Math.abs(handleLogicalCenterX - posX) < fillHandleClickSize && Math.abs(handleLogicalCenterY - posY) < fillHandleClickSize;
        }
      }
      result = {
        kind: "cell",
        location: [col, row],
        bounds: bounds,
        isEdge,
        shiftKey,
        ctrlKey,
        isFillHandle,
        metaKey,
        isTouch,
        localEventX: posX - bounds.x,
        localEventY: posY - bounds.y,
        button,
        buttons,
        scrollEdge
      };
    }
    return result;
  }, [width, mappedColumns, cellXOffset, translateX, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, getBoundsForItem, fillHandle, selection, totalHeaderHeight]);
  const [hoveredItem] = hoveredItemInfo !== null && hoveredItemInfo !== void 0 ? hoveredItemInfo : [];
  const enqueueRef = react.useRef(() => {});
  const hoverInfoRef = react.useRef(hoveredItemInfo);
  hoverInfoRef.current = hoveredItemInfo;
  const [bufferACtx, bufferBCtx] = react.useMemo(() => {
    const a = document.createElement("canvas");
    const b = document.createElement("canvas");
    a.style["display"] = "none";
    a.style["opacity"] = "0";
    a.style["position"] = "fixed";
    b.style["display"] = "none";
    b.style["opacity"] = "0";
    b.style["position"] = "fixed";
    return [a.getContext("2d", {
      alpha: false
    }), b.getContext("2d", {
      alpha: false
    })];
  }, []);
  react.useLayoutEffect(() => {
    if (bufferACtx === null || bufferBCtx === null) return;
    document.documentElement.append(bufferACtx.canvas);
    document.documentElement.append(bufferBCtx.canvas);
    return () => {
      bufferACtx.canvas.remove();
      bufferBCtx.canvas.remove();
    };
  }, [bufferACtx, bufferBCtx]);
  const renderStateProvider = react.useMemo(() => new RenderStateProvider(), []);
  const maxDPR = enableFirefoxRescaling && scrolling ? 1 : enableSafariRescaling && scrolling ? 2 : 5;
  const minimumCellWidth = (experimental === null || experimental === void 0 ? void 0 : experimental.disableMinimumCellWidth) === true ? 1 : 10;
  const lastArgsRef = react.useRef();
  const canvasCtx = react.useRef(null);
  const overlayCtx = react.useRef(null);
  const draw = react.useCallback(() => {
    var _experimental$hyperWr, _experimental$renderS, _hoverInfoRef$current;
    const canvas = ref.current;
    const overlay = overlayRef.current;
    if (canvas === null || overlay === null) return;
    if (canvasCtx.current === null) {
      canvasCtx.current = canvas.getContext("2d", {
        alpha: false
      });
      canvas.width = 0;
      canvas.height = 0;
    }
    if (overlayCtx.current === null) {
      overlayCtx.current = overlay.getContext("2d", {
        alpha: false
      });
      overlay.width = 0;
      overlay.height = 0;
    }
    if (canvasCtx.current === null || overlayCtx.current === null || bufferACtx === null || bufferBCtx === null) {
      return;
    }
    let didOverride = false;
    const overrideCursor = cursor => {
      didOverride = true;
      setDrawCursorOverride(cursor);
    };
    const last = lastArgsRef.current;
    const current = {
      headerCanvasCtx: overlayCtx.current,
      canvasCtx: canvasCtx.current,
      bufferACtx,
      bufferBCtx,
      width,
      height,
      cellXOffset,
      cellYOffset,
      translateX: Math.round(translateX),
      translateY: Math.round(translateY),
      mappedColumns,
      enableGroups,
      freezeColumns,
      dragAndDropState,
      theme,
      headerHeight,
      groupHeaderHeight,
      disabledRows: disabledRows !== null && disabledRows !== void 0 ? disabledRows : data_grid_types/* CompactSelection.empty */.EV.empty(),
      rowHeight,
      verticalBorder,
      isResizing,
      resizeCol,
      isFocused,
      selection,
      fillHandle,
      drawCellCallback,
      hasAppendRow,
      overrideCursor,
      maxScaleFactor: maxDPR,
      freezeTrailingRows,
      rows,
      drawFocus: drawFocusRing,
      getCellContent,
      getGroupDetails: getGroupDetails !== null && getGroupDetails !== void 0 ? getGroupDetails : name => ({
        name
      }),
      getRowThemeOverride,
      drawHeaderCallback,
      prelightCells,
      highlightRegions,
      imageLoader,
      lastBlitData,
      damage: damageRegion.current,
      hoverValues: hoverValues.current,
      hoverInfo: hoverInfoRef.current,
      spriteManager,
      scrolling,
      hyperWrapping: (_experimental$hyperWr = experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping) !== null && _experimental$hyperWr !== void 0 ? _experimental$hyperWr : false,
      touchMode: lastWasTouch,
      enqueue: enqueueRef.current,
      renderStateProvider,
      renderStrategy: (_experimental$renderS = experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy) !== null && _experimental$renderS !== void 0 ? _experimental$renderS : browserIsSafari.value ? "double-buffer" : "single-buffer",
      getCellRenderer,
      minimumCellWidth
    };
    if (current.damage === undefined) {
      lastArgsRef.current = current;
      drawGrid(current, last);
    } else {
      drawGrid(current, undefined);
    }
    if (!didOverride && (current.damage === undefined || current.damage.has(hoverInfoRef === null || hoverInfoRef === void 0 || (_hoverInfoRef$current = hoverInfoRef.current) === null || _hoverInfoRef$current === void 0 ? void 0 : _hoverInfoRef$current[0]))) {
      setDrawCursorOverride(undefined);
    }
  }, [bufferACtx, bufferBCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, enableGroups, freezeColumns, dragAndDropState, theme, headerHeight, groupHeaderHeight, disabledRows, rowHeight, verticalBorder, isResizing, hasAppendRow, resizeCol, isFocused, selection, fillHandle, freezeTrailingRows, rows, drawFocusRing, maxDPR, getCellContent, getGroupDetails, getRowThemeOverride, drawCellCallback, drawHeaderCallback, prelightCells, highlightRegions, imageLoader, spriteManager, scrolling, experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping, experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy, lastWasTouch, renderStateProvider, getCellRenderer, minimumCellWidth]);
  const lastDrawRef = react.useRef(draw);
  react.useLayoutEffect(() => {
    draw();
    lastDrawRef.current = draw;
  }, [draw]);
  react.useLayoutEffect(() => {
    const fn = async () => {
      var _document;
      if (((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === undefined) return;
      await document.fonts.ready;
      lastArgsRef.current = undefined;
      lastDrawRef.current();
    };
    void fn();
  }, []);
  const damageInternal = react.useCallback(locations => {
    damageRegion.current = locations;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const enqueue = useAnimationQueue(damageInternal);
  enqueueRef.current = enqueue;
  const damage = react.useCallback(cells => {
    damageInternal(new CellSet(cells.map(x => x.cell)));
  }, [damageInternal]);
  imageLoader.setCallback(damageInternal);
  const [overFill, setOverFill] = react.useState(false);
  const [hCol, hRow] = hoveredItem !== null && hoveredItem !== void 0 ? hoveredItem : [];
  const headerHovered = hCol !== undefined && hRow === -1;
  const groupHeaderHovered = hCol !== undefined && hRow === -2;
  let clickableInnerCellHovered = false;
  let editableBoolHovered = false;
  let cursorOverride = drawCursorOverride;
  if (cursorOverride === undefined && hCol !== undefined && hRow !== undefined && hRow > -1 && hRow < rows) {
    const cell = getCellContent([hCol, hRow], true);
    clickableInnerCellHovered = cell.kind === data_grid_types/* InnerGridCellKind.NewRow */.$o.NewRow || cell.kind === data_grid_types/* InnerGridCellKind.Marker */.$o.Marker && cell.markerKind !== "number";
    editableBoolHovered = cell.kind === data_grid_types/* GridCellKind.Boolean */.p6.Boolean && (0,data_grid_types/* booleanCellIsEditable */.kf)(cell);
    cursorOverride = cell.cursor;
  }
  const canDrag = hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false;
  const cursor = isDragging ? "grabbing" : canDrag || isResizing ? "col-resize" : overFill || isFilling ? "crosshair" : cursorOverride !== undefined ? cursorOverride : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered ? "pointer" : "default";
  const style = react.useMemo(() => ({
    contain: "strict",
    display: "block",
    cursor
  }), [cursor]);
  const lastSetCursor = react.useRef("default");
  const target = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
  if (target !== null && target !== undefined && lastSetCursor.current !== style.cursor) {
    target.style.cursor = lastSetCursor.current = style.cursor;
  }
  const groupHeaderActionForEvent = react.useCallback((group, bounds, localEventX, localEventY) => {
    if (getGroupDetails === undefined) return undefined;
    const groupDesc = getGroupDetails(group);
    if (groupDesc.actions !== undefined) {
      const boxes = getActionBoundsForGroup(bounds, groupDesc.actions);
      for (const [i, box] of boxes.entries()) {
        if (pointInRect(box, localEventX + bounds.x, localEventY + box.y)) {
          return groupDesc.actions[i];
        }
      }
    }
    return undefined;
  }, [getGroupDetails]);
  const isOverHeaderMenu = react.useCallback((canvas, col, clientX, clientY) => {
    const header = columns[col];
    if (!isDragging && !isResizing && header.hasMenu === true && !(hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false)) {
      const headerBounds = getBoundsForItem(canvas, col, -1);
      (0,support/* assert */.hu)(headerBounds !== undefined);
      const menuBounds = getHeaderMenuBounds(headerBounds.x, headerBounds.y, headerBounds.width, headerBounds.height, (0,utils/* direction */.o7)(header.title) === "rtl");
      if (clientX > menuBounds.x && clientX < menuBounds.x + menuBounds.width && clientY > menuBounds.y && clientY < menuBounds.y + menuBounds.height) {
        return headerBounds;
      }
    }
    return undefined;
  }, [columns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing]);
  const downTime = react.useRef(0);
  const downPosition = react.useRef();
  const mouseDown = react.useRef(false);
  const onMouseDownImpl = react.useCallback(ev => {
    const canvas = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas === null || ev.target !== canvas && ev.target !== eventTarget) return;
    mouseDown.current = true;
    let clientX;
    let clientY;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
    } else {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }
    if (ev.target === eventTarget && eventTarget !== null) {
      const bounds = eventTarget.getBoundingClientRect();
      if (clientX > bounds.right || clientY > bounds.bottom) return;
    }
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    downPosition.current = args.location;
    if (args.isTouch) {
      downTime.current = Date.now();
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (args.kind === headerKind && isOverHeaderMenu(canvas, args.location[0], clientX, clientY) !== undefined) {
      return;
    } else if (args.kind === groupHeaderKind) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined) {
        return;
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args);
    if (!args.isTouch && isDraggable !== true && isDraggable !== args.kind && args.button < 3 && args.button !== 1) {
      ev.preventDefault();
    }
  }, [eventTargetRef, isDraggable, getMouseArgsForPosition, groupHeaderActionForEvent, isOverHeaderMenu, onMouseDown]);
  (0,utils/* useEventListener */.OR)("touchstart", onMouseDownImpl, window, false);
  (0,utils/* useEventListener */.OR)("mousedown", onMouseDownImpl, window, false);
  const lastUpTime = react.useRef(0);
  const onMouseUpImpl = react.useCallback(ev => {
    const lastUpTimeValue = lastUpTime.current;
    lastUpTime.current = Date.now();
    const canvas = ref.current;
    mouseDown.current = false;
    if (onMouseUp === undefined || canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev.target !== canvas && ev.target !== eventTarget;
    let clientX;
    let clientY;
    let canCancel = true;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
      canCancel = ev.button < 3;
      if (ev.pointerType === "touch") {
        return;
      }
    } else {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }
    let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    if (args.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
      args = {
        ...args,
        isLongTouch: true
      };
    }
    if (lastUpTimeValue !== 0 && Date.now() - lastUpTimeValue < (args.isTouch ? 1000 : 500)) {
      args = {
        ...args,
        isDoubleClick: true
      };
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (!isOutside && ev.cancelable && canCancel) {
      ev.preventDefault();
    }
    const [col] = args.location;
    const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
    if (args.kind === headerKind && headerBounds !== undefined) {
      var _downPosition$current, _downPosition$current2;
      if (args.button !== 0 || ((_downPosition$current = downPosition.current) === null || _downPosition$current === void 0 ? void 0 : _downPosition$current[0]) !== col || ((_downPosition$current2 = downPosition.current) === null || _downPosition$current2 === void 0 ? void 0 : _downPosition$current2[1]) !== -1) {
        onMouseUp(args, true);
      }
      return;
    } else if (args.kind === groupHeaderKind) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined) {
        if (args.button === 0) {
          action.onClick(args);
        }
        return;
      }
    }
    onMouseUp(args, isOutside);
  }, [onMouseUp, eventTargetRef, getMouseArgsForPosition, isOverHeaderMenu, groupHeaderActionForEvent]);
  (0,utils/* useEventListener */.OR)("mouseup", onMouseUpImpl, window, false);
  (0,utils/* useEventListener */.OR)("touchend", onMouseUpImpl, window, false);
  const onClickImpl = react.useCallback(ev => {
    const canvas = ref.current;
    if (canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev.target !== canvas && ev.target !== eventTarget;
    let clientX;
    let clientY;
    let canCancel = true;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
      canCancel = ev.button < 3;
    } else {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (!isOutside && ev.cancelable && canCancel) {
      ev.preventDefault();
    }
    const [col] = args.location;
    const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
    if (args.kind === headerKind && headerBounds !== undefined) {
      var _downPosition$current3, _downPosition$current4;
      if (args.button === 0 && ((_downPosition$current3 = downPosition.current) === null || _downPosition$current3 === void 0 ? void 0 : _downPosition$current3[0]) === col && ((_downPosition$current4 = downPosition.current) === null || _downPosition$current4 === void 0 ? void 0 : _downPosition$current4[1]) === -1) {
        onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col, headerBounds);
      }
    } else if (args.kind === groupHeaderKind) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined && args.button === 0) {
        action.onClick(args);
      }
    }
  }, [eventTargetRef, getMouseArgsForPosition, isOverHeaderMenu, onHeaderMenuClick, groupHeaderActionForEvent]);
  (0,utils/* useEventListener */.OR)("click", onClickImpl, window, false);
  const onContextMenuImpl = react.useCallback(ev => {
    const canvas = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas === null || ev.target !== canvas && ev.target !== eventTarget || onContextMenu === undefined) return;
    const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
    onContextMenu(args, () => {
      if (ev.cancelable) ev.preventDefault();
    });
  }, [eventTargetRef, getMouseArgsForPosition, onContextMenu]);
  (0,utils/* useEventListener */.OR)("contextmenu", onContextMenuImpl, (_eventTargetRef$curre = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre !== void 0 ? _eventTargetRef$curre : null, false);
  const onAnimationFrame = react.useCallback(values => {
    damageRegion.current = new CellSet(values.map(x => x.item));
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const animManagerValue = react.useMemo(() => new AnimationManager(onAnimationFrame), [onAnimationFrame]);
  const animationManager = react.useRef(animManagerValue);
  animationManager.current = animManagerValue;
  react.useLayoutEffect(() => {
    const am = animationManager.current;
    if (hoveredItem === undefined || hoveredItem[1] < 0) {
      am.setHovered(hoveredItem);
      return;
    }
    const cell = getCellContent(hoveredItem, true);
    const r = getCellRenderer(cell);
    am.setHovered(r === undefined && cell.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom || (r === null || r === void 0 ? void 0 : r.needsHover) === true ? hoveredItem : undefined);
  }, [getCellContent, getCellRenderer, hoveredItem]);
  const hoveredRef = react.useRef();
  const onMouseMoveImpl = react.useCallback(ev => {
    const canvas = ref.current;
    if (canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isIndirect = ev.target !== canvas && ev.target !== eventTarget;
    const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
    if (args.kind !== "out-of-bounds" && isIndirect && !mouseDown.current && !args.isTouch) {
      return;
    }
    const maybeSetHoveredInfo = (newVal, needPosition) => {
      setHoveredItemInfo(cv => {
        if (cv === newVal) return cv;
        if ((cv === null || cv === void 0 ? void 0 : cv[0][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][0]) && (cv === null || cv === void 0 ? void 0 : cv[0][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][1]) && ((cv === null || cv === void 0 ? void 0 : cv[1][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][0]) && (cv === null || cv === void 0 ? void 0 : cv[1][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][1]) || !needPosition)) {
          return cv;
        }
        return newVal;
      });
    };
    if (!mouseEventArgsAreEqual(args, hoveredRef.current)) {
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args);
      maybeSetHoveredInfo(args.kind === outOfBoundsKind ? undefined : [args.location, [args.localEventX, args.localEventY]], true);
      hoveredRef.current = args;
    } else if (args.kind === "cell" || args.kind === headerKind || args.kind === groupHeaderKind) {
      let needsDamageCell = false;
      let needsHoverPosition = true;
      if (args.kind === "cell") {
        var _getCellRenderer;
        const toCheck = getCellContent(args.location);
        const rendererNeeds = (_getCellRenderer = getCellRenderer(toCheck)) === null || _getCellRenderer === void 0 ? void 0 : _getCellRenderer.needsHoverPosition;
        needsHoverPosition = rendererNeeds !== null && rendererNeeds !== void 0 ? rendererNeeds : toCheck.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom;
        needsDamageCell = needsHoverPosition;
      } else if (args.kind === groupHeaderKind) {
        needsDamageCell = true;
      }
      const newInfo = [args.location, [args.localEventX, args.localEventY]];
      maybeSetHoveredInfo(newInfo, needsHoverPosition);
      hoverInfoRef.current = newInfo;
      if (needsDamageCell) {
        damageInternal(new CellSet([args.location]));
      }
    }
    const notRowMarkerCol = args.location[0] >= (firstColAccessible ? 0 : 1);
    setHoveredOnEdge(args.kind === headerKind && args.isEdge && notRowMarkerCol && allowResize === true);
    setOverFill(args.kind === "cell" && args.isFillHandle);
    onMouseMoveRaw === null || onMouseMoveRaw === void 0 || onMouseMoveRaw(ev);
    onMouseMove(args);
  }, [eventTargetRef, getMouseArgsForPosition, firstColAccessible, allowResize, onMouseMoveRaw, onMouseMove, onItemHovered, getCellContent, getCellRenderer, damageInternal]);
  (0,utils/* useEventListener */.OR)("mousemove", onMouseMoveImpl, window, true);
  const onKeyDownImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null) return;
    let bounds;
    let location = undefined;
    if (selection.current !== undefined) {
      bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown({
      bounds,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      cancel: () => undefined,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location
    });
  }, [onKeyDown, selection, getBoundsForItem]);
  const onKeyUpImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null) return;
    let bounds;
    let location = undefined;
    if (selection.current !== undefined) {
      bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyUp === null || onKeyUp === void 0 || onKeyUp({
      bounds,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      cancel: () => undefined,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location
    });
  }, [onKeyUp, selection, getBoundsForItem]);
  const refImpl = react.useCallback(instance => {
    ref.current = instance;
    if (canvasRef !== undefined) {
      canvasRef.current = instance;
    }
  }, [canvasRef]);
  const onDragStartImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null || isDraggable === false || isResizing) {
      event.preventDefault();
      return;
    }
    let dragMime;
    let dragData;
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    if (isDraggable !== true && args.kind !== isDraggable) {
      event.preventDefault();
      return;
    }
    const setData = (mime, payload) => {
      dragMime = mime;
      dragData = payload;
    };
    let dragImage;
    let dragImageX;
    let dragImageY;
    const setDragImage = (image, x, y) => {
      dragImage = image;
      dragImageX = x;
      dragImageY = y;
    };
    let prevented = false;
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args,
      setData,
      setDragImage,
      preventDefault: () => prevented = true,
      defaultPrevented: () => prevented
    });
    if (!prevented && dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
      event.dataTransfer.setData(dragMime, dragData);
      event.dataTransfer.effectAllowed = "copyLink";
      if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
        event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
      } else {
        const [col, row] = args.location;
        if (row !== undefined) {
          var _window$devicePixelRa;
          const offscreen = document.createElement("canvas");
          const boundsForDragTarget = getBoundsForItem(canvas, col, row);
          (0,support/* assert */.hu)(boundsForDragTarget !== undefined);
          const dpr = Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1);
          offscreen.width = boundsForDragTarget.width * dpr;
          offscreen.height = boundsForDragTarget.height * dpr;
          const ctx = offscreen.getContext("2d");
          if (ctx !== null) {
            ctx.scale(dpr, dpr);
            ctx.textBaseline = "middle";
            if (row === -1) {
              ctx.font = theme.headerFontFull;
              ctx.fillStyle = theme.bgHeader;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawHeader(ctx, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, mappedColumns[col], false, theme, false, false, 0, spriteManager, drawHeaderCallback, false);
            } else {
              ctx.font = theme.baseFontFull;
              ctx.fillStyle = theme.bgCell;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawCell(ctx, getCellContent([col, row]), 0, row, false, false, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, false, theme, theme.bgCell, imageLoader, spriteManager, 1, undefined, false, 0, undefined, undefined, undefined, renderStateProvider, getCellRenderer, () => undefined);
            }
          }
          offscreen.style.left = "-100%";
          offscreen.style.position = "absolute";
          offscreen.style.width = `${boundsForDragTarget.width}px`;
          offscreen.style.height = `${boundsForDragTarget.height}px`;
          document.body.append(offscreen);
          event.dataTransfer.setDragImage(offscreen, boundsForDragTarget.width / 2, boundsForDragTarget.height / 2);
          window.setTimeout(() => {
            offscreen.remove();
          }, 0);
        }
      }
    } else {
      event.preventDefault();
    }
  }, [isDraggable, isResizing, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme, mappedColumns, spriteManager, drawHeaderCallback, getCellContent, imageLoader, renderStateProvider, getCellRenderer]);
  (0,utils/* useEventListener */.OR)("dragstart", onDragStartImpl, (_eventTargetRef$curre2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre2 !== void 0 ? _eventTargetRef$curre2 : null, false, false);
  const activeDropTarget = react.useRef();
  const onDragOverImpl = react.useCallback(event => {
    var _activeDropTarget$cur;
    const canvas = ref.current;
    if (onDrop !== undefined) {
      event.preventDefault();
    }
    if (canvas === null || onDragOverCell === undefined) {
      return;
    }
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    const [rawCol, row] = args.location;
    const col = rawCol - (firstColAccessible ? 0 : 1);
    const [activeCol, activeRow] = (_activeDropTarget$cur = activeDropTarget.current) !== null && _activeDropTarget$cur !== void 0 ? _activeDropTarget$cur : [];
    if (activeCol !== col || activeRow !== row) {
      activeDropTarget.current = [col, row];
      onDragOverCell([col, row], event.dataTransfer);
    }
  }, [firstColAccessible, getMouseArgsForPosition, onDragOverCell, onDrop]);
  (0,utils/* useEventListener */.OR)("dragover", onDragOverImpl, (_eventTargetRef$curre3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre3 !== void 0 ? _eventTargetRef$curre3 : null, false, false);
  const onDragEndImpl = react.useCallback(() => {
    activeDropTarget.current = undefined;
    onDragEnd === null || onDragEnd === void 0 || onDragEnd();
  }, [onDragEnd]);
  (0,utils/* useEventListener */.OR)("dragend", onDragEndImpl, (_eventTargetRef$curre4 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre4 !== void 0 ? _eventTargetRef$curre4 : null, false, false);
  const onDropImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null || onDrop === undefined) {
      return;
    }
    event.preventDefault();
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    const [rawCol, row] = args.location;
    const col = rawCol - (firstColAccessible ? 0 : 1);
    onDrop([col, row], event.dataTransfer);
  }, [firstColAccessible, getMouseArgsForPosition, onDrop]);
  (0,utils/* useEventListener */.OR)("drop", onDropImpl, (_eventTargetRef$curre5 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre5 !== void 0 ? _eventTargetRef$curre5 : null, false, false);
  const onDragLeaveImpl = react.useCallback(() => {
    onDragLeave === null || onDragLeave === void 0 || onDragLeave();
  }, [onDragLeave]);
  (0,utils/* useEventListener */.OR)("dragleave", onDragLeaveImpl, (_eventTargetRef$curre6 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre6 !== void 0 ? _eventTargetRef$curre6 : null, false, false);
  const selectionRef = react.useRef(selection);
  selectionRef.current = selection;
  const focusRef = react.useRef(null);
  const focusElement = react.useCallback(el => {
    if (ref.current === null || !ref.current.contains(document.activeElement)) return;
    if (el === null && selectionRef.current.current !== undefined) {
      var _canvasRef$current;
      canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus({
        preventScroll: true
      });
    } else if (el !== null) {
      el.focus({
        preventScroll: true
      });
    }
    focusRef.current = el;
  }, [canvasRef]);
  react.useImperativeHandle(forwardedRef, () => ({
    focus: () => {
      const el = focusRef.current;
      if (el === null || !document.contains(el)) {
        var _canvasRef$current2;
        canvasRef === null || canvasRef === void 0 || (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 || _canvasRef$current2.focus({
          preventScroll: true
        });
      } else {
        el.focus({
          preventScroll: true
        });
      }
    },
    getBounds: (col, row) => {
      if (canvasRef === undefined || canvasRef.current === null) {
        return undefined;
      }
      return getBoundsForItem(canvasRef.current, col !== null && col !== void 0 ? col : 0, row !== null && row !== void 0 ? row : -1);
    },
    damage
  }), [canvasRef, damage, getBoundsForItem]);
  const lastFocusedSubdomNode = react.useRef();
  const accessibilityTree = (0,utils/* useDebouncedMemo */.Qy)(() => {
    var _effectiveCols$, _selection$current$ce, _selection$current, _selection$current2;
    if (width < 50 || (experimental === null || experimental === void 0 ? void 0 : experimental.disableAccessibilityTree) === true) return null;
    let effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    const colOffset = firstColAccessible ? 0 : -1;
    if (!firstColAccessible && ((_effectiveCols$ = effectiveCols[0]) === null || _effectiveCols$ === void 0 ? void 0 : _effectiveCols$.sourceIndex) === 0) {
      effectiveCols = effectiveCols.slice(1);
    }
    const [fCol, fRow] = (_selection$current$ce = (_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell) !== null && _selection$current$ce !== void 0 ? _selection$current$ce : [];
    const range = (_selection$current2 = selection.current) === null || _selection$current2 === void 0 ? void 0 : _selection$current2.range;
    const visibleCols = effectiveCols.map(c => c.sourceIndex);
    const visibleRows = range_default()(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));
    if (fCol !== undefined && fRow !== undefined && !(visibleCols.includes(fCol) && visibleRows.includes(fRow))) {
      focusElement(null);
    }
    return react.createElement("table", {
      key: "access-tree",
      role: "grid",
      "aria-rowcount": rows + 1,
      "aria-multiselectable": "true",
      "aria-colcount": mappedColumns.length + colOffset
    }, react.createElement("thead", {
      role: "rowgroup"
    }, react.createElement("tr", {
      role: "row",
      "aria-rowindex": 1
    }, effectiveCols.map(c => (react.createElement("th", {
      role: "columnheader",
      "aria-selected": selection.columns.hasIndex(c.sourceIndex),
      "aria-colindex": c.sourceIndex + 1 + colOffset,
      tabIndex: -1,
      onFocus: e => {
        if (e.target === focusRef.current) return;
        return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused([c.sourceIndex, -1]);
      },
      key: c.sourceIndex
    }, c.title))))), react.createElement("tbody", {
      role: "rowgroup"
    }, visibleRows.map(row => (react.createElement("tr", {
      role: "row",
      "aria-selected": selection.rows.hasIndex(row),
      key: row,
      "aria-rowindex": row + 2
    }, effectiveCols.map(c => {
      const col = c.sourceIndex;
      const key = packColRowToNumber(col, row);
      const focused = fCol === col && fRow === row;
      const selected = range !== undefined && col >= range.x && col < range.x + range.width && row >= range.y && row < range.y + range.height;
      const id = `glide-cell-${col}-${row}`;
      const location = [col, row];
      const cellContent = getCellContent(location, true);
      return react.createElement("td", {
        key: key,
        role: "gridcell",
        "aria-colindex": col + 1 + colOffset,
        "aria-selected": selected,
        "aria-readonly": (0,data_grid_types/* isInnerOnlyCell */.rs)(cellContent) || !(0,data_grid_types/* isReadWriteCell */.Qo)(cellContent),
        id: id,
        "data-testid": id,
        onClick: () => {
          const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
          if (canvas === null || canvas === undefined) return;
          return onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
            bounds: getBoundsForItem(canvas, col, row),
            cancel: () => undefined,
            preventDefault: () => undefined,
            stopPropagation: () => undefined,
            ctrlKey: false,
            key: "Enter",
            keyCode: 13,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location
          });
        },
        onFocusCapture: e => {
          var _lastFocusedSubdomNod, _lastFocusedSubdomNod2;
          if (e.target === focusRef.current || ((_lastFocusedSubdomNod = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod === void 0 ? void 0 : _lastFocusedSubdomNod[0]) === col && ((_lastFocusedSubdomNod2 = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod2 === void 0 ? void 0 : _lastFocusedSubdomNod2[1]) === row) return;
          lastFocusedSubdomNode.current = location;
          return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused(location);
        },
        ref: focused ? focusElement : undefined,
        tabIndex: -1
      }, getRowData(cellContent, getCellRenderer));
    }))))));
  }, [width, mappedColumns, cellXOffset, dragAndDropState, translateX, rows, cellYOffset, accessibilityHeight, selection, focusElement, getCellContent, canvasRef, onKeyDown, getBoundsForItem, onCellFocused], 200);
  const opacityX = freezeColumns === 0 || !fixedShadowX ? 0 : cellXOffset > freezeColumns ? 1 : clamp_default()(-translateX / 100, 0, 1);
  const absoluteOffsetY = -cellYOffset * 32 + translateY;
  const opacityY = !fixedShadowY ? 0 : clamp_default()(-absoluteOffsetY / 100, 0, 1);
  const stickyShadow = react.useMemo(() => {
    if (!opacityX && !opacityY) {
      return null;
    }
    const styleX = {
      position: "absolute",
      top: 0,
      left: stickyX,
      width: width - stickyX,
      height: height,
      opacity: opacityX,
      pointerEvents: "none",
      transition: !smoothScrollX ? "opacity 0.2s" : undefined,
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    };
    const styleY = {
      position: "absolute",
      top: totalHeaderHeight,
      left: 0,
      width: width,
      height: height,
      opacity: opacityY,
      pointerEvents: "none",
      transition: !smoothScrollY ? "opacity 0.2s" : undefined,
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return react.createElement(react.Fragment, null, opacityX > 0 && react.createElement("div", {
      id: "shadow-x",
      style: styleX
    }), opacityY > 0 && react.createElement("div", {
      id: "shadow-y",
      style: styleY
    }));
  }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);
  const overlayStyle = react.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return react.createElement(react.Fragment, null, react.createElement("canvas", {
    "data-testid": "data-grid-canvas",
    tabIndex: 0,
    onKeyDown: onKeyDownImpl,
    onKeyUp: onKeyUpImpl,
    onFocus: onCanvasFocused,
    onBlur: onCanvasBlur,
    ref: refImpl,
    style: style
  }, accessibilityTree), react.createElement("canvas", {
    ref: overlayRef,
    style: overlayStyle
  }), stickyShadow);
};
/* harmony default export */ const data_grid = (react.memo(react.forwardRef(DataGrid)));
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-dnd/data-grid-dnd.js



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
  return react.createElement(data_grid, {
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
/* harmony default export */ const data_grid_dnd = (DataGridDnd);
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/resize-detector.js

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
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/scrolling-data-grid/use-kinetic-scroll.js

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
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/scrolling-data-grid/infinite-scroller.js






const _exp = () => p => p.isSafari ? "scroll" : "auto";
const ScrollRegionStyle = (0,dist/* styled */.z)('div')({
  name: "ScrollRegionStyle",
  class: "gdg-s1dgczr6",
  propsAsIs: false,
  vars: {
    "s1dgczr6-0": [_exp()]
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
  use_kinetic_scroll(kineticScrollPerfHack && browserIsSafari.value, onScroll, scroller);
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
  padders.push(react.createElement("div", {
    key: key++,
    style: {
      width: scrollWidth,
      height: 0
    }
  }));
  while (h < scrollHeight) {
    const toAdd = Math.min(5000000, scrollHeight - h);
    padders.push(react.createElement("div", {
      key: key++,
      style: {
        width: 0,
        height: toAdd
      }
    }));
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
  if ((width !== null && width !== void 0 ? width : 0) === 0 || (height !== null && height !== void 0 ? height : 0) === 0) return react.createElement("div", {
    ref: ref
  });
  return react.createElement("div", {
    ref: ref
  }, react.createElement(ScrollRegionStyle, {
    isSafari: browserIsSafari.value
  }, react.createElement("div", {
    className: "dvn-underlay"
  }, children), react.createElement("div", {
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
    onScroll: () => onScroll()
  }, react.createElement("div", {
    className: "dvn-scroll-inner" + (rightElement === undefined ? " dvn-hidden" : "")
  }, react.createElement("div", {
    className: "dvn-stack"
  }, padders), rightElement !== undefined && react.createElement(react.Fragment, null, !rightElementFill && react.createElement("div", {
    className: "dvn-spacer"
  }), react.createElement("div", {
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
    }
  }, rightElement))))));
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/scrolling-data-grid/scrolling-data-grid.js



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
  return react.createElement(InfiniteScroller, {
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
    initialSize: initialSize
  }, react.createElement(data_grid_dnd, {
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
  }));
};
/* harmony default export */ const scrolling_data_grid = (GridScroller);
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-search/data-grid-search-style.js

const SearchWrapper = (0,dist/* styled */.z)('div')({
  name: "SearchWrapper",
  class: "gdg-seveqep",
  propsAsIs: false
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-search/data-grid-search.js





const upArrow = react.createElement("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512"
}, react.createElement("path", {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "48",
  d: "M112 244l144-144 144 144M256 120v292"
}));
const downArrow = react.createElement("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512"
}, react.createElement("path", {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "48",
  d: "M112 268l144 144 144-144M256 392V100"
}));
const closeX = react.createElement("svg", {
  className: "button-icon",
  viewBox: "0 0 512 512"
}, react.createElement("path", {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "32",
  d: "M368 368L144 144M368 144L144 368"
}));
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
  const abortControllerRef = react.useRef();
  if (abortControllerRef.current === undefined) abortControllerRef.current = new AbortController();
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
    return react.createElement(SearchWrapper, {
      className: showSearch ? "" : "out",
      onMouseDown: cancelEvent,
      onMouseMove: cancelEvent,
      onMouseUp: cancelEvent,
      onClick: cancelEvent
    }, react.createElement("div", {
      className: "gdg-search-bar-inner"
    }, react.createElement("input", {
      id: searchID,
      "aria-hidden": !showSearch,
      "data-testid": "search-input",
      ref: searchInputRef,
      onChange: onSearchChange,
      value: searchString,
      tabIndex: showSearch ? undefined : -1,
      onKeyDownCapture: onSearchKeyDown
    }), react.createElement("button", {
      "aria-label": "Previous Result",
      "aria-hidden": !showSearch,
      tabIndex: showSearch ? undefined : -1,
      onClick: onPrev,
      disabled: ((_searchStatus$results = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results !== void 0 ? _searchStatus$results : 0) === 0
    }, upArrow), react.createElement("button", {
      "aria-label": "Next Result",
      "aria-hidden": !showSearch,
      tabIndex: showSearch ? undefined : -1,
      onClick: onNext,
      disabled: ((_searchStatus$results2 = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results2 !== void 0 ? _searchStatus$results2 : 0) === 0
    }, downArrow), onSearchClose !== undefined && (react.createElement("button", {
      "aria-label": "Close Search",
      "aria-hidden": !showSearch,
      "data-testid": "search-close-button",
      tabIndex: showSearch ? undefined : -1,
      onClick: onClose
    }, closeX))), searchStatus !== undefined ? (react.createElement(react.Fragment, null, react.createElement("div", {
      className: "gdg-search-status"
    }, react.createElement("div", {
      "data-testid": "search-result-area"
    }, resultString)), react.createElement("div", {
      className: "gdg-search-progress",
      style: progressStyle
    }))) : (react.createElement("div", {
      className: "gdg-search-status"
    }, react.createElement("label", {
      htmlFor: searchID
    }, "Type to search"))));
  }, [showSearch, isAnimatingOut, searchStatus, rows, searchID, searchInputRef, onSearchChange, searchString, onSearchKeyDown, onPrev, onNext, onSearchClose, onClose]);
  return react.createElement(react.Fragment, null, react.createElement(scrolling_data_grid, {
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
  }), searchbox);
};
/* harmony default export */ const data_grid_search = (DataGridSearch);
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/click-outside-container/click-outside-container.js
var click_outside_container = __webpack_require__("./packages/core/dist/esm/internal/click-outside-container/click-outside-container.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/group-rename.js



const group_rename_exp = () => p => Math.max(16, p.targetHeight - 10);
const RenameInput = (0,dist/* styled */.z)('input')({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: false,
  vars: {
    "r17m35ur-0": [group_rename_exp(), "px"]
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
  return react.createElement(click_outside_container/* default */.Z, {
    style: {
      position: "absolute",
      left: bounds.x - canvasBounds.left + 1,
      top: bounds.y - canvasBounds.top,
      width: bounds.width - 2,
      height: bounds.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: onClose
  }, react.createElement(RenameInput, {
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
  }));
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/use-column-sizer.js


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
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/is-hotkey.js

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
        if (browserIsOSX.value) {
          wantMeta = true;
        } else {
          wantCtrl = true;
        }
        break;
    }
  }
  return args.altKey === wantAlt && args.ctrlKey === wantCtrl && args.shiftKey === wantShift && args.metaKey === wantMeta;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/use-selection-behavior.js


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
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/use-cells-for-selection.js


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
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/copy-paste.js


function convertCellToBuffer(cell) {
  var _cell$displayData, _cell$displayData2;
  if (cell.copyData !== undefined) {
    return {
      formatted: cell.copyData,
      rawValue: cell.copyData,
      format: "string"
    };
  }
  switch (cell.kind) {
    case data_grid_types/* GridCellKind.Boolean */.p6.Boolean:
      return {
        formatted: cell.data === true ? "TRUE" : cell.data === false ? "FALSE" : cell.data === data_grid_types/* BooleanIndeterminate */.sd ? "INDETERMINATE" : "",
        rawValue: cell.data,
        format: "boolean"
      };
    case data_grid_types/* GridCellKind.Custom */.p6.Custom:
      return {
        formatted: cell.copyData,
        rawValue: cell.copyData,
        format: "string"
      };
    case data_grid_types/* GridCellKind.Image */.p6.Image:
    case data_grid_types/* GridCellKind.Bubble */.p6.Bubble:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string-array"
      };
    case data_grid_types/* GridCellKind.Drilldown */.p6.Drilldown:
      return {
        formatted: cell.data.map(x => x.text),
        rawValue: cell.data.map(x => x.text),
        format: "string-array"
      };
    case data_grid_types/* GridCellKind.Text */.p6.Text:
      return {
        formatted: (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case data_grid_types/* GridCellKind.Uri */.p6.Uri:
      return {
        formatted: (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data,
        rawValue: cell.data,
        format: "url"
      };
    case data_grid_types/* GridCellKind.Markdown */.p6.Markdown:
    case data_grid_types/* GridCellKind.RowID */.p6.RowID:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case data_grid_types/* GridCellKind.Number */.p6.Number:
      return {
        formatted: cell.displayData,
        rawValue: cell.data,
        format: "number"
      };
    case data_grid_types/* GridCellKind.Loading */.p6.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case data_grid_types/* GridCellKind.Protected */.p6.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      (0,support/* assertNever */.vE)(cell);
  }
}
function createBufferFromGridCells(cells, columnIndexes) {
  const copyBuffer = cells.map((row, index) => {
    const mappedIndex = columnIndexes[index];
    return row.map(cell => {
      if (cell.span !== undefined && cell.span[0] !== mappedIndex) return {
        formatted: "",
        rawValue: "",
        format: "string"
      };
      return convertCellToBuffer(cell);
    });
  });
  return copyBuffer;
}
function escapeIfNeeded(str, withComma) {
  if ((withComma ? /[\t\n",]/ : /[\t\n"]/).test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function createTextBuffer(copyBuffer) {
  const lines = [];
  for (const row of copyBuffer) {
    const line = [];
    for (const cell of row) {
      if (cell.format === "url") {
        var _cell$rawValue$toStri, _cell$rawValue;
        line.push((_cell$rawValue$toStri = (_cell$rawValue = cell.rawValue) === null || _cell$rawValue === void 0 ? void 0 : _cell$rawValue.toString()) !== null && _cell$rawValue$toStri !== void 0 ? _cell$rawValue$toStri : "");
      } else if (cell.format === "string-array") {
        line.push(cell.formatted.map(x => escapeIfNeeded(x, true)).join(","));
      } else {
        line.push(escapeIfNeeded(cell.formatted, false));
      }
    }
    lines.push(line.join("\t"));
  }
  return lines.join("\n");
}
function formatHtmlTextContent(text) {
  return text.replace(/\t/g, "    ").replace(/ {2,}/g, match => "<span> </span>".repeat(match.length));
}
function formatHtmlAttributeContent(attrText) {
  return '"' + attrText.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function restoreHtmlEntities(str) {
  return str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function createHtmlBuffer(copyBuffer) {
  const lines = [];
  lines.push(`<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`, "<table><tbody>");
  for (const row of copyBuffer) {
    lines.push("<tr>");
    for (const cell of row) {
      const formatStr = `gdg-format="${cell.format}"`;
      if (cell.format === "url") {
        lines.push(`<td ${formatStr}><a href="${cell.rawValue}">${formatHtmlTextContent(cell.formatted)}</a></td>`);
      } else {
        if (cell.format === "string-array") {
          lines.push(`<td ${formatStr}><ol>${cell.formatted.map((x, ind) => `<li gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue[ind])}>` + formatHtmlTextContent(x) + "</li>").join("")}</ol></td>`);
        } else {
          var _cell$rawValue$toStri2, _cell$rawValue2;
          lines.push(`<td gdg-raw-value=${formatHtmlAttributeContent((_cell$rawValue$toStri2 = (_cell$rawValue2 = cell.rawValue) === null || _cell$rawValue2 === void 0 ? void 0 : _cell$rawValue2.toString()) !== null && _cell$rawValue$toStri2 !== void 0 ? _cell$rawValue$toStri2 : "")} ${formatStr}>${formatHtmlTextContent(cell.formatted)}</td>`);
        }
      }
    }
    lines.push("</tr>");
  }
  lines.push("</tbody></table>");
  return lines.join("");
}
function getCopyBufferContents(cells, columnIndexes) {
  const copyBuffer = createBufferFromGridCells(cells, columnIndexes);
  const textPlain = createTextBuffer(copyBuffer);
  const textHtml = createHtmlBuffer(copyBuffer);
  return {
    textPlain,
    textHtml
  };
}
function decodeHTML(html) {
  const fragment = document.createElement("html");
  fragment.innerHTML = html.replace(/&nbsp;/g, " ");
  const tableEl = fragment.querySelector("table");
  if (tableEl === null) return undefined;
  const walkEl = [tableEl];
  const result = [];
  let current;
  while (walkEl.length > 0) {
    const el = walkEl.pop();
    if (el === undefined) break;
    if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableRowElement) {
      if (current !== undefined) {
        result.push(current);
      }
      current = [];
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableCellElement) {
      var _clone$getAttribute;
      const clone = el.cloneNode(true);
      const firstTagIsPara = clone.children.length === 1 && clone.children[0].nodeName === "P";
      const para = firstTagIsPara ? clone.children[0] : null;
      const isAppleNumbers = (para === null || para === void 0 ? void 0 : para.children.length) === 1 && para.children[0].nodeName === "FONT";
      const brs = clone.querySelectorAll("br");
      for (const br of brs) {
        br.replaceWith("\n");
      }
      const attributeValue = clone.getAttribute("gdg-raw-value");
      const formatValue = (_clone$getAttribute = clone.getAttribute("gdg-format")) !== null && _clone$getAttribute !== void 0 ? _clone$getAttribute : "string";
      if (clone.querySelector("a") !== null) {
        var _current, _clone$querySelector$, _clone$querySelector, _clone$textContent;
        (_current = current) === null || _current === void 0 || _current.push({
          rawValue: (_clone$querySelector$ = (_clone$querySelector = clone.querySelector("a")) === null || _clone$querySelector === void 0 ? void 0 : _clone$querySelector.getAttribute("href")) !== null && _clone$querySelector$ !== void 0 ? _clone$querySelector$ : "",
          formatted: (_clone$textContent = clone.textContent) !== null && _clone$textContent !== void 0 ? _clone$textContent : "",
          format: formatValue
        });
      } else if (clone.querySelector("ol") !== null) {
        var _current2;
        const rawValues = clone.querySelectorAll("li");
        (_current2 = current) === null || _current2 === void 0 || _current2.push({
          rawValue: [...rawValues].map(x => {
            var _x$getAttribute;
            return (_x$getAttribute = x.getAttribute("gdg-raw-value")) !== null && _x$getAttribute !== void 0 ? _x$getAttribute : "";
          }),
          formatted: [...rawValues].map(x => {
            var _x$textContent;
            return (_x$textContent = x.textContent) !== null && _x$textContent !== void 0 ? _x$textContent : "";
          }),
          format: "string-array"
        });
      } else if (attributeValue !== null) {
        var _current3, _clone$textContent2;
        (_current3 = current) === null || _current3 === void 0 || _current3.push({
          rawValue: restoreHtmlEntities(attributeValue),
          formatted: (_clone$textContent2 = clone.textContent) !== null && _clone$textContent2 !== void 0 ? _clone$textContent2 : "",
          format: formatValue
        });
      } else {
        var _clone$textContent3, _current4, _textContent, _textContent2;
        let textContent = (_clone$textContent3 = clone.textContent) !== null && _clone$textContent3 !== void 0 ? _clone$textContent3 : "";
        if (isAppleNumbers) {
          textContent = textContent.replace(/\n(?!\n)/g, "");
        }
        (_current4 = current) === null || _current4 === void 0 || _current4.push({
          rawValue: (_textContent = textContent) !== null && _textContent !== void 0 ? _textContent : "",
          formatted: (_textContent2 = textContent) !== null && _textContent2 !== void 0 ? _textContent2 : "",
          format: formatValue
        });
      }
    }
  }
  if (current !== undefined) {
    result.push(current);
  }
  return result;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/data-editor-fns.js


function expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortController) {
  const origVal = newVal;
  if (spanRangeBehavior === "allowPartial" || newVal.current === undefined || getCellsForSelection === undefined) return newVal;
  let isFilled = false;
  do {
    var _newVal, _newVal$current;
    if (((_newVal = newVal) === null || _newVal === void 0 ? void 0 : _newVal.current) === undefined) break;
    const r = (_newVal$current = newVal.current) === null || _newVal$current === void 0 ? void 0 : _newVal$current.range;
    const cells = [];
    if (r.width > 2) {
      const leftCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof leftCells === "function") {
        return origVal;
      }
      cells.push(...leftCells);
      const rightCells = getCellsForSelection({
        x: r.x + r.width - 1,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof rightCells === "function") {
        return origVal;
      }
      cells.push(...rightCells);
    } else {
      const rCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height
      }, abortController.signal);
      if (typeof rCells === "function") {
        return origVal;
      }
      cells.push(...rCells);
    }
    let left = r.x - rowMarkerOffset;
    let right = r.x + r.width - 1 - rowMarkerOffset;
    for (const row of cells) {
      for (const cell of row) {
        if (cell.span === undefined) continue;
        left = Math.min(cell.span[0], left);
        right = Math.max(cell.span[1], right);
      }
    }
    if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
      isFilled = true;
    } else {
      var _newVal$current$cell;
      newVal = {
        current: {
          cell: (_newVal$current$cell = newVal.current.cell) !== null && _newVal$current$cell !== void 0 ? _newVal$current$cell : [0, 0],
          range: {
            x: left + rowMarkerOffset,
            y: r.y,
            width: right - left + 1,
            height: r.height
          },
          rangeStack: newVal.current.rangeStack
        },
        columns: newVal.columns,
        rows: newVal.rows
      };
    }
  } while (!isFilled);
  return newVal;
}
function descape(s) {
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1).replace(/""/g, '"');
  }
  return s;
}
function unquote(str) {
  let State;
  (function (State) {
    State[State["None"] = 0] = "None";
    State[State["inString"] = 1] = "inString";
    State[State["inStringPostQuote"] = 2] = "inStringPostQuote";
  })(State || (State = {}));
  const result = [];
  let current = [];
  let start = 0;
  let state = State.None;
  str = str.replace(/\r\n/g, "\n");
  let index = 0;
  for (const char of str) {
    switch (state) {
      case State.None:
        if (char === "\t" || char === "\n") {
          current.push(str.slice(start, index));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
        } else if (char === `"`) {
          state = State.inString;
        }
        break;
      case State.inString:
        if (char === `"`) {
          state = State.inStringPostQuote;
        }
        break;
      case State.inStringPostQuote:
        if (char === '"') {
          state = State.inString;
        } else if (char === "\t" || char === "\n") {
          current.push(descape(str.slice(start, index)));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
          state = State.None;
        } else {
          state = State.None;
        }
        break;
    }
    index++;
  }
  if (start < str.length) {
    current.push(descape(str.slice(start, str.length)));
  }
  result.push(current);
  return result.map(r => r.map(c => ({
    rawValue: c,
    formatted: c,
    format: "string"
  })));
}
function copyToClipboard(cells, columnIndexes, e) {
  var _window$navigator$cli3;
  const copyBuffer = getCopyBufferContents(cells, columnIndexes);
  const copyWithWriteText = s => {
    var _window$navigator$cli;
    void ((_window$navigator$cli = window.navigator.clipboard) === null || _window$navigator$cli === void 0 ? void 0 : _window$navigator$cli.writeText(s));
  };
  const copyWithWrite = (s, html) => {
    var _window$navigator$cli2;
    if (((_window$navigator$cli2 = window.navigator.clipboard) === null || _window$navigator$cli2 === void 0 ? void 0 : _window$navigator$cli2.write) === undefined) return false;
    void window.navigator.clipboard.write([new ClipboardItem({
      "text/plain": new Blob([s], {
        type: "text/plain"
      }),
      "text/html": new Blob([html], {
        type: "text/html"
      })
    })]);
    return true;
  };
  const copyWithClipboardData = (s, html) => {
    try {
      var _e$clipboardData, _e$clipboardData2;
      if (e === undefined || e.clipboardData === null) throw new Error("No clipboard data");
      e === null || e === void 0 || (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 || _e$clipboardData.setData("text/plain", s);
      e === null || e === void 0 || (_e$clipboardData2 = e.clipboardData) === null || _e$clipboardData2 === void 0 || _e$clipboardData2.setData("text/html", html);
    } catch {
      if (!copyWithWrite(s, html)) {
        copyWithWriteText(s);
      }
    }
  };
  if (((_window$navigator$cli3 = window.navigator.clipboard) === null || _window$navigator$cli3 === void 0 ? void 0 : _window$navigator$cli3.write) !== undefined || (e === null || e === void 0 ? void 0 : e.clipboardData) !== undefined) {
    void copyWithClipboardData(copyBuffer.textPlain, copyBuffer.textHtml);
  } else {
    void copyWithWriteText(copyBuffer.textPlain);
  }
  e === null || e === void 0 || e.preventDefault();
}
function toggleBoolean(data) {
  return data !== true;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-editor-container/data-grid-container.js


function toCss(x) {
  if (typeof x === "string") return x;
  return `${x}px`;
}
const data_grid_container_exp = () => p => p.innerWidth;
const _exp2 = () => p => p.innerHeight;
const Wrapper = (0,dist/* styled */.z)('div')({
  name: "Wrapper",
  class: "gdg-wmyidgi",
  propsAsIs: false,
  vars: {
    "wmyidgi-0": [data_grid_container_exp()],
    "wmyidgi-1": [_exp2()]
  }
});
const DataEditorContainer = p => {
  const {
    inWidth,
    inHeight,
    children,
    ...rest
  } = p;
  return react.createElement(Wrapper, {
    innerHeight: toCss(inHeight),
    innerWidth: toCss(inWidth),
    ...rest
  }, children);
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/use-autoscroll.js

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
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/use-rem-adjuster.js


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
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/data-editor-keybindings.js



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
  const isOSX = browserIsOSX.value;
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
  const keys = (0,utils/* useDeepMemo */.vE)(keybindingsIn);
  return react.useMemo(() => {
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
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor/data-editor.js



























const DataGridOverlayEditor = react.lazy(async () => await __webpack_require__.e(/* import() */ 912).then(__webpack_require__.bind(__webpack_require__, "./packages/core/dist/esm/internal/data-grid-overlay-editor/data-grid-overlay-editor.js")));
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
const data_editor_loadingCell = {
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
  const remSize = react.useMemo(() => Number.parseFloat(docStyle.fontSize), [docStyle]);
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
  const keybindings = useKeybindingsWithDefaults(keybindingsIn);
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
  const abortControllerRef = react.useRef();
  if (abortControllerRef.current === undefined) abortControllerRef.current = new AbortController();
  react.useEffect(() => () => abortControllerRef === null || abortControllerRef === void 0 ? void 0 : abortControllerRef.current.abort(), []);
  const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortControllerRef.current, rows);
  const validateCell = react.useCallback((cell, newValue, prevValue) => {
    if (validateCellIn === undefined) return true;
    const item = [cell[0] - rowMarkerOffset, cell[1]];
    return validateCellIn === null || validateCellIn === void 0 ? void 0 : validateCellIn(item, newValue, prevValue);
  }, [rowMarkerOffset, validateCellIn]);
  const expectedExternalGridSelection = react.useRef(gridSelectionOuter);
  const setGridSelection = react.useCallback((newVal, expand) => {
    if (expand) {
      newVal = expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortControllerRef.current);
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
        return data_editor_loadingCell;
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
        return data_editor_loadingCell;
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
            if (pointInRect(fr, outerCol, row)) {
              isInFreezeArea = true;
              break;
            }
          }
        }
        if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
          return data_editor_loadingCell;
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
          data: toggleBoolean(c.data)
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
    const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
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
    } else if (args.kind === groupHeaderKind) {
      lastMouseSelectLocation.current = [col, row];
    } else if (args.kind === outOfBoundsKind && !args.isMaybeScrollbar) {
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
    if (args.kind !== groupHeaderKind || columnSelect !== "multi") {
      return;
    }
    const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
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
          range: combineRects(mouse.previousSelection.current.range, fillHighlightRegion)
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
        } else if (args.kind === groupHeaderKind) {
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
      } else if (args.kind === groupHeaderKind) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...args,
          preventDefault
        });
      } else {
        if (args.kind === headerKind) {
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
    if (args.kind === groupHeaderKind) {
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
    if (mouseEventArgsAreEqual(args, hoveredRef.current)) return;
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
        const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
        setFillHighlightRegion(rect);
      } else {
        const startedFromLastStickyRow = lastRowSticky && selectedRow === rows;
        if (startedFromLastStickyRow) return;
        const landedOnLastStickyRow = lastRowSticky && row === rows;
        if (landedOnLastStickyRow) {
          if (args.kind === outOfBoundsKind) row--;else return;
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
    if (args.kind === groupHeaderKind) {
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
          var _r$onPaste;
          (0,support/* assert */.hu)(inner.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom);
          const newVal = (_r$onPaste = r.onPaste) === null || _r$onPaste === void 0 ? void 0 : _r$onPaste.call(r, stringifiedRawValue, inner.data);
          if (newVal === undefined) return undefined;
          return {
            location: target,
            value: {
              ...inner,
              data: newVal
            }
          };
        } else {
          var _r$onPaste2;
          const newVal = (_r$onPaste2 = r.onPaste) === null || _r$onPaste2 === void 0 ? void 0 : _r$onPaste2.call(r, stringifiedRawValue, inner, {
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
            const decoded = decodeHTML(html);
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
          data = decodeHTML(html);
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
          var _ref2, _text, _data;
          const cellData = getMangledCellContent(target);
          const rawValue = (_ref2 = (_text = text) !== null && _text !== void 0 ? _text : (_data = data) === null || _data === void 0 ? void 0 : _data.map(r => r.map(cb => cb.rawValue).join("\t")).join("\t")) !== null && _ref2 !== void 0 ? _ref2 : "";
          const newVal = pasteToCell(cellData, target, rawValue, undefined);
          if (newVal !== undefined) {
            editList.push(newVal);
          }
          break;
        }
        if (data === undefined) {
          if (text === undefined) return;
          data = unquote(text);
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
        copyToClipboard(cells, columnIndexes, e);
      } else {
        const headers = columnIndexes.map(index => ({
          kind: data_grid_types/* GridCellKind.Text */.p6.Text,
          data: columnsIn[index].title,
          displayData: columnsIn[index].title,
          allowOverlay: false
        }));
        copyToClipboard([headers, ...cells], columnIndexes, e);
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
    return react.createElement(GroupRename, {
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
  const cssStyle = react.useMemo(() => {
    return (0,styles/* makeCSSStyle */.be)(mergedTheme);
  }, [mergedTheme]);
  return react.createElement(styles/* ThemeContext.Provider */.Ni.Provider, {
    value: mergedTheme
  }, react.createElement(DataEditorContainer, {
    style: cssStyle,
    className: className,
    inWidth: width !== null && width !== void 0 ? width : idealWidth,
    inHeight: height !== null && height !== void 0 ? height : idealHeight
  }, react.createElement(data_grid_search, {
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
  }), renameGroupNode, overlay !== undefined && (react.createElement(react.Suspense, {
    fallback: null
  }, react.createElement(DataGridOverlayEditor, {
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
  })))));
};
const DataEditor = react.forwardRef(DataEditorImpl);
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/boolean-cell.js




const defaultCellMaxSize = 20;
const booleanCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "false";
  },
  kind: data_grid_types/* GridCellKind.Boolean */.p6.Boolean,
  needsHover: true,
  useLabel: false,
  needsHoverPosition: true,
  measure: () => 50,
  draw: a => {
    var _a$cell$maxSize;
    return drawBoolean(a, a.cell.data, (0,data_grid_types/* booleanCellIsEditable */.kf)(a.cell), (_a$cell$maxSize = a.cell.maxSize) !== null && _a$cell$maxSize !== void 0 ? _a$cell$maxSize : defaultCellMaxSize);
  },
  onDelete: c => ({
    ...c,
    data: false
  }),
  onClick: e => {
    var _cell$maxSize, _cell$contentAlign;
    const {
      cell,
      posX: pointerX,
      posY: pointerY,
      bounds,
      theme
    } = e;
    const {
      width,
      height,
      x: cellX,
      y: cellY
    } = bounds;
    const maxWidth = (_cell$maxSize = cell.maxSize) !== null && _cell$maxSize !== void 0 ? _cell$maxSize : defaultCellMaxSize;
    const cellCenterY = Math.floor(bounds.y + height / 2);
    const checkBoxWidth = (0,utils/* getSquareWidth */.Qo)(maxWidth, height, theme.cellVerticalPadding);
    const posX = (0,utils/* getSquareXPosFromAlign */.XC)((_cell$contentAlign = cell.contentAlign) !== null && _cell$contentAlign !== void 0 ? _cell$contentAlign : "center", cellX, width, theme.cellHorizontalPadding, checkBoxWidth);
    const bb = (0,utils/* getSquareBB */.kq)(posX, cellCenterY, checkBoxWidth);
    const checkBoxClicked = (0,utils/* pointIsWithinBB */.qq)(cellX + pointerX, cellY + pointerY, bb);
    if ((0,data_grid_types/* booleanCellIsEditable */.kf)(cell) && checkBoxClicked) {
      return {
        ...cell,
        data: toggleBoolean(cell.data)
      };
    }
    return undefined;
  },
  onPaste: (toPaste, cell) => {
    let newVal = data_grid_types/* BooleanEmpty */.qF;
    if (toPaste.toLowerCase() === "true") {
      newVal = true;
    } else if (toPaste.toLowerCase() === "false") {
      newVal = false;
    } else if (toPaste.toLowerCase() === "indeterminate") {
      newVal = data_grid_types/* BooleanIndeterminate */.sd;
    }
    return newVal === cell.data ? undefined : {
      ...cell,
      data: newVal
    };
  }
};
function drawBoolean(args, data, canEdit, maxSize) {
  if (!canEdit && data === data_grid_types/* BooleanEmpty */.qF) {
    return;
  }
  const {
    ctx,
    hoverAmount,
    theme,
    rect,
    highlighted,
    hoverX,
    hoverY,
    cell: {
      contentAlign
    }
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  const hoverEffect = 0.35;
  let alpha = canEdit ? 1 - hoverEffect + hoverEffect * hoverAmount : 0.4;
  if (data === data_grid_types/* BooleanEmpty */.qF) {
    alpha *= hoverAmount;
  }
  if (alpha === 0) {
    return;
  }
  ctx.globalAlpha = alpha;
  drawCheckbox(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY, maxSize, contentAlign);
  ctx.globalAlpha = 1;
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.js

const BubblesOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "BubblesOverlayEditorStyle",
  class: "gdg-b1ygi5by",
  propsAsIs: false
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js


const BubblesOverlayEditor = p => {
  const {
    bubbles
  } = p;
  return react.createElement(BubblesOverlayEditorStyle, null, bubbles.map((b, i) => (react.createElement("div", {
    key: i,
    className: "boe-bubble"
  }, b))), react.createElement("textarea", {
    className: "gdg-input",
    autoFocus: true
  }));
};
/* harmony default export */ const bubbles_overlay_editor = (BubblesOverlayEditor);
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/bubble-cell.js





const bubbleCellRenderer = {
  getAccessibilityString: c => (0,utils/* makeAccessibilityStringForArray */.jM)(c.data),
  kind: data_grid_types/* GridCellKind.Bubble */.p6.Bubble,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => cell.data.reduce((acc, data) => ctx.measureText(data).width + acc + 20, 0) + 2 * t.cellHorizontalPadding - 4,
  draw: a => drawBubbles(a, a.cell.data),
  provideEditor: () => p => {
    const {
      value
    } = p;
    return react.createElement(bubbles_overlay_editor, {
      bubbles: value.data
    });
  },
  onPaste: () => undefined
};
const itemMargin = 4;
function drawBubbles(args, data) {
  const {
    rect,
    theme,
    ctx,
    highlighted
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  const bubbleHeight = 20;
  const bubblePad = 8;
  const bubbleMargin = itemMargin;
  let renderX = x + theme.cellHorizontalPadding;
  const renderBoxes = [];
  for (const s of data) {
    if (renderX > x + w) break;
    const textWidth = (0,data_grid_lib/* measureTextCached */.P7)(s, ctx, theme.baseFontFull).width;
    renderBoxes.push({
      x: renderX,
      width: textWidth
    });
    renderX += textWidth + bubblePad * 2 + bubbleMargin;
  }
  ctx.beginPath();
  for (const rectInfo of renderBoxes) {
    var _theme$roundingRadius;
    (0,data_grid_lib/* roundedRect */.NK)(ctx, rectInfo.x, y + (h - bubbleHeight) / 2, rectInfo.width + bubblePad * 2, bubbleHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : bubbleHeight / 2);
  }
  ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
  ctx.fill();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js


const DrilldownOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "DrilldownOverlayEditorStyle",
  class: "gdg-d4zsq0x",
  propsAsIs: false
});
const DrilldownOverlayEditor = p => {
  const {
    drilldowns
  } = p;
  return react.createElement(DrilldownOverlayEditorStyle, null, drilldowns.map((d, i) => react.createElement("div", {
    key: i,
    className: "doe-bubble"
  }, d.img !== undefined && react.createElement("img", {
    src: d.img
  }), react.createElement("div", null, d.text))));
};
/* harmony default export */ const drilldown_overlay_editor = (DrilldownOverlayEditor);
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/drilldown-cell.js





const drilldownCellRenderer = {
  getAccessibilityString: c => (0,utils/* makeAccessibilityStringForArray */.jM)(c.data.map(d => d.text)),
  kind: data_grid_types/* GridCellKind.Drilldown */.p6.Drilldown,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => cell.data.reduce((acc, data) => ctx.measureText(data.text).width + acc + 20 + (data.img !== undefined ? 18 : 0), 0) + 2 * t.cellHorizontalPadding - 4,
  draw: a => drawDrilldownCell(a, a.cell.data),
  provideEditor: () => p => {
    const {
      value
    } = p;
    return react.createElement(drilldown_overlay_editor, {
      drilldowns: value.data
    });
  },
  onPaste: () => undefined
};
const drilldown_cell_itemMargin = 4;
const drilldownCache = {};
function getAndCacheDrilldownBorder(bgCell, border, height, rounding) {
  const dpr = Math.ceil(window.devicePixelRatio);
  const shadowBlur = 5;
  const targetHeight = height - shadowBlur * 2;
  const middleWidth = 4;
  const innerHeight = height * dpr;
  const sideWidth = rounding + shadowBlur;
  const targetWidth = rounding * 3;
  const innerWidth = (targetWidth + shadowBlur * 2) * dpr;
  const key = `${bgCell},${border},${dpr},${height}`;
  if (drilldownCache[key] !== undefined) {
    return {
      el: drilldownCache[key],
      height: innerHeight,
      width: innerWidth,
      middleWidth: middleWidth * dpr,
      sideWidth: sideWidth * dpr,
      padding: shadowBlur * dpr,
      dpr
    };
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  ctx.scale(dpr, dpr);
  drilldownCache[key] = canvas;
  ctx.beginPath();
  (0,data_grid_lib/* roundedRect */.NK)(ctx, shadowBlur, shadowBlur, targetWidth, targetHeight, rounding);
  ctx.shadowColor = "rgba(24, 25, 34, 0.4)";
  ctx.shadowBlur = 1;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowColor = "rgba(24, 25, 34, 0.3)";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 5;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  (0,data_grid_lib/* roundedRect */.NK)(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetWidth, targetHeight, rounding);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.stroke();
  return {
    el: canvas,
    height: innerHeight,
    width: innerWidth,
    sideWidth: sideWidth * dpr,
    middleWidth: rounding * dpr,
    padding: shadowBlur * dpr,
    dpr
  };
}
function drawDrilldownCell(args, data) {
  var _theme$roundingRadius;
  const {
    rect,
    theme,
    ctx,
    imageLoader,
    col,
    row
  } = args;
  const {
    x,
    width: w
  } = rect;
  const font = theme.baseFontFull;
  const emHeight = (0,data_grid_lib/* getEmHeight */.WA)(ctx, font);
  const h = Math.min(rect.height, Math.max(16, Math.ceil(emHeight * theme.lineHeight) * 2));
  const y = Math.floor(rect.y + (rect.height - h) / 2);
  const bubbleHeight = h - 10;
  const bubblePad = 8;
  const bubbleMargin = drilldown_cell_itemMargin;
  let renderX = x + theme.cellHorizontalPadding;
  const rounding = (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 6;
  const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder, h, rounding);
  const renderBoxes = [];
  for (const el of data) {
    if (renderX > x + w) break;
    const textMetrics = (0,data_grid_lib/* measureTextCached */.P7)(el.text, ctx, font);
    const textWidth = textMetrics.width;
    let imgWidth = 0;
    if (el.img !== undefined) {
      const img = imageLoader.loadOrGetImage(el.img, col, row);
      if (img !== undefined) {
        imgWidth = bubbleHeight - 8 + 4;
      }
    }
    const renderWidth = textWidth + imgWidth + bubblePad * 2;
    renderBoxes.push({
      x: renderX,
      width: renderWidth
    });
    renderX += renderWidth + bubbleMargin;
  }
  if (tileMap !== null) {
    const {
      el,
      height,
      middleWidth,
      sideWidth,
      width,
      dpr,
      padding
    } = tileMap;
    const outerSideWidth = sideWidth / dpr;
    const outerPadding = padding / dpr;
    for (const rectInfo of renderBoxes) {
      const rx = Math.floor(rectInfo.x);
      const rw = Math.floor(rectInfo.width);
      const outerMiddleWidth = rw - (outerSideWidth - outerPadding) * 2;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(el, 0, 0, sideWidth, height, rx - outerPadding, y, outerSideWidth, h);
      if (outerMiddleWidth > 0) ctx.drawImage(el, sideWidth, 0, middleWidth, height, rx + (outerSideWidth - outerPadding), y, outerMiddleWidth, h);
      ctx.drawImage(el, width - sideWidth, 0, sideWidth, height, rx + rw - (outerSideWidth - outerPadding), y, outerSideWidth, h);
      ctx.imageSmoothingEnabled = true;
    }
  }
  ctx.beginPath();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    const d = data[i];
    let drawX = rectInfo.x + bubblePad;
    if (d.img !== undefined) {
      const img = imageLoader.loadOrGetImage(d.img, col, row);
      if (img !== undefined) {
        var _theme$roundingRadius2;
        const imgSize = bubbleHeight - 8;
        let srcX = 0;
        let srcY = 0;
        let srcWidth = img.width;
        let srcHeight = img.height;
        if (srcWidth > srcHeight) {
          srcX += (srcWidth - srcHeight) / 2;
          srcWidth = srcHeight;
        } else if (srcHeight > srcWidth) {
          srcY += (srcHeight - srcWidth) / 2;
          srcHeight = srcWidth;
        }
        ctx.beginPath();
        (0,data_grid_lib/* roundedRect */.NK)(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, (_theme$roundingRadius2 = theme.roundingRadius) !== null && _theme$roundingRadius2 !== void 0 ? _theme$roundingRadius2 : 3);
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize);
        ctx.restore();
        drawX += imgSize + 4;
      }
    }
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(d.text, drawX, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/image-overlay-editor-style.js

const ImageOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "ImageOverlayEditorStyle",
  class: "gdg-i2iowwq",
  propsAsIs: false
});
// EXTERNAL MODULE: ./node_modules/react-responsive-carousel/lib/js/index.js
var js = __webpack_require__("./node_modules/react-responsive-carousel/lib/js/index.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/image-overlay-editor.js




const ImageOverlayEditor = p => {
  const {
    urls,
    canWrite,
    onEditClick,
    renderImage
  } = p;
  const filtered = urls.filter(u => u !== "");
  if (filtered.length === 0) {
    return null;
  }
  const allowMove = filtered.length > 1;
  return react.createElement(ImageOverlayEditorStyle, {
    "data-testid": "GDG-default-image-overlay-editor"
  }, react.createElement(js/* Carousel */.lr, {
    showArrows: allowMove,
    showThumbs: false,
    swipeable: allowMove,
    emulateTouch: allowMove,
    infiniteLoop: allowMove
  }, filtered.map(url => {
    var _renderImage;
    const innerContent = (_renderImage = renderImage === null || renderImage === void 0 ? void 0 : renderImage(url)) !== null && _renderImage !== void 0 ? _renderImage : react.createElement("img", {
      draggable: false,
      src: url
    });
    return react.createElement("div", {
      className: "gdg-centering-container",
      key: url
    }, innerContent);
  })), canWrite && onEditClick && (react.createElement("button", {
    className: "gdg-edit-icon",
    onClick: onEditClick
  }, react.createElement(utils/* EditPencil */.Wy, null))));
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/image-cell.js




const imageCellRenderer = {
  getAccessibilityString: c => c.data.join(", "),
  kind: data_grid_types/* GridCellKind.Image */.p6.Image,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  draw: a => {
    var _a$cell$displayData, _ref, _a$cell$rounding;
    return drawImage(a, (_a$cell$displayData = a.cell.displayData) !== null && _a$cell$displayData !== void 0 ? _a$cell$displayData : a.cell.data, (_ref = (_a$cell$rounding = a.cell.rounding) !== null && _a$cell$rounding !== void 0 ? _a$cell$rounding : a.theme.roundingRadius) !== null && _ref !== void 0 ? _ref : 4, a.cell.contentAlign);
  },
  measure: (_ctx, cell) => cell.data.length * 50,
  onDelete: c => ({
    ...c,
    data: []
  }),
  provideEditor: () => p => {
    const {
      value,
      onFinishedEditing,
      imageEditorOverride
    } = p;
    const ImageEditor = imageEditorOverride !== null && imageEditorOverride !== void 0 ? imageEditorOverride : ImageOverlayEditor;
    return react.createElement(ImageEditor, {
      urls: value.data,
      canWrite: value.readonly !== false,
      onCancel: onFinishedEditing,
      onChange: newImage => {
        onFinishedEditing({
          ...value,
          data: [newImage]
        });
      }
    });
  },
  onPaste: (toPaste, cell) => {
    toPaste = toPaste.trim();
    const fragments = toPaste.split(",");
    const uris = fragments.map(f => {
      try {
        new URL(f);
        return f;
      } catch {
        return undefined;
      }
    }).filter(x => x !== undefined);
    if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i])) return undefined;
    return {
      ...cell,
      data: uris
    };
  }
};
const image_cell_itemMargin = 4;
function drawImage(args, data, rounding, contentAlign) {
  const {
    rect,
    col,
    row,
    theme,
    ctx,
    imageLoader
  } = args;
  const {
    x,
    y,
    height: h,
    width: w
  } = rect;
  const imgHeight = h - theme.cellVerticalPadding * 2;
  const images = [];
  let totalWidth = 0;
  for (let index = 0; index < data.length; index++) {
    const i = data[index];
    if (i.length === 0) continue;
    const img = imageLoader.loadOrGetImage(i, col, row);
    if (img !== undefined) {
      images[index] = img;
      const imgWidth = img.width * (imgHeight / img.height);
      totalWidth += imgWidth + image_cell_itemMargin;
    }
  }
  if (totalWidth === 0) return;
  totalWidth -= image_cell_itemMargin;
  let drawX = x + theme.cellHorizontalPadding;
  if (contentAlign === "right") drawX = Math.floor(x + w - theme.cellHorizontalPadding - totalWidth);else if (contentAlign === "center") drawX = Math.floor(x + w / 2 - totalWidth / 2);
  for (const img of images) {
    if (img === undefined) continue;
    const imgWidth = img.width * (imgHeight / img.height);
    if (rounding > 0) {
      ctx.beginPath();
      (0,data_grid_lib/* roundedRect */.NK)(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, rounding);
      ctx.save();
      ctx.clip();
    }
    ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
    if (rounding > 0) {
      ctx.restore();
    }
    drawX += imgWidth + image_cell_itemMargin;
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/loading-cell.js



function getRandomNumber(x, y) {
  let seed = x * 49632 + y * 325176;
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed / 4294967295 * 2;
}
const loadingCellRenderer = {
  getAccessibilityString: () => "",
  kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: () => 120,
  draw: a => {
    var _cell$skeletonHeight, _theme$roundingRadius;
    const {
      cell,
      col,
      row,
      ctx,
      rect,
      theme
    } = a;
    if (cell.skeletonWidth === undefined || cell.skeletonWidth === 0) {
      return;
    }
    let width = cell.skeletonWidth;
    if (cell.skeletonWidthVariability !== undefined && cell.skeletonWidthVariability > 0) {
      width += Math.round(getRandomNumber(col, row) * cell.skeletonWidthVariability);
    }
    const hpad = theme.cellHorizontalPadding;
    const rectHeight = (_cell$skeletonHeight = cell.skeletonHeight) !== null && _cell$skeletonHeight !== void 0 ? _cell$skeletonHeight : Math.min(18, rect.height - 2 * theme.cellVerticalPadding);
    (0,data_grid_lib/* roundedRect */.NK)(ctx, rect.x + hpad, rect.y + (rect.height - rectHeight) / 2, width, rectHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 3);
    ctx.fillStyle = (0,color_parser/* withAlpha */.fG)(theme.textDark, 0.1);
    ctx.fill();
  },
  onPaste: () => undefined
};
// EXTERNAL MODULE: ./node_modules/marked/lib/marked.esm.js
var marked_esm = __webpack_require__("./node_modules/marked/lib/marked.esm.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/markdown-div/private/markdown-container.js

const MarkdownContainer = (0,dist/* styled */.z)('div')({
  name: "MarkdownContainer",
  class: "gdg-mnuv029",
  propsAsIs: false
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/markdown-div/markdown-div.js



class MarkdownDiv extends react.PureComponent {
  constructor() {
    super(...arguments);
    this.targetElement = null;
    this.containerRefHook = element => {
      this.targetElement = element;
      this.renderMarkdownIntoDiv();
    };
  }
  renderMarkdownIntoDiv() {
    const {
      targetElement,
      props
    } = this;
    if (targetElement === null) return;
    const {
      contents,
      createNode
    } = props;
    const innerHTML = (0,marked_esm/* marked */.TU)(contents);
    const childRange = document.createRange();
    childRange.selectNodeContents(targetElement);
    childRange.deleteContents();
    let newChild = createNode === null || createNode === void 0 ? void 0 : createNode(innerHTML);
    if (newChild === undefined) {
      const childDoc = document.createElement("template");
      childDoc.innerHTML = innerHTML;
      newChild = childDoc.content;
    }
    targetElement.append(newChild);
    const tags = targetElement.getElementsByTagName("a");
    for (const tag of tags) {
      tag.target = "_blank";
      tag.rel = "noreferrer noopener";
    }
  }
  render() {
    this.renderMarkdownIntoDiv();
    return react.createElement(MarkdownContainer, {
      ref: this.containerRefHook
    });
  }
}
MarkdownDiv.displayName = "MarkdownDiv";
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/growing-entry/growing-entry.js + 1 modules
var growing_entry = __webpack_require__("./packages/core/dist/esm/internal/growing-entry/growing-entry.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.js

const markdown_overlay_editor_style_exp = () => p => p.targetWidth;
const MarkdownOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "MarkdownOverlayEditorStyle",
  class: "gdg-m1pnx84e",
  propsAsIs: false,
  vars: {
    "m1pnx84e-0": [markdown_overlay_editor_style_exp(), "px"]
  }
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/markdown-overlay-editor.js





const MarkdownOverlayEditor = p => {
  const {
    value,
    onChange,
    forceEditMode,
    createNode,
    targetRect,
    onFinish,
    validatedSelection
  } = p;
  const markdown = value.data;
  const readonly = value.readonly === true;
  const [editMode, setEditMode] = react.useState(markdown === "" || forceEditMode);
  const onEditClick = react.useCallback(() => {
    setEditMode(e => !e);
  }, []);
  const addLeftPad = markdown ? "gdg-ml-6" : "";
  if (editMode) {
    return react.createElement(MarkdownOverlayEditorStyle, {
      targetWidth: targetRect.width - 20
    }, react.createElement(growing_entry/* GrowingEntry */.K, {
      autoFocus: true,
      highlight: false,
      validatedSelection: validatedSelection,
      value: markdown,
      onKeyDown: e => {
        if (e.key === "Enter") e.stopPropagation();
      },
      onChange: onChange
    }), react.createElement("div", {
      className: `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`,
      onClick: () => onFinish(value)
    }, react.createElement(utils/* Checkmark */.MC, null)));
  }
  return react.createElement(MarkdownOverlayEditorStyle, {
    targetWidth: targetRect.width
  }, react.createElement(MarkdownDiv, {
    contents: markdown,
    createNode: createNode
  }), !readonly && (react.createElement(react.Fragment, null, react.createElement("div", {
    className: "spacer"
  }), react.createElement("div", {
    className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`,
    onClick: onEditClick
  }, react.createElement(utils/* EditPencil */.Wy, null)))), react.createElement("textarea", {
    className: "gdg-md-edit-textarea gdg-input",
    autoFocus: true
  }));
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/markdown-cell.js




const markdownCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Markdown */.p6.Markdown,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  measure: (ctx, cell, t) => {
    const firstLine = cell.data.split("\n")[0];
    return ctx.measureText(firstLine).width + 2 * t.cellHorizontalPadding;
  },
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.data, a.cell.contentAlign),
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: () => p => {
    const {
      onChange,
      value,
      target,
      onFinishedEditing,
      markdownDivCreateNode,
      forceEditMode,
      validatedSelection
    } = p;
    return react.createElement(MarkdownOverlayEditor, {
      onFinish: onFinishedEditing,
      targetRect: target,
      value: value,
      validatedSelection: validatedSelection,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      }),
      forceEditMode: forceEditMode,
      createNode: markdownDivCreateNode
    });
  },
  onPaste: (toPaste, cell) => toPaste === cell.data ? undefined : {
    ...cell,
    data: toPaste
  }
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/marker-cell.js



const markerCellRenderer = {
  getAccessibilityString: c => c.row.toString(),
  kind: data_grid_types/* InnerGridCellKind.Marker */.$o.Marker,
  needsHover: true,
  needsHoverPosition: false,
  drawPrep: prepMarkerRowCell,
  measure: () => 44,
  draw: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle),
  onClick: e => {
    const {
      bounds,
      cell,
      posX: x,
      posY: y
    } = e;
    const {
      width,
      height
    } = bounds;
    const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
    const centerY = height / 2;
    if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
      return {
        ...cell,
        checked: !cell.checked
      };
    }
    return undefined;
  },
  onPaste: () => undefined
};
function prepMarkerRowCell(args, lastPrep) {
  const {
    ctx,
    theme
  } = args;
  const newFont = theme.markerFontFull;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepMarkerRowCell;
  ctx.textAlign = "center";
  return result;
}
function deprepMarkerRowCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawMarkerRowCell(args, index, checked, markerKind, drawHandle) {
  const {
    ctx,
    rect,
    hoverAmount,
    theme
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const checkedboxAlpha = checked ? 1 : markerKind === "checkbox-visible" ? 0.6 + 0.4 * hoverAmount : hoverAmount;
  if (markerKind !== "number" && checkedboxAlpha > 0) {
    ctx.globalAlpha = checkedboxAlpha;
    const offsetAmount = 7 * (checked ? hoverAmount : 1);
    drawCheckbox(ctx, theme, checked, drawHandle ? x + offsetAmount : x, y, drawHandle ? width - offsetAmount : width, height, true, undefined, undefined, 18);
    if (drawHandle) {
      ctx.globalAlpha = hoverAmount;
      ctx.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
        }
      }
      ctx.fillStyle = theme.textLight;
      ctx.fill();
      ctx.beginPath();
    }
    ctx.globalAlpha = 1;
  }
  if (markerKind === "number" || markerKind === "both" && !checked) {
    const text = index.toString();
    const fontStyle = theme.markerFontFull;
    const start = x + width / 2;
    if (markerKind === "both" && hoverAmount !== 0) {
      ctx.globalAlpha = 1 - hoverAmount;
    }
    ctx.fillStyle = theme.textLight;
    ctx.font = fontStyle;
    ctx.fillText(text, start, y + height / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, fontStyle));
    if (hoverAmount !== 0) {
      ctx.globalAlpha = 1;
    }
  }
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/new-row-cell.js


const newRowCellRenderer = {
  getAccessibilityString: () => "",
  kind: data_grid_types/* InnerGridCellKind.NewRow */.$o.NewRow,
  needsHover: true,
  needsHoverPosition: false,
  measure: () => 200,
  draw: a => drawNewRowCell(a, a.cell.hint, a.cell.icon),
  onPaste: () => undefined
};
function drawNewRowCell(args, data, icon) {
  const {
    ctx,
    rect,
    hoverAmount,
    theme,
    spriteManager
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  ctx.beginPath();
  ctx.globalAlpha = hoverAmount;
  ctx.rect(x + 1, y + 1, w, h - 2);
  ctx.fillStyle = theme.bgHeaderHovered;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  const alwaysShowIcon = data !== "";
  let textX = 0;
  if (icon !== undefined) {
    const padding = 8;
    const size = h - padding;
    const px = x + padding / 2;
    const py = y + padding / 2;
    spriteManager.drawSprite(icon, "normal", ctx, px, py, size, theme, alwaysShowIcon ? 1 : hoverAmount);
    textX = size;
  } else {
    textX = 24;
    const finalLineSize = 12;
    const lineSize = alwaysShowIcon ? finalLineSize : hoverAmount * finalLineSize;
    const xTranslate = alwaysShowIcon ? 0 : (1 - hoverAmount) * finalLineSize * 0.5;
    const padPlus = theme.cellHorizontalPadding + 4;
    if (lineSize > 0) {
      ctx.moveTo(x + padPlus + xTranslate, y + h / 2);
      ctx.lineTo(x + padPlus + xTranslate + lineSize, y + h / 2);
      ctx.moveTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 - lineSize * 0.5);
      ctx.lineTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 + lineSize * 0.5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.bgIconHeader;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
  ctx.fillStyle = theme.textMedium;
  ctx.fillText(data, textX + x + theme.cellHorizontalPadding + 0.5, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  ctx.beginPath();
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/number-cell.js



const NumberOverlayEditor = react.lazy(async () => await Promise.all(/* import() */[__webpack_require__.e(7333), __webpack_require__.e(8903)]).then(__webpack_require__.bind(__webpack_require__, "./packages/core/dist/esm/internal/data-grid-overlay-editor/private/number-overlay-editor.js")));
const numberCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Number */.p6.Number,
  needsHover: false,
  needsHoverPosition: false,
  useLabel: true,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.displayData, a.cell.contentAlign),
  measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
  onDelete: c => ({
    ...c,
    data: undefined
  }),
  provideEditor: () => p => {
    const {
      isHighlighted,
      onChange,
      value,
      validatedSelection
    } = p;
    return react.createElement(react.Suspense, {
      fallback: null
    }, react.createElement(NumberOverlayEditor, {
      highlight: isHighlighted,
      disabled: value.readonly === true,
      value: value.data,
      fixedDecimals: value.fixedDecimals,
      allowNegative: value.allowNegative,
      thousandSeparator: value.thousandSeparator,
      decimalSeparator: value.decimalSeparator,
      validatedSelection: validatedSelection,
      onChange: x => {
        var _x$floatValue;
        return onChange({
          ...value,
          data: Number.isNaN((_x$floatValue = x.floatValue) !== null && _x$floatValue !== void 0 ? _x$floatValue : 0) ? 0 : x.floatValue
        });
      }
    }));
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    const newNumber = typeof details.rawValue === "number" ? details.rawValue : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
    if (Number.isNaN(newNumber) || cell.data === newNumber) return undefined;
    return {
      ...cell,
      data: newNumber,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/protected-cell.js


const protectedCellRenderer = {
  getAccessibilityString: () => "",
  measure: () => 108,
  kind: data_grid_types/* GridCellKind.Protected */.p6.Protected,
  needsHover: false,
  needsHoverPosition: false,
  draw: drawProtectedCell,
  onPaste: () => undefined
};
function drawProtectedCell(args) {
  const {
    ctx,
    theme,
    rect
  } = args;
  const {
    x,
    y,
    height: h
  } = rect;
  ctx.beginPath();
  const radius = 2.5;
  let xStart = x + theme.cellHorizontalPadding + radius;
  const center = y + h / 2;
  const p = Math.cos((0,utils/* degreesToRadians */.Ht)(30)) * radius;
  const q = Math.sin((0,utils/* degreesToRadians */.Ht)(30)) * radius;
  for (let i = 0; i < 12; i++) {
    ctx.moveTo(xStart, center - radius);
    ctx.lineTo(xStart, center + radius);
    ctx.moveTo(xStart + p, center - q);
    ctx.lineTo(xStart - p, center + q);
    ctx.moveTo(xStart - p, center - q);
    ctx.lineTo(xStart + p, center + q);
    xStart += 8;
  }
  ctx.lineWidth = 1.1;
  ctx.lineCap = "square";
  ctx.strokeStyle = theme.textLight;
  ctx.stroke();
}
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/row-id-cell.js




const rowIDCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.RowID */.p6.RowID,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: (a, b) => (0,data_grid_lib/* prepTextCell */.k0)(a, b, a.theme.textLight),
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.data, a.cell.contentAlign),
  measure: (ctx, cell, theme) => ctx.measureText(cell.data).width + theme.cellHorizontalPadding * 2,
  provideEditor: () => p => {
    const {
      isHighlighted,
      onChange,
      value,
      validatedSelection
    } = p;
    return react.createElement(growing_entry/* GrowingEntry */.K, {
      highlight: isHighlighted,
      autoFocus: value.readonly !== true,
      disabled: value.readonly !== false,
      value: value.data,
      validatedSelection: validatedSelection,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      })
    });
  },
  onPaste: () => undefined
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/text-cell.js




const textCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Text */.p6.Text,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  useLabel: true,
  draw: a => ((0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.displayData, a.cell.contentAlign, a.cell.allowWrapping, a.hyperWrapping), true),
  measure: (ctx, cell, t) => {
    const lines = cell.displayData.split("\n", cell.allowWrapping === true ? undefined : 1);
    let maxLineWidth = 0;
    for (const line of lines) {
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
    }
    return maxLineWidth + 2 * t.cellHorizontalPadding;
  },
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: cell => ({
    disablePadding: cell.allowWrapping === true,
    editor: p => {
      const {
        isHighlighted,
        onChange,
        value,
        validatedSelection
      } = p;
      return react.createElement(growing_entry/* GrowingEntry */.K, {
        style: cell.allowWrapping === true ? {
          padding: "3px 8.5px"
        } : undefined,
        highlight: isHighlighted,
        autoFocus: value.readonly !== true,
        disabled: value.readonly === true,
        altNewline: true,
        value: value.data,
        validatedSelection: validatedSelection,
        onChange: e => onChange({
          ...value,
          data: e.target.value
        })
      });
    }
  }),
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? undefined : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.js

const UriOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "UriOverlayEditorStyle",
  class: "gdg-u1rrojo",
  propsAsIs: false
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/uri-overlay-editor.js




const UriOverlayEditor = p => {
  const {
    uri,
    onChange,
    forceEditMode,
    readonly,
    validatedSelection,
    preview
  } = p;
  const [editMode, setEditMode] = react.useState(uri === "" || forceEditMode);
  const onEditClick = react.useCallback(() => {
    setEditMode(true);
  }, []);
  if (editMode) {
    return react.createElement(growing_entry/* GrowingEntry */.K, {
      validatedSelection: validatedSelection,
      highlight: true,
      autoFocus: true,
      value: uri,
      onChange: onChange
    });
  }
  return react.createElement(UriOverlayEditorStyle, null, react.createElement("a", {
    className: "gdg-link-area",
    href: uri,
    target: "_blank",
    rel: "noopener noreferrer"
  }, preview), !readonly && (react.createElement("div", {
    className: "gdg-edit-icon",
    onClick: onEditClick
  }, react.createElement(utils/* EditPencil */.Wy, null))), react.createElement("textarea", {
    className: "gdg-input",
    autoFocus: true
  }));
};
/* harmony default export */ const uri_overlay_editor = (UriOverlayEditor);
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/uri-cell.js





function getTextRect(metrics, rect, theme, contentAlign) {
  let x = theme.cellHorizontalPadding;
  const y = rect.height / 2 - metrics.actualBoundingBoxAscent / 2;
  const width = metrics.width;
  const height = metrics.actualBoundingBoxAscent;
  if (contentAlign === "right") {
    x = rect.width - width - theme.cellHorizontalPadding;
  } else if (contentAlign === "center") {
    x = rect.width / 2 - width / 2;
  }
  return {
    x,
    y,
    width,
    height
  };
}
const uriCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Uri */.p6.Uri,
  needsHover: true,
  needsHoverPosition: true,
  useLabel: true,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  draw: a => {
    var _cell$displayData;
    const {
      cell,
      theme,
      overrideCursor,
      hoverX,
      hoverY,
      rect,
      ctx
    } = a;
    const txt = (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data;
    if (overrideCursor !== undefined && cell.hoverEffect === true && hoverX !== undefined && hoverY !== undefined) {
      const m = (0,data_grid_lib/* measureTextCached */.P7)(txt, ctx, theme.baseFontFull);
      const textRect = getTextRect(m, rect, theme, cell.contentAlign);
      const {
        x,
        y,
        width: w,
        height: h
      } = textRect;
      if (hoverX >= x - 4 && hoverX <= x - 4 + w + 8 && hoverY >= y - 4 && hoverY <= y - 4 + h + 8) {
        const middleCenterBias = (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.baseFontFull);
        overrideCursor("pointer");
        const underlineOffset = 5;
        const drawY = y - middleCenterBias;
        ctx.beginPath();
        ctx.moveTo(rect.x + x, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.lineTo(rect.x + x + w, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.strokeStyle = theme.textDark;
        ctx.stroke();
        ctx.save();
        ctx.fillStyle = a.cellFillColor;
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 1
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 2
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 1
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 2
          }
        }, txt, cell.contentAlign);
        ctx.restore();
      }
    }
    (0,data_grid_lib/* drawTextCell */.uN)(a, txt, cell.contentAlign);
  },
  onClick: a => {
    var _cell$displayData2;
    const {
      cell,
      bounds,
      posX,
      posY,
      theme
    } = a;
    const txt = (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data;
    if (cell.hoverEffect !== true || cell.onClickUri === undefined) return;
    const m = (0,data_grid_lib/* getMeasuredTextCache */._y)(txt, theme.baseFontFull);
    if (m === undefined) return;
    const textRect = getTextRect(m, bounds, theme, cell.contentAlign);
    const didClick = pointInRect({
      x: textRect.x - 4,
      y: textRect.y - 4,
      width: textRect.width + 8,
      height: textRect.height + 8
    }, posX, posY);
    if (didClick) {
      cell.onClickUri(a);
    }
    return undefined;
  },
  measure: (ctx, cell, theme) => {
    var _cell$displayData3;
    return ctx.measureText((_cell$displayData3 = cell.displayData) !== null && _cell$displayData3 !== void 0 ? _cell$displayData3 : cell.data).width + theme.cellHorizontalPadding * 2;
  },
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: cell => p => {
    var _value$displayData;
    const {
      onChange,
      value,
      forceEditMode,
      validatedSelection
    } = p;
    return react.createElement(uri_overlay_editor, {
      forceEditMode: forceEditMode || cell.hoverEffect === true && cell.onClickUri !== undefined,
      uri: value.data,
      preview: (_value$displayData = value.displayData) !== null && _value$displayData !== void 0 ? _value$displayData : value.data,
      validatedSelection: validatedSelection,
      readonly: value.readonly === true,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      })
    });
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? undefined : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/dist/esm/cells/index.js














const AllCellRenderers = [markerCellRenderer, newRowCellRenderer, booleanCellRenderer, bubbleCellRenderer, drilldownCellRenderer, imageCellRenderer, loadingCellRenderer, markdownCellRenderer, numberCellRenderer, protectedCellRenderer, rowIDCellRenderer, textCellRenderer, uriCellRenderer];
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid/sprites.js
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
// EXTERNAL MODULE: ./node_modules/lodash/throttle.js
var throttle = __webpack_require__("./node_modules/lodash/throttle.js");
var throttle_default = /*#__PURE__*/__webpack_require__.n(throttle);
;// CONCATENATED MODULE: ./packages/core/dist/esm/common/image-window-loader.js



const imgPool = [];
class ImageWindowLoaderImpl extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.imageLoaded = () => undefined;
    this.loadedLocations = [];
    this.cache = {};
    this.sendLoaded = throttle_default()(() => {
      this.imageLoaded(new CellSet(this.loadedLocations));
      this.loadedLocations = [];
    }, 20);
    this.clearOutOfWindow = () => {
      const keys = Object.keys(this.cache);
      for (const key of keys) {
        const obj = this.cache[key];
        let keep = false;
        for (let j = 0; j < obj.cells.length; j++) {
          const packed = obj.cells[j];
          if (this.isInWindow(packed)) {
            keep = true;
            break;
          }
        }
        if (keep) {
          obj.cells = obj.cells.filter(this.isInWindow);
        } else {
          obj.cancel();
          delete this.cache[key];
        }
      }
    };
  }
  setCallback(imageLoaded) {
    this.imageLoaded = imageLoaded;
  }
  loadImage(url, col, row, key) {
    var _imgPool$pop;
    let loaded = false;
    const img = (_imgPool$pop = imgPool.pop()) !== null && _imgPool$pop !== void 0 ? _imgPool$pop : new Image();
    let canceled = false;
    const result = {
      img: undefined,
      cells: [packColRowToNumber(col, row)],
      url,
      cancel: () => {
        if (canceled) return;
        canceled = true;
        if (imgPool.length < 12) {
          imgPool.unshift(img);
        } else if (!loaded) {
          img.src = "";
        }
      }
    };
    const loadPromise = new Promise(r => img.addEventListener("load", () => r(null)));
    requestAnimationFrame(async () => {
      try {
        img.src = url;
        await loadPromise;
        await img.decode();
        const toWrite = this.cache[key];
        if (toWrite !== undefined && !canceled) {
          toWrite.img = img;
          for (const packed of toWrite.cells) {
            this.loadedLocations.push(unpackNumberToColRow(packed));
          }
          loaded = true;
          this.sendLoaded();
        }
      } catch {
        result.cancel();
      }
    });
    this.cache[key] = result;
  }
  loadOrGetImage(url, col, row) {
    const key = url;
    const current = this.cache[key];
    if (current !== undefined) {
      const packed = packColRowToNumber(col, row);
      if (!current.cells.includes(packed)) {
        current.cells.push(packed);
      }
      return current.img;
    } else {
      this.loadImage(url, col, row, key);
    }
    return undefined;
  }
}
/* harmony default export */ const image_window_loader = (ImageWindowLoaderImpl);
;// CONCATENATED MODULE: ./packages/core/dist/esm/data-editor-all.js





const DataEditorAllImpl = (p, ref) => {
  const allSprites = react.useMemo(() => {
    return {
      ...sprites,
      ...p.headerIcons
    };
  }, [p.headerIcons]);
  const imageWindowLoader = react.useMemo(() => {
    var _p$imageWindowLoader;
    return (_p$imageWindowLoader = p.imageWindowLoader) !== null && _p$imageWindowLoader !== void 0 ? _p$imageWindowLoader : new image_window_loader();
  }, [p.imageWindowLoader]);
  return react.createElement(DataEditor, {
    ...p,
    renderers: AllCellRenderers,
    headerIcons: allSprites,
    ref: ref,
    imageWindowLoader: imageWindowLoader
  });
};
const DataEditorAll = react.forwardRef(DataEditorAllImpl);

/***/ }),

/***/ "./packages/core/dist/esm/internal/click-outside-container/click-outside-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ClickOutsideContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");

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
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      ...rest,
      ref: this.wrapperRef
    }, this.props.children);
  }
}
ClickOutsideContainer.displayName = "ClickOutsideContainer";

/***/ }),

/***/ "./packages/core/dist/esm/internal/data-grid/color-parser.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NH": () => (/* binding */ blend),
/* harmony export */   "Nz": () => (/* binding */ interpolateColors),
/* harmony export */   "dF": () => (/* binding */ parseToRgba),
/* harmony export */   "fG": () => (/* binding */ withAlpha),
/* harmony export */   "mv": () => (/* binding */ blendCache)
/* harmony export */ });
const cache = {};
let div = null;
function createDiv() {
  const d = document.createElement("div");
  d.style.opacity = "0";
  d.style.pointerEvents = "none";
  d.style.position = "fixed";
  document.body.append(d);
  return d;
}
function parseToRgba(color) {
  const normalizedColor = color.toLowerCase().trim();
  if (cache[normalizedColor] !== undefined) return cache[normalizedColor];
  div = div || createDiv();
  div.style.color = "#000";
  div.style.color = normalizedColor;
  const control = getComputedStyle(div).color;
  div.style.color = "#fff";
  div.style.color = normalizedColor;
  const computedColor = getComputedStyle(div).color;
  if (computedColor !== control) return [0, 0, 0, 1];
  let result = computedColor.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  if (result.length < 4) {
    result.push(1);
  }
  result = result.map(x => {
    const isNaN = Number.isNaN(x);
    if (false) {}
    return isNaN ? 0 : x;
  });
  cache[normalizedColor] = result;
  return result;
}
function withAlpha(color, alpha) {
  const [r, g, b] = parseToRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const blendResultCache = new Map();
function blendCache(color, background) {
  const cacheKey = `${color}-${background}`;
  const maybe = blendResultCache.get(cacheKey);
  if (maybe !== undefined) return maybe;
  const result = blend(color, background);
  blendResultCache.set(cacheKey, result);
  return result;
}
function blend(color, background) {
  if (background === undefined) return color;
  const [r, g, b, a] = parseToRgba(color);
  if (a === 1) return color;
  const [br, bg, bb, ba] = parseToRgba(background);
  const ao = a + ba * (1 - a);
  const ro = (a * r + ba * br * (1 - a)) / ao;
  const go = (a * g + ba * bg * (1 - a)) / ao;
  const bo = (a * b + ba * bb * (1 - a)) / ao;
  return `rgba(${ro}, ${go}, ${bo}, ${ao})`;
}
function interpolateColors(leftColor, rightColor, val) {
  if (val <= 0) return leftColor;
  if (val >= 1) return rightColor;
  const left = [...parseToRgba(leftColor)];
  left[0] = left[0] * left[3];
  left[1] = left[1] * left[3];
  left[2] = left[2] * left[3];
  const right = [...parseToRgba(rightColor)];
  right[0] = right[0] * right[3];
  right[1] = right[1] * right[3];
  right[2] = right[2] * right[3];
  const hScaler = val;
  const nScaler = 1 - val;
  const a = left[3] * nScaler + right[3] * hScaler;
  const r = Math.floor((left[0] * nScaler + right[0] * hScaler) / a);
  const g = Math.floor((left[1] * nScaler + right[1] * hScaler) / a);
  const b = Math.floor((left[2] * nScaler + right[2] * hScaler) / a);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/***/ }),

/***/ "./packages/core/dist/esm/internal/data-grid/data-grid-types.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$o": () => (/* binding */ InnerGridCellKind),
/* harmony export */   "DP": () => (/* binding */ isObjectEditorCallbackResult),
/* harmony export */   "EV": () => (/* binding */ CompactSelection),
/* harmony export */   "Gf": () => (/* binding */ headerCellCheckboxPrefix),
/* harmony export */   "PE": () => (/* binding */ GridColumnIcon),
/* harmony export */   "Qo": () => (/* binding */ isReadWriteCell),
/* harmony export */   "Sq": () => (/* binding */ isSizedGridColumn),
/* harmony export */   "T9": () => (/* binding */ isEditableGridCell),
/* harmony export */   "YK": () => (/* binding */ headerCellUnheckedMarker),
/* harmony export */   "f": () => (/* binding */ isTextEditableGridCell),
/* harmony export */   "iJ": () => (/* binding */ headerCellIndeterminateMarker),
/* harmony export */   "kf": () => (/* binding */ booleanCellIsEditable),
/* harmony export */   "p6": () => (/* binding */ GridCellKind),
/* harmony export */   "pN": () => (/* binding */ GridColumnMenuIcon),
/* harmony export */   "qF": () => (/* binding */ BooleanEmpty),
/* harmony export */   "qT": () => (/* binding */ headerCellCheckedMarker),
/* harmony export */   "rL": () => (/* binding */ resolveCellsThunk),
/* harmony export */   "rs": () => (/* binding */ isInnerOnlyCell),
/* harmony export */   "sd": () => (/* binding */ BooleanIndeterminate)
/* harmony export */ });
/* unused harmony export isRectangleEqual */
/* harmony import */ var _common_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/dist/esm/common/support.js");
/* harmony import */ var lodash_has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/has.js");
/* harmony import */ var lodash_has_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_has_js__WEBPACK_IMPORTED_MODULE_0__);
var _class;
let _Symbol$iterator;


const BooleanEmpty = null;
const BooleanIndeterminate = undefined;
var GridCellKind;
(function (GridCellKind) {
  GridCellKind["Uri"] = "uri";
  GridCellKind["Text"] = "text";
  GridCellKind["Image"] = "image";
  GridCellKind["RowID"] = "row-id";
  GridCellKind["Number"] = "number";
  GridCellKind["Bubble"] = "bubble";
  GridCellKind["Boolean"] = "boolean";
  GridCellKind["Loading"] = "loading";
  GridCellKind["Markdown"] = "markdown";
  GridCellKind["Drilldown"] = "drilldown";
  GridCellKind["Protected"] = "protected";
  GridCellKind["Custom"] = "custom";
})(GridCellKind || (GridCellKind = {}));
var GridColumnIcon;
(function (GridColumnIcon) {
  GridColumnIcon["HeaderRowID"] = "headerRowID";
  GridColumnIcon["HeaderCode"] = "headerCode";
  GridColumnIcon["HeaderNumber"] = "headerNumber";
  GridColumnIcon["HeaderString"] = "headerString";
  GridColumnIcon["HeaderBoolean"] = "headerBoolean";
  GridColumnIcon["HeaderAudioUri"] = "headerAudioUri";
  GridColumnIcon["HeaderVideoUri"] = "headerVideoUri";
  GridColumnIcon["HeaderEmoji"] = "headerEmoji";
  GridColumnIcon["HeaderImage"] = "headerImage";
  GridColumnIcon["HeaderUri"] = "headerUri";
  GridColumnIcon["HeaderPhone"] = "headerPhone";
  GridColumnIcon["HeaderMarkdown"] = "headerMarkdown";
  GridColumnIcon["HeaderDate"] = "headerDate";
  GridColumnIcon["HeaderTime"] = "headerTime";
  GridColumnIcon["HeaderEmail"] = "headerEmail";
  GridColumnIcon["HeaderReference"] = "headerReference";
  GridColumnIcon["HeaderIfThenElse"] = "headerIfThenElse";
  GridColumnIcon["HeaderSingleValue"] = "headerSingleValue";
  GridColumnIcon["HeaderLookup"] = "headerLookup";
  GridColumnIcon["HeaderTextTemplate"] = "headerTextTemplate";
  GridColumnIcon["HeaderMath"] = "headerMath";
  GridColumnIcon["HeaderRollup"] = "headerRollup";
  GridColumnIcon["HeaderJoinStrings"] = "headerJoinStrings";
  GridColumnIcon["HeaderSplitString"] = "headerSplitString";
  GridColumnIcon["HeaderGeoDistance"] = "headerGeoDistance";
  GridColumnIcon["HeaderArray"] = "headerArray";
  GridColumnIcon["RowOwnerOverlay"] = "rowOwnerOverlay";
  GridColumnIcon["ProtectedColumnOverlay"] = "protectedColumnOverlay";
})(GridColumnIcon || (GridColumnIcon = {}));
var GridColumnMenuIcon;
(function (GridColumnMenuIcon) {
  GridColumnMenuIcon["Triangle"] = "triangle";
  GridColumnMenuIcon["Dots"] = "dots";
})(GridColumnMenuIcon || (GridColumnMenuIcon = {}));
const headerCellCheckboxPrefix = "___gdg_header_cell_";
const headerCellCheckedMarker = headerCellCheckboxPrefix + "checked";
const headerCellUnheckedMarker = headerCellCheckboxPrefix + "unchecked";
const headerCellIndeterminateMarker = headerCellCheckboxPrefix + "indeterminate";
function isSizedGridColumn(c) {
  return "width" in c && typeof c.width === "number";
}
async function resolveCellsThunk(thunk) {
  if (typeof thunk === "object") return thunk;
  return await thunk();
}
function isEditableGridCell(cell) {
  if (cell.kind === GridCellKind.Loading || cell.kind === GridCellKind.Bubble || cell.kind === GridCellKind.RowID || cell.kind === GridCellKind.Protected || cell.kind === GridCellKind.Drilldown) {
    return false;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .proveType */ .NG)(cell);
  return true;
}
function isTextEditableGridCell(cell) {
  if (cell.kind === GridCellKind.Loading || cell.kind === GridCellKind.Bubble || cell.kind === GridCellKind.RowID || cell.kind === GridCellKind.Protected || cell.kind === GridCellKind.Drilldown || cell.kind === GridCellKind.Boolean || cell.kind === GridCellKind.Image || cell.kind === GridCellKind.Custom) {
    return false;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .proveType */ .NG)(cell);
  return true;
}
function isInnerOnlyCell(cell) {
  return cell.kind === InnerGridCellKind.Marker || cell.kind === InnerGridCellKind.NewRow;
}
function isReadWriteCell(cell) {
  if (!isEditableGridCell(cell) || cell.kind === GridCellKind.Image) return false;
  if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number || cell.kind === GridCellKind.Markdown || cell.kind === GridCellKind.Uri || cell.kind === GridCellKind.Custom || cell.kind === GridCellKind.Boolean) {
    return cell.readonly !== true;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNever */ .vE)(cell, "A cell was passed with an invalid kind");
}
function isRectangleEqual(a, b) {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function isObjectEditorCallbackResult(obj) {
  return lodash_has_js__WEBPACK_IMPORTED_MODULE_0___default()(obj, "editor");
}
function booleanCellIsEditable(cell) {
  var _cell$readonly;
  return !((_cell$readonly = cell.readonly) !== null && _cell$readonly !== void 0 ? _cell$readonly : false);
}
var InnerGridCellKind;
(function (InnerGridCellKind) {
  InnerGridCellKind["NewRow"] = "new-row";
  InnerGridCellKind["Marker"] = "marker";
})(InnerGridCellKind || (InnerGridCellKind = {}));
function mergeRanges(input) {
  if (input.length === 0) {
    return [];
  }
  const ranges = [...input];
  const stack = [];
  ranges.sort(function (a, b) {
    return a[0] - b[0];
  });
  stack.push([...ranges[0]]);
  for (const range of ranges.slice(1)) {
    const top = stack[stack.length - 1];
    if (top[1] < range[0]) {
      stack.push([...range]);
    } else if (top[1] < range[1]) {
      top[1] = range[1];
    }
  }
  return stack;
}
let emptyCompactSelection;
_Symbol$iterator = Symbol.iterator;
class CompactSelection {
  constructor(items) {
    this.items = void 0;
    this.items = items;
  }
  offset(amount) {
    if (amount === 0) return this;
    const newItems = this.items.map(x => [x[0] + amount, x[1] + amount]);
    return new CompactSelection(newItems);
  }
  add(selection) {
    const slice = typeof selection === "number" ? [selection, selection + 1] : selection;
    const newItems = mergeRanges([...this.items, slice]);
    return new CompactSelection(newItems);
  }
  remove(selection) {
    const items = [...this.items];
    const selMin = typeof selection === "number" ? selection : selection[0];
    const selMax = typeof selection === "number" ? selection + 1 : selection[1];
    for (const [i, slice] of items.entries()) {
      const [start, end] = slice;
      if (start <= selMax && selMin <= end) {
        const toAdd = [];
        if (start < selMin) {
          toAdd.push([start, selMin]);
        }
        if (selMax < end) {
          toAdd.push([selMax, end]);
        }
        items.splice(i, 1, ...toAdd);
      }
    }
    return new CompactSelection(items);
  }
  first() {
    if (this.items.length === 0) return undefined;
    return this.items[0][0];
  }
  last() {
    if (this.items.length === 0) return undefined;
    return this.items.slice(-1)[0][1] - 1;
  }
  hasIndex(index) {
    for (let i = 0; i < this.items.length; i++) {
      const [start, end] = this.items[i];
      if (index >= start && index < end) return true;
    }
    return false;
  }
  hasAll(index) {
    for (let x = index[0]; x < index[1]; x++) {
      if (!this.hasIndex(x)) return false;
    }
    return true;
  }
  some(predicate) {
    for (const i of this) {
      if (predicate(i)) return true;
    }
    return false;
  }
  equals(other) {
    if (other === this) return true;
    if (other.items.length !== this.items.length) return false;
    for (let i = 0; i < this.items.length; i++) {
      const left = other.items[i];
      const right = this.items[i];
      if (left[0] !== right[0] || left[1] !== right[1]) return false;
    }
    return true;
  }
  toArray() {
    const result = [];
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        result.push(x);
      }
    }
    return result;
  }
  get length() {
    let len = 0;
    for (const [start, end] of this.items) {
      len += end - start;
    }
    return len;
  }
  *[_Symbol$iterator]() {
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        yield x;
      }
    }
  }
}
_class = CompactSelection;
CompactSelection.empty = () => {
  var _emptyCompactSelectio;
  return (_emptyCompactSelectio = emptyCompactSelection) !== null && _emptyCompactSelectio !== void 0 ? _emptyCompactSelectio : emptyCompactSelection = new _class([]);
};
CompactSelection.fromSingleSelection = selection => {
  return _class.empty().add(selection);
};

/***/ }),

/***/ "./packages/core/dist/esm/internal/data-grid/render/data-grid-lib.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G6": () => (/* binding */ getStickyWidth),
/* harmony export */   "H1": () => (/* binding */ cellIsInRange),
/* harmony export */   "L6": () => (/* binding */ drawTextCellExternal),
/* harmony export */   "Ld": () => (/* binding */ drawMenuDots),
/* harmony export */   "NK": () => (/* binding */ roundedRect),
/* harmony export */   "NZ": () => (/* binding */ useMappedColumns),
/* harmony export */   "P7": () => (/* binding */ measureTextCached),
/* harmony export */   "PU": () => (/* binding */ isGroupEqual),
/* harmony export */   "Sb": () => (/* binding */ cellIsSelected),
/* harmony export */   "Ve": () => (/* binding */ computeBounds),
/* harmony export */   "WA": () => (/* binding */ getEmHeight),
/* harmony export */   "X4": () => (/* binding */ itemIsInRect),
/* harmony export */   "YN": () => (/* binding */ getFreezeTrailingHeight),
/* harmony export */   "_y": () => (/* binding */ getMeasuredTextCache),
/* harmony export */   "aX": () => (/* binding */ getMiddleCenterBias),
/* harmony export */   "ih": () => (/* binding */ getEffectiveColumns),
/* harmony export */   "k0": () => (/* binding */ prepTextCell),
/* harmony export */   "oK": () => (/* binding */ getColumnIndexForX),
/* harmony export */   "pU": () => (/* binding */ itemsAreEqual),
/* harmony export */   "pV": () => (/* binding */ getRowIndexForY),
/* harmony export */   "pZ": () => (/* binding */ gridSelectionHasItem),
/* harmony export */   "uN": () => (/* binding */ drawTextCell),
/* harmony export */   "vr": () => (/* binding */ drawLastUpdateUnderlay),
/* harmony export */   "zU": () => (/* binding */ rectBottomRight),
/* harmony export */   "zu": () => (/* binding */ roundedPoly)
/* harmony export */ });
/* unused harmony export remapForDnDState */
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/dist/esm/common/utils.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/canvas-hypertxt/dist/js/index.js");




function useMappedColumns(columns, freezeColumns) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => columns.map((c, i) => ({
    group: c.group,
    grow: c.grow,
    hasMenu: c.hasMenu,
    icon: c.icon,
    id: c.id,
    menuIcon: c.menuIcon,
    overlayIcon: c.overlayIcon,
    sourceIndex: i,
    sticky: i < freezeColumns,
    style: c.style,
    themeOverride: c.themeOverride,
    title: c.title,
    trailingRowOptions: c.trailingRowOptions,
    width: c.width
  })), [columns, freezeColumns]);
}
function gridSelectionHasItem(sel, item) {
  const [col, row] = item;
  if (sel.columns.hasIndex(col) || sel.rows.hasIndex(row)) return true;
  if (sel.current !== undefined) {
    if (itemsAreEqual(sel.current.cell, item)) return true;
    const toCheck = [sel.current.range, ...sel.current.rangeStack];
    for (const r of toCheck) {
      if (col >= r.x && col < r.x + r.width && row >= r.y && row < r.y + r.height) return true;
    }
  }
  return false;
}
function isGroupEqual(left, right) {
  return (left !== null && left !== void 0 ? left : "") === (right !== null && right !== void 0 ? right : "");
}
function cellIsSelected(location, cell, selection) {
  if (selection.current === undefined) return false;
  if (location[1] !== selection.current.cell[1]) return false;
  if (cell.span === undefined) {
    return selection.current.cell[0] === location[0];
  }
  return selection.current.cell[0] >= cell.span[0] && selection.current.cell[0] <= cell.span[1];
}
function itemIsInRect(location, rect) {
  const [x, y] = location;
  return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}
function itemsAreEqual(a, b) {
  return (a === null || a === void 0 ? void 0 : a[0]) === (b === null || b === void 0 ? void 0 : b[0]) && (a === null || a === void 0 ? void 0 : a[1]) === (b === null || b === void 0 ? void 0 : b[1]);
}
function rectBottomRight(rect) {
  return [rect.x + rect.width - 1, rect.y + rect.height - 1];
}
function cellIsInRect(location, cell, rect) {
  const startX = rect.x;
  const endX = rect.x + rect.width - 1;
  const startY = rect.y;
  const endY = rect.y + rect.height - 1;
  const [cellCol, cellRow] = location;
  if (cellRow < startY || cellRow > endY) return false;
  if (cell.span === undefined) {
    return cellCol >= startX && cellCol <= endX;
  }
  const [spanStart, spanEnd] = cell.span;
  return spanStart >= startX && spanStart <= endX || spanEnd >= startX && spanStart <= endX || spanStart < startX && spanEnd > endX;
}
function cellIsInRange(location, cell, selection) {
  let result = 0;
  if (selection.current === undefined) return result;
  if (cellIsInRect(location, cell, selection.current.range)) result++;
  for (const r of selection.current.rangeStack) {
    if (cellIsInRect(location, cell, r)) {
      result++;
    }
  }
  return result;
}
function remapForDnDState(columns, dndState) {
  let mappedCols = columns;
  if (dndState !== undefined) {
    let writable = [...columns];
    const temp = mappedCols[dndState.src];
    if (dndState.src > dndState.dest) {
      writable.splice(dndState.src, 1);
      writable.splice(dndState.dest, 0, temp);
    } else {
      writable.splice(dndState.dest + 1, 0, temp);
      writable.splice(dndState.src, 1);
    }
    writable = writable.map((c, i) => ({
      ...c,
      sticky: columns[i].sticky
    }));
    mappedCols = writable;
  }
  return mappedCols;
}
function getStickyWidth(columns, dndState) {
  let result = 0;
  const remapped = remapForDnDState(columns, dndState);
  for (let i = 0; i < remapped.length; i++) {
    const c = remapped[i];
    if (c.sticky) result += c.width;else break;
  }
  return result;
}
function getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) {
  if (typeof getRowHeight === "number") {
    return freezeTrailingRows * getRowHeight;
  } else {
    let result = 0;
    for (let i = rows - freezeTrailingRows; i < rows; i++) {
      result += getRowHeight(i);
    }
    return result;
  }
}
function getEffectiveColumns(columns, cellXOffset, width, dndState, tx) {
  const mappedCols = remapForDnDState(columns, dndState);
  const sticky = [];
  for (const c of mappedCols) {
    if (c.sticky) {
      sticky.push(c);
    } else {
      break;
    }
  }
  if (sticky.length > 0) {
    for (const c of sticky) {
      width -= c.width;
    }
  }
  let endIndex = cellXOffset;
  let curX = tx !== null && tx !== void 0 ? tx : 0;
  while (curX <= width && endIndex < mappedCols.length) {
    curX += mappedCols[endIndex].width;
    endIndex++;
  }
  for (let i = cellXOffset; i < endIndex; i++) {
    const c = mappedCols[i];
    if (!c.sticky) {
      sticky.push(c);
    }
  }
  return sticky;
}
function getColumnIndexForX(targetX, effectiveColumns, translateX) {
  let x = 0;
  for (const c of effectiveColumns) {
    const cx = c.sticky ? x : x + (translateX !== null && translateX !== void 0 ? translateX : 0);
    if (targetX <= cx + c.width) {
      return c.sourceIndex;
    }
    x += c.width;
  }
  return -1;
}
function getRowIndexForY(targetY, height, hasGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows) {
  const totalHeaderHeight = headerHeight + groupHeaderHeight;
  if (hasGroups && targetY <= groupHeaderHeight) return -2;
  if (targetY <= totalHeaderHeight) return -1;
  let y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    const row = rows - 1 - fr;
    const rh = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
    y -= rh;
    if (targetY >= y) {
      return row;
    }
  }
  const effectiveRows = rows - freezeTrailingRows;
  const ty = targetY - (translateY !== null && translateY !== void 0 ? translateY : 0);
  if (typeof rowHeight === "number") {
    const target = Math.floor((ty - totalHeaderHeight) / rowHeight) + cellYOffset;
    if (target >= effectiveRows) return undefined;
    return target;
  } else {
    let curY = totalHeaderHeight;
    for (let i = cellYOffset; i < effectiveRows; i++) {
      const rh = rowHeight(i);
      if (ty <= curY + rh) return i;
      curY += rh;
    }
    return undefined;
  }
}
let metricsSize = 0;
let metricsCache = {};
const isSSR = typeof window === "undefined";
async function clearCacheOnLoad() {
  var _document;
  if (isSSR || ((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === undefined) return;
  await document.fonts.ready;
  metricsSize = 0;
  metricsCache = {};
  (0,canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__/* .clearCache */ .L)();
}
void clearCacheOnLoad();
function makeCacheKey(s, ctx, baseline, font) {
  return `${s}_${font !== null && font !== void 0 ? font : ctx === null || ctx === void 0 ? void 0 : ctx.font}_${baseline}`;
}
function measureTextCached(s, ctx, font) {
  const key = makeCacheKey(s, ctx, "middle", font);
  let metrics = metricsCache[key];
  if (metrics === undefined) {
    metrics = ctx.measureText(s);
    metricsCache[key] = metrics;
    metricsSize++;
  }
  if (metricsSize > 10000) {
    metricsCache = {};
    metricsSize = 0;
  }
  return metrics;
}
function getMeasuredTextCache(s, font) {
  const key = makeCacheKey(s, undefined, "middle", font);
  return metricsCache[key];
}
function getMiddleCenterBias(ctx, font) {
  if (typeof font !== "string") {
    font = font.baseFontFull;
  }
  return getMiddleCenterBiasInner(ctx, font);
}
function loadMetric(ctx, baseline) {
  const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ctx.save();
  ctx.textBaseline = baseline;
  const result = ctx.measureText(sample);
  ctx.restore();
  return result;
}
const biasCache = [];
function getMiddleCenterBiasInner(ctx, font) {
  for (const x of biasCache) {
    if (x.key === font) return x.val;
  }
  const alphabeticMetrics = loadMetric(ctx, "alphabetic");
  const middleMetrics = loadMetric(ctx, "middle");
  const bias = -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) + alphabeticMetrics.actualBoundingBoxAscent / 2;
  biasCache.push({
    key: font,
    val: bias
  });
  return bias;
}
function drawLastUpdateUnderlay(args, lastUpdate, frameTime, lastPrep, isLastCol, isLastRow) {
  const {
    ctx,
    rect,
    theme
  } = args;
  let progress = Number.MAX_SAFE_INTEGER;
  const animTime = 500;
  if (lastUpdate !== undefined) {
    progress = frameTime - lastUpdate;
    if (progress < animTime) {
      const fade = 1 - progress / animTime;
      ctx.globalAlpha = fade;
      ctx.fillStyle = theme.bgSearchResult;
      ctx.fillRect(rect.x + 1, rect.y + 1, rect.width - (isLastCol ? 2 : 1), rect.height - (isLastRow ? 2 : 1));
      ctx.globalAlpha = 1;
      if (lastPrep !== undefined) {
        lastPrep.fillStyle = theme.bgSearchResult;
      }
    }
  }
  return progress < animTime;
}
function prepTextCell(args, lastPrep, overrideColor) {
  const {
    ctx,
    theme
  } = args;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  const newFill = overrideColor !== null && overrideColor !== void 0 ? overrideColor : theme.textDark;
  if (newFill !== result.fillStyle) {
    ctx.fillStyle = newFill;
    result.fillStyle = newFill;
  }
  return result;
}
function drawTextCellExternal(args, data, contentAlign) {
  const {
    rect,
    ctx,
    theme
  } = args;
  ctx.fillStyle = theme.textDark;
  drawTextCell({
    ctx: ctx,
    rect,
    theme: theme
  }, data, contentAlign);
}
function drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign) {
  if (contentAlign === "right") {
    ctx.fillText(data, x + w - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
  } else if (contentAlign === "center") {
    ctx.fillText(data, x + w / 2, y + h / 2 + bias);
  } else {
    ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
  }
}
function getEmHeight(ctx, fontStyle) {
  const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle);
  return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}
function truncateString(data, w) {
  if (data.includes("\n")) {
    data = data.split(/\r?\n/, 1)[0];
  }
  const max = w / 4;
  if (data.length > max) {
    data = data.slice(0, max);
  }
  return data;
}
function drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping) {
  const fontStyle = theme.baseFontFull;
  const split = (0,canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__/* .split */ .V)(ctx, data, fontStyle, w - theme.cellHorizontalPadding * 2, hyperWrapping !== null && hyperWrapping !== void 0 ? hyperWrapping : false);
  const emHeight = getEmHeight(ctx, fontStyle);
  const lineHeight = theme.lineHeight * emHeight;
  const actualHeight = emHeight + lineHeight * (split.length - 1);
  const mustClip = actualHeight + theme.cellVerticalPadding > h;
  if (mustClip) {
    ctx.save();
    ctx.rect(x, y, w, h);
    ctx.clip();
  }
  const optimalY = y + h / 2 - actualHeight / 2;
  let drawY = Math.max(y + theme.cellVerticalPadding, optimalY);
  for (const line of split) {
    drawSingleTextLine(ctx, line, x, drawY, w, emHeight, bias, theme, contentAlign);
    drawY += lineHeight;
    if (drawY > y + h) break;
  }
  if (mustClip) {
    ctx.restore();
  }
}
function drawTextCell(args, data, contentAlign, allowWrapping, hyperWrapping) {
  var _allowWrapping;
  const {
    ctx,
    rect,
    theme
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  allowWrapping = (_allowWrapping = allowWrapping) !== null && _allowWrapping !== void 0 ? _allowWrapping : false;
  if (!allowWrapping) {
    data = truncateString(data, w);
  }
  const bias = getMiddleCenterBias(ctx, theme);
  const isRtl = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .direction */ .o7)(data) === "rtl";
  if (contentAlign === undefined && isRtl) {
    contentAlign = "right";
  }
  if (isRtl) {
    ctx.direction = "rtl";
  }
  if (data.length > 0) {
    let changed = false;
    if (contentAlign === "right") {
      ctx.textAlign = "right";
      changed = true;
    } else if (contentAlign !== undefined && contentAlign !== "left") {
      ctx.textAlign = contentAlign;
      changed = true;
    }
    if (!allowWrapping) {
      drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign);
    } else {
      drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping);
    }
    if (changed) {
      ctx.textAlign = "start";
    }
    if (isRtl) {
      ctx.direction = "inherit";
    }
  }
}
function roundedRect(ctx, x, y, width, height, radius) {
  if (typeof radius === "number") {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  }
  radius = {
    tl: Math.max(0, Math.min(radius.tl, height / 2, width / 2)),
    tr: Math.max(0, Math.min(radius.tr, height / 2, width / 2)),
    bl: Math.max(0, Math.min(radius.bl, height / 2, width / 2)),
    br: Math.max(0, Math.min(radius.br, height / 2, width / 2))
  };
  ctx.moveTo(x + radius.tl, y);
  ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
  ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
  ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
  ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
function drawMenuDots(ctx, dotsX, dotsY) {
  const radius = 1.25;
  ctx.arc(dotsX, dotsY - radius * 3.5, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY + radius * 3.5, radius, 0, 2 * Math.PI, false);
}
function roundedPoly(ctx, points, radiusAll) {
  const asVec = function (p, pp) {
    const vx = pp.x - p.x;
    const vy = pp.y - p.y;
    const vlen = Math.sqrt(vx * vx + vy * vy);
    const vnx = vx / vlen;
    const vny = vy / vlen;
    return {
      x: vx,
      y: pp.y - p.y,
      len: vlen,
      nx: vnx,
      ny: vny,
      ang: Math.atan2(vny, vnx)
    };
  };
  let radius;
  const len = points.length;
  let p1 = points[len - 1];
  for (let i = 0; i < len; i++) {
    let p2 = points[i % len];
    const p3 = points[(i + 1) % len];
    const v1 = asVec(p2, p1);
    const v2 = asVec(p2, p3);
    const sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    const sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    let angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
    let radDirection = 1;
    let drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    radius = p2.radius !== undefined ? p2.radius : radiusAll;
    const halfAngle = angle / 2;
    let lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
    let cRadius;
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    let x = p2.x + v2.nx * lenOut;
    let y = p2.y + v2.ny * lenOut;
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}
function computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight) {
  const result = {
    x: 0,
    y: totalHeaderHeight + translateY,
    width: 0,
    height: 0
  };
  if (col >= mappedColumns.length || row >= rows || row < -2 || col < 0) {
    return result;
  }
  const headerHeight = totalHeaderHeight - groupHeaderHeight;
  if (col >= freezeColumns) {
    const dir = cellXOffset > col ? -1 : 1;
    const freezeWidth = getStickyWidth(mappedColumns);
    result.x += freezeWidth + translateX;
    for (let i = cellXOffset; i !== col; i += dir) {
      result.x += mappedColumns[dir === 1 ? i : i - 1].width * dir;
    }
  } else {
    for (let i = 0; i < col; i++) {
      result.x += mappedColumns[i].width;
    }
  }
  result.width = mappedColumns[col].width + 1;
  if (row === -1) {
    result.y = groupHeaderHeight;
    result.height = headerHeight;
  } else if (row === -2) {
    result.y = 0;
    result.height = groupHeaderHeight;
    let start = col;
    const group = mappedColumns[col].group;
    const sticky = mappedColumns[col].sticky;
    while (start > 0 && isGroupEqual(mappedColumns[start - 1].group, group) && mappedColumns[start - 1].sticky === sticky) {
      const c = mappedColumns[start - 1];
      result.x -= c.width;
      result.width += c.width;
      start--;
    }
    let end = col;
    while (end + 1 < mappedColumns.length && isGroupEqual(mappedColumns[end + 1].group, group) && mappedColumns[end + 1].sticky === sticky) {
      const c = mappedColumns[end + 1];
      result.width += c.width;
      end++;
    }
    if (!sticky) {
      const freezeWidth = getStickyWidth(mappedColumns);
      const clip = result.x - freezeWidth;
      if (clip < 0) {
        result.x -= clip;
        result.width += clip;
      }
      if (result.x + result.width > width) {
        result.width = width - result.x;
      }
    }
  } else if (row >= rows - freezeTrailingRows) {
    let dy = rows - row;
    result.y = height;
    while (dy > 0) {
      const r = row + dy - 1;
      result.height = typeof rowHeight === "number" ? rowHeight : rowHeight(r);
      result.y -= result.height;
      dy--;
    }
    result.height += 1;
  } else {
    const dir = cellYOffset > row ? -1 : 1;
    if (typeof rowHeight === "number") {
      const delta = row - cellYOffset;
      result.y += delta * rowHeight;
    } else {
      for (let r = cellYOffset; r !== row; r += dir) {
        result.y += rowHeight(r) * dir;
      }
    }
    result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
  }
  return result;
}

/***/ }),

/***/ "./packages/core/dist/esm/internal/growing-entry/growing-entry.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "K": () => (/* binding */ GrowingEntry)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/growing-entry/growing-entry-style.js

const InputBox = (0,dist/* styled */.z)('textarea')({
  name: "InputBox",
  class: "gdg-izpuzkl",
  propsAsIs: false
});
const ShadowBox = (0,dist/* styled */.z)('div')({
  name: "ShadowBox",
  class: "gdg-s69h75o",
  propsAsIs: false
});
const GrowingEntryStyle = (0,dist/* styled */.z)('div')({
  name: "GrowingEntryStyle",
  class: "gdg-g1y0xocz",
  propsAsIs: false
});
// EXTERNAL MODULE: ./packages/core/dist/esm/common/support.js
var support = __webpack_require__("./packages/core/dist/esm/common/support.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/growing-entry/growing-entry.js



let globalInputID = 0;
const GrowingEntry = props => {
  const {
    placeholder,
    value,
    onKeyDown,
    highlight,
    altNewline,
    validatedSelection,
    ...rest
  } = props;
  const {
    onChange,
    className
  } = rest;
  const inputRef = react.useRef(null);
  const useText = value !== null && value !== void 0 ? value : "";
  (0,support/* assert */.hu)(onChange !== undefined, "GrowingEntry must be a controlled input area");
  const [inputID] = react.useState(() => "input-box-" + (globalInputID = (globalInputID + 1) % 10000000));
  react.useEffect(() => {
    const ta = inputRef.current;
    if (ta === null) return;
    if (ta.disabled) return;
    const length = useText.toString().length;
    ta.focus();
    ta.setSelectionRange(highlight ? 0 : length, length);
  }, []);
  react.useLayoutEffect(() => {
    if (validatedSelection !== undefined) {
      var _inputRef$current;
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  const onKeyDownInner = react.useCallback(e => {
    if (e.key === "Enter" && e.shiftKey && altNewline === true) {
      return;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  }, [altNewline, onKeyDown]);
  return react.createElement(GrowingEntryStyle, {
    className: "gdg-growing-entry"
  }, react.createElement(ShadowBox, {
    className: className
  }, useText + "\n"), react.createElement(InputBox, {
    ...rest,
    className: (className !== null && className !== void 0 ? className : "") + " gdg-input",
    id: inputID,
    ref: inputRef,
    onKeyDown: onKeyDownInner,
    value: useText,
    placeholder: placeholder,
    dir: "auto"
  }));
};

/***/ })

}]);
//# sourceMappingURL=4981.5ae4655d.iframe.bundle.js.map