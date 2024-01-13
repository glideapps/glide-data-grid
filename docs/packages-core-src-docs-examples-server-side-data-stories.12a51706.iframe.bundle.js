(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[3562],{

/***/ "./packages/core/src/docs/examples/server-side-data.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerSideData": () => (/* binding */ ServerSideData),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var lodash_range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/range.js");
/* harmony import */ var lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_range_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_chunk_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/chunk.js");
/* harmony import */ var lodash_chunk_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_chunk_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport {\n    CompactSelection,\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Rectangle,\n    type Item,\n    type CellArray,\n} from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { DataEditorAll as DataEditor, type DataEditorAllProps as DataEditorProps } from \"../../data-editor-all.js\";\nimport range from \"lodash/range.js\";\nimport chunk from \"lodash/chunk.js\";\nimport type { DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { BeautifulWrapper } from \"../../data-editor/stories/utils.js\";\nimport { Description } from \"../doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ntype RowCallback<T> = (range: Item) => Promise<readonly T[]>;\ntype RowToCell<T> = (row: T, col: number) => GridCell;\ntype RowEditedCallback<T> = (cell: Item, newVal: EditableGridCell, rowData: T) => T | undefined;\nfunction useAsyncData<TRowType>(\n    pageSize: number,\n    maxConcurrency: number,\n    getRowData: RowCallback<TRowType>,\n    toCell: RowToCell<TRowType>,\n    onEdited: RowEditedCallback<TRowType>,\n    gridRef: React.MutableRefObject<DataEditorRef | null>\n): Pick<DataEditorProps, \"getCellContent\" | \"onVisibleRegionChanged\" | \"onCellEdited\" | \"getCellsForSelection\"> {\n    pageSize = Math.max(pageSize, 1);\n    const loadingRef = React.useRef(CompactSelection.empty());\n    const dataRef = React.useRef<TRowType[]>([]);\n\n    const [visiblePages, setVisiblePages] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });\n    const visiblePagesRef = React.useRef(visiblePages);\n    visiblePagesRef.current = visiblePages;\n\n    const onVisibleRegionChanged: NonNullable<DataEditorProps[\"onVisibleRegionChanged\"]> = React.useCallback(r => {\n        setVisiblePages(cv => {\n            if (r.x === cv.x && r.y === cv.y && r.width === cv.width && r.height === cv.height) return cv;\n            return r;\n        });\n    }, []);\n\n    const getCellContent = React.useCallback<DataEditorProps[\"getCellContent\"]>(\n        cell => {\n            const [col, row] = cell;\n            const rowData: TRowType | undefined = dataRef.current[row];\n            if (rowData !== undefined) {\n                return toCell(rowData, col);\n            }\n            return {\n                kind: GridCellKind.Loading,\n                allowOverlay: false,\n            };\n        },\n        [toCell]\n    );\n\n    const loadPage = React.useCallback(\n        async (page: number) => {\n            loadingRef.current = loadingRef.current.add(page);\n            const startIndex = page * pageSize;\n            const d = await getRowData([startIndex, (page + 1) * pageSize]);\n\n            const vr = visiblePagesRef.current;\n\n            const damageList: { cell: [number, number] }[] = [];\n            const data = dataRef.current;\n            for (const [i, element] of d.entries()) {\n                data[i + startIndex] = element;\n                for (let col = vr.x; col <= vr.x + vr.width; col++) {\n                    damageList.push({\n                        cell: [col, i + startIndex],\n                    });\n                }\n            }\n            gridRef.current?.updateCells(damageList);\n        },\n        [getRowData, gridRef, pageSize]\n    );\n\n    const getCellsForSelection = React.useCallback(\n        (r: Rectangle): (() => Promise<CellArray>) => {\n            return async () => {\n                const firstPage = Math.max(0, Math.floor(r.y / pageSize));\n                const lastPage = Math.floor((r.y + r.height) / pageSize);\n\n                for (const pageChunk of chunk(\n                    range(firstPage, lastPage + 1).filter(i => !loadingRef.current.hasIndex(i)),\n                    maxConcurrency\n                )) {\n                    await Promise.allSettled(pageChunk.map(loadPage));\n                }\n\n                const result: GridCell[][] = [];\n\n                for (let y = r.y; y < r.y + r.height; y++) {\n                    const row: GridCell[] = [];\n                    for (let x = r.x; x < r.x + r.width; x++) {\n                        row.push(getCellContent([x, y]));\n                    }\n                    result.push(row);\n                }\n\n                return result;\n            };\n        },\n        [getCellContent, loadPage, maxConcurrency, pageSize]\n    );\n\n    React.useEffect(() => {\n        const r = visiblePages;\n        const firstPage = Math.max(0, Math.floor((r.y - pageSize / 2) / pageSize));\n        const lastPage = Math.floor((r.y + r.height + pageSize / 2) / pageSize);\n        for (const page of range(firstPage, lastPage + 1)) {\n            if (loadingRef.current.hasIndex(page)) continue;\n            void loadPage(page);\n        }\n    }, [loadPage, pageSize, visiblePages]);\n\n    const onCellEdited = React.useCallback(\n        (cell: Item, newVal: EditableGridCell) => {\n            const [, row] = cell;\n            const current = dataRef.current[row];\n            if (current === undefined) return;\n\n            const result = onEdited(cell, newVal, current);\n            if (result !== undefined) {\n                dataRef.current[row] = result;\n            }\n        },\n        [onEdited]\n    );\n\n    return {\n        getCellContent,\n        onVisibleRegionChanged,\n        onCellEdited,\n        getCellsForSelection,\n    };\n}\n\nexport const ServerSideData: React.VFC = () => {\n    const ref = React.useRef<DataEditorRef | null>(null);\n\n    const getRowData = React.useCallback(async (r: Item) => {\n        await new Promise(res => setTimeout(res, 300));\n        return range(r[0], r[1]).map(rowIndex => [`1, ${rowIndex}`, `2, ${rowIndex}`]);\n    }, []);\n\n    const columns = React.useMemo<readonly GridColumn[]>(() => {\n        return [\n            {\n                title: \"A\",\n                width: 150,\n            },\n            {\n                title: \"B\",\n                width: 200,\n            },\n        ];\n    }, []);\n\n    const args = useAsyncData<string[]>(\n        50,\n        5,\n        getRowData,\n        React.useCallback(\n            (rowData, col) => ({\n                kind: GridCellKind.Text,\n                data: rowData[col],\n                allowOverlay: true,\n                displayData: rowData[col],\n            }),\n            []\n        ),\n        React.useCallback((cell, newVal, rowData) => {\n            const [col] = cell;\n            if (newVal.kind !== GridCellKind.Text) return undefined;\n            const newRow: string[] = [...rowData];\n            newRow[col] = newVal.data;\n            return newRow;\n        }, []),\n        ref\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Server Side Data\"\n            description={\n                <Description>\n                    Glide data grid is fully ready to handle your server side data needs. This example condenses the\n                    implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but\n                    network transactions should work the same.\n                </Description>\n            }>\n            <DataEditor ref={ref} {...args} width=\"100%\" columns={columns} rows={3000} rowMarkers=\"both\" />\n        </BeautifulWrapper>\n    );\n};\n(ServerSideData as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "ServerSideData": {
    "startLoc": {
      "col": 41,
      "line": 157
    },
    "endLoc": {
      "col": 1,
      "line": 214
    },
    "startBody": {
      "col": 41,
      "line": 157
    },
    "endBody": {
      "col": 1,
      "line": 214
    }
  }
};









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport {\n    CompactSelection,\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Rectangle,\n    type Item,\n    type CellArray,\n} from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { DataEditorAll as DataEditor, type DataEditorAllProps as DataEditorProps } from \"../../data-editor-all.js\";\nimport range from \"lodash/range.js\";\nimport chunk from \"lodash/chunk.js\";\nimport type { DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { BeautifulWrapper } from \"../../data-editor/stories/utils.js\";\nimport { Description } from \"../doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ntype RowCallback<T> = (range: Item) => Promise<readonly T[]>;\ntype RowToCell<T> = (row: T, col: number) => GridCell;\ntype RowEditedCallback<T> = (cell: Item, newVal: EditableGridCell, rowData: T) => T | undefined;\nfunction useAsyncData<TRowType>(\n    pageSize: number,\n    maxConcurrency: number,\n    getRowData: RowCallback<TRowType>,\n    toCell: RowToCell<TRowType>,\n    onEdited: RowEditedCallback<TRowType>,\n    gridRef: React.MutableRefObject<DataEditorRef | null>\n): Pick<DataEditorProps, \"getCellContent\" | \"onVisibleRegionChanged\" | \"onCellEdited\" | \"getCellsForSelection\"> {\n    pageSize = Math.max(pageSize, 1);\n    const loadingRef = React.useRef(CompactSelection.empty());\n    const dataRef = React.useRef<TRowType[]>([]);\n\n    const [visiblePages, setVisiblePages] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });\n    const visiblePagesRef = React.useRef(visiblePages);\n    visiblePagesRef.current = visiblePages;\n\n    const onVisibleRegionChanged: NonNullable<DataEditorProps[\"onVisibleRegionChanged\"]> = React.useCallback(r => {\n        setVisiblePages(cv => {\n            if (r.x === cv.x && r.y === cv.y && r.width === cv.width && r.height === cv.height) return cv;\n            return r;\n        });\n    }, []);\n\n    const getCellContent = React.useCallback<DataEditorProps[\"getCellContent\"]>(\n        cell => {\n            const [col, row] = cell;\n            const rowData: TRowType | undefined = dataRef.current[row];\n            if (rowData !== undefined) {\n                return toCell(rowData, col);\n            }\n            return {\n                kind: GridCellKind.Loading,\n                allowOverlay: false,\n            };\n        },\n        [toCell]\n    );\n\n    const loadPage = React.useCallback(\n        async (page: number) => {\n            loadingRef.current = loadingRef.current.add(page);\n            const startIndex = page * pageSize;\n            const d = await getRowData([startIndex, (page + 1) * pageSize]);\n\n            const vr = visiblePagesRef.current;\n\n            const damageList: { cell: [number, number] }[] = [];\n            const data = dataRef.current;\n            for (const [i, element] of d.entries()) {\n                data[i + startIndex] = element;\n                for (let col = vr.x; col <= vr.x + vr.width; col++) {\n                    damageList.push({\n                        cell: [col, i + startIndex],\n                    });\n                }\n            }\n            gridRef.current?.updateCells(damageList);\n        },\n        [getRowData, gridRef, pageSize]\n    );\n\n    const getCellsForSelection = React.useCallback(\n        (r: Rectangle): (() => Promise<CellArray>) => {\n            return async () => {\n                const firstPage = Math.max(0, Math.floor(r.y / pageSize));\n                const lastPage = Math.floor((r.y + r.height) / pageSize);\n\n                for (const pageChunk of chunk(\n                    range(firstPage, lastPage + 1).filter(i => !loadingRef.current.hasIndex(i)),\n                    maxConcurrency\n                )) {\n                    await Promise.allSettled(pageChunk.map(loadPage));\n                }\n\n                const result: GridCell[][] = [];\n\n                for (let y = r.y; y < r.y + r.height; y++) {\n                    const row: GridCell[] = [];\n                    for (let x = r.x; x < r.x + r.width; x++) {\n                        row.push(getCellContent([x, y]));\n                    }\n                    result.push(row);\n                }\n\n                return result;\n            };\n        },\n        [getCellContent, loadPage, maxConcurrency, pageSize]\n    );\n\n    React.useEffect(() => {\n        const r = visiblePages;\n        const firstPage = Math.max(0, Math.floor((r.y - pageSize / 2) / pageSize));\n        const lastPage = Math.floor((r.y + r.height + pageSize / 2) / pageSize);\n        for (const page of range(firstPage, lastPage + 1)) {\n            if (loadingRef.current.hasIndex(page)) continue;\n            void loadPage(page);\n        }\n    }, [loadPage, pageSize, visiblePages]);\n\n    const onCellEdited = React.useCallback(\n        (cell: Item, newVal: EditableGridCell) => {\n            const [, row] = cell;\n            const current = dataRef.current[row];\n            if (current === undefined) return;\n\n            const result = onEdited(cell, newVal, current);\n            if (result !== undefined) {\n                dataRef.current[row] = result;\n            }\n        },\n        [onEdited]\n    );\n\n    return {\n        getCellContent,\n        onVisibleRegionChanged,\n        onCellEdited,\n        getCellsForSelection,\n    };\n}\n\nexport const ServerSideData: React.VFC = () => {\n    const ref = React.useRef<DataEditorRef | null>(null);\n\n    const getRowData = React.useCallback(async (r: Item) => {\n        await new Promise(res => setTimeout(res, 300));\n        return range(r[0], r[1]).map(rowIndex => [`1, ${rowIndex}`, `2, ${rowIndex}`]);\n    }, []);\n\n    const columns = React.useMemo<readonly GridColumn[]>(() => {\n        return [\n            {\n                title: \"A\",\n                width: 150,\n            },\n            {\n                title: \"B\",\n                width: 200,\n            },\n        ];\n    }, []);\n\n    const args = useAsyncData<string[]>(\n        50,\n        5,\n        getRowData,\n        React.useCallback(\n            (rowData, col) => ({\n                kind: GridCellKind.Text,\n                data: rowData[col],\n                allowOverlay: true,\n                displayData: rowData[col],\n            }),\n            []\n        ),\n        React.useCallback((cell, newVal, rowData) => {\n            const [col] = cell;\n            if (newVal.kind !== GridCellKind.Text) return undefined;\n            const newRow: string[] = [...rowData];\n            newRow[col] = newVal.data;\n            return newRow;\n        }, []),\n        ref\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Server Side Data\"\n            description={\n                <Description>\n                    Glide data grid is fully ready to handle your server side data needs. This example condenses the\n                    implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but\n                    network transactions should work the same.\n                </Description>\n            }>\n            <DataEditor ref={ref} {...args} width=\"100%\" columns={columns} rows={3000} rowMarkers=\"both\" />\n        </BeautifulWrapper>\n    );\n};\n(ServerSideData as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n",
      "locationsMap": {
        "server-side-data": {
          "startLoc": {
            "col": 41,
            "line": 157
          },
          "endLoc": {
            "col": 1,
            "line": 214
          },
          "startBody": {
            "col": 41,
            "line": 157
          },
          "endBody": {
            "col": 1,
            "line": 214
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Story, {})
  })]
});
function useAsyncData(pageSize, maxConcurrency, getRowData, toCell, onEdited, gridRef) {
  pageSize = Math.max(pageSize, 1);
  const loadingRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .CompactSelection.empty */ .EV.empty());
  const dataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
  const [visiblePages, setVisiblePages] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const visiblePagesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(visiblePages);
  visiblePagesRef.current = visiblePages;
  const onVisibleRegionChanged = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(r => {
    setVisiblePages(cv => {
      if (r.x === cv.x && r.y === cv.y && r.width === cv.width && r.height === cv.height) return cv;
      return r;
    });
  }, []);
  const getCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const rowData = dataRef.current[row];
    if (rowData !== undefined) {
      return toCell(rowData, col);
    }
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Loading */ .p6.Loading,
      allowOverlay: false
    };
  }, [toCell]);
  const loadPage = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async page => {
    var _gridRef$current;
    loadingRef.current = loadingRef.current.add(page);
    const startIndex = page * pageSize;
    const d = await getRowData([startIndex, (page + 1) * pageSize]);
    const vr = visiblePagesRef.current;
    const damageList = [];
    const data = dataRef.current;
    for (const [i, element] of d.entries()) {
      data[i + startIndex] = element;
      for (let col = vr.x; col <= vr.x + vr.width; col++) {
        damageList.push({
          cell: [col, i + startIndex]
        });
      }
    }
    (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.updateCells(damageList);
  }, [getRowData, gridRef, pageSize]);
  const getCellsForSelection = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(r => {
    return async () => {
      const firstPage = Math.max(0, Math.floor(r.y / pageSize));
      const lastPage = Math.floor((r.y + r.height) / pageSize);
      for (const pageChunk of lodash_chunk_js__WEBPACK_IMPORTED_MODULE_2___default()(lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default()(firstPage, lastPage + 1).filter(i => !loadingRef.current.hasIndex(i)), maxConcurrency)) {
        await Promise.allSettled(pageChunk.map(loadPage));
      }
      const result = [];
      for (let y = r.y; y < r.y + r.height; y++) {
        const row = [];
        for (let x = r.x; x < r.x + r.width; x++) {
          row.push(getCellContent([x, y]));
        }
        result.push(row);
      }
      return result;
    };
  }, [getCellContent, loadPage, maxConcurrency, pageSize]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const r = visiblePages;
    const firstPage = Math.max(0, Math.floor((r.y - pageSize / 2) / pageSize));
    const lastPage = Math.floor((r.y + r.height + pageSize / 2) / pageSize);
    for (const page of lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default()(firstPage, lastPage + 1)) {
      if (loadingRef.current.hasIndex(page)) continue;
      void loadPage(page);
    }
  }, [loadPage, pageSize, visiblePages]);
  const onCellEdited = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((cell, newVal) => {
    const [, row] = cell;
    const current = dataRef.current[row];
    if (current === undefined) return;
    const result = onEdited(cell, newVal, current);
    if (result !== undefined) {
      dataRef.current[row] = result;
    }
  }, [onEdited]);
  return {
    getCellContent,
    onVisibleRegionChanged,
    onCellEdited,
    getCellsForSelection
  };
}
const ServerSideData = () => {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const getRowData = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async r => {
    await new Promise(res => setTimeout(res, 300));
    return lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default()(r[0], r[1]).map(rowIndex => [`1, ${rowIndex}`, `2, ${rowIndex}`]);
  }, []);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return [{
      title: "A",
      width: 150
    }, {
      title: "B",
      width: 200
    }];
  }, []);
  const args = useAsyncData(50, 5, getRowData, react__WEBPACK_IMPORTED_MODULE_0__.useCallback((rowData, col) => ({
    kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
    data: rowData[col],
    allowOverlay: true,
    displayData: rowData[col]
  }), []), react__WEBPACK_IMPORTED_MODULE_0__.useCallback((cell, newVal, rowData) => {
    const [col] = cell;
    if (newVal.kind !== _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text) return undefined;
    const newRow = [...rowData];
    newRow[col] = newVal.data;
    return newRow;
  }, []), ref);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_6__/* .BeautifulWrapper */ .m, {
    title: "Server Side Data",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_7__/* .Description */ .dk, {
      children: "Glide data grid is fully ready to handle your server side data needs. This example condenses the implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but network transactions should work the same."
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_8__/* .DataEditorAll */ .F, {
      ref: ref,
      ...args,
      width: "100%",
      columns: columns,
      rows: 3000,
      rowMarkers: "both"
    })
  });
};
ServerSideData.displayName = "ServerSideData";
ServerSideData.parameters = {
  options: {
    showPanel: false
  }
};;const __namedExportsOrder = ["ServerSideData"];

/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/***/ ((module) => {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ "./node_modules/lodash/chunk.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSlice = __webpack_require__("./node_modules/lodash/_baseSlice.js"),
    isIterateeCall = __webpack_require__("./node_modules/lodash/_isIterateeCall.js"),
    toInteger = __webpack_require__("./node_modules/lodash/toInteger.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}

module.exports = chunk;


/***/ }),

/***/ "./node_modules/lodash/toInteger.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__("./node_modules/lodash/toFinite.js");

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-server-side-data-stories.12a51706.iframe.bundle.js.map