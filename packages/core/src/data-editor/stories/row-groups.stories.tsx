import {
  BeautifulWrapper,
  Description,
  findGroup,
  useGroupMockDataGenerator,
  useMockDataGenerator,
} from './utils';
import React from 'react';
import { DataEditor, DataEditorProps } from '../data-editor';
import { SimpleThemeWrapper } from '../../stories/story-utils';
import { clearCell } from './data-editor-beautiful.stories';

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

export const RowGroups: React.VFC = () => {
  const { setCellValue, getCellContent, cols, setCellValueRaw } = useMockDataGenerator(
    20,
    false,
    false
  );
  const { groups, toggleGroup, setGroups } = useGroupMockDataGenerator(100, 5);

  const colsWithWidths = React.useMemo(() => {
    const c = [...cols];
    c[0] = {
      ...c[0],
      width: 250,
    };
    return c;
  }, [cols]);

  const mangledGetCellContent = React.useCallback(
    (cellLocation) => {
      return getCellContent(cellLocation);
    },
    [getCellContent]
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

  return (
    <BeautifulWrapper
      title="Row Grouping"
      description={<Description>Row grouping description goes here</Description>}
    >
      <DataEditor
        {...defaultProps}
        getCellContent={mangledGetCellContent}
        columns={colsWithWidths}
        rows={100}
        verticalBorder={false}
        rowMarkers="both"
        onCellEdited={mangledEditCell}
        groups={groups}
        onGroupToggle={toggleGroup}
        freezeColumns={1}
        onRowAppended={onRowAppended}
        rowMarkerWidth={45}
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
