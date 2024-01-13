"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9453],{

/***/ "./packages/core/src/docs/examples/add-data-to-top.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddDataToTop": () => (/* binding */ AddDataToTop),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data\"\n                    description={\n                        <>\n                            <Description>\n                                You can return a different location to have the new row append take place.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AddDataToTop: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(async () => {\n        // shift all of the existing cells down\n        for (let y = numRows; y > 0; y--) {\n            for (let x = 0; x < 6; x++) {\n                setCellValueRaw([x, y], getCellContent([x, y - 1]));\n            }\n        }\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, 0]);\n            setCellValueRaw([c, 0], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n        return \"top\" as const;\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "AddDataToTop": {
    "startLoc": {
      "col": 39,
      "line": 34
    },
    "endLoc": {
      "col": 1,
      "line": 70
    },
    "startBody": {
      "col": 39,
      "line": 34
    },
    "endBody": {
      "col": 1,
      "line": 70
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data\"\n                    description={\n                        <>\n                            <Description>\n                                You can return a different location to have the new row append take place.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AddDataToTop: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(async () => {\n        // shift all of the existing cells down\n        for (let y = numRows; y > 0; y--) {\n            for (let x = 0; x < 6; x++) {\n                setCellValueRaw([x, y], getCellContent([x, y - 1]));\n            }\n        }\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, 0]);\n            setCellValueRaw([c, 0], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n        return \"top\" as const;\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n",
      "locationsMap": {
        "add-data-to-top": {
          "startLoc": {
            "col": 39,
            "line": 34
          },
          "endLoc": {
            "col": 1,
            "line": 70
          },
          "startBody": {
            "col": 39,
            "line": 34
          },
          "endBody": {
            "col": 1,
            "line": 70
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Add data",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "You can return a different location to have the new row append take place."
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const AddDataToTop = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async () => {
    for (let y = numRows; y > 0; y--) {
      for (let x = 0; x < 6; x++) {
        setCellValueRaw([x, y], getCellContent([x, y - 1]));
      }
    }
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, 0]);
      setCellValueRaw([c, 0], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
    return "top";
  }, [getCellContent, numRows, setCellValueRaw]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    onCellEdited: setCellValue,
    trailingRowOptions: {
      hint: "New row...",
      sticky: true,
      tint: true
    },
    rows: numRows,
    onRowAppended: onRowAppended
  });
};
AddDataToTop.displayName = "AddDataToTop";;const __namedExportsOrder = ["AddDataToTop"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-add-data-to-top-stories.92eca733.iframe.bundle.js.map