"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9159],{

/***/ "./packages/core/src/docs/examples/freeze-rows.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FreezeRows": () => (/* binding */ FreezeRows),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Freeze rows\"\n                    description={\n                        <>\n                            <Description>Rows can be frozen to make sure the user always sees them.</Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FreezeRows: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not\n        // need to do this.\n        for (let c = 0; c < cols.length; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        // Tell the data grid there is another row\n        setNumRows(cv => cv + 1);\n    }, [cols.length, getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            freezeTrailingRows={2}\n            experimental={{\n                kineticScrollPerfHack: true,\n            }}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "FreezeRows": {
    "startLoc": {
      "col": 37,
      "line": 32
    },
    "endLoc": {
      "col": 1,
      "line": 71
    },
    "startBody": {
      "col": 37,
      "line": 32
    },
    "endBody": {
      "col": 1,
      "line": 71
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Freeze rows\"\n                    description={\n                        <>\n                            <Description>Rows can be frozen to make sure the user always sees them.</Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FreezeRows: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not\n        // need to do this.\n        for (let c = 0; c < cols.length; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        // Tell the data grid there is another row\n        setNumRows(cv => cv + 1);\n    }, [cols.length, getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            freezeTrailingRows={2}\n            experimental={{\n                kineticScrollPerfHack: true,\n            }}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n",
      "locationsMap": {
        "freeze-rows": {
          "startLoc": {
            "col": 37,
            "line": 32
          },
          "endLoc": {
            "col": 1,
            "line": 71
          },
          "startBody": {
            "col": 37,
            "line": 32
          },
          "endBody": {
            "col": 1,
            "line": 71
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Freeze rows",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "Rows can be frozen to make sure the user always sees them."
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const FreezeRows = () => {
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
    freezeTrailingRows: 2,
    experimental: {
      kineticScrollPerfHack: true
    },
    onPaste: true,
    onCellEdited: setCellValue,
    trailingRowOptions: {
      sticky: true,
      tint: true,
      hint: "New row..."
    },
    rows: numRows,
    onRowAppended: onRowAppended
  });
};
FreezeRows.displayName = "FreezeRows";;const __namedExportsOrder = ["FreezeRows"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-freeze-rows-stories.a4cba8cc.iframe.bundle.js.map