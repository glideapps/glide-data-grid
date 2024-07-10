"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCellsForSelection = void 0;
const React = __importStar(require("react"));
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
function useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortController, rows) {
    const getCellsForSelectionDirectWhenValid = React.useCallback(rect => {
        if (getCellsForSelectionIn === true) {
            const result = [];
            for (let y = rect.y; y < rect.y + rect.height; y++) {
                const row = [];
                for (let x = rect.x; x < rect.x + rect.width; x++) {
                    if (x < 0 || y >= rows) {
                        row.push({
                            kind: data_grid_types_js_1.GridCellKind.Loading,
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
                    { kind: data_grid_types_js_1.GridCellKind.Loading, allowOverlay: false },
                    ...row,
                ]);
            }
            return r.map(row => [{ kind: data_grid_types_js_1.GridCellKind.Loading, allowOverlay: false }, ...row]);
        }
        return getCellsForSelectionDirect(newRect, abortController.signal);
    }, [abortController.signal, getCellsForSelectionDirect, rowMarkerOffset]);
    const getCellsForSelection = getCellsForSelectionIn !== undefined ? getCellsForSelectionMangled : undefined;
    return [getCellsForSelection, getCellsForSelectionDirect];
}
exports.useCellsForSelection = useCellsForSelection;
//# sourceMappingURL=use-cells-for-selection.js.map