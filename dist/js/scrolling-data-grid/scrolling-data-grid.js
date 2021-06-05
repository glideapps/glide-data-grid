"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _dataGridDnd = _interopRequireDefault(require("../data-grid-dnd/data-grid-dnd"));

var _scrollRegion = _interopRequireDefault(require("../scroll-region/scroll-region"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var GridScroller = function GridScroller(p) {
  var columns = p.columns,
      rows = p.rows,
      rowHeight = p.rowHeight,
      headerHeight = p.headerHeight,
      firstColSticky = p.firstColSticky;

  var className = p.className,
      onVisibleRegionChanged = p.onVisibleRegionChanged,
      scrollToEnd = p.scrollToEnd,
      scrollRef = p.scrollRef,
      dataGridProps = _objectWithoutProperties(p, ["className", "onVisibleRegionChanged", "scrollToEnd", "scrollRef"]);

  var smoothScrollX = p.smoothScrollX,
      smoothScrollY = p.smoothScrollY;

  var _React$useState = React.useState(10),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      clientWidth = _React$useState2[0],
      setClientWidth = _React$useState2[1];

  var _React$useState3 = React.useState(10),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      clientHeight = _React$useState4[0],
      setClientHeight = _React$useState4[1];

  var last = React.useRef();
  var lastX = React.useRef();
  var lastY = React.useRef();
  var width = 0;
  columns.forEach(function (c) {
    return width += c.width;
  });
  var height = headerHeight;

  if (typeof rowHeight === "number") {
    height += rows * rowHeight;
  } else {
    for (var r = 0; r < rows; r++) {
      height += rowHeight(r);
    }
  }

  var lastArgs = React.useRef();
  var processArgs = React.useCallback(function () {
    var args = lastArgs.current;
    if (args === undefined) return;
    setClientHeight(args.clientHeight);
    setClientWidth(args.clientWidth);
    var x = 0;
    var tx = 0;
    var cellRight = 0;
    var cellX = 0;
    var stickyColWidth = firstColSticky ? columns[0].width : 0;

    var _iterator = _createForOfIteratorHelper(columns),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        var cx = x - stickyColWidth;

        if (args.scrollLeft >= cx + c.width) {
          x += c.width;
          cellX++;
          cellRight++;
        } else if (args.scrollLeft > cx) {
          x += c.width;

          if (smoothScrollX) {
            tx += cx - args.scrollLeft;
          } else {
            cellX++;
          }

          cellRight++;
        } else if (args.scrollLeft + args.clientWidth > cx) {
          x += c.width;
          cellRight++;
        } else {
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var ty = 0;
    var cellY = 0;
    var cellBottom = 0;

    if (typeof rowHeight === "number") {
      if (smoothScrollY) {
        cellY = Math.floor(args.scrollTop / rowHeight);
        ty = cellY * rowHeight - args.scrollTop;
      } else {
        cellY = Math.ceil(args.scrollTop / rowHeight);
      }

      cellBottom = Math.ceil(args.clientHeight / rowHeight) + cellY;
      if (ty < 0) cellBottom++;
    } else {
      var y = 0;

      for (var row = 0; row < rows; row++) {
        var rh = rowHeight(row);
        var cy = y + (smoothScrollY ? 0 : rh / 2);

        if (args.scrollTop >= y + rh) {
          y += rh;
          cellY++;
          cellBottom++;
        } else if (args.scrollTop > cy) {
          y += rh;

          if (smoothScrollY) {
            ty += cy - args.scrollTop;
          } else {
            cellY++;
          }

          cellBottom++;
        } else if (args.scrollTop + args.clientHeight > rh / 2 + y) {
          y += rh;
          cellBottom++;
        } else {
          break;
        }
      }
    }

    var rect = {
      x: cellX,
      y: cellY,
      width: cellRight - cellX,
      height: cellBottom - cellY
    };
    var oldRect = last.current;

    if (oldRect === undefined || oldRect.y !== rect.y || oldRect.x !== rect.x || oldRect.height !== rect.height || oldRect.width !== rect.width || lastX.current !== tx || lastY.current !== ty) {
      onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 ? void 0 : onVisibleRegionChanged({
        x: cellX,
        y: cellY,
        width: cellRight - cellX,
        height: cellBottom - cellY
      }, tx, ty);
      last.current = rect;
      lastX.current = tx;
      lastY.current = ty;
    }
  }, [columns, rowHeight, rows, onVisibleRegionChanged, firstColSticky, smoothScrollX, smoothScrollY]);
  var onScrollUpdate = React.useCallback(function (args) {
    lastArgs.current = args;
    processArgs();
  }, [processArgs]);
  React.useEffect(function () {
    processArgs();
  }, [processArgs]);
  return /*#__PURE__*/React.createElement(_scrollRegion.default, {
    scrollRef: scrollRef,
    className: className,
    draggable: dataGridProps.isDraggable === true,
    scrollWidth: width,
    scrollHeight: height,
    update: onScrollUpdate,
    scrollToEnd: scrollToEnd
  }, /*#__PURE__*/React.createElement(_dataGridDnd.default, _extends({
    eventTargetRef: scrollRef,
    width: clientWidth,
    height: clientHeight
  }, dataGridProps)));
};

var _default = GridScroller;
exports.default = _default;