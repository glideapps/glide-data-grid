"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const click_outside_container_js_1 = __importDefault(require("../click-outside-container/click-outside-container.js"));
const styles_js_1 = require("../../common/styles.js");
const data_grid_types_js_1 = require("../data-grid/data-grid-types.js");
const data_grid_overlay_editor_style_js_1 = require("./data-grid-overlay-editor-style.js");
const use_stay_on_screen_js_1 = require("./use-stay-on-screen.js");
const DataGridOverlayEditor = p => {
    const { target, content, onFinishEditing: onFinishEditingIn, forceEditMode, initialValue, imageEditorOverride, markdownDivCreateNode, highlight, className, theme, id, cell, bloom, validateCell, getCellRenderer, provideEditor, isOutsideClick, } = p;
    const [tempValue, setTempValueRaw] = React.useState(forceEditMode ? content : undefined);
    const lastValueRef = React.useRef(tempValue ?? content);
    lastValueRef.current = tempValue ?? content;
    const [isValid, setIsValid] = React.useState(() => {
        if (validateCell === undefined)
            return true;
        return !((0, data_grid_types_js_1.isEditableGridCell)(content) && validateCell?.(cell, content, lastValueRef.current) === false);
    });
    const onFinishEditing = React.useCallback((newCell, movement) => {
        onFinishEditingIn(isValid ? newCell : undefined, movement);
    }, [isValid, onFinishEditingIn]);
    const setTempValue = React.useCallback((newVal) => {
        if (validateCell !== undefined && newVal !== undefined && (0, data_grid_types_js_1.isEditableGridCell)(newVal)) {
            const validResult = validateCell(cell, newVal, lastValueRef.current);
            if (validResult === false) {
                setIsValid(false);
            }
            else if (typeof validResult === "object") {
                newVal = validResult;
                setIsValid(true);
            }
            else {
                setIsValid(true);
            }
        }
        setTempValueRaw(newVal);
    }, [cell, validateCell]);
    const finished = React.useRef(false);
    const customMotion = React.useRef(undefined);
    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
        finished.current = true;
    }, [tempValue, onFinishEditing]);
    const onEditorFinished = React.useCallback((newValue, movement) => {
        onFinishEditing(newValue, movement ?? customMotion.current ?? [0, 0]);
        finished.current = true;
    }, [onFinishEditing]);
    const onKeyDown = React.useCallback(async (event) => {
        let save = false;
        if (event.key === "Escape") {
            event.stopPropagation();
            event.preventDefault();
            customMotion.current = [0, 0];
        }
        else if (event.key === "Enter" && !event.shiftKey) {
            event.stopPropagation();
            event.preventDefault();
            customMotion.current = [0, 1];
            save = true;
        }
        else if (event.key === "Tab") {
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
    const targetValue = tempValue ?? content;
    const [editorProvider, useLabel] = React.useMemo(() => {
        if ((0, data_grid_types_js_1.isInnerOnlyCell)(content))
            return [];
        const external = provideEditor?.(content);
        if (external !== undefined)
            return [external, false];
        return [getCellRenderer(content)?.provideEditor?.(content), false];
    }, [content, getCellRenderer, provideEditor]);
    const { ref, style: stayOnScreenStyle } = (0, use_stay_on_screen_js_1.useStayOnScreen)();
    let pad = true;
    let editor;
    let style = true;
    let styleOverride;
    if (editorProvider !== undefined) {
        pad = editorProvider.disablePadding !== true;
        style = editorProvider.disableStyling !== true;
        const isObjectEditor = (0, data_grid_types_js_1.isObjectEditorCallbackResult)(editorProvider);
        if (isObjectEditor) {
            styleOverride = editorProvider.styleOverride;
        }
        const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
        editor = (React.createElement(CustomEditor, { isHighlighted: highlight, onChange: setTempValue, value: targetValue, initialValue: initialValue, onFinishedEditing: onEditorFinished, validatedSelection: (0, data_grid_types_js_1.isEditableGridCell)(targetValue) ? targetValue.selectionRange : undefined, forceEditMode: forceEditMode, target: target, imageEditorOverride: imageEditorOverride, markdownDivCreateNode: markdownDivCreateNode, isValid: isValid, theme: theme }));
    }
    styleOverride = { ...styleOverride, ...stayOnScreenStyle };
    // Consider imperatively creating and adding the element to the dom?
    const portalElement = document.getElementById("portal");
    if (portalElement === null) {
        // eslint-disable-next-line no-console
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
    const bloomX = bloom?.[0] ?? 1;
    const bloomY = bloom?.[1] ?? 1;
    return (0, react_dom_1.createPortal)(React.createElement(styles_js_1.ThemeContext.Provider, { value: theme },
        React.createElement(click_outside_container_js_1.default, { style: (0, styles_js_1.makeCSSStyle)(theme), className: className, onClickOutside: onClickOutside, isOutsideClick: isOutsideClick },
            React.createElement(data_grid_overlay_editor_style_js_1.DataGridOverlayEditorStyle, { ref: ref, id: id, className: classWrap, style: styleOverride, as: useLabel === true ? "label" : undefined, targetX: target.x - bloomX, targetY: target.y - bloomY, targetWidth: target.width + bloomX * 2, targetHeight: target.height + bloomY * 2 },
                React.createElement("div", { className: "gdg-clip-region", onKeyDown: onKeyDown }, editor)))), portalElement);
};
exports.default = DataGridOverlayEditor;
//# sourceMappingURL=data-grid-overlay-editor.js.map