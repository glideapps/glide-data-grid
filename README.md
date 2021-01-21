# Glide Data Grid

We built [Data Grid](https://grid.glideapps.com) as the basis for the [Glide Data Editor](https://docs.glideapps.com/all/reference/data-editor/introduction-to-the-data-editor). It's a React component built on top of HTML Canvas.

![Glide Data Grid](features.gif)

-   **It scales to millions of rows**. Cells are rendered lazily on demand for memory efficiency.
-   **Scrolling is extremely fast**. Native scrolling keeps everything buttery smooth.
-   **Fully Free & Open Source**. [MIT licensed](LICENSE) so you can use Grid in commerical projects.

## Installation

To add Grid to your own project:

```shell
$ npm install @glideapps/glide-data-grid
# Install peer dependencies
$ npm install direction marked react-responsive-carousel styled-components
```

## Usage

First you need to define your columns:

```
const columns: GridColumn[] = [
    { title: "Number", width: 100 },
    { title: "Square", width: 100 },
];
```

Next you need a function which, given column and row indexes, returns a cell to display. Here we have two columns, the first of which shows the index of the row, and the second the square of that number:

```
function getData([col, row]: readonly [number, number]): GridCell {
    let n: number;
    if (col === 0) {
        n = row;
    } else if (col === 1) {
        n = row * row;
    } else {
        throw new Error("This should not happen");
    }
    return {
        kind: GridCellKind.Number,
        data: n,
        displayData: n.toString(),
        allowOverlay: false,
    };
}
```

Now you can use Data Grid:

```
<DataEditorContainer width={500} height={300}>
    <DataEditor getCellContent={getData} columns={columns} rows={1000} />
</DataEditorContainer>
```

## Full API documentation

The full [API documentation is in the `API.md` file](API.md).

## FAQ

**Nothing shows up!**

Please read the [Prerequisites section in the docs](API.md).

**It crashes when I try to edit a cell!**

Please read the [Prerequisites section in the docs](API.md).
