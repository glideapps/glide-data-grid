/* eslint-disable react/display-name */
import * as React from "react";
import { MarkdownOverlayEditor } from "../../data-grid-overlay-editor/private/markdown-overlay-editor";
import { drawTextCell, drawWithLastUpdate } from "../data-grid-lib";
import { GridCellKind, MarkdownCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const markdownCellRenderer: InternalCellRenderer<MarkdownCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Markdown,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, _highlighted, hoverAmount) =>
        drawWithLastUpdate(ctx, cell.lastUpdated, theme, x, y, w, h, () =>
            drawTextCell(ctx, theme, cell.data, x, y, w, h, hoverAmount)
        ),
    onDelete: c => ({
        ...c,
        data: "",
    }),
    getEditor: () => p => {
        const { onChange, onKeyDown, value, target, onFinishedEditing, markdownDivCreateNode, forceEditMode } = p;
        return (
            <MarkdownOverlayEditor
                onFinish={onFinishedEditing}
                targetRect={target}
                readonly={value.readonly === true}
                markdown={value.data}
                onKeyDown={onKeyDown}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
                forceEditMode={forceEditMode}
                createNode={markdownDivCreateNode}
            />
        );
    },
};
