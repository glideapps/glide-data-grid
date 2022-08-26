/* eslint-disable react/display-name */
import * as React from "react";
import ImageOverlayEditor from "../../data-grid-overlay-editor/private/image-overlay-editor";
import { drawImage } from "../data-grid-lib";
import { GridCellKind, ImageCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const imageCellRenderer: InternalCellRenderer<ImageCell> = {
    getAccessibilityString: c => c.data.join(", "),
    kind: GridCellKind.Image,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    draw: a => drawImage(a, a.cell.displayData ?? a.cell.data),
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
