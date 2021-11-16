/* eslint-disable react/display-name */
import * as React from "react";
import UriOverlayEditor from "../../data-grid-overlay-editor/private/uri-overlay-editor";
import { drawTextCell } from "../data-grid-lib";
import { GridCellKind, UriCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const uriCellRenderer: InternalCellRenderer<UriCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Uri,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, _highlighted, hoverAmount) =>
        drawTextCell(ctx, theme, cell.data, x, y, w, h, hoverAmount),
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
