import { GridCellKind, DataEditorProps, ProvideEditorCallback, GridCell } from "@glideapps/glide-data-grid";
import StarCellRenderer from "./cells/star-cell";
import SparklineCellRenderer from "./cells/sparkline-cell";
import TagsCellRenderer from "./cells/tags-cell";
import UserProfileCellRenderer from "./cells/user-profile-cell";
import * as React from "react";

type DrawCallback = NonNullable<DataEditorProps["drawCell"]>;

const cells = [StarCellRenderer, SparklineCellRenderer, TagsCellRenderer, UserProfileCellRenderer];

export function useExtraCells(): {
    drawCell: DrawCallback;
    provideEditor: ProvideEditorCallback<GridCell>;
} {
    const drawCell = React.useCallback<DrawCallback>(args => {
        const { cell } = args;
        if (cell.kind !== GridCellKind.Custom) return false;
        for (const c of cells) {
            if (c.isMatch(cell)) {
                return c.draw(args, cell as any);
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

    return { drawCell, provideEditor };
}
