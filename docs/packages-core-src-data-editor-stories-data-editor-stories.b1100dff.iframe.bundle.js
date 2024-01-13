"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8801],{

/***/ "./packages/core/src/data-editor/stories/data-editor.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanEditBoolean": () => (/* binding */ CanEditBoolean),
/* harmony export */   "Draggable": () => (/* binding */ Draggable),
/* harmony export */   "DynamicAddRemoveColumns": () => (/* binding */ DynamicAddRemoveColumns),
/* harmony export */   "GridAddNewRows": () => (/* binding */ GridAddNewRows),
/* harmony export */   "GridNoTrailingBlankRow": () => (/* binding */ GridNoTrailingBlankRow),
/* harmony export */   "GridSelectionOutOfRangeLessColumnsThanSelection": () => (/* binding */ GridSelectionOutOfRangeLessColumnsThanSelection),
/* harmony export */   "GridSelectionOutOfRangeNoColumns": () => (/* binding */ GridSelectionOutOfRangeNoColumns),
/* harmony export */   "IdealSize": () => (/* binding */ IdealSize),
/* harmony export */   "ManualControl": () => (/* binding */ ManualControl),
/* harmony export */   "MarkdownEdits": () => (/* binding */ MarkdownEdits),
/* harmony export */   "Minimal": () => (/* binding */ Minimal),
/* harmony export */   "RelationColumn": () => (/* binding */ RelationColumn),
/* harmony export */   "ResizableColumns": () => (/* binding */ ResizableColumns),
/* harmony export */   "SimpleEditable": () => (/* binding */ SimpleEditable),
/* harmony export */   "Simplenotest": () => (/* binding */ Simplenotest),
/* harmony export */   "Smooth": () => (/* binding */ Smooth),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _storybook_addons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("@storybook/addons");
/* harmony import */ var _storybook_addons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_storybook_addons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "/* eslint-disable sonarjs/no-identical-functions */\nimport * as React from \"react\";\n\nimport { useState, useCallback, useMemo } from \"@storybook/addons\";\nimport { BuilderThemeWrapper } from \"../../stories/story-utils.js\";\nimport {\n    CompactSelection,\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type GridSelection,\n    type Item,\n} from \"../../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\n\nexport default {\n    title: \"Tests/TestCases\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <BuilderThemeWrapper width={1000} height={800}>\n                <Story />\n            </BuilderThemeWrapper>\n        ),\n    ],\n};\n\nfunction getDummyData([col, row]: Item): GridCell {\n    if (col === 0) {\n        return {\n            kind: GridCellKind.RowID,\n            data: `RowID ${col}, ${row}`,\n            allowOverlay: false,\n        };\n    }\n    if (col === 1) {\n        return {\n            kind: GridCellKind.Bubble,\n            data: [\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n            ],\n            allowOverlay: true,\n        };\n    }\n    if (col === 2) {\n        return {\n            kind: GridCellKind.Image,\n            data: [\n                \"https://i.imgur.com/5J0BftG.jpg\",\n                \"https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581\",\n            ],\n            allowOverlay: true,\n            readonly: false,\n        };\n    }\n    if (col === 3) {\n        return {\n            kind: GridCellKind.Markdown,\n            data: `## Markdown has titles\n\nAnd supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.\n\n\n[Google](https://google.com)\n\n- with\n- lists\n- that\n- can\n- be\n- pretty\n- long\n                    `,\n            allowOverlay: true,\n        };\n    }\n    if (col === 4) {\n        return {\n            kind: GridCellKind.Number,\n            displayData: \"$10,352\",\n            allowOverlay: true,\n            data: 10_352,\n            readonly: true,\n        };\n    }\n    if (col === 5) {\n        return {\n            kind: GridCellKind.Uri,\n            data: \"https://www.google.com\",\n            allowOverlay: true,\n        };\n    }\n    if (col === 6) {\n        return {\n            kind: GridCellKind.Boolean,\n            data: row % 3 === 0 || row % 5 === 0,\n            readonly: true,\n            allowOverlay: false,\n        };\n    }\n    if (col === 7) {\n        return {\n            kind: GridCellKind.Text,\n            // RTL test\n            displayData: `הרפתקה חדשה`,\n            data: `הרפתקה חדשה`,\n            allowOverlay: true,\n            readonly: true,\n        };\n    }\n    if (col === 8) {\n        return {\n            kind: GridCellKind.Drilldown,\n            data: [\n                {\n                    text: \"Test\",\n                    img: \"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg\",\n                },\n                { text: \"No Image\" },\n            ],\n            allowOverlay: true,\n        };\n    }\n    return {\n        kind: GridCellKind.Text,\n        displayData: `${col}, ${row} 🦝`,\n        data: `${col}, ${row} 🦝`,\n        allowOverlay: true,\n    };\n}\n\nfunction getDummyCols() {\n    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(\n        i =>\n            ({\n                title: i.toString() + \" is the longest header in the world\",\n                width: 120 + (i % 4) * 10,\n                icon: \"headerString\",\n                hasMenu: true,\n            }) as GridColumn\n    );\n}\n\nexport function Simplenotest() {\n    const [cols, setColumns] = useState(getDummyCols);\n\n    const onColumnResize = useCallback(\n        (col: GridColumn, newSize: number) => {\n            const index = cols.indexOf(col);\n            const newCols = [...cols];\n            newCols[index] = {\n                ...newCols[index],\n                width: newSize,\n            };\n            setColumns(newCols);\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            getCellsForSelection={true}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n        />\n    );\n}\n\nfunction getDummyRelationColumn(): GridColumn[] {\n    return [\n        {\n            title: \"Relation\",\n            width: 360,\n            icon: \"headerString\",\n            hasMenu: true,\n        },\n    ];\n}\n\nfunction getDummyRelationData([col, row]: Item): GridCell {\n    return {\n        kind: GridCellKind.Drilldown,\n        data: [\n            {\n                text: `Image ${col}-${row}`,\n                img: \"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg\",\n            },\n            { text: `Text ${col}-${row}` },\n            { text: `More text ${col}-${row}` },\n        ],\n        allowOverlay: true,\n    };\n}\n\nexport function RelationColumn() {\n    const [cols, setColumns] = useState(getDummyRelationColumn);\n\n    const onColumnResize = useCallback(\n        (col: GridColumn, newSize: number) => {\n            const index = cols.indexOf(col);\n            const newCols = [...cols];\n            newCols[index] = {\n                ...newCols[index],\n                width: newSize,\n            };\n            setColumns(newCols);\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyRelationData}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n            smoothScrollX={true}\n            smoothScrollY={true}\n        />\n    );\n}\n\nconst columns: GridColumn[] = [\n    { title: \"Number\", width: 100, icon: \"headerArray\", overlayIcon: \"rowOwnerOverlay\" },\n    { title: \"Square\", width: 100 },\n];\n\nfunction getData([col, row]: Item): GridCell {\n    const n = Math.pow(row, col + 1);\n\n    return {\n        kind: GridCellKind.Number,\n        data: n,\n        displayData: n.toString(),\n        allowOverlay: false,\n    };\n}\n\nexport function Minimal() {\n    return <DataEditor width=\"100%\" getCellContent={getData} columns={columns} rows={1000} />;\n}\n\nexport function Smooth() {\n    const [cols, setCols] = useState(getDummyCols);\n\n    const onColumnResize = useCallback(\n        (column: GridColumn, newSize: number) => {\n            const index = cols.indexOf(column);\n            if (index !== -1) {\n                const newCol: GridColumn = {\n                    ...column,\n                    width: newSize,\n                };\n\n                const newCols = [...cols];\n                newCols.splice(index, 1, newCol);\n\n                setCols(newCols);\n            }\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            onColumnResize={onColumnResize}\n            columns={cols}\n            rows={1000}\n            smoothScrollY={true}\n            smoothScrollX={true}\n        />\n    );\n}\n\nexport function ManualControl() {\n    const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);\n\n    const cb = (newVal: GridSelection) => {\n        if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {\n            setGridSelection(newVal);\n        }\n    };\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            gridSelection={gridSelection}\n            onGridSelectionChange={cb}\n            getCellContent={getData}\n            columns={columns}\n            rows={1000}\n        />\n    );\n}\n\nexport function Draggable() {\n    return (\n        <DataEditor\n            width=\"100%\"\n            isDraggable={true}\n            onDragStart={args => {\n                args.setData(\"text\", \"testing\");\n            }}\n            getCellContent={getData}\n            columns={columns}\n            rows={1000}\n        />\n    );\n}\n\nexport function IdealSize() {\n    // trying to be 500x500\n    const cols: GridColumn[] = [\n        { title: \"Number\", width: 250 },\n        { title: \"Square\", width: 250 },\n    ];\n    return (\n        <div style={{ width: 500, height: 500, position: \"relative\" }}>\n            <DataEditor\n                width={500}\n                height={500}\n                isDraggable={true}\n                onDragStart={args => {\n                    args.setData(\"text\", \"testing\");\n                }}\n                getCellContent={getData}\n                columns={cols}\n                smoothScrollX={true}\n                smoothScrollY={true}\n                rowHeight={50}\n                headerHeight={50}\n                rows={9}\n            />\n        </div>\n    );\n}\n\nexport function DynamicAddRemoveColumns({ columnCount }: { columnCount: number }) {\n    // trying to be 500x500\n    const cols: GridColumn[] = [\n        { title: \"Number\", width: 250 },\n        { title: \"Square\", width: 250 },\n    ];\n\n    for (let i = 2; i < columnCount; i++) {\n        cols.push({\n            title: \"Foo\",\n            width: 250,\n        });\n    }\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            isDraggable={true}\n            getCellContent={getData}\n            columns={cols}\n            smoothScrollX={true}\n            smoothScrollY={true}\n            rowHeight={50}\n            headerHeight={50}\n            rows={9}\n        />\n    );\n}\nDynamicAddRemoveColumns.args = {\n    columnCount: 2,\n};\n\nexport function GridSelectionOutOfRangeNoColumns() {\n    const dummyCols = useMemo(\n        () => getDummyCols().map(v => ({ ...v, width: 300, title: \"Making column smaller used to crash!\" })),\n        []\n    );\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const [cols, setCols] = useState(dummyCols);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n            onColumnResize={(_col, newSize) => {\n                if (newSize > 300) {\n                    setCols(dummyCols);\n                } else {\n                    setCols([]);\n                }\n            }}\n        />\n    );\n}\n\ntype ResizableColumnsSizeMap = Record<string, number>;\n\nfunction getResizableColumnsInitSize(): ResizableColumnsSizeMap {\n    return {\n        \"resize me 0\": 120,\n        \"resize me 1\": 120,\n        \"resize me 2\": 120,\n        \"resize me 3\": 120,\n        \"resize me 4\": 120,\n        \"resize me 5\": 120,\n        \"resize me 6\": 120,\n        \"resize me 7\": 120,\n    };\n}\n\nfunction getResizableColumns(sizeMap: ResizableColumnsSizeMap): GridColumn[] {\n    return Object.entries(sizeMap).map(([title, width]) => ({\n        title,\n        width,\n        icon: \"headerString\",\n        hasMenu: true,\n    }));\n}\n\nexport function ResizableColumns() {\n    const [colSizes, setColSizes] = useState(getResizableColumnsInitSize);\n\n    const cols = useMemo(() => {\n        return getResizableColumns(colSizes);\n    }, [colSizes]);\n\n    const onColumnResize = useCallback((column: GridColumn, newSize: number) => {\n        setColSizes(prevColSizes => {\n            return {\n                ...prevColSizes,\n                [column.title]: newSize,\n            };\n        });\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={20}\n            isDraggable={false}\n            smoothScrollX={true}\n            smoothScrollY={true}\n            onColumnResize={onColumnResize}\n        />\n    );\n}\n\nexport function GridSelectionOutOfRangeLessColumnsThanSelection() {\n    const dummyCols = useMemo(\n        () => getDummyCols().map(v => ({ ...v, width: 300, title: \"Making column smaller used to crash!\" })),\n        []\n    );\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const [cols, setCols] = useState(dummyCols);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n            onColumnResize={(_col, newSize) => {\n                if (newSize > 300) {\n                    setCols(dummyCols);\n                } else {\n                    setCols([dummyCols[0]]);\n                }\n            }}\n        />\n    );\n}\n\nexport function GridAddNewRows() {\n    const cols = useMemo(getDummyCols, []);\n\n    const [rowsCount, setRowsCount] = useState(10);\n\n    const onRowAppended = useCallback(() => {\n        setRowsCount(r => r + 1);\n    }, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={rowsCount}\n            onRowAppended={onRowAppended}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport function GridNoTrailingBlankRow() {\n    const cols = useMemo(getDummyCols, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={100}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport function MarkdownEdits() {\n    const dummyCols: GridColumn[] = useMemo(() => {\n        return [\n            {\n                title: \"MD short\",\n                width: 50,\n            },\n            {\n                title: \"MD long\",\n                width: 50,\n            },\n        ];\n    }, []);\n\n    const dummyCells = useCallback(([col, _row]: Item) => {\n        if (col === 0) {\n            const editable: EditableGridCell = {\n                data: \"text\",\n                allowOverlay: true,\n                kind: GridCellKind.Markdown,\n            };\n            return editable;\n        } else if (col === 1) {\n            const editable: EditableGridCell = {\n                data: `text really really really long\n## H1\n\n- this\n- is\n- a\n- longer\n- example\n- to\n- test\n- scroll\n- of\n- preview\n                `,\n                allowOverlay: true,\n                kind: GridCellKind.Markdown,\n            };\n            return editable;\n        }\n        const editable: EditableGridCell = {\n            data: \"text\",\n            allowOverlay: true,\n            kind: GridCellKind.Markdown,\n        };\n        return editable;\n    }, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={dummyCells}\n            columns={dummyCols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport const CanEditBoolean = () => {\n    const [vals, setVals] = useState<[boolean | null | undefined, boolean | null | undefined]>([false, false]);\n    return (\n        <DataEditor\n            width=\"100%\"\n            columns={[\n                {\n                    title: \"Editable\",\n                    width: 100,\n                },\n                {\n                    title: \"Readonly\",\n                    width: 100,\n                },\n            ]}\n            rows={1}\n            getCellContent={([col]) => {\n                return {\n                    kind: GridCellKind.Boolean,\n                    readonly: col !== 0,\n                    allowOverlay: false,\n                    data: vals[col],\n                };\n            }}\n            onCellEdited={([col], newVal) => {\n                if (newVal.kind === GridCellKind.Boolean) {\n                    setVals(cv => {\n                        const f = [...cv];\n                        f.splice(col, 1, newVal.data);\n                        return f as [boolean, boolean];\n                    });\n                }\n            }}\n        />\n    );\n};\n\nexport const SimpleEditable = () => {\n    const [vals, setVals] = useState<[string, string][]>(() => {\n        const result: [string, string][] = [];\n        for (let i = 0; i < 2000; i++) {\n            result.push([\"Edit\", \"Me\"]);\n        }\n        return result;\n    });\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            columns={[\n                {\n                    title: \"Column A\",\n                    width: 250,\n                },\n                {\n                    title: \"Column B\",\n                    width: 250,\n                },\n            ]}\n            rows={vals.length}\n            getCellContent={([col, row]) => ({\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: vals[row][col],\n                displayData: vals[row][col],\n            })}\n            onCellEdited={([col, row], newVal) => {\n                const newVals = [...vals];\n                const newRow: [string, string] = [...newVals[row]];\n                if (typeof newVal.data === \"string\") {\n                    newRow[col] = newVal.data;\n                }\n                newVals[row] = newRow;\n                setVals(newVals);\n            }}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "Simplenotest": {
    "startLoc": {
      "col": 7,
      "line": 154
    },
    "endLoc": {
      "col": 1,
      "line": 180
    },
    "startBody": {
      "col": 7,
      "line": 154
    },
    "endBody": {
      "col": 1,
      "line": 180
    }
  },
  "RelationColumn": {
    "startLoc": {
      "col": 7,
      "line": 208
    },
    "endLoc": {
      "col": 1,
      "line": 235
    },
    "startBody": {
      "col": 7,
      "line": 208
    },
    "endBody": {
      "col": 1,
      "line": 235
    }
  },
  "Minimal": {
    "startLoc": {
      "col": 7,
      "line": 253
    },
    "endLoc": {
      "col": 1,
      "line": 255
    },
    "startBody": {
      "col": 7,
      "line": 253
    },
    "endBody": {
      "col": 1,
      "line": 255
    }
  },
  "Smooth": {
    "startLoc": {
      "col": 7,
      "line": 257
    },
    "endLoc": {
      "col": 1,
      "line": 289
    },
    "startBody": {
      "col": 7,
      "line": 257
    },
    "endBody": {
      "col": 1,
      "line": 289
    }
  },
  "ManualControl": {
    "startLoc": {
      "col": 7,
      "line": 291
    },
    "endLoc": {
      "col": 1,
      "line": 310
    },
    "startBody": {
      "col": 7,
      "line": 291
    },
    "endBody": {
      "col": 1,
      "line": 310
    }
  },
  "Draggable": {
    "startLoc": {
      "col": 7,
      "line": 312
    },
    "endLoc": {
      "col": 1,
      "line": 325
    },
    "startBody": {
      "col": 7,
      "line": 312
    },
    "endBody": {
      "col": 1,
      "line": 325
    }
  },
  "IdealSize": {
    "startLoc": {
      "col": 7,
      "line": 327
    },
    "endLoc": {
      "col": 1,
      "line": 352
    },
    "startBody": {
      "col": 7,
      "line": 327
    },
    "endBody": {
      "col": 1,
      "line": 352
    }
  },
  "DynamicAddRemoveColumns": {
    "startLoc": {
      "col": 7,
      "line": 354
    },
    "endLoc": {
      "col": 1,
      "line": 381
    },
    "startBody": {
      "col": 7,
      "line": 354
    },
    "endBody": {
      "col": 1,
      "line": 381
    }
  },
  "GridSelectionOutOfRangeNoColumns": {
    "startLoc": {
      "col": 7,
      "line": 386
    },
    "endLoc": {
      "col": 1,
      "line": 421
    },
    "startBody": {
      "col": 7,
      "line": 386
    },
    "endBody": {
      "col": 1,
      "line": 421
    }
  },
  "ResizableColumns": {
    "startLoc": {
      "col": 7,
      "line": 447
    },
    "endLoc": {
      "col": 1,
      "line": 475
    },
    "startBody": {
      "col": 7,
      "line": 447
    },
    "endBody": {
      "col": 1,
      "line": 475
    }
  },
  "GridSelectionOutOfRangeLessColumnsThanSelection": {
    "startLoc": {
      "col": 7,
      "line": 477
    },
    "endLoc": {
      "col": 1,
      "line": 512
    },
    "startBody": {
      "col": 7,
      "line": 477
    },
    "endBody": {
      "col": 1,
      "line": 512
    }
  },
  "GridAddNewRows": {
    "startLoc": {
      "col": 7,
      "line": 514
    },
    "endLoc": {
      "col": 1,
      "line": 540
    },
    "startBody": {
      "col": 7,
      "line": 514
    },
    "endBody": {
      "col": 1,
      "line": 540
    }
  },
  "GridNoTrailingBlankRow": {
    "startLoc": {
      "col": 7,
      "line": 542
    },
    "endLoc": {
      "col": 1,
      "line": 561
    },
    "startBody": {
      "col": 7,
      "line": 542
    },
    "endBody": {
      "col": 1,
      "line": 561
    }
  },
  "MarkdownEdits": {
    "startLoc": {
      "col": 7,
      "line": 563
    },
    "endLoc": {
      "col": 1,
      "line": 634
    },
    "startBody": {
      "col": 7,
      "line": 563
    },
    "endBody": {
      "col": 1,
      "line": 634
    }
  },
  "CanEditBoolean": {
    "startLoc": {
      "col": 30,
      "line": 636
    },
    "endLoc": {
      "col": 1,
      "line": 671
    },
    "startBody": {
      "col": 30,
      "line": 636
    },
    "endBody": {
      "col": 1,
      "line": 671
    }
  },
  "SimpleEditable": {
    "startLoc": {
      "col": 30,
      "line": 673
    },
    "endLoc": {
      "col": 1,
      "line": 713
    },
    "startBody": {
      "col": 30,
      "line": 673
    },
    "endBody": {
      "col": 1,
      "line": 713
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "\nimport * as React from \"react\";\n\nimport { useState, useCallback, useMemo } from \"@storybook/addons\";\nimport { BuilderThemeWrapper } from \"../../stories/story-utils.js\";\nimport {\n    CompactSelection,\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type GridSelection,\n    type Item,\n} from \"../../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\n\nexport default {\n    title: \"Tests/TestCases\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <BuilderThemeWrapper width={1000} height={800}>\n                <Story />\n            </BuilderThemeWrapper>\n        ),\n    ],\n};\n\nfunction getDummyData([col, row]: Item): GridCell {\n    if (col === 0) {\n        return {\n            kind: GridCellKind.RowID,\n            data: `RowID ${col}, ${row}`,\n            allowOverlay: false,\n        };\n    }\n    if (col === 1) {\n        return {\n            kind: GridCellKind.Bubble,\n            data: [\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n                `Bub ${col}`,\n                `Bub ${row}`,\n            ],\n            allowOverlay: true,\n        };\n    }\n    if (col === 2) {\n        return {\n            kind: GridCellKind.Image,\n            data: [\n                \"https://i.imgur.com/5J0BftG.jpg\",\n                \"https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581\",\n            ],\n            allowOverlay: true,\n            readonly: false,\n        };\n    }\n    if (col === 3) {\n        return {\n            kind: GridCellKind.Markdown,\n            data: `## Markdown has titles\n\nAnd supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.\n\n\n[Google](https://google.com)\n\n- with\n- lists\n- that\n- can\n- be\n- pretty\n- long\n                    `,\n            allowOverlay: true,\n        };\n    }\n    if (col === 4) {\n        return {\n            kind: GridCellKind.Number,\n            displayData: \"$10,352\",\n            allowOverlay: true,\n            data: 10_352,\n            readonly: true,\n        };\n    }\n    if (col === 5) {\n        return {\n            kind: GridCellKind.Uri,\n            data: \"https://www.google.com\",\n            allowOverlay: true,\n        };\n    }\n    if (col === 6) {\n        return {\n            kind: GridCellKind.Boolean,\n            data: row % 3 === 0 || row % 5 === 0,\n            readonly: true,\n            allowOverlay: false,\n        };\n    }\n    if (col === 7) {\n        return {\n            kind: GridCellKind.Text,\n            // RTL test\n            displayData: `הרפתקה חדשה`,\n            data: `הרפתקה חדשה`,\n            allowOverlay: true,\n            readonly: true,\n        };\n    }\n    if (col === 8) {\n        return {\n            kind: GridCellKind.Drilldown,\n            data: [\n                {\n                    text: \"Test\",\n                    img: \"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg\",\n                },\n                { text: \"No Image\" },\n            ],\n            allowOverlay: true,\n        };\n    }\n    return {\n        kind: GridCellKind.Text,\n        displayData: `${col}, ${row} 🦝`,\n        data: `${col}, ${row} 🦝`,\n        allowOverlay: true,\n    };\n}\n\nfunction getDummyCols() {\n    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(\n        i =>\n            ({\n                title: i.toString() + \" is the longest header in the world\",\n                width: 120 + (i % 4) * 10,\n                icon: \"headerString\",\n                hasMenu: true,\n            }) as GridColumn\n    );\n}\n\nexport function Simplenotest() {\n    const [cols, setColumns] = useState(getDummyCols);\n\n    const onColumnResize = useCallback(\n        (col: GridColumn, newSize: number) => {\n            const index = cols.indexOf(col);\n            const newCols = [...cols];\n            newCols[index] = {\n                ...newCols[index],\n                width: newSize,\n            };\n            setColumns(newCols);\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            getCellsForSelection={true}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n        />\n    );\n}\n\nfunction getDummyRelationColumn(): GridColumn[] {\n    return [\n        {\n            title: \"Relation\",\n            width: 360,\n            icon: \"headerString\",\n            hasMenu: true,\n        },\n    ];\n}\n\nfunction getDummyRelationData([col, row]: Item): GridCell {\n    return {\n        kind: GridCellKind.Drilldown,\n        data: [\n            {\n                text: `Image ${col}-${row}`,\n                img: \"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg\",\n            },\n            { text: `Text ${col}-${row}` },\n            { text: `More text ${col}-${row}` },\n        ],\n        allowOverlay: true,\n    };\n}\n\nexport function RelationColumn() {\n    const [cols, setColumns] = useState(getDummyRelationColumn);\n\n    const onColumnResize = useCallback(\n        (col: GridColumn, newSize: number) => {\n            const index = cols.indexOf(col);\n            const newCols = [...cols];\n            newCols[index] = {\n                ...newCols[index],\n                width: newSize,\n            };\n            setColumns(newCols);\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyRelationData}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n            smoothScrollX={true}\n            smoothScrollY={true}\n        />\n    );\n}\n\nconst columns: GridColumn[] = [\n    { title: \"Number\", width: 100, icon: \"headerArray\", overlayIcon: \"rowOwnerOverlay\" },\n    { title: \"Square\", width: 100 },\n];\n\nfunction getData([col, row]: Item): GridCell {\n    const n = Math.pow(row, col + 1);\n\n    return {\n        kind: GridCellKind.Number,\n        data: n,\n        displayData: n.toString(),\n        allowOverlay: false,\n    };\n}\n\nexport function Minimal() {\n    return <DataEditor width=\"100%\" getCellContent={getData} columns={columns} rows={1000} />;\n}\n\nexport function Smooth() {\n    const [cols, setCols] = useState(getDummyCols);\n\n    const onColumnResize = useCallback(\n        (column: GridColumn, newSize: number) => {\n            const index = cols.indexOf(column);\n            if (index !== -1) {\n                const newCol: GridColumn = {\n                    ...column,\n                    width: newSize,\n                };\n\n                const newCols = [...cols];\n                newCols.splice(index, 1, newCol);\n\n                setCols(newCols);\n            }\n        },\n        [cols]\n    );\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            onColumnResize={onColumnResize}\n            columns={cols}\n            rows={1000}\n            smoothScrollY={true}\n            smoothScrollX={true}\n        />\n    );\n}\n\nexport function ManualControl() {\n    const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);\n\n    const cb = (newVal: GridSelection) => {\n        if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {\n            setGridSelection(newVal);\n        }\n    };\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            gridSelection={gridSelection}\n            onGridSelectionChange={cb}\n            getCellContent={getData}\n            columns={columns}\n            rows={1000}\n        />\n    );\n}\n\nexport function Draggable() {\n    return (\n        <DataEditor\n            width=\"100%\"\n            isDraggable={true}\n            onDragStart={args => {\n                args.setData(\"text\", \"testing\");\n            }}\n            getCellContent={getData}\n            columns={columns}\n            rows={1000}\n        />\n    );\n}\n\nexport function IdealSize() {\n    // trying to be 500x500\n    const cols: GridColumn[] = [\n        { title: \"Number\", width: 250 },\n        { title: \"Square\", width: 250 },\n    ];\n    return (\n        <div style={{ width: 500, height: 500, position: \"relative\" }}>\n            <DataEditor\n                width={500}\n                height={500}\n                isDraggable={true}\n                onDragStart={args => {\n                    args.setData(\"text\", \"testing\");\n                }}\n                getCellContent={getData}\n                columns={cols}\n                smoothScrollX={true}\n                smoothScrollY={true}\n                rowHeight={50}\n                headerHeight={50}\n                rows={9}\n            />\n        </div>\n    );\n}\n\nexport function DynamicAddRemoveColumns({ columnCount }: { columnCount: number }) {\n    // trying to be 500x500\n    const cols: GridColumn[] = [\n        { title: \"Number\", width: 250 },\n        { title: \"Square\", width: 250 },\n    ];\n\n    for (let i = 2; i < columnCount; i++) {\n        cols.push({\n            title: \"Foo\",\n            width: 250,\n        });\n    }\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            isDraggable={true}\n            getCellContent={getData}\n            columns={cols}\n            smoothScrollX={true}\n            smoothScrollY={true}\n            rowHeight={50}\n            headerHeight={50}\n            rows={9}\n        />\n    );\n}\nDynamicAddRemoveColumns.args = {\n    columnCount: 2,\n};\n\nexport function GridSelectionOutOfRangeNoColumns() {\n    const dummyCols = useMemo(\n        () => getDummyCols().map(v => ({ ...v, width: 300, title: \"Making column smaller used to crash!\" })),\n        []\n    );\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const [cols, setCols] = useState(dummyCols);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n            onColumnResize={(_col, newSize) => {\n                if (newSize > 300) {\n                    setCols(dummyCols);\n                } else {\n                    setCols([]);\n                }\n            }}\n        />\n    );\n}\n\ntype ResizableColumnsSizeMap = Record<string, number>;\n\nfunction getResizableColumnsInitSize(): ResizableColumnsSizeMap {\n    return {\n        \"resize me 0\": 120,\n        \"resize me 1\": 120,\n        \"resize me 2\": 120,\n        \"resize me 3\": 120,\n        \"resize me 4\": 120,\n        \"resize me 5\": 120,\n        \"resize me 6\": 120,\n        \"resize me 7\": 120,\n    };\n}\n\nfunction getResizableColumns(sizeMap: ResizableColumnsSizeMap): GridColumn[] {\n    return Object.entries(sizeMap).map(([title, width]) => ({\n        title,\n        width,\n        icon: \"headerString\",\n        hasMenu: true,\n    }));\n}\n\nexport function ResizableColumns() {\n    const [colSizes, setColSizes] = useState(getResizableColumnsInitSize);\n\n    const cols = useMemo(() => {\n        return getResizableColumns(colSizes);\n    }, [colSizes]);\n\n    const onColumnResize = useCallback((column: GridColumn, newSize: number) => {\n        setColSizes(prevColSizes => {\n            return {\n                ...prevColSizes,\n                [column.title]: newSize,\n            };\n        });\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={20}\n            isDraggable={false}\n            smoothScrollX={true}\n            smoothScrollY={true}\n            onColumnResize={onColumnResize}\n        />\n    );\n}\n\nexport function GridSelectionOutOfRangeLessColumnsThanSelection() {\n    const dummyCols = useMemo(\n        () => getDummyCols().map(v => ({ ...v, width: 300, title: \"Making column smaller used to crash!\" })),\n        []\n    );\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const [cols, setCols] = useState(dummyCols);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n            onColumnResize={(_col, newSize) => {\n                if (newSize > 300) {\n                    setCols(dummyCols);\n                } else {\n                    setCols([dummyCols[0]]);\n                }\n            }}\n        />\n    );\n}\n\nexport function GridAddNewRows() {\n    const cols = useMemo(getDummyCols, []);\n\n    const [rowsCount, setRowsCount] = useState(10);\n\n    const onRowAppended = useCallback(() => {\n        setRowsCount(r => r + 1);\n    }, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={rowsCount}\n            onRowAppended={onRowAppended}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport function GridNoTrailingBlankRow() {\n    const cols = useMemo(getDummyCols, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={getDummyData}\n            columns={cols}\n            rows={100}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport function MarkdownEdits() {\n    const dummyCols: GridColumn[] = useMemo(() => {\n        return [\n            {\n                title: \"MD short\",\n                width: 50,\n            },\n            {\n                title: \"MD long\",\n                width: 50,\n            },\n        ];\n    }, []);\n\n    const dummyCells = useCallback(([col, _row]: Item) => {\n        if (col === 0) {\n            const editable: EditableGridCell = {\n                data: \"text\",\n                allowOverlay: true,\n                kind: GridCellKind.Markdown,\n            };\n            return editable;\n        } else if (col === 1) {\n            const editable: EditableGridCell = {\n                data: `text really really really long\n## H1\n\n- this\n- is\n- a\n- longer\n- example\n- to\n- test\n- scroll\n- of\n- preview\n                `,\n                allowOverlay: true,\n                kind: GridCellKind.Markdown,\n            };\n            return editable;\n        }\n        const editable: EditableGridCell = {\n            data: \"text\",\n            allowOverlay: true,\n            kind: GridCellKind.Markdown,\n        };\n        return editable;\n    }, []);\n\n    const [selected, setSelected] = useState<GridSelection | undefined>({\n        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const onSelected = useCallback((newSel?: GridSelection) => {\n        setSelected(newSel);\n    }, []);\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            getCellContent={dummyCells}\n            columns={dummyCols}\n            rows={1000}\n            onGridSelectionChange={onSelected}\n            gridSelection={selected}\n        />\n    );\n}\n\nexport const CanEditBoolean = () => {\n    const [vals, setVals] = useState<[boolean | null | undefined, boolean | null | undefined]>([false, false]);\n    return (\n        <DataEditor\n            width=\"100%\"\n            columns={[\n                {\n                    title: \"Editable\",\n                    width: 100,\n                },\n                {\n                    title: \"Readonly\",\n                    width: 100,\n                },\n            ]}\n            rows={1}\n            getCellContent={([col]) => {\n                return {\n                    kind: GridCellKind.Boolean,\n                    readonly: col !== 0,\n                    allowOverlay: false,\n                    data: vals[col],\n                };\n            }}\n            onCellEdited={([col], newVal) => {\n                if (newVal.kind === GridCellKind.Boolean) {\n                    setVals(cv => {\n                        const f = [...cv];\n                        f.splice(col, 1, newVal.data);\n                        return f as [boolean, boolean];\n                    });\n                }\n            }}\n        />\n    );\n};\n\nexport const SimpleEditable = () => {\n    const [vals, setVals] = useState<[string, string][]>(() => {\n        const result: [string, string][] = [];\n        for (let i = 0; i < 2000; i++) {\n            result.push([\"Edit\", \"Me\"]);\n        }\n        return result;\n    });\n\n    return (\n        <DataEditor\n            width=\"100%\"\n            columns={[\n                {\n                    title: \"Column A\",\n                    width: 250,\n                },\n                {\n                    title: \"Column B\",\n                    width: 250,\n                },\n            ]}\n            rows={vals.length}\n            getCellContent={([col, row]) => ({\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: vals[row][col],\n                displayData: vals[row][col],\n            })}\n            onCellEdited={([col, row], newVal) => {\n                const newVals = [...vals];\n                const newRow: [string, string] = [...newVals[row]];\n                if (typeof newVal.data === \"string\") {\n                    newRow[col] = newVal.data;\n                }\n                newVals[row] = newRow;\n                setVals(newVals);\n            }}\n        />\n    );\n};\n",
      "locationsMap": {
        "simplenotest": {
          "startLoc": {
            "col": 7,
            "line": 154
          },
          "endLoc": {
            "col": 1,
            "line": 180
          },
          "startBody": {
            "col": 7,
            "line": 154
          },
          "endBody": {
            "col": 1,
            "line": 180
          }
        },
        "relation-column": {
          "startLoc": {
            "col": 7,
            "line": 208
          },
          "endLoc": {
            "col": 1,
            "line": 235
          },
          "startBody": {
            "col": 7,
            "line": 208
          },
          "endBody": {
            "col": 1,
            "line": 235
          }
        },
        "minimal": {
          "startLoc": {
            "col": 7,
            "line": 253
          },
          "endLoc": {
            "col": 1,
            "line": 255
          },
          "startBody": {
            "col": 7,
            "line": 253
          },
          "endBody": {
            "col": 1,
            "line": 255
          }
        },
        "smooth": {
          "startLoc": {
            "col": 7,
            "line": 257
          },
          "endLoc": {
            "col": 1,
            "line": 289
          },
          "startBody": {
            "col": 7,
            "line": 257
          },
          "endBody": {
            "col": 1,
            "line": 289
          }
        },
        "manual-control": {
          "startLoc": {
            "col": 7,
            "line": 291
          },
          "endLoc": {
            "col": 1,
            "line": 310
          },
          "startBody": {
            "col": 7,
            "line": 291
          },
          "endBody": {
            "col": 1,
            "line": 310
          }
        },
        "draggable": {
          "startLoc": {
            "col": 7,
            "line": 312
          },
          "endLoc": {
            "col": 1,
            "line": 325
          },
          "startBody": {
            "col": 7,
            "line": 312
          },
          "endBody": {
            "col": 1,
            "line": 325
          }
        },
        "ideal-size": {
          "startLoc": {
            "col": 7,
            "line": 327
          },
          "endLoc": {
            "col": 1,
            "line": 352
          },
          "startBody": {
            "col": 7,
            "line": 327
          },
          "endBody": {
            "col": 1,
            "line": 352
          }
        },
        "dynamic-add-remove-columns": {
          "startLoc": {
            "col": 7,
            "line": 354
          },
          "endLoc": {
            "col": 1,
            "line": 381
          },
          "startBody": {
            "col": 7,
            "line": 354
          },
          "endBody": {
            "col": 1,
            "line": 381
          }
        },
        "grid-selection-out-of-range-no-columns": {
          "startLoc": {
            "col": 7,
            "line": 386
          },
          "endLoc": {
            "col": 1,
            "line": 421
          },
          "startBody": {
            "col": 7,
            "line": 386
          },
          "endBody": {
            "col": 1,
            "line": 421
          }
        },
        "resizable-columns": {
          "startLoc": {
            "col": 7,
            "line": 447
          },
          "endLoc": {
            "col": 1,
            "line": 475
          },
          "startBody": {
            "col": 7,
            "line": 447
          },
          "endBody": {
            "col": 1,
            "line": 475
          }
        },
        "grid-selection-out-of-range-less-columns-than-selection": {
          "startLoc": {
            "col": 7,
            "line": 477
          },
          "endLoc": {
            "col": 1,
            "line": 512
          },
          "startBody": {
            "col": 7,
            "line": 477
          },
          "endBody": {
            "col": 1,
            "line": 512
          }
        },
        "grid-add-new-rows": {
          "startLoc": {
            "col": 7,
            "line": 514
          },
          "endLoc": {
            "col": 1,
            "line": 540
          },
          "startBody": {
            "col": 7,
            "line": 514
          },
          "endBody": {
            "col": 1,
            "line": 540
          }
        },
        "grid-no-trailing-blank-row": {
          "startLoc": {
            "col": 7,
            "line": 542
          },
          "endLoc": {
            "col": 1,
            "line": 561
          },
          "startBody": {
            "col": 7,
            "line": 542
          },
          "endBody": {
            "col": 1,
            "line": 561
          }
        },
        "markdown-edits": {
          "startLoc": {
            "col": 7,
            "line": 563
          },
          "endLoc": {
            "col": 1,
            "line": 634
          },
          "startBody": {
            "col": 7,
            "line": 563
          },
          "endBody": {
            "col": 1,
            "line": 634
          }
        },
        "can-edit-boolean": {
          "startLoc": {
            "col": 30,
            "line": 636
          },
          "endLoc": {
            "col": 1,
            "line": 671
          },
          "startBody": {
            "col": 30,
            "line": 636
          },
          "endBody": {
            "col": 1,
            "line": 671
          }
        },
        "simple-editable": {
          "startLoc": {
            "col": 30,
            "line": 673
          },
          "endLoc": {
            "col": 1,
            "line": 713
          },
          "startBody": {
            "col": 30,
            "line": 673
          },
          "endBody": {
            "col": 1,
            "line": 713
          }
        }
      }
    }
  },
  title: "Tests/TestCases",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BuilderThemeWrapper */ .j, {
    width: 1000,
    height: 800,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Story, {})
  })]
});
function getDummyData(_ref) {
  let [col, row] = _ref;
  if (col === 0) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.RowID */ .p6.RowID,
      data: `RowID ${col}, ${row}`,
      allowOverlay: false
    };
  }
  if (col === 1) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Bubble */ .p6.Bubble,
      data: [`Bub ${col}`, `Bub ${row}`, `Bub ${col}`, `Bub ${row}`, `Bub ${col}`, `Bub ${row}`, `Bub ${col}`, `Bub ${row}`, `Bub ${col}`, `Bub ${row}`],
      allowOverlay: true
    };
  }
  if (col === 2) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Image */ .p6.Image,
      data: ["https://i.imgur.com/5J0BftG.jpg", "https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581"],
      allowOverlay: true,
      readonly: false
    };
  }
  if (col === 3) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Markdown */ .p6.Markdown,
      data: `## Markdown has titles

And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.


[Google](https://google.com)

- with
- lists
- that
- can
- be
- pretty
- long
                    `,
      allowOverlay: true
    };
  }
  if (col === 4) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Number */ .p6.Number,
      displayData: "$10,352",
      allowOverlay: true,
      data: 10352,
      readonly: true
    };
  }
  if (col === 5) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Uri */ .p6.Uri,
      data: "https://www.google.com",
      allowOverlay: true
    };
  }
  if (col === 6) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Boolean */ .p6.Boolean,
      data: row % 3 === 0 || row % 5 === 0,
      readonly: true,
      allowOverlay: false
    };
  }
  if (col === 7) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
      displayData: `הרפתקה חדשה`,
      data: `הרפתקה חדשה`,
      allowOverlay: true,
      readonly: true
    };
  }
  if (col === 8) {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Drilldown */ .p6.Drilldown,
      data: [{
        text: "Test",
        img: "https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"
      }, {
        text: "No Image"
      }],
      allowOverlay: true
    };
  }
  return {
    kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
    displayData: `${col}, ${row} 🦝`,
    data: `${col}, ${row} 🦝`,
    allowOverlay: true
  };
}
function getDummyCols() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => ({
    title: i.toString() + " is the longest header in the world",
    width: 120 + i % 4 * 10,
    icon: "headerString",
    hasMenu: true
  }));
}
const Simplenotest = function Simplenotest() {
  const [cols, setColumns] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(getDummyCols);
  const onColumnResize = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)((col, newSize) => {
    const index = cols.indexOf(col);
    const newCols = [...cols];
    newCols[index] = {
      ...newCols[index],
      width: newSize
    };
    setColumns(newCols);
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    getCellsForSelection: true,
    columns: cols,
    rows: 1000,
    onColumnResize: onColumnResize
  });
};
Simplenotest.displayName = "Simplenotest";
function getDummyRelationColumn() {
  return [{
    title: "Relation",
    width: 360,
    icon: "headerString",
    hasMenu: true
  }];
}
function getDummyRelationData(_ref2) {
  let [col, row] = _ref2;
  return {
    kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Drilldown */ .p6.Drilldown,
    data: [{
      text: `Image ${col}-${row}`,
      img: "https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"
    }, {
      text: `Text ${col}-${row}`
    }, {
      text: `More text ${col}-${row}`
    }],
    allowOverlay: true
  };
}
const RelationColumn = function RelationColumn() {
  const [cols, setColumns] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(getDummyRelationColumn);
  const onColumnResize = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)((col, newSize) => {
    const index = cols.indexOf(col);
    const newCols = [...cols];
    newCols[index] = {
      ...newCols[index],
      width: newSize
    };
    setColumns(newCols);
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyRelationData,
    columns: cols,
    rows: 1000,
    onColumnResize: onColumnResize,
    smoothScrollX: true,
    smoothScrollY: true
  });
};
RelationColumn.displayName = "RelationColumn";
const columns = [{
  title: "Number",
  width: 100,
  icon: "headerArray",
  overlayIcon: "rowOwnerOverlay"
}, {
  title: "Square",
  width: 100
}];
function getData(_ref3) {
  let [col, row] = _ref3;
  const n = Math.pow(row, col + 1);
  return {
    kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Number */ .p6.Number,
    data: n,
    displayData: n.toString(),
    allowOverlay: false
  };
}
const Minimal = function Minimal() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
};
Minimal.displayName = "Minimal";
const Smooth = function Smooth() {
  const [cols, setCols] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(getDummyCols);
  const onColumnResize = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)((column, newSize) => {
    const index = cols.indexOf(column);
    if (index !== -1) {
      const newCol = {
        ...column,
        width: newSize
      };
      const newCols = [...cols];
      newCols.splice(index, 1, newCol);
      setCols(newCols);
    }
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    onColumnResize: onColumnResize,
    columns: cols,
    rows: 1000,
    smoothScrollY: true,
    smoothScrollX: true
  });
};
Smooth.displayName = "Smooth";
const ManualControl = function ManualControl() {
  const [gridSelection, setGridSelection] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  const cb = newVal => {
    var _newVal$current$cell$, _newVal$current;
    if (((_newVal$current$cell$ = (_newVal$current = newVal.current) === null || _newVal$current === void 0 ? void 0 : _newVal$current.cell[0]) !== null && _newVal$current$cell$ !== void 0 ? _newVal$current$cell$ : 0) % 2 === 0) {
      setGridSelection(newVal);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    gridSelection: gridSelection,
    onGridSelectionChange: cb,
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
};
ManualControl.displayName = "ManualControl";
const Draggable = function Draggable() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    isDraggable: true,
    onDragStart: args => {
      args.setData("text", "testing");
    },
    getCellContent: getData,
    columns: columns,
    rows: 1000
  });
};
Draggable.displayName = "Draggable";
const IdealSize = function IdealSize() {
  const cols = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    style: {
      width: 500,
      height: 500,
      position: "relative"
    },
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      width: 500,
      height: 500,
      isDraggable: true,
      onDragStart: args => {
        args.setData("text", "testing");
      },
      getCellContent: getData,
      columns: cols,
      smoothScrollX: true,
      smoothScrollY: true,
      rowHeight: 50,
      headerHeight: 50,
      rows: 9
    })
  });
};
IdealSize.displayName = "IdealSize";
const DynamicAddRemoveColumns = function DynamicAddRemoveColumns(_ref4) {
  let {
    columnCount
  } = _ref4;
  const cols = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];
  for (let i = 2; i < columnCount; i++) {
    cols.push({
      title: "Foo",
      width: 250
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    isDraggable: true,
    getCellContent: getData,
    columns: cols,
    smoothScrollX: true,
    smoothScrollY: true,
    rowHeight: 50,
    headerHeight: 50,
    rows: 9
  });
};
DynamicAddRemoveColumns.displayName = "DynamicAddRemoveColumns";
DynamicAddRemoveColumns.args = {
  columnCount: 2
};
const GridSelectionOutOfRangeNoColumns = function GridSelectionOutOfRangeNoColumns() {
  const dummyCols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => getDummyCols().map(v => ({
    ...v,
    width: 300,
    title: "Making column smaller used to crash!"
  })), []);
  const [selected, setSelected] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  const [cols, setCols] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(dummyCols);
  const onSelected = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newSel => {
    setSelected(newSel);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    columns: cols,
    rows: 1000,
    onGridSelectionChange: onSelected,
    gridSelection: selected,
    onColumnResize: (_col, newSize) => {
      if (newSize > 300) {
        setCols(dummyCols);
      } else {
        setCols([]);
      }
    }
  });
};
GridSelectionOutOfRangeNoColumns.displayName = "GridSelectionOutOfRangeNoColumns";
function getResizableColumnsInitSize() {
  return {
    "resize me 0": 120,
    "resize me 1": 120,
    "resize me 2": 120,
    "resize me 3": 120,
    "resize me 4": 120,
    "resize me 5": 120,
    "resize me 6": 120,
    "resize me 7": 120
  };
}
function getResizableColumns(sizeMap) {
  return Object.entries(sizeMap).map(_ref5 => {
    let [title, width] = _ref5;
    return {
      title,
      width,
      icon: "headerString",
      hasMenu: true
    };
  });
}
const ResizableColumns = function ResizableColumns() {
  const [colSizes, setColSizes] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(getResizableColumnsInitSize);
  const cols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return getResizableColumns(colSizes);
  }, [colSizes]);
  const onColumnResize = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)((column, newSize) => {
    setColSizes(prevColSizes => {
      return {
        ...prevColSizes,
        [column.title]: newSize
      };
    });
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    columns: cols,
    rows: 20,
    isDraggable: false,
    smoothScrollX: true,
    smoothScrollY: true,
    onColumnResize: onColumnResize
  });
};
ResizableColumns.displayName = "ResizableColumns";
const GridSelectionOutOfRangeLessColumnsThanSelection = function GridSelectionOutOfRangeLessColumnsThanSelection() {
  const dummyCols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => getDummyCols().map(v => ({
    ...v,
    width: 300,
    title: "Making column smaller used to crash!"
  })), []);
  const [selected, setSelected] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  const [cols, setCols] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(dummyCols);
  const onSelected = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newSel => {
    setSelected(newSel);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    columns: cols,
    rows: 1000,
    onGridSelectionChange: onSelected,
    gridSelection: selected,
    onColumnResize: (_col, newSize) => {
      if (newSize > 300) {
        setCols(dummyCols);
      } else {
        setCols([dummyCols[0]]);
      }
    }
  });
};
GridSelectionOutOfRangeLessColumnsThanSelection.displayName = "GridSelectionOutOfRangeLessColumnsThanSelection";
const GridAddNewRows = function GridAddNewRows() {
  const cols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(getDummyCols, []);
  const [rowsCount, setRowsCount] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(10);
  const onRowAppended = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setRowsCount(r => r + 1);
  }, []);
  const [selected, setSelected] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  const onSelected = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newSel => {
    setSelected(newSel);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    columns: cols,
    rows: rowsCount,
    onRowAppended: onRowAppended,
    onGridSelectionChange: onSelected,
    gridSelection: selected
  });
};
GridAddNewRows.displayName = "GridAddNewRows";
const GridNoTrailingBlankRow = function GridNoTrailingBlankRow() {
  const cols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(getDummyCols, []);
  const [selected, setSelected] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  const onSelected = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newSel => {
    setSelected(newSel);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: getDummyData,
    columns: cols,
    rows: 100,
    onGridSelectionChange: onSelected,
    gridSelection: selected
  });
};
GridNoTrailingBlankRow.displayName = "GridNoTrailingBlankRow";
const MarkdownEdits = function MarkdownEdits() {
  const dummyCols = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return [{
      title: "MD short",
      width: 50
    }, {
      title: "MD long",
      width: 50
    }];
  }, []);
  const dummyCells = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(_ref6 => {
    let [col, _row] = _ref6;
    if (col === 0) {
      const editable = {
        data: "text",
        allowOverlay: true,
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Markdown */ .p6.Markdown
      };
      return editable;
    } else if (col === 1) {
      const editable = {
        data: `text really really really long
## H1

- this
- is
- a
- longer
- example
- to
- test
- scroll
- of
- preview
                `,
        allowOverlay: true,
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Markdown */ .p6.Markdown
      };
      return editable;
    }
    const editable = {
      data: "text",
      allowOverlay: true,
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Markdown */ .p6.Markdown
    };
    return editable;
  }, []);
  const [selected, setSelected] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  const onSelected = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newSel => {
    setSelected(newSel);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    getCellContent: dummyCells,
    columns: dummyCols,
    rows: 1000,
    onGridSelectionChange: onSelected,
    gridSelection: selected
  });
};
MarkdownEdits.displayName = "MarkdownEdits";
const CanEditBoolean = () => {
  const [vals, setVals] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)([false, false]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    columns: [{
      title: "Editable",
      width: 100
    }, {
      title: "Readonly",
      width: 100
    }],
    rows: 1,
    getCellContent: _ref7 => {
      let [col] = _ref7;
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Boolean */ .p6.Boolean,
        readonly: col !== 0,
        allowOverlay: false,
        data: vals[col]
      };
    },
    onCellEdited: (_ref8, newVal) => {
      let [col] = _ref8;
      if (newVal.kind === _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Boolean */ .p6.Boolean) {
        setVals(cv => {
          const f = [...cv];
          f.splice(col, 1, newVal.data);
          return f;
        });
      }
    }
  });
};
CanEditBoolean.displayName = "CanEditBoolean";
;
const SimpleEditable = () => {
  const [vals, setVals] = (0,_storybook_addons__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    const result = [];
    for (let i = 0; i < 2000; i++) {
      result.push(["Edit", "Me"]);
    }
    return result;
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    width: "100%",
    columns: [{
      title: "Column A",
      width: 250
    }, {
      title: "Column B",
      width: 250
    }],
    rows: vals.length,
    getCellContent: _ref9 => {
      let [col, row] = _ref9;
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
        allowOverlay: true,
        data: vals[row][col],
        displayData: vals[row][col]
      };
    },
    onCellEdited: (_ref10, newVal) => {
      let [col, row] = _ref10;
      const newVals = [...vals];
      const newRow = [...newVals[row]];
      if (typeof newVal.data === "string") {
        newRow[col] = newVal.data;
      }
      newVals[row] = newRow;
      setVals(newVals);
    }
  });
};
SimpleEditable.displayName = "SimpleEditable";;const __namedExportsOrder = ["Simplenotest","RelationColumn","Minimal","Smooth","ManualControl","Draggable","IdealSize","DynamicAddRemoveColumns","GridSelectionOutOfRangeNoColumns","ResizableColumns","GridSelectionOutOfRangeLessColumnsThanSelection","GridAddNewRows","GridNoTrailingBlankRow","MarkdownEdits","CanEditBoolean","SimpleEditable"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-data-editor-stories-data-editor-stories.b1100dff.iframe.bundle.js.map