/* eslint-disable react/display-name */
import * as React from "react";
import { ImageOverlayEditor } from "../..";
import { drawImage } from "../data-grid-lib";
import { GridCellKind, ImageCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const imageCellRenderer: InternalCellRenderer<ImageCell> = {
    getAccessibilityString: c => c.data.join(", "),
    kind: GridCellKind.Image,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, col, row, cell, x, y, w, h, _highlighted, hoverAmount, _hoverX, _hoverY, imageLoader) =>
        drawImage(ctx, theme, cell.displayData ?? cell.data, col, row, x, y, w, h, hoverAmount, imageLoader),
    getEditor: () => p => {
        const { onChange, onKeyDown, value, onFinishedEditing, imageEditorOverride } = p;

        const ImageEditor = imageEditorOverride ?? ImageOverlayEditor;

        return (
            <ImageEditor
                urls={value.data}
                canWrite={value.allowAdd}
                onCancel={onFinishedEditing}
                onChange={newImage => {
                    onChange({
                        ...value,
                        data: [newImage],
                    });
                    onFinishedEditing();
                }}
                onKeyDown={onKeyDown}
            />
        );
    },
};
