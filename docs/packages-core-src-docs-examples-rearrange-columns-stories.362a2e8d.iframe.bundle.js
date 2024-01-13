"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7369],{

/***/ "./packages/core/src/docs/examples/rearrange-columns.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RearrangeColumns": () => (/* binding */ RearrangeColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item, GridCell } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Rearrange Columns\"\n                    description={\n                        <Description>\n                            Columns can be rearranged by drag and dropping, as long as you respond to the{\" \"}\n                            <PropName>onColumnMoved</PropName> callback.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RearrangeColumns: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(60);\n\n    // This is a dirty hack because the mock generator doesn't really support changing this. In a real data source\n    // you should track indexes properly\n    const [sortableCols, setSortableCols] = React.useState(cols);\n\n    const onColMoved = React.useCallback((startIndex: number, endIndex: number): void => {\n        setSortableCols(old => {\n            const newCols = [...old];\n            const [toMove] = newCols.splice(startIndex, 1);\n            newCols.splice(endIndex, 0, toMove);\n            return newCols;\n        });\n    }, []);\n\n    const onColProposeMove = React.useCallback((_startIndex: number, endIndex: number): boolean => {\n        return endIndex !== 3;\n    }, []);\n\n    const getCellContentMangled = React.useCallback(\n        ([col, row]: Item): GridCell => {\n            const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);\n            return getCellContent([remappedCol, row]);\n        },\n        [cols, getCellContent, sortableCols]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            freezeColumns={1}\n            rowMarkers=\"both\"\n            getCellContent={getCellContentMangled}\n            onColumnProposeMove={onColProposeMove}\n            columns={sortableCols}\n            onColumnMoved={onColMoved}\n            columnSelectionBlending=\"mixed\"\n            rangeSelectionBlending=\"mixed\"\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "RearrangeColumns": {
    "startLoc": {
      "col": 43,
      "line": 34
    },
    "endLoc": {
      "col": 1,
      "line": 76
    },
    "startBody": {
      "col": 43,
      "line": 34
    },
    "endBody": {
      "col": 1,
      "line": 76
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item, GridCell } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Rearrange Columns\"\n                    description={\n                        <Description>\n                            Columns can be rearranged by drag and dropping, as long as you respond to the{\" \"}\n                            <PropName>onColumnMoved</PropName> callback.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RearrangeColumns: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(60);\n\n    // This is a dirty hack because the mock generator doesn't really support changing this. In a real data source\n    // you should track indexes properly\n    const [sortableCols, setSortableCols] = React.useState(cols);\n\n    const onColMoved = React.useCallback((startIndex: number, endIndex: number): void => {\n        setSortableCols(old => {\n            const newCols = [...old];\n            const [toMove] = newCols.splice(startIndex, 1);\n            newCols.splice(endIndex, 0, toMove);\n            return newCols;\n        });\n    }, []);\n\n    const onColProposeMove = React.useCallback((_startIndex: number, endIndex: number): boolean => {\n        return endIndex !== 3;\n    }, []);\n\n    const getCellContentMangled = React.useCallback(\n        ([col, row]: Item): GridCell => {\n            const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);\n            return getCellContent([remappedCol, row]);\n        },\n        [cols, getCellContent, sortableCols]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            freezeColumns={1}\n            rowMarkers=\"both\"\n            getCellContent={getCellContentMangled}\n            onColumnProposeMove={onColProposeMove}\n            columns={sortableCols}\n            onColumnMoved={onColMoved}\n            columnSelectionBlending=\"mixed\"\n            rangeSelectionBlending=\"mixed\"\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "rearrange-columns": {
          "startLoc": {
            "col": 43,
            "line": 34
          },
          "endLoc": {
            "col": 1,
            "line": 76
          },
          "startBody": {
            "col": 43,
            "line": 34
          },
          "endBody": {
            "col": 1,
            "line": 76
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Rearrange Columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Columns can be rearranged by drag and dropping, as long as you respond to the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onColumnMoved"
        }), " callback."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RearrangeColumns = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60);
  const [sortableCols, setSortableCols] = react__WEBPACK_IMPORTED_MODULE_0__.useState(cols);
  const onColMoved = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((startIndex, endIndex) => {
    setSortableCols(old => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);
      return newCols;
    });
  }, []);
  const onColProposeMove = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((_startIndex, endIndex) => {
    return endIndex !== 3;
  }, []);
  const getCellContentMangled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(_ref => {
    let [col, row] = _ref;
    const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);
    return getCellContent([remappedCol, row]);
  }, [cols, getCellContent, sortableCols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    freezeColumns: 1,
    rowMarkers: "both",
    getCellContent: getCellContentMangled,
    onColumnProposeMove: onColProposeMove,
    columns: sortableCols,
    onColumnMoved: onColMoved,
    columnSelectionBlending: "mixed",
    rangeSelectionBlending: "mixed",
    rows: 1000
  });
};
RearrangeColumns.displayName = "RearrangeColumns";;const __namedExportsOrder = ["RearrangeColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-rearrange-columns-stories.362a2e8d.iframe.bundle.js.map