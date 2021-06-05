"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Simplenotest = Simplenotest;
exports.SelectedCellnotest = SelectedCellnotest;
exports.SelectedRownotest = SelectedRownotest;
exports.SelectedColumnnotest = exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _storyUtils = require("../stories/story-utils");

var _dataGrid = _interopRequireDefault(require("./data-grid"));

var _dataGridTypes = require("./data-grid-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  title: "Designer/DateViewer/DataGrid",
  decorators: [(0, _addonKnobs.withKnobs)({
    escapeHTML: false
  }), function (fn, context) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_storyUtils.BuilderThemeWrapper, {
      width: 600,
      height: 0,
      context: context
    }, fn()));
  }]
};
exports.default = _default;

function Simplenotest() {
  var x = 0;
  return /*#__PURE__*/React.createElement(_dataGrid.default, {
    allowResize: true,
    width: 600,
    height: 500,
    cellXOffset: 0,
    cellYOffset: 0,
    rows: 1000,
    headerHeight: 44,
    rowHeight: 34,
    columns: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(function (t) {
      return {
        title: t,
        width: 122 + (x += 10)
      };
    }),
    getCellContent: function getCellContent(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          col = _ref2[0],
          row = _ref2[1];

      return {
        kind: _dataGridTypes.GridCellKind.Text,
        displayData: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        data: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        allowOverlay: false,
        owned: true
      };
    },
    firstColSticky: false
  });
}

function SelectedCellnotest() {
  var x = 0;
  return /*#__PURE__*/React.createElement(_dataGrid.default, {
    allowResize: true,
    width: 600,
    height: 500,
    cellXOffset: 0,
    cellYOffset: 0,
    rows: 1000,
    headerHeight: 44,
    rowHeight: 34,
    columns: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(function (t) {
      return {
        title: t,
        width: 122 + (x += 10)
      };
    }),
    getCellContent: function getCellContent(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          col = _ref4[0],
          row = _ref4[1];

      return {
        kind: _dataGridTypes.GridCellKind.Text,
        displayData: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        data: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        allowOverlay: false,
        owned: true
      };
    },
    selectedCell: {
      cell: [2, 2]
    },
    firstColSticky: false
  });
}

function SelectedRownotest() {
  var x = 0;
  return /*#__PURE__*/React.createElement(_dataGrid.default, {
    allowResize: true,
    width: 600,
    height: 500,
    cellXOffset: 0,
    cellYOffset: 0,
    rows: 1000,
    headerHeight: 44,
    rowHeight: 34,
    columns: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(function (t) {
      return {
        title: t,
        width: 122 + (x += 10)
      };
    }),
    getCellContent: function getCellContent(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          col = _ref6[0],
          row = _ref6[1];

      return {
        kind: _dataGridTypes.GridCellKind.Text,
        displayData: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        data: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        allowOverlay: false,
        owned: true
      };
    },
    selectedRows: [2, 4],
    firstColSticky: false
  });
}

var SelectedColumnnotest = function SelectedColumnnotest() {
  var x = 0;
  return /*#__PURE__*/React.createElement(_dataGrid.default, {
    allowResize: true,
    width: 600,
    height: 500,
    cellXOffset: 0,
    cellYOffset: 0,
    rows: 1000,
    headerHeight: 44,
    rowHeight: 34,
    columns: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(function (t) {
      return {
        title: t,
        width: 122 + (x += 10)
      };
    }),
    getCellContent: function getCellContent(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          col = _ref8[0],
          row = _ref8[1];

      return {
        kind: _dataGridTypes.GridCellKind.Text,
        displayData: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        data: "".concat(col, ",").concat(row, " Testing things that are way too long"),
        allowOverlay: false,
        owned: true
      };
    },
    selectedColumns: [2, 4],
    firstColSticky: false
  });
};

exports.SelectedColumnnotest = SelectedColumnnotest;