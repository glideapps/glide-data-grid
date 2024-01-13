"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[6253],{

/***/ "./packages/core/src/docs/examples/ten-million-cells.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TenMillionCells": () => (/* binding */ TenMillionCells),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Ten Million Cells\"\n                    description={<Description>Data grid supports over 10 million cells. Go nuts with it.</Description>}>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const TenMillionCells: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"number\"\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={100_000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "TenMillionCells": {
    "startLoc": {
      "col": 42,
      "line": 22
    },
    "endLoc": {
      "col": 1,
      "line": 34
    },
    "startBody": {
      "col": 42,
      "line": 22
    },
    "endBody": {
      "col": 1,
      "line": 34
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Ten Million Cells\"\n                    description={<Description>Data grid supports over 10 million cells. Go nuts with it.</Description>}>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const TenMillionCells: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"number\"\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={100_000}\n        />\n    );\n};\n",
      "locationsMap": {
        "ten-million-cells": {
          "startLoc": {
            "col": 42,
            "line": 22
          },
          "endLoc": {
            "col": 1,
            "line": 34
          },
          "startBody": {
            "col": 42,
            "line": 22
          },
          "endBody": {
            "col": 1,
            "line": 34
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Ten Million Cells",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "Data grid supports over 10 million cells. Go nuts with it."
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const TenMillionCells = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "number",
    getCellContent: getCellContent,
    columns: cols,
    rows: 100000
  });
};
TenMillionCells.displayName = "TenMillionCells";;const __namedExportsOrder = ["TenMillionCells"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-ten-million-cells-stories.2e0258cb.iframe.bundle.js.map