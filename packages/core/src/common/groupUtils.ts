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
          groupId: group.id,
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

export const findGroupById = (currentGroups: RowGroup[], groupId: string): RowGroup | undefined => {
  for (const group of currentGroups) {
    if (group.id === groupId) {
      return group;
    }

    const foundGroup = findGroupById(group.groups, groupId);
    if (foundGroup) {
      return foundGroup;
    }
  }
};

export const deleteGroupByGroupRowId = (
  rootGroups: RowGroup[],
  targetGroupRowId: string
): boolean => {
  // Extract the parent ID from the targetGroupRowId

  // Find the parent group and the group to delete

  const groupToDelete = findGroupById(rootGroups, targetGroupRowId);

  const parentId = groupToDelete?.parentId;

  const parentGroup =
    parentId !== undefined && parentId !== ''
      ? findGroupById(rootGroups, parentId)?.groups
      : rootGroups;

  if (!parentGroup || !groupToDelete) {
    return false;
  }

  // Find the index of the group to delete within its parent's groups
  const index = parentGroup.indexOf(groupToDelete);

  if (index >= 0) {
    parentGroup.splice(index, 1);

    // Recursively delete empty parent groups
    if (parentGroup.length === 0) {
      deleteGroupByGroupRowId(rootGroups, parentId!);
    }

    return true;
  }

  return false;
};
