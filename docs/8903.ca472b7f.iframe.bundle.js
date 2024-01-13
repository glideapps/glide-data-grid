"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8903],{

/***/ "./packages/core/dist/esm/internal/data-grid-overlay-editor/private/number-overlay-editor.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ number_overlay_editor)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/number-overlay-editor-style.js

const NumberOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "NumberOverlayEditorStyle",
  class: "gdg-n15fjm3e",
  propsAsIs: false
});
// EXTERNAL MODULE: ./node_modules/react-number-format/dist/react-number-format.es.js
var react_number_format_es = __webpack_require__("./node_modules/react-number-format/dist/react-number-format.es.js");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/private/number-overlay-editor.js



function getDecimalSeparator() {
  var _Intl$NumberFormat;
  const numberWithDecimalSeparator = 1.1;
  const result = (_Intl$NumberFormat = Intl.NumberFormat()) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.formatToParts(numberWithDecimalSeparator)) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.find(part => part.type === "decimal")) === null || _Intl$NumberFormat === void 0 ? void 0 : _Intl$NumberFormat.value;
  return result !== null && result !== void 0 ? result : ".";
}
function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}
const NumberOverlayEditor = p => {
  const {
    value,
    onChange,
    disabled,
    highlight,
    validatedSelection,
    fixedDecimals,
    allowNegative,
    thousandSeparator,
    decimalSeparator
  } = p;
  const inputRef = react.useRef();
  react.useLayoutEffect(() => {
    if (validatedSelection !== undefined) {
      var _inputRef$current;
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  return react.createElement(NumberOverlayEditorStyle, null, react.createElement(react_number_format_es/* NumericFormat */.h3, {
    autoFocus: true,
    getInputRef: inputRef,
    className: "gdg-input",
    onFocus: e => e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length),
    disabled: disabled === true,
    decimalScale: fixedDecimals,
    allowNegative: allowNegative,
    thousandSeparator: thousandSeparator !== null && thousandSeparator !== void 0 ? thousandSeparator : getThousandSeprator(),
    decimalSeparator: decimalSeparator !== null && decimalSeparator !== void 0 ? decimalSeparator : getDecimalSeparator(),
    value: Object.is(value, -0) ? "-" : value !== null && value !== void 0 ? value : "",
    onValueChange: onChange
  }));
};
/* harmony default export */ const number_overlay_editor = (NumberOverlayEditor);

/***/ })

}]);
//# sourceMappingURL=8903.ca472b7f.iframe.bundle.js.map