import { DataEditorProps, GridColumn, Theme } from "@glideapps/glide-data-grid";

export type ResultType = Pick<
    DataEditorProps,
    | "columns"
    | "getCellContent"
    | "onColumnMoved"
    | "getGroupDetails"
    | "onGridSelectionChange"
    | "onGroupHeaderClicked"
    | "onSelectedColumnsChange"
>;

interface ExtraProps {
    collapseGroups?: boolean;
    moveableColumns?: boolean;
    rows: number;
    sort?: {
        column: GridColumn;
    };
    freezeColumns: DataEditorProps["freezeColumns"];
    theme: Theme;
}

export type Props = ExtraProps & ResultType;
