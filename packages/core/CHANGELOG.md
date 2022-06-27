# 4.2.0 Release Notes

## 🥳 New Features

### 🌯 Text Wrapping

![image](https://user-images.githubusercontent.com/30443/175222777-6d39bff7-c4d5-41ef-96c0-389dcb75af17.png)

Just set `allowWrapping` to true on your `TextCell`

### 🗓️ Date Picker Cell

![image](https://user-images.githubusercontent.com/30443/175223015-822fb0e9-ad3c-476c-a8ba-0aebd78d0c6e.png)

Available in the `glide-data-grid-cells` package.

### ✅ Data Validation

![image](https://user-images.githubusercontent.com/30443/175223127-fdf278bf-ca67-4ba0-8f7a-a1a1f785609d.png)

Let your users know the value they entered will not be accepted. You can also coerce values as they type.

Just provide the `validateCell` callback

```ts
readonly validateCell?: (cell: Item, newValue: EditableGridCell) => boolean | EditableGridCell;
```

### ➗ Percentage column sizing

https://user-images.githubusercontent.com/30443/175350434-740c017d-3897-486c-a3ef-476d714d3d61.mp4

If your columns do not fill the entire width of the allocated area you can now allocate the leftover space to whatever column you want by setting the `grow` property on your column.

### 🖱️🖱️ Double click to size column

https://user-images.githubusercontent.com/30443/175350873-e8360b6c-b030-4977-96cd-19dcc115f03b.mp4

## 🦾 Minor Improvements

-   `DropdownCell` now attempts to follow theme.
-   `highlightRegions` now can be set to have a solid color outline.
-   Row Markers now display a handle when row drag and drop is enabled.
-   `appendRow` now available in imperative handle, thank you @pzcfg
-   `onColumnResize` now passes the index of the resized column as well as the column itself.
-   Improve column resize performance.

## 🐞 Bug Fixes

-   Protected cell rendering now handles being in selection correctly.
-   Dragging on non-resizeable columns no longer shows a resize indicator.
-   Search keybinding now works when caps-lock is pressed.
-   Improve NextJS compatibility
-   Disabling vertical border on the freeze column edge works correctly now
-   Not every browser supports `window.navigator.clipboard` and we no longer crash.
-   Newly appended rows with default values no longer get overwritten.
-   Measurement of many cells improved

# 4.1.0 Release Notes

## 🚨 Deprecations

-   `BooleanCell.showUnchecked` now deprecated and replaced with passing null as the BooleanCell value.
-   `BooleanCell.allowEdit` now deprecated and replace with `BooleanCell.readonly`.

Both deprecated options continue to work as intended, but implementors should begin migrating to the new options.

## 😲 New Features

### 🚣‍♂️ Improved support for styling of trailing row

`trailingRowOptions` of a `GridColumn` may now include a `themeOverride` and a `disabled` boolean which do what they say.

### ✅⁉️ Boolean cell supports indeterminate and empty states

![image](https://user-images.githubusercontent.com/30443/170390114-67106193-e0ba-4d0b-af5a-e6e40fe5a752.png)

`BooleanCell` can now take `null` or `undefined` as its `data` to show empty or indeterminate states respectively. To make this easier to remember, named exports are included for `BooleanIndeterminate` and `BooleanEmpty`.

### 👉👈 Support for overriding text alignment in cells

All `GridCell` types now support a `contentAlign` parameter which can be set to `"right" | "left" | "center"` and will cause the text in the cell to be aligned as requested. Thanks to @LukasMasuch

### 🪥 Custom cells can now handle Paste with ease

Custom cell renders can now optionally provide an `onPaste` callback which receives the `CustomCells` data property and a paste string. Implementors should return back a new `data` value which will then be used to create a new cell to pass to `onCellEdited`. This allows `onPaste` for custom cells to work the same as it does for all built in cells.

All cells shipped in `glide-data-grid-cells` have been updated to support the new mechanism.

### 🐳 Mass paste handling made easier

`onCellsEdited` will be invoked if multiple cells are to be pasted into. This receives a list of all cells which are about to receive an `onCellEdited` callback due to the paste or other mass edit event. This is intended to allow more efficient handling to implementors and minimize render cycles.

### 🕺 Basic animation support for custom cells

During a draw event for a custom cell, the cell may now call `args.requestAnimationFrame()` out of the passed args to the draw event. This will trigger the cell to be drawn again in the near term future for doing animations. Draw rate automatically throttles to around 30FPS after a fixed time with no breaks in animation.

## 🐜💪 Minor Improvements

-   `CompactSelection.remove` now supports removing a slice instead of just an index. Thanks to @BrianHung
-   Custom editors no longer automatically commit the tempValue when finished editing is called, allowing for editing to be properly cancelled by the custom editor.
-   Text entry into a cell now more eagerly being edit mode. This makes things like entering a negative number much easier and improves foreign language support.
-   Top and right edges of the grid will no longer draw a double border in some cases, thank you @LukasMasuch
-   Visually center text with better algorithm which accounts for oddities from font to font
-   Boolean cells now supported in paste.

## 🪲 Bug Fixes

-   Slight improvements to the newline handling for overlay editors.
-   Custom cells are now properly included in search results via the `copyData` property.
-   Values copied out of the grid now copy raw values into HTML and display values into text. This improves copy/paste interop inside of Glide Data Grid.
-   Ideal height calculation for Grid now properly accounts for trailing row.
-   Focus will no longer be lost when interacting with cells outside of the visual viewport, thank you @BrianHung
-   Fix `isDraggable`

# 4.0.0 Release Notes

## 🚨🚨 Breaking API Changes

### 📦 DataEditorContainer gone

The `DataEditorContainer` wrapper is dead. Long live the now permanently infused `DataEditorContainer`. The `DataEditor` now has optional width/height properties which act exactly like how the container used to work, when not set the DataEditor will now attempt to reasonably self size.

Further a `className` can now be passed to have direct control over the container sizing. Warning, messing around too much with the container may cause very unexpected behavior.

### ✅ Selection API changes

The selection of the Data Grid has been unified into a single object. This dramatically reduces the complexity of handling selection scenarios involving multiple types of selection, watching for clearing of selections, and responding to selection states.

```ts
interface GridSelection {
    readonly current?: {
        readonly cell: readonly [number, number];
        readonly range: Readonly<Rectangle>;
        readonly rangeStack: readonly Readonly<Rectangle>[];
    };
    readonly columns: CompactSelection;
    readonly rows: CompactSelection;
}
```

This means that the `selectedColumns` and `selectedRows` properties are now a part of the `selection` property. The new `rangeStack` is used when selecting multiple cell ranges.

### getCellsForSelection changes

`getCellsForSelection` has a different API in 4.0 due to the GridSelection changes. Instead of passing a GridSelection it simply passes a Rectangle.

To further improve the consistency of data access for developers, `getCellsForSelection` can be implemented by passing `true`. This causes the data grid to internally use `getCellContent` whenever `getCellsForSelection` would normally be needed.

### onDelete replacing onDeleteRows

`onDeleteRows` is gone and replaced with `onDelete`.

```ts
onDelete?: (selection: GridSelection) => boolean | GridSelection;
```

The onDelete callback receives the current GridSelection and returns either a boolean indicating if the deletion event should continue or a new GridSelection which will be deleted instead. This is useful if, for example, you wish to delete rows entirely when they selected rather than simply clearing their contents.

### 🔍 Search Changes

Now that `getCellsForSelection` can be trivially default implemented, search depends on a `getCellsForSelection` implementation being set, even if it's just the default `true` option.

## 🥳💃 New Features

### ⌨️ Keybinding Improvements

4.0.0 introduces a lot of improvements to keybinding handling to be more in line with the suggested [aria keybindings](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role#keyboard_interactions),

Keybindings can be controlled with the newly introduced `keybinding` property which takes a list of flags to enable/disable certain key combos.

```ts
const keybindingDefaults: Keybinds = {
    selectAll: true,
    selectRow: true,
    selectColumn: true,
    downFill: false,
    rightFill: false,
    pageUp: false,
    pageDown: false,
    clear: true,
    copy: true,
    paste: true,
    search: false,
    first: true,
    last: true,
};
```

| Key Combo                    | Default | Flag                | Description                                                                              |
| ---------------------------- | ------- | ------------------- | ---------------------------------------------------------------------------------------- |
| Arrow                        | ✔️      | N/A                 | Moves the currently selected cell and clears other selections                            |
| Shift + Arrow                | ✔️      | N/A                 | Extends the current selection range in the direction pressed.                            |
| Alt + Arrow                  | ✔️      | N/A                 | Moves the currently selected cell and retains the current selection                      |
| Ctrl/Cmd + Arrow \| Home/End | ✔️      | N/A                 | Move the selection as far as possible in the direction pressed.                          |
| Ctrl/Cmd + Shift + Arrow     | ✔️      | N/A                 | Extends the selection as far as possible in the direction pressed.                       |
| Shift + Home/End             | ✔️      | N/A                 | Extends the selection as far as possible in the direction pressed.                       |
| Ctrl/Cmd + A                 | ✔️      | `selectAll`         | Selects all cells.                                                                       |
| Shift + Space                | ✔️      | `selectRow`         | Selecs the current row.                                                                  |
| Ctrl/Cmd + Space             | ✔️      | `selectCol`         | Selects the current col.                                                                 |
| PageUp/PageDown              | ❌      | `pageUp`/`pageDown` | Moves the current selection up/down by one page.                                         |
| Escape                       | ✔️      | `clear`             | Clear the current selection.                                                             |
| Ctrl/Cmd + D                 | ❌      | `downFill`          | Data from the first row of the range will be down filled into the rows below it          |
| Ctrl/Cmd + R                 | ❌      | `rightFill`         | Data from the first column of the range will be right filled into the columns next to it |
| Ctrl/Cmd + C                 | ✔️      | `copy`              | Copies the current selection.                                                            |
| Ctrl/Cmd + V                 | ✔️      | `paste`             | Pastes the current buffer into the grid.                                                 |
| Ctrl/Cmd + F                 | ❌      | `search`            | Opens the search interface.                                                              |
| Ctrl/Cmd + Home/End          | ✔️      | `first`/`last`      | Move the selection to the first/last cell in the data grid.                              |
| Ctrl/Cmd + Shift + Home/End  | ✔️      | `first`/`last`      | Extend the selection to the first/last cell in the data grid.                            |

### Multi-Range selections

The data grid now supports multiple selections. Click+Drag to make an initial selection, then Ctrl + Drag to add another.

```ts
rangeSelect?: "none" | "cell" | "rect" | "multi-cell" | "multi-rect"; // default rect
columnSelect?: "none" | "single" | "multi"; // default multi
rowSelect?: "none" | "single" | "multi"; // default multi
```

When multi-select is enable, more than one range, row, or column can be selected at a time.

### Selection blending

![image](https://user-images.githubusercontent.com/30443/159854710-957cfcf9-b0d7-4399-af71-634cff7816bb.png)

Prior to v4.0.0 the data grid did not allow for mixing of column, row, and range based selections. With 4.0.0 this is now possible to enable.

```ts
    type SelectionBlending = "exclusive" | "mixed";

    rangeSelectionBlending?: SelectionBlending;
    columnSelectionBlending?: SelectionBlending;
    rowSelectionBlending?: SelectionBlending;
```

When a column/range/row selection blending is set to "exclusive", any other types of selections will be cleared when a selection of that type is made. When a selection of a different type is made, exclusive selections will also be cleared. In "mixed" mode range, column, and row selections can be blended into a single selection.

### ✨ Highlight Regions

![image](https://user-images.githubusercontent.com/30443/159854920-ab5588ec-1987-48d5-907f-51af8144b08d.png)

```ts
interface Highlight {
    readonly color: string;
    readonly range: Rectangle;
}

highlightRegions?: readonly Highlight[];
```

Highlight regions can be provided to highlight specific ranges and show the user contextually important cells.

### Custom editor improvements

Custom editors can now receive the initial input value when a user begins typing on a cell. Further they can define a `deletedValue` callback when is responsible for emptying the CustomCell on delete.

## 🐞 Bug Fixes

-   Prevent issue with vertical underscroll on mobile devices.
-   Minor performance improvements when rendering lots of empty text cells
-   `react-number-format` is now lazy loaded to improve initial load times.
-   Shift+enter now correctly moves the focus to the cell above.
-   Fix off by one error with screen-reader columns

# 3.4.0 Release Notes

## **New Features**

### 🌉 **Span Support**

Cells can now be spanned across multiple columns. Spans are defined by setting the `span` property on GridCells. Requests for GridCells which are part of the same span must return the same information or undefined behavior will occur.

### 📦 **Sources package released**

`glide-data-grid-source` has been released alongside this release of `glide-data-grid`. The source package contains useful hooks which can be used to easily add collapsing column groups, sorting columns, and re-arrangeable columns onto existing data sources. You can try out all of these features on the new [project homepage](https://grid.glideapps.com) which exposes all of these features by using the source package.

### 🎨 **getRowThemeOverride**

Prior to the introduction of `getRowThemeOverride` the only way to implement striped rows in the data grid was to set a theme override for each cell. No longer. Striped rows are as easy as a single callback with mod 2.

### 🦣🐁 **Automatic column sizing**

The data grid is now capable of automatically sizing every column in the sheet. Simply leave out the previously required `width` parameter and instead replace it with the `id` parameter. The `id` must be stable and not simply the index of the column to avoid weird drag and drop behavior or performance issues.

Auto sized columns are sized be measuring the width of their first 10 cells. Fewer cells may be measured if the number of columns begins to exceed a 10 thousand columns.

### 🦊🏁 **Firefox performance improvements**

Through the magic of banging our heads against a wall repeatedly we have managed to bring firefox performance more in line with that of chrome. Even very large grids should scroll at or very near to 60fps in 3.4.0. Due to this the `experimental.disableFirefoxRescaling` has been replaced with `experimental.enableFirefoxRescaling` to reflect that this performance enhancement is now disabled by default. The data grid now renders between 2 and 10 times faster on firefox with large grids, depending on workload and GPU.

### 🔬 **Minor features**

-   Support for insert to custom row index
-   Add experimental flag for strict mode. In strict mode getCellContent never calls for cells outside the range of the last visible region sent to onVisibleRegionChanged
-   Drilldown cells now render much faster

## **Bug Fixes**

-   Fix issue where drag scrolling may not stop when mouse click releases.
-   Images in firefox will no longer flicker when recycling an image element
-   Prevent header menu click events when resizing
-   Fix issue where header could sometimes be blanked when rapidly moving the mouse
-   Fix theming issues in some overlay editors and search interface
-   Fix padding changes causing weird flickering artifacts
-   Touch scrolling no longer selects cells as you scroll
-   Boolean cells can again be checked/unchecked with the keyboard

# 3.3.0 Release Notes

## 🎊 **New Features**

### **OverscrollY now supported in addition to OverscrollX**

Want to add more vertical space to the vertical scrolling area? Simply set the desired number of pixels in the `overscrollY` property of `DataEditor`.

### **Arbitrary insertion into Grid**

The `onRowAppeneded` callback has been augmented to allow returning the index of the blank row that has been inserted into the data model. This allows for more varied insertion stories. Shout out to @pzcfg!

### **ScrollTo now supported**

The data grid can be scrolled to a cell programmatically by calling `scrollTo` on its handle.

### **Add Right click Menus anywhere, anytime**

Easily implement right click menus for the data grid with these three new APIs:

-   `readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;`
-   `readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;`
-   `readonly onCellContextMenu?: (cell: Item, event: CellClickedEventArgs) => void;`

### **onFinishedEditing callback now available at root level**

`readonly onFinishedEditing?: (newValue: GridCell | undefined, movement: Item) => void;`

This event fires even if the cell value itself is not changed. Big thank you @krisolchova for your wonderful contribution (which included tests!).

## 🐛 **Bug Fixes**

-   PaddingX/Y are now properly accounted for in scrolling situations. | @pzcfg
-   Multiple storybook fixes. | @pzcfg @ivoelbert
-   Marked dependency has been updated to the latest version from a very old version.

# 3.2.1 Release Notes

Correctness fix to avoid calling for out of range cells.

# 3.2.0 Release Notes

## 🥳 New Features / Improvements

#### 🚀💥 Unit Testing

Glide Data Grid now has a much better testing framework in place to ensure fewer behavioral regressions sneak in.

#### 👨‍👨‍👦‍👦➡👩‍👩‍👧‍👧 Rename groups

![image](https://user-images.githubusercontent.com/30443/146289874-7c0da700-5754-4431-b4e2-58b876409371.png)

Using `onGroupHeaderRenamed` the data grid can now support quick renaming of groups. There is also experimental support for arbitrary actions in group headers.

#### 🤩 Better `onCellClicked`, `onHeaderClicked`, and `onGroupHeaderClicked` events

The `onCellClicked`, `onHeaderClicked`, and `onGroupHeaderClicked` event now pass along a second `event` parameter which includes information about what was clicked and where inside the item the click occurred.

#### 🤵 Fancy headers via `drawHeader`

![image](https://user-images.githubusercontent.com/30443/146289109-43b3c0c3-e9dd-4827-b56a-05dcb8f2a4e2.png)

The `drawHeader` callback works just like the `drawCell` callback but allows for the customization of the drawing of headers.

#### 🐭 `onMouseMove` callback

If you've ever wanted to track every mouse interaction and see what cell and where in that cell that interaction was happening, this event is just for you.

#### 🚄 Choo Choo! Data Grid gets faster! 🏎

We've but in significant work to the Glide Data Grid to help CPU bound systems like low end mobile devices even more. CPU utilization is down another 20%, making the fastest Data Grid the VERY fastest data grid.

#### 🚯General reduction in trash generated during renders

3.2.0 includes significant reductions to the number of junk JS objects created during render. Depending on your transpiler settings this can cut the number of GC pauses in half.

#### 🛳🛳 Ship CommonJS and ESModules

3.2.0 is the first release to ship both CommonJS and ESModules in the package. No matter what you need we provide.

## 🐞 Bug Fixes

-   Freeze columns no longer cause the data grid to crash if there are fewer actual columns than freeze columns.
-   Fixed a bug where image smoothing would sometimes be left disabled for a frame.
-   Fixed an issue where certain props would totally disable blitting optimization by mistake.
-   Pressing backspace on OSX to delete cell contents will now also prevent the browser from navigating to the preview page.
-   Cell editors on firefox will now always display the cursor correctly.
-   Enabling `lastUpdated` on some cells could result in cells rendering with blank content in rare situations.

# 3.1.2 Release Notes

This release fixes a packaging error that could cause build issues.

# 3.1.1 Release Notes

This is a patch release. The primary focus of this was minor bug fixes, improving rendering performance, and plugging a couple minor feature holes.

## 🚼 Behavioral Changes

In 3.1.1 the default textBaseline for the rendering context has been shifted to be `middle`. This enables more efficient rendering of the grid with fewer state changes. This only impacts custom cells if they fail to set the baseline appropriately for themselves.

## 🥂 New Features / Improvements

#### 🤏🗺 Minimap

![image](https://user-images.githubusercontent.com/30443/143328399-dd7b84d0-ca09-4c14-9b80-e9675cf6080b.png)

While functional the minimap is very much a beta feature. It can be turned on by setting `minimap` to true. The minimap is fully interactive, showing but where the user is scrolled to and allowing the user to click around and drag their location. It serves as both a map and 2d scrolling interface.

#### 👆📅 Update animation

![mYOQxaMgMA](https://user-images.githubusercontent.com/30443/143329891-86d8bc6f-40b0-484d-8687-2221fe3f46e9.gif)

By setting the cells `lastUpdated` time to `performance.now()` you can trigger an update fade out animation in 3.1.1.

#### 🖼⚡ More faster images

The Data Grid now handles images even faster. Improvements include considerably lowering memory allocations when loading/processing images, and pooling image tags to reduce GC pressure during scroll and prevent unneeded state changes.

#### 🖌 Group themes

Groups can now provide a theme override for all cells in their group. This is especially useful when implementing collapsing groups. The vertical height of groups can also be changed now by setting `groupHeaderSize`.

## 🐞Bug Fixes

-   Fix crash when columns had menus and were under 30px wide
-   Fix bug where grid selection would be reported to the user with an off by one error in some cases
-   Support 0 width columns better and prevent overdraw of borders
-   Empty string and undefined groups are now correctly treated as the same group
-   Frozen columns can now be dragged correctly
-   Minor editing improvements
-   Font overrides now correctly apply to cells
-   Dragging columns will no longer get stuck if the mouse ends over a menu icon
-   Selected columns now properly handle delete key

# 3.1.0 Release Notes

This is a minor release for the Glide Data Grid. It introduces some breaking changes to the type definitions, however all runtime compatibility is maintained.

## ✂ Deprecations

`drawCustomCell` has been replaced with `drawCell`. The two APIs are functionally equivalent however `drawCell` gives more information and allows for greater extensibility in the future.

```ts
drawCell?: (args: {
    ctx: CanvasRenderingContext2D;
    cell: GridCell;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}) => boolean;
```

## 🎉New Features / Improvements

#### 🐤 Slimmer, Meaner, Faster Loading!

Data Grid 3.1.0 clocks in at nearly 20% lighter when gzipped, and 30% lighter when minified. Load times are down, smiles are up. We also dropped the dependency on `direction`, 1.0 was not in heavy use anymore and the 2.0 version was not compatible. We also removed the dep on `copy-to-clipboard` as it is no longer needed on the target browsers we support.

#### 🦊Firefox improvements

We ❤ Firefox even if Firefox canvas is not the fastest out there. With large canvases on HIDPI displays sometimes we found glide-data-grid wasn't actually the fastest data grid in the world - this upset us. So we fixed it. Firefox will now dynamically scale its resolution during scrolling to improve performance. Once scrolling stops, full fidelity HIDPI rendering will be restored. There is an experimental flag to turn this behavior off.

#### 🖋 Append to top

`onRowAppended` has been updated to allow a return value which specifies where the newly inserted row has been inserted (top or bottom). This allows for "Append to Top" support for apps which need it.

#### 📜 Better scrolling

When using `shift+Arrow` keys to select a range, the extremes of your selection will be kept in view so you don't lose track of what you are doing.

We've also added an `overscrollX` parameter which tells the data grid to permit overscalling by a set number of pixels. This can make it easier to resize the final column in a grid.

#### 🤡 Per-cell theme override

Dress up your cells however you want. Every cell now supports an `overrideTheme` parameter which will be blended with the parent themes to create a theme just for that cell. This makes it much easier to modify the existing cells without having to fall back to a custom renderer.

#### 👩‍👩‍👧‍👧 Group header icons

![image](https://user-images.githubusercontent.com/30443/142516507-0dbf8a2d-0d51-4411-bc74-548dfb87189e.png)

Your groups can now have icons to make them visually easier to distinguish. You can specify these by providing:

```ts
readonly getGroupDetails?: (groupName: string) => { name: string; icon?: string };
```

## 🐛 Major Bug Fixes

-   Fixed a crash when dragging rows
-   Clicking on the bottom scrollbar no longer clears the selection
-   Fix spurious drag start events even though `isDraggable` is set to false.
-   Clicks from non-primary buttons no longer trigger the canvas
-   Delete key now deletes the entire selected range, not just the selected cell.
-   Fonts now re-render when the browser finishes loading to make sure fallback fonts are replaced.
-   Custom editors handle shift/esc/enter automatically now.

# 3.0.4 Release Notes

This is a minor release for the Glide Data Grid. It introduces some new features but is backwards compatible with the rest of the 3.0 series.

## 🎉 New Feature / Improvements

#### 🏁 Performance Improvements

The Data Grid no longer incurs full frame redraws after completing animations or loading images. This means that scrolling performance is up and CPU usage is down in this release. The fastest DataGrid keeps getting faster.

#### ⌨ New Keybindings

`Ctrl + Arrow` keys now will jump to the edge of the grid. This improves compatibility for experiences spreadsheets users.  
`Ctrl + D` copies the currently selected cell down to the selected range.

#### ❄ Freeze Columns

![image](https://user-images.githubusercontent.com/30443/141211232-e266800d-d0b8-45f2-bc9f-d1f52c6b071e.png)

```ts
freezeColumns?: number;
```

Settings the freezeColumns on the `DataEditor` will cause a fixed number of columns to become sticky during scrolling.

#### 💈 Bar charts in sparklines

![image](https://user-images.githubusercontent.com/30443/141211316-6bfb4c15-815e-471b-b686-debd591dcc1a.png)

Simply set your sparkline cell `graphKind` to "bar" and enjoy the bar chart rendering. All other API is the same. In order to maintain backwards compat the default value remains lines if `graphKind` is not provided.

#### 👩‍👩‍👧‍👧 Column Groups

![image](https://user-images.githubusercontent.com/30443/141211567-a511a2d7-2efe-463c-885d-c59d56aeb4d0.png)

Content in the data grid may now be displayed under column groups by setting the `group` property on your `GridColumn`. All columns in a group may be selected by clicking on its header.

# 3.0.3 Release Notes

This is a minor release focused on fixing issues found in the 3.0.0 release.

## 🐛 Bug Fixes

#### 📜 Data grid sometimes would not scroll to show selected cell

The data grid now scrolls to exactly the selected cells location to ensure a consistent keyboard experience.

#### 🖱 Multiple drag and drop bugs fixed

The data grid will no longer get stuck in drag and drop mode as easily. Nor will it accidentally trigger menus when dragging a column.

## 🎉 New Features / Improvements

#### 🦄 Custom Cell

New API!

```ts
interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;
    readonly copyData: string;
}
```

Custom cell can be used to create new cell types quickly and easily. We are already using it in our [glide-data-grid-cells](https://www.npmjs.com/package/@glideapps/glide-data-grid-cells) package in order to ship to you brand new cells. These cells can include custom input editors as well!

#### 🌽 Round image corners

All images rendered in the grid are rounded by default now to give a better visual appearance.

#### 📊 Sparklines and Stars

With the introduction of the new glide-data-grid-cells package we are also introducing Sparklines and Star cells to the glide-data-grid.

![image](https://user-images.githubusercontent.com/30443/141184582-41c73509-5fbe-42e6-aff4-7f4c8fc2b4f2.png)

Both can be dynamically updated just like any other cell type. No strings attached.

# 3.0.2 Release Notes

This is a minor release focused on fixing issues found in the 3.0.0 release.

## 🐛 Bug Fixes

-   Cell click event does not fire reliably, fixes #81

# 3.0.1 Release Notes

This is a minor release focused on fixing issues found in the 3.0.0 release.

## 🐛 Bug Fixes

#### ✂ Focus Ring no longer clips under the trailing row when it is sticky.

![image](https://user-images.githubusercontent.com/30443/139356496-45b06f01-8850-4f5d-b52b-5bdb639356f8.png)

#### 📠 Copy improvements

Certain strings would not get properly escaped when copying out of the DataEditor. This resulted in paste failures when pasting to Excel or Google Sheets.

## 🎉 New Features / Improvements

#### ♊ Multi-paste Support

New API!

```ts
onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
```

`onPaste` is called when data is pasted into the grid. If left undefined, the `DataEditor` will operate in a fallback mode and attempt to paste the text buffer into the current cell assuming the current cell is not readonly and can accept the data type. If `onPaste` is set to false or the function returns false, the grid will simply ignore paste. If `onPaste` evaluates to true the grid will attempt to split the data by tabs and newlines and paste into available cells.

The grid will not attempt to add additional rows if more data is pasted then can fit. In that case it is advisable to simply return false from onPaste and handle the paste manually.

#### ☑ DataEditor.rowSelectionMode

The DataEditor can now optionally act as if the Ctrl/Command key is depressed at all times when selecting rows. This can lead to a more intuitive experience for novice users. The two new modes are `auto` and `multi`. In `auto` mode selection acts as it does today, with single click clearing selection unless the Ctrl/Command key is pressed or touch events are used.

#### 🤡 Clowncar Scrolling

Data Grid now supports truly ridiculous numbers of rows, well north of 100 Million if your data source can handle it. This mandates a special scrolling mode which kicks in once the browsers scrolling precision is exhausted.

#### 🤏 CompactSelection.offset

CompactSelections now have an offset API for shifting the CompactSelection by a fixed amount.

#### ⚡ Faster animations

Default animation time has been shortened to 80ms from 120ms to improve the responsive feeling of the Data Grid.

# 3.0.0 Release Notes

This is a breaking release for the Glide Data Grid. Please be careful if you choose to upgrade.

## New Features / Improvements

### Uneven Rows

![image](https://user-images.githubusercontent.com/30443/137536787-0a5907d7-dec2-4d04-803f-fdff57fe5b78.png)

Uneven rows can be created by passing a callback to the `rowHeight` property. This callback takes the row as an input and returns a number as the output. Currently uneven rows can negatively impact performance for very large lists as there is no internal caching mechanism for this.

### Better row marker selection support

![image](https://user-images.githubusercontent.com/30443/137536396-f99367b0-31a8-4bd7-810e-7d15a2374c12.png)

`rowMarkers` is no longer a boolean and now can be configured to be `none`, `checkbox`, `number`, or `both`. In addition Row Markers now have significantly improved handling for Ctrl/Command, Shift clicking, and Ctrl/Command+Shift clicking. It's behavior now closely resembles how most operating systems handle these operations.

### Better image handling

Images will now cancel requests when they fall out of the rendering area. This means that when scrolling rapidly through grids with large numbers of images they will no longer form a long queue which must be processed prior to downloading the displayed images.

### Trailing row options

![image](https://user-images.githubusercontent.com/30443/137535998-d96e9738-5633-4165-a564-6632a753c665.png)

There is a new prop `trailingRowOptions` which can be used to theme the trailing row if `onRowAppended` is set.

```ts
readonly trailingRowOptions?: {
        readonly tint?: boolean;
        readonly hint?: string;
        readonly sticky?: boolean;
};
```

### Simple animations

Data Grid now supports some simple animations. These are used for the trailing row, row markers, and boolean cells. As we continue to develop the Data Grid we will add more animations where they make sense.

### Speed improvements

Data Grid 3.0 supports much larger numbers of columns and rows without experiencing major slowdowns. Provided the `getCellContent` callback is sufficiently fast, Data Grid can easily support over 10 million cells, 100k columns, and 1 million rows. Currently the number of rows is largely constrained by the max scrollable region support by browsers, which tends to be 33,554,400 pixels. In the future we will be investigating ways to extend beyond this limit.

## Breaking changes

### Theme support reworked

The theme for `DataEditor` has been flattened to make creating custom themes simpler and more intuitive. The new base theme is:

```js
const dataEditorBaseTheme = {
    accentColor: "#4F5DFF",
    accentMedium: "rgba(79,118,255,0.5)",
    accentLight: "rgba(79, 93, 255, 0.1)",

    textDark: "#313139",
    textMedium: "#737383",
    textLight: "#B2B2C0",
    textHeader: "#737383",
    textHeaderSelected: "#FFFFFF",
    textBubble: "#313139",

    bgCell: "#FFFFFF",
    bgCellMedium: "#FAFAFB",
    bgHeader: "#EDEDF3",
    bgHeaderHasFocus: "#D8D8E3",

    bgBubble: "#EDEDF3",
    bgBubbleSelected: "#FFFFFF",

    bgSearchResult: "#fff9e3",

    borderColor: "rgba(45,45,45,0.16)",
    borderDark: "rgba(0, 0, 0, 0)",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};
```

### Trailing row off by default

Trailing rows must be explicitly requested. Trailing rows are added automatically when `onRowAppended` is set. The `showTrailingBlankRow` prop has been removed.

### Removed `allowResize` prop

Resizing is controlled by passing a callback to `onColumnResized` or not. This prop was redundant and its removal simplifies the API.

### Removed `cellXOffset` and `cellYOffset` props

These never did anything positive if not set to the correct values. The Data Grid now always sets these to the correct values.

### Trailing row handling

When clicking on the first column in a trailing row if the `trailingRowOptions.hint` is set a blank row will automatically be created and `onRowAppended` called.

### onRowAppended no longer has props

The Data grid always assumes you wish to add a completely blank row and enters the edit state for the newly added cell.
