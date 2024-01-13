"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[3810],{

/***/ "./packages/core/src/docs/examples/paste-support.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PasteSupport": () => (/* binding */ PasteSupport),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Paste support\"\n                    description={\n                        <>\n                            <Description>\n                                The data grid can handle paste automatically by returning true from{\" \"}\n                                <PropName>onPaste</PropName>. You can also return false and handle paste yourself. If\n                                paste is undefined the DataEditor will do its best to paste to the current cell.\n                            </Description>\n                            <MoreInfo>\n                                Paste supports the copy format of Google Sheets and Excel. Below is an example of data\n                                copied from excel with some escaped text.\n                            </MoreInfo>\n                            <textarea\n                                value={`Sunday\tDogs\thttps://google.com\nMonday\tCats\thttps://google.com\nTuesday\tTurtles\thttps://google.com\nWednesday\tBears\thttps://google.com\nThursday\t\"L  ions\"\thttps://google.com\nFriday\tPigs\thttps://google.com\nSaturday\t\"Turkeys and some \"\"quotes\"\" and\na new line char \"\"more quotes\"\" plus a tab  .\"\thttps://google.com`}\n                                style={{\n                                    width: \"100%\",\n                                    marginBottom: 20,\n                                    borderRadius: 9,\n                                    minHeight: 200,\n                                    padding: 10,\n                                }}\n                            />\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const PasteSupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(50, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers=\"both\"\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            onPaste={true}\n            rows={400}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "PasteSupport": {
    "startLoc": {
      "col": 39,
      "line": 58
    },
    "endLoc": {
      "col": 1,
      "line": 73
    },
    "startBody": {
      "col": 39,
      "line": 58
    },
    "endBody": {
      "col": 1,
      "line": 73
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Paste support\"\n                    description={\n                        <>\n                            <Description>\n                                The data grid can handle paste automatically by returning true from{\" \"}\n                                <PropName>onPaste</PropName>. You can also return false and handle paste yourself. If\n                                paste is undefined the DataEditor will do its best to paste to the current cell.\n                            </Description>\n                            <MoreInfo>\n                                Paste supports the copy format of Google Sheets and Excel. Below is an example of data\n                                copied from excel with some escaped text.\n                            </MoreInfo>\n                            <textarea\n                                value={`Sunday\tDogs\thttps://google.com\nMonday\tCats\thttps://google.com\nTuesday\tTurtles\thttps://google.com\nWednesday\tBears\thttps://google.com\nThursday\t\"L  ions\"\thttps://google.com\nFriday\tPigs\thttps://google.com\nSaturday\t\"Turkeys and some \"\"quotes\"\" and\na new line char \"\"more quotes\"\" plus a tab  .\"\thttps://google.com`}\n                                style={{\n                                    width: \"100%\",\n                                    marginBottom: 20,\n                                    borderRadius: 9,\n                                    minHeight: 200,\n                                    padding: 10,\n                                }}\n                            />\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const PasteSupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(50, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers=\"both\"\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            onPaste={true}\n            rows={400}\n        />\n    );\n};\n",
      "locationsMap": {
        "paste-support": {
          "startLoc": {
            "col": 39,
            "line": 58
          },
          "endLoc": {
            "col": 1,
            "line": 73
          },
          "startBody": {
            "col": 39,
            "line": 58
          },
          "endBody": {
            "col": 1,
            "line": 73
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Paste support",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["The data grid can handle paste automatically by returning true from", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "onPaste"
          }), ". You can also return false and handle paste yourself. If paste is undefined the DataEditor will do its best to paste to the current cell."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "Paste supports the copy format of Google Sheets and Excel. Below is an example of data copied from excel with some escaped text."
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("textarea", {
          value: `Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`,
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
const PasteSupport = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(50, false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    rowMarkers: "both",
    columns: cols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    onPaste: true,
    rows: 400
  });
};
PasteSupport.displayName = "PasteSupport";;const __namedExportsOrder = ["PasteSupport"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-paste-support-stories.15b4369f.iframe.bundle.js.map