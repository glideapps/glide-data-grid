"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7027],{

/***/ "./packages/core/src/docs/examples/controlled-selection.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlledSelection": () => (/* binding */ ControlledSelection),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ControlledSelection: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(30, true, true);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    return (\n        <BeautifulWrapper\n            title=\"Controlled Selection\"\n            description={\n                <Description>\n                    The selection of the grid can be controlled via <PropName>GridSelection</PropName> and{\" \"}\n                    <PropName>onGridSelectionChange</PropName>.\n                    <input\n                        type=\"range\"\n                        min={0}\n                        max={29}\n                        value={selection.current?.cell[0] ?? 0}\n                        onChange={e => {\n                            const newCol = e.target.valueAsNumber;\n                            setSelection(cv => ({\n                                ...cv,\n                                current: {\n                                    cell: [newCol, cv.current?.cell[1] ?? 0],\n                                    range: {\n                                        x: newCol,\n                                        y: cv.current?.cell[1] ?? 0,\n                                        width: 1,\n                                        height: 1,\n                                    },\n                                    rangeStack: [],\n                                },\n                            }));\n                        }}\n                    />\n                    <input\n                        type=\"range\"\n                        min={0}\n                        max={99}\n                        value={selection.current?.cell[1] ?? 0}\n                        onChange={e => {\n                            const newRow = e.target.valueAsNumber;\n                            setSelection(cv => ({\n                                ...cv,\n                                current: {\n                                    cell: [cv.current?.cell[0] ?? 0, newRow],\n                                    range: {\n                                        x: cv.current?.cell[0] ?? 0,\n                                        y: newRow,\n                                        width: 1,\n                                        height: 1,\n                                    },\n                                    rangeStack: [],\n                                },\n                            }));\n                        }}\n                    />\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                gridSelection={selection}\n                onGridSelectionChange={setSelection}\n                columns={cols}\n                rows={100}\n                rowMarkers=\"both\"\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ControlledSelection": {
    "startLoc": {
      "col": 46,
      "line": 26
    },
    "endLoc": {
      "col": 1,
      "line": 98
    },
    "startBody": {
      "col": 46,
      "line": 26
    },
    "endBody": {
      "col": 1,
      "line": 98
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ControlledSelection: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(30, true, true);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        columns: CompactSelection.empty(),\n        rows: CompactSelection.empty(),\n    });\n\n    return (\n        <BeautifulWrapper\n            title=\"Controlled Selection\"\n            description={\n                <Description>\n                    The selection of the grid can be controlled via <PropName>GridSelection</PropName> and{\" \"}\n                    <PropName>onGridSelectionChange</PropName>.\n                    <input\n                        type=\"range\"\n                        min={0}\n                        max={29}\n                        value={selection.current?.cell[0] ?? 0}\n                        onChange={e => {\n                            const newCol = e.target.valueAsNumber;\n                            setSelection(cv => ({\n                                ...cv,\n                                current: {\n                                    cell: [newCol, cv.current?.cell[1] ?? 0],\n                                    range: {\n                                        x: newCol,\n                                        y: cv.current?.cell[1] ?? 0,\n                                        width: 1,\n                                        height: 1,\n                                    },\n                                    rangeStack: [],\n                                },\n                            }));\n                        }}\n                    />\n                    <input\n                        type=\"range\"\n                        min={0}\n                        max={99}\n                        value={selection.current?.cell[1] ?? 0}\n                        onChange={e => {\n                            const newRow = e.target.valueAsNumber;\n                            setSelection(cv => ({\n                                ...cv,\n                                current: {\n                                    cell: [cv.current?.cell[0] ?? 0, newRow],\n                                    range: {\n                                        x: cv.current?.cell[0] ?? 0,\n                                        y: newRow,\n                                        width: 1,\n                                        height: 1,\n                                    },\n                                    rangeStack: [],\n                                },\n                            }));\n                        }}\n                    />\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                gridSelection={selection}\n                onGridSelectionChange={setSelection}\n                columns={cols}\n                rows={100}\n                rowMarkers=\"both\"\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "controlled-selection": {
          "startLoc": {
            "col": 46,
            "line": 26
          },
          "endLoc": {
            "col": 1,
            "line": 98
          },
          "startBody": {
            "col": 46,
            "line": 26
          },
          "endBody": {
            "col": 1,
            "line": 98
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
const ControlledSelection = () => {
  var _selection$current$ce, _selection$current, _selection$current$ce2, _selection$current2;
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(30, true, true);
  const [selection, setSelection] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Controlled Selection",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
      children: ["The selection of the grid can be controlled via ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
        children: "GridSelection"
      }), " and", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
        children: "onGridSelectionChange"
      }), ".", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "range",
        min: 0,
        max: 29,
        value: (_selection$current$ce = (_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell[0]) !== null && _selection$current$ce !== void 0 ? _selection$current$ce : 0,
        onChange: e => {
          const newCol = e.target.valueAsNumber;
          setSelection(cv => {
            var _cv$current$cell$, _cv$current, _cv$current$cell$2, _cv$current2;
            return {
              ...cv,
              current: {
                cell: [newCol, (_cv$current$cell$ = (_cv$current = cv.current) === null || _cv$current === void 0 ? void 0 : _cv$current.cell[1]) !== null && _cv$current$cell$ !== void 0 ? _cv$current$cell$ : 0],
                range: {
                  x: newCol,
                  y: (_cv$current$cell$2 = (_cv$current2 = cv.current) === null || _cv$current2 === void 0 ? void 0 : _cv$current2.cell[1]) !== null && _cv$current$cell$2 !== void 0 ? _cv$current$cell$2 : 0,
                  width: 1,
                  height: 1
                },
                rangeStack: []
              }
            };
          });
        }
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "range",
        min: 0,
        max: 99,
        value: (_selection$current$ce2 = (_selection$current2 = selection.current) === null || _selection$current2 === void 0 ? void 0 : _selection$current2.cell[1]) !== null && _selection$current$ce2 !== void 0 ? _selection$current$ce2 : 0,
        onChange: e => {
          const newRow = e.target.valueAsNumber;
          setSelection(cv => {
            var _cv$current$cell$3, _cv$current3, _cv$current$cell$4, _cv$current4;
            return {
              ...cv,
              current: {
                cell: [(_cv$current$cell$3 = (_cv$current3 = cv.current) === null || _cv$current3 === void 0 ? void 0 : _cv$current3.cell[0]) !== null && _cv$current$cell$3 !== void 0 ? _cv$current$cell$3 : 0, newRow],
                range: {
                  x: (_cv$current$cell$4 = (_cv$current4 = cv.current) === null || _cv$current4 === void 0 ? void 0 : _cv$current4.cell[0]) !== null && _cv$current$cell$4 !== void 0 ? _cv$current$cell$4 : 0,
                  y: newRow,
                  width: 1,
                  height: 1
                },
                rangeStack: []
              }
            };
          });
        }
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      gridSelection: selection,
      onGridSelectionChange: setSelection,
      columns: cols,
      rows: 100,
      rowMarkers: "both"
    })
  });
};
ControlledSelection.displayName = "ControlledSelection";;const __namedExportsOrder = ["ControlledSelection"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-controlled-selection-stories.d49109f1.iframe.bundle.js.map