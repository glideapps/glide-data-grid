import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import DataGridSearch, { DataGridSearchRef } from './data-grid-search';
import { CompactSelection, GridCellKind, TrailingRowType, getDefaultTheme } from '..';
import { act } from 'react-dom/test-utils';

const basicProps = {
  cellXOffset: 0,
  cellYOffset: 0,
  headerIcons: undefined,
  isDraggable: undefined,
  onCanvasBlur: () => undefined,
  onCanvasFocused: () => undefined,
  onCellFocused: () => undefined,
  onContextMenu: () => undefined,
  onDragEnd: () => undefined,
  onDragLeave: () => undefined,
  onDragOverCell: () => undefined,
  onDragStart: () => undefined,
  onDrop: () => undefined,
  onItemHovered: () => undefined,
  onKeyDown: () => undefined,
  onKeyUp: () => undefined,
  onMouseDown: () => undefined,
  onMouseUp: () => undefined,
  smoothScrollX: undefined,
  smoothScrollY: undefined,
  canvasRef: undefined,
  disabledRows: undefined,
  fillHandle: undefined,
  fixedShadowX: undefined,
  fixedShadowY: undefined,
  getGroupDetails: undefined,
  getRowThemeOverride: undefined,
  highlightRegions: undefined,
  imageWindowLoader: undefined,
  onHeaderMenuClick: undefined,
  translateX: undefined,
  translateY: undefined,
  drawCustomCell: undefined,
  drawFocusRing: undefined,
  drawHeader: undefined,
  isFocused: true,
  experimental: undefined,
  columns: [
    { title: 'A', width: 150 },
    { title: 'B', width: 160 },
  ],
  isFilling: false,
  enableGroups: false,
  theme: getDefaultTheme(),
  freezeColumns: 0,
  selection: {
    current: undefined,
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty(),
  },
  firstColAccessible: true,
  onMouseMove: () => undefined,
  getCellContent: () => ({
    kind: GridCellKind.Text as GridCellKind.Text,
    allowOverlay: false,
    data: 'test',
    displayData: 'test',
  }),
  groupHeaderHeight: 0,
  headerHeight: 36,
  accessibilityHeight: 50,
  trailingRowType: 'none' as TrailingRowType,
  rowHeight: 32,
  rows: 100,
  verticalBorder: () => true,
  getCellRenderer: () => undefined,
  lockColumns: 0,
  initialSize: [100, 100] as readonly [number, number],
  onRowMoved: () => undefined,
  maxColumnWidth: 100,
  minColumnWidth: 100,
  onVisibleRegionChanged: () => undefined,
  scrollToEnd: true,
  overscrollX: 0,
  overscrollY: 0,
  preventDiagonalScrolling: true,
  rightElementProps: {},
  rightElement: null,
  showMinimap: false,
  className: '',
  clientSize: [100, 100] as readonly [number, number],
  getCellsForSelection: () => [
    [
      {
        kind: GridCellKind.Text as GridCellKind.Text,
        allowOverlay: true,
        data: 'test',
        displayData: 'test',
      },
    ],
  ],
  searchInputRef: createRef<HTMLInputElement>(),
  scrollRef: createRef<HTMLDivElement>(),
};

describe('DataGridSearch', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(Date.now());
      return Math.random();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call subscribe callback after search', () => {
    const dataGridSearchRef = createRef<DataGridSearchRef>();
    const subscriber = jest.fn();

    render(<DataGridSearch {...basicProps} ref={dataGridSearchRef} />);

    act(() => {
      dataGridSearchRef.current?.subscribeToSearch(subscriber);
      dataGridSearchRef.current?.search('test');
    });

    expect(subscriber).toBeCalledWith({
      foundedRowsCount: 100,
      results: 100,
      rowsSearched: 100,
      selectedIndex: -1,
    });
  });

  it('should change selectedIndex after call searchNextResult and searchPrevResult', () => {
    const dataGridSearchRef = createRef<DataGridSearchRef>();
    const subscriber = jest.fn();

    render(<DataGridSearch {...basicProps} ref={dataGridSearchRef} />);

    act(() => {
      dataGridSearchRef.current?.subscribeToSearch(subscriber);
      dataGridSearchRef.current?.search('test');
    });

    expect(subscriber).toBeCalledWith({
      foundedRowsCount: 100,
      results: 100,
      rowsSearched: 100,
      selectedIndex: -1,
    });

    act(() => {
      dataGridSearchRef.current?.searchNextResult();
    });

    expect(subscriber).toBeCalledWith({
      foundedRowsCount: 100,
      results: 100,
      rowsSearched: 100,
      selectedIndex: 0,
    });

    act(() => {
      dataGridSearchRef.current?.searchPrevResult();
    });

    expect(subscriber).toBeCalledWith({
      foundedRowsCount: 100,
      results: 100,
      rowsSearched: 100,
      selectedIndex: 99,
    });
  });
});
