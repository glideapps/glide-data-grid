"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9104],{

/***/ "./packages/core/src/docs/examples/all-cell-kinds.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AllCellKinds": () => (/* binding */ AllCellKinds),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Lotsa cell kinds\"\n                    description={\n                        <Description>\n                            Data grid supports plenty cell kinds. Anything under <PropName>GridCellKind</PropName>.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AllCellKinds: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onPaste={true}\n            // rowHeight={55}\n            onColumnResize={onColumnResize}\n            highlightRegions={[\n                {\n                    color: \"#ff00ff33\",\n                    range: {\n                        x: 1,\n                        y: 1,\n                        width: 3,\n                        height: 3,\n                    },\n                },\n            ]}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "AllCellKinds": {
    "startLoc": {
      "col": 39,
      "line": 32
    },
    "endLoc": {
      "col": 1,
      "line": 58
    },
    "startBody": {
      "col": 39,
      "line": 32
    },
    "endBody": {
      "col": 1,
      "line": 58
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Lotsa cell kinds\"\n                    description={\n                        <Description>\n                            Data grid supports plenty cell kinds. Anything under <PropName>GridCellKind</PropName>.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AllCellKinds: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onPaste={true}\n            // rowHeight={55}\n            onColumnResize={onColumnResize}\n            highlightRegions={[\n                {\n                    color: \"#ff00ff33\",\n                    range: {\n                        x: 1,\n                        y: 1,\n                        width: 3,\n                        height: 3,\n                    },\n                },\n            ]}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "all-cell-kinds": {
          "startLoc": {
            "col": 39,
            "line": 32
          },
          "endLoc": {
            "col": 1,
            "line": 58
          },
          "startBody": {
            "col": 39,
            "line": 32
          },
          "endBody": {
            "col": 1,
            "line": 58
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Lotsa cell kinds",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Data grid supports plenty cell kinds. Anything under ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "GridCellKind"
        }), "."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const AllCellKinds = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    onCellEdited: setCellValue,
    onPaste: true,
    onColumnResize: onColumnResize,
    highlightRegions: [{
      color: "#ff00ff33",
      range: {
        x: 1,
        y: 1,
        width: 3,
        height: 3
      }
    }],
    rows: 1000
  });
};
AllCellKinds.displayName = "AllCellKinds";;const __namedExportsOrder = ["AllCellKinds"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-all-cell-kinds-stories.ed7a86ca.iframe.bundle.js.map