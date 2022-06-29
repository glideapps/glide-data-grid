/* eslint-disable react/display-name */
import * as React from "react";
import UriOverlayEditor from "../../data-grid-overlay-editor/private/uri-overlay-editor";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, UriCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const uriCellRenderer: InternalCellRenderer<UriCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Uri,
    needsHover: false,
    needsHoverPosition: false,
    useLabel: true,
    renderPrep: prepTextCell,
    render: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell) => ctx.measureText(cell.data).width + 16,
    onDelete: c => ({
        ...c,
        data: "",
    }),
    getEditor: () => p => {
        const { onChange, onKeyDown, value, forceEditMode } = p;
        return (
            <UriOverlayEditor
                forceEditMode={forceEditMode}
                uri={value.data}
                readonly={value.readonly === true}
                onKeyDown={onKeyDown}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
            />
        );
    },
};
