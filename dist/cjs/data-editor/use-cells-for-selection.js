import * as React from "react";
import { GridCellKind } from "../internal/data-grid/data-grid-types.js";
export function useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortController, rows) {
    const getCellsForSelectionDirectWhenValid = React.useCallback(rect => {
        if (getCellsForSelectionIn === true) {
            const result = [];
            for (let y = rect.y; y < rect.y + rect.height; y++) {
                const row = [];
                for (let x = rect.x; x < rect.x + rect.width; x++) {
                    if (x < 0 || y >= rows) {
                        row.push({
                            kind: GridCellKind.Loading,
                            allowOverlay: false,
                        });
                    }
                    else {
                        row.push(getCellContent([x, y]));
                    }
                }
                result.push(row);
            }
            return result;
        }
        return getCellsForSelectionIn?.(rect, abortController.signal) ?? [];
    }, [abortController.signal, getCellContent, getCellsForSelectionIn, rows]);
    const getCellsForSelectionDirect = getCellsForSelectionIn !== undefined ? getCellsForSelectionDirectWhenValid : undefined;
    const getCellsForSelectionMangled = React.useCallback(rect => {
        if (getCellsForSelectionDirect === undefined)
            return [];
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
                // eslint-disable-next-line unicorn/no-await-expression-member
                (await r()).map(row => [
                    { kind: GridCellKind.Loading, allowOverlay: false },
                    ...row,
                ]);
            }
            return r.map(row => [{ kind: GridCellKind.Loading, allowOverlay: false }, ...row]);
        }
        return getCellsForSelectionDirect(newRect, abortController.signal);
    }, [abortController.signal, getCellsForSelectionDirect, rowMarkerOffset]);
    const getCellsForSelection = getCellsForSelectionIn !== undefined ? getCellsForSelectionMangled : undefined;
    return [getCellsForSelection, getCellsForSelectionDirect];
}
//# sourceMappingURL=use-cells-for-selection.js.map