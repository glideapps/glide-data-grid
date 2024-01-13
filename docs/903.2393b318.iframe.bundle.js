"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[903],{

/***/ "./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ data_grid_overlay_editor)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("./node_modules/react-dom/index.js");
// EXTERNAL MODULE: ./packages/core/src/internal/click-outside-container/click-outside-container.tsx
var click_outside_container = __webpack_require__("./packages/core/src/internal/click-outside-container/click-outside-container.tsx");
// EXTERNAL MODULE: ./packages/core/src/common/styles.ts
var styles = __webpack_require__("./packages/core/src/common/styles.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-types.ts
var data_grid_types = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx

const _exp = /*#__PURE__*/() => p => p.targetY;
const _exp2 = /*#__PURE__*/() => p => p.targetX - 1;
const _exp3 = /*#__PURE__*/() => p => p.targetY - 1;
const _exp4 = /*#__PURE__*/() => p => p.targetWidth + 2;
const _exp5 = /*#__PURE__*/() => p => p.targetHeight + 2;
const _exp6 = /*#__PURE__*/() => p => p.targetY + 10;
const _exp7 = /*#__PURE__*/() => p => Math.max(0, (p.targetHeight - 28) / 2);
const DataGridOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "DataGridOverlayEditorStyle",
  class: "d16c1ze1",
  propsAsIs: false,
  vars: {
    "d16c1ze1-0": [_exp(), "px"],
    "d16c1ze1-1": [_exp2(), "px"],
    "d16c1ze1-2": [_exp3(), "px"],
    "d16c1ze1-3": [_exp4(), "px"],
    "d16c1ze1-4": [_exp5(), "px"],
    "d16c1ze1-5": [_exp6(), "px"],
    "d16c1ze1-6": [_exp7(), "px"]
  }
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/use-stay-on-screen.ts

function useRefState() {
  const [refState, setRefState] = react.useState();
  return [refState !== null && refState !== void 0 ? refState : undefined, setRefState];
}
function useStayOnScreen() {
  const [ref, setRef] = useRefState();
  const [xOffset, setXOffset] = react.useState(0);
  const [isIntersecting, setIsIntersecting] = react.useState(true);
  react.useLayoutEffect(() => {
    if (ref === undefined) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(ents => {
      if (ents.length === 0) return;
      setIsIntersecting(ents[0].isIntersecting);
    }, {
      threshold: 1
    });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);
  react.useEffect(() => {
    if (isIntersecting || ref === undefined) return;
    let rafHandle;
    const fn = () => {
      const {
        right: refRight
      } = ref.getBoundingClientRect();
      setXOffset(cv => Math.min(cv + window.innerWidth - refRight - 10, 0));
      rafHandle = requestAnimationFrame(fn);
    };
    rafHandle = requestAnimationFrame(fn);
    return () => {
      if (rafHandle !== undefined) {
        cancelAnimationFrame(rafHandle);
      }
    };
  }, [ref, isIntersecting]);
  const style = react.useMemo(() => {
    return {
      transform: `translateX(${xOffset}px)`
    };
  }, [xOffset]);
  return {
    ref: setRef,
    style
  };
}
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx








const DataGridOverlayEditor = p => {
  const {
    target,
    content,
    onFinishEditing: onFinishEditingIn,
    forceEditMode,
    initialValue,
    imageEditorOverride,
    markdownDivCreateNode,
    highlight,
    className,
    theme,
    id,
    cell,
    validateCell,
    getCellRenderer,
    provideEditor,
    isOutsideClick
  } = p;
  const [tempValue, setTempValueRaw] = react.useState(forceEditMode ? content : undefined);
  const lastValueRef = react.useRef(tempValue !== null && tempValue !== void 0 ? tempValue : content);
  lastValueRef.current = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [isValid, setIsValid] = react.useState(() => {
    if (validateCell === undefined) return true;
    return !((0,data_grid_types/* isEditableGridCell */.T9)(content) && (validateCell === null || validateCell === void 0 ? void 0 : validateCell(cell, content, lastValueRef.current)) === false);
  });
  const onFinishEditing = react.useCallback((newCell, movement) => {
    onFinishEditingIn(isValid ? newCell : undefined, movement);
  }, [isValid, onFinishEditingIn]);
  const setTempValue = react.useCallback(newVal => {
    if (validateCell !== undefined && newVal !== undefined && (0,data_grid_types/* isEditableGridCell */.T9)(newVal)) {
      const validResult = validateCell(cell, newVal, lastValueRef.current);
      if (validResult === false) {
        setIsValid(false);
      } else if (typeof validResult === "object") {
        newVal = validResult;
        setIsValid(true);
      } else {
        setIsValid(true);
      }
    }
    setTempValueRaw(newVal);
  }, [cell, validateCell]);
  const finished = react.useRef(false);
  const customMotion = react.useRef(undefined);
  const onClickOutside = react.useCallback(() => {
    onFinishEditing(tempValue, [0, 0]);
    finished.current = true;
  }, [tempValue, onFinishEditing]);
  const onEditorFinished = react.useCallback((newValue, movement) => {
    var _ref;
    onFinishEditing(newValue, (_ref = movement !== null && movement !== void 0 ? movement : customMotion.current) !== null && _ref !== void 0 ? _ref : [0, 0]);
    finished.current = true;
  }, [onFinishEditing]);
  const onKeyDown = react.useCallback(async event => {
    let save = false;
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 0];
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 1];
      save = true;
    } else if (event.key === "Tab") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [event.shiftKey ? -1 : 1, 0];
      save = true;
    }
    window.setTimeout(() => {
      if (!finished.current && customMotion.current !== undefined) {
        onFinishEditing(save ? tempValue : undefined, customMotion.current);
        finished.current = true;
      }
    }, 0);
  }, [onFinishEditing, tempValue]);
  const targetValue = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [editorProvider, useLabel] = react.useMemo(() => {
    var _getCellRenderer, _getCellRenderer$prov;
    if ((0,data_grid_types/* isInnerOnlyCell */.rs)(content)) return [];
    const external = provideEditor === null || provideEditor === void 0 ? void 0 : provideEditor(content);
    if (external !== undefined) return [external, false];
    return [(_getCellRenderer = getCellRenderer(content)) === null || _getCellRenderer === void 0 || (_getCellRenderer$prov = _getCellRenderer.provideEditor) === null || _getCellRenderer$prov === void 0 ? void 0 : _getCellRenderer$prov.call(_getCellRenderer, content), false];
  }, [content, getCellRenderer, provideEditor]);
  const {
    ref,
    style: stayOnScreenStyle
  } = useStayOnScreen();
  let pad = true;
  let editor;
  let style = true;
  let styleOverride;
  if (editorProvider !== undefined) {
    pad = editorProvider.disablePadding !== true;
    style = editorProvider.disableStyling !== true;
    const isObjectEditor = (0,data_grid_types/* isObjectEditorCallbackResult */.DP)(editorProvider);
    if (isObjectEditor) {
      styleOverride = editorProvider.styleOverride;
    }
    const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
    editor = (0,jsx_runtime.jsx)(CustomEditor, {
      isHighlighted: highlight,
      onChange: setTempValue,
      value: targetValue,
      initialValue: initialValue,
      onFinishedEditing: onEditorFinished,
      validatedSelection: (0,data_grid_types/* isEditableGridCell */.T9)(targetValue) ? targetValue.selectionRange : undefined,
      forceEditMode: forceEditMode,
      target: target,
      imageEditorOverride: imageEditorOverride,
      markdownDivCreateNode: markdownDivCreateNode,
      isValid: isValid,
      theme: theme
    });
  }
  styleOverride = {
    ...styleOverride,
    ...stayOnScreenStyle
  };
  const portalElement = document.getElementById("portal");
  if (portalElement === null) {
    console.error('Cannot open Data Grid overlay editor, because portal not found.  Please add `<div id="portal" />` as the last child of your `<body>`.');
    return null;
  }
  let classWrap = style ? "gdg-style" : "gdg-unstyle";
  if (!isValid) {
    classWrap += " gdg-invalid";
  }
  if (pad) {
    classWrap += " gdg-pad";
  }
  return (0,react_dom.createPortal)((0,jsx_runtime.jsx)(styles/* ThemeContext.Provider */.Ni.Provider, {
    value: theme,
    children: (0,jsx_runtime.jsx)(click_outside_container/* default */.Z, {
      style: (0,styles/* makeCSSStyle */.be)(theme),
      className: className,
      onClickOutside: onClickOutside,
      isOutsideClick: isOutsideClick,
      children: (0,jsx_runtime.jsx)(DataGridOverlayEditorStyle, {
        ref: ref,
        id: id,
        className: classWrap,
        style: styleOverride,
        as: useLabel === true ? "label" : undefined,
        targetX: target.x,
        targetY: target.y,
        targetWidth: target.width,
        targetHeight: target.height,
        children: (0,jsx_runtime.jsx)("div", {
          className: "gdg-clip-region",
          onKeyDown: onKeyDown,
          children: editor
        })
      })
    })
  }), portalElement);
};
/* harmony default export */ const data_grid_overlay_editor = (DataGridOverlayEditor);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx":
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
___CSS_LOADER_EXPORT___.push([module.id, ".d16c1ze1{position:absolute;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden;box-sizing:border-box;--overlay-top:var(--d16c1ze1-0);left:var(--d16c1ze1-1);top:var(--d16c1ze1-2);min-width:var(--d16c1ze1-3);min-height:var(--d16c1ze1-4);width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:400px;max-height:calc(100vh - var(--d16c1ze1-5));font-family:var(--gdg-font-family);font-size:var(--gdg-editor-font-size);text-align:start;}@-webkit-keyframes glide_fade_in-d16c1ze1{from{opacity:0%;}to{opacity:100%;}}@keyframes glide_fade_in-d16c1ze1{from{opacity:0%;}to{opacity:100%;}}.d16c1ze1.gdg-style{border-radius:2px;background-color:var(--gdg-bg-cell);box-shadow:0 0 0 1px var(--gdg-accent-color),0px 0px 1px rgba(62,65,86,0.4), 0px 6px 12px rgba(62,65,86,0.15);-webkit-animation:glide_fade_in-d16c1ze1 60ms 1;animation:glide_fade_in-d16c1ze1 60ms 1;}.d16c1ze1.gdg-pad{padding:var(--d16c1ze1-6) 8.5px 3px;}.d16c1ze1 .gdg-clip-region{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow-y:auto;overflow-x:hidden;border-radius:2px;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}.d16c1ze1 .gdg-clip-region .gdg-growing-entry{height:100%;}.d16c1ze1 .gdg-clip-region input.gdg-input{width:100%;border:none;border-width:0;outline:none;}.d16c1ze1 .gdg-clip-region textarea.gdg-input{border:none;border-width:0;outline:none;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giXSwibmFtZXMiOlsiLmQxNmMxemUxIl0sIm1hcHBpbmdzIjoiQUFDMENBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBEYXRhR3JpZE92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIC0tb3ZlcmxheS10b3A6ICR7cCA9PiBwLnRhcmdldFl9cHg7XG5cbiAgICBsZWZ0OiAke3AgPT4gcC50YXJnZXRYIC0gMX1weDtcbiAgICB0b3A6ICR7cCA9PiBwLnRhcmdldFkgLSAxfXB4O1xuICAgIG1pbi13aWR0aDogJHtwID0+IHAudGFyZ2V0V2lkdGggKyAyfXB4O1xuICAgIG1pbi1oZWlnaHQ6ICR7cCA9PiBwLnRhcmdldEhlaWdodCArIDJ9cHg7XG4gICAgd2lkdGg6IG1heC1jb250ZW50O1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtICR7cCA9PiBwLnRhcmdldFkgKyAxMH1weCk7XG5cbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcblxuICAgIEBrZXlmcmFtZXMgZ2xpZGVfZmFkZV9pbiB7XG4gICAgICAgIGZyb20ge1xuICAgICAgICAgICAgb3BhY2l0eTogMCU7XG4gICAgICAgIH1cblxuICAgICAgICB0byB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5nZGctc3R5bGUge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1jZWxsKTtcblxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggdmFyKC0tZ2RnLWFjY2VudC1jb2xvciksIDBweCAwcHggMXB4IHJnYmEoNjIsIDY1LCA4NiwgMC40KSxcbiAgICAgICAgICAgIDBweCA2cHggMTJweCByZ2JhKDYyLCA2NSwgODYsIDAuMTUpO1xuXG4gICAgICAgIGFuaW1hdGlvbjogZ2xpZGVfZmFkZV9pbiA2MG1zIDE7XG4gICAgfVxuXG4gICAgJi5nZGctcGFkIHtcbiAgICAgICAgcGFkZGluZzogJHtwID0+IE1hdGgubWF4KDAsIChwLnRhcmdldEhlaWdodCAtIDI4KSAvIDIpfXB4IDguNXB4IDNweDtcbiAgICB9XG5cbiAgICAuZ2RnLWNsaXAtcmVnaW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgICAuZ2RnLWdyb3dpbmctZW50cnkge1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgJiBpbnB1dC5nZGctaW5wdXQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgJiB0ZXh0YXJlYS5nZGctaW5wdXQge1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAwO1xuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuYDsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx"],"names":[".d16c1ze1"],"mappings":"AAC0CA,UAAAA,iBAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,+BAAAA,CAAAA,sBAAAA,CAAAA,qBAAAA,CAAAA,2BAAAA,CAAAA,4BAAAA,CAAAA,yBAAAA,CAAAA,sBAAAA,CAAAA,iBAAAA,CAAAA,eAAAA,CAAAA,0CAAAA,CAAAA,kCAAAA,CAAAA,qCAAAA,CAAAA,gBAAAA,CAAAA,CAAAA,0CAAAA,KAAAA,UAAAA,CAAAA,CAAAA,GAAAA,YAAAA,CAAAA,CAAAA,CAAAA,kCAAAA,KAAAA,UAAAA,CAAAA,CAAAA,GAAAA,YAAAA,CAAAA,CAAAA,CAAAA,oBAAAA,iBAAAA,CAAAA,mCAAAA,CAAAA,6GAAAA,CAAAA,+CAAAA,CAAAA,uCAAAA,CAAAA,CAAAA,kBAAAA,mCAAAA,CAAAA,CAAAA,2BAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,eAAAA,CAAAA,iBAAAA,CAAAA,iBAAAA,CAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,CAAAA,8CAAAA,WAAAA,CAAAA,CAAAA,2CAAAA,UAAAA,CAAAA,WAAAA,CAAAA,cAAAA,CAAAA,YAAAA,CAAAA,CAAAA,8CAAAA,WAAAA,CAAAA,cAAAA,CAAAA,YAAAA,CAAAA;ACA1C,u0FAAu0F","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const DataGridOverlayEditorStyle = styled.div`\n    position: absolute;\n\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    box-sizing: border-box;\n\n    --overlay-top: ${p => p.targetY}px;\n\n    left: ${p => p.targetX - 1}px;\n    top: ${p => p.targetY - 1}px;\n    min-width: ${p => p.targetWidth + 2}px;\n    min-height: ${p => p.targetHeight + 2}px;\n    width: max-content;\n    max-width: 400px;\n    max-height: calc(100vh - ${p => p.targetY + 10}px);\n\n    font-family: var(--gdg-font-family);\n    font-size: var(--gdg-editor-font-size);\n\n    @keyframes glide_fade_in {\n        from {\n            opacity: 0%;\n        }\n\n        to {\n            opacity: 100%;\n        }\n    }\n\n    &.gdg-style {\n        border-radius: 2px;\n        background-color: var(--gdg-bg-cell);\n\n        box-shadow: 0 0 0 1px var(--gdg-accent-color), 0px 0px 1px rgba(62, 65, 86, 0.4),\n            0px 6px 12px rgba(62, 65, 86, 0.15);\n\n        animation: glide_fade_in 60ms 1;\n    }\n\n    &.gdg-pad {\n        padding: ${p => Math.max(0, (p.targetHeight - 28) / 2)}px 8.5px 3px;\n    }\n\n    .gdg-clip-region {\n        display: flex;\n        flex-direction: column;\n        overflow-y: auto;\n        overflow-x: hidden;\n        border-radius: 2px;\n        flex-grow: 1;\n\n        .gdg-growing-entry {\n            height: 100%;\n        }\n\n        & input.gdg-input {\n            width: 100%;\n            border: none;\n            border-width: 0;\n            outline: none;\n        }\n\n        & textarea.gdg-input {\n            border: none;\n            border-width: 0;\n            outline: none;\n        }\n    }\n\n    text-align: start;\n`;",".d16c1ze1{position:absolute;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden;box-sizing:border-box;--overlay-top:var(--d16c1ze1-0);left:var(--d16c1ze1-1);top:var(--d16c1ze1-2);min-width:var(--d16c1ze1-3);min-height:var(--d16c1ze1-4);width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:400px;max-height:calc(100vh - var(--d16c1ze1-5));font-family:var(--gdg-font-family);font-size:var(--gdg-editor-font-size);text-align:start;}@-webkit-keyframes glide_fade_in-d16c1ze1{from{opacity:0%;}to{opacity:100%;}}@keyframes glide_fade_in-d16c1ze1{from{opacity:0%;}to{opacity:100%;}}.d16c1ze1.gdg-style{border-radius:2px;background-color:var(--gdg-bg-cell);box-shadow:0 0 0 1px var(--gdg-accent-color),0px 0px 1px rgba(62,65,86,0.4), 0px 6px 12px rgba(62,65,86,0.15);-webkit-animation:glide_fade_in-d16c1ze1 60ms 1;animation:glide_fade_in-d16c1ze1 60ms 1;}.d16c1ze1.gdg-pad{padding:var(--d16c1ze1-6) 8.5px 3px;}.d16c1ze1 .gdg-clip-region{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow-y:auto;overflow-x:hidden;border-radius:2px;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}.d16c1ze1 .gdg-clip-region .gdg-growing-entry{height:100%;}.d16c1ze1 .gdg-clip-region input.gdg-input{width:100%;border:none;border-width:0;outline:none;}.d16c1ze1 .gdg-clip-region textarea.gdg-input{border:none;border-width:0;outline:none;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giXSwibmFtZXMiOlsiLmQxNmMxemUxIl0sIm1hcHBpbmdzIjoiQUFDMENBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBEYXRhR3JpZE92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIC0tb3ZlcmxheS10b3A6ICR7cCA9PiBwLnRhcmdldFl9cHg7XG5cbiAgICBsZWZ0OiAke3AgPT4gcC50YXJnZXRYIC0gMX1weDtcbiAgICB0b3A6ICR7cCA9PiBwLnRhcmdldFkgLSAxfXB4O1xuICAgIG1pbi13aWR0aDogJHtwID0+IHAudGFyZ2V0V2lkdGggKyAyfXB4O1xuICAgIG1pbi1oZWlnaHQ6ICR7cCA9PiBwLnRhcmdldEhlaWdodCArIDJ9cHg7XG4gICAgd2lkdGg6IG1heC1jb250ZW50O1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtICR7cCA9PiBwLnRhcmdldFkgKyAxMH1weCk7XG5cbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcblxuICAgIEBrZXlmcmFtZXMgZ2xpZGVfZmFkZV9pbiB7XG4gICAgICAgIGZyb20ge1xuICAgICAgICAgICAgb3BhY2l0eTogMCU7XG4gICAgICAgIH1cblxuICAgICAgICB0byB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5nZGctc3R5bGUge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1iZy1jZWxsKTtcblxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggdmFyKC0tZ2RnLWFjY2VudC1jb2xvciksIDBweCAwcHggMXB4IHJnYmEoNjIsIDY1LCA4NiwgMC40KSxcbiAgICAgICAgICAgIDBweCA2cHggMTJweCByZ2JhKDYyLCA2NSwgODYsIDAuMTUpO1xuXG4gICAgICAgIGFuaW1hdGlvbjogZ2xpZGVfZmFkZV9pbiA2MG1zIDE7XG4gICAgfVxuXG4gICAgJi5nZGctcGFkIHtcbiAgICAgICAgcGFkZGluZzogJHtwID0+IE1hdGgubWF4KDAsIChwLnRhcmdldEhlaWdodCAtIDI4KSAvIDIpfXB4IDguNXB4IDNweDtcbiAgICB9XG5cbiAgICAuZ2RnLWNsaXAtcmVnaW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgICAuZ2RnLWdyb3dpbmctZW50cnkge1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgJiBpbnB1dC5nZGctaW5wdXQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgJiB0ZXh0YXJlYS5nZGctaW5wdXQge1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAwO1xuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuYDsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx":
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_data_grid_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=903.2393b318.iframe.bundle.js.map