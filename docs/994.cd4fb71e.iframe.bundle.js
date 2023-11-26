"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[994],{

/***/ "./packages/core/dist/js/number-overlay-editor-FPDVTUA6.js":
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ number_overlay_editor_default)
/* harmony export */ });
/* harmony import */ var _chunk_XFANKXD6_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/dist/js/chunk-XFANKXD6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-number-format/dist/react-number-format.es.js");


var NumberOverlayEditorStyle = (0,_chunk_XFANKXD6_js__WEBPACK_IMPORTED_MODULE_1__/* .styled_default */ .d)("div")({
  name: "NumberOverlayEditorStyle",
  class: "n1czszh3",
  propsAsIs: false
});

function getDecimalSeparator() {
  var _a, _b, _c;
  const numberWithDecimalSeparator = 1.1;
  const result = (_c = (_b = (_a = Intl.NumberFormat()) == null ? void 0 : _a.formatToParts(numberWithDecimalSeparator)) == null ? void 0 : _b.find(part => part.type === "decimal")) == null ? void 0 : _c.value;
  return result != null ? result : ".";
}
function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}
var NumberOverlayEditor = p => {
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
  const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    var _a;
    if (validatedSelection !== void 0) {
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(NumberOverlayEditorStyle, null, react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2__/* .NumericFormat */ .h3, {
    autoFocus: true,
    getInputRef: inputRef,
    className: "gdg-input",
    onFocus: e => e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length),
    disabled: disabled === true,
    decimalScale: fixedDecimals,
    allowNegative,
    thousandSeparator: thousandSeparator != null ? thousandSeparator : getThousandSeprator(),
    decimalSeparator: decimalSeparator != null ? decimalSeparator : getDecimalSeparator(),
    value: Object.is(value, -0) ? "-" : value != null ? value : "",
    onValueChange: onChange
  }));
};
var number_overlay_editor_default = NumberOverlayEditor;


/***/ })

}]);
//# sourceMappingURL=994.cd4fb71e.iframe.bundle.js.map