import { GridCellKind, DataEditorProps, ProvideEditorCallback, GridCell } from "@glideapps/glide-data-grid";
import StarCellRenderer from "./star-cell";
import * as React from "react";

type DrawCallback = NonNullable<DataEditorProps["drawCustomCell"]>;

const cells = [StarCellRenderer];

export function useExtraCells(): {
    drawCustomCell: DrawCallback;
    provideEditor: ProvideEditorCallback<GridCell>;
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

    const provideEditor = React.useCallback<ProvideEditorCallback<GridCell>>(cell => {
        if (cell.kind !== GridCellKind.Custom) return undefined;

        for (const c of cells) {
            if (c.isMatch(cell)) {
                return c.provideEditor(cell) as ReturnType<ProvideEditorCallback<GridCell>>;
            }
        }

        return undefined;
    }, []);

    return { drawCustomCell, provideEditor };
}
