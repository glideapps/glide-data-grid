/* eslint-disable sonarjs/no-duplicate-string */
import * as React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import {
  CompactSelection,
  DataEditor,
  DataEditorProps,
  GridCell,
  GridCellKind,
  GridSelection,
  isSizedGridColumn,
  Item,
} from '../src';
import type { SizedGridColumn } from '../src/data-grid/data-grid-types';
import type { DataEditorRef } from '../src/data-editor/data-editor';
import { assert } from '../src/common/support';
import { createInitialGroups } from '../src/data-editor/stories/utils';

jest.mock('../src/common/resize-detector', () => {
  return {
    useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
  };
});

const BOOLEAN_DATA_LOOKUP: (boolean | null | undefined)[] = [true, false, undefined, null];
function getMockBooleanData(row: number): boolean | null | undefined {
  return BOOLEAN_DATA_LOOKUP[row % BOOLEAN_DATA_LOOKUP.length];
}

const makeCell = (cell: Item): GridCell => {
  const [col, row] = cell;
  switch (col) {
    case 0: {
      return {
        kind: GridCellKind.RowID,
        allowOverlay: false,
        data: `Data: ${col}, ${row}`,
      };
    }
    case 3: {
      return {
        kind: GridCellKind.Number,
        allowOverlay: true,
        data: 10,
        displayData: `${row}`,
      };
    }
    case 4: {
      return {
        kind: GridCellKind.Drilldown,
        allowOverlay: false,
        data: [
          {
            img: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
            text: 'Foobar',
          },
        ],
      };
    }
    case 5: {
      return {
        kind: GridCellKind.Protected,
        allowOverlay: false,
      };
    }
    case 6: {
      return {
        kind: GridCellKind.Bubble,
        allowOverlay: false,
        data: ['Foobar'],
      };
    }
    case 7: {
      return {
        kind: GridCellKind.Boolean,
        allowOverlay: false,
        data: getMockBooleanData(row),
        readonly: row === 5,
      };
    }
    case 8: {
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        data: `Data: ${col}, ${row}`,
        displayData: `שלום ${col}, ${row}`,
      };
    }
    case 9: {
      return {
        kind: GridCellKind.Markdown,
        allowOverlay: true,
        data: `# Header: ${col}, ${row}`,
      };
    }
    case 10: {
      return {
        kind: GridCellKind.Uri,
        allowOverlay: true,
        data: `https://example.com/${col}/${row}`,
      };
    }
    // No default
  }
  return {
    kind: GridCellKind.Text,
    allowOverlay: true,
    data: `Data: ${col}, ${row}`,
    displayData: `${col}, ${row}`,
    allowWrapping: true,
  };
};

const basicProps: DataEditorProps = {
  columns: [
    {
      title: 'A',
      width: 150,
      icon: 'headerRowID',
    },
    {
      title: 'B',
      width: 160,
      icon: 'headerCode',
    },
    {
      title: 'C',
      width: 170,
      icon: 'headerNumber',
    },
    {
      title: 'D',
      width: 180,
      icon: 'headerString',
    },
    {
      title: 'E',
      width: 40,
      icon: 'headerBoolean',
    },
    {
      title: 'F',
      width: 50,
      icon: 'headerUri',
    },
    {
      title: 'G',
      width: 60,
      icon: 'headerVideoUri',
    },
    {
      title: 'H',
      width: 70,
      icon: 'headerEmoji',
    },
    {
      title: 'I',
      width: 80,
      icon: 'headerImage',
    },
    {
      title: 'J',
      width: 90,
      icon: 'headerPhone',
    },
    {
      title: 'K',
      width: 90,
      icon: 'headerPhone',
    },
  ],
  getCellContent: makeCell,
  getCellsForSelection: true,
  groupHeaderHeight: 32,
  headerHeight: 36,
  rowHeight: 32,
  onRowAppended: () => undefined,
  trailingRowOptions: {
    hint: 'New row',
    sticky: true,
    tint: true,
  },
  rows: 1000,
};

function getCellCenterPositionForDefaultGrid(cell: Item): [number, number] {
  const [col, row] = cell;

  const xStart = basicProps.columns
    .slice(0, col)
    .reduce((acc, curr) => acc + (curr as SizedGridColumn).width, 0);
  const xOffset = (basicProps.columns[col] as SizedGridColumn).width / 2;

  const yStart = (basicProps.headerHeight as number) + row * (basicProps.rowHeight as number);
  const yOffset = (basicProps.rowHeight as number) / 2;

  return [xStart + xOffset, yStart + yOffset];
}

// const { ResizeObserver } = window;

beforeEach(() => {
  // delete (window as any).ResizeObserver;
  // window.ResizeObserver = jest.fn().mockImplementation(() => ({
  //     observe: jest.fn(),
  //     unobserve: jest.fn(),
  //     disconnect: jest.fn(),
  // }));

  Element.prototype.scrollTo = jest.fn();
  Element.prototype.scrollBy = jest.fn();
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(() => Promise.resolve()),
      readText: jest.fn(() =>
        Promise.resolve(`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`)
      ),
    },
  });
  Element.prototype.getBoundingClientRect = () => ({
    bottom: 1000,
    height: 1000,
    left: 0,
    right: 1000,
    top: 0,
    width: 1000,
    x: 0,
    y: 0,
    toJSON: () => '',
  });
  Image.prototype.decode = jest.fn();
});

function prep(resetTimers: boolean = true) {
  const scroller = document.getElementsByClassName('dvn-scroller').item(0);
  if (scroller !== null) {
    jest.spyOn(scroller, 'clientWidth', 'get').mockImplementation(() => 1000);
    jest.spyOn(scroller, 'clientHeight', 'get').mockImplementation(() => 1000);
  }

  act(() => {
    jest.runAllTimers();
  });
  if (resetTimers) {
    jest.useRealTimers();
  } else {
    act(() => {
      jest.runAllTimers();
    });
  }

  return scroller;
}

function scrollWidthMockImpl() {
  return basicProps.columns
    .map((c) => (isSizedGridColumn(c) ? c.width : 150))
    .reduce((pv, cv) => pv + cv, 0);
}

const Context: React.FC = (p) => {
  return (
    <>
      {p.children}
      <div id="portal"></div>
    </>
  );
};

// eslint-disable-next-line react/display-name
const EventedDataEditor = React.forwardRef<DataEditorRef, DataEditorProps>((p, ref) => {
  const [sel, setSel] = React.useState<GridSelection | undefined>(p.gridSelection);
  const [extraRows, setExtraRows] = React.useState(0);

  const onGridSelectionChange = React.useCallback(
    (s: GridSelection) => {
      setSel(s);
      p.onGridSelectionChange?.(s);
    },
    [p]
  );

  const onRowAppened = React.useCallback(() => {
    setExtraRows((cv) => cv + 1);
    void p.onRowAppended?.();
  }, [p]);

  return (
    <DataEditor
      {...p}
      ref={ref}
      gridSelection={sel}
      onGridSelectionChange={onGridSelectionChange}
      rows={p.rows + extraRows}
      onRowAppended={p.onRowAppended === undefined ? undefined : onRowAppened}
    />
  );
});

describe('data-editor', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Focus a11y cell', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep(false);

    const a11ycell = screen.getByTestId('glide-cell-0-5');
    fireEvent.focus(a11ycell);

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({ cell: [0, 5] }),
      })
    );
  });

  test('Click a11y cell', async () => {
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} />, {
      wrapper: Context,
    });
    prep(false);

    const a11ycell = screen.getByTestId('glide-cell-0-5');
    fireEvent.click(a11ycell);
  });

  test('emits contextmenu for cell', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor {...basicProps} onCellContextMenu={spy} onGridSelectionChange={spySelection} />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 150, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 150,
        localEventY: 16,
        location: [1, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).toHaveBeenCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({ cell: [1, 1] }),
      })
    );
  });

  test("don't emits contextmenu for group row", async () => {
    const groups = createInitialGroups(1000, 500);
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        rowMarkers="both"
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
        groups={groups}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test('emits contextmenu for cell but does not change selection if already selected - rows', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.fromSingleSelection(1),
        }}
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 150, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 150,
        localEventY: 16,
        location: [1, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).not.toHaveBeenCalled();
  });

  test('emits contextmenu for cell but does not change selection if already selected - cols', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.fromSingleSelection(1),
          rows: CompactSelection.empty(),
        }}
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 150, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 150,
        localEventY: 16,
        location: [1, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).not.toHaveBeenCalled();
  });

  test('emits contextmenu for cell but does not change selection if already selected - current.cell', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
          current: {
            cell: [1, 1],
            range: { x: 1, y: 1, width: 1, height: 1 },
            rangeStack: [],
          },
        }}
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 150, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 150,
        localEventY: 16,
        location: [1, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).not.toHaveBeenCalled();
  });

  test('emits contextmenu for cell but does not change selection if already selected - current.range', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
          current: {
            cell: [0, 0],
            range: { x: 0, y: 0, width: 2, height: 2 },
            rangeStack: [],
          },
        }}
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 150, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 150,
        localEventY: 16,
        location: [1, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).not.toHaveBeenCalled();
  });

  test('emits contextmenu for cell row markers', async () => {
    const spy = jest.fn();
    const spySelection = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        rowMarkers={'both'}
        onCellContextMenu={spy}
        onGridSelectionChange={spySelection}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    assert(scroller !== null);

    screen.getByTestId('data-grid-canvas');
    fireEvent.contextMenu(scroller, {
      clientX: 320, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      {
        allowOverlay: true,
        allowWrapping: true,
        data: 'Data: 1, 1',
        displayData: '1, 1',
        kind: 'text',
      },
      [1, 1],
      {
        bounds: { height: 33, width: 161, x: 186, y: 68 },
        button: 0,
        ctrlKey: false,
        isEdge: false,
        isFillHandle: false,
        isTouch: false,
        kind: 'cell',
        localEventX: 134,
        localEventY: 16,
        location: [2, 1],
        metaKey: false,
        preventDefault: expect.anything(),
        scrollEdge: [0, 0],
        shiftKey: false,
      },
      undefined
    );
    expect(spySelection).toHaveBeenCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({ cell: [1, 1] }),
      })
    );
  });

  test('Emits cell click', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
  });

  test('Emits cell click with touch', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.touchStart(canvas, {
      touches: [
        {
          clientX: 300, // Col B
          clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        },
      ],
    });

    fireEvent.touchEnd(canvas, {
      changedTouches: [
        {
          clientX: 300, // Col B
          clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        },
      ],
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
  });

  test('Emits activated event on double click', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellActivated={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1]);
  });

  test('Emits activated event on Enter key', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellActivated={spy} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      key: 'Enter',
    });

    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1]);
  });

  test('Emits activated event on Space key', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellActivated={spy} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      key: ' ',
    });

    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1]);
  });

  test("Doesn't emit cell click if mouseDown happened in a different cell", async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B, ends at x = 310
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 320, // Col C, started at x = 310
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test("Doesn't emit header click if mouseDown happened in a different cell", async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B, ends at x = 310
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 320, // Col C, started at x = 310
      clientY: 16, // Header
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test('Uneven rows cell click', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor {...basicProps} onCellClicked={spy} rowHeight={(r) => (r % 2 === 0 ? 32 : 64)} />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 64 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 64 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
  });

  test('Emits finished editing', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onFinishedEditing={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      keyCode: 74,
      key: 'j',
    });

    const overlay = screen.getByDisplayValue('j');

    jest.useFakeTimers();
    fireEvent.keyDown(overlay, {
      key: 'Enter',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toBeCalledWith(
      { allowOverlay: true, allowWrapping: true, data: 'j', displayData: '1, 1', kind: 'text' },
      [0, 1]
    );
  });

  test('Does not edit when validation fails', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellEdited={spy} validateCell={() => false} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      keyCode: 74,
      key: 'j',
    });

    const overlay = screen.getByDisplayValue('j');

    jest.useFakeTimers();
    fireEvent.keyDown(overlay, {
      key: 'Enter',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).not.toBeCalled();
  });

  test('Emits header click', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, expect.anything());
  });

  test('Emits header doubleclick', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onHeaderDoubleClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, expect.anything());
  });

  test('Emits header click on touch', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.touchStart(canvas, {
      touches: [
        {
          clientX: 300, // Col B
          clientY: 16, // Header
        },
      ],
    });

    fireEvent.touchEnd(canvas, {
      changedTouches: [
        {
          clientX: 300, // Col B
          clientY: 16, // Header
        },
      ],
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, expect.anything());
  });

  test('Does emit header click on row marker column', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} rowMarkers="both" onHeaderClicked={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 10, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Col B
      clientY: 16, // Header
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test('Group header sections', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        getGroupDetails={(g) => ({
          name: g,
          icon: 'headerCode',
        })}
        columns={basicProps.columns.map((c) => ({ ...c, group: 'A' }))}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.fromSingleSelection([0, 11]),
      rows: CompactSelection.empty(),
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 300, // Col B
      clientY: 16, // GroupHeader
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      rows: CompactSelection.empty(),
      columns: CompactSelection.fromSingleSelection([0, 11]),
    });
  });

  test('Rename group header shows', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        columns={basicProps.columns.map((c) => ({ ...c, group: c.title }))}
        onGroupHeaderRenamed={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Group Header
    });

    await new Promise((r) => window.setTimeout(r, 100));

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Group Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Group Header
    });

    expect(spy).not.toHaveBeenCalled();
    const groupInput = screen.getByTestId('group-rename-input');
    expect(groupInput).toBeInTheDocument();

    fireEvent.change(groupInput, {
      target: {
        value: 'Test',
      },
    });

    fireEvent.keyDown(groupInput, {
      key: 'Enter',
    });

    expect(spy).toHaveBeenCalledWith('B', 'Test');
  });

  test('Emits header menu click', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        columns={basicProps.columns.map((c) => ({ ...c, hasMenu: true }))}
        onHeaderMenuClick={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    await new Promise((r) => window.setTimeout(r, 100));

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, expect.anything());
  });

  test('Emits group header clicked on touch', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        columns={basicProps.columns.map((c) => ({ ...c, group: 'Main' }))}
        rowMarkers="both"
        onGroupHeaderClicked={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.touchStart(canvas, {
      touches: [
        {
          clientX: 300, // Col B
          clientY: 16, // Group header
        },
      ],
    });

    fireEvent.touchEnd(canvas, {
      changedTouches: [
        {
          clientX: 300, // Col B
          clientY: 16, // Group header
        },
      ],
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, expect.objectContaining({ location: [2, -2] }));
  });

  test('Emits item hover on correct location', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} rowMarkers="both" onItemHovered={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ location: [1, 1] }));
  });

  test('Emits mouse move on correct location', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} rowMarkers="both" onMouseMove={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ location: [1, 1] }));
  });

  test('Delete cell', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        onDelete={spy}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
          current: {
            cell: [2, 2],
            range: {
              x: 2,
              y: 2,
              height: 1,
              width: 1,
            },
            rangeStack: [],
          },
        }}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toHaveBeenCalledWith(
      {
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
        current: {
          cell: [2, 2],
          range: {
            x: 2,
            y: 2,
            height: 1,
            width: 1,
          },
          rangeStack: [],
        },
      },
      []
    );
  });

  test('Delete cell callback result', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        onDelete={(sel) => sel}
        onCellEdited={spy}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
          current: {
            cell: [2, 2],
            range: {
              x: 2,
              y: 2,
              height: 1,
              width: 1,
            },
            rangeStack: [],
          },
        }}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toHaveBeenCalledWith([2, 2], expect.anything());
  });

  test('Delete row', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        onDelete={spy}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.fromSingleSelection(2),
          current: undefined,
        }}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toHaveBeenCalled();
  });

  test('Delete range', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        onDelete={spy}
        gridSelection={{
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
          current: {
            cell: [2, 2],
            range: { x: 2, y: 2, width: 4, height: 10 },
            rangeStack: [],
          },
        }}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toHaveBeenCalledWith(
      {
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
        current: {
          cell: [2, 2],
          range: { x: 2, y: 2, width: 4, height: 10 },
          rangeStack: [],
        },
      },
      []
    );
  });

  test('Open and close overlay', async () => {
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    const overlay = screen.getByDisplayValue('Data: 1, 1');
    expect(overlay).toBeInTheDocument();

    jest.useFakeTimers();
    fireEvent.keyDown(canvas, {
      key: 'Escape',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(overlay).not.toBeInTheDocument();
  });

  test('Open markdown overlay', async () => {
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 980, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 980, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      clientX: 980, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 980, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    const overlay = screen.getByText('Header: 9, 1');
    expect(overlay).toBeInTheDocument();

    jest.useFakeTimers();
    fireEvent.keyDown(canvas, {
      key: 'Escape',
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(overlay).not.toBeInTheDocument();
  });

  test('Open overlay with keypress', async () => {
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      keyCode: 74,
      key: 'j',
    });

    fireEvent.keyUp(canvas, {
      keyCode: 74,
      key: 'j',
    });

    const overlay = screen.getByDisplayValue('j');
    expect(overlay).toBeInTheDocument();

    jest.useFakeTimers();
    fireEvent.keyDown(overlay, {
      key: 'Escape',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(overlay).not.toBeInTheDocument();
  });

  test('Send edit', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} onCellEdited={spy} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.keyDown(canvas, {
      keyCode: 74,
      key: 'j',
    });

    fireEvent.keyUp(canvas, {
      keyCode: 74,
      key: 'j',
    });

    act(() => {
      jest.runAllTimers();
    });

    const overlay = screen.getByDisplayValue('j');
    expect(overlay).toBeInTheDocument();

    fireEvent.keyDown(overlay, {
      key: 'Enter',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toBeCalledWith([1, 1], expect.objectContaining({ data: 'j' }));
    expect(overlay).not.toBeInTheDocument();
  });

  test('Directly toggle booleans', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');

    // We need to be focused on the grid for booleans to toggle automatically
    act(() => {
      ref.current?.focus();
    });
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();

    // [7, 0] is a checked boolean
    const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 0]);

    fireEvent.mouseDown(canvas, { clientX: checkedX, clientY: checkedY });
    fireEvent.mouseUp(canvas, { clientX: checkedX, clientY: checkedY });

    expect(spy).toBeCalledWith([7, 0], expect.objectContaining({ data: false }));

    // [7, 1] is an unchecked boolean
    const [uncheckedX, uncheckedY] = getCellCenterPositionForDefaultGrid([7, 1]);

    fireEvent.mouseDown(canvas, { clientX: uncheckedX, clientY: uncheckedY });
    fireEvent.mouseUp(canvas, { clientX: uncheckedX, clientY: uncheckedY });

    expect(spy).toBeCalledWith([7, 1], expect.objectContaining({ data: true }));

    // [7, 2] is an indeterminate boolean
    const [indeterminateX, indeterminateY] = getCellCenterPositionForDefaultGrid([7, 2]);

    fireEvent.mouseDown(canvas, { clientX: indeterminateX, clientY: indeterminateY });
    fireEvent.mouseUp(canvas, { clientX: indeterminateX, clientY: indeterminateY });

    expect(spy).toBeCalledWith([7, 2], expect.objectContaining({ data: true }));

    // [7, 3] is an empty boolean
    const [emptyX, emptyY] = getCellCenterPositionForDefaultGrid([7, 3]);

    fireEvent.mouseDown(canvas, { clientX: emptyX, clientY: emptyY });
    fireEvent.mouseUp(canvas, { clientX: emptyX, clientY: emptyY });

    expect(spy).toBeCalledWith([7, 3], expect.objectContaining({ data: true }));
  });

  test('Directly toggle readonly booleans', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');

    // We need to be focused on the grid for booleans to toggle automatically
    act(() => {
      ref.current?.focus();
    });
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();

    // [7, 0] is a checked boolean readonly
    const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 5]);

    fireEvent.mouseDown(canvas, { clientX: checkedX, clientY: checkedY });
    fireEvent.mouseUp(canvas, { clientX: checkedX, clientY: checkedY });

    expect(spy).not.toBeCalled();
  });

  test('Toggle readonly boolean with space', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');

    // We need to be focused on the grid for booleans to toggle automatically
    act(() => {
      ref.current?.focus();
    });
    act(() => {
      jest.runAllTimers();
    });

    // [7, 0] is a checked boolean readonly
    const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 5]);

    fireEvent.mouseDown(canvas, { clientX: checkedX + 20, clientY: checkedY });
    fireEvent.mouseUp(canvas, { clientX: checkedX + 20, clientY: checkedY });

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.keyDown(canvas, {
      key: ' ',
    });

    expect(spy).not.toBeCalled();
  });

  test('Arrow left', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowLeft',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [0, 1] }) })
    );
  });

  test('Arrow shift left', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      shiftKey: true,
      key: 'ArrowLeft',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 1],
          range: { x: 0, y: 1, width: 2, height: 1 },
        }),
      })
    );
  });

  test('Arrow right', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [2, 1] }) })
    );
  });

  test('Arrow shift right', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      shiftKey: true,
      key: 'ArrowRight',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 1],
          range: { x: 1, y: 1, width: 2, height: 1 },
        }),
      })
    );
  });

  test('Tab navigation', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'Tab',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [2, 1] }) })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'Tab',
      shiftKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 1] }) })
    );
  });

  test('Arrow down', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 2] }) })
    );
  });

  test('Arrow up', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowUp',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 1] }) })
    );
  });

  test('Search close', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
      wrapper: Context,
    });
    prep(false);

    const searchClose = screen.getByTestId('search-close-button');
    fireEvent.click(searchClose);
    act(() => {
      jest.runAllTimers();
    });
    expect(spy).toBeCalled();
  });

  test('Trigger search results', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
      wrapper: Context,
    });
    prep();

    jest.useFakeTimers();
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, {
      target: {
        value: '1, 2',
      },
    });
    act(() => {
      jest.runAllTimers();
    });

    const searchResult = screen.getByTestId('search-result-area');

    expect(searchResult).toHaveTextContent('111 results');

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
    });
    fireEvent.keyDown(searchInput, {
      shiftKey: true,
      key: 'Enter',
    });
    fireEvent.keyDown(searchInput, {
      key: 'Escape',
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toHaveBeenCalled();
  });

  test('Copy/paste', async () => {
    const spy = jest.fn();
    const pasteSpy = jest.fn(
      (_target: any, _values: any, _clipboardData?: any, _groupId?: any, _startGroupRow?: any) =>
        true
    );
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        onGridSelectionChange={spy}
        onPaste={(...args) => pasteSpy(...args)}
      />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    act(() => {
      jest.runAllTimers();
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      shiftKey: true,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 2],
          range: { x: 1, y: 2, width: 2, height: 1 },
        }),
      })
    );

    fireEvent.copy(window);
    act(() => {
      jest.runAllTimers();
    });
    expect(navigator.clipboard.writeText).toBeCalledWith('1, 2\t2, 2');

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) })
    );

    fireEvent.paste(window);
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
    await new Promise((r) => window.setTimeout(r, 10));
    expect(pasteSpy).toBeCalledWith(
      [1, 3],
      [
        ['Sunday', 'Dogs', 'https://google.com'],
        ['Monday', 'Cats', 'https://google.com'],
        ['Tuesday', 'Turtles', 'https://google.com'],
        ['Wednesday', 'Bears', 'https://google.com'],
        ['Thursday', 'L  ions', 'https://google.com'],
        ['Friday', 'Pigs', 'https://google.com'],
        [
          'Saturday',
          'Turkeys and some "quotes" and\na new line char "more quotes" plus a tab  .',
          'https://google.com',
        ],
      ],
      expect.any(DataTransfer),
      undefined,
      undefined
    );
  });

  test('Custom Copy', async () => {
    const spy = jest.fn();
    const onCopySpy = jest.fn();
    const onPasteSpy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        onGridSelectionChange={spy}
        onCopy={onCopySpy}
        onPaste={onPasteSpy}
      />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);

    fireEvent.focus(canvas);
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
    });
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      shiftKey: true,
    });

    fireEvent.copy(window);

    expect(onCopySpy).toHaveBeenCalledWith(
      [
        [
          expect.objectContaining({ displayData: '1, 0' }),
          expect.objectContaining({ displayData: '2, 0' }),
        ],
      ],
      expect.anything()
    );
  });

  test('Copy/paste with grouping', async () => {
    const groups = createInitialGroups(1000, 500);
    const spy = jest.fn();
    const pasteSpy = jest.fn(
      (_target: any, _values: any, _clipboardData?: any, _groupId?: any, _startGroupRow?: any) =>
        true
    );
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        groups={groups}
        rowMarkers="both"
        onGridSelectionChange={spy}
        onPaste={(...args) => pasteSpy(...args)}
      />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);
    fireEvent.mouseDown(canvas, {
      clientX: 340, // Col B
      clientY: 36 + 32 * 2 + 16 + 20, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 340, // Col B
      clientY: 36 + 32 * 2 + 16 + 20, // Row 2 (0 indexed)
    });

    act(() => {
      jest.runAllTimers();
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      shiftKey: true,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 3],
          range: { x: 1, y: 3, width: 2, height: 1 },
        }),
      })
    );

    fireEvent.copy(window);
    act(() => {
      jest.runAllTimers();
    });
    expect(navigator.clipboard.writeText).toBeCalledWith('1, 0\t2, 0');

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 4] }) })
    );

    fireEvent.paste(window);
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
    await new Promise((r) => window.setTimeout(r, 10));
    expect(pasteSpy).toBeCalledWith(
      [1, 1],
      [
        ['Sunday', 'Dogs', 'https://google.com'],
        ['Monday', 'Cats', 'https://google.com'],
        ['Tuesday', 'Turtles', 'https://google.com'],
        ['Wednesday', 'Bears', 'https://google.com'],
        ['Thursday', 'L  ions', 'https://google.com'],
        ['Friday', 'Pigs', 'https://google.com'],
        [
          'Saturday',
          'Turkeys and some "quotes" and\na new line char "more quotes" plus a tab  .',
          'https://google.com',
        ],
      ],
      expect.any(DataTransfer),
      '0-0-0',
      0
    );
  });

  test('onCellsEdited blocks onCellEdited', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onCellEdited={spy} onCellsEdited={() => true} />, {
      wrapper: Context,
    });
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.paste(window);
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
    await new Promise((r) => window.setTimeout(r, 10));
    expect(spy).not.toBeCalled();
  });

  test('Copy/paste with simple getCellsForSelection', async () => {
    const spy = jest.fn();
    const pasteSpy = jest.fn(
      (_target: any, _values: any, _clipboardData?: any, _groupId?: any, _startGroupRow?: any) =>
        true
    );
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        getCellsForSelection={true}
        onGridSelectionChange={spy}
        onPaste={(...args) => pasteSpy(...args)}
      />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    act(() => {
      jest.runAllTimers();
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      shiftKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 2],
          range: { x: 1, y: 2, width: 2, height: 1 },
        }),
      })
    );

    fireEvent.copy(window);
    act(() => {
      jest.runAllTimers();
    });
    expect(navigator.clipboard.writeText).toBeCalledWith('1, 2\t2, 2');

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) })
    );

    fireEvent.paste(window);
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(pasteSpy).toBeCalledWith(
      [1, 3],
      [
        ['Sunday', 'Dogs', 'https://google.com'],
        ['Monday', 'Cats', 'https://google.com'],
        ['Tuesday', 'Turtles', 'https://google.com'],
        ['Wednesday', 'Bears', 'https://google.com'],
        ['Thursday', 'L  ions', 'https://google.com'],
        ['Friday', 'Pigs', 'https://google.com'],
        [
          'Saturday',
          'Turkeys and some "quotes" and\na new line char "more quotes" plus a tab  .',
          'https://google.com',
        ],
      ],
      expect.any(DataTransfer),
      undefined,
      undefined
    );
  });

  test('Copy rows', async () => {
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          current: undefined,
          rows: CompactSelection.fromSingleSelection([3, 6]),
          columns: CompactSelection.empty(),
        }}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);

    fireEvent.copy(window);
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(navigator.clipboard.writeText).toBeCalled();
  });

  test('Copy cols', async () => {
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.fromSingleSelection([3, 6]),
          rows: CompactSelection.empty(),
          current: undefined,
        }}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    jest.spyOn(document, 'activeElement', 'get').mockImplementation(() => canvas);

    fireEvent.copy(window);
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(navigator.clipboard.writeText).toBeCalled();
  });

  test('Hover header does not fetch invalid cell', async () => {
    const spy = jest.fn(basicProps.getCellContent);

    jest.useFakeTimers();
    render(<DataEditor {...basicProps} rowMarkers="both" getCellContent={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');

    spy.mockClear();

    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test('Blit does not crash vertical scroll', async () => {
    jest.useFakeTimers();
    render(<DataEditor {...basicProps} />, {
      wrapper: Context,
    });
    const scroller = prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (scroller !== null) {
      jest
        .spyOn(scroller, 'scrollWidth', 'get')
        .mockImplementation(() =>
          basicProps.columns
            .map((c) => (isSizedGridColumn(c) ? c.width : 150))
            .reduce((pv, cv) => pv + cv, 0)
        );
      jest.spyOn(scroller, 'scrollHeight', 'get').mockImplementation(() => 1000 * 32 + 36);
      jest.spyOn(scroller, 'scrollLeft', 'get').mockImplementation(() => 0);
      jest.spyOn(scroller, 'scrollTop', 'get').mockImplementation(() => 55);
      fireEvent.scroll(scroller);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (scroller !== null) {
      jest.spyOn(scroller, 'scrollWidth', 'get').mockImplementation(scrollWidthMockImpl);
      jest.spyOn(scroller, 'scrollHeight', 'get').mockImplementation(() => 1000 * 32 + 36);
      jest.spyOn(scroller, 'scrollLeft', 'get').mockImplementation(() => 0);
      jest.spyOn(scroller, 'scrollTop', 'get').mockImplementation(() => 0);
      fireEvent.scroll(scroller);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(canvas).toBeInTheDocument();
  });

  test('Blit does not crash horizontal scroll', async () => {
    jest.useFakeTimers();
    render(
      <DataEditor
        highlightRegions={[
          {
            color: '#12345623',
            range: {
              x: 2,
              y: 2,
              width: 3,
              height: 10,
            },
          },
        ]}
        {...basicProps}
      />,
      {
        wrapper: Context,
      }
    );
    const scroller = prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (scroller !== null) {
      jest.spyOn(scroller, 'scrollWidth', 'get').mockImplementation(scrollWidthMockImpl);
      jest.spyOn(scroller, 'scrollHeight', 'get').mockImplementation(() => 1000 * 32 + 36);
      jest.spyOn(scroller, 'scrollLeft', 'get').mockImplementation(() => 55);
      jest.spyOn(scroller, 'scrollTop', 'get').mockImplementation(() => 0);
      fireEvent.scroll(scroller);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (scroller !== null) {
      jest.spyOn(scroller, 'scrollWidth', 'get').mockImplementation(scrollWidthMockImpl);
      jest.spyOn(scroller, 'scrollHeight', 'get').mockImplementation(() => 1000 * 32 + 36);
      jest.spyOn(scroller, 'scrollLeft', 'get').mockImplementation(() => 0);
      jest.spyOn(scroller, 'scrollTop', 'get').mockImplementation(() => 0);
      fireEvent.scroll(scroller);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(canvas).toBeInTheDocument();
  });

  test('New row', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        onRowAppended={spy}
        trailingRowOptions={{
          hint: 'New Row',
          sticky: true,
        }}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    jest.useFakeTimers();
    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 990, // Trailing row
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 990, // Trailing row
    });

    expect(spy).toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(Element.prototype.scrollTo).toHaveBeenCalled();
  });

  test('Click row marker', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
      wrapper: Context,
    });
    prep();

    jest.useFakeTimers();
    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(2),
    });
  });

  test('Shift click row marker', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection([2, 6]),
    });
  });

  test('Drag click row marker', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseMove(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection([2, 6]),
    });
  });

  test('Shift click row marker - no multi-select', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rowSelect={'single'}
        onGridSelectionChange={spy}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(5),
    });
  });

  test('Ctrl click row marker', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(2).add(5),
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(2),
    });
  });

  test('Ctrl click row marker - no multi', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rowSelect={'single'}
        onGridSelectionChange={spy}
        rowMarkers="both"
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10, // Row marker
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(5),
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 10, // Row marker
      clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
    });
  });

  test('Shift click grid selection', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        current: {
          cell: [1, 2],
          range: {
            x: 1,
            y: 2,
            width: 2,
            height: 5,
          },
          rangeStack: [],
        },
      })
    );
  });

  test('Fill down', async () => {
    const spy = jest.fn();
    const multiSpy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        keybindings={{
          downFill: true,
        }}
        onCellsEdited={multiSpy}
        onCellEdited={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      keyCode: 68,
      ctrlKey: true,
    });

    expect(spy).toHaveBeenCalledTimes(8);
    expect(multiSpy).toHaveBeenCalled();
  });

  test('Fill right', async () => {
    const spy = jest.fn();
    const multiSpy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        keybindings={{ rightFill: true }}
        onCellEdited={spy}
        onCellsEdited={multiSpy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      keyCode: 82,
      ctrlKey: true,
    });

    expect(spy).toHaveBeenCalledTimes(5);
    expect(multiSpy).toHaveBeenCalled();
  });

  test('Clear selection', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    spy.mockClear();

    fireEvent.keyDown(canvas, {
      key: 'Escape',
    });

    expect(spy).toBeCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
    });
  });

  test('Delete range', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 400, // Col C
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toBeCalledTimes(10);
  });

  test('Click out of bounds', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        columns={basicProps.columns.slice(0, 2)}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 100, // Col A
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 100, // Col A
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 200, // Col B
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 200, // Col B
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    spy.mockClear();

    fireEvent.mouseDown(canvas, {
      shiftKey: true,
      clientX: 700, // OOB
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      shiftKey: true,
      clientX: 700, // OOB
      clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
    });

    expect(spy).toBeCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
    });
  });

  test('Delete Column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.keyDown(canvas, {
      key: 'Delete',
    });

    expect(spy).toBeCalledTimes(1000);
  });

  test('Resize Column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onColumnMoved={spy} onColumnResize={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 310, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseMove(canvas, {
      clientX: 350,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 350,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({ icon: 'headerCode', title: 'B', width: 160 }, 200, 1, 200);
  });

  test('Auto Resize Column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onColumnResize={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 310, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 310,
      clientY: 16,
    });

    fireEvent.mouseDown(canvas, {
      clientX: 310, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 310,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({ icon: 'headerCode', title: 'B', width: 160 }, 50, 1, 50);
  });

  test('Resize Column End Called', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor {...basicProps} onColumnResize={jest.fn()} onColumnResizeEnd={spy} />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 310, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseMove(canvas, {
      clientX: 350,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 350,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({ icon: 'headerCode', title: 'B', width: 160 }, 200, 1, 200);
  });

  test('Resize Multiple Column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.fromSingleSelection([0, 5]),
          rows: CompactSelection.empty(),
          current: undefined,
        }}
        onColumnResize={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 310, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseMove(canvas, {
      clientX: 350,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 350,
      clientY: 16,
    });

    expect(spy).toBeCalledTimes(5);
  });

  test('Resize Last Column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        columns={basicProps.columns.slice(0, 2)}
        onColumnMoved={spy}
        onColumnResize={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 314, // Col B Right Edge
      clientY: 16, // Header
    });

    fireEvent.mouseMove(canvas, {
      clientX: 350,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 350,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({ icon: 'headerCode', title: 'B', width: 160 }, 200, 1, 200);
  });

  test('Select range with mouse', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2
    });

    spy.mockClear();
    fireEvent.mouseMove(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: { cell: [1, 2], range: { height: 11, width: 3, x: 1, y: 2 }, rangeStack: [] },
      })
    );

    fireEvent.mouseUp(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });
  });

  test('Select all', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        experimental={{ renderStrategy: 'double-buffer' }}
        rowMarkers="both"
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 10,
      clientY: 10,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10,
      clientY: 10,
    });

    expect(spy).toBeCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection([0, 1000]),
    });

    fireEvent.mouseDown(canvas, {
      clientX: 10,
      clientY: 10,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 10,
      clientY: 10,
    });

    expect(spy).toBeCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
    });
  });

  test('Minimap issues scroll', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rowMarkers="both"
        showMinimap={true}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const minimap = screen.getByTestId('minimap-container');

    fireEvent.mouseDown(minimap, {
      clientX: 940,
      clientY: 940,
    });

    fireEvent.mouseMove(minimap, {
      buttons: 1,
      clientX: 941,
      clientY: 941,
    });

    fireEvent.mouseUp(minimap, {
      clientX: 940,
      clientY: 940,
    });

    expect(Element.prototype.scrollTo).toBeCalled();
  });

  test('Click cell does not double-emit selectedrows/columns', async () => {
    const gridSelectionSpy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={gridSelectionSpy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    expect(gridSelectionSpy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 2],
          range: { height: 1, width: 1, x: 1, y: 2 },
        }),
      })
    );
    gridSelectionSpy.mockClear();

    fireEvent.keyDown(canvas, {
      key: 'Escape',
    });

    expect(gridSelectionSpy).toBeCalledWith({
      rows: CompactSelection.empty(),
      columns: CompactSelection.empty(),
    });
  });

  test('Span expansion', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();

    const getCellContent: typeof basicProps['getCellContent'] = (c) => {
      const [col, row] = c;

      if (row === 3 && col >= 2 && col <= 3) {
        return {
          ...basicProps.getCellContent([2, 3]),
          span: [2, 3] as const,
        };
      }

      return basicProps.getCellContent(c);
    };

    render(
      <EventedDataEditor
        {...basicProps}
        getCellContent={getCellContent}
        getCellsForSelection={true}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 350, // Col C
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      shiftKey: true,
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [2, 2],
          range: { x: 2, y: 2, width: 2, height: 2 },
        }),
      })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [2, 3],
          range: { x: 2, y: 3, width: 2, height: 1 },
        }),
      })
    );
  });

  test('Imperative Handle works', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    act(() => {
      void ref.current?.emit('delete');
      void ref.current?.emit('fill-right');
      void ref.current?.emit('fill-down');
      void ref.current?.emit('copy');
      void ref.current?.emit('paste');

      ref.current?.scrollTo(5, 10);
      ref.current?.updateCells([{ cell: [0, 0] }]);
    });
  });

  test('Imperative scrollTo false fire', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(5, 10);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).not.toBeCalled();
  });

  test('Imperative scrollTo cell', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(5, 500);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).toBeCalledWith(0, 15_101);
  });

  test('Imperative scrollTo pixel', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(5, {
        amount: 1500,
        unit: 'px',
      });
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).toBeCalledWith(0, 533);
  });

  test('Imperative scrollTo pixel start', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(
        5,
        {
          amount: 1500,
          unit: 'px',
        },
        undefined,
        undefined,
        undefined,
        {
          vAlign: 'start',
        }
      );
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).toBeCalledWith(0, 1464);
  });

  test('Imperative scrollTo pixel center', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(
        5,
        {
          amount: 1500,
          unit: 'px',
        },
        undefined,
        undefined,
        undefined,
        {
          vAlign: 'center',
        }
      );
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).toBeCalledWith(0, 998.5);
  });

  test('Imperative scrollTo pixel end', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
      wrapper: Context,
    });
    prep(false);

    act(() => {
      ref.current?.scrollTo(
        5,
        {
          amount: 1500,
          unit: 'px',
        },
        undefined,
        undefined,
        undefined,
        {
          vAlign: 'end',
        }
      );
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Element.prototype.scrollTo).toBeCalledWith(0, 533);
  });

  test('Imperative damage gets right cell', async () => {
    const spy = jest.fn(basicProps.getCellContent);
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(
      <EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />,
      {
        wrapper: Context,
      }
    );
    prep();

    spy.mockClear();
    act(() => {
      ref.current?.updateCells([{ cell: [1, 0] }]);
    });

    expect(spy).toBeCalledWith([1, 0]);
  });

  test('On-scroll does not spuriously fire on select', async () => {
    const spy = jest.fn(basicProps.getCellContent);
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(
      <EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 965,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 965,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(Element.prototype.scrollTo).not.toBeCalled();
  });

  test('Keyboard scroll with controlled selection does not double fire', async () => {
    const spy = jest.fn(basicProps.getCellContent);
    jest.useFakeTimers();
    const ref = React.createRef<DataEditorRef>();
    render(
      <EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 965,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 965,
    });

    act(() => {
      jest.runAllTimers();
    });

    // make sure we clear the mock in case a spurios scroll was emitted (test above)
    (Element.prototype.scrollTo as jest.Mock).mockClear();

    fireEvent.keyDown(canvas, { key: 'ArrowDown' });
    fireEvent.keyUp(canvas, { key: 'ArrowDown' });

    act(() => {
      jest.runAllTimers();
    });

    expect(Element.prototype.scrollTo).toBeCalledTimes(1);
  });

  test('Ctrl Arrow keys', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
      ctrlKey: true,
    });

    const cols = basicProps.columns.length;

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [1, 999] }) })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      ctrlKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [cols - 1, 999] }) })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowUp',
      ctrlKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [cols - 1, 0] }) })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowLeft',
      ctrlKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({ current: expect.objectContaining({ cell: [0, 0] }) })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
      ctrlKey: true,
      shiftKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [0, 0],
          range: { x: 0, y: 0, width: 1, height: 1000 },
        }),
      })
    );

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
      ctrlKey: true,
      shiftKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [0, 0],
          range: { x: 0, y: 0, width: cols, height: 1000 },
        }),
      })
    );
  });

  test('Select range with mouse going out of bounds', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    const columns = basicProps.columns.slice(0, 2);
    render(<EventedDataEditor {...basicProps} columns={columns} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2
    });

    spy.mockClear();
    fireEvent.mouseMove(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: expect.objectContaining({
          cell: [1, 2],
          range: { height: 11, width: 1, x: 1, y: 2 },
        }),
      })
    );

    fireEvent.mouseUp(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });
  });

  test('Select all keybind', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        keybindings={{ selectAll: true }}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.keyDown(canvas, {
      key: 'a',
      ctrlKey: true,
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
      current: {
        cell: [0, 0],
        range: {
          x: 0,
          y: 0,
          width: 11,
          height: 1000,
        },
        rangeStack: [],
      },
    });
  });

  test('Select column with blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rowSelectionBlending="mixed"
        columnSelectionBlending="mixed"
        rangeSelectionBlending="mixed"
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: ' ',
      ctrlKey: true,
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.fromSingleSelection(1),
      rows: CompactSelection.empty(),
      current: {
        cell: [1, 1],
        range: {
          x: 1,
          y: 1,
          width: 1,
          height: 1,
        },
        rangeStack: [],
      },
    });
  });

  test('Select column', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: ' ',
      ctrlKey: true,
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.fromSingleSelection(1),
      rows: CompactSelection.empty(),
      current: undefined,
    });
  });

  test('Select row with blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rowSelectionBlending="mixed"
        columnSelectionBlending="mixed"
        rangeSelectionBlending="mixed"
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: ' ',
      shiftKey: true,
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(1),
      current: {
        cell: [1, 1],
        range: {
          x: 1,
          y: 1,
          width: 1,
          height: 1,
        },
        rangeStack: [],
      },
    });
  });

  test('Select row', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: ' ',
      shiftKey: true,
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(1),
      current: undefined,
    });
  });

  test('Select range with mouse then permissive move', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 * 2 + 16, // Row 2
    });

    fireEvent.mouseMove(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });

    fireEvent.mouseUp(canvas, {
      clientX: 600, // Col B
      clientY: 36 + 32 * 12 + 16, // Row 2
    });

    spy.mockClear();

    fireEvent.keyDown(canvas, {
      key: 'ArrowLeft',
      altKey: true,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: {
          cell: [0, 2],
          range: { height: 1, width: 1, x: 0, y: 2 },
          rangeStack: [{ height: 11, width: 3, x: 1, y: 2 }],
        },
      })
    );
  });

  test('Does not emits header menu click when move', async () => {
    const spy = jest.fn();

    jest.useFakeTimers();
    render(
      <DataEditor
        {...basicProps}
        columns={basicProps.columns.map((c) => ({ ...c, hasMenu: true }))}
        onHeaderMenuClick={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16 + 200, // Not Header
    });

    await new Promise((r) => window.setTimeout(r, 100));

    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 16 + 200, // Not Header
    });

    fireEvent.mouseMove(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 16, // Header
    });

    expect(spy).not.toHaveBeenCalled();
  });

  test('Use fill handle', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} onCellEdited={spy} fillHandle={true} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 290, // Col A
      clientY: 36 + 30, // Row 2
    });

    fireEvent.mouseUp(canvas, {
      clientX: 290, // Col A
      clientY: 36 + 30, // Row 2
    });

    fireEvent.mouseDown(canvas, {
      clientX: 308, // Col A
      clientY: 36 + 30, // Row 2
    });

    fireEvent.mouseMove(canvas, {
      clientX: 308, // Col A
      clientY: 36 + 32 * 2 + 16, // Row 2
    });

    fireEvent.mouseUp(canvas, {
      clientX: 308, // Col A
      clientY: 36 + 32 * 2 + 16, // Row 2
    });

    expect(spy).toBeCalledTimes(2);
  });

  test('Use fill handle into blank', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} rows={3} onCellEdited={spy} fillHandle={true} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 290,
      clientY: 36 + 30,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 290,
      clientY: 36 + 30,
    });

    fireEvent.mouseDown(canvas, {
      clientX: 308,
      clientY: 36 + 30,
    });

    fireEvent.mouseMove(canvas, {
      clientX: 308,
      clientY: 36 + 32 * 5 + 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 308,
      clientY: 36 + 32 * 5 + 16,
    });

    expect(spy).toBeCalledTimes(2);
  });

  test('Use fill handle into trailing row', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        rows={3}
        onCellEdited={spy}
        fillHandle={true}
        onRowAppended={() => undefined}
        trailingRowOptions={{
          sticky: true,
        }}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 290,
      clientY: 36 + 30,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 290,
      clientY: 36 + 30,
    });

    fireEvent.mouseDown(canvas, {
      clientX: 308,
      clientY: 36 + 30,
    });

    fireEvent.mouseMove(canvas, {
      clientX: 308,
      clientY: 800,
    });

    fireEvent.mouseMove(canvas, {
      clientX: 308,
      clientY: 995,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 308,
      clientY: 995,
    });

    expect(spy).toBeCalledTimes(2);
  });

  test('Close overlay with enter key', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        experimental={{
          strict: true,
        }}
        {...basicProps}
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep(false);

    const canvas = screen.getByTestId('data-grid-canvas');
    fireEvent.mouseDown(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.mouseUp(canvas, {
      clientX: 300, // Col B
      clientY: 36 + 32 + 16, // Row 1 (0 indexed)
    });

    fireEvent.keyDown(canvas, {
      key: 'Enter',
    });

    jest.runAllTimers();

    spy.mockClear();
    fireEvent.keyDown(canvas, {
      key: 'Enter',
    });

    expect(spy).toHaveBeenCalledWith({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
      current: {
        cell: [1, 2],
        range: {
          x: 1,
          y: 2,
          width: 1,
          height: 1,
        },
        rangeStack: [],
      },
    });
  });

  test('should call onDrop when onColumnMoved resolves with true', async () => {
    const spyOnDrop = jest.fn();
    const spyOnColumnMoved = jest.fn(() => Promise.resolve(true));

    jest.useFakeTimers();

    render(
      <EventedDataEditor
        {...basicProps}
        onRowMoved={jest.fn()}
        onColumnMoved={spyOnColumnMoved}
        onDrop={spyOnDrop}
      />
    );

    const scroller = prep(false);

    act(() => fireDragStartEvent(scroller));
    act(() => fireDropEvent(scroller));

    expect(spyOnColumnMoved).toBeCalled();
    await waitFor(() => expect(spyOnDrop).toBeCalled());
  });

  test("shouldn't call onDrop when onColumnMoved resolves with false", async () => {
    const spyOnDrop = jest.fn();
    const spyOnColumnMoved = jest.fn(() => Promise.resolve(false));

    jest.useFakeTimers();

    render(
      <EventedDataEditor
        {...basicProps}
        onRowMoved={jest.fn()}
        onColumnMoved={spyOnColumnMoved}
        onDrop={spyOnDrop}
      />
    );

    const scroller = prep(false);

    act(() => fireDragStartEvent(scroller));
    act(() => fireDropEvent(scroller));

    expect(spyOnColumnMoved).toBeCalled();
    await waitFor(() => expect(spyOnDrop).not.toBeCalled());
  });
});

function fireDragStartEvent(element: Element | null) {
  const dragStartEvent = new Event('dragstart', { bubbles: true });
  Object.defineProperty(dragStartEvent, 'clientX', { value: 300 });
  Object.defineProperty(dragStartEvent, 'clientY', { value: 16 });
  Object.defineProperty(dragStartEvent, 'dataTransfer', { value: null });
  element?.dispatchEvent(dragStartEvent);
}

function fireDropEvent(element: Element | null) {
  const dropEvent = new Event('drop', { bubbles: true });
  element?.dispatchEvent(dropEvent);
}
