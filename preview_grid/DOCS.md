# Glide Data Grid: Nested Group Headers

Technical documentation for the added support of multi-level (nested) group headers in this branch.

## 1. What exactly is implemented

Previously, a column could only specify a single `group` (one row of group headers).

Now:

* `group` supports:

  * `string` (as before),
  * `string[]` (nested groups: from outermost to innermost).
* Group depth is computed automatically as the maximum `group` length among all columns.
* Rendering, hit-testing, events, and selection work for multiple group-header rows (`-2`, `-3`, `-4`, ...).

## 2. Data model

Key change to the column type:

```ts
type GridColumnGroup = string | readonly string[];

interface BaseGridColumn {
  readonly group?: GridColumnGroup;
}
```

Semantics:

* `group: "Users"` -> depth 1.
* `group: ["Telemetry", "Runtime", "Metrics"]` -> depth 3.
* For shorter paths, a group name at upper/lower levels may be `undefined`.

Helper functions:

* `getGroupDepth(columns)` -> maximum depth.
* `getColumnGroupName(group, levelFromBottom)`:

  * `levelFromBottom = 0` -> the innermost (bottom) level,
  * `1` -> one level above, etc.

## 3. Coordinates and geometry

### 3.1 Row indices (`Item = [col, row]`)

* `row = -1` -> normal column header.
* `row <= -2` -> group headers (nested levels).
* `row >= 0` -> data.

With depth `D`:

* top group level: `row = -(D + 1)`,
* bottom group level (closest to the header): `row = -2`.

Example for `D = 4`:

* `-5` -> level 1 (topmost),
* `-4` -> level 2,
* `-3` -> level 3,
* `-2` -> level 4 (bottommost),
* `-1` -> column headers.

### 3.2 Header heights

* `totalGroupHeaderHeight = groupHeaderHeight * groupHeaderDepth`
* `totalHeaderHeight = headerHeight + totalGroupHeaderHeight`

This height is now used throughout the entire pipeline (scrolling, hit-test, line rendering, rings).

## 4. How it is drawn

Core logic:

1. Compute `groupHeaderDepth`.
2. `walkGroups(...)` iterates through all levels from top to bottom.
3. At each level, columns are merged into spans by matching group name at that level.
4. For each span, draw the group rectangle, text, icons, and actions.
5. Then draw separators between levels.

Important:

* Sticky columns are handled separately (a span does not cross the sticky boundary).
* Clipping respects the current viewport.
* Damage rendering is aware of all header rows, not only `-2/-1`.

## 5. Hit-test and events

### 5.1 Determining row by `y`

`getRowIndexForY(...)` now accounts for group depth. A click in the group-header area returns the exact `row` for the corresponding level (`-2`, `-3`, ...), not always `-2`.

### 5.2 Element bounds

`computeBounds(...)` takes `groupHeaderDepth` and can compute bounds for any group-header level:

* determines `levelFromBottom = -2 - row`,
* finds the span to the left/right for that level,
* returns the full rectangle for the group span.

### 5.3 Event type for group headers

`GridMouseGroupHeaderEventArgs.location` is now `[number, number]` (instead of `[number, -2]`) to support any header level.

`args.group` is now level-dependent: the group name is taken from the actually clicked level.

## 6. What changed compared to the original

| Area                     | Original                       | Now                                                          |
| ------------------------ | ------------------------------ | ------------------------------------------------------------ |
| `column.group` type      | Only `string`                  | `string` or `string[]`                                       |
| Number of group rows     | Fixed to 1                     | Based on depth, effectively unlimited (practically use 3–4+) |
| Group row index          | Always `-2`                    | `-2`, `-3`, `-4`, ...                                        |
| Header hit-test          | One group level                | Any level                                                    |
| Group header bounds      | One level only                 | Level-dependent span                                         |
| Selection on group click | Single level                   | Click level                                                  |
| Scrolling total height   | `header + 1*groupHeaderHeight` | `header + depth*groupHeaderHeight`                           |
| Highlight/focus regions  | 1 group row                    | All group rows                                               |

## 7. How to use

### 7.1 Minimal columns example

```ts
const columns: GridColumn[] = [
  { id: "name", title: "Name", width: 220, group: ["Users", "Profile"] },
  { id: "email", title: "Email", width: 280, group: ["Users", "Contacts"] },
  { id: "status", title: "Status", width: 150, group: ["Telemetry", "Runtime", "Flags"] },
  { id: "score", title: "Score", width: 120, group: ["Telemetry", "Runtime", "Metrics", "Quality"] },
];
```

### 7.2 Compatibility

The old format remains valid:

```ts
{ id: "id", title: "ID", group: "Common" }
```

You can mix `string` and `string[]` within the same column set.

### 7.3 Handling clicks on group headers

In `onGroupHeaderClicked`:

* `args.location[1]` -> level (`-2`, `-3`, ...),
* `args.group` -> group name for that exact level.

For behavior like “select the entire group at this level”, use the level from `location[1]` (the current `DataEditor` implementation already does this).

### 7.4 Group theming

`getGroupDetails(name)` continues to accept a string group key.
For the header cell and overlay themes in `DataEditor`, the leaf group is used (`levelFromBottom = 0`).

## 8. Limitations and nuances

* Depth is not technically limited by code, but UX usually makes more sense within 3–4 levels.
* Group comparison at a level is currently by string name (`isGroupEqual`), without full path context.
* If two branches share the same name at a given level, they are treated as one group at that level (if the columns are adjacent).

## 9. Where to look in the code

Main touchpoints:

* `packages/core/src/internal/data-grid/data-grid-types.ts`
* `packages/core/src/internal/data-grid/render/data-grid-lib.ts`
* `packages/core/src/internal/data-grid/render/data-grid-render.walk.ts`
* `packages/core/src/internal/data-grid/render/data-grid-render.header.ts`
* `packages/core/src/internal/data-grid/data-grid.tsx`
* `packages/core/src/data-editor/data-editor.tsx`
* `packages/core/src/internal/scrolling-data-grid/scrolling-data-grid.tsx`
* `preview_grid/src/App.tsx`

## 10. Running the local example

From the repository root:

```bash
npm run dev --prefix preview_grid
```

Open:

`http://localhost:5174`

## 11. New Group Theming Context (Nested Paths)

`getGroupDetails` now receives an optional second argument with nested context:

```ts
type GroupDetailsContext = {
  path: readonly string[];      // from outermost to current level
  levelFromBottom: number;      // 0 = leaf (innermost), 1 = parent, ...
};
```

Callback shape:

```ts
getGroupDetails?: (groupName: string, context?: GroupDetailsContext) => GroupDetails
```

Example:

```ts
getGroupDetails={(group, ctx) => {
  const key = ctx?.path.join(" > ") ?? group;
  const depth = ctx?.levelFromBottom ?? 0;

  return {
    name: group,
    overrideTheme: {
      bgGroupHeader: depth === 0 ? "#eef6ff" : "#f8fbff",
      textGroupHeader: key.startsWith("Telemetry") ? "#5a2d00" : "#1f2a44",
    },
  };
}}
```

This enables reliable theming for subgroup trees of arbitrary depth.

## 12. Context menu coordinates

Mouse event args for cells, headers, and group headers now expose viewport pointer coordinates next to the existing local coordinates:

```ts
interface PositionableMouseEventArgs {
  readonly mouseX: number;
  readonly mouseY: number;
  readonly localEventX: number;
  readonly localEventY: number;
}
```

Meaning:

* `localEventX` / `localEventY` are relative to the clicked cell or header bounds.
* `mouseX` / `mouseY` are viewport coordinates, equivalent to DOM `clientX` / `clientY`.

Use `mouseX` / `mouseY` when rendering a context menu with `position: fixed`:

```tsx
const [menu, setMenu] = useState<{ x: number; y: number; cell: Item }>();

const onCellContextMenu = (cell: Item, event: CellClickedEventArgs) => {
  event.preventDefault();

  setMenu({
    x: event.mouseX,
    y: event.mouseY,
    cell,
  });
};

return (
  <>
    <DataEditor onCellContextMenu={onCellContextMenu} {...props} />
    {menu !== undefined && (
      <div
        className="context-menu"
        style={{
          position: "fixed",
          left: menu.x,
          top: menu.y,
        }}>
        Context menu for {menu.cell[0]}, {menu.cell[1]}
      </div>
    )}
  </>
);
```

If you need document/page coordinates for an absolutely positioned element inside the document flow, add scroll offsets yourself:

```ts
const pageX = event.mouseX + window.scrollX;
const pageY = event.mouseY + window.scrollY;
```

The local preview app demonstrates this by opening a cell context menu exactly at the right-click cursor position and showing both coordinate pairs.

The same coordinates are available for normal column headers and group headers:

```tsx
const onHeaderContextMenu = (colIndex: number, event: HeaderClickedEventArgs) => {
  event.preventDefault();

  setMenu({
    x: event.mouseX,
    y: event.mouseY,
    title: columns[colIndex]?.title,
  });
};

const onGroupHeaderContextMenu = (colIndex: number, event: GroupHeaderClickedEventArgs) => {
  event.preventDefault();

  setMenu({
    x: event.mouseX,
    y: event.mouseY,
    title: event.group,
  });
};

return (
  <DataEditor
    onHeaderContextMenu={onHeaderContextMenu}
    onGroupHeaderContextMenu={onGroupHeaderContextMenu}
    {...props}
  />
);
```
