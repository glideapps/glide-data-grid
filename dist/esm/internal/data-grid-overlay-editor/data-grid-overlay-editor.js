import * as React from "react";
import { createPortal } from "react-dom";
import ClickOutsideContainer from "../click-outside-container/click-outside-container.js";
import { makeCSSStyle, ThemeContext } from "../../common/styles.js";
import { isEditableGridCell, isInnerOnlyCell, isObjectEditorCallbackResult, } from "../data-grid/data-grid-types.js";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style.js";
import { useStayOnScreen } from "./use-stay-on-screen.js";
const DataGridOverlayEditor = p => {
    const { target, content, onFinishEditing: onFinishEditingIn, forceEditMode, initialValue, imageEditorOverride, markdownDivCreateNode, highlight, className, theme, id, cell, bloom, portalElementRef, validateCell, getCellRenderer, provideEditor, isOutsideClick, customEventTarget, activation, } = p;
    const [tempValue, setTempValueRaw] = React.useState(forceEditMode ? content : undefined);
    const lastValueRef = React.useRef(tempValue ?? content);
    lastValueRef.current = tempValue ?? content;
    const [isValid, setIsValid] = React.useState(() => {
        if (validateCell === undefined)
            return true;
        return !(isEditableGridCell(content) && validateCell?.(cell, content, lastValueRef.current) === false);
    });
    const onFinishEditing = React.useCallback((newCell, movement) => {
        onFinishEditingIn(isValid ? newCell : undefined, movement);
    }, [isValid, onFinishEditingIn]);
    const setTempValue = React.useCallback((newVal) => {
        if (validateCell !== undefined && newVal !== undefined && isEditableGridCell(newVal)) {
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
        else if (event.key === "Enter" &&
            // The shift key is reserved for multi-line editing
            // to allow inserting new lines without closing the editor.
            !event.shiftKey) {
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
        if (isInnerOnlyCell(content))
            return [];
        const cellWithLocation = { ...content, location: cell, activation };
        const external = provideEditor?.(cellWithLocation);
        if (external !== undefined)
            return [external, false];
        return [getCellRenderer(content)?.provideEditor?.(cellWithLocation), false];
    }, [cell, content, getCellRenderer, provideEditor, activation]);
    const { ref, style: stayOnScreenStyle } = useStayOnScreen();
    let pad = true;
    let editor;
    let style = true;
    let styleOverride;
    if (editorProvider !== undefined) {
        pad = editorProvider.disablePadding !== true;
        style = editorProvider.disableStyling !== true;
        const isObjectEditor = isObjectEditorCallbackResult(editorProvider);
        if (isObjectEditor) {
            styleOverride = editorProvider.styleOverride;
        }
        const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
        editor = (React.createElement(CustomEditor, { portalElementRef: portalElementRef, isHighlighted: highlight, activation: activation, onChange: setTempValue, value: targetValue, initialValue: initialValue, onFinishedEditing: onEditorFinished, validatedSelection: isEditableGridCell(targetValue) ? targetValue.selectionRange : undefined, forceEditMode: forceEditMode, target: target, imageEditorOverride: imageEditorOverride, markdownDivCreateNode: markdownDivCreateNode, isValid: isValid, theme: theme }));
    }
    styleOverride = { ...styleOverride, ...stayOnScreenStyle };
    // Consider imperatively creating and adding the element to the dom?
    const portalElement = portalElementRef?.current ?? document.getElementById("portal");
    if (portalElement === null) {
        // eslint-disable-next-line no-console
        console.error('Cannot open Data Grid overlay editor, because portal not found. Please, either provide a portalElementRef or add `<div id="portal" />` as the last child of your `<body>`.');
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
    return createPortal(React.createElement(ThemeContext.Provider, { value: theme },
        React.createElement(ClickOutsideContainer, { style: makeCSSStyle(theme), className: className, onClickOutside: onClickOutside, isOutsideClick: isOutsideClick, customEventTarget: customEventTarget },
            React.createElement(DataGridOverlayEditorStyle, { ref: ref, id: id, className: classWrap, style: styleOverride, as: useLabel === true ? "label" : undefined, targetX: target.x - bloomX, targetY: target.y - bloomY, targetWidth: target.width + bloomX * 2, targetHeight: target.height + bloomY * 2 },
                React.createElement("div", { className: "gdg-clip-region", onKeyDown: onKeyDown }, editor)))), portalElement);
};
export default DataGridOverlayEditor;
//# sourceMappingURL=data-grid-overlay-editor.js.map