import { renderHook } from '@testing-library/react-hooks';
import { RowGroup, UseGroupsProps, useGroups } from './use-groups';
import type { GroupContentRow, GroupRow } from '../data-grid/data-grid-types';

const toggleGroup = jest.fn();

describe('useGroups', () => {
  it('should initialize with empty groupRows and rowsCount as 0', () => {
    const { result } = renderHook(() =>
      useGroups({
        groups: [],
        hasTrailingRow: false,
        toggleGroup,
      })
    );

    expect(result.current.rowsCount).toBe(0);
    expect(result.current.getRowDetails(0)).toBeUndefined();
    expect(result.current.getMangledCellLocation([0, 0])).toEqual([0, 0]);
  });

  it('should update groupRows and rowsCount when groups prop changes', () => {
    const groups = [
      {
        name: 'Group 1',
        rowsCount: 2,
        id: 'group1',
        groups: [],
        expanded: true,
        parentId: '',
      },
    ];

    const { result, rerender } = renderHook((props: UseGroupsProps) => useGroups(props), {
      initialProps: {
        groups: [],
        toggleGroup,
      },
    });

    expect(result.current.rowsCount).toBe(0);

    rerender({ groups, toggleGroup, hasTrailingRow: false });

    expect(result.current.rowsCount).toBe(3);
    expect(result.current.getRowDetails(0)).toEqual({
      allowOverlay: false,
      expanded: true,
      id: 'group1',
      kind: 'group',
      level: 1,
      name: 'Group 1',
      rowsCount: 2,
    });
    expect(result.current.getRowDetails(1)).toEqual({
      index: 0,
      kind: 'group-content',
      level: 2,
      groupId: 'group1',
    });
  });

  it('should toggle a group when onRowDetailsUpdated is called with a GroupRow', () => {
    const groups: RowGroup[] = [
      {
        name: 'Group 1',
        rowsCount: 2,
        id: 'group1',
        groups: [],
        expanded: true,
        parentId: '',
      },
    ];

    const { result } = renderHook(() =>
      useGroups({
        groups,
        toggleGroup,
      })
    );

    const groupRow = result.current.getRowDetails(0) as unknown as GroupRow;

    result.current.onRowDetailsUpdated(0, groupRow);

    expect(toggleGroup).toHaveBeenCalledWith(groupRow.id);
  });

  it('should handle getMangledCellLocation for GroupContentRow', () => {
    const groups: RowGroup[] = [
      {
        name: 'Group 1',
        rowsCount: 2,
        id: 'group1',
        groups: [],
        expanded: true,
        parentId: '',
      },
    ];

    const { result } = renderHook(() => useGroups({ groups }));

    const groupContentRow = result.current.getRowDetails(1) as unknown as GroupContentRow;
    const mangledCellLocation = result.current.getMangledCellLocation([0, 1]);

    expect(mangledCellLocation).toEqual([0, groupContentRow.index]);
  });
});
