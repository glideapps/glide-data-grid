"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8867],{

/***/ "./packages/core/src/docs/examples/theme-per-column.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemePerColumn": () => (/* binding */ ThemePerColumn),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, defaultProps, useAllMockedKinds } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Theme per column\"\n                    description={\n                        <>\n                            <Description>\n                                Each column can provide theme overrides for rendering that column.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ThemePerColumn: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const realCols = React.useMemo(() => {\n        const c = [...cols];\n        c[3] = {\n            ...c[3],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n                baseFontStyle: \"600 13px\",\n            },\n        };\n        c[4] = {\n            ...c[4],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n                baseFontStyle: \"600 13px\",\n            },\n        };\n        c[9] = {\n            ...c[9],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n            },\n        };\n        c[10] = {\n            ...c[10],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n            },\n        };\n        return c;\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={realCols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ThemePerColumn": {
    "startLoc": {
      "col": 41,
      "line": 28
    },
    "endLoc": {
      "col": 1,
      "line": 88
    },
    "startBody": {
      "col": 41,
      "line": 28
    },
    "endBody": {
      "col": 1,
      "line": 88
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, defaultProps, useAllMockedKinds } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Theme per column\"\n                    description={\n                        <>\n                            <Description>\n                                Each column can provide theme overrides for rendering that column.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ThemePerColumn: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const realCols = React.useMemo(() => {\n        const c = [...cols];\n        c[3] = {\n            ...c[3],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n                baseFontStyle: \"600 13px\",\n            },\n        };\n        c[4] = {\n            ...c[4],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n                baseFontStyle: \"600 13px\",\n            },\n        };\n        c[9] = {\n            ...c[9],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n            },\n        };\n        c[10] = {\n            ...c[10],\n            themeOverride: {\n                textDark: \"#009CA6\",\n                bgIconHeader: \"#009CA6\",\n                accentColor: \"#009CA6\",\n                accentLight: \"#009CA620\",\n                fgIconHeader: \"#FFFFFF\",\n            },\n        };\n        return c;\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={realCols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "theme-per-column": {
          "startLoc": {
            "col": 41,
            "line": 28
          },
          "endLoc": {
            "col": 1,
            "line": 88
          },
          "startBody": {
            "col": 41,
            "line": 28
          },
          "endBody": {
            "col": 1,
            "line": 88
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Theme per column",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "Each column can provide theme overrides for rendering that column."
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ThemePerColumn = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const realCols = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const c = [...cols];
    c[3] = {
      ...c[3],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF",
        baseFontStyle: "600 13px"
      }
    };
    c[4] = {
      ...c[4],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF",
        baseFontStyle: "600 13px"
      }
    };
    c[9] = {
      ...c[9],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF"
      }
    };
    c[10] = {
      ...c[10],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF"
      }
    };
    return c;
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: realCols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    rows: 1000
  });
};
ThemePerColumn.displayName = "ThemePerColumn";;const __namedExportsOrder = ["ThemePerColumn"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-theme-per-column-stories.5304b4e2.iframe.bundle.js.map