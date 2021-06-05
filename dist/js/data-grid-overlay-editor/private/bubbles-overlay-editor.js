"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _bubblesOverlayEditorStyle = require("./bubbles-overlay-editor-style");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BubblesOverlayEditor = function BubblesOverlayEditor(p) {
  var bubbles = p.bubbles,
      onKeyDown = p.onKeyDown;
  return /*#__PURE__*/React.createElement(_bubblesOverlayEditorStyle.BubblesOverlayEditorStyle, null, bubbles.map(function (b, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "boe-bubble"
    }, b);
  }), /*#__PURE__*/React.createElement("textarea", {
    autoFocus: true,
    onKeyDown: onKeyDown
  }));
};

var _default = BubblesOverlayEditor;
exports.default = _default;