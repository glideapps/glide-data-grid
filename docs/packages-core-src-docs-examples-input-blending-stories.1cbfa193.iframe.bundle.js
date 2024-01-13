"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[305],{

/***/ "./packages/core/src/docs/examples/input-blending.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputBlending": () => (/* binding */ InputBlending),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Input blending\"\n                    description={\n                        <Description>\n                            Input blending can be enabled or disable between row, column, and range selections.\n                            Multi-selections can also be enabled or disabled with the same level of granularity.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface InputBlendingGridProps {\n    rangeBlending: \"mixed\" | \"exclusive\";\n    columnBlending: \"mixed\" | \"exclusive\";\n    rowBlending: \"mixed\" | \"exclusive\";\n    rangeMultiSelect: \"none\" | \"cell\" | \"rect\" | \"multi-cell\" | \"multi-rect\";\n    columnMultiSelect: \"none\" | \"single\" | \"multi\";\n    rowMultiSelect: \"none\" | \"single\" | \"multi\";\n}\n\nexport const InputBlending: React.FC<InputBlendingGridProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(30);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={p.rowMultiSelect === \"none\" ? \"number\" : \"both\"}\n            keybindings={{\n                clear: true,\n                copy: true,\n                downFill: true,\n                rightFill: true,\n                pageDown: true,\n                pageUp: true,\n                paste: true,\n                search: true,\n                selectAll: true,\n                selectColumn: true,\n                selectRow: true,\n            }}\n            getCellsForSelection={true}\n            rangeSelect={p.rangeMultiSelect}\n            columnSelect={p.columnMultiSelect}\n            rowSelect={p.rowMultiSelect}\n            rangeSelectionBlending={p.rangeBlending}\n            columnSelectionBlending={p.columnBlending}\n            rowSelectionBlending={p.rowBlending}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(InputBlending as any).args = {\n    rangeBlending: \"mixed\",\n    columnBlending: \"mixed\",\n    rowBlending: \"mixed\",\n    rangeMultiSelect: \"rect\",\n    columnMultiSelect: \"multi\",\n    rowMultiSelect: \"multi\",\n};\n(InputBlending as any).argTypes = {\n    rangeBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    columnBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    rowBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    rangeMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"cell\", \"rect\", \"multi-cell\", \"multi-rect\"],\n    },\n    columnMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"single\", \"multi\"],\n    },\n    rowMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"single\", \"multi\"],\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "InputBlending": {
    "startLoc": {
      "col": 63,
      "line": 36
    },
    "endLoc": {
      "col": 1,
      "line": 68
    },
    "startBody": {
      "col": 63,
      "line": 36
    },
    "endBody": {
      "col": 1,
      "line": 68
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Input blending\"\n                    description={\n                        <Description>\n                            Input blending can be enabled or disable between row, column, and range selections.\n                            Multi-selections can also be enabled or disabled with the same level of granularity.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface InputBlendingGridProps {\n    rangeBlending: \"mixed\" | \"exclusive\";\n    columnBlending: \"mixed\" | \"exclusive\";\n    rowBlending: \"mixed\" | \"exclusive\";\n    rangeMultiSelect: \"none\" | \"cell\" | \"rect\" | \"multi-cell\" | \"multi-rect\";\n    columnMultiSelect: \"none\" | \"single\" | \"multi\";\n    rowMultiSelect: \"none\" | \"single\" | \"multi\";\n}\n\nexport const InputBlending: React.FC<InputBlendingGridProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(30);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={p.rowMultiSelect === \"none\" ? \"number\" : \"both\"}\n            keybindings={{\n                clear: true,\n                copy: true,\n                downFill: true,\n                rightFill: true,\n                pageDown: true,\n                pageUp: true,\n                paste: true,\n                search: true,\n                selectAll: true,\n                selectColumn: true,\n                selectRow: true,\n            }}\n            getCellsForSelection={true}\n            rangeSelect={p.rangeMultiSelect}\n            columnSelect={p.columnMultiSelect}\n            rowSelect={p.rowMultiSelect}\n            rangeSelectionBlending={p.rangeBlending}\n            columnSelectionBlending={p.columnBlending}\n            rowSelectionBlending={p.rowBlending}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(InputBlending as any).args = {\n    rangeBlending: \"mixed\",\n    columnBlending: \"mixed\",\n    rowBlending: \"mixed\",\n    rangeMultiSelect: \"rect\",\n    columnMultiSelect: \"multi\",\n    rowMultiSelect: \"multi\",\n};\n(InputBlending as any).argTypes = {\n    rangeBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    columnBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    rowBlending: {\n        control: { type: \"select\" },\n        options: [\"mixed\", \"exclusive\"],\n    },\n    rangeMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"cell\", \"rect\", \"multi-cell\", \"multi-rect\"],\n    },\n    columnMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"single\", \"multi\"],\n    },\n    rowMultiSelect: {\n        control: { type: \"select\" },\n        options: [\"none\", \"single\", \"multi\"],\n    },\n};\n",
      "locationsMap": {
        "input-blending": {
          "startLoc": {
            "col": 63,
            "line": 36
          },
          "endLoc": {
            "col": 1,
            "line": 68
          },
          "startBody": {
            "col": 63,
            "line": 36
          },
          "endBody": {
            "col": 1,
            "line": 68
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Input blending",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "Input blending can be enabled or disable between row, column, and range selections. Multi-selections can also be enabled or disabled with the same level of granularity."
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const InputBlending = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(30);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: p.rowMultiSelect === "none" ? "number" : "both",
    keybindings: {
      clear: true,
      copy: true,
      downFill: true,
      rightFill: true,
      pageDown: true,
      pageUp: true,
      paste: true,
      search: true,
      selectAll: true,
      selectColumn: true,
      selectRow: true
    },
    getCellsForSelection: true,
    rangeSelect: p.rangeMultiSelect,
    columnSelect: p.columnMultiSelect,
    rowSelect: p.rowMultiSelect,
    rangeSelectionBlending: p.rangeBlending,
    columnSelectionBlending: p.columnBlending,
    rowSelectionBlending: p.rowBlending,
    getCellContent: getCellContent,
    columns: cols,
    rows: 10000
  });
};
InputBlending.displayName = "InputBlending";
InputBlending.args = {
  rangeBlending: "mixed",
  columnBlending: "mixed",
  rowBlending: "mixed",
  rangeMultiSelect: "rect",
  columnMultiSelect: "multi",
  rowMultiSelect: "multi"
};
InputBlending.argTypes = {
  rangeBlending: {
    control: {
      type: "select"
    },
    options: ["mixed", "exclusive"]
  },
  columnBlending: {
    control: {
      type: "select"
    },
    options: ["mixed", "exclusive"]
  },
  rowBlending: {
    control: {
      type: "select"
    },
    options: ["mixed", "exclusive"]
  },
  rangeMultiSelect: {
    control: {
      type: "select"
    },
    options: ["none", "cell", "rect", "multi-cell", "multi-rect"]
  },
  columnMultiSelect: {
    control: {
      type: "select"
    },
    options: ["none", "single", "multi"]
  },
  rowMultiSelect: {
    control: {
      type: "select"
    },
    options: ["none", "single", "multi"]
  }
};;const __namedExportsOrder = ["InputBlending"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-input-blending-stories.1cbfa193.iframe.bundle.js.map