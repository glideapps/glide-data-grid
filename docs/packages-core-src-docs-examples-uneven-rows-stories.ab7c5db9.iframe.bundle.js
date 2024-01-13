"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2209],{

/***/ "./packages/core/src/docs/examples/uneven-rows.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnevenRows": () => (/* binding */ UnevenRows),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Uneven Rows\"\n                    description={\n                        <Description>\n                            Rows can be made uneven by passing a callback to the <PropName>rowHeight</PropName> prop\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const UnevenRows: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={r => (r % 3 === 0 ? 30 : r % 2 ? 50 : 60)}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "UnevenRows": {
    "startLoc": {
      "col": 37,
      "line": 32
    },
    "endLoc": {
      "col": 1,
      "line": 44
    },
    "startBody": {
      "col": 37,
      "line": 32
    },
    "endBody": {
      "col": 1,
      "line": 44
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Uneven Rows\"\n                    description={\n                        <Description>\n                            Rows can be made uneven by passing a callback to the <PropName>rowHeight</PropName> prop\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const UnevenRows: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={r => (r % 3 === 0 ? 30 : r % 2 ? 50 : 60)}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "uneven-rows": {
          "startLoc": {
            "col": 37,
            "line": 32
          },
          "endLoc": {
            "col": 1,
            "line": 44
          },
          "startBody": {
            "col": 37,
            "line": 32
          },
          "endBody": {
            "col": 1,
            "line": 44
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Uneven Rows",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Rows can be made uneven by passing a callback to the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "rowHeight"
        }), " prop"]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const UnevenRows = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowHeight: r => r % 3 === 0 ? 30 : r % 2 ? 50 : 60,
    getCellContent: getCellContent,
    columns: cols,
    rows: 1000
  });
};
UnevenRows.displayName = "UnevenRows";;const __namedExportsOrder = ["UnevenRows"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-uneven-rows-stories.ab7c5db9.iframe.bundle.js.map