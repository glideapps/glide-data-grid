import * as React from "react";
import { createPortal } from "react-dom";
import { NumberFormatValues } from "react-number-format";

import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { GridCell, GridCellKind, Rectangle } from "../data-grid/data-grid-types";
import GrowingEntry from "../growing-entry/growing-entry";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style";
import BubblesOverlayEditor from "./private/bubbles-overlay-editor";
import DrilldownOverlayEditor from "./private/drilldown-overlay-editor";
import ImageOverlayEditor, { OverlayImageEditorProps } from "./private/image-overlay-editor";
import MarkdownOverlayEditor from "./private/markdown-overlay-editor";
import NumberOverlayEditor from "./private/number-overlay-editor";
import UriOverlayEditor from "./private/uri-overlay-editor";

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

interface Props {
    readonly target: Rectangle;
    readonly content: GridCell;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
}

const DataGridOverlayEditor: React.FunctionComponent<Props> = p => {
    const { target, content, onFinishEditing, forceEditMode, imageEditorOverride, markdownDivCreateNode } = p;

    const [tempValue, setTempValue] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);

    const onStringValueChange = React.useCallback(
        (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (content.kind === GridCellKind.Text) {
                setTempValue({
                    ...content,
                    data: ev.target.value,
                });
            } else if (content.kind === GridCellKind.Markdown || content.kind === GridCellKind.Uri) {
                setTempValue({
                    ...content,
                    data: ev.target.value,
                });
            }
        },
        [content]
    );

    const onImageValueChange = React.useCallback(
        (newValue: string) => {
            if (content.kind === GridCellKind.Image) {
                onFinishEditing(
                    {
                        ...content,
                        data: [newValue],
                    },
                    [0, 0]
                );
            }
        },
        [content, onFinishEditing]
    );
    const onNumberValueChange = React.useCallback(
        (values: NumberFormatValues) => {
            if (content.kind === GridCellKind.Number) {
                setTempValue({
                    ...content,
                    data: values.floatValue,
                });
            }
        },
        [content]
    );

    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
    }, [tempValue, onFinishEditing]);

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Escape") {
                onFinishEditing(undefined, [0, 0]);
            } else if (event.key === "Enter") {
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

    // The only difference is that `shift + enter` enters a newline
    const onKeyDownMultiline = React.useCallback(
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

    const ImageEditor = imageEditorOverride ?? ImageOverlayEditor;

    const targetValue = tempValue ?? content;
    let editor: React.ReactNode;
    switch (targetValue.kind) {
        case GridCellKind.Text:
            editor = (
                <GrowingEntry
                    autoFocus={true}
                    disabled={targetValue.readonly === true}
                    onKeyDown={onKeyDownMultiline}
                    value={targetValue.data}
                    onChange={onStringValueChange}
                />
            );
            break;
        case GridCellKind.Uri:
            editor = (
                <UriOverlayEditor
                    forceEditMode={forceEditMode}
                    uri={targetValue.data}
                    onKeyDown={onKeyDown}
                    onChange={onStringValueChange}
                />
            );
            break;
        case GridCellKind.Boolean:
            break;
        case GridCellKind.Number:
            editor = (
                <NumberOverlayEditor
                    disabled={targetValue.readonly === true}
                    value={targetValue.data}
                    onKeyDown={onKeyDown}
                    onChange={onNumberValueChange}
                />
            );
            break;
        case GridCellKind.Image:
            editor = (
                <ImageEditor
                    urls={targetValue.data}
                    canWrite={targetValue.allowAdd}
                    onCancel={onClickOutside}
                    onChange={onImageValueChange}
                    onKeyDown={onKeyDown}
                />
            );
            break;
        case GridCellKind.Bubble:
            editor = <BubblesOverlayEditor bubbles={targetValue.data} onKeyDown={onKeyDown} />;
            break;
        case GridCellKind.Drilldown:
            editor = <DrilldownOverlayEditor drilldowns={targetValue.data} onKeyDown={onKeyDown} />;
            break;
        case GridCellKind.Markdown:
            editor = (
                <MarkdownOverlayEditor
                    targetRect={target}
                    markdown={targetValue.data}
                    onKeyDown={onKeyDownMultiline}
                    onChange={onStringValueChange}
                    forceEditMode={forceEditMode}
                    createNode={markdownDivCreateNode}
                />
            );
            break;
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
                {editor}
            </DataGridOverlayEditorStyle>
        </ClickOutsideContainer>,
        portalElement
    );

    return portal;
};

export default DataGridOverlayEditor;
