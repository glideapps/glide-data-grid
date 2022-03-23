import * as React from "react";
import { GridCell, GridCellKind } from "../data-grid/data-grid-types";
import type { DataEditorProps } from "./data-editor";

type CellsForSelectionCallback = NonNullable<DataEditorProps["getCellsForSelection"]>;
export function useCellsForSelection(
    getCellsForSelectionIn: CellsForSelectionCallback | undefined,
    getCellContent: DataEditorProps["getCellContent"],
    allowSimple: boolean,
    rowMarkerOffset: number
) {
    const getCellsForSelectionDirectWhenValid = React.useCallback<CellsForSelectionCallback>(
        rect => {
            if (getCellsForSelectionIn === undefined && allowSimple) {
                const result: GridCell[][] = [];

                for (let y = rect.y; y < rect.y + rect.height; y++) {
                    const row: GridCell[] = [];
                    for (let x = rect.x; x < rect.x + rect.width; x++) {
                        if (x < 0) {
                            row.push({
                                kind: GridCellKind.Loading,
                                allowOverlay: false,
                            });
                        } else {
                            row.push(getCellContent([x, y]));
                        }
                    }
                    result.push(row);
                }

                return result;
            }
            return getCellsForSelectionIn?.(rect) ?? [];
        },
        [getCellContent, getCellsForSelectionIn, allowSimple]
    );
    const getCellsForSelectionDirect =
        getCellsForSelectionIn !== undefined || allowSimple ? getCellsForSelectionDirectWhenValid : undefined;
    const getCellsForSelectionMangled = React.useCallback<CellsForSelectionCallback>(
        rect => {
            if (getCellsForSelectionDirect === undefined) return [];
            const newRect = {
                ...rect,
                x: rect.x - rowMarkerOffset,
            };
            if (newRect.x < 0) {
                newRect.x = 0;
                newRect.width--;
                return getCellsForSelectionDirect(newRect).map(row => [
                    { kind: GridCellKind.Loading, allowOverlay: false },
                    ...row,
                ]);
            }
            return getCellsForSelectionDirect(newRect);
        },
        [getCellsForSelectionDirect, rowMarkerOffset]
    );

    const getCellsForSelection =
        getCellsForSelectionIn !== undefined || allowSimple ? getCellsForSelectionMangled : undefined;

    return [getCellsForSelection, getCellsForSelectionDirect] as const;
}
