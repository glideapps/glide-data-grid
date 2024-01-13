"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9320],{

/***/ "./packages/core/src/docs/examples/copy-support.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CopySupport": () => (/* binding */ CopySupport),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Copy support\"\n                    description={\n                        <>\n                            <Description>\n                                Large amounts of data can be copied and customized using{\" \"}\n                                <PropName>getCellsForSelection</PropName>.\n                            </Description>\n                            <MoreInfo>\n                                The data is copied into a format ready to be pasted into Excel or Google Sheets\n                            </MoreInfo>\n                            <textarea\n                                placeholder=\"Copy something below and paste it here...\"\n                                style={{\n                                    width: \"100%\",\n                                    marginBottom: 20,\n                                    borderRadius: 9,\n                                    minHeight: 200,\n                                    padding: 10,\n                                }}\n                            />\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CopySupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(10, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers=\"both\"\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={400}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "CopySupport": {
    "startLoc": {
      "col": 38,
      "line": 49
    },
    "endLoc": {
      "col": 1,
      "line": 63
    },
    "startBody": {
      "col": 38,
      "line": 49
    },
    "endBody": {
      "col": 1,
      "line": 63
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Copy support\"\n                    description={\n                        <>\n                            <Description>\n                                Large amounts of data can be copied and customized using{\" \"}\n                                <PropName>getCellsForSelection</PropName>.\n                            </Description>\n                            <MoreInfo>\n                                The data is copied into a format ready to be pasted into Excel or Google Sheets\n                            </MoreInfo>\n                            <textarea\n                                placeholder=\"Copy something below and paste it here...\"\n                                style={{\n                                    width: \"100%\",\n                                    marginBottom: 20,\n                                    borderRadius: 9,\n                                    minHeight: 200,\n                                    padding: 10,\n                                }}\n                            />\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CopySupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(10, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers=\"both\"\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={400}\n        />\n    );\n};\n",
      "locationsMap": {
        "copy-support": {
          "startLoc": {
            "col": 38,
            "line": 49
          },
          "endLoc": {
            "col": 1,
            "line": 63
          },
          "startBody": {
            "col": 38,
            "line": 49
          },
          "endBody": {
            "col": 1,
            "line": 63
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Copy support",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Large amounts of data can be copied and customized using", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "getCellsForSelection"
          }), "."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "The data is copied into a format ready to be pasted into Excel or Google Sheets"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("textarea", {
          placeholder: "Copy something below and paste it here...",
          style: {
            width: "100%",
            marginBottom: 20,
            borderRadius: 9,
            minHeight: 200,
            padding: 10
          }
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const CopySupport = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(10, false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    rowMarkers: "both",
    columns: cols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    rows: 400
  });
};
CopySupport.displayName = "CopySupport";;const __namedExportsOrder = ["CopySupport"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-copy-support-stories.f6d71ba0.iframe.bundle.js.map