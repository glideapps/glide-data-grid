/* eslint-disable react/display-name */
import * as React from "react";
import { ImageOverlayEditor } from "../internal/data-grid-overlay-editor/private/image-overlay-editor.js";
import { drawImage } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type ImageCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const imageCellRenderer: InternalCellRenderer<ImageCell> = {
    getAccessibilityString: c => c.data.join(", "),
    kind: GridCellKind.Image,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    draw: a => drawImage(a, a.cell.displayData ?? a.cell.data, a.cell.rounding, a.cell.contentAlign),
    measure: (_ctx, cell) => cell.data.length * 50,
    onDelete: c => ({
        ...c,
        data: [],
    }),
    provideEditor: () => p => {
        const { value, onFinishedEditing, imageEditorOverride } = p;

        const ImageEditor = imageEditorOverride ?? ImageOverlayEditor;

        return (
            <ImageEditor
                urls={value.data}
                canWrite={value.allowAdd}
                onCancel={onFinishedEditing}
                onChange={newImage => {
                    onFinishedEditing({
                        ...value,
                        data: [newImage],
                    });
                }}
            />
        );
    },
    onPaste: (toPaste, cell) => {
        toPaste = toPaste.trim();
        const fragments = toPaste.split(",");
        const uris = fragments
            .map(f => {
                try {
                    new URL(f);
                    return f;
                } catch {
                    return undefined;
                }
            })
            .filter(x => x !== undefined) as string[];

        if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i])) return undefined;
        return {
            ...cell,
            data: uris,
        };
    },
};
