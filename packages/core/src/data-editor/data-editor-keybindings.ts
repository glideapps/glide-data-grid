import React from "react";
import { browserIsOSX } from "../common/browser-detect.js";
import { useDeepMemo } from "../common/utils.js";

export type Keybind = boolean | string;

interface ForcedKeybinds {
    copy: boolean;
    cut: boolean;
    paste: boolean;
}

interface BackCompatKeybinds {
    readonly pageUp: boolean;
    readonly pageDown: boolean;
    readonly first: boolean;
    readonly last: boolean;
}

export interface ConfigurableKeybinds {
    readonly downFill: Keybind;
    readonly rightFill: Keybind;
    readonly clear: Keybind;
    readonly closeOverlay: Keybind;
    readonly acceptOverlayDown: Keybind;
    readonly acceptOverlayUp: Keybind;
    readonly acceptOverlayLeft: Keybind;
    readonly acceptOverlayRight: Keybind;
    readonly search: Keybind;
    readonly delete: Keybind;
    readonly activateCell: Keybind;

    // Navigation Keybinds
    readonly goToFirstColumn: Keybind;
    readonly goToLastColumn: Keybind;
    readonly goToFirstCell: Keybind;
    readonly goToLastCell: Keybind;
    readonly goToFirstRow: Keybind;
    readonly goToLastRow: Keybind;
    readonly goToNextPage: Keybind;
    readonly goToPreviousPage: Keybind;

    readonly goUpCell: Keybind;
    readonly goDownCell: Keybind;
    readonly goLeftCell: Keybind;
    readonly goRightCell: Keybind;

    readonly goUpCellRetainSelection: Keybind;
    readonly goDownCellRetainSelection: Keybind;
    readonly goLeftCellRetainSelection: Keybind;
    readonly goRightCellRetainSelection: Keybind;

    // Selection Keybinds
    readonly selectToFirstColumn: Keybind;
    readonly selectToLastColumn: Keybind;
    readonly selectToFirstCell: Keybind;
    readonly selectToLastCell: Keybind;
    readonly selectToFirstRow: Keybind;
    readonly selectToLastRow: Keybind;

    readonly selectGrowUp: Keybind;
    readonly selectGrowDown: Keybind;
    readonly selectGrowLeft: Keybind;
    readonly selectGrowRight: Keybind;

    readonly selectAll: Keybind;
    readonly selectRow: Keybind;
    readonly selectColumn: Keybind;
}

export type Keybinds = ConfigurableKeybinds & ForcedKeybinds & Partial<BackCompatKeybinds>;

export type RealizedKeybinds = Readonly<Record<keyof ConfigurableKeybinds, string>> & ForcedKeybinds;

export const keybindingDefaults: Keybinds = {
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

function realizeKeybind(keybind: Keybind, defaultVal: string): string {
    if (keybind === true) return defaultVal;
    if (keybind === false) return "";
    return keybind;
}

export function realizeKeybinds(keybinds: Keybinds): RealizedKeybinds {
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

export function useKeybindingsWithDefaults(keybindingsIn?: Partial<Keybinds>): RealizedKeybinds {
    const keys = useDeepMemo(keybindingsIn);
    return React.useMemo(() => {
        if (keys === undefined) return realizeKeybinds(keybindingDefaults);
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
