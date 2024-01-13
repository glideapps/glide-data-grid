"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2469],{

/***/ "./packages/core/src/docs/examples/reorder-rows.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReorderRows": () => (/* binding */ ReorderRows),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import { range } from \"lodash\";\nimport React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, PropName, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Reorder Rows\"\n                    description={\n                        <>\n                            <Description>\n                                Rows can be re-arranged by using the <PropName>onRowMoved</PropName> callback. When set\n                                the first row can be used to drag and drop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ReorderRows: React.VFC = () => {\n    const cols = React.useMemo<GridColumn[]>(\n        () => [\n            {\n                title: \"Col A\",\n                width: 150,\n            },\n            {\n                title: \"Col B\",\n                width: 150,\n            },\n        ],\n        []\n    );\n\n    const [rowData, setRowData] = React.useState(() => {\n        return range(0, 50).map(x => [`A: ${x}`, `B: ${x}`]);\n    });\n\n    const getCellContent = React.useCallback<DataEditorProps[\"getCellContent\"]>(\n        ([col, row]) => {\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: false,\n                data: rowData[row][col],\n                displayData: rowData[row][col],\n            };\n        },\n        [rowData]\n    );\n\n    const reorderRows = React.useCallback((from: number, to: number) => {\n        setRowData(cv => {\n            const d = [...cv];\n            const removed = d.splice(from, 1);\n            d.splice(to, 0, ...removed);\n            return d;\n        });\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"both\"}\n            onRowMoved={reorderRows}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={50}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ReorderRows": {
    "startLoc": {
      "col": 38,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 83
    },
    "startBody": {
      "col": 38,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 83
    }
  }
};









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import { range } from \"lodash\";\nimport React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, PropName, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Reorder Rows\"\n                    description={\n                        <>\n                            <Description>\n                                Rows can be re-arranged by using the <PropName>onRowMoved</PropName> callback. When set\n                                the first row can be used to drag and drop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ReorderRows: React.VFC = () => {\n    const cols = React.useMemo<GridColumn[]>(\n        () => [\n            {\n                title: \"Col A\",\n                width: 150,\n            },\n            {\n                title: \"Col B\",\n                width: 150,\n            },\n        ],\n        []\n    );\n\n    const [rowData, setRowData] = React.useState(() => {\n        return range(0, 50).map(x => [`A: ${x}`, `B: ${x}`]);\n    });\n\n    const getCellContent = React.useCallback<DataEditorProps[\"getCellContent\"]>(\n        ([col, row]) => {\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: false,\n                data: rowData[row][col],\n                displayData: rowData[row][col],\n            };\n        },\n        [rowData]\n    );\n\n    const reorderRows = React.useCallback((from: number, to: number) => {\n        setRowData(cv => {\n            const d = [...cv];\n            const removed = d.splice(from, 1);\n            d.splice(to, 0, ...removed);\n            return d;\n        });\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"both\"}\n            onRowMoved={reorderRows}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={50}\n        />\n    );\n};\n",
      "locationsMap": {
        "reorder-rows": {
          "startLoc": {
            "col": 38,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 83
          },
          "startBody": {
            "col": 38,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 83
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .BeautifulWrapper */ .m, {
      title: "Reorder Rows",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Description */ .dk, {
          children: ["Rows can be re-arranged by using the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .PropName */ .Gi, {
            children: "onRowMoved"
          }), " callback. When set the first row can be used to drag and drop."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Story, {})
    })
  })]
});
const ReorderRows = () => {
  const cols = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => [{
    title: "Col A",
    width: 150
  }, {
    title: "Col B",
    width: 150
  }], []);
  const [rowData, setRowData] = react__WEBPACK_IMPORTED_MODULE_1__.useState(() => {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, 50).map(x => [`A: ${x}`, `B: ${x}`]);
  });
  const getCellContent = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(_ref => {
    let [col, row] = _ref;
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: false,
      data: rowData[row][col],
      displayData: rowData[row][col]
    };
  }, [rowData]);
  const reorderRows = react__WEBPACK_IMPORTED_MODULE_1__.useCallback((from, to) => {
    setRowData(cv => {
      const d = [...cv];
      const removed = d.splice(from, 1);
      d.splice(to, 0, ...removed);
      return d;
    });
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultProps */ .lG,
    rowMarkers: "both",
    onRowMoved: reorderRows,
    getCellContent: getCellContent,
    columns: cols,
    rows: 50
  });
};
ReorderRows.displayName = "ReorderRows";;const __namedExportsOrder = ["ReorderRows"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-reorder-rows-stories.1ba9d3ef.iframe.bundle.js.map