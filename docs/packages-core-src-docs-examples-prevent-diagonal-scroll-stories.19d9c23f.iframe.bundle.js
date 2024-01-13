"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2448],{

/***/ "./packages/core/src/docs/examples/prevent-diagonal-scroll.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreventDiagonalScroll": () => (/* binding */ PreventDiagonalScroll),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Prevent Diagonal Scroll\"\n                    description={\n                        <>\n                            <Description>\n                                Diagonal scrolling can be prevented by setting{\" \"}\n                                <PropName>preventDiagonalScrolling</PropName>.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const PreventDiagonalScroll: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(200);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            preventDiagonalScrolling={true}\n            rows={5000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "PreventDiagonalScroll": {
    "startLoc": {
      "col": 48,
      "line": 35
    },
    "endLoc": {
      "col": 1,
      "line": 47
    },
    "startBody": {
      "col": 48,
      "line": 35
    },
    "endBody": {
      "col": 1,
      "line": 47
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Prevent Diagonal Scroll\"\n                    description={\n                        <>\n                            <Description>\n                                Diagonal scrolling can be prevented by setting{\" \"}\n                                <PropName>preventDiagonalScrolling</PropName>.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const PreventDiagonalScroll: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(200);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            preventDiagonalScrolling={true}\n            rows={5000}\n        />\n    );\n};\n",
      "locationsMap": {
        "prevent-diagonal-scroll": {
          "startLoc": {
            "col": 48,
            "line": 35
          },
          "endLoc": {
            "col": 1,
            "line": 47
          },
          "startBody": {
            "col": 48,
            "line": 35
          },
          "endBody": {
            "col": 1,
            "line": 47
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Prevent Diagonal Scroll",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Diagonal scrolling can be prevented by setting", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "preventDiagonalScrolling"
          }), "."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const PreventDiagonalScroll = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(200);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    preventDiagonalScrolling: true,
    rows: 5000
  });
};
PreventDiagonalScroll.displayName = "PreventDiagonalScroll";;const __namedExportsOrder = ["PreventDiagonalScroll"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-prevent-diagonal-scroll-stories.19d9c23f.iframe.bundle.js.map