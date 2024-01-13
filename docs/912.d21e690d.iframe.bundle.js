"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[912],{

/***/ "./packages/core/dist/esm/internal/data-grid-overlay-editor/data-grid-overlay-editor.js":
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
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/click-outside-container/click-outside-container.js
var click_outside_container = __webpack_require__("./packages/core/dist/esm/internal/click-outside-container/click-outside-container.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/common/styles.js
var styles = __webpack_require__("./packages/core/dist/esm/common/styles.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/data-grid/data-grid-types.js
var data_grid_types = __webpack_require__("./packages/core/dist/esm/internal/data-grid/data-grid-types.js");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/data-grid-overlay-editor-style.js

const _exp = () => p => p.targetY;
const _exp2 = () => p => p.targetX - 1;
const _exp3 = () => p => p.targetY - 1;
const _exp4 = () => p => p.targetWidth + 2;
const _exp5 = () => p => p.targetHeight + 2;
const _exp6 = () => p => p.targetY + 10;
const _exp7 = () => p => Math.max(0, (p.targetHeight - 28) / 2);
const DataGridOverlayEditorStyle = (0,dist/* styled */.z)('div')({
  name: "DataGridOverlayEditorStyle",
  class: "gdg-d19meir1",
  propsAsIs: false,
  vars: {
    "d19meir1-0": [_exp(), "px"],
    "d19meir1-1": [_exp2(), "px"],
    "d19meir1-2": [_exp3(), "px"],
    "d19meir1-3": [_exp4(), "px"],
    "d19meir1-4": [_exp5(), "px"],
    "d19meir1-5": [_exp6(), "px"],
    "d19meir1-6": [_exp7(), "px"]
  }
});
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/use-stay-on-screen.js

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
;// CONCATENATED MODULE: ./packages/core/dist/esm/internal/data-grid-overlay-editor/data-grid-overlay-editor.js







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
    editor = react.createElement(CustomEditor, {
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
  return (0,react_dom.createPortal)(react.createElement(styles/* ThemeContext.Provider */.Ni.Provider, {
    value: theme
  }, react.createElement(click_outside_container/* default */.Z, {
    style: (0,styles/* makeCSSStyle */.be)(theme),
    className: className,
    onClickOutside: onClickOutside,
    isOutsideClick: isOutsideClick
  }, react.createElement(DataGridOverlayEditorStyle, {
    ref: ref,
    id: id,
    className: classWrap,
    style: styleOverride,
    as: useLabel === true ? "label" : undefined,
    targetX: target.x,
    targetY: target.y,
    targetWidth: target.width,
    targetHeight: target.height
  }, react.createElement("div", {
    className: "gdg-clip-region",
    onKeyDown: onKeyDown
  }, editor)))), portalElement);
};
/* harmony default export */ const data_grid_overlay_editor = (DataGridOverlayEditor);

/***/ })

}]);
//# sourceMappingURL=912.d21e690d.iframe.bundle.js.map