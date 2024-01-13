"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2545],{

/***/ "./packages/core/src/docs/examples/trailing-row-options.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrailingRowOptions": () => (/* binding */ TrailingRowOptions),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridColumnIcon, type GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Trailing row options\"\n                    description={\n                        <Description>\n                            You can customize the trailing row in each column by setting a{\" \"}\n                            <PropName>trailingRowOptions</PropName> in your columns.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst trailingRowOptionsColumnIndexesHint: Record<number, string> = {\n    2: \"Smol text\",\n    3: \"Add\",\n    5: \"New\",\n};\n\nconst trailingRowOptionsColumnIndexesIcon: Record<number, string> = {\n    2: GridColumnIcon.HeaderArray,\n    3: GridColumnIcon.HeaderEmoji,\n    5: GridColumnIcon.HeaderNumber,\n};\n\nconst trailingRowOptionsColumnIndexesTarget: Record<number, number> = {\n    2: 0,\n    3: 0,\n    5: 0,\n};\n\nconst trailingRowOptionsColumnIndexesDisabled: Record<number, boolean> = {\n    3: true,\n};\n\nconst trailingRowOptionsColumnIndexesTheme: Record<number, Partial<Theme>> = {\n    2: {\n        baseFontStyle: \"10px\",\n    },\n};\n\nexport const TrailingRowOptions: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    const columnsWithRowOptions: GridColumn[] = React.useMemo(() => {\n        return cols.map((c, idx) => ({\n            ...c,\n            trailingRowOptions: {\n                hint: trailingRowOptionsColumnIndexesHint[idx],\n                addIcon: trailingRowOptionsColumnIndexesIcon[idx],\n                targetColumn: trailingRowOptionsColumnIndexesTarget[idx],\n                disabled: trailingRowOptionsColumnIndexesDisabled[idx],\n                themeOverride: trailingRowOptionsColumnIndexesTheme[idx],\n            },\n        }));\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columnsWithRowOptions}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                tint: true,\n                sticky: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "TrailingRowOptions": {
    "startLoc": {
      "col": 45,
      "line": 64
    },
    "endLoc": {
      "col": 1,
      "line": 106
    },
    "startBody": {
      "col": 45,
      "line": 64
    },
    "endBody": {
      "col": 1,
      "line": 106
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridColumnIcon, type GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Trailing row options\"\n                    description={\n                        <Description>\n                            You can customize the trailing row in each column by setting a{\" \"}\n                            <PropName>trailingRowOptions</PropName> in your columns.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst trailingRowOptionsColumnIndexesHint: Record<number, string> = {\n    2: \"Smol text\",\n    3: \"Add\",\n    5: \"New\",\n};\n\nconst trailingRowOptionsColumnIndexesIcon: Record<number, string> = {\n    2: GridColumnIcon.HeaderArray,\n    3: GridColumnIcon.HeaderEmoji,\n    5: GridColumnIcon.HeaderNumber,\n};\n\nconst trailingRowOptionsColumnIndexesTarget: Record<number, number> = {\n    2: 0,\n    3: 0,\n    5: 0,\n};\n\nconst trailingRowOptionsColumnIndexesDisabled: Record<number, boolean> = {\n    3: true,\n};\n\nconst trailingRowOptionsColumnIndexesTheme: Record<number, Partial<Theme>> = {\n    2: {\n        baseFontStyle: \"10px\",\n    },\n};\n\nexport const TrailingRowOptions: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    const columnsWithRowOptions: GridColumn[] = React.useMemo(() => {\n        return cols.map((c, idx) => ({\n            ...c,\n            trailingRowOptions: {\n                hint: trailingRowOptionsColumnIndexesHint[idx],\n                addIcon: trailingRowOptionsColumnIndexesIcon[idx],\n                targetColumn: trailingRowOptionsColumnIndexesTarget[idx],\n                disabled: trailingRowOptionsColumnIndexesDisabled[idx],\n                themeOverride: trailingRowOptionsColumnIndexesTheme[idx],\n            },\n        }));\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columnsWithRowOptions}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                tint: true,\n                sticky: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n",
      "locationsMap": {
        "trailing-row-options": {
          "startLoc": {
            "col": 45,
            "line": 64
          },
          "endLoc": {
            "col": 1,
            "line": 106
          },
          "startBody": {
            "col": 45,
            "line": 64
          },
          "endBody": {
            "col": 1,
            "line": 106
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Trailing row options",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can customize the trailing row in each column by setting a", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "trailingRowOptions"
        }), " in your columns."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const trailingRowOptionsColumnIndexesHint = {
  2: "Smol text",
  3: "Add",
  5: "New"
};
const trailingRowOptionsColumnIndexesIcon = {
  2: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridColumnIcon.HeaderArray */ .PE.HeaderArray,
  3: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridColumnIcon.HeaderEmoji */ .PE.HeaderEmoji,
  5: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridColumnIcon.HeaderNumber */ .PE.HeaderNumber
};
const trailingRowOptionsColumnIndexesTarget = {
  2: 0,
  3: 0,
  5: 0
};
const trailingRowOptionsColumnIndexesDisabled = {
  3: true
};
const trailingRowOptionsColumnIndexesTheme = {
  2: {
    baseFontStyle: "10px"
  }
};
const TrailingRowOptions = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  const columnsWithRowOptions = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return cols.map((c, idx) => ({
      ...c,
      trailingRowOptions: {
        hint: trailingRowOptionsColumnIndexesHint[idx],
        addIcon: trailingRowOptionsColumnIndexesIcon[idx],
        targetColumn: trailingRowOptionsColumnIndexesTarget[idx],
        disabled: trailingRowOptionsColumnIndexesDisabled[idx],
        themeOverride: trailingRowOptionsColumnIndexesTheme[idx]
      }
    }));
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: columnsWithRowOptions,
    rowMarkers: "both",
    onCellEdited: setCellValue,
    trailingRowOptions: {
      tint: true,
      sticky: true
    },
    rows: numRows,
    onRowAppended: onRowAppended
  });
};
TrailingRowOptions.displayName = "TrailingRowOptions";;const __namedExportsOrder = ["TrailingRowOptions"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-trailing-row-options-stories.512948a3.iframe.bundle.js.map