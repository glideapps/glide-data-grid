"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[3674],{

/***/ "./packages/core/src/docs/examples/span-cell.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpanCell": () => (/* binding */ SpanCell),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "/* eslint-disable sonarjs/no-duplicate-string */\nimport React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport type { Rectangle, CellArray, GridCell } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Spans\"\n                    description={\n                        <Description>\n                            By setting the <PropName>span</PropName> of a cell you can create spans in your grid. All\n                            cells within a span must return consistent data for defined behavior.\n                            <MoreInfo>\n                                Spans will always be split if they span frozen and non-frozen columns. By default\n                                selections are always expanded to include a span. This can be disabled using the{\" \"}\n                                <PropName>spanRangeBehavior</PropName> prop.\n                            </MoreInfo>\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const SpanCell: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100, true, true);\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        cell => {\n            const [col, row] = cell;\n            if (row === 6 && col >= 3 && col <= 4) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: false,\n                    data: \"Span Cell that is very long and will go past the cell limits\",\n                    span: [3, 4],\n                    displayData: \"Span Cell that is very long and will go past the cell limits\",\n                };\n            }\n            if (row === 5) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: false,\n                    data: \"Span Cell that is very long and will go past the cell limits\",\n                    span: [0, 99],\n                    displayData: \"Span Cell that is very long and will go past the cell limits\",\n                };\n            }\n            return getCellContent(cell);\n        },\n        [getCellContent]\n    );\n\n    const getCellsForSelection = React.useCallback(\n        (selection: Rectangle): CellArray => {\n            const result: GridCell[][] = [];\n\n            for (let y = selection.y; y < selection.y + selection.height; y++) {\n                const row: GridCell[] = [];\n                for (let x = selection.x; x < selection.x + selection.width; x++) {\n                    row.push(mangledGetCellContent([x, y]));\n                }\n                result.push(row);\n            }\n\n            return result;\n        },\n        [mangledGetCellContent]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={mangledGetCellContent}\n            getCellsForSelection={getCellsForSelection}\n            columns={cols}\n            freezeColumns={2}\n            rows={300}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "SpanCell": {
    "startLoc": {
      "col": 35,
      "line": 42
    },
    "endLoc": {
      "col": 1,
      "line": 99
    },
    "startBody": {
      "col": 35,
      "line": 42
    },
    "endBody": {
      "col": 1,
      "line": 99
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "\nimport React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport type { Rectangle, CellArray, GridCell } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Spans\"\n                    description={\n                        <Description>\n                            By setting the <PropName>span</PropName> of a cell you can create spans in your grid. All\n                            cells within a span must return consistent data for defined behavior.\n                            <MoreInfo>\n                                Spans will always be split if they span frozen and non-frozen columns. By default\n                                selections are always expanded to include a span. This can be disabled using the{\" \"}\n                                <PropName>spanRangeBehavior</PropName> prop.\n                            </MoreInfo>\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const SpanCell: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100, true, true);\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        cell => {\n            const [col, row] = cell;\n            if (row === 6 && col >= 3 && col <= 4) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: false,\n                    data: \"Span Cell that is very long and will go past the cell limits\",\n                    span: [3, 4],\n                    displayData: \"Span Cell that is very long and will go past the cell limits\",\n                };\n            }\n            if (row === 5) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: false,\n                    data: \"Span Cell that is very long and will go past the cell limits\",\n                    span: [0, 99],\n                    displayData: \"Span Cell that is very long and will go past the cell limits\",\n                };\n            }\n            return getCellContent(cell);\n        },\n        [getCellContent]\n    );\n\n    const getCellsForSelection = React.useCallback(\n        (selection: Rectangle): CellArray => {\n            const result: GridCell[][] = [];\n\n            for (let y = selection.y; y < selection.y + selection.height; y++) {\n                const row: GridCell[] = [];\n                for (let x = selection.x; x < selection.x + selection.width; x++) {\n                    row.push(mangledGetCellContent([x, y]));\n                }\n                result.push(row);\n            }\n\n            return result;\n        },\n        [mangledGetCellContent]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={mangledGetCellContent}\n            getCellsForSelection={getCellsForSelection}\n            columns={cols}\n            freezeColumns={2}\n            rows={300}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "span-cell": {
          "startLoc": {
            "col": 35,
            "line": 42
          },
          "endLoc": {
            "col": 1,
            "line": 99
          },
          "startBody": {
            "col": 35,
            "line": 42
          },
          "endBody": {
            "col": 1,
            "line": 99
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Spans",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["By setting the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "span"
        }), " of a cell you can create spans in your grid. All cells within a span must return consistent data for defined behavior.", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["Spans will always be split if they span frozen and non-frozen columns. By default selections are always expanded to include a span. This can be disabled using the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "spanRangeBehavior"
          }), " prop."]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const SpanCell = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100, true, true);
  const mangledGetCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    if (row === 6 && col >= 3 && col <= 4) {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
        allowOverlay: false,
        data: "Span Cell that is very long and will go past the cell limits",
        span: [3, 4],
        displayData: "Span Cell that is very long and will go past the cell limits"
      };
    }
    if (row === 5) {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
        allowOverlay: false,
        data: "Span Cell that is very long and will go past the cell limits",
        span: [0, 99],
        displayData: "Span Cell that is very long and will go past the cell limits"
      };
    }
    return getCellContent(cell);
  }, [getCellContent]);
  const getCellsForSelection = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(selection => {
    const result = [];
    for (let y = selection.y; y < selection.y + selection.height; y++) {
      const row = [];
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        row.push(mangledGetCellContent([x, y]));
      }
      result.push(row);
    }
    return result;
  }, [mangledGetCellContent]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: mangledGetCellContent,
    getCellsForSelection: getCellsForSelection,
    columns: cols,
    freezeColumns: 2,
    rows: 300,
    rowMarkers: "both"
  });
};
SpanCell.displayName = "SpanCell";;const __namedExportsOrder = ["SpanCell"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-span-cell-stories.036521c2.iframe.bundle.js.map