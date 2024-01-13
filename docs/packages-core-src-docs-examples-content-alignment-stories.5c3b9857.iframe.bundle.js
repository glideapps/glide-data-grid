"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4487],{

/***/ "./packages/core/src/docs/examples/content-alignment.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentAlignment": () => (/* binding */ ContentAlignment),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Content Alignment\"\n                    description={\n                        <Description>\n                            You can customize the content alignment by setting <PropName>contentAlign</PropName> of a\n                            cell to <PropName>left</PropName>, <PropName>right</PropName> or <PropName>center</PropName>\n                            .\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ContentAlignment: React.VFC = () => {\n    const { cols, getCellContent } = useAllMockedKinds();\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        cell => {\n            const [col, _row] = cell;\n            if (col === 3) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"center\",\n                };\n            }\n            if (col === 4) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"right\",\n                };\n            }\n            if (col === 5) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"left\",\n                };\n            }\n            return getCellContent(cell);\n        },\n        [getCellContent]\n    );\n\n    return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />;\n};\n";
var __LOCATIONS_MAP__ = {
  "ContentAlignment": {
    "startLoc": {
      "col": 43,
      "line": 34
    },
    "endLoc": {
      "col": 1,
      "line": 64
    },
    "startBody": {
      "col": 43,
      "line": 34
    },
    "endBody": {
      "col": 1,
      "line": 64
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Content Alignment\"\n                    description={\n                        <Description>\n                            You can customize the content alignment by setting <PropName>contentAlign</PropName> of a\n                            cell to <PropName>left</PropName>, <PropName>right</PropName> or <PropName>center</PropName>\n                            .\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ContentAlignment: React.VFC = () => {\n    const { cols, getCellContent } = useAllMockedKinds();\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        cell => {\n            const [col, _row] = cell;\n            if (col === 3) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"center\",\n                };\n            }\n            if (col === 4) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"right\",\n                };\n            }\n            if (col === 5) {\n                return {\n                    ...getCellContent(cell),\n                    contentAlign: \"left\",\n                };\n            }\n            return getCellContent(cell);\n        },\n        [getCellContent]\n    );\n\n    return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />;\n};\n",
      "locationsMap": {
        "content-alignment": {
          "startLoc": {
            "col": 43,
            "line": 34
          },
          "endLoc": {
            "col": 1,
            "line": 64
          },
          "startBody": {
            "col": 43,
            "line": 34
          },
          "endBody": {
            "col": 1,
            "line": 64
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Content Alignment",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can customize the content alignment by setting ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "contentAlign"
        }), " of a cell to ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "left"
        }), ", ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "right"
        }), " or ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "center"
        }), "."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ContentAlignment = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const mangledGetCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, _row] = cell;
    if (col === 3) {
      return {
        ...getCellContent(cell),
        contentAlign: "center"
      };
    }
    if (col === 4) {
      return {
        ...getCellContent(cell),
        contentAlign: "right"
      };
    }
    if (col === 5) {
      return {
        ...getCellContent(cell),
        contentAlign: "left"
      };
    }
    return getCellContent(cell);
  }, [getCellContent]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: mangledGetCellContent,
    columns: cols,
    rows: 300
  });
};
ContentAlignment.displayName = "ContentAlignment";;const __namedExportsOrder = ["ContentAlignment"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-content-alignment-stories.5c3b9857.iframe.bundle.js.map