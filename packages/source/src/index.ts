import { useCollapsingGroups } from "./use-collapsing-groups";
import { Props, ResultType } from "./types";
export { useMoveableColumns } from "./use-movable-columns";
import { useColumnSort } from "./use-column-sort";

export function useDataSource(p: Props): ResultType {
    // collapsing groups
    p = { ...p, ...useCollapsingGroups(p) };

    // column sort
    p = { ...p, ...useColumnSort(p) };

    return {
        columns: p.columns,
        getCellContent: p.getCellContent,
        getGroupDetails: p.getGroupDetails,
        onGridSelectionChange: p.onGridSelectionChange,
        onGroupHeaderClicked: p.onGroupHeaderClicked,
        onSelectedColumnsChange: p.onSelectedColumnsChange,
        gridSelection: p.gridSelection,
    };
}
