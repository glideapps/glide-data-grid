"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Simplenotest = Simplenotest;
exports.Minimal = Minimal;
exports.Smooth = Smooth;
exports.ManualControl = ManualControl;
exports.Draggable = Draggable;
exports.IdealSize = IdealSize;
exports.AdjustableColumns = AdjustableColumns;
exports.RowSelectionStateLivesOutside = RowSelectionStateLivesOutside;
exports.ColSelectionStateLivesOutside = ColSelectionStateLivesOutside;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _addons = require("@storybook/addons");

var _storyUtils = require("../stories/story-utils");

var _dataGridTypes = require("../data-grid/data-grid-types");

var _reactVirtualizedAutoSizer = _interopRequireDefault(require("react-virtualized-auto-sizer"));

var _dataEditor = _interopRequireDefault(require("./data-editor"));

var _dataGridContainer = _interopRequireDefault(require("../data-editor-container/data-grid-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// const InnerContainer = styled.div`
//     width: 100%;
//     height: 100px;
//     > :first-child {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//     }
// `;
var _default = {
  title: "Designer/DateViewer/DataEditor",
  decorators: [(0, _addonKnobs.withKnobs)({
    escapeHTML: false
  }), function (fn, context) {
    return /*#__PURE__*/React.createElement(_reactVirtualizedAutoSizer.default, null, function (props) {
      var _props$width, _props$height, _props$width2, _props$height2;

      return /*#__PURE__*/React.createElement(_storyUtils.BuilderThemeWrapper, {
        width: (_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 1000,
        height: (_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : 800,
        context: context
      }, /*#__PURE__*/React.createElement(_dataGridContainer.default, {
        width: (_props$width2 = props.width) !== null && _props$width2 !== void 0 ? _props$width2 : 1000,
        height: (_props$height2 = props.height) !== null && _props$height2 !== void 0 ? _props$height2 : 800
      }, fn()));
    });
  }]
};
exports.default = _default;

function getDummyData(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      col = _ref2[0],
      row = _ref2[1];

  if (col === 0) {
    return {
      kind: _dataGridTypes.GridCellKind.RowID,
      data: "RowID ".concat(col, ", ").concat(row),
      allowOverlay: false
    };
  }

  if (col === 1) {
    return {
      kind: _dataGridTypes.GridCellKind.Bubble,
      data: ["Bub ".concat(col), "Bub ".concat(row), "Bub ".concat(col), "Bub ".concat(row), "Bub ".concat(col), "Bub ".concat(row), "Bub ".concat(col), "Bub ".concat(row), "Bub ".concat(col), "Bub ".concat(row)],
      allowOverlay: true
    };
  }

  if (col === 2) {
    return {
      kind: _dataGridTypes.GridCellKind.Image,
      data: ["https://i.imgur.com/5J0BftG.jpg", "https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581"],
      allowOverlay: true,
      allowAdd: true
    };
  }

  if (col === 3) {
    return {
      kind: _dataGridTypes.GridCellKind.Markdown,
      data: "## Markdown has titles\n\nAnd supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.\n\n- with\n- lists\n- that\n- can\n- be\n- pretty\n- long\n                    ",
      allowOverlay: true
    };
  }

  if (col === 4) {
    return {
      kind: _dataGridTypes.GridCellKind.Number,
      displayData: "$10,352",
      allowOverlay: true,
      data: 10352
    };
  }

  if (col === 5) {
    return {
      kind: _dataGridTypes.GridCellKind.Uri,
      data: "https://www.google.com",
      allowOverlay: true
    };
  }

  if (col === 6) {
    return {
      kind: _dataGridTypes.GridCellKind.Boolean,
      data: row % 3 === 0 || row % 5 === 0,
      showUnchecked: true,
      allowEdit: false,
      allowOverlay: false
    };
  }

  if (col === 7) {
    return {
      kind: _dataGridTypes.GridCellKind.Text,
      // RTL test
      displayData: "\u05D4\u05E8\u05E4\u05EA\u05E7\u05D4 \u05D7\u05D3\u05E9\u05D4",
      data: "\u05D4\u05E8\u05E4\u05EA\u05E7\u05D4 \u05D7\u05D3\u05E9\u05D4",
      allowOverlay: true
    };
  }

  if (col === 8) {
    return {
      kind: _dataGridTypes.GridCellKind.Drilldown,
      data: [{
        text: "Test",
        img: "https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"
      }, {
        text: "No Image"
      }],
      allowOverlay: false
    };
  }

  return {
    kind: _dataGridTypes.GridCellKind.Text,
    displayData: "".concat(col, ", ").concat(row, " \uD83E\uDD9D"),
    data: "".concat(col, ", ").concat(row, " \uD83E\uDD9D"),
    allowOverlay: true
  };
}

function getDummyCols() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (i) {
    return {
      title: i.toString() + " is the longest header in the world",
      width: 120 + i % 4 * 10,
      icon: "headerString",
      hasMenu: true
    };
  });
}

function Simplenotest() {
  var _useState = (0, _addons.useState)(getDummyCols),
      _useState2 = _slicedToArray(_useState, 2),
      cols = _useState2[0],
      setColumns = _useState2[1];

  var _useState3 = (0, _addons.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      x = _useState4[0],
      setX = _useState4[1];

  var _useState5 = (0, _addons.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      y = _useState6[0],
      setY = _useState6[1];

  var onVisibleRegionChanged = (0, _addons.useCallback)(function (range) {
    setX(range.x);
    setY(range.y);
  }, []);
  var onColumnResized = (0, _addons.useCallback)(function (col, newSize) {
    var index = cols.indexOf(col);

    var newCols = _toConsumableArray(cols);

    newCols[index] = _objectSpread(_objectSpread({}, newCols[index]), {}, {
      width: newSize
    });
    setColumns(newCols);
  }, [cols]);
  var getCellsForSelection = (0, _addons.useCallback)(function (selection) {
    var cells = [];

    for (var yCoord = selection.y; yCoord < selection.y + selection.height; yCoord++) {
      var rowCells = [];

      for (var xCoord = selection.x; xCoord < selection.x + selection.width; xCoord++) {
        rowCells.push(getDummyData([xCoord, yCoord]));
      }

      cells.push(rowCells);
    }

    return cells;
  }, []);
  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    cellXOffset: x,
    cellYOffset: y,
    getCellContent: getDummyData,
    getCellsForSelection: getCellsForSelection,
    columns: cols,
    rows: 1000,
    allowResize: true,
    onVisibleRegionChanged: onVisibleRegionChanged,
    onColumnResized: onColumnResized
  });
}

var columns = [{
  title: "Number",
  width: 100,
  icon: "headerArray",
  overlayIcon: "rowOwnerOverlay"
}, {
  title: "Square",
  width: 100
}];

function getData(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      col = _ref4[0],
      row = _ref4[1];

  var n = Math.pow(row, col + 1);
  return {
    kind: _dataGridTypes.GridCellKind.Number,
    data: n,
    displayData: n.toString(),
    allowOverlay: false
  };
}

function Minimal() {
  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
}

function Smooth() {
  var _useState7 = (0, _addons.useState)(getDummyCols),
      _useState8 = _slicedToArray(_useState7, 2),
      cols = _useState8[0],
      setCols = _useState8[1];

  var onColumnResized = (0, _addons.useCallback)(function (column, newSize) {
    var index = cols.indexOf(column);

    if (index !== -1) {
      var newCol = _objectSpread(_objectSpread({}, column), {}, {
        width: newSize
      });

      var newCols = _toConsumableArray(cols);

      newCols.splice(index, 1, newCol);
      setCols(newCols);
    }
  }, [cols]);
  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    getCellContent: getDummyData,
    allowResize: true,
    onColumnResized: onColumnResized,
    columns: cols,
    rows: 1000,
    smoothScrollY: true,
    smoothScrollX: true
  });
}

function ManualControl() {
  var _useState9 = (0, _addons.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      gridSelection = _useState10[0],
      setGridSelection = _useState10[1];

  var cb = function cb(newVal) {
    var _newVal$cell$;

    if (((_newVal$cell$ = newVal === null || newVal === void 0 ? void 0 : newVal.cell[0]) !== null && _newVal$cell$ !== void 0 ? _newVal$cell$ : 0) % 2 === 0) {
      setGridSelection(newVal);
    }
  };

  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    gridSelection: gridSelection,
    onGridSelectionChange: cb,
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
}

function Draggable() {
  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    isDraggable: true,
    onDragStart: function onDragStart(args) {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
}

function IdealSize() {
  // trying to be 500x500
  var cols = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];
  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    isDraggable: true,
    onDragStart: function onDragStart(args) {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: cols,
    smoothScrollX: true,
    smoothScrollY: true,
    rowHeight: 50,
    headerHeight: 50,
    showTrailingBlankRow: false,
    rowMarkers: false,
    rows: 9
  });
}

function AdjustableColumns() {
  var columnCount = (0, _addonKnobs.number)("Columns", 2, {
    min: 2,
    max: 50
  }); // trying to be 500x500

  var cols = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];

  for (var i = 2; i < columnCount; i++) {
    cols.push({
      title: "Foo",
      width: 250
    });
  }

  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    isDraggable: true,
    onDragStart: function onDragStart(args) {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: cols,
    smoothScrollX: true,
    smoothScrollY: true,
    rowHeight: 50,
    headerHeight: 50,
    showTrailingBlankRow: false,
    rowMarkers: false,
    rows: 9
  });
}

function RowSelectionStateLivesOutside() {
  var _useState11 = (0, _addons.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      selected_rows = _useState12[0],
      setSelectedRows = _useState12[1];

  var cb = function cb(newRows) {
    if (newRows != undefined) {
      setSelectedRows(newRows);
    }
  };

  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    selectedRows: selected_rows,
    onSelectedRowsChange: cb,
    isDraggable: true,
    onDragStart: function onDragStart(args) {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
}

function ColSelectionStateLivesOutside() {
  var _useState13 = (0, _addons.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      selected_cols = _useState14[0],
      setSelectedCols = _useState14[1];

  var cb = function cb(newRows) {
    if (newRows != undefined) {
      setSelectedCols(newRows);
    }
  };

  return /*#__PURE__*/React.createElement(_dataEditor.default, {
    selectedColumns: selected_cols,
    onSelectedColumnsChange: cb,
    isDraggable: true,
    onDragStart: function onDragStart(args) {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
}