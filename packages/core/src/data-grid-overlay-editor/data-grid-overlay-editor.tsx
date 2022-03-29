import * as React from "react";
import { createPortal } from "react-dom";

import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { CellRenderers } from "../data-grid/cells";
import {
    GridCell,
    GridCellKind,
    isObjectEditorCallbackResult,
    ProvideEditorCallback,
    Rectangle,
} from "../data-grid/data-grid-types";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style";
import { OverlayImageEditorProps } from "./private/image-overlay-editor";

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

export interface DataGridOverlayEditorProps {
    readonly target: Rectangle;
    readonly content: GridCell;
    readonly className?: string;
    readonly id: string;
    readonly initialValue?: string;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly highlight: boolean;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
}

const DataGridOverlayEditor: React.FunctionComponent<DataGridOverlayEditorProps> = p => {
    const {
        target,
        content,
        onFinishEditing,
        forceEditMode,
        initialValue,
        imageEditorOverride,
        markdownDivCreateNode,
        highlight,
        className,
        id,
        provideEditor,
    } = p;

    const [tempValue, setTempValue] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);
    const finished = React.useRef(false);
    const customMotion = React.useRef<[-1 | 0 | 1, -1 | 0 | 1] | undefined>(undefined);

    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
        finished.current = true;
    }, [tempValue, onFinishEditing]);

    const onCustomFinishedEditing = React.useCallback(
        (newValue: GridCell | undefined) => {
            newValue = newValue ?? tempValue;
            onFinishEditing(newValue, customMotion.current ?? [0, 0]);
            finished.current = true;
        },
        [onFinishEditing, tempValue]
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
        const renderer = CellRenderers[content.kind];
        return [renderer.getEditor?.(content), renderer.useLabel];
    }, [content]);

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
            />
        );
    }

    // Consider imperatively creating and adding the element to the dom?
    const portalElement = document.getElementById("portal");
    if (portalElement === null) {
        // eslint-disable-next-line no-console
        console.error(
            'Cannot open Data Grid overlay editor, because portal not found.  Please add `<div id="portal" />` as the last child of your `<body>`.'
        );
        return null;
    }

    const portal = createPortal(
        <ClickOutsideContainer className={className} onClickOutside={onClickOutside}>
            <DataGridOverlayEditorStyle
                id={id}
                className={style ? "gdg-style" : "gdg-unstyle"}
                style={styleOverride}
                as={useLabel === true ? "label" : undefined}
                targetRect={target}
                pad={pad}>
                <div className="clip-region" onKeyDown={customEditor === undefined ? undefined : onKeyDownCustom}>
                    {editor}
                </div>
            </DataGridOverlayEditorStyle>
        </ClickOutsideContainer>,
        portalElement
    );

    return portal;
};

export default DataGridOverlayEditor;
