import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  GridCell,
  GridCellKind,
  GridColumn,
  Rectangle,
} from "@glideapps/glide-data-grid";
import DataEditor from "@glideapps/glide-data-grid";

function getDummyData([col, row]: readonly [number, number]): GridCell {
  if (col === 0) {
    return {
      kind: GridCellKind.RowID,
      data: `RowID ${col}, ${row}`,
      allowOverlay: false,
    };
  }
  if (col === 1) {
    return {
      kind: GridCellKind.Bubble,
      data: [
        `Bub ${col}`,
        `Bub ${row}`,
        `Bub ${col}`,
        `Bub ${row}`,
        `Bub ${col}`,
        `Bub ${row}`,
        `Bub ${col}`,
        `Bub ${row}`,
        `Bub ${col}`,
        `Bub ${row}`,
      ],
      allowOverlay: true,
    };
  }
  if (col === 2) {
    return {
      kind: GridCellKind.Image,
      data: [
        "https://i.imgur.com/5J0BftG.jpg",
        "https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581",
      ],
      allowOverlay: true,
      allowAdd: true,
    };
  }
  if (col === 3) {
    return {
      kind: GridCellKind.Markdown,
      data: `## Markdown has titles
And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.
- with
- lists
- that
- can
- be
- pretty
- long
                  `,
      allowOverlay: true,
    };
  }
  if (col === 4) {
    return {
      kind: GridCellKind.Number,
      data: "$10,352",
      allowOverlay: true,
      editData: 10352,
    };
  }
  if (col === 5) {
    return {
      kind: GridCellKind.Uri,
      data: "https://www.google.com",
      allowOverlay: true,
    };
  }
  if (col === 6) {
    return {
      kind: GridCellKind.Boolean,
      checked: row % 3 === 0 || row % 5 === 0,
      showUnchecked: true,
      allowEdit: false,
      allowOverlay: false,
    };
  }
  if (col === 7) {
    return {
      kind: GridCellKind.Text,
      // RTL test
      data: `הרפתקה חדשה`,
      editData: `הרפתקה חדשה`,
      allowOverlay: true,
    };
  }
  return {
    kind: GridCellKind.Text,
    data: `${col}, ${row} 🦝`,
    editData: `${col}, ${row} 🦝`,
    allowOverlay: true,
  };
}

function getDummyCols() {
  return [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ].map(
    (i) =>
      ({
        title: i.toString() + " is the longest header in the world",
        width: 120 + (i % 4) * 10,
        icon: "headerString",
        hasMenu: true,
      } as GridColumn)
  );
}

function App() {
  const [cols, setColumns] = React.useState(getDummyCols);

  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);

  const onVisibleRowsChanged = React.useCallback((range: Rectangle) => {
    setX(range.x);
    setY(range.y);
  }, []);

  const onColumnResized = React.useCallback(
    (col: GridColumn, newSize: number) => {
      const index = cols.indexOf(col);
      const newCols = [...cols];
      newCols[index] = {
        ...newCols[index],
        width: newSize,
      };
      setColumns(newCols);
    },
    [cols]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <DataEditor
          cellXOffset={x}
          cellYOffset={y}
          getCellContent={getDummyData}
          columns={cols}
          rows={1000}
          allowResize={true}
          onVisibleRowsChanged={onVisibleRowsChanged}
          onColumnResized={onColumnResized}
        />
      </header>
    </div>
  );
}

export default App;
