import { CustomRow, GridRow, GridRowKind } from "../data-grid/data-grid-types";
import type { RowGroup } from "../data-editor/use-groups";

export const getNestedGroupRowsCount = (group: RowGroup): number => {
    if (group === undefined) return 0;

    return group.rows.length + group.groups.reduce((acc, currentGroup) => acc + getNestedGroupRowsCount(currentGroup), 0);
};


export const recursiveFlattenGroups = (
    groups: RowGroup[],
    rows: GridRow[],
    level = 1,
    rowIndex = 0,
    groupExtraRow?: CustomRow
): GridRow[] => {
    for (const group of groups) {
        rows.push({
            kind: GridRowKind.Group,
            level: level,
            name: group.name,
            expanded: group.expanded,
            id: group.id,
            allowOverlay: false,
        });

        if (!group.expanded) continue;

        if (group.groups.length > 0) {
            recursiveFlattenGroups(group.groups, rows, level + 1, rowIndex, groupExtraRow);
        } else {
            for (const row of group.rows) {
                rows.push({
                    kind: GridRowKind.GroupContent,
                    level: level + 1,
                    index: row,
                });

            }
            if(groupExtraRow){
                rows.push(groupExtraRow)
            }
        }
    }

    return rows;
};

export const flattenGroups = (groups: RowGroup[], groupExtraRow?: CustomRow): GridRow[] => {
    const rows: GridRow[] = [];
   return recursiveFlattenGroups(groups, rows, 1, 0, groupExtraRow);
};
