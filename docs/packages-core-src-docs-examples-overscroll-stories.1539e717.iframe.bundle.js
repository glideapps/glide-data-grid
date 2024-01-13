"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[32],{

/***/ "./packages/core/src/docs/examples/overscroll.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Overscroll": () => (/* binding */ Overscroll),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Overscroll\"\n                    description={\n                        <>\n                            <Description>\n                                You can allocate extra space at the ends of the grid by setting the{\" \"}\n                                <PropName>overscrollX</PropName> and <PropName>overscrollY</PropName> props\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface OverscrollProps {\n    overscrollX: number;\n    overscrollY: number;\n}\n\nexport const Overscroll: React.VFC<OverscrollProps> = p => {\n    const { overscrollX, overscrollY } = p;\n    const { cols, getCellContent } = useMockDataGenerator(20);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            overscrollX={overscrollX}\n            overscrollY={overscrollY}\n            rows={50}\n        />\n    );\n};\n(Overscroll as any).argTypes = {\n    overscrollX: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n    overscrollY: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n};\n(Overscroll as any).args = {\n    overscrollX: 200,\n    overscrollY: 200,\n};\n";
var __LOCATIONS_MAP__ = {
  "Overscroll": {
    "startLoc": {
      "col": 54,
      "line": 40
    },
    "endLoc": {
      "col": 1,
      "line": 54
    },
    "startBody": {
      "col": 54,
      "line": 40
    },
    "endBody": {
      "col": 1,
      "line": 54
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Overscroll\"\n                    description={\n                        <>\n                            <Description>\n                                You can allocate extra space at the ends of the grid by setting the{\" \"}\n                                <PropName>overscrollX</PropName> and <PropName>overscrollY</PropName> props\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface OverscrollProps {\n    overscrollX: number;\n    overscrollY: number;\n}\n\nexport const Overscroll: React.VFC<OverscrollProps> = p => {\n    const { overscrollX, overscrollY } = p;\n    const { cols, getCellContent } = useMockDataGenerator(20);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            overscrollX={overscrollX}\n            overscrollY={overscrollY}\n            rows={50}\n        />\n    );\n};\n(Overscroll as any).argTypes = {\n    overscrollX: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n    overscrollY: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n};\n(Overscroll as any).args = {\n    overscrollX: 200,\n    overscrollY: 200,\n};\n",
      "locationsMap": {
        "overscroll": {
          "startLoc": {
            "col": 54,
            "line": 40
          },
          "endLoc": {
            "col": 1,
            "line": 54
          },
          "startBody": {
            "col": 54,
            "line": 40
          },
          "endBody": {
            "col": 1,
            "line": 54
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Overscroll",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["You can allocate extra space at the ends of the grid by setting the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "overscrollX"
          }), " and ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "overscrollY"
          }), " props"]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const Overscroll = p => {
  const {
    overscrollX,
    overscrollY
  } = p;
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(20);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    overscrollX: overscrollX,
    overscrollY: overscrollY,
    rows: 50
  });
};
Overscroll.displayName = "Overscroll";
Overscroll.argTypes = {
  overscrollX: {
    control: {
      type: "range",
      min: 0,
      max: 600
    }
  },
  overscrollY: {
    control: {
      type: "range",
      min: 0,
      max: 600
    }
  }
};
Overscroll.args = {
  overscrollX: 200,
  overscrollY: 200
};;const __namedExportsOrder = ["Overscroll"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-overscroll-stories.1539e717.iframe.bundle.js.map