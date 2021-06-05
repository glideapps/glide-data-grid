"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clamp = _interopRequireDefault(require("lodash/clamp"));

var React = _interopRequireWildcard(require("react"));

var _dataGrid = _interopRequireDefault(require("../data-grid/data-grid"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DataGridDnd = function DataGridDnd(p) {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      resizeColStartX = _React$useState2[0],
      setResizeColStartX = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      resizeCol = _React$useState4[0],
      setResizeCol = _React$useState4[1];

  var _React$useState5 = React.useState(),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      dragCol = _React$useState6[0],
      setDragCol = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      dropCol = _React$useState8[0],
      setDropCol = _React$useState8[1];

  var firstColSticky = p.firstColSticky,
      onColumnMoved = p.onColumnMoved,
      onMouseDown = p.onMouseDown,
      onMouseUp = p.onMouseUp,
      onItemHovered = p.onItemHovered,
      isDraggable = p.isDraggable,
      columns = p.columns,
      onColumnResized = p.onColumnResized,
      gridRef = p.gridRef,
      maxColumnWidth = p.maxColumnWidth;
  var onItemHoveredImpl = React.useCallback(function (args) {
    var _args$location = _slicedToArray(args.location, 1),
        col = _args$location[0];

    if (dragCol !== undefined && dropCol !== col && (!firstColSticky || col > 0)) {
      setDropCol(col);
    }

    onItemHovered === null || onItemHovered === void 0 ? void 0 : onItemHovered(args);
  }, [dragCol, dropCol, firstColSticky, onItemHovered]);
  var onMouseDownImpl = React.useCallback(function (args) {
    var shouldFireEvent = true;

    var _args$location2 = _slicedToArray(args.location, 1),
        col = _args$location2[0];

    if (!(isDraggable === true) && (args.kind === "header" || args.kind === "cell") && (!firstColSticky || col > 0)) {
      if (args.isEdge) {
        shouldFireEvent = false;
        setResizeColStartX(args.bounds.x);
        setResizeCol(col);
      } else if (args.kind === "header") {
        setDragCol(col);
      }
    }

    if (shouldFireEvent) onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(args);
  }, [firstColSticky, isDraggable, onMouseDown]);
  var onMouseUpImpl = React.useCallback(function (args) {
    setDragCol(undefined);
    setDropCol(undefined);
    setResizeCol(undefined);
    setResizeColStartX(undefined);

    if (dragCol !== undefined && dropCol !== undefined) {
      if (dropCol !== undefined) {
        onColumnMoved === null || onColumnMoved === void 0 ? void 0 : onColumnMoved(dragCol, dropCol);
      }
    }

    onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(args);
  }, [dragCol, dropCol, onColumnMoved, onMouseUp]);
  var dragOffset = React.useMemo(function () {
    if (dragCol === undefined || dropCol === undefined) return undefined;
    if (dragCol === dropCol) return undefined;
    return {
      src: dragCol,
      dest: dropCol
    };
  }, [dragCol, dropCol]);
  var maxColumnWidthValue = maxColumnWidth === undefined ? 500 : maxColumnWidth < 50 ? 50 : maxColumnWidth;
  var onMouseMove = React.useCallback(function (event) {
    if (resizeCol === undefined || resizeColStartX === undefined) return;
    var column = columns[resizeCol];
    var newWidth = (0, _clamp.default)(event.clientX - resizeColStartX, 50, maxColumnWidthValue);
    onColumnResized === null || onColumnResized === void 0 ? void 0 : onColumnResized(column, newWidth);
  }, [resizeCol, resizeColStartX, columns, onColumnResized, maxColumnWidthValue]);
  return /*#__PURE__*/React.createElement(_dataGrid.default, _extends({}, p, {
    onItemHovered: onItemHoveredImpl,
    onMouseDown: onMouseDownImpl,
    onMouseUp: onMouseUpImpl,
    dragAndDropState: dragOffset,
    onMouseMove: onMouseMove,
    ref: gridRef
  }));
};

var _default = DataGridDnd;
exports.default = _default;