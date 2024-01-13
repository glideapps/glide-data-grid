"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8764],{

/***/ "./packages/core/src/docs/examples/scaled-view.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScaledView": () => (/* binding */ ScaledView),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Scaled view\"\n                    description={<Description>The data editor supports being scaled.</Description>}\n                    scale=\"0.5\">\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ScaledView: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            rows={500}\n            onColumnResize={onColumnResize}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ScaledView": {
    "startLoc": {
      "col": 37,
      "line": 23
    },
    "endLoc": {
      "col": 1,
      "line": 36
    },
    "startBody": {
      "col": 37,
      "line": 23
    },
    "endBody": {
      "col": 1,
      "line": 36
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Scaled view\"\n                    description={<Description>The data editor supports being scaled.</Description>}\n                    scale=\"0.5\">\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ScaledView: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            rows={500}\n            onColumnResize={onColumnResize}\n        />\n    );\n};\n",
      "locationsMap": {
        "scaled-view": {
          "startLoc": {
            "col": 37,
            "line": 23
          },
          "endLoc": {
            "col": 1,
            "line": 36
          },
          "startBody": {
            "col": 37,
            "line": 23
          },
          "endBody": {
            "col": 1,
            "line": 36
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Scaled view",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "The data editor supports being scaled."
      }),
      scale: "0.5",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ScaledView = () => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    rows: 500,
    onColumnResize: onColumnResize
  });
};
ScaledView.displayName = "ScaledView";;const __namedExportsOrder = ["ScaledView"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-scaled-view-stories.4648a9bf.iframe.bundle.js.map