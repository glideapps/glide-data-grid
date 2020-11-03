import { nonNull } from "../common/support";
import * as React from "react";
import { createPortal } from "react-dom";
import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { GridCell, GridCellKind, Rectangle } from "../data-grid/data-grid-types";
import GrowingEntry from "../growing-entry/growing-entry";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style";
import BubblesOverlayEditor from "./private/bubbles-overlay-editor";
import ImageOverlayEditor from "./private/image-overlay-editor";
import MarkdownOverlayEditor from "./private/markdown-overlay-editor";
import NumberOverlayEditor from "./private/number-overlay-editor";
import UriOverlayEditor from "./private/uri-overlay-editor";
import { NumberFormatValues } from "react-number-format";

interface Props {
    readonly target: Rectangle;
    readonly content: GridCell;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
}

const DataGridOverlayEditor: React.FunctionComponent<Props> = p => {
    const { target, content, onFinishEditing, forceEditMode } = p;

    const [tempValue, setTempValue] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);

    const onStringValueChange = React.useCallback(
        (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (content.kind === GridCellKind.Text) {
                setTempValue({
                    ...content,
                    editData: ev.target.value,
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
                    editData: values.floatValue,
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
    let editor: React.ReactNode;
    switch (targetValue.kind) {
        case GridCellKind.Text:
            editor = (
                <GrowingEntry
                    autoFocus={true}
                    allowCtrlEnter={true}
                    onKeyDown={onKeyDown}
                    value={targetValue.editData}
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
                    value={targetValue.editData}
                    onKeyDown={onKeyDown}
                    onChange={onNumberValueChange}
                />
            );
            break;
        case GridCellKind.Image:
            editor = (
                <ImageOverlayEditor
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
        case GridCellKind.Markdown:
            editor = (
                <MarkdownOverlayEditor
                    markdown={targetValue.data}
                    onKeyDown={onKeyDown}
                    onChange={onStringValueChange}
                    forceEditMode={forceEditMode}
                />
            );
            break;
    }

    const f = (ev: React.MouseEvent) => {
        ev.stopPropagation();
    };

    const portal = createPortal(
        <ClickOutsideContainer onClickOutside={onClickOutside}>
            <DataGridOverlayEditorStyle targetRect={target} onMouseDown={f} onClick={f}>
                {editor}
            </DataGridOverlayEditorStyle>
        </ClickOutsideContainer>,
        nonNull(document.getElementById("portal"))
    );

    return portal;
};

export default DataGridOverlayEditor;
