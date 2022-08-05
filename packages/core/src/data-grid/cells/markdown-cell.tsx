/* eslint-disable react/display-name */
import * as React from "react";
import { MarkdownOverlayEditor } from "../../data-grid-overlay-editor/private/markdown-overlay-editor";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, MarkdownCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const markdownCellRenderer: InternalCellRenderer<MarkdownCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Markdown,
    needsHover: false,
    needsHoverPosition: false,
    renderPrep: prepTextCell,
    measure: (ctx, cell, t) => {
        const firstLine = cell.data.split("\n")[0];
        return ctx.measureText(firstLine).width + 2 * t.cellHorizontalPadding;
    },
    render: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    onDelete: c => ({
        ...c,
        data: "",
    }),
    getEditor: () => p => {
        const {
            onChange,
            onKeyDown,
            value,
            target,
            onFinishedEditing,
            markdownDivCreateNode,
            forceEditMode,
            validatedSelection,
        } = p;
        return (
            <MarkdownOverlayEditor
                onFinish={onFinishedEditing}
                targetRect={target}
                readonly={value.readonly === true}
                markdown={value.data}
                validatedSelection={validatedSelection}
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
