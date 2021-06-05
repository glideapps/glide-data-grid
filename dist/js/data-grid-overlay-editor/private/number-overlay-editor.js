"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _numberOverlayEditorStyle = require("./number-overlay-editor-style");

var _reactNumberFormat = _interopRequireDefault(require("react-number-format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getDecimalSeparator() {
  var _Intl$NumberFormat, _Intl$NumberFormat$fo, _Intl$NumberFormat$fo2;

  var numberWithDecimalSeparator = 1.1;
  var result = (_Intl$NumberFormat = Intl.NumberFormat()) === null || _Intl$NumberFormat === void 0 ? void 0 : (_Intl$NumberFormat$fo = _Intl$NumberFormat.formatToParts(numberWithDecimalSeparator)) === null || _Intl$NumberFormat$fo === void 0 ? void 0 : (_Intl$NumberFormat$fo2 = _Intl$NumberFormat$fo.find(function (part) {
    return part.type === "decimal";
  })) === null || _Intl$NumberFormat$fo2 === void 0 ? void 0 : _Intl$NumberFormat$fo2.value;
  return result !== null && result !== void 0 ? result : ".";
}

function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}

var NumberOverlayEditor = function NumberOverlayEditor(p) {
  var value = p.value,
      onChange = p.onChange,
      onKeyDown = p.onKeyDown;
  return /*#__PURE__*/React.createElement(_numberOverlayEditorStyle.NumberOverlayEditorStyle, null, /*#__PURE__*/React.createElement(_reactNumberFormat.default, {
    autoFocus: true,
    thousandSeparator: getThousandSeprator(),
    decimalSeparator: getDecimalSeparator(),
    value: value !== null && value !== void 0 ? value : "" // decimalScale={3}
    // prefix={"$"}
    ,
    onValueChange: onChange,
    onKeyDown: onKeyDown
  }));
};

var _default = NumberOverlayEditor;
exports.default = _default;