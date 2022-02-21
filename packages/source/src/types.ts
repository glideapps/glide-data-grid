import { DataEditorProps, GridColumn, Theme } from "@glideapps/glide-data-grid";

export type ResultType = Pick<
    DataEditorProps,
    | "columns"
    | "getCellContent"
    | "getGroupDetails"
    | "onGridSelectionChange"
    | "onGroupHeaderClicked"
    | "onSelectedColumnsChange"
    | "gridSelection"
    | "rows"
>;

interface ExtraProps {
    collapseGroups?: boolean;
    moveableColumns?: boolean;
    sort?: {
        column: GridColumn;
        mode?: "default" | "raw";
    };
    freezeColumns: DataEditorProps["freezeColumns"];
    theme: Theme;
}

export type Props = ExtraProps & ResultType;
