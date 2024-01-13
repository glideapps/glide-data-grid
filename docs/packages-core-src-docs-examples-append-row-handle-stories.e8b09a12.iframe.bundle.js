"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1247],{

/***/ "./packages/core/src/docs/examples/append-row-handle.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppendRowHandle": () => (/* binding */ AppendRowHandle),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AppendRowHandle: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const onClick = React.useCallback(() => {\n        void ref.current?.appendRow(3, false);\n    }, [ref]);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <BeautifulWrapper\n            title=\"appendRow Ref\"\n            description={\n                <>\n                    <Description>\n                        Adding data can also be triggered from outside of <PropName>DataEditor</PropName>\n                    </Description>\n                    <MoreInfo>\n                        By calling <PropName>appendRow</PropName> on a <PropName>ref</PropName> to your grid, you can\n                        trigger the append elsewhere, like this <KeyName onClick={onClick}>Append</KeyName> button\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={ref}\n                getCellContent={getCellContent}\n                columns={cols}\n                rowMarkers={\"both\"}\n                onCellEdited={setCellValue}\n                trailingRowOptions={{\n                    hint: \"New row...\",\n                    sticky: true,\n                    tint: true,\n                }}\n                rows={numRows}\n                onRowAppended={onRowAppended}\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "AppendRowHandle": {
    "startLoc": {
      "col": 42,
      "line": 28
    },
    "endLoc": {
      "col": 1,
      "line": 79
    },
    "startBody": {
      "col": 42,
      "line": 28
    },
    "endBody": {
      "col": 1,
      "line": 79
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n    clearCell,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AppendRowHandle: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);\n\n    const [numRows, setNumRows] = React.useState(50);\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const onClick = React.useCallback(() => {\n        void ref.current?.appendRow(3, false);\n    }, [ref]);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        for (let c = 0; c < 6; c++) {\n            const cell = getCellContent([c, newRow]);\n            setCellValueRaw([c, newRow], clearCell(cell));\n        }\n        setNumRows(cv => cv + 1);\n    }, [getCellContent, numRows, setCellValueRaw]);\n\n    return (\n        <BeautifulWrapper\n            title=\"appendRow Ref\"\n            description={\n                <>\n                    <Description>\n                        Adding data can also be triggered from outside of <PropName>DataEditor</PropName>\n                    </Description>\n                    <MoreInfo>\n                        By calling <PropName>appendRow</PropName> on a <PropName>ref</PropName> to your grid, you can\n                        trigger the append elsewhere, like this <KeyName onClick={onClick}>Append</KeyName> button\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={ref}\n                getCellContent={getCellContent}\n                columns={cols}\n                rowMarkers={\"both\"}\n                onCellEdited={setCellValue}\n                trailingRowOptions={{\n                    hint: \"New row...\",\n                    sticky: true,\n                    tint: true,\n                }}\n                rows={numRows}\n                onRowAppended={onRowAppended}\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "append-row-handle": {
          "startLoc": {
            "col": 42,
            "line": 28
          },
          "endLoc": {
            "col": 1,
            "line": 79
          },
          "startBody": {
            "col": 42,
            "line": 28
          },
          "endBody": {
            "col": 1,
            "line": 79
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
  })]
});
const AppendRowHandle = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(50);
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const onClick = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    var _ref$current;
    void ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.appendRow(3, false));
  }, [ref]);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .clearCell */ .MP)(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "appendRow Ref",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Adding data can also be triggered from outside of ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "DataEditor"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["By calling ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "appendRow"
        }), " on a ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "ref"
        }), " to your grid, you can trigger the append elsewhere, like this ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          onClick: onClick,
          children: "Append"
        }), " button"]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      ref: ref,
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
    })
  });
};
AppendRowHandle.displayName = "AppendRowHandle";;const __namedExportsOrder = ["AppendRowHandle"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-append-row-handle-stories.e8b09a12.iframe.bundle.js.map