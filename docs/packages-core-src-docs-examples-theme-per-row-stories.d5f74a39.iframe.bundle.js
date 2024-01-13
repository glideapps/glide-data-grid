"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7608],{

/***/ "./packages/core/src/docs/examples/theme-per-row.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemePerRow": () => (/* binding */ ThemePerRow),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Theme per row\"\n                    description={\n                        <>\n                            <Description>\n                                Each row can provide theme overrides for rendering that row using the{\" \"}\n                                <PropName>getRowThemeOverride</PropName> callback.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ThemePerRow: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(5);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            trailingRowOptions={{\n                sticky: true,\n                tint: true,\n            }}\n            onRowAppended={() => undefined}\n            getRowThemeOverride={i =>\n                i % 2 === 0\n                    ? undefined\n                    : {\n                          bgCell: \"#f0f8ff\",\n                          borderColor: \"#3f90e0\",\n                      }\n            }\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={1_000_000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ThemePerRow": {
    "startLoc": {
      "col": 38,
      "line": 35
    },
    "endLoc": {
      "col": 1,
      "line": 61
    },
    "startBody": {
      "col": 38,
      "line": 35
    },
    "endBody": {
      "col": 1,
      "line": 61
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Theme per row\"\n                    description={\n                        <>\n                            <Description>\n                                Each row can provide theme overrides for rendering that row using the{\" \"}\n                                <PropName>getRowThemeOverride</PropName> callback.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ThemePerRow: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(5);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            trailingRowOptions={{\n                sticky: true,\n                tint: true,\n            }}\n            onRowAppended={() => undefined}\n            getRowThemeOverride={i =>\n                i % 2 === 0\n                    ? undefined\n                    : {\n                          bgCell: \"#f0f8ff\",\n                          borderColor: \"#3f90e0\",\n                      }\n            }\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={1_000_000}\n        />\n    );\n};\n",
      "locationsMap": {
        "theme-per-row": {
          "startLoc": {
            "col": 38,
            "line": 35
          },
          "endLoc": {
            "col": 1,
            "line": 61
          },
          "startBody": {
            "col": 38,
            "line": 35
          },
          "endBody": {
            "col": 1,
            "line": 61
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Theme per row",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Each row can provide theme overrides for rendering that row using the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "getRowThemeOverride"
          }), " callback."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ThemePerRow = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(5);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    trailingRowOptions: {
      sticky: true,
      tint: true
    },
    onRowAppended: () => undefined,
    getRowThemeOverride: i => i % 2 === 0 ? undefined : {
      bgCell: "#f0f8ff",
      borderColor: "#3f90e0"
    },
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    rows: 1000000
  });
};
ThemePerRow.displayName = "ThemePerRow";;const __namedExportsOrder = ["ThemePerRow"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-theme-per-row-stories.d5f74a39.iframe.bundle.js.map