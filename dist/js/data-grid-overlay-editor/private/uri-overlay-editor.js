"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../common/utils");

var React = _interopRequireWildcard(require("react"));

var _growingEntry = _interopRequireDefault(require("../../growing-entry/growing-entry"));

var _uriOverlayEditorStyle = require("./uri-overlay-editor-style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UriOverlayEditor = function UriOverlayEditor(p) {
  var uri = p.uri,
      onChange = p.onChange,
      onKeyDown = p.onKeyDown,
      forceEditMode = p.forceEditMode;

  var _React$useState = React.useState(uri === "" || forceEditMode),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      editMode = _React$useState2[0],
      setEditMode = _React$useState2[1];

  var onEditClick = React.useCallback(function () {
    setEditMode(true);
  }, []);

  if (editMode) {
    return /*#__PURE__*/React.createElement(_growingEntry.default, {
      autoFocus: true,
      onKeyDown: onKeyDown,
      value: uri,
      onChange: onChange
    });
  }

  return /*#__PURE__*/React.createElement(_uriOverlayEditorStyle.UriOverlayEditorStyle, null, /*#__PURE__*/React.createElement("div", {
    className: "link-area"
  }, /*#__PURE__*/React.createElement("a", {
    href: uri,
    target: "_blank",
    rel: "noopener noreferrer"
  }, uri)), /*#__PURE__*/React.createElement("div", {
    className: "edit-icon",
    onClick: onEditClick
  }, /*#__PURE__*/React.createElement(_utils.EditPencil, null)), /*#__PURE__*/React.createElement("textarea", {
    autoFocus: true,
    onKeyDown: onKeyDown
  }));
};

var _default = UriOverlayEditor;
exports.default = _default;