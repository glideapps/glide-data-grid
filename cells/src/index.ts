import { GridCellKind, DataEditorProps, ProvideEditorCallback, GridCell } from "@glideapps/glide-data-grid";
import StarCellRenderer from "./cells/star-cell";
import SparklineCellRenderer from "./cells/sparkline-cell";
import TagsCellRenderer from "./cells/tags-cell";
import * as React from "react";

type DrawCallback = NonNullable<DataEditorProps["drawCustomCell"]>;

const cells = [StarCellRenderer, SparklineCellRenderer, TagsCellRenderer];

export function useExtraCells(): {
    drawCustomCell: DrawCallback;
    provideEditor: ProvideEditorCallback<GridCell>;
} {
    const drawCustomCell = React.useCallback<DrawCallback>((ctx, cell, theme, rect, hoverAmount) => {
        if (cell.kind !== GridCellKind.Custom) return false;
        for (const c of cells) {
            if (c.isMatch(cell)) {
                return c.draw(ctx, cell as any, theme, rect, hoverAmount);
            }
        }
        return false;
    }, []);

    const provideEditor = React.useCallback<ProvideEditorCallback<GridCell>>(cell => {
        if (cell.kind !== GridCellKind.Custom) return undefined;

        for (const c of cells) {
            if (c.isMatch(cell)) {
                return c.provideEditor(cell as any) as ReturnType<ProvideEditorCallback<GridCell>>;
            }
        }

        return undefined;
    }, []);

    return { drawCustomCell, provideEditor };
}
