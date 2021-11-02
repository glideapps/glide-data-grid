import { GridCellKind, DataEditorProps } from "@glideapps/glide-data-grid";
import StarCellRenderer from "./star-cell";
import * as React from "react";

type DrawCallback = NonNullable<DataEditorProps["drawCustomCell"]>;

const cells = [StarCellRenderer];

export function useExtraCells(): {
    drawCustomCell: DrawCallback;
} {
    const drawCustomCell = React.useCallback<DrawCallback>((ctx, cell, theme, rect, hoverAmount) => {
        if (cell.kind !== GridCellKind.Custom) return false;
        for (const c of cells) {
            if (c.isMatch(cell)) {
                return c.draw(ctx, cell, theme, rect, hoverAmount);
            }
        }
        return false;
    }, []);

    return { drawCustomCell };
}
