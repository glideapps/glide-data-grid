"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8987],{

/***/ "./packages/core/src/docs/examples/add-data-to-middle.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddDataToMiddle": () => (/* binding */ AddDataToMiddle),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data to middle\"\n                    description={\n                        <>\n                            <Description>\n                                You can return a different location to have the new row append take place.\n                            </Description>\n                            <MoreInfo>\n                                Note that <KeyName>insertIndex</KeyName> is zero-based while the number column on the\n                                left side of the grid is one-based, so inserting at index &quot;4&quot; creates a new\n                                row at &quot;5&quot;\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface AddDataToMiddleProps {\n    insertIndex: number;\n}\nexport const AddDataToMiddle: React.FC<AddDataToMiddleProps> = p => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const index = p.insertIndex;\n    const onRowAppended = React.useCallback(async () => {\n        // shift rows below index down\n        for (let y = numRows; y > index; y--) {\n            for (let x = 0; x < 6; x++) {\n                setCellValueRaw([x, y], getCellContent([x, y - 1]));\n            }\n        }\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, index]);\n            setCellValueRaw([c, index], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n        return index;\n    }, [getCellContent, numRows, setCellValueRaw, index]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n(AddDataToMiddle as any).args = {\n    insertIndex: 10,\n};\n(AddDataToMiddle as any).argTypes = {\n    insertIndex: {\n        control: {\n            type: \"range\",\n            min: 1,\n            max: 48,\n        },\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "AddDataToMiddle": {
    "startLoc": {
      "col": 63,
      "line": 44
    },
    "endLoc": {
      "col": 1,
      "line": 81
    },
    "startBody": {
      "col": 63,
      "line": 44
    },
    "endBody": {
      "col": 1,
      "line": 81
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add data to middle\"\n                    description={\n                        <>\n                            <Description>\n                                You can return a different location to have the new row append take place.\n                            </Description>\n                            <MoreInfo>\n                                Note that <KeyName>insertIndex</KeyName> is zero-based while the number column on the\n                                left side of the grid is one-based, so inserting at index &quot;4&quot; creates a new\n                                row at &quot;5&quot;\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface AddDataToMiddleProps {\n    insertIndex: number;\n}\nexport const AddDataToMiddle: React.FC<AddDataToMiddleProps> = p => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const index = p.insertIndex;\n    const onRowAppended = React.useCallback(async () => {\n        // shift rows below index down\n        for (let y = numRows; y > index; y--) {\n            for (let x = 0; x < 6; x++) {\n                setCellValueRaw([x, y], getCellContent([x, y - 1]));\n            }\n        }\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, index]);\n            setCellValueRaw([c, index], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n        return index;\n    }, [getCellContent, numRows, setCellValueRaw, index]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n(AddDataToMiddle as any).args = {\n    insertIndex: 10,\n};\n(AddDataToMiddle as any).argTypes = {\n    insertIndex: {\n        control: {\n            type: \"range\",\n            min: 1,\n            max: 48,\n        },\n    },\n};\n",
      "locationsMap": {
        "add-data-to-middle": {
          "startLoc": {
            "col": 63,
            "line": 44
          },
          "endLoc": {
            "col": 1,
            "line": 81
          },
          "startBody": {
            "col": 63,
            "line": 44
          },
          "endBody": {
            "col": 1,
            "line": 81
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Add data to middle",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "You can return a different location to have the new row append take place."
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["Note that ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "insertIndex"
          }), " is zero-based while the number column on the left side of the grid is one-based, so inserting at index \"4\" creates a new row at \"5\""]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const AddDataToMiddle = p => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const index = p.insertIndex;
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async () => {
    for (let y = numRows; y > index; y--) {
      for (let x = 0; x < 6; x++) {
        setCellValueRaw([x, y], getCellContent([x, y - 1]));
      }
    }
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, index]);
      setCellValueRaw([c, index], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
    return index;
  }, [getCellContent, numRows, setCellValueRaw, index]);
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
AddDataToMiddle.displayName = "AddDataToMiddle";
AddDataToMiddle.args = {
  insertIndex: 10
};
AddDataToMiddle.argTypes = {
  insertIndex: {
    control: {
      type: "range",
      min: 1,
      max: 48
    }
  }
};;const __namedExportsOrder = ["AddDataToMiddle"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-add-data-to-middle-stories.8bba2c02.iframe.bundle.js.map