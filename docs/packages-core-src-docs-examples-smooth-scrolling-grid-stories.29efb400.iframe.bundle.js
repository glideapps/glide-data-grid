"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[6263],{

/***/ "./packages/core/src/docs/examples/smooth-scrolling-grid.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmoothScrollingGrid": () => (/* binding */ SmoothScrollingGrid),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Smooth scrolling\"\n                    description={\n                        <Description>\n                            You can enable smooth scrolling with the <PropName>smoothScrollX</PropName> and{\" \"}\n                            <PropName>smoothScrollY</PropName> props. Disabling smooth scrolling can dramatically\n                            increase performance and improve visual stability during rapid scrolling.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface SmoothScrollingGridProps {\n    smoothScrollX: boolean;\n    smoothScrollY: boolean;\n}\n\nexport const SmoothScrollingGrid: React.FC<SmoothScrollingGridProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(30);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            smoothScrollX={p.smoothScrollX}\n            smoothScrollY={p.smoothScrollY}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(SmoothScrollingGrid as any).args = {\n    smoothScrollX: false,\n    smoothScrollY: false,\n};\n";
var __LOCATIONS_MAP__ = {
  "SmoothScrollingGrid": {
    "startLoc": {
      "col": 71,
      "line": 39
    },
    "endLoc": {
      "col": 1,
      "line": 52
    },
    "startBody": {
      "col": 71,
      "line": 39
    },
    "endBody": {
      "col": 1,
      "line": 52
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Smooth scrolling\"\n                    description={\n                        <Description>\n                            You can enable smooth scrolling with the <PropName>smoothScrollX</PropName> and{\" \"}\n                            <PropName>smoothScrollY</PropName> props. Disabling smooth scrolling can dramatically\n                            increase performance and improve visual stability during rapid scrolling.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface SmoothScrollingGridProps {\n    smoothScrollX: boolean;\n    smoothScrollY: boolean;\n}\n\nexport const SmoothScrollingGrid: React.FC<SmoothScrollingGridProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(30);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            smoothScrollX={p.smoothScrollX}\n            smoothScrollY={p.smoothScrollY}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(SmoothScrollingGrid as any).args = {\n    smoothScrollX: false,\n    smoothScrollY: false,\n};\n",
      "locationsMap": {
        "smooth-scrolling-grid": {
          "startLoc": {
            "col": 71,
            "line": 39
          },
          "endLoc": {
            "col": 1,
            "line": 52
          },
          "startBody": {
            "col": 71,
            "line": 39
          },
          "endBody": {
            "col": 1,
            "line": 52
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Smooth scrolling",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can enable smooth scrolling with the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "smoothScrollX"
        }), " and", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "smoothScrollY"
        }), " props. Disabling smooth scrolling can dramatically increase performance and improve visual stability during rapid scrolling."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const SmoothScrollingGrid = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(30);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    smoothScrollX: p.smoothScrollX,
    smoothScrollY: p.smoothScrollY,
    getCellContent: getCellContent,
    columns: cols,
    rows: 10000
  });
};
SmoothScrollingGrid.displayName = "SmoothScrollingGrid";
SmoothScrollingGrid.args = {
  smoothScrollX: false,
  smoothScrollY: false
};;const __namedExportsOrder = ["SmoothScrollingGrid"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-smooth-scrolling-grid-stories.29efb400.iframe.bundle.js.map