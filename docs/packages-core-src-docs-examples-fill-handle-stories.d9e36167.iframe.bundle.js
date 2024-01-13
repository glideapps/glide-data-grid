"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7781],{

/***/ "./packages/core/src/docs/examples/fill-handle.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillHandle": () => (/* binding */ FillHandle),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Fill handle\"\n                    description={\n                        <>\n                            <Description>Fill handles can be used to downfill data with the mouse.</Description>\n                            <MoreInfo>\n                                Just click and drag, the top row will be copied down. Enable using the{\" \"}\n                                <PropName>fillHandle</PropName> prop.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FillHandle: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const getCellContentMangled = React.useCallback<typeof getCellContent>(\n        i => {\n            let val = getCellContent(i);\n            if (i[0] === 1 && val.kind === GridCellKind.Text) {\n                val = {\n                    ...val,\n                    readonly: true,\n                };\n            }\n\n            return val;\n        },\n        [getCellContent]\n    );\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContentMangled}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            fillHandle={true}\n            keybindings={{ downFill: true, rightFill: true }}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "FillHandle": {
    "startLoc": {
      "col": 37,
      "line": 39
    },
    "endLoc": {
      "col": 1,
      "line": 87
    },
    "startBody": {
      "col": 37,
      "line": 39
    },
    "endBody": {
      "col": 1,
      "line": 87
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Fill handle\"\n                    description={\n                        <>\n                            <Description>Fill handles can be used to downfill data with the mouse.</Description>\n                            <MoreInfo>\n                                Just click and drag, the top row will be copied down. Enable using the{\" \"}\n                                <PropName>fillHandle</PropName> prop.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FillHandle: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const getCellContentMangled = React.useCallback<typeof getCellContent>(\n        i => {\n            let val = getCellContent(i);\n            if (i[0] === 1 && val.kind === GridCellKind.Text) {\n                val = {\n                    ...val,\n                    readonly: true,\n                };\n            }\n\n            return val;\n        },\n        [getCellContent]\n    );\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContentMangled}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            fillHandle={true}\n            keybindings={{ downFill: true, rightFill: true }}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n        />\n    );\n};\n",
      "locationsMap": {
        "fill-handle": {
          "startLoc": {
            "col": 37,
            "line": 39
          },
          "endLoc": {
            "col": 1,
            "line": 87
          },
          "startBody": {
            "col": 37,
            "line": 39
          },
          "endBody": {
            "col": 1,
            "line": 87
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Fill handle",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "Fill handles can be used to downfill data with the mouse."
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["Just click and drag, the top row will be copied down. Enable using the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "fillHandle"
          }), " prop."]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const FillHandle = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const getCellContentMangled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(i => {
    let val = getCellContent(i);
    if (i[0] === 1 && val.kind === _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text) {
      val = {
        ...val,
        readonly: true
      };
    }
    return val;
  }, [getCellContent]);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContentMangled,
    columns: cols,
    rowMarkers: "both",
    onPaste: true,
    fillHandle: true,
    keybindings: {
      downFill: true,
      rightFill: true
    },
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
FillHandle.displayName = "FillHandle";;const __namedExportsOrder = ["FillHandle"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-fill-handle-stories.d9e36167.iframe.bundle.js.map