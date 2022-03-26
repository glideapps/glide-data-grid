import * as React from "react";
import type { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { CellArray, GridCell, GridCellKind } from "../data-grid/data-grid-types";
import type { DataEditorProps } from "./data-editor";

type CellsForSelectionCallback = NonNullable<DataGridSearchProps["getCellsForSelection"]>;
export function useCellsForSelection(
    getCellsForSelectionIn: CellsForSelectionCallback | true | undefined,
    getCellContent: DataEditorProps["getCellContent"],
    rowMarkerOffset: number,
    abortController: AbortController
) {
    const getCellsForSelectionDirectWhenValid = React.useCallback<CellsForSelectionCallback>(
        rect => {
            if (getCellsForSelectionIn === true) {
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
            return getCellsForSelectionIn?.(rect, abortController.signal) ?? [];
        },
        [abortController.signal, getCellContent, getCellsForSelectionIn]
    );
    const getCellsForSelectionDirect =
        getCellsForSelectionIn !== undefined ? getCellsForSelectionDirectWhenValid : undefined;
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
                const r = getCellsForSelectionDirect(newRect, abortController.signal);

                if (typeof r === "function") {
                    return async () =>
                        (await r()).map<CellArray[0]>(row => [
                            { kind: GridCellKind.Loading, allowOverlay: false },
                            ...row,
                        ]);
                }
                return r.map(row => [{ kind: GridCellKind.Loading, allowOverlay: false }, ...row]);
            }
            return getCellsForSelectionDirect(newRect, abortController.signal);
        },
        [abortController.signal, getCellsForSelectionDirect, rowMarkerOffset]
    );

    const getCellsForSelection = getCellsForSelectionIn !== undefined ? getCellsForSelectionMangled : undefined;

    return [getCellsForSelection, getCellsForSelectionDirect] as const;
}
