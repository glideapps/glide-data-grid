import type { GridRow, GroupContentRow, GroupRow, Item } from '../data-grid/data-grid-types';
import { GridRowKind } from '../data-grid/data-grid-types';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { DataEditorProps } from './data-editor';
import { flattenGroups } from '../common/groupUtils';

export type RowGroup = {
  name: string;
  rowsCount: number;
  id: string;
  groups: RowGroup[];
  expanded: boolean;
  parentId: string;
};

export interface UseGroupsProps {
  groups?: readonly RowGroup[];
  hasTrailingRow?: boolean;
  toggleGroup?: (groupLocation: string) => void;
}

export const useGroups = ({ groups = [], hasTrailingRow = false, toggleGroup }: UseGroupsProps) => {
  const [rowsCount, setRowsCount] = useState(0);
  const groupRows = useRef<GridRow[]>([]);

  useEffect(() => {
    if (Array.isArray(groups)) {
      groupRows.current = flattenGroups(groups, hasTrailingRow);
      setRowsCount(groupRows.current.length);
    }
  }, [hasTrailingRow, groups]);

  const getRowDetails: DataEditorProps['getRowDetails'] = useCallback(
    (row: number): GridRow => {
      return groupRows.current[row];
    },
    [groupRows]
  );

  const getMangledCellLocation = useCallback(([col, row]: Item): Item => {
    if (
      groupRows.current[row] !== undefined &&
      groupRows.current[row].kind === GridRowKind.GroupContent
    ) {
      return [col, (groupRows.current[row] as GroupContentRow).index ?? row];
    }
    return [col, row];
  }, []);

  const onRowDetailsUpdated = useCallback(
    (row: number, newRowValue: GridRow) => {
      if (
        groupRows.current[row] !== undefined &&
        groupRows.current[row].kind === GridRowKind.Group
      ) {
        toggleGroup?.((newRowValue as GroupRow).id);
      }
    },
    [toggleGroup]
  );

  return {
    getRowDetails,
    onRowDetailsUpdated,
    getMangledCellLocation,
    rowsCount: rowsCount,
  };
};
