import type { DataEditorProps, Theme } from "@glideapps/glide-data-grid";
type Props = Pick<DataEditorProps, "columns" | "onGroupHeaderClicked" | "onGridSelectionChange" | "getGroupDetails" | "gridSelection" | "freezeColumns"> & {
    theme: Theme;
};
type Result = Pick<DataEditorProps, "columns" | "onGroupHeaderClicked" | "onGridSelectionChange" | "getGroupDetails" | "gridSelection">;
export declare function useCollapsingGroups(props: Props): Result;
export {};
