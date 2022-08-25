import * as React from "react";
import { createPortal } from "react-dom";

import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { makeCSSStyle, Theme, ThemeContext } from "../common/styles";
import type { GetCellRendererCallback } from "../data-grid/cells/cell-types";
import {
    EditableGridCell,
    GridCell,
    GridCellKind,
    isEditableGridCell,
    isObjectEditorCallbackResult,
    Item,
    ProvideEditorCallback,
    Rectangle,
    ValidatedGridCell,
} from "../data-grid/data-grid-types";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style";
import type { OverlayImageEditorProps } from "./private/image-overlay-editor";
import { useStayOnScreen } from "./use-stay-on-screen";

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

interface DataGridOverlayEditorProps {
    readonly target: Rectangle;
    readonly cell: Item;
    readonly content: GridCell;
    readonly className?: string;
    readonly id: string;
    readonly initialValue?: string;
    readonly theme: Theme;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly highlight: boolean;
    readonly imageEditorOverride?: ImageEditorType;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
    readonly validateCell?: (
        cell: Item,
        newValue: EditableGridCell,
        prevValue: GridCell
    ) => boolean | ValidatedGridCell;
}

const DataGridOverlayEditor: React.FunctionComponent<DataGridOverlayEditorProps> = p => {
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
    } = p;

    const [tempValue, setTempValueRaw] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);
    const lastValueRef = React.useRef(tempValue ?? content);
    lastValueRef.current = tempValue ?? content;

    const [isValid, setIsValid] = React.useState(() => {
        if (validateCell === undefined) return true;
        return !(isEditableGridCell(content) && validateCell?.(cell, content, lastValueRef.current) === false);
    });

    const onFinishEditing = React.useCallback<typeof onFinishEditingIn>(
        (newCell, movement) => {
            onFinishEditingIn(isValid ? newCell : undefined, movement);
        },
        [isValid, onFinishEditingIn]
    );

    const setTempValue = React.useCallback(
        (newVal: GridCell | undefined) => {
            if (validateCell !== undefined && newVal !== undefined && isEditableGridCell(newVal)) {
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
        },
        [cell, validateCell]
    );

    const finished = React.useRef(false);
    const customMotion = React.useRef<[-1 | 0 | 1, -1 | 0 | 1] | undefined>(undefined);

    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
        finished.current = true;
    }, [tempValue, onFinishEditing]);

    const onCustomFinishedEditing = React.useCallback(
        (newValue: GridCell | undefined) => {
            onFinishEditing(newValue, customMotion.current ?? [0, 0]);
            finished.current = true;
        },
        [onFinishEditing]
    );

    const onKeyDownCustom = React.useCallback(
        async (event: React.KeyboardEvent) => {
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

            await new Promise(r => window.setTimeout(r, 0));

            if (!finished.current && customMotion.current !== undefined) {
                onFinishEditing(save ? tempValue : undefined, customMotion.current);
                finished.current = true;
            }
        },
        [onFinishEditing, tempValue]
    );

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Escape") {
                onFinishEditing(undefined, [0, 0]);
                event.stopPropagation();
                event.preventDefault();
            } else if (event.key === "Enter" && !event.ctrlKey) {
                onFinishEditing(tempValue, [0, event.shiftKey ? -1 : 1]);
                event.stopPropagation();
                event.preventDefault();
            } else if (event.key === "Tab") {
                onFinishEditing(tempValue, [event.shiftKey ? -1 : 1, 0]);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        [onFinishEditing, tempValue]
    );
    const targetValue = tempValue ?? content;

    const customEditor = React.useMemo(() => {
        return provideEditor?.(content);
    }, [content, provideEditor]);

    const [CellEditor, useLabel] = React.useMemo(() => {
        if (content.kind === GridCellKind.Custom) return [];
        const renderer = getCellRenderer(content);
        return [renderer?.provideEditor?.(content), renderer?.useLabel];
    }, [content, getCellRenderer]);

    const { ref, style: stayOnScreenStyle } = useStayOnScreen();

    let pad = true;
    let editor: React.ReactNode;
    let style = true;
    let styleOverride: React.CSSProperties | undefined;

    if (customEditor !== undefined) {
        pad = customEditor.disablePadding !== true;
        style = customEditor.disableStyling !== true;
        const isObjectEditor = isObjectEditorCallbackResult(customEditor);
        if (isObjectEditor) {
            styleOverride = customEditor.styleOverride;
        }
        const CustomEditor = isObjectEditor ? customEditor.editor : customEditor;
        editor = (
            <CustomEditor
                isHighlighted={highlight}
                onChange={setTempValue}
                value={targetValue}
                initialValue={initialValue}
                onFinishedEditing={onCustomFinishedEditing}
                validatedSelection={isEditableGridCell(targetValue) ? targetValue.selectionRange : undefined}
            />
        );
    } else if (CellEditor !== undefined) {
        editor = (
            <CellEditor
                forceEditMode={forceEditMode}
                isHighlighted={highlight}
                onChange={setTempValue as any}
                value={targetValue}
                onFinishedEditing={e => onFinishEditing((e ?? tempValue) as GridCell | undefined, [0, 0])}
                onKeyDown={onKeyDown}
                target={target}
                imageEditorOverride={imageEditorOverride}
                markdownDivCreateNode={markdownDivCreateNode}
                isValid={isValid}
                validatedSelection={isEditableGridCell(targetValue) ? targetValue.selectionRange : undefined}
            />
        );
    }

    styleOverride = { ...styleOverride, ...stayOnScreenStyle };

    // Consider imperatively creating and adding the element to the dom?
    const portalElement = document.getElementById("portal");
    if (portalElement === null) {
        // eslint-disable-next-line no-console
        console.error(
            'Cannot open Data Grid overlay editor, because portal not found.  Please add `<div id="portal" />` as the last child of your `<body>`.'
        );
        return null;
    }

    let classWrap = style ? "gdg-style" : "gdg-unstyle";
    if (!isValid) {
        classWrap += " invalid";
    }

    if (pad) {
        classWrap += " pad";
    }

    return createPortal(
        <ThemeContext.Provider value={theme}>
            <ClickOutsideContainer style={makeCSSStyle(theme)} className={className} onClickOutside={onClickOutside}>
                <DataGridOverlayEditorStyle
                    ref={ref}
                    id={id}
                    className={classWrap}
                    style={styleOverride}
                    as={useLabel === true ? "label" : undefined}
                    targetX={target.x}
                    targetY={target.y}
                    targetWidth={target.width}
                    targetHeight={target.height}>
                    <div className="clip-region" onKeyDown={customEditor === undefined ? undefined : onKeyDownCustom}>
                        {editor}
                    </div>
                </DataGridOverlayEditorStyle>
            </ClickOutsideContainer>
        </ThemeContext.Provider>,
        portalElement
    );
};

export default DataGridOverlayEditor;
