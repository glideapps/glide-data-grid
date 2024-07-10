import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
const initialState = {
    undoHistory: [],
    redoHistory: [],
    canUndo: false,
    canRedo: false,
    isApplyingUndo: false,
    isApplyingRedo: false,
};
function reducer(state, action) {
    const newState = { ...state };
    switch (action.type) {
        case "undo":
            if (state.canUndo) {
                newState.undoHistory = [...state.undoHistory];
                const operation = newState.undoHistory.pop();
                newState.operation = operation;
                newState.canUndo = newState.undoHistory.length > 0;
                newState.isApplyingUndo = true;
                return newState;
            }
            return state;
        case "redo":
            if (state.canRedo) {
                newState.redoHistory = [...state.redoHistory];
                const operation = newState.redoHistory.pop();
                newState.operation = operation;
                newState.canRedo = newState.redoHistory.length > 0;
                newState.isApplyingRedo = true;
                return newState;
            }
            return state;
        case "operationApplied":
            newState.operation = undefined;
            newState.isApplyingRedo = false;
            newState.isApplyingUndo = false;
            return newState;
        case "edit":
            if (!state.isApplyingRedo && !state.isApplyingUndo) {
                // general case
                newState.undoHistory = [...state.undoHistory, action.batch];
                newState.redoHistory = [];
                newState.canUndo = true;
                newState.canRedo = false;
            }
            if (state.isApplyingUndo) {
                newState.redoHistory = [...state.redoHistory, action.batch];
                newState.canRedo = true;
            }
            if (state.isApplyingRedo) {
                newState.undoHistory = [...state.undoHistory, action.batch];
                newState.canUndo = true;
            }
            return newState;
        default:
            throw new Error("Invalid action");
    }
}
export function useUndoRedo(gridRef, getCellContent, onCellEdited, onGridSelectionChange) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const currentBatch = useRef(null);
    const timeout = useRef(null);
    const isApplyingUndoRef = useRef(false);
    const isApplyingRedoRef = useRef(false);
    useEffect(() => {
        isApplyingUndoRef.current = state.isApplyingUndo;
        isApplyingRedoRef.current = state.isApplyingRedo;
    }, [state.isApplyingUndo, state.isApplyingRedo]);
    const [gridSelection, setGridSelection] = useState(null);
    const gridSelectionRef = useRef(null);
    const onGridSelectionChangedEdited = useCallback((newVal) => {
        if (onGridSelectionChange) {
            onGridSelectionChange(newVal);
        }
        setGridSelection(newVal);
        gridSelectionRef.current = newVal;
    }, [onGridSelectionChange]);
    const wrappedOnCellEdited = useCallback((cell, newValue) => {
        const isApplyingUpdate = isApplyingUndoRef.current || isApplyingRedoRef.current;
        if (!isApplyingUpdate && gridSelectionRef.current) {
            clearTimeout(timeout.current);
            const previousValue = getCellContent(cell);
            if (currentBatch.current === null) {
                currentBatch.current = {
                    edits: [],
                    selection: gridSelectionRef.current,
                };
            }
            currentBatch.current.edits.push({ cell, newValue: previousValue });
            // When pasting lots of edits arrive sequentially. Undo/redo should replay in a batch so using a timeout to kick to the end of the event loop
            timeout.current = setTimeout(() => {
                if (currentBatch.current) {
                    dispatch({
                        type: "edit",
                        batch: currentBatch.current,
                    });
                    currentBatch.current = null;
                }
            }, 0);
        }
        // Continue with the edit
        onCellEdited(cell, newValue);
    }, [onCellEdited, getCellContent]);
    const undo = useCallback(() => {
        dispatch({ type: "undo" });
    }, [dispatch]);
    const redo = useCallback(() => {
        dispatch({ type: "redo" });
    }, [dispatch]);
    // Apply a batch of edits to the grid
    useEffect(() => {
        if (state.operation && gridSelectionRef.current && gridRef.current) {
            const cells = [];
            const previousState = {
                edits: [],
                selection: gridSelectionRef.current,
            };
            for (const edit of state.operation.edits) {
                const prevValue = getCellContent(edit.cell);
                previousState.edits.push({ cell: edit.cell, newValue: prevValue });
                onCellEdited(edit.cell, edit.newValue);
                cells.push({ cell: edit.cell });
            }
            setGridSelection(state.operation.selection);
            gridSelectionRef.current = state.operation.selection;
            gridRef.current.updateCells(cells);
            dispatch({
                type: "edit",
                batch: previousState,
            });
            dispatch({
                type: "operationApplied",
            });
        }
    }, [state.operation, gridRef, onCellEdited, setGridSelection, getCellContent]);
    // Attach the keyboard shortcuts. CMD+Z and CMD+SHIFT+Z on mac, CTRL+Z and CTRL+Y on windows.
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
                if (e.shiftKey) {
                    redo();
                }
                else {
                    undo();
                }
            }
            if (e.key === "y" && (e.metaKey || e.ctrlKey)) {
                redo();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [undo, redo]);
    return useMemo(() => {
        return {
            undo,
            redo,
            canUndo: state.canUndo,
            canRedo: state.canRedo,
            onCellEdited: wrappedOnCellEdited,
            onGridSelectionChange: onGridSelectionChangedEdited,
            gridSelection,
        };
    }, [undo, redo, wrappedOnCellEdited, state.canUndo, state.canRedo, onGridSelectionChangedEdited, gridSelection]);
}
//# sourceMappingURL=use-undo-redo.js.map