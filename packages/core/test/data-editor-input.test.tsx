/* eslint-disable sonarjs/no-duplicate-string */
import * as React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { DataEditor, DataEditorProps, GridCell, GridCellKind, GridSelection, Item } from '../src';
import type { DataEditorRef } from '../src/data-editor/data-editor';
import { CompactSelection } from '../src/data-grid/data-grid-types';

jest.mock('../src/common/resize-detector', () => {
  return {
    useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
  };
});

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
        data: row % 2 === 0,
        readonly: false,
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
    // No default
  }
  return {
    kind: GridCellKind.Text,
    allowOverlay: true,
    data: `Data: ${col}, ${row}`,
    displayData: `${col}, ${row}`,
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
  rowMarkers: 'both',
  rowMarkerWidth: 50,
  rows: 1000,
};

beforeEach(() => {
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
  }

  return scroller;
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

describe('data-editor-input', () => {
  test('Select range - single-cell', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<EventedDataEditor {...basicProps} rangeSelect="cell" onGridSelectionChange={spy} />, {
      wrapper: Context,
    });
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      clientX: 350,
      clientY: 36 + 32 * 2 + 16,
    });

    fireEvent.mouseMove(canvas, {
      clientX: 650,
      clientY: 36 + 32 * 12 + 16,
    });

    fireEvent.mouseUp(canvas, {
      clientX: 650,
      clientY: 36 + 32 * 12 + 16,
    });

    expect(spy).toBeCalledWith(
      expect.objectContaining({
        current: {
          cell: [1, 2],
          range: { height: 1, width: 1, x: 1, y: 2 },
          rangeStack: [],
        },
      })
    );
  });

  test('Select range - single-cell with row/column blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          columns: CompactSelection.fromSingleSelection(2),
          rows: CompactSelection.fromSingleSelection(3),
        }}
        rangeSelect="cell"
        rowSelectionBlending="mixed"
        rangeSelectionBlending="mixed"
        columnSelectionBlending="mixed"
        onGridSelectionChange={spy}
      />,
      {
        wrapper: Context,
      }
    );
    prep();
    const canvas = screen.getByTestId('data-grid-canvas');

    fireEvent.mouseDown(canvas, {
      ctrlKey: true,
      clientX: 350,
      clientY: 36 + 32 * 2 + 16,
    });

    fireEvent.mouseMove(canvas, {
      ctrlKey: true,
      clientX: 650,
      clientY: 36 + 32 * 12 + 16,
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 650,
      clientY: 36 + 32 * 12 + 16,
    });

    expect(spy).toBeCalledWith({
      current: {
        cell: [1, 2],
        range: { height: 1, width: 1, x: 1, y: 2 },
        rangeStack: [],
      },
      columns: CompactSelection.fromSingleSelection(2),
      rows: CompactSelection.fromSingleSelection(3),
    });
  });

  test('Select row - single-cell with row blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          current: {
            cell: [1, 2],
            range: { height: 1, width: 1, x: 1, y: 2 },
            rangeStack: [],
          },
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
        }}
        rangeSelect="cell"
        rowSelectionBlending="mixed"
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
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    fireEvent.mouseMove(canvas, {
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    expect(spy).toBeCalledWith({
      current: {
        cell: [1, 2],
        range: { height: 1, width: 1, x: 1, y: 2 },
        rangeStack: [],
      },
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(3),
    });
  });

  test('Select row - single-cell/single-row with row blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          current: {
            cell: [1, 2],
            range: { height: 1, width: 1, x: 1, y: 2 },
            rangeStack: [],
          },
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
        }}
        rangeSelect="cell"
        rowSelect="single"
        rowSelectionBlending="mixed"
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
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    fireEvent.mouseMove(canvas, {
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 20,
      clientY: 36 + 32 * 3 + 16,
    });

    expect(spy).toBeCalledWith({
      current: {
        cell: [1, 2],
        range: { height: 1, width: 1, x: 1, y: 2 },
        rangeStack: [],
      },
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection(3),
    });
  });

  test('Select col - single-cell with col blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          current: {
            cell: [1, 2],
            range: { height: 1, width: 1, x: 1, y: 2 },
            rangeStack: [],
          },
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
        }}
        rangeSelect="cell"
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
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    fireEvent.mouseMove(canvas, {
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({
      current: {
        cell: [1, 2],
        range: { height: 1, width: 1, x: 1, y: 2 },
        rangeStack: [],
      },
      columns: CompactSelection.fromSingleSelection(1),
      rows: CompactSelection.empty(),
    });
  });

  test('Select col - single-cell/single-col with col blending', async () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <EventedDataEditor
        {...basicProps}
        gridSelection={{
          current: {
            cell: [1, 2],
            range: { height: 1, width: 1, x: 1, y: 2 },
            rangeStack: [],
          },
          columns: CompactSelection.empty(),
          rows: CompactSelection.empty(),
        }}
        rangeSelect="cell"
        columnSelect="single"
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
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    fireEvent.mouseMove(canvas, {
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    fireEvent.mouseUp(canvas, {
      ctrlKey: true,
      clientX: 220,
      clientY: 16,
    });

    expect(spy).toBeCalledWith({
      current: {
        cell: [1, 2],
        range: { height: 1, width: 1, x: 1, y: 2 },
        rangeStack: [],
      },
      columns: CompactSelection.fromSingleSelection(1),
      rows: CompactSelection.empty(),
    });
  });
});
