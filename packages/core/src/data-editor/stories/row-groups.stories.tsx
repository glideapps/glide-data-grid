import {
  BeautifulWrapper,
  Description,
  findGroup,
  useGroupMockDataGenerator,
  useMockDataGenerator,
} from './utils';
import React, { useState } from 'react';
import { DataEditor, DataEditorProps } from '../data-editor';
import { SimpleThemeWrapper } from '../../stories/story-utils';
import { clearCell } from './data-editor-beautiful.stories';
import type { GridSelection, GroupContentRow } from '../../data-grid/data-grid-types';
import { deleteGroupByGroupRowId, findGroupById } from '../../common/groupUtils';
import { range } from 'lodash';

const defaultProps: Partial<DataEditorProps> = {
  smoothScrollX: true,
  smoothScrollY: true,
  isDraggable: false,
  getCellsForSelection: true,
  rowMarkers: 'none',
  width: '100%',
};

export default {
  title: 'Glide-Data-Grid/DataEditor Demos',

  decorators: [
    (Story: React.ComponentType) => (
      <SimpleThemeWrapper>
        <Story />
      </SimpleThemeWrapper>
    ),
  ],
};

interface RowGroupsProps {
  enableGroups: number;
}

export const RowGroups: React.VFC<RowGroupsProps> = ({ enableGroups }) => {
  const [rowsCount, setRowsCount] = useState(100);
  const { setCellValue, cols, setCellValueRaw, colsMap } = useMockDataGenerator(20, false, false);
  const { groups, toggleGroup, setGroups } = useGroupMockDataGenerator(20, 2);

  const [rowData, setRowData] = React.useState(() => {
    return range(0, 300).map((_, rowIndex) =>
      colsMap.map((columnItem, columnItemIndex) => columnItem.getContent(columnItemIndex, rowIndex))
    );
  });

  const getCellContent = React.useCallback(
    ([col, row]) => {
      return rowData[row][col];
    },
    [rowData]
  );

  const colsWithWidths = React.useMemo(() => {
    const c = [...cols];
    c[0] = {
      ...c[0],
      width: 250,
    };
    return c;
  }, [cols]);

  const onDelete = React.useCallback(
    (rowIds: GridSelection, deleteGroups: GroupContentRow[]) => {
      const newGroups = structuredClone(groups);
      deleteGroups.forEach((item) => {
        const group = findGroupById(newGroups, item.groupId);
        if (group) {
          group.rowsCount--;
          if (group.rowsCount === 0) {
            deleteGroupByGroupRowId(newGroups, group.id);
          }
        }
      });

      setRowData((oldRowData) => oldRowData.filter((item, index) => !rowIds.rows.hasIndex(index)));
      setRowsCount((oldRowsCount) => oldRowsCount - rowIds.rows.length);
      setGroups(newGroups);
      return true;
    },
    [groups, setGroups]
  );

  const mangledEditCell = React.useCallback(
    (cellLocation, cell) => setCellValue(cellLocation, cell),
    [setCellValue]
  );

  const onRowAppended = React.useCallback(
    (row, groupId) => {
      setGroups((oldGroups) => {
        const copyGroups = [...oldGroups];
        const group = findGroup(copyGroups, groupId);
        if (group) {
          group.rowsCount++;
        }

        return copyGroups;
      });

      for (let c = 0; c < 6; c++) {
        const cell = getCellContent([c, row]);
        setCellValueRaw([c, row], clearCell(cell));
      }
    },
    [getCellContent, setCellValueRaw, setGroups]
  );

  const groups1 = enableGroups ? groups : [];

  console.log(groups1);
  return (
    <BeautifulWrapper
      title="Row Grouping"
      description={<Description>Row grouping description goes here</Description>}
    >
      <DataEditor
        {...defaultProps}
        getCellContent={getCellContent}
        columns={colsWithWidths}
        rows={rowsCount}
        verticalBorder={false}
        rowMarkers="both"
        onCellEdited={mangledEditCell}
        groups={groups}
        onGroupToggle={toggleGroup}
        freezeColumns={1}
        onRowAppended={onRowAppended}
        onDelete={onDelete}
        trailingRowOptions={{
          sticky: true,
          tint: true,
          hint: 'New row...',
          inEachGroup: true,
        }}
      />
    </BeautifulWrapper>
  );
};
(RowGroups as any).parameters = {
  options: {
    showPanel: false,
  },
};
