import * as React from "react";
import { createPortal } from "react-dom";

import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { CellRenderers } from "../data-grid/cells";
import { GridCell, GridCellKind, ProvideEditorCallback, Rectangle } from "../data-grid/data-grid-types";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style";
import { OverlayImageEditorProps } from "./private/image-overlay-editor";

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

export interface DataGridOverlayEditorProps {
    readonly target: Rectangle;
    readonly content: GridCell;
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
        imageEditorOverride,
        markdownDivCreateNode,
        highlight,
        provideEditor,
    } = p;

    const [tempValue, setTempValue] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);

    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
    }, [tempValue, onFinishEditing]);

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Escape") {
                onFinishEditing(undefined, [0, 0]);
            } else if (event.key === "Enter" && !event.shiftKey) {
                onFinishEditing(tempValue, [0, 1]);
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
    let editor: React.ReactNode;
    const CustomEditor = provideEditor?.(targetValue);
    if (CustomEditor !== undefined) {
        editor = (
            <CustomEditor
                isHighlighted={highlight}
                onChange={setTempValue}
                value={targetValue}
                onFinishedEditing={onClickOutside}
            />
        );
    } else if (targetValue.kind !== GridCellKind.Custom) {
        const renderer = CellRenderers[targetValue.kind];
        const CellEditor = renderer.getEditor?.(targetValue);
        if (CellEditor !== undefined) {
            editor = (
                <CellEditor
                    forceEditMode={forceEditMode}
                    isHighlighted={highlight}
                    onChange={setTempValue as any}
                    value={targetValue}
                    onFinishedEditing={onClickOutside}
                    onKeyDown={onKeyDown}
                    target={target}
                    imageEditorOverride={imageEditorOverride}
                    markdownDivCreateNode={markdownDivCreateNode}
                />
            );
        }
    }

    const f = (ev: React.MouseEvent) => {
        ev.stopPropagation();
    };

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
        <ClickOutsideContainer onClickOutside={onClickOutside}>
            <DataGridOverlayEditorStyle targetRect={target} onMouseDown={f} onClick={f}>
                <div className="clip-region">{editor}</div>
            </DataGridOverlayEditorStyle>
        </ClickOutsideContainer>,
        portalElement
    );

    return portal;
};

export default DataGridOverlayEditor;
