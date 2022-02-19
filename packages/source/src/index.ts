import { useCollapsingGroups } from "./use-collapsing-groups";
import { Props, ResultType } from "./types";
import { useMoveableColumns } from "./use-movable-columns";
import { useColumnSort } from "./use-column-sort";

export function useDataSource(p: Props): ResultType {
    // re-arrange columns automatically
    p = { ...p, ...useMoveableColumns(p) };

    // collapsing groups
    p = { ...p, ...useCollapsingGroups(p) };

    // column sort
    p = { ...p, ...useColumnSort(p) };

    return {
        columns: p.columns,
        getCellContent: p.getCellContent,
        getGroupDetails: p.getGroupDetails,
        onColumnMoved: p.onColumnMoved,
        onGridSelectionChange: p.onGridSelectionChange,
        onGroupHeaderClicked: p.onGroupHeaderClicked,
        onSelectedColumnsChange: p.onSelectedColumnsChange,
        gridSelection: p.gridSelection,
    };
}
