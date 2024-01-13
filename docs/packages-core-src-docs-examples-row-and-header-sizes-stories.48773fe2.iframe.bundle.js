"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4190],{

/***/ "./packages/core/src/docs/examples/row-and-header-sizes.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowAndHeaderSizes": () => (/* binding */ RowAndHeaderSizes),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row and Header sizes\"\n                    description={\n                        <>\n                            <Description>\n                                The row size can be controlled with <PropName>rowHeight</PropName> and the header size\n                                with <PropName>headerHeight</PropName>.\n                            </Description>\n                            <MoreInfo>Use the story&apos;s controls to resize them</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface RowAndHeaderSizesProps {\n    rowHeight: number;\n    headerHeight: number;\n}\nexport const RowAndHeaderSizes: React.VFC<RowAndHeaderSizesProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={p.rowHeight}\n            headerHeight={p.headerHeight}\n            rowMarkers={\"number\"}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n};\n(RowAndHeaderSizes as any).args = {\n    rowHeight: 34,\n    headerHeight: 34,\n};\n(RowAndHeaderSizes as any).argTypes = {\n    rowHeight: {\n        control: {\n            type: \"range\",\n            min: 20,\n            max: 200,\n        },\n    },\n    headerHeight: {\n        control: {\n            type: \"range\",\n            min: 20,\n            max: 200,\n        },\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "RowAndHeaderSizes": {
    "startLoc": {
      "col": 68,
      "line": 41
    },
    "endLoc": {
      "col": 1,
      "line": 55
    },
    "startBody": {
      "col": 68,
      "line": 41
    },
    "endBody": {
      "col": 1,
      "line": 55
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row and Header sizes\"\n                    description={\n                        <>\n                            <Description>\n                                The row size can be controlled with <PropName>rowHeight</PropName> and the header size\n                                with <PropName>headerHeight</PropName>.\n                            </Description>\n                            <MoreInfo>Use the story&apos;s controls to resize them</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface RowAndHeaderSizesProps {\n    rowHeight: number;\n    headerHeight: number;\n}\nexport const RowAndHeaderSizes: React.VFC<RowAndHeaderSizesProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={p.rowHeight}\n            headerHeight={p.headerHeight}\n            rowMarkers={\"number\"}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n};\n(RowAndHeaderSizes as any).args = {\n    rowHeight: 34,\n    headerHeight: 34,\n};\n(RowAndHeaderSizes as any).argTypes = {\n    rowHeight: {\n        control: {\n            type: \"range\",\n            min: 20,\n            max: 200,\n        },\n    },\n    headerHeight: {\n        control: {\n            type: \"range\",\n            min: 20,\n            max: 200,\n        },\n    },\n};\n",
      "locationsMap": {
        "row-and-header-sizes": {
          "startLoc": {
            "col": 68,
            "line": 41
          },
          "endLoc": {
            "col": 1,
            "line": 55
          },
          "startBody": {
            "col": 68,
            "line": 41
          },
          "endBody": {
            "col": 1,
            "line": 55
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Row and Header sizes",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["The row size can be controlled with ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "rowHeight"
          }), " and the header size with ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "headerHeight"
          }), "."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "Use the story's controls to resize them"
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RowAndHeaderSizes = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowHeight: p.rowHeight,
    headerHeight: p.headerHeight,
    rowMarkers: "number",
    getCellContent: getCellContent,
    columns: cols,
    rows: 1000
  });
};
RowAndHeaderSizes.displayName = "RowAndHeaderSizes";
RowAndHeaderSizes.args = {
  rowHeight: 34,
  headerHeight: 34
};
RowAndHeaderSizes.argTypes = {
  rowHeight: {
    control: {
      type: "range",
      min: 20,
      max: 200
    }
  },
  headerHeight: {
    control: {
      type: "range",
      min: 20,
      max: 200
    }
  }
};;const __namedExportsOrder = ["RowAndHeaderSizes"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-row-and-header-sizes-stories.48773fe2.iframe.bundle.js.map