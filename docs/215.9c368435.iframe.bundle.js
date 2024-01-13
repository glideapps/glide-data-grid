"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[215],{

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor.tsx":
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
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx

const NumberOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "NumberOverlayEditorStyle",
  class: "npc9kuo",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx");
// EXTERNAL MODULE: ./node_modules/react-number-format/dist/react-number-format.es.js
var react_number_format_es = __webpack_require__("./node_modules/react-number-format/dist/react-number-format.es.js");
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor.tsx




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
  return (0,jsx_runtime.jsx)(NumberOverlayEditorStyle, {
    children: (0,jsx_runtime.jsx)(react_number_format_es/* NumericFormat */.h3, {
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
    })
  });
};
NumberOverlayEditor.displayName = "NumberOverlayEditor";
/* harmony default export */ const number_overlay_editor = (NumberOverlayEditor);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".npc9kuo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:6px 0 3px;color:var(--gdg-text-dark);}.npc9kuo > input{font-size:var(--gdg-editor-font-size);padding:0;font-family:var(--gdg-font-family);color:var(--gdg-text-dark);background-color:var(--gdg-bg-cell);}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbnVtYmVyLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIubnBjOWt1byJdLCJtYXBwaW5ncyI6IkFBQ3dDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL251bWJlci1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBOdW1iZXJPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luOiA2cHggMCAzcHg7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgPiBpbnB1dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZ2RnLWVkaXRvci1mb250LXNpemUpO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctY2VsbCk7XG4gICAgfVxuYDsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx"],"names":[".npc9kuo"],"mappings":"AACwCA,SAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,gBAAAA,CAAAA,0BAAAA,CAAAA,CAAAA,iBAAAA,qCAAAA,CAAAA,SAAAA,CAAAA,kCAAAA,CAAAA,0BAAAA,CAAAA,mCAAAA,CAAAA;ACAxC,2kCAA2kC","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const NumberOverlayEditorStyle = styled.div`\n    display: flex;\n    margin: 6px 0 3px;\n    color: var(--gdg-text-dark);\n\n    > input {\n        font-size: var(--gdg-editor-font-size);\n        padding: 0;\n        font-family: var(--gdg-font-family);\n        color: var(--gdg-text-dark);\n        background-color: var(--gdg-bg-cell);\n    }\n`;",".npc9kuo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:6px 0 3px;color:var(--gdg-text-dark);}.npc9kuo > input{font-size:var(--gdg-editor-font-size);padding:0;font-family:var(--gdg-font-family);color:var(--gdg-text-dark);background-color:var(--gdg-bg-cell);}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbnVtYmVyLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIubnBjOWt1byJdLCJtYXBwaW5ncyI6IkFBQ3dDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL251bWJlci1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBOdW1iZXJPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luOiA2cHggMCAzcHg7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgPiBpbnB1dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZ2RnLWVkaXRvci1mb250LXNpemUpO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctY2VsbCk7XG4gICAgfVxuYDsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_number_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_number_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_number_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_number_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_number_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=215.9c368435.iframe.bundle.js.map