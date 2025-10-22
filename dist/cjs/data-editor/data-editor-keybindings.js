import React from "react";
import { browserIsOSX } from "../common/browser-detect.js";
import { useDeepMemo } from "../common/utils.js";
export const keybindingDefaults = {
    downFill: false,
    rightFill: false,
    clear: true,
    closeOverlay: true,
    acceptOverlayDown: true,
    acceptOverlayUp: true,
    acceptOverlayLeft: true,
    acceptOverlayRight: true,
    copy: true,
    paste: true,
    cut: true,
    search: false,
    delete: true,
    activateCell: true,
    scrollToSelectedCell: true,
    goToFirstCell: true,
    goToFirstColumn: true,
    goToFirstRow: true,
    goToLastCell: true,
    goToLastColumn: true,
    goToLastRow: true,
    goToNextPage: true,
    goToPreviousPage: true,
    selectToFirstCell: true,
    selectToFirstColumn: true,
    selectToFirstRow: true,
    selectToLastCell: true,
    selectToLastColumn: true,
    selectToLastRow: true,
    selectAll: true,
    selectRow: true,
    selectColumn: true,
    goUpCell: true,
    goRightCell: true,
    goDownCell: true,
    goLeftCell: true,
    goUpCellRetainSelection: true,
    goRightCellRetainSelection: true,
    goDownCellRetainSelection: true,
    goLeftCellRetainSelection: true,
    selectGrowUp: true,
    selectGrowRight: true,
    selectGrowDown: true,
    selectGrowLeft: true,
};
function realizeKeybind(keybind, defaultVal) {
    if (keybind === true)
        return defaultVal;
    if (keybind === false)
        return "";
    return keybind;
}
export function realizeKeybinds(keybinds) {
    const isOSX = browserIsOSX.value;
    return {
        activateCell: realizeKeybind(keybinds.activateCell, " |Enter|shift+Enter"),
        clear: realizeKeybind(keybinds.clear, "any+Escape"),
        closeOverlay: realizeKeybind(keybinds.closeOverlay, "any+Escape"),
        acceptOverlayDown: realizeKeybind(keybinds.acceptOverlayDown, "Enter"),
        acceptOverlayUp: realizeKeybind(keybinds.acceptOverlayUp, "shift+Enter"),
        acceptOverlayLeft: realizeKeybind(keybinds.acceptOverlayLeft, "shift+Tab"),
        acceptOverlayRight: realizeKeybind(keybinds.acceptOverlayRight, "Tab"),
        copy: keybinds.copy,
        cut: keybinds.cut,
        delete: realizeKeybind(keybinds.delete, isOSX ? "Backspace|Delete" : "Delete"),
        downFill: realizeKeybind(keybinds.downFill, "primary+_68"),
        scrollToSelectedCell: realizeKeybind(keybinds.scrollToSelectedCell, "primary+Enter"),
        goDownCell: realizeKeybind(keybinds.goDownCell, "ArrowDown"),
        goDownCellRetainSelection: realizeKeybind(keybinds.goDownCellRetainSelection, "alt+ArrowDown"),
        goLeftCell: realizeKeybind(keybinds.goLeftCell, "ArrowLeft|shift+Tab"),
        goLeftCellRetainSelection: realizeKeybind(keybinds.goLeftCellRetainSelection, "alt+ArrowLeft"),
        goRightCell: realizeKeybind(keybinds.goRightCell, "ArrowRight|Tab"),
        goRightCellRetainSelection: realizeKeybind(keybinds.goRightCellRetainSelection, "alt+ArrowRight"),
        goUpCell: realizeKeybind(keybinds.goUpCell, "ArrowUp"),
        goUpCellRetainSelection: realizeKeybind(keybinds.goUpCellRetainSelection, "alt+ArrowUp"),
        goToFirstCell: realizeKeybind(keybinds.goToFirstCell, "primary+Home"),
        goToFirstColumn: realizeKeybind(keybinds.goToFirstColumn, "Home|primary+ArrowLeft"),
        goToFirstRow: realizeKeybind(keybinds.goToFirstRow, "primary+ArrowUp"),
        goToLastCell: realizeKeybind(keybinds.goToLastCell, "primary+End"),
        goToLastColumn: realizeKeybind(keybinds.goToLastColumn, "End|primary+ArrowRight"),
        goToLastRow: realizeKeybind(keybinds.goToLastRow, "primary+ArrowDown"),
        goToNextPage: realizeKeybind(keybinds.goToNextPage, "PageDown"),
        goToPreviousPage: realizeKeybind(keybinds.goToPreviousPage, "PageUp"),
        paste: keybinds.paste,
        rightFill: realizeKeybind(keybinds.rightFill, "primary+_82"),
        search: realizeKeybind(keybinds.search, "primary+f"),
        selectAll: realizeKeybind(keybinds.selectAll, "primary+a"),
        selectColumn: realizeKeybind(keybinds.selectColumn, "ctrl+ "),
        selectGrowDown: realizeKeybind(keybinds.selectGrowDown, "shift+ArrowDown"),
        selectGrowLeft: realizeKeybind(keybinds.selectGrowLeft, "shift+ArrowLeft"),
        selectGrowRight: realizeKeybind(keybinds.selectGrowRight, "shift+ArrowRight"),
        selectGrowUp: realizeKeybind(keybinds.selectGrowUp, "shift+ArrowUp"),
        selectRow: realizeKeybind(keybinds.selectRow, "shift+ "),
        selectToFirstCell: realizeKeybind(keybinds.selectToFirstCell, "primary+shift+Home"),
        selectToFirstColumn: realizeKeybind(keybinds.selectToFirstColumn, "primary+shift+ArrowLeft"),
        selectToFirstRow: realizeKeybind(keybinds.selectToFirstRow, "primary+shift+ArrowUp"),
        selectToLastCell: realizeKeybind(keybinds.selectToLastCell, "primary+shift+End"),
        selectToLastColumn: realizeKeybind(keybinds.selectToLastColumn, "primary+shift+ArrowRight"),
        selectToLastRow: realizeKeybind(keybinds.selectToLastRow, "primary+shift+ArrowDown"),
    };
}
export function useKeybindingsWithDefaults(keybindingsIn) {
    const keys = useDeepMemo(keybindingsIn);
    return React.useMemo(() => {
        if (keys === undefined)
            return realizeKeybinds(keybindingDefaults);
        const withBackCompatApplied = {
            ...keys,
            goToNextPage: keys?.goToNextPage ?? keys?.pageDown ?? keybindingDefaults.goToNextPage,
            goToPreviousPage: keys?.goToPreviousPage ?? keys?.pageUp ?? keybindingDefaults.goToPreviousPage,
            goToFirstCell: keys?.goToFirstCell ?? keys?.first ?? keybindingDefaults.goToFirstCell,
            goToLastCell: keys?.goToLastCell ?? keys?.last ?? keybindingDefaults.goToLastCell,
            selectToFirstCell: keys?.selectToFirstCell ?? keys?.first ?? keybindingDefaults.selectToFirstCell,
            selectToLastCell: keys?.selectToLastCell ?? keys?.last ?? keybindingDefaults.selectToLastCell,
        };
        return realizeKeybinds({
            ...keybindingDefaults,
            ...withBackCompatApplied,
        });
    }, [keys]);
}
//# sourceMappingURL=data-editor-keybindings.js.map