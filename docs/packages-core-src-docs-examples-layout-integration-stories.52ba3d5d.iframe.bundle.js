"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7690],{

/***/ "./packages/core/src/docs/examples/layout-integration.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutIntegration": () => (/* binding */ LayoutIntegration),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { Description, useMockDataGenerator, defaultProps, BeautifulStyle } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulStyle>\n                    <h1>Layout Integration</h1>\n                    <Description>Trying the grid in different situations</Description>\n                    <Story />\n                </BeautifulStyle>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const LayoutIntegration: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);\n\n    return (\n        <>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                rows={10}\n                rowMarkers=\"both\"\n                height={200}\n            />\n            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers=\"both\" />\n            <div style={{ display: \"flex\", height: \"300px\" }}>\n                <DataEditor\n                    {...defaultProps}\n                    getCellContent={getCellContent}\n                    columns={cols}\n                    rows={10}\n                    rowMarkers=\"both\"\n                />\n                <div style={{ flexShrink: 0 }}>This is some text what happens here?</div>\n            </div>\n        </>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "LayoutIntegration": {
    "startLoc": {
      "col": 44,
      "line": 22
    },
    "endLoc": {
      "col": 1,
      "line": 48
    },
    "startBody": {
      "col": 44,
      "line": 22
    },
    "endBody": {
      "col": 1,
      "line": 48
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { Description, useMockDataGenerator, defaultProps, BeautifulStyle } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulStyle>\n                    <h1>Layout Integration</h1>\n                    <Description>Trying the grid in different situations</Description>\n                    <Story />\n                </BeautifulStyle>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const LayoutIntegration: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);\n\n    return (\n        <>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                rows={10}\n                rowMarkers=\"both\"\n                height={200}\n            />\n            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers=\"both\" />\n            <div style={{ display: \"flex\", height: \"300px\" }}>\n                <DataEditor\n                    {...defaultProps}\n                    getCellContent={getCellContent}\n                    columns={cols}\n                    rows={10}\n                    rowMarkers=\"both\"\n                />\n                <div style={{ flexShrink: 0 }}>This is some text what happens here?</div>\n            </div>\n        </>\n    );\n};\n",
      "locationsMap": {
        "layout-integration": {
          "startLoc": {
            "col": 44,
            "line": 22
          },
          "endLoc": {
            "col": 1,
            "line": 48
          },
          "startBody": {
            "col": 44,
            "line": 22
          },
          "endBody": {
            "col": 1,
            "line": 48
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulStyle */ .xl, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
        children: "Layout Integration"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "Trying the grid in different situations"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})]
    })
  })]
});
const LayoutIntegration = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(1000, true, true);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      columns: cols,
      rows: 10,
      rowMarkers: "both",
      height: 200
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      columns: cols,
      rows: 10,
      rowMarkers: "both"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        display: "flex",
        height: "300px"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
        ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
        getCellContent: getCellContent,
        columns: cols,
        rows: 10,
        rowMarkers: "both"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        style: {
          flexShrink: 0
        },
        children: "This is some text what happens here?"
      })]
    })]
  });
};;const __namedExportsOrder = ["LayoutIntegration"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-layout-integration-stories.52ba3d5d.iframe.bundle.js.map