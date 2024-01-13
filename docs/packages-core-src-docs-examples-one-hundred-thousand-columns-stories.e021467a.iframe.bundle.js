"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7131],{

/***/ "./packages/core/src/docs/examples/one-hundred-thousand-columns.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OneHundredThousandCols": () => (/* binding */ OneHundredThousandCols),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"One Hundred Thousand Columns\"\n                    description={\n                        <Description>\n                            Data grid supports way more columns than you will ever need. Also this is rendering 10\n                            million cells but that&apos;s not important.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const OneHundredThousandCols: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100_000);\n\n    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;\n};\n";
var __LOCATIONS_MAP__ = {
  "OneHundredThousandCols": {
    "startLoc": {
      "col": 49,
      "line": 27
    },
    "endLoc": {
      "col": 1,
      "line": 31
    },
    "startBody": {
      "col": 49,
      "line": 27
    },
    "endBody": {
      "col": 1,
      "line": 31
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"One Hundred Thousand Columns\"\n                    description={\n                        <Description>\n                            Data grid supports way more columns than you will ever need. Also this is rendering 10\n                            million cells but that&apos;s not important.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const OneHundredThousandCols: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100_000);\n\n    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;\n};\n",
      "locationsMap": {
        "one-hundred-thousand-cols": {
          "startLoc": {
            "col": 49,
            "line": 27
          },
          "endLoc": {
            "col": 1,
            "line": 31
          },
          "startBody": {
            "col": 49,
            "line": 27
          },
          "endBody": {
            "col": 1,
            "line": 31
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "One Hundred Thousand Columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells but that's not important."
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const OneHundredThousandCols = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100000);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rows: 1000
  });
};
OneHundredThousandCols.displayName = "OneHundredThousandCols";;const __namedExportsOrder = ["OneHundredThousandCols"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-one-hundred-thousand-columns-stories.e021467a.iframe.bundle.js.map