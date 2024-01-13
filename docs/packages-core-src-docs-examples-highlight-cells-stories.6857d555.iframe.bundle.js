"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1898],{

/***/ "./packages/core/src/docs/examples/highlight-cells.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HighlightCells": () => (/* binding */ HighlightCells),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"HighlightCells\"\n                    description={\n                        <Description>\n                            The <PropName>highlightRegions</PropName> prop can be set to provide additional hinting or\n                            context for the current selection.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const HighlightCells: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    const [gridSelection, setGridSelection] = React.useState<GridSelection>({\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const highlights = React.useMemo<DataEditorProps[\"highlightRegions\"]>(() => {\n        if (gridSelection.current === undefined) return undefined;\n        const [col, row] = gridSelection.current.cell;\n        return [\n            {\n                color: \"#44BB0022\",\n                range: {\n                    x: col + 2,\n                    y: row,\n                    width: 10,\n                    height: 10,\n                },\n                style: \"solid\",\n            },\n            {\n                color: \"#b000b021\",\n                range: {\n                    x: col,\n                    y: row + 2,\n                    width: 1,\n                    height: 1,\n                },\n            },\n        ];\n    }, [gridSelection]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            freezeColumns={1}\n            highlightRegions={highlights}\n            gridSelection={gridSelection}\n            onGridSelectionChange={setGridSelection}\n            getCellContent={getCellContent}\n            columns={cols}\n            verticalBorder={c => c > 0}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "HighlightCells": {
    "startLoc": {
      "col": 41,
      "line": 36
    },
    "endLoc": {
      "col": 1,
      "line": 84
    },
    "startBody": {
      "col": 41,
      "line": 36
    },
    "endBody": {
      "col": 1,
      "line": 84
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"HighlightCells\"\n                    description={\n                        <Description>\n                            The <PropName>highlightRegions</PropName> prop can be set to provide additional hinting or\n                            context for the current selection.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const HighlightCells: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    const [gridSelection, setGridSelection] = React.useState<GridSelection>({\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    const highlights = React.useMemo<DataEditorProps[\"highlightRegions\"]>(() => {\n        if (gridSelection.current === undefined) return undefined;\n        const [col, row] = gridSelection.current.cell;\n        return [\n            {\n                color: \"#44BB0022\",\n                range: {\n                    x: col + 2,\n                    y: row,\n                    width: 10,\n                    height: 10,\n                },\n                style: \"solid\",\n            },\n            {\n                color: \"#b000b021\",\n                range: {\n                    x: col,\n                    y: row + 2,\n                    width: 1,\n                    height: 1,\n                },\n            },\n        ];\n    }, [gridSelection]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            freezeColumns={1}\n            highlightRegions={highlights}\n            gridSelection={gridSelection}\n            onGridSelectionChange={setGridSelection}\n            getCellContent={getCellContent}\n            columns={cols}\n            verticalBorder={c => c > 0}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "highlight-cells": {
          "startLoc": {
            "col": 41,
            "line": 36
          },
          "endLoc": {
            "col": 1,
            "line": 84
          },
          "startBody": {
            "col": 41,
            "line": 36
          },
          "endBody": {
            "col": 1,
            "line": 84
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "HighlightCells",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["The ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "highlightRegions"
        }), " prop can be set to provide additional hinting or context for the current selection."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const HighlightCells = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  const [gridSelection, setGridSelection] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  const highlights = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (gridSelection.current === undefined) return undefined;
    const [col, row] = gridSelection.current.cell;
    return [{
      color: "#44BB0022",
      range: {
        x: col + 2,
        y: row,
        width: 10,
        height: 10
      },
      style: "solid"
    }, {
      color: "#b000b021",
      range: {
        x: col,
        y: row + 2,
        width: 1,
        height: 1
      }
    }];
  }, [gridSelection]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "both",
    freezeColumns: 1,
    highlightRegions: highlights,
    gridSelection: gridSelection,
    onGridSelectionChange: setGridSelection,
    getCellContent: getCellContent,
    columns: cols,
    verticalBorder: c => c > 0,
    rows: 1000
  });
};
HighlightCells.displayName = "HighlightCells";;const __namedExportsOrder = ["HighlightCells"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-highlight-cells-stories.6857d555.iframe.bundle.js.map