"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../common/utils");

var _dataGridTypes = require("../data-grid/data-grid-types");

var _scrollingDataGrid = _interopRequireDefault(require("../scrolling-data-grid/scrolling-data-grid"));

var _dataGridSearchStyle = require("./data-grid-search-style");

var _support = require("../common/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// icons
var UpArrow = function UpArrow() {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    className: "button-icon"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 244l144-144 144 144M256 120v292"
  }));
};

var DownArrow = function DownArrow() {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "button-icon",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 268l144 144 144-144M256 392V100"
  }));
};

var CloseX = function CloseX() {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "button-icon",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "32",
    d: "M368 368L144 144M368 144L144 368"
  }));
};

var targetSearchTimeMS = 10;

var DataGridSearch = function DataGridSearch(p) {
  var _searchStatus$rowsSea, _searchStatus$results, _searchStatus$results2;

  var onKeyDown = p.onKeyDown,
      getCellsForSelection = p.getCellsForSelection,
      onSearchResultsChanged = p.onSearchResultsChanged,
      searchColOffset = p.searchColOffset,
      rest = _objectWithoutProperties(p, ["onKeyDown", "getCellsForSelection", "onSearchResultsChanged", "searchColOffset"]);

  var canvasRef = p.canvasRef,
      cellYOffset = p.cellYOffset,
      rows = p.rows,
      columns = p.columns,
      getCellContent = p.getCellContent;

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      searchString = _React$useState2[0],
      setSearchString = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      showSearch = _React$useState4[0],
      setShowSearch = _React$useState4[1];

  var _React$useState5 = React.useState(),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      searchStatus = _React$useState6[0],
      setSearchStatus = _React$useState6[1];

  var searchStatusRef = React.useRef(searchStatus);
  searchStatusRef.current = searchStatus;
  var inputRef = React.useRef(null);
  var searchHandle = React.useRef();

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      searchResults = _React$useState8[0],
      setSearchResults = _React$useState8[1];

  var cancelSearch = React.useCallback(function () {
    if (searchHandle.current !== undefined) {
      window.cancelAnimationFrame(searchHandle.current);
      searchHandle.current = undefined;
    }
  }, []);
  var getCellsForSelectionMangled = React.useCallback(function (selection) {
    if (getCellsForSelection !== undefined) return getCellsForSelection(selection.range);
    if (selection.range === undefined) return [[getCellContent(selection.cell)]];
    var range = selection.range;
    var result = [];

    for (var row = range.y; row < range.y + range.height; row++) {
      var inner = [];

      for (var col = range.x; col < range.x + range.width; col++) {
        inner.push(getCellContent([col + searchColOffset, row]));
      }

      result.push(inner);
    }

    return result;
  }, [getCellContent, getCellsForSelection, searchColOffset]);
  var beginSearch = React.useCallback(function (str) {
    var regex = new RegExp(str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i");
    var startY = cellYOffset; // Lets assume we can do 10 rows at a time
    // This is usually very safe and limits the damage for bad
    // performing sheets.

    var searchStride = Math.min(10, rows);
    var rowsSearched = 0;
    setSearchStatus(undefined);
    setSearchResults([]);
    var runningResult = [];

    var tick = function tick() {
      var _searchStatusRef$curr, _searchStatusRef$curr2;

      var tStart = performance.now();
      var rowsLeft = rows - rowsSearched;
      var data = getCellsForSelectionMangled({
        cell: [0, 0],
        range: {
          x: 0,
          y: startY,
          width: columns.length - searchColOffset,
          height: Math.min(searchStride, rowsLeft, rows - startY)
        }
      });
      var added = false;
      data.forEach(function (d, row) {
        return d.forEach(function (cell, col) {
          var testString;

          switch (cell.kind) {
            case _dataGridTypes.GridCellKind.Text:
            case _dataGridTypes.GridCellKind.Number:
              testString = cell.displayData;
              break;

            case _dataGridTypes.GridCellKind.Uri:
            case _dataGridTypes.GridCellKind.Markdown:
              testString = cell.data;
              break;

            case _dataGridTypes.GridCellKind.Boolean:
              testString = cell.data.toString();
              break;

            case _dataGridTypes.GridCellKind.Image:
            case _dataGridTypes.GridCellKind.Bubble:
              // I know its lazy, but unless someone is actually
              // searching for the whale emoji, this is pretty side effect
              // free. And ya know... it's nice and easy to do...
              testString = cell.data.join("🐳");
              break;
          }

          if (testString !== undefined && regex.test(testString)) {
            runningResult.push([col + searchColOffset, row + startY]);
            added = true;
          }
        });
      });
      var tEnd = performance.now();

      if (added) {
        setSearchResults([].concat(runningResult));
      }

      rowsSearched += data.length;
      (0, _support.assert)(rowsSearched <= rows);
      var selectedIndex = (_searchStatusRef$curr = (_searchStatusRef$curr2 = searchStatusRef.current) === null || _searchStatusRef$curr2 === void 0 ? void 0 : _searchStatusRef$curr2.selectedIndex) !== null && _searchStatusRef$curr !== void 0 ? _searchStatusRef$curr : -1;
      setSearchStatus({
        results: runningResult.length,
        rowsSearched: rowsSearched,
        selectedIndex: selectedIndex
      });
      onSearchResultsChanged === null || onSearchResultsChanged === void 0 ? void 0 : onSearchResultsChanged(runningResult, selectedIndex);

      if (startY + searchStride >= rows) {
        startY = 0;
      } else {
        startY += searchStride;
      }

      var tElapsed = tEnd - tStart;
      var rounded = Math.max(tElapsed, 1);
      var scalar = targetSearchTimeMS / rounded;
      searchStride = Math.ceil(searchStride * scalar);

      if (rowsSearched < rows) {
        searchHandle.current = window.requestAnimationFrame(tick);
      }
    };

    cancelSearch();
    searchHandle.current = window.requestAnimationFrame(tick);
  }, [cancelSearch, cellYOffset, columns.length, getCellsForSelectionMangled, onSearchResultsChanged, rows, searchColOffset]);
  var cancelEvent = React.useCallback(function (ev) {
    ev.stopPropagation();
  }, []);
  var onKeyDownImpl = React.useCallback(function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "f") {
      if (!showSearch) {
        setShowSearch(true);
        setSearchString("");
      }

      setTimeout(function () {
        var _inputRef$current;

        return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
      }, 150);
      event.cancel();
    } else {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
    }
  }, [onKeyDown, showSearch]);
  (0, _utils.useEventListener)("keydown", React.useCallback(function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "f") {
      if (!showSearch) {
        setShowSearch(true);
        setSearchString("");
      }

      setTimeout(function () {
        var _inputRef$current2;

        return (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
      }, 150);
      event.stopPropagation();
      event.preventDefault();
    }
  }, [showSearch]), window, false, true);
  var onClose = React.useCallback(function () {
    var _canvasRef$current;

    setShowSearch(false);
    setSearchStatus(undefined);
    setSearchResults([]);
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 ? void 0 : onSearchResultsChanged([], -1);
    cancelSearch();
    canvasRef === null || canvasRef === void 0 ? void 0 : (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.focus();
  }, [cancelSearch, canvasRef, onSearchResultsChanged]);
  var onSearchChange = React.useCallback(function (event) {
    setSearchString(event.target.value);

    if (event.target.value === "") {
      setSearchStatus(undefined);
      setSearchResults([]);
      cancelSearch();
    } else {
      beginSearch(event.target.value);
    }
  }, [beginSearch, cancelSearch]);
  var onNext = React.useCallback(function (ev) {
    var _ev$stopPropagation;

    ev === null || ev === void 0 ? void 0 : (_ev$stopPropagation = ev.stopPropagation) === null || _ev$stopPropagation === void 0 ? void 0 : _ev$stopPropagation.call(ev);
    if (searchStatus === undefined) return;
    var newIndex = (searchStatus.selectedIndex + 1) % searchStatus.results;
    setSearchStatus(_objectSpread(_objectSpread({}, searchStatus), {}, {
      selectedIndex: newIndex
    }));
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 ? void 0 : onSearchResultsChanged(searchResults, newIndex);
  }, [searchStatus, onSearchResultsChanged, searchResults]);
  var onPrev = React.useCallback(function (ev) {
    var _ev$stopPropagation2;

    ev === null || ev === void 0 ? void 0 : (_ev$stopPropagation2 = ev.stopPropagation) === null || _ev$stopPropagation2 === void 0 ? void 0 : _ev$stopPropagation2.call(ev);
    if (searchStatus === undefined) return;
    var newIndex = (searchStatus.selectedIndex - 1) % searchStatus.results;
    if (newIndex < 0) newIndex += searchStatus.results;
    setSearchStatus(_objectSpread(_objectSpread({}, searchStatus), {}, {
      selectedIndex: newIndex
    }));
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 ? void 0 : onSearchResultsChanged(searchResults, newIndex);
  }, [onSearchResultsChanged, searchResults, searchStatus]);
  var onSearchKeyDown = React.useCallback(function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "f" || event.key === "Escape") {
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
  var rowsSearchedProgress = Math.floor(((_searchStatus$rowsSea = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.rowsSearched) !== null && _searchStatus$rowsSea !== void 0 ? _searchStatus$rowsSea : 0) / rows * 100);
  var progressStyle = React.useMemo(function () {
    return {
      width: "".concat(rowsSearchedProgress, "%")
    };
  }, [rowsSearchedProgress]); // cancel search if the component is unmounted

  React.useEffect(function () {
    return function () {
      cancelSearch();
    };
  }, [cancelSearch]);
  var resultString;

  if (searchStatus !== undefined) {
    resultString = "".concat(searchStatus.results, " result").concat(searchStatus.results !== 1 ? "s" : "");

    if (searchStatus.selectedIndex >= 0) {
      resultString = "".concat(searchStatus.selectedIndex + 1, " / ").concat(resultString);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_scrollingDataGrid.default, _extends({}, rest, {
    onKeyDown: onKeyDownImpl,
    prelightCells: searchResults
  })), /*#__PURE__*/React.createElement(_dataGridSearchStyle.SearchWrapper, {
    showSearch: showSearch,
    onMouseDown: cancelEvent,
    onMouseMove: cancelEvent,
    onMouseUp: cancelEvent,
    onClick: cancelEvent
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-bar-inner"
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    onChange: onSearchChange,
    value: searchString,
    onKeyDownCapture: onSearchKeyDown
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onPrev,
    disabled: ((_searchStatus$results = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results !== void 0 ? _searchStatus$results : 0) === 0
  }, /*#__PURE__*/React.createElement(UpArrow, null)), /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    disabled: ((_searchStatus$results2 = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results2 !== void 0 ? _searchStatus$results2 : 0) === 0
  }, /*#__PURE__*/React.createElement(DownArrow, null)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseX, null))), searchStatus !== undefined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "search-status"
  }, /*#__PURE__*/React.createElement("div", null, resultString)), /*#__PURE__*/React.createElement("div", {
    className: "search-progress",
    style: progressStyle
  }))));
};

var _default = DataGridSearch;
exports.default = _default;