<h1 align="center">
  <img src="https://raw.githubusercontent.com/glideapps/glide-data-grid/master/icon.png" width="224px"/><br/>
  <b>Glide Data Grid</b>
</h1>
<p align="center">A relatively small HTML5 Canvas based data editor supporting <b>millions</b> of rows, <b>rapid</b> updating, and fully <b>native scrolling</b>. We built <a href="https://grid.glideapps.com" target="_blank">Data Grid</a> as the basis for the <a href="https://docs.glideapps.com/all/reference/data-editor/introduction-to-the-data-editor" target="_blank">Glide Data Editor</a>.</p>

[![Version](https://img.shields.io/badge/latest-v3.3.0-blue?style=for-the-badge&logo=none)](https://github.com/glideapps/glide-data-grid/releases)
[![React 16+](https://img.shields.io/badge/React-16+-00ADD8?style=for-the-badge&logo=react)](https://reactjs.org)
![Code Coverage](https://img.shields.io/coveralls/github/glideapps/glide-data-grid?color=457aba&label=Cover&style=for-the-badge)
[![Bundle Size](https://img.shields.io/badge/Bundle-45.6kb-success?style=for-the-badge&logo=none)](https://bundlephobia.com/package/@glideapps/glide-data-grid)
[![License MIT](https://img.shields.io/badge/license-mit-red?style=for-the-badge&logo=none)](https://github.com/glideapps/glide-data-grid/blob/main/LICENSE)
[![Made By Glide](https://img.shields.io/badge/❤_Made_by-Glide-11CCE5?style=for-the-badge&logo=none)](https://www.glideapps.com/jobs)

![Data Grid](https://raw.githubusercontent.com/glideapps/glide-data-grid/master/data-grid.jpg)

# 👩‍💻 Demo and features

Lot's of fun examples are in our [Storybook](https://glideapps.github.io/glide-data-grid)

## Features

-   **It scales to millions of rows**. Cells are rendered lazily on demand for memory efficiency.
-   **Scrolling is extremely fast**. Native scrolling keeps everything buttery smooth.
-   **Supports multiple types of cells**. Numbers, text, markdown, bubble, image, drilldown, uri
-   **Fully Free & Open Source**. [MIT licensed](LICENSE) so you can use Grid in commerical projects.
-   **Editing is built in**.
-   **Resizable and movable columns**.
-   **Variable sized rows**.
-   **Merged cells**.
-   **Single and multi-select rows, cells, and columns**.
-   **Cell rendering can be fully customized**.

# ⚡ Quick Start

First make sure you are using React 16 or greater. Then install the data grid:

```
npm i @glideapps/glide-data-grid
```

You may also need to install the peer dependencies if you don't have them already:

```
npm i lodash marked react-responsive-carousel styled-components
```

Create a new `DataEditor` wherever you need to display lots and lots of data

```tsx
// The container is not required, but is convenient for getting started
<DataEditorContainer width={1000} height={700}>
    <DataEditor getCellContent={getData} columns={columns} rows={numRows} />
</DataEditorContainer>
```

Making your columns is easy

```ts
// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
const columns: GridColumn[] = [
    { title: "First Name", width: 100 },
    { title: "Last Name", width: 100 },
];
```

Last provide data to the grid

```ts
// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]: readonly [number, number]): GridCell {
    const person = getData(row);

    if (col === 0) {
        return {
            kind: GridCellKind.Text,
            data: person.firstName,
            allowOverlay: false,
        };
    } else if (col === 1) {
        return {
            kind: GridCellKind.Text,
            data: person.lastName,
            allowOverlay: false,
        };
    } else {
        throw new Error();
    }
}
```

## Full API documentation

The full [API documentation is in the `API.md` file](API.md).

# 📒 FAQ

**Nothing shows up!**

Please read the [Prerequisites section in the docs](API.md).

**It crashes when I try to edit a cell!**

Please read the [Prerequisites section in the docs](API.md).

**Does it work with screen readers and other a11y tools?**

Yes. Unfortunately none of the primary developers are accessibility users so there are likely flaws in the implementation we are not aware of. Bug reports welcome!

**Does it support my data source?**

Yes.

Data Grid is agnostic about the way you load/store/generate/mutate your data. What it requires is that you tell it which columns you have, how many rows, and to give it a function it can call to get the data for a cell in a specific row and column.

**Does it do sorting, searching, and filtering?**

Search is included. You provide the trigger, we do the search. [Example](https://glideapps.github.io/glide-data-grid/?path=/story/dataeditor--built-in-search) in our storybook.

Filtering and sorting are something you would have to implement with your data source. There are hooks for adding column header menus if you want that.

The reason we don't add filtering/sorting in by default is that these are usually very application-specific, and can often also be implemented more efficiently in the data source, via a database query, for example.

**Can it do frozen columns?**

Yes!

**Can I render my own cells?**

Yes, but the renderer has to use HTML Canvas. [Simple example](https://glideapps.github.io/glide-data-grid/?path=/story/dataeditor--draw-custom-cells) in our Storybook.

**Why does Data Grid use HTML Canvas?**

Originally we had implemented our Grid using virtualized rendering. We virtualized both in the horizontal and vertical direction using [react-virtualized](https://github.com/bvaughn/react-virtualized). The problem is simply scrolling performance. Once you need to load/unload hundreds of DOM elements per frame nothing can save you.

There are some hacks you can do like setting timers and entering into a "low fidelity" rendering mode where you only render a single element per cell. This works okay until you want to show hundreds of cells and you are right back to choppy scrolling. It also doesn't really look or feel great.
