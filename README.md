<h1 align="center">
  <img src="https://raw.githubusercontent.com/glideapps/glide-data-grid/master/media/icon.png" width="224px"/><br/>
  <b>Glide Data Grid</b>
</h1>
<p align="center">A canvas-based data grid, supporting <b>millions</b> of rows, <b>rapid</b> updating, and <b>native scrolling</b>.</p>

<p align="center">Built as the basis for the <a href="https://www.glideapps.com/data-editor" target="_blank">Glide Data Editor</a>. <a href="https://www.glideapps.com/jobs#open-positions" target="_blank">We're hiring</a>.</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/glideapps/glide-data-grid/master/media/data-grid-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/glideapps/glide-data-grid/master/media/data-grid.png">
  <img alt="Glide Data Grid with sample data" src="https://raw.githubusercontent.com/glideapps/glide-data-grid/master/media/data-grid.png">
</picture>

[![Version](https://img.shields.io/npm/v/@glideapps/glide-data-grid?color=blue&label=latest&style=for-the-badge)](https://github.com/glideapps/glide-data-grid/releases)
[![React 16+](https://img.shields.io/badge/React-16+-00ADD8?style=for-the-badge&logo=react)](https://reactjs.org)
[![Code Coverage](https://img.shields.io/coverallsCoverage/github/glideapps/glide-data-grid?color=457aba&label=Cover&style=for-the-badge)](https://coveralls.io/github/glideapps/glide-data-grid)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@glideapps/glide-data-grid?color=success&label=bundle&style=for-the-badge)](https://bundlephobia.com/package/@glideapps/glide-data-grid)
[![License](https://img.shields.io/github/license/glideapps/glide-data-grid?color=red&style=for-the-badge)](https://github.com/glideapps/glide-data-grid/blob/main/LICENSE)
[![Made By Glide](https://img.shields.io/badge/❤_Made_by-Glide-11CCE5?style=for-the-badge&logo=none)](https://www.glideapps.com/jobs)

# 👩‍💻 Demo and features

Lot's of fun examples are in our [Storybook](https://glideapps.github.io/glide-data-grid).

You can also visit our [main site](https://grid.glideapps.com).

## Features

-   **It scales to millions of rows**. Cells are rendered lazily on demand for memory efficiency.
-   **Scrolling is extremely fast**. Native scrolling keeps everything buttery smooth.
-   **Supports multiple types of cells**. Numbers, text, markdown, bubble, image, drilldown, uri
-   **Fully Free & Open Source**. [MIT licensed](LICENSE), so you can use Grid in commercial projects.
-   **Editing is built in**.
-   **Resizable and movable columns**.
-   **Variable sized rows**.
-   **Merged cells**.
-   **Single and multi-select rows, cells, and columns**.
-   **Cell rendering can be fully customized**.

# ⚡ Quick Start

First make sure you are using React 16 or greater. Then install the data grid:

```shell
npm i @glideapps/glide-data-grid
```

You may also need to install the peer dependencies if you don't have them already:

```shell
npm i lodash marked react-responsive-carousel
```

Create a new `DataEditor` wherever you need to display lots and lots of data

```tsx
<DataEditor getCellContent={getData} columns={columns} rows={numRows} />
```

Don't forget to import mandatory CSS

```ts
import "@glideapps/glide-data-grid/dist/index.css";
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
function getData([col, row]: Item): GridCell {
    const person = data[row];

    if (col === 0) {
        return {
            kind: GridCellKind.Text,
            data: person.firstName,
            allowOverlay: false,
            displayData: person.firstName,
        };
    } else if (col === 1) {
        return {
            kind: GridCellKind.Text,
            data: person.lastName,
            allowOverlay: false,
            displayData: person.lastName,
        };
    } else {
        throw new Error();
    }
}
```

## Full API documentation

The full [API documentation is on the main site](https://grid.glideapps.com/docs/index.html).

# 📒 FAQ

**Nothing shows up!**

Please read the [Prerequisites section in the docs](packages/core/API.md).

**It crashes when I try to edit a cell!**

Please read the [Prerequisites section in the docs](packages/core/API.md).

**Does it work with screen readers and other a11y tools?**

Yes. Unfortunately none of the primary developers are accessibility users so there are likely flaws in the implementation we are not aware of. Bug reports welcome!

**Does it support my data source?**

Yes.

Data Grid is agnostic about the way you load/store/generate/mutate your data. What it requires is that you tell it which columns you have, how many rows, and to give it a function it can call to get the data for a cell in a specific row and column.

**Does it do sorting, searching, and filtering?**

Search is included. You provide the trigger, we do the search. [Example](https://glideapps.github.io/glide-data-grid/?path=/story/glide-data-grid-docs--search) in our storybook.

Filtering and sorting are something you would have to implement with your data source. There are hooks for adding column header menus if you want that.

The reason we don't add filtering/sorting in by default is that these are usually very application-specific, and can often also be implemented more efficiently in the data source, via a database query, for example.

**Can it do frozen columns?**

Yes!

**Can I render my own cells?**

Yes, but the renderer has to use HTML Canvas. [Simple example](https://glideapps.github.io/glide-data-grid/?path=/story/glide-data-grid-dataeditor-demos--draw-custom-cells) in our Storybook.

**Why does Data Grid use HTML Canvas?**

Originally we had implemented our Grid using virtualized rendering. We virtualized both in the horizontal and vertical direction using [react-virtualized](https://github.com/bvaughn/react-virtualized). The problem is simply scrolling performance. Once you need to load/unload hundreds of DOM elements per frame nothing can save you.

There are some hacks you can do like setting timers and entering into a "low fidelity" rendering mode where you only render a single element per cell. This works okay until you want to show hundreds of cells and you are right back to choppy scrolling. It also doesn't really look or feel great.

**I want to use this with Next.js / Vercel, but I'm getting weird errors**

The easiest way to use the grid with Next is to create a component which wraps up your grid and then import it as a dynamic.

home.tsx

```tsx
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

const Grid = dynamic(
    () => {
        return import("../components/Grid");
    },
    { ssr: false }
);

export const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Hi</h1>
                <Grid />
            </main>
        </div>
    );
};
```

grid.tsx

```tsx
import React from "react";
import DataEditor from "@glideapps/glide-data-grid";

export default function Grid() {
    return <DataEditor {...args} />;
}
```
