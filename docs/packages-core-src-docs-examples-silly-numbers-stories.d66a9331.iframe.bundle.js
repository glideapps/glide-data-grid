"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[5225],{

/***/ "./packages/core/src/docs/examples/silly-numbers.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SillyNumbers": () => (/* binding */ SillyNumbers),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"100 Million Rows\"\n                    description={\n                        <Description>\n                            100 million rows is silly. Once we cross about 33 million pixels in height we can no longer\n                            trust the browser to scroll accurately.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const SillyNumbers: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowHeight={31}\n            rows={100_000_000}\n            rowMarkers=\"number\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "SillyNumbers": {
    "startLoc": {
      "col": 39,
      "line": 27
    },
    "endLoc": {
      "col": 1,
      "line": 40
    },
    "startBody": {
      "col": 39,
      "line": 27
    },
    "endBody": {
      "col": 1,
      "line": 40
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"100 Million Rows\"\n                    description={\n                        <Description>\n                            100 million rows is silly. Once we cross about 33 million pixels in height we can no longer\n                            trust the browser to scroll accurately.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const SillyNumbers: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowHeight={31}\n            rows={100_000_000}\n            rowMarkers=\"number\"\n        />\n    );\n};\n",
      "locationsMap": {
        "silly-numbers": {
          "startLoc": {
            "col": 39,
            "line": 27
          },
          "endLoc": {
            "col": 1,
            "line": 40
          },
          "startBody": {
            "col": 39,
            "line": 27
          },
          "endBody": {
            "col": 1,
            "line": 40
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "100 Million Rows",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "100 million rows is silly. Once we cross about 33 million pixels in height we can no longer trust the browser to scroll accurately."
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const SillyNumbers = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowHeight: 31,
    rows: 100000000,
    rowMarkers: "number"
  });
};
SillyNumbers.displayName = "SillyNumbers";;const __namedExportsOrder = ["SillyNumbers"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-silly-numbers-stories.d66a9331.iframe.bundle.js.map