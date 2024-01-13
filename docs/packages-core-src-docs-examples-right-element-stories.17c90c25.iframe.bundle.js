"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9908],{

/***/ "./packages/core/src/docs/examples/right-element.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightElement": () => (/* binding */ RightElement),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Right Element\"\n                    description={\n                        <Description>\n                            A DOM element may be added as a trailer to the grid by using the{\" \"}\n                            <PropName>rightElement</PropName> prop.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RightElement: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(8, false);\n\n    const columns = React.useMemo(() => cols.map(c => ({ ...c, grow: 1 })), [cols]);\n\n    const [numRows, setNumRows] = React.useState(300);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        setNumRows(cv => cv + 1);\n        for (let c = 0; c < 6; c++) {\n            setCellValue([c, newRow], {\n                displayData: \"\",\n                data: \"\",\n            } as any);\n        }\n    }, [numRows, setCellValue]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n            rightElementProps={{ sticky: true }}\n            rightElement={\n                <div\n                    style={{\n                        height: \"100%\",\n                        padding: \"20px 20px 40px 20px\",\n                        width: 200,\n                        color: \"black\",\n                        whiteSpace: \"pre-wrap\",\n                        backgroundColor: \"rgba(240, 240, 250, 0.2)\",\n                        display: \"flex\",\n                        justifyContent: \"center\",\n                        alignItems: \"center\",\n                        boxShadow: \"0 0 10px rgba(0, 0, 0, 0.15)\",\n                        backdropFilter: \"blur(12px)\",\n                    }}>\n                    This is a real DOM element. You can put whatever you want here. You can also size it as big as you\n                    want. {\"\\n\\n\"}It also does not have to be sticky.\n                </div>\n            }\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "RightElement": {
    "startLoc": {
      "col": 39,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 87
    },
    "startBody": {
      "col": 39,
      "line": 33
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
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Right Element\"\n                    description={\n                        <Description>\n                            A DOM element may be added as a trailer to the grid by using the{\" \"}\n                            <PropName>rightElement</PropName> prop.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RightElement: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(8, false);\n\n    const columns = React.useMemo(() => cols.map(c => ({ ...c, grow: 1 })), [cols]);\n\n    const [numRows, setNumRows] = React.useState(300);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        setNumRows(cv => cv + 1);\n        for (let c = 0; c < 6; c++) {\n            setCellValue([c, newRow], {\n                displayData: \"\",\n                data: \"\",\n            } as any);\n        }\n    }, [numRows, setCellValue]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rowMarkers={\"both\"}\n            onCellEdited={setCellValue}\n            trailingRowOptions={{\n                hint: \"New row...\",\n                sticky: true,\n                tint: true,\n            }}\n            rows={numRows}\n            onRowAppended={onRowAppended}\n            rightElementProps={{ sticky: true }}\n            rightElement={\n                <div\n                    style={{\n                        height: \"100%\",\n                        padding: \"20px 20px 40px 20px\",\n                        width: 200,\n                        color: \"black\",\n                        whiteSpace: \"pre-wrap\",\n                        backgroundColor: \"rgba(240, 240, 250, 0.2)\",\n                        display: \"flex\",\n                        justifyContent: \"center\",\n                        alignItems: \"center\",\n                        boxShadow: \"0 0 10px rgba(0, 0, 0, 0.15)\",\n                        backdropFilter: \"blur(12px)\",\n                    }}>\n                    This is a real DOM element. You can put whatever you want here. You can also size it as big as you\n                    want. {\"\\n\\n\"}It also does not have to be sticky.\n                </div>\n            }\n        />\n    );\n};\n",
      "locationsMap": {
        "right-element": {
          "startLoc": {
            "col": 39,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 87
          },
          "startBody": {
            "col": 39,
            "line": 33
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
      title: "Right Element",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["A DOM element may be added as a trailer to the grid by using the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "rightElement"
        }), " prop."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RightElement = () => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(8, false);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => cols.map(c => ({
    ...c,
    grow: 1
  })), [cols]);
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(300);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    setNumRows(cv => cv + 1);
    for (let c = 0; c < 6; c++) {
      setCellValue([c, newRow], {
        displayData: "",
        data: ""
      });
    }
  }, [numRows, setCellValue]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: columns,
    rowMarkers: "both",
    onCellEdited: setCellValue,
    trailingRowOptions: {
      hint: "New row...",
      sticky: true,
      tint: true
    },
    rows: numRows,
    onRowAppended: onRowAppended,
    rightElementProps: {
      sticky: true
    },
    rightElement: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        height: "100%",
        padding: "20px 20px 40px 20px",
        width: 200,
        color: "black",
        whiteSpace: "pre-wrap",
        backgroundColor: "rgba(240, 240, 250, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(12px)"
      },
      children: ["This is a real DOM element. You can put whatever you want here. You can also size it as big as you want. ", "\n\n", "It also does not have to be sticky."]
    })
  });
};
RightElement.displayName = "RightElement";;const __namedExportsOrder = ["RightElement"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-right-element-stories.17c90c25.iframe.bundle.js.map