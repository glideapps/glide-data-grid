"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUndoRedo = void 0;
const react_1 = require("react");
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
function useUndoRedo(gridRef, getCellContent, onCellEdited, onGridSelectionChange) {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const currentBatch = (0, react_1.useRef)(null);
    const timeout = (0, react_1.useRef)(null);
    const isApplyingUndoRef = (0, react_1.useRef)(false);
    const isApplyingRedoRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        isApplyingUndoRef.current = state.isApplyingUndo;
        isApplyingRedoRef.current = state.isApplyingRedo;
    }, [state.isApplyingUndo, state.isApplyingRedo]);
    const [gridSelection, setGridSelection] = (0, react_1.useState)(null);
    const gridSelectionRef = (0, react_1.useRef)(null);
    const onGridSelectionChangedEdited = (0, react_1.useCallback)((newVal) => {
        if (onGridSelectionChange) {
            onGridSelectionChange(newVal);
        }
        setGridSelection(newVal);
        gridSelectionRef.current = newVal;
    }, [onGridSelectionChange]);
    const wrappedOnCellEdited = (0, react_1.useCallback)((cell, newValue) => {
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
    const undo = (0, react_1.useCallback)(() => {
        dispatch({ type: "undo" });
    }, [dispatch]);
    const redo = (0, react_1.useCallback)(() => {
        dispatch({ type: "redo" });
    }, [dispatch]);
    // Apply a batch of edits to the grid
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
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
    return (0, react_1.useMemo)(() => {
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
exports.useUndoRedo = useUndoRedo;
//# sourceMappingURL=use-undo-redo.js.map