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
    readonly scrollToSelectedCell: Keybind;
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
export declare const keybindingDefaults: Keybinds;
export declare function realizeKeybinds(keybinds: Keybinds): RealizedKeybinds;
export declare function useKeybindingsWithDefaults(keybindingsIn?: Partial<Keybinds>): RealizedKeybinds;
export {};
