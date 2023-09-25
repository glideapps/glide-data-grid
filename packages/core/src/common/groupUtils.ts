import { GridRow, GridRowKind } from '../data-grid/data-grid-types';
import type { RowGroup } from '../data-editor/use-groups';

export const getNestedGroupRowsCount = (group: RowGroup): number => {
  if (group === undefined) return 0;

  return (
    group.rowsCount +
    group.groups.reduce((acc, currentGroup) => acc + getNestedGroupRowsCount(currentGroup), 0)
  );
};

export const recursiveFlattenGroups = (
  groups: readonly RowGroup[],
  rows: GridRow[],
  level = 1,
  rowIndex = 0,
  hasTrailingRow: boolean
): { rows: GridRow[]; rowIndex: number } => {
  for (const group of groups) {
    rows.push({
      kind: GridRowKind.Group,
      level: level,
      name: group.name,
      expanded: group.expanded,
      id: group.id,
      allowOverlay: false,
    });

    if (!group.expanded) {
      rowIndex += getNestedGroupRowsCount(group);
      continue;
    }

    if (group.groups.length > 0) {
      rowIndex = recursiveFlattenGroups(
        group.groups,
        rows,
        level + 1,
        rowIndex,
        hasTrailingRow
      ).rowIndex;
    } else {
      for (let i = 0; i < group.rowsCount; i++) {
        rows.push({
          kind: GridRowKind.GroupContent,
          level: level + 1,
          index: rowIndex + i,
        });
      }
      rowIndex += group.rowsCount;

      if (hasTrailingRow) {
        rows.push({
          kind: GridRowKind.NewRow,
          index: rowIndex,
          level: level + 1,
          groupId: group.id,
        });
      }
    }
  }

  return { rows, rowIndex };
};

export const flattenGroups = (groups: readonly RowGroup[], hasTrailingRow: boolean): GridRow[] => {
  const rows: GridRow[] = [];
  return recursiveFlattenGroups(groups, rows, 1, 0, hasTrailingRow).rows;
};
