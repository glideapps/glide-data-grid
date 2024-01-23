"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9420],{

/***/ "./packages/core/src/docs/examples/add-data.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddData": () => (/* binding */ AddData),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data\"\n                    description={\n                        <>\n                            <Description>Data can be added by clicking on the trailing row.</Description>\n                            <MoreInfo>\n                                Keyboard is also supported, just navigate past the last row and press{\" \"}\n                                <KeyName>Enter</KeyName>\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AddData: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not\n        // need to do this.\n        for (let c = 0; c < cols.length; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        // Tell the data grid there is another row\n        setNumRows(cv => cv + 1);\n    }, [cols.length, getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: false,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "AddData": {
    "startLoc": {
      "col": 34,
      "line": 38
    },
    "endLoc": {
      "col": 1,
      "line": 73
    },
    "startBody": {
      "col": 34,
      "line": 38
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
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data\"\n                    description={\n                        <>\n                            <Description>Data can be added by clicking on the trailing row.</Description>\n                            <MoreInfo>\n                                Keyboard is also supported, just navigate past the last row and press{\" \"}\n                                <KeyName>Enter</KeyName>\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AddData: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not\n        // need to do this.\n        for (let c = 0; c < cols.length; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        // Tell the data grid there is another row\n        setNumRows(cv => cv + 1);\n    }, [cols.length, getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: false,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n",
      "locationsMap": {
        "add-data": {
          "startLoc": {
            "col": 34,
            "line": 38
          },
          "endLoc": {
            "col": 1,
            "line": 73
          },
          "startBody": {
            "col": 34,
            "line": 38
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
      title: "Add data",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "Data can be added by clicking on the trailing row."
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["Keyboard is also supported, just navigate past the last row and press", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "Enter"
          })]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const AddData = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < cols.length; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
  }, [cols.length, getCellContent, numRows, setCellValueRaw]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    onPaste: true,
    onCellEdited: setCellValue,
    trailingRowOptions: {
      sticky: false,
      tint: true,
      hint: "New row..."
    },
    rows: numRows,
    onRowAppended: onRowAppended
  });
};
AddData.displayName = "AddData";;const __namedExportsOrder = ["AddData"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-add-data-stories.4e3c4bd0.iframe.bundle.js.map