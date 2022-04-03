(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./packages/core/dist/js/data-grid-overlay-editor/private/number-overlay-editor.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__("./node_modules/react/index.js");const NumberOverlayEditorStyle=__webpack_require__("./packages/core/dist/js/common/styles.js").b.div`
    display: flex;
    margin: 6px 0 3px;
    color: ${p=>p.theme.textDark};

    > input {
        font-size: ${p=>p.theme.editorFontSize};
        padding: 0;
        font-family: ${p=>p.theme.fontFamily};
        color: ${p=>p.theme.textDark};
        background-color: ${p=>p.theme.bgCell};
    }
`;var react_number_format_es=__webpack_require__("./packages/core/node_modules/react-number-format/dist/react-number-format.es.js");function getDecimalSeparator(){var _Intl$NumberFormat,_Intl$NumberFormat$fo,_Intl$NumberFormat$fo2;const result=null===(_Intl$NumberFormat=Intl.NumberFormat())||void 0===_Intl$NumberFormat||null===(_Intl$NumberFormat$fo=_Intl$NumberFormat.formatToParts(1.1))||void 0===_Intl$NumberFormat$fo||null===(_Intl$NumberFormat$fo2=_Intl$NumberFormat$fo.find((part=>"decimal"===part.type)))||void 0===_Intl$NumberFormat$fo2?void 0:_Intl$NumberFormat$fo2.value;return null!=result?result:"."}const NumberOverlayEditor=p=>{const{value:value,onChange:onChange,onKeyDown:onKeyDown,disabled:disabled,highlight:highlight}=p;return react.createElement(NumberOverlayEditorStyle,null,react.createElement(react_number_format_es.a,{autoFocus:!0,className:"gdg-input",onFocus:e=>e.target.setSelectionRange(highlight?0:e.target.value.length,e.target.value.length),disabled:!0===disabled,thousandSeparator:"."===getDecimalSeparator()?",":".",decimalSeparator:getDecimalSeparator(),value:null!=value?value:"",onValueChange:onChange,onKeyDown:onKeyDown}))};NumberOverlayEditor.__docgenInfo={description:"",methods:[],displayName:"NumberOverlayEditor"};__webpack_exports__.default=NumberOverlayEditor;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/core/dist/js/data-grid-overlay-editor/private/number-overlay-editor.js"]={name:"NumberOverlayEditor",docgenInfo:NumberOverlayEditor.__docgenInfo,path:"packages/core/dist/js/data-grid-overlay-editor/private/number-overlay-editor.js"})}}]);