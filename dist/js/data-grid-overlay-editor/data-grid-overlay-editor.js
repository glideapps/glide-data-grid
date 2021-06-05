"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _clickOutsideContainer = _interopRequireDefault(require("../click-outside-container/click-outside-container"));

var _dataGridTypes = require("../data-grid/data-grid-types");

var _growingEntry = _interopRequireDefault(require("../growing-entry/growing-entry"));

var _dataGridOverlayEditorStyle = require("./data-grid-overlay-editor-style");

var _bubblesOverlayEditor = _interopRequireDefault(require("./private/bubbles-overlay-editor"));

var _imageOverlayEditor = _interopRequireDefault(require("./private/image-overlay-editor"));

var _markdownOverlayEditor = _interopRequireDefault(require("./private/markdown-overlay-editor"));

var _numberOverlayEditor = _interopRequireDefault(require("./private/number-overlay-editor"));

var _uriOverlayEditor = _interopRequireDefault(require("./private/uri-overlay-editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DataGridOverlayEditor = function DataGridOverlayEditor(p) {
  var target = p.target,
      content = p.content,
      onFinishEditing = p.onFinishEditing,
      forceEditMode = p.forceEditMode,
      imageEditorOverride = p.imageEditorOverride,
      markdownDivCreateNode = p.markdownDivCreateNode;

  var _React$useState = React.useState(forceEditMode ? content : undefined),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tempValue = _React$useState2[0],
      setTempValue = _React$useState2[1];

  var onStringValueChange = React.useCallback(function (ev) {
    if (content.kind === _dataGridTypes.GridCellKind.Text) {
      setTempValue(_objectSpread(_objectSpread({}, content), {}, {
        data: ev.target.value
      }));
    } else if (content.kind === _dataGridTypes.GridCellKind.Markdown || content.kind === _dataGridTypes.GridCellKind.Uri) {
      setTempValue(_objectSpread(_objectSpread({}, content), {}, {
        data: ev.target.value
      }));
    }
  }, [content]);
  var onImageValueChange = React.useCallback(function (newValue) {
    if (content.kind === _dataGridTypes.GridCellKind.Image) {
      onFinishEditing(_objectSpread(_objectSpread({}, content), {}, {
        data: [newValue]
      }), [0, 0]);
    }
  }, [content, onFinishEditing]);
  var onNumberValueChange = React.useCallback(function (values) {
    if (content.kind === _dataGridTypes.GridCellKind.Number) {
      setTempValue(_objectSpread(_objectSpread({}, content), {}, {
        data: values.floatValue
      }));
    }
  }, [content]);
  var onClickOutside = React.useCallback(function () {
    onFinishEditing(tempValue, [0, 0]);
  }, [tempValue, onFinishEditing]);
  var onKeyDown = React.useCallback(function (event) {
    if (event.key === "Escape") {
      onFinishEditing(undefined, [0, 0]);
    } else if (event.key === "Enter" && !event.ctrlKey) {
      onFinishEditing(tempValue, [0, event.shiftKey ? -1 : 1]);
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === "Tab") {
      onFinishEditing(tempValue, [event.shiftKey ? -1 : 1, 0]);
      event.stopPropagation();
      event.preventDefault();
    }
  }, [onFinishEditing, tempValue]);
  var ImageEditor = imageEditorOverride !== null && imageEditorOverride !== void 0 ? imageEditorOverride : _imageOverlayEditor.default;
  var targetValue = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  var editor;

  switch (targetValue.kind) {
    case _dataGridTypes.GridCellKind.Text:
      editor = /*#__PURE__*/React.createElement(_growingEntry.default, {
        autoFocus: true,
        allowCtrlEnter: true,
        onKeyDown: onKeyDown,
        value: targetValue.data,
        onChange: onStringValueChange
      });
      break;

    case _dataGridTypes.GridCellKind.Uri:
      editor = /*#__PURE__*/React.createElement(_uriOverlayEditor.default, {
        forceEditMode: forceEditMode,
        uri: targetValue.data,
        onKeyDown: onKeyDown,
        onChange: onStringValueChange
      });
      break;

    case _dataGridTypes.GridCellKind.Boolean:
      break;

    case _dataGridTypes.GridCellKind.Number:
      editor = /*#__PURE__*/React.createElement(_numberOverlayEditor.default, {
        value: targetValue.data,
        onKeyDown: onKeyDown,
        onChange: onNumberValueChange
      });
      break;

    case _dataGridTypes.GridCellKind.Image:
      editor = /*#__PURE__*/React.createElement(ImageEditor, {
        urls: targetValue.data,
        canWrite: targetValue.allowAdd,
        onCancel: onClickOutside,
        onChange: onImageValueChange,
        onKeyDown: onKeyDown
      });
      break;

    case _dataGridTypes.GridCellKind.Bubble:
      editor = /*#__PURE__*/React.createElement(_bubblesOverlayEditor.default, {
        bubbles: targetValue.data,
        onKeyDown: onKeyDown
      });
      break;

    case _dataGridTypes.GridCellKind.Markdown:
      editor = /*#__PURE__*/React.createElement(_markdownOverlayEditor.default, {
        markdown: targetValue.data,
        onKeyDown: onKeyDown,
        onChange: onStringValueChange,
        forceEditMode: forceEditMode,
        createNode: markdownDivCreateNode
      });
      break;
  }

  var f = function f(ev) {
    ev.stopPropagation();
  };

  var portalElement = document.getElementById("portal");

  if (portalElement === null) {
    console.error('Cannot open Data Grid overlay editor, because portal not found.  Please add `<div id="portal" />` as the last child of your `<body>`.');
    return null;
  }

  var portal = /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/React.createElement(_clickOutsideContainer.default, {
    onClickOutside: onClickOutside
  }, /*#__PURE__*/React.createElement(_dataGridOverlayEditorStyle.DataGridOverlayEditorStyle, {
    targetRect: target,
    onMouseDown: f,
    onClick: f
  }, editor)), portalElement);
  return portal;
};

var _default = DataGridOverlayEditor;
exports.default = _default;