"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Simplenotest = Simplenotest;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _storyUtils = require("../stories/story-utils");

var _scrollingDataGrid = _interopRequireDefault(require("./scrolling-data-grid"));

var _styles = require("../common/styles");

var _dataGridTypes = require("../data-grid/data-grid-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    height: 100px;\n\n    > * {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InnerContainer = _styles.styled.div(_templateObject());

var _default = {
  title: "Designer/DateViewer/ScrollingDataGrid",
  decorators: [(0, _addonKnobs.withKnobs)({
    escapeHTML: false
  }), function (fn, context) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_storyUtils.BuilderThemeWrapper, {
      width: 1500,
      height: 1000,
      context: context
    }, /*#__PURE__*/React.createElement(InnerContainer, null, fn())));
  }]
};
exports.default = _default;

function Simplenotest() {
  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      x = _React$useState2[0],
      setX = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      y = _React$useState4[0],
      setY = _React$useState4[1];

  var _React$useState5 = React.useState(0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      translateX = _React$useState6[0],
      setTx = _React$useState6[1];

  var _React$useState7 = React.useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      translateY = _React$useState8[0],
      setTy = _React$useState8[1];

  var onVisibleRegionChanged = React.useCallback(function (range, tx, ty) {
    setX(range.x);
    setY(range.y);
    setTx(tx);
    setTy(ty);
  }, []);
  var columns = React.useMemo(function () {
    var j = 0;
    return ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"].map(function (t) {
      return {
        title: t,
        width: 122 + (j += 50)
      };
    });
  }, []);
  var getCellContent = React.useCallback(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        col = _ref2[0],
        row = _ref2[1];

    return {
      kind: _dataGridTypes.GridCellKind.Text,
      displayData: "".concat(col, ",").concat(row, " Testing things that are way too long"),
      data: "".concat(col, ",").concat(row, " Testing things that are way too long"),
      allowOverlay: true
    };
  }, []);
  return /*#__PURE__*/React.createElement(_scrollingDataGrid.default, {
    rows: 10000,
    cellXOffset: x,
    cellYOffset: y,
    translateX: translateX,
    translateY: translateY,
    headerHeight: 44,
    allowResize: true,
    rowHeight: 34,
    onVisibleRegionChanged: onVisibleRegionChanged,
    columns: columns,
    getCellContent: getCellContent,
    firstColSticky: true,
    smoothScrollX: true,
    smoothScrollY: true
  });
}