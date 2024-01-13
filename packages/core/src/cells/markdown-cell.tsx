/* eslint-disable react/display-name */
import * as React from "react";
import { MarkdownOverlayEditor } from "../internal/data-grid-overlay-editor/private/markdown-overlay-editor.js";
import { drawTextCell, prepTextCell } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type MarkdownCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const markdownCellRenderer: InternalCellRenderer<MarkdownCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Markdown,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepTextCell,
    measure: (ctx, cell, t) => {
        const firstLine = cell.data.split("\n")[0];
        return ctx.measureText(firstLine).width + 2 * t.cellHorizontalPadding;
    },
    draw: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: () => p => {
        const { onChange, value, target, onFinishedEditing, markdownDivCreateNode, forceEditMode, validatedSelection } =
            p;
        return (
            <MarkdownOverlayEditor
                onFinish={onFinishedEditing}
                targetRect={target}
                value={value}
                validatedSelection={validatedSelection}
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
    onPaste: (toPaste, cell) => (toPaste === cell.data ? undefined : { ...cell, data: toPaste }),
};
