"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _support = require("../common/support");

var _fp = require("lodash/fp");

var _dataGridOverlayEditor = _interopRequireDefault(require("../data-grid-overlay-editor/data-grid-overlay-editor"));

var _dataGridTypes = require("../data-grid/data-grid-types");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _dataGridLib = require("../data-grid/data-grid-lib");

var _dataGridSearch = _interopRequireDefault(require("../data-grid-search/data-grid-search"));

var _browserDetect = require("../common/browser-detect");

var _styledComponents = require("styled-components");

var _styles = require("../common/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DataEditor = function DataEditor(p) {
  var _p$rowMarkers, _p$showTrailingBlankR, _p$rowHeight, _p$headerHeight, _p$rowMarkerWidth;

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      gridSelectionInner = _React$useState2[0],
      setGridSelectionInner = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedColumnsInner = _React$useState4[0],
      setSelectedColumnsInner = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      selectedRowsInner = _React$useState6[0],
      setSelectedRowsInner = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      hoveredCell = _React$useState8[0],
      setHoveredCell = _React$useState8[1];

  var _React$useState9 = React.useState(),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      overlay = _React$useState10[0],
      setOverlay = _React$useState10[1];

  var canvasRef = React.useRef(null);
  var mouseState = React.useRef();
  var scrollRef = React.useRef(null);
  var scrollTimer = React.useRef();
  var lastSent = React.useRef();
  var imageEditorOverride = p.imageEditorOverride;
  var markdownDivCreateNode = p.markdownDivCreateNode;
  var rowMarkers = (_p$rowMarkers = p.rowMarkers) !== null && _p$rowMarkers !== void 0 ? _p$rowMarkers : true;
  var showTrailingBlankRow = (_p$showTrailingBlankR = p.showTrailingBlankRow) !== null && _p$showTrailingBlankR !== void 0 ? _p$showTrailingBlankR : true;
  var rowMarkerOffset = rowMarkers ? 1 : 0;
  var rowHeight = (_p$rowHeight = p.rowHeight) !== null && _p$rowHeight !== void 0 ? _p$rowHeight : 34;
  var headerHeight = (_p$headerHeight = p.headerHeight) !== null && _p$headerHeight !== void 0 ? _p$headerHeight : 36;
  var rowMarkerWidth = (_p$rowMarkerWidth = p.rowMarkerWidth) !== null && _p$rowMarkerWidth !== void 0 ? _p$rowMarkerWidth : 50;
  var isDraggable = p.isDraggable,
      getCellsForSelection = p.getCellsForSelection;

  var xOff = p.cellXOffset,
      yOff = p.cellYOffset,
      columns = p.columns,
      rows = p.rows,
      getCellContent = p.getCellContent,
      onCellClicked = p.onCellClicked,
      onCellEdited = p.onCellEdited,
      onRowAppended = p.onRowAppended,
      onColumnMoved = p.onColumnMoved,
      onDeleteRows = p.onDeleteRows,
      onDragStart = p.onDragStart,
      onHeaderMenuClick = p.onHeaderMenuClick,
      onVisibleRegionChanged = p.onVisibleRegionChanged,
      selectedColumnsOuter = p.selectedColumns,
      setSelectedColumnsOuter = p.onSelectedColumnsChange,
      selectedRowsOuter = p.selectedRows,
      onRowSelected = p.onRowSelected,
      onRowDeselected = p.onRowDeselected,
      setSelectedRowsOuter = p.onSelectedRowsChange,
      gridSelectionOuter = p.gridSelection,
      onGridSelectionChange = p.onGridSelectionChange,
      rest = _objectWithoutProperties(p, ["cellXOffset", "cellYOffset", "columns", "rows", "getCellContent", "onCellClicked", "onCellEdited", "onRowAppended", "onColumnMoved", "onDeleteRows", "onDragStart", "onHeaderMenuClick", "onVisibleRegionChanged", "selectedColumns", "onSelectedColumnsChange", "selectedRows", "onRowSelected", "onRowDeselected", "onSelectedRowsChange", "gridSelection", "onGridSelectionChange"]);

  var gridSelection = gridSelectionOuter !== null && gridSelectionOuter !== void 0 ? gridSelectionOuter : gridSelectionInner;
  var setGridSelection = onGridSelectionChange !== null && onGridSelectionChange !== void 0 ? onGridSelectionChange : setGridSelectionInner;
  var selectedRows = selectedRowsOuter !== null && selectedRowsOuter !== void 0 ? selectedRowsOuter : selectedRowsInner;
  var setSelectedRows = setSelectedRowsOuter !== null && setSelectedRowsOuter !== void 0 ? setSelectedRowsOuter : setSelectedRowsInner;
  var selectedColumns = selectedColumnsOuter !== null && selectedColumnsOuter !== void 0 ? selectedColumnsOuter : selectedColumnsInner;
  var setSelectedColumns = setSelectedColumnsOuter !== null && setSelectedColumnsOuter !== void 0 ? setSelectedColumnsOuter : setSelectedColumnsInner;
  var hoveredFirstRow = (hoveredCell === null || hoveredCell === void 0 ? void 0 : hoveredCell[0]) === 0 ? hoveredCell === null || hoveredCell === void 0 ? void 0 : hoveredCell[1] : undefined;
  var gridRef = React.useRef(null);
  var focus = React.useCallback(function () {
    window.requestAnimationFrame(function () {
      var _gridRef$current;

      (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.focus();
    });
  }, []);
  var mangledRows = showTrailingBlankRow ? rows + 1 : rows;
  var mangledOnCellEdited = React.useCallback(function (cell, newValue) {
    var _cell = _slicedToArray(cell, 2),
        row = _cell[1];

    if (showTrailingBlankRow && row === mangledRows - 1) {
      onRowAppended === null || onRowAppended === void 0 ? void 0 : onRowAppended(cell, newValue);
    } else {
      onCellEdited === null || onCellEdited === void 0 ? void 0 : onCellEdited(cell, newValue);
    }
  }, [onRowAppended, onCellEdited, mangledRows, showTrailingBlankRow]);
  var mangledCols = React.useMemo(function () {
    if (!rowMarkers) return columns;
    return [{
      title: "",
      width: rowMarkerWidth,
      icon: undefined,
      hasMenu: false,
      style: "normal"
    }].concat(_toConsumableArray(columns));
  }, [columns, rowMarkerWidth, rowMarkers]);
  var getMangedCellContent = React.useCallback(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        col = _ref2[0],
        row = _ref2[1];

    if (col === 0 && rowMarkers) {
      return {
        kind: _dataGridTypes.GridCellKind.Boolean,
        data: selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.includes(row),
        showUnchecked: hoveredFirstRow === row,
        allowOverlay: false,
        allowEdit: false
      };
    } else if (showTrailingBlankRow && row === mangledRows - 1) {
      //If the grid is empty, we will return text
      if (row === 0) {
        return {
          kind: _dataGridTypes.GridCellKind.Text,
          displayData: "",
          data: "",
          allowOverlay: true
        };
      } //Base the dataType on the previous row.


      var previousRow = getCellContent([col - rowMarkerOffset, row - 1]);
      return (0, _dataGridLib.makeEditCell)(previousRow);
    } else {
      return getCellContent([col - rowMarkerOffset, row]);
    }
  }, [rowMarkers, showTrailingBlankRow, mangledRows, selectedRows, hoveredFirstRow, getCellContent, rowMarkerOffset]);
  var onMouseDown = React.useCallback(function (args) {
    mouseState.current = {
      previousSelection: gridSelection
    };

    if (args.kind === "cell") {
      var _args$location = _slicedToArray(args.location, 2),
          col = _args$location[0],
          _row = _args$location[1];

      if (col === 0 && rowMarkers) {
        setGridSelection(undefined);
        setOverlay(undefined);
        focus();
        setSelectedColumns([]);

        var _index = selectedRows.indexOf(_row);

        if (_index !== -1) {
          if (onRowDeselected) {
            onRowDeselected(_row);
          }

          setSelectedRows((0, _support.removeArrayItem)(selectedRows, _index));
        } else {
          if (onRowSelected) {
            onRowSelected(_row);
          }

          setSelectedRows([].concat(_toConsumableArray(selectedRows), [_row]));
        }
      } else {
        if ((gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.cell[0]) !== col || gridSelection.cell[1] !== _row) {
          if (args.shiftKey && gridSelection !== undefined) {
            var _gridSelection$cell = _slicedToArray(gridSelection.cell, 2),
                sCol = _gridSelection$cell[0],
                sRow = _gridSelection$cell[1];

            var left = Math.min(col, sCol);
            var right = Math.max(col, sCol);
            var top = Math.min(_row, sRow);
            var bottom = Math.max(_row, sRow);
            setGridSelection(_objectSpread(_objectSpread({}, gridSelection), {}, {
              range: {
                x: left,
                y: top,
                width: right - left + 1,
                height: bottom - top + 1
              }
            }));
          } else {
            setGridSelection({
              cell: [col, _row],
              range: {
                x: col,
                y: _row,
                width: 1,
                height: 1
              }
            });
            setSelectedColumns([]);
            setSelectedRows([]);
            setOverlay(undefined);
            focus();
          }
        }
      }
    } else if (args.kind === "header") {
      var _args$location2 = _slicedToArray(args.location, 1),
          _col = _args$location2[0];

      setSelectedColumns([_col]);
      setGridSelection(undefined);
      setOverlay(undefined);
      focus();
      setSelectedRows([]);
    } else if (args.kind === "out-of-bounds") {
      setGridSelection(undefined);
      setOverlay(undefined);
      focus();
      setSelectedColumns([]);
      setSelectedRows([]);
    }
  }, [gridSelection, rowMarkers, setGridSelection, focus, setSelectedColumns, selectedRows, setSelectedRows]);
  var reselect = React.useCallback(function (bounds, initialValue) {
    if (gridSelection === undefined) return;

    var _gridSelection$cell2 = _slicedToArray(gridSelection.cell, 2),
        col = _gridSelection$cell2[0],
        row = _gridSelection$cell2[1];

    var c = getMangedCellContent([col, row]);

    if (c.kind !== _dataGridTypes.GridCellKind.Boolean && c.allowOverlay) {
      var _content = c;

      if (initialValue !== undefined) {
        switch (_content.kind) {
          case _dataGridTypes.GridCellKind.Text:
            _content = _objectSpread(_objectSpread({}, _content), {}, {
              data: initialValue
            });
            break;

          case _dataGridTypes.GridCellKind.Number:
            _content = _objectSpread(_objectSpread({}, _content), {}, {
              data: (0, _support.maybe)(function () {
                return Number.parseFloat(initialValue);
              }, 0)
            });
            break;

          case _dataGridTypes.GridCellKind.Markdown:
          case _dataGridTypes.GridCellKind.Uri:
            _content = _objectSpread(_objectSpread({}, _content), {}, {
              data: initialValue
            });
            break;
        }
      }

      setOverlay({
        target: bounds,
        content: _content,
        cell: [col, row],
        forceEditMode: initialValue !== undefined
      });
    } else if (c.kind === _dataGridTypes.GridCellKind.Boolean) {
      mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited([col - rowMarkerOffset, row], _objectSpread(_objectSpread({}, c), {}, {
        data: !c.data
      }));
    } else {
      onCellClicked === null || onCellClicked === void 0 ? void 0 : onCellClicked([col - rowMarkerOffset, row]);
    }
  }, [getMangedCellContent, mangledOnCellEdited, onCellClicked, rowMarkerOffset, gridSelection]);
  var onMouseUp = React.useCallback(function (args) {
    var _mouse$previousSelect;

    var mouse = mouseState.current;
    mouseState.current = undefined;

    if (scrollTimer.current !== undefined) {
      window.clearInterval(scrollTimer.current);
    }

    if (args.kind !== "cell" || gridSelection === undefined || (mouse === null || mouse === void 0 ? void 0 : (_mouse$previousSelect = mouse.previousSelection) === null || _mouse$previousSelect === void 0 ? void 0 : _mouse$previousSelect.cell) === undefined) return;

    var _args$location3 = _slicedToArray(args.location, 2),
        col = _args$location3[0],
        row = _args$location3[1];

    var _gridSelection$cell3 = _slicedToArray(gridSelection.cell, 2),
        selectedCol = _gridSelection$cell3[0],
        selectedRow = _gridSelection$cell3[1];

    var _mouse$previousSelect2 = _slicedToArray(mouse.previousSelection.cell, 2),
        prevCol = _mouse$previousSelect2[0],
        prevRow = _mouse$previousSelect2[1];

    if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
      reselect(args.bounds);
    }
  }, [gridSelection, reselect]);
  var onHeaderMenuClickInner = React.useCallback(function (col, screenPosition) {
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 ? void 0 : onHeaderMenuClick(col - rowMarkerOffset, screenPosition);
  }, [onHeaderMenuClick, rowMarkerOffset]);

  var _React$useState11 = React.useState({
    x: 0,
    y: 0,
    width: 1,
    height: 1
  }),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      visibileRegion = _React$useState12[0],
      setVisibleRegion = _React$useState12[1];

  var cellXOffset = xOff !== null && xOff !== void 0 ? xOff : visibileRegion.x;
  var cellYOffset = yOff !== null && yOff !== void 0 ? yOff : visibileRegion.y;
  var onVisibleRegionChangedImpl = React.useCallback(function (visibleRegion, tx, ty) {
    var newRegion = _objectSpread(_objectSpread({}, visibleRegion), {}, {
      x: visibleRegion.x - rowMarkerOffset,
      height: showTrailingBlankRow && visibleRegion.y + visibleRegion.height >= rows ? visibleRegion.height - 1 : visibleRegion.height,
      tx: tx,
      ty: ty
    });

    setVisibleRegion(newRegion);
    onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 ? void 0 : onVisibleRegionChanged(newRegion, tx, ty);
  }, [onVisibleRegionChanged, rowMarkerOffset, rows, showTrailingBlankRow]);
  var onColumnMovedImpl = React.useCallback(function (startIndex, endIndex) {
    onColumnMoved === null || onColumnMoved === void 0 ? void 0 : onColumnMoved(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
    setSelectedColumns([endIndex]);
  }, [onColumnMoved, rowMarkerOffset, setSelectedColumns]);
  var onDragStartImpl = React.useCallback(function (args) {
    onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(_objectSpread(_objectSpread({}, args), {}, {
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    }));
  }, [onDragStart, rowMarkerOffset]);
  var onItemHovered = React.useCallback(function (args) {
    if (args.kind === "cell") {
      setHoveredCell(args.location);
    } else if (args.kind === "out-of-bounds") {
      setHoveredCell(undefined);
    }

    if (mouseState.current !== undefined && gridSelection !== undefined && !isDraggable) {
      var _gridSelection$cell4 = _slicedToArray(gridSelection.cell, 2),
          selectedCol = _gridSelection$cell4[0],
          selectedRow = _gridSelection$cell4[1]; // eslint-disable-next-line prefer-const


      var _args$location4 = _slicedToArray(args.location, 2),
          col = _args$location4[0],
          _row2 = _args$location4[1];

      if (col === 0 && rowMarkers) {
        col = 1;
      }

      var deltaX = col - selectedCol;
      var deltaY = (_row2 !== null && _row2 !== void 0 ? _row2 : 0) - selectedRow;
      var newRange = {
        x: deltaX >= 0 ? selectedCol : col,
        y: deltaY >= 0 ? selectedRow : _row2 !== null && _row2 !== void 0 ? _row2 : 0,
        width: Math.abs(deltaX) + 1,
        height: Math.abs(deltaY) + 1
      };
      setGridSelection(_objectSpread(_objectSpread({}, gridSelection), {}, {
        range: newRange
      }));

      if (args.kind === "out-of-bounds" && scrollRef.current !== null) {
        var _args$direction = _slicedToArray(args.direction, 2),
            horizontal = _args$direction[0],
            vertical = _args$direction[1];

        var scrollX = 0;
        var scrollY = 0;

        if (horizontal === -1) {
          scrollX = columns[columns.length - 1].width;
        } else if (horizontal === 1) {
          scrollX = -columns[0].width;
        }

        if (vertical !== 0) {
          scrollY = rowHeight * vertical;
        }

        if (scrollTimer.current !== undefined) {
          window.clearInterval(scrollTimer.current);
        }

        scrollTimer.current = window.setInterval(function () {
          var _scrollRef$current;

          (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.scrollBy(-100 * horizontal, scrollY);
        }, 200);
        scrollRef.current.scrollBy(scrollX, scrollY);
      } else {
        if (scrollTimer.current !== undefined) {
          window.clearInterval(scrollTimer.current);
        }
      }
    }
  }, [gridSelection, isDraggable, rowMarkers, setGridSelection, columns, rowHeight]);
  var copyToClipboard = React.useCallback(function (cells) {
    function escape(str) {
      if (/\n|"/.test(str)) {
        str = "\"".concat(str.replace("\"", "\"\""), "\"");
      }

      return str;
    }

    var formatCell = function formatCell(cell) {
      switch (cell.kind) {
        case _dataGridTypes.GridCellKind.Text:
        case _dataGridTypes.GridCellKind.Number:
          return escape(cell.displayData);

        case _dataGridTypes.GridCellKind.Markdown:
        case _dataGridTypes.GridCellKind.RowID:
        case _dataGridTypes.GridCellKind.Uri:
          return escape(cell.data);

        case _dataGridTypes.GridCellKind.Image:
        case _dataGridTypes.GridCellKind.Bubble:
          return cell.data.reduce(function (pv, cv) {
            return "".concat(escape(pv), ",").concat(escape(cv));
          });

        case _dataGridTypes.GridCellKind.Boolean:
          return cell.data ? "TRUE" : "FALSE";

        case _dataGridTypes.GridCellKind.Loading:
          return "#LOADING";

        case _dataGridTypes.GridCellKind.Protected:
          return "************";

        case _dataGridTypes.GridCellKind.Drilldown:
          return cell.data.map(function (i) {
            return i.text;
          }).reduce(function (pv, cv) {
            return "".concat(escape(pv), ",").concat(escape(cv));
          });

        default:
          (0, _support.assertNever)(cell);
      }
    };

    var str = cells.map(function (row) {
      return row.map(formatCell).join("\t");
    }).join("\n");
    (0, _copyToClipboard.default)(str, {
      format: "text/plain"
    });
  }, []);
  var adjustSelection = React.useCallback(function (direction) {
    var _oldRange$x, _oldRange$y, _oldRange$width, _oldRange$height;

    if (gridSelection === undefined) return;

    var _direction = _slicedToArray(direction, 2),
        x = _direction[0],
        y = _direction[1];

    var _gridSelection$cell5 = _slicedToArray(gridSelection.cell, 2),
        col = _gridSelection$cell5[0],
        row = _gridSelection$cell5[1];

    var oldRange = gridSelection.range;
    var left = (_oldRange$x = oldRange === null || oldRange === void 0 ? void 0 : oldRange.x) !== null && _oldRange$x !== void 0 ? _oldRange$x : col;
    var top = (_oldRange$y = oldRange === null || oldRange === void 0 ? void 0 : oldRange.y) !== null && _oldRange$y !== void 0 ? _oldRange$y : row;
    var width = (_oldRange$width = oldRange === null || oldRange === void 0 ? void 0 : oldRange.width) !== null && _oldRange$width !== void 0 ? _oldRange$width : 1;
    var height = (_oldRange$height = oldRange === null || oldRange === void 0 ? void 0 : oldRange.height) !== null && _oldRange$height !== void 0 ? _oldRange$height : 1;
    var topDiff = top - row;
    var leftDiff = left - col;
    var isTop = topDiff === 0;
    if (y < 0 && height === 1) isTop = false;
    var heightDiff = isTop ? y : y * -1;
    var isLeft = leftDiff === 0;
    if (x < 0 && width === 1) isLeft = false;
    var widthDiff = isLeft ? x : x * -1;

    if (!isTop) {
      top -= heightDiff;
      height = Math.abs(top - row) + 1;
    } else {
      var maxHeight = rows - top;
      height += heightDiff;
      height = Math.min(maxHeight, height);
    }

    if (!isLeft) {
      left -= widthDiff; //Don't let it select the marker column

      left = Math.max(rowMarkerOffset, left);
      width = Math.abs(left - col) + 1;
    } else {
      width += widthDiff;
    }

    setGridSelection(_objectSpread(_objectSpread({}, gridSelection), {}, {
      range: {
        x: left,
        y: top,
        width: width,
        height: height
      }
    }));
  }, [gridSelection, rowMarkerOffset, rows, setGridSelection]);
  var updateSelectedCell = React.useCallback(function (col, row) {
    col = (0, _fp.clamp)(rowMarkerOffset, columns.length, col);
    row = (0, _fp.clamp)(0, mangledRows - 1, row);
    if (col === (gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.cell[0]) && row === (gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.cell[1])) return false;
    setGridSelection({
      cell: [col, row],
      range: {
        x: col,
        y: row,
        width: 1,
        height: 1
      }
    });

    if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
      lastSent.current = undefined;
    }

    if (scrollRef.current !== null) {
      var _scrollRef$current2 = scrollRef.current,
          clientWidth = _scrollRef$current2.clientWidth,
          clientHeight = _scrollRef$current2.clientHeight;

      var maxXScrollToCol = function maxXScrollToCol(index) {
        if (index <= 1) return 0;
        var widths = mangledCols.slice(undefined, index - 1).map(function (c) {
          return c.width;
        });
        var total = widths.reduce(function (pv, cv) {
          return pv + cv;
        });
        return total + 1;
      };

      var minXScrollToCol = function minXScrollToCol(index) {
        // if (rowMarkers) index--;
        var maxX = maxXScrollToCol(index);
        var availableSpace = clientWidth - (rowMarkers ? rowMarkerWidth : 0) - mangledCols[index].width;
        var offset = 0;

        for (var i = index - 1; i >= 0; i--) {
          if (availableSpace - (offset + mangledCols[i].width) < 0) break;
          offset += mangledCols[i].width;
        }

        return maxX - offset;
      };

      var visibleFullColumns = 0;
      var t = rowMarkers ? rowMarkerWidth : 0;

      for (var c = cellYOffset; c < columns.length; c++) {
        if (t + columns[c].width > clientWidth) break;
        visibleFullColumns++;
        t += columns[c].width;
      }

      var visible = {
        x: cellXOffset + 1,
        y: cellYOffset,
        width: visibleFullColumns,
        height: Math.ceil((clientHeight - headerHeight) / rowHeight)
      };

      if (row >= visible.y + visible.height - 1) {
        var delta = row - (visible.y + visible.height - 2);
        scrollRef.current.scrollBy(0, rowHeight * delta);
      } else if (row < visible.y) {
        var _delta = visible.y - row;

        scrollRef.current.scrollBy(0, -(rowHeight * _delta));
      } else if (col >= visible.x + visible.width) {
        scrollRef.current.scrollLeft = minXScrollToCol(col); // scrollRef.current.scrollBy(columns[1].width, 0);
      } else if (col < visible.x) {
        scrollRef.current.scrollLeft = maxXScrollToCol(col);
      }
    }

    return true;
  }, [rowMarkerOffset, columns, mangledRows, gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.cell, setGridSelection, rowMarkers, rowMarkerWidth, cellXOffset, cellYOffset, headerHeight, rowHeight, mangledCols]);
  var onFinishEditing = React.useCallback(function (newValue, movement) {
    if (gridSelection !== undefined && newValue !== undefined) {
      // Fixme, this cast is dangerous
      mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited([gridSelection.cell[0] - rowMarkerOffset, gridSelection.cell[1]], newValue);
    }

    setOverlay(undefined);
    focus();

    var _movement = _slicedToArray(movement, 2),
        movX = _movement[0],
        movY = _movement[1];

    if (gridSelection !== undefined && (movX !== 0 || movY !== 0)) {
      updateSelectedCell(gridSelection.cell[0] + movX, gridSelection.cell[1] + movY);
    }
  }, [gridSelection, focus, mangledOnCellEdited, rowMarkerOffset, updateSelectedCell]);
  var onCellFocused = React.useCallback(function (cell) {
    setGridSelection({
      cell: cell,
      range: {
        x: cell[0],
        y: cell[1],
        width: 1,
        height: 1
      }
    });
    setSelectedRows([]);
  }, [setGridSelection, setSelectedRows]);
  var onKeyDown = React.useCallback(function (event) {
    var fn = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var shiftKey, isDeleteKey, isCopyKey, _gridSelection$cell6, _col2, _row3, cellValue, cells, _gridSelection$cell7, col, row, text, _cellValue, _cellValue2, del, _cell2, key, moved;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shiftKey = event.shiftKey;
                isDeleteKey = event.key === "Delete" || _browserDetect.browserIsOSX.value && event.key === "Backspace";
                isCopyKey = event.key === "c" && (event.metaKey || event.ctrlKey);

                if (!(event.key === "Escape")) {
                  _context.next = 8;
                  break;
                }

                setGridSelection(undefined);
                setSelectedRows([]);
                setSelectedColumns([]);
                return _context.abrupt("return");

              case 8:
                if (!(isDeleteKey && selectedRows.length !== 0 && gridSelection === undefined)) {
                  _context.next = 13;
                  break;
                }

                focus();
                onDeleteRows === null || onDeleteRows === void 0 ? void 0 : onDeleteRows(selectedRows);
                setSelectedRows([]);
                return _context.abrupt("return");

              case 13:
                if (isCopyKey && getCellsForSelection !== undefined) {
                  if (gridSelection !== undefined) {
                    _gridSelection$cell6 = _slicedToArray(gridSelection.cell, 2), _col2 = _gridSelection$cell6[0], _row3 = _gridSelection$cell6[1];

                    if (gridSelection.range !== undefined && getCellsForSelection !== undefined) {
                      copyToClipboard(getCellsForSelection(_objectSpread(_objectSpread({}, gridSelection.range), {}, {
                        x: gridSelection.range.x - rowMarkerOffset
                      })));
                    } else {
                      cellValue = getCellContent([_col2 - rowMarkerOffset, _row3]);
                      copyToClipboard([[cellValue]]);
                    }
                  } else if (selectedRows.length > 0) {
                    cells = selectedRows.map(function (rowIndex) {
                      return getCellsForSelection({
                        x: 0,
                        y: rowIndex,
                        width: columns.length,
                        height: 1
                      })[0];
                    });
                    copyToClipboard(cells);
                  } else if (selectedColumns.length === 1) {
                    copyToClipboard(getCellsForSelection({
                      x: selectedColumns[0] - rowMarkerOffset,
                      y: 0,
                      width: 1,
                      height: rows
                    }));
                  }
                }

                if (!(gridSelection === undefined)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return");

              case 16:
                _gridSelection$cell7 = _slicedToArray(gridSelection.cell, 2), col = _gridSelection$cell7[0], row = _gridSelection$cell7[1];

                if (!(event.key === "Enter" && event.bounds !== undefined)) {
                  _context.next = 22;
                  break;
                }

                reselect(event.bounds);
                event.cancel();
                _context.next = 87;
                break;

              case 22:
                if (!(event.key === "v" && (event.metaKey || event.ctrlKey))) {
                  _context.next = 43;
                  break;
                }

                _context.prev = 23;
                _context.next = 26;
                return navigator.clipboard.readText();

              case 26:
                text = _context.sent;
                _cellValue = getCellContent([col - rowMarkerOffset, row]);

                if ((0, _dataGridTypes.isEditableGridCell)(_cellValue)) {
                  _context.next = 30;
                  break;
                }

                return _context.abrupt("return");

              case 30:
                _context.t0 = _cellValue.kind;
                _context.next = _context.t0 === _dataGridTypes.GridCellKind.Text ? 33 : _context.t0 === _dataGridTypes.GridCellKind.Markdown ? 35 : _context.t0 === _dataGridTypes.GridCellKind.Uri ? 35 : 37;
                break;

              case 33:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited([col - rowMarkerOffset, row], _objectSpread(_objectSpread({}, _cellValue), {}, {
                  data: text
                }));
                return _context.abrupt("break", 37);

              case 35:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited([col - rowMarkerOffset, row], _objectSpread(_objectSpread({}, _cellValue), {}, {
                  data: text
                }));
                return _context.abrupt("break", 37);

              case 37:
                _context.next = 41;
                break;

              case 39:
                _context.prev = 39;
                _context.t1 = _context["catch"](23);

              case 41:
                _context.next = 87;
                break;

              case 43:
                if (!(event.key === "ArrowDown")) {
                  _context.next = 47;
                  break;
                }

                if (shiftKey) {
                  adjustSelection([0, 1]);
                } else {
                  row++;
                }

                _context.next = 87;
                break;

              case 47:
                if (!(event.key === "ArrowUp")) {
                  _context.next = 51;
                  break;
                }

                if (shiftKey) {
                  adjustSelection([0, -1]);
                } else {
                  row--;
                }

                _context.next = 87;
                break;

              case 51:
                if (!(event.key === "ArrowRight")) {
                  _context.next = 55;
                  break;
                }

                if (shiftKey) {
                  adjustSelection([1, 0]);
                } else {
                  col++;
                }

                _context.next = 87;
                break;

              case 55:
                if (!(event.key === "ArrowLeft")) {
                  _context.next = 59;
                  break;
                }

                if (shiftKey) {
                  adjustSelection([-1, 0]);
                } else {
                  col--;
                }

                _context.next = 87;
                break;

              case 59:
                if (!(event.key === "Tab")) {
                  _context.next = 63;
                  break;
                }

                if (shiftKey) {
                  col--;
                } else {
                  col++;
                }

                _context.next = 87;
                break;

              case 63:
                if (!isDeleteKey) {
                  _context.next = 86;
                  break;
                }

                _cellValue2 = getCellContent([col - rowMarkerOffset, row]);

                if (!((0, _dataGridTypes.isEditableGridCell)(_cellValue2) && _cellValue2.allowOverlay)) {
                  _context.next = 84;
                  break;
                }

                // FIXME: Add way to show confirm modal
                del = true;
                focus();
                _cell2 = [col - rowMarkerOffset, row];

                if (!del) {
                  _context.next = 84;
                  break;
                }

                _context.t2 = _cellValue2.kind;
                _context.next = _context.t2 === _dataGridTypes.GridCellKind.Text ? 73 : _context.t2 === _dataGridTypes.GridCellKind.Markdown ? 75 : _context.t2 === _dataGridTypes.GridCellKind.Uri ? 75 : _context.t2 === _dataGridTypes.GridCellKind.Image ? 77 : _context.t2 === _dataGridTypes.GridCellKind.Boolean ? 79 : _context.t2 === _dataGridTypes.GridCellKind.Number ? 81 : 83;
                break;

              case 73:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited(_cell2, _objectSpread(_objectSpread({}, _cellValue2), {}, {
                  data: ""
                }));
                return _context.abrupt("break", 84);

              case 75:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited(_cell2, _objectSpread(_objectSpread({}, _cellValue2), {}, {
                  data: ""
                }));
                return _context.abrupt("break", 84);

              case 77:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited(_cell2, _objectSpread(_objectSpread({}, _cellValue2), {}, {
                  data: []
                }));
                return _context.abrupt("break", 84);

              case 79:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited(_cell2, _objectSpread(_objectSpread({}, _cellValue2), {}, {
                  data: false
                }));
                return _context.abrupt("break", 84);

              case 81:
                mangledOnCellEdited === null || mangledOnCellEdited === void 0 ? void 0 : mangledOnCellEdited(_cell2, _objectSpread(_objectSpread({}, _cellValue2), {}, {
                  data: undefined
                }));
                return _context.abrupt("break", 84);

              case 83:
                (0, _support.assertNever)(_cellValue2);

              case 84:
                _context.next = 87;
                break;

              case 86:
                if (!event.metaKey && !event.ctrlKey && String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.bounds !== undefined) {
                  key = String.fromCharCode(event.keyCode);

                  if (!event.shiftKey) {
                    key = key.toLowerCase();
                  }

                  reselect(event.bounds, key);
                  event.cancel();
                }

              case 87:
                moved = updateSelectedCell(col, row);

                if (moved) {
                  event.cancel();
                }

              case 89:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[23, 39]]);
      }));

      return function fn() {
        return _ref3.apply(this, arguments);
      };
    }();

    (0, _support.dontAwait)(fn());
  }, [selectedRows, gridSelection, getCellsForSelection, updateSelectedCell, setGridSelection, setSelectedRows, setSelectedColumns, focus, onDeleteRows, selectedColumns, copyToClipboard, rowMarkerOffset, getCellContent, columns.length, rows, reselect, mangledOnCellEdited, adjustSelection]);
  var onSearchResultsChanged = React.useCallback(function (results, navIndex) {
    if (results.length === 0 || navIndex === -1) return;

    var _results$navIndex = _slicedToArray(results[navIndex], 2),
        col = _results$navIndex[0],
        row = _results$navIndex[1];

    if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
      return;
    }

    lastSent.current = [col, row];
    updateSelectedCell(col, row);
  }, [updateSelectedCell]);
  React.useEffect(function () {
    if (gridSelection === undefined) return;

    var _gridSelection$cell8 = _slicedToArray(gridSelection.cell, 2),
        col = _gridSelection$cell8[0],
        row = _gridSelection$cell8[1];

    updateSelectedCell(col, row);
  }, [mangledCols, rows, gridSelection, updateSelectedCell]);
  var theme = (0, _styledComponents.useTheme)();
  var mergedTheme = React.useMemo(function () {
    return _objectSpread(_objectSpread({}, (0, _styles.getBuilderTheme)()), theme);
  }, [theme]);
  return /*#__PURE__*/React.createElement(_styledComponents.ThemeProvider, {
    theme: mergedTheme
  }, /*#__PURE__*/React.createElement(_dataGridSearch.default, _extends({}, rest, {
    canvasRef: canvasRef,
    cellXOffset: (cellXOffset !== null && cellXOffset !== void 0 ? cellXOffset : visibileRegion.x) + rowMarkerOffset,
    cellYOffset: cellYOffset !== null && cellYOffset !== void 0 ? cellYOffset : visibileRegion.y,
    translateX: visibileRegion.tx,
    translateY: visibileRegion.ty,
    columns: mangledCols,
    rows: mangledRows,
    firstColSticky: rowMarkers,
    getCellContent: getMangedCellContent,
    headerHeight: headerHeight,
    onColumnMoved: onColumnMovedImpl,
    onDragStart: onDragStartImpl,
    onCellFocused: onCellFocused,
    onHeaderMenuClick: onHeaderMenuClickInner,
    onItemHovered: onItemHovered,
    onKeyDown: onKeyDown,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onVisibleRegionChanged: onVisibleRegionChangedImpl,
    rowHeight: rowHeight,
    scrollRef: scrollRef,
    selectedCell: gridSelection,
    selectedColumns: selectedColumns,
    selectedRows: selectedRows,
    onSearchResultsChanged: onSearchResultsChanged,
    searchColOffset: rowMarkerOffset,
    gridRef: gridRef
  })), overlay !== undefined && /*#__PURE__*/React.createElement(_dataGridOverlayEditor.default, _extends({}, overlay, {
    imageEditorOverride: imageEditorOverride,
    onFinishEditing: onFinishEditing,
    markdownDivCreateNode: markdownDivCreateNode
  })));
};

var _default = DataEditor;
exports.default = _default;