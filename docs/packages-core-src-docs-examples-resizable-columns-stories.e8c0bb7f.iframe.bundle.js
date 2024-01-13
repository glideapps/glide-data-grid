"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7823],{

/***/ "./packages/core/src/docs/examples/resizable-columns.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResizableColumns": () => (/* binding */ ResizableColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Resizable columns\"\n                    description={\n                        <>\n                            <Description>\n                                You can resize columns by dragging their edges, as long as you respond to the{\" \"}\n                                <PropName>onColumnResize</PropName> prop.\n                            </Description>\n                            <MoreInfo>\n                                By setting the <PropName>overscrollX</PropName> property extra space can be allocated at\n                                the end of the grid to allow for easier resizing of the final column. You can highlight\n                                multiple columns to resize them all at once.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ResizableColumns: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            overscrollX={200}\n            overscrollY={200}\n            maxColumnAutoWidth={500}\n            maxColumnWidth={2000}\n            rows={50}\n            scaleToRem={true}\n            theme={React.useMemo(\n                () => ({\n                    baseFontStyle: \"0.8125rem\",\n                    headerFontStyle: \"600 0.8125rem\",\n                    editorFontSize: \"0.8125rem\",\n                }),\n                []\n            )}\n            onColumnResize={onColumnResize}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ResizableColumns": {
    "startLoc": {
      "col": 43,
      "line": 41
    },
    "endLoc": {
      "col": 1,
      "line": 67
    },
    "startBody": {
      "col": 43,
      "line": 41
    },
    "endBody": {
      "col": 1,
      "line": 67
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Resizable columns\"\n                    description={\n                        <>\n                            <Description>\n                                You can resize columns by dragging their edges, as long as you respond to the{\" \"}\n                                <PropName>onColumnResize</PropName> prop.\n                            </Description>\n                            <MoreInfo>\n                                By setting the <PropName>overscrollX</PropName> property extra space can be allocated at\n                                the end of the grid to allow for easier resizing of the final column. You can highlight\n                                multiple columns to resize them all at once.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ResizableColumns: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            overscrollX={200}\n            overscrollY={200}\n            maxColumnAutoWidth={500}\n            maxColumnWidth={2000}\n            rows={50}\n            scaleToRem={true}\n            theme={React.useMemo(\n                () => ({\n                    baseFontStyle: \"0.8125rem\",\n                    headerFontStyle: \"600 0.8125rem\",\n                    editorFontSize: \"0.8125rem\",\n                }),\n                []\n            )}\n            onColumnResize={onColumnResize}\n        />\n    );\n};\n",
      "locationsMap": {
        "resizable-columns": {
          "startLoc": {
            "col": 43,
            "line": 41
          },
          "endLoc": {
            "col": 1,
            "line": 67
          },
          "startBody": {
            "col": 43,
            "line": 41
          },
          "endBody": {
            "col": 1,
            "line": 67
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Resizable columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["You can resize columns by dragging their edges, as long as you respond to the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "onColumnResize"
          }), " prop."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["By setting the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "overscrollX"
          }), " property extra space can be allocated at the end of the grid to allow for easier resizing of the final column. You can highlight multiple columns to resize them all at once."]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ResizableColumns = () => {
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
    overscrollX: 200,
    overscrollY: 200,
    maxColumnAutoWidth: 500,
    maxColumnWidth: 2000,
    rows: 50,
    scaleToRem: true,
    theme: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      baseFontStyle: "0.8125rem",
      headerFontStyle: "600 0.8125rem",
      editorFontSize: "0.8125rem"
    }), []),
    onColumnResize: onColumnResize
  });
};
ResizableColumns.displayName = "ResizableColumns";;const __namedExportsOrder = ["ResizableColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-resizable-columns-stories.e8c0bb7f.iframe.bundle.js.map