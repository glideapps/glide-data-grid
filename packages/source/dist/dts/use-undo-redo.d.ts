/// <reference types="react" resolution-mode="require"/>
import type { EditableGridCell, GridCell, GridSelection, Item, DataEditorRef } from "@glideapps/glide-data-grid";
export declare function useUndoRedo(gridRef: React.RefObject<DataEditorRef>, getCellContent: (cell: Item) => GridCell, onCellEdited: (cell: Item, newValue: EditableGridCell) => void, onGridSelectionChange?: (newVal: GridSelection) => void): {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onCellEdited: (cell: Item, newValue: EditableGridCell) => void;
    onGridSelectionChange: (newVal: GridSelection) => void;
    gridSelection: GridSelection | null;
};
