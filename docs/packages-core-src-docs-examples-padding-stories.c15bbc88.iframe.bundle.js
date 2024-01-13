"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9139],{

/***/ "./packages/core/src/docs/examples/padding.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Padding": () => (/* binding */ Padding),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Padding\"\n                    description={\n                        <>\n                            <Description>\n                                You can add padding at the ends of the grid by setting the{\" \"}\n                                <PropName>paddingRight</PropName> and <PropName>paddingBottom</PropName> props\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface PaddingProps {\n    paddingRight: number;\n    paddingBottom: number;\n}\n\nexport const Padding: React.VFC<PaddingProps> = p => {\n    const { paddingRight, paddingBottom } = p;\n    const { cols, getCellContent } = useMockDataGenerator(20);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            experimental={{ paddingRight, paddingBottom }}\n            rows={50}\n        />\n    );\n};\n(Padding as any).argTypes = {\n    paddingRight: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n    paddingBottom: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n};\n(Padding as any).args = {\n    paddingRight: 200,\n    paddingBottom: 200,\n};\n";
var __LOCATIONS_MAP__ = {
  "Padding": {
    "startLoc": {
      "col": 48,
      "line": 40
    },
    "endLoc": {
      "col": 1,
      "line": 54
    },
    "startBody": {
      "col": 48,
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
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Padding\"\n                    description={\n                        <>\n                            <Description>\n                                You can add padding at the ends of the grid by setting the{\" \"}\n                                <PropName>paddingRight</PropName> and <PropName>paddingBottom</PropName> props\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface PaddingProps {\n    paddingRight: number;\n    paddingBottom: number;\n}\n\nexport const Padding: React.VFC<PaddingProps> = p => {\n    const { paddingRight, paddingBottom } = p;\n    const { cols, getCellContent } = useMockDataGenerator(20);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            experimental={{ paddingRight, paddingBottom }}\n            rows={50}\n        />\n    );\n};\n(Padding as any).argTypes = {\n    paddingRight: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n    paddingBottom: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 600,\n        },\n    },\n};\n(Padding as any).args = {\n    paddingRight: 200,\n    paddingBottom: 200,\n};\n",
      "locationsMap": {
        "padding": {
          "startLoc": {
            "col": 48,
            "line": 40
          },
          "endLoc": {
            "col": 1,
            "line": 54
          },
          "startBody": {
            "col": 48,
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
      title: "Padding",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["You can add padding at the ends of the grid by setting the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "paddingRight"
          }), " and ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "paddingBottom"
          }), " props"]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const Padding = p => {
  const {
    paddingRight,
    paddingBottom
  } = p;
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(20);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    experimental: {
      paddingRight,
      paddingBottom
    },
    rows: 50
  });
};
Padding.displayName = "Padding";
Padding.argTypes = {
  paddingRight: {
    control: {
      type: "range",
      min: 0,
      max: 600
    }
  },
  paddingBottom: {
    control: {
      type: "range",
      min: 0,
      max: 600
    }
  }
};
Padding.args = {
  paddingRight: 200,
  paddingBottom: 200
};;const __namedExportsOrder = ["Padding"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-padding-stories.c15bbc88.iframe.bundle.js.map