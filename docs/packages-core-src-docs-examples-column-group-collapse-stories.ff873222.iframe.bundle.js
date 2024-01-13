"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4855],{

/***/ "./packages/core/src/docs/examples/column-group-collapse.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnGroupCollapse": () => (/* binding */ ColumnGroupCollapse),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GroupHeaderClickedEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Group collapse\"\n                    description={\n                        <>\n                            <Description>\n                                Through clever usage of <PropName>onGroupHeaderClicked</PropName> you can implement\n                                group collapsing. This is a very basic version however it is possible to go much\n                                further.\n                            </Description>\n                            <MoreInfo>\n                                Cells under a certain size will not attempt to render to save some frames.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nfunction useCollapsableColumnGroups(cols: readonly GridColumn[]) {\n    const [collapsed, setCollapsed] = React.useState<readonly string[]>([]);\n\n    const onGroupHeaderClicked = React.useCallback(\n        (colIndex: number, args: GroupHeaderClickedEventArgs) => {\n            const group = cols[colIndex].group ?? \"\";\n            setCollapsed(cv => (cv.includes(group) ? cv.filter(g => g !== group) : [...cv, group]));\n            args.preventDefault();\n        },\n        [cols]\n    );\n\n    const [selectedColumns, setSelectedColumns] = React.useState<CompactSelection>(CompactSelection.empty());\n\n    const setCols = React.useCallback((newVal: CompactSelection, trigger: string) => {\n        if (trigger === \"group\") return;\n\n        setSelectedColumns(newVal);\n    }, []);\n\n    const columns = React.useMemo(() => {\n        return cols.map(c => {\n            if (!collapsed.includes(c.group ?? \"\"))\n                return {\n                    ...c,\n                    hasMenu: true,\n                };\n            return {\n                ...c,\n                width: 8,\n                hasMenu: true,\n            };\n        });\n    }, [collapsed, cols]);\n\n    return {\n        columns,\n        onGroupHeaderClicked,\n        selectedColumns,\n        onSelectedColumnsChange: setCols,\n    };\n}\n\nexport const ColumnGroupCollapse: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100, true, true);\n\n    const groupHeaderArgs = useCollapsableColumnGroups(cols);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            {...groupHeaderArgs}\n            getCellContent={getCellContent}\n            groupHeaderHeight={24}\n            rows={1000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ColumnGroupCollapse": {
    "startLoc": {
      "col": 46,
      "line": 86
    },
    "endLoc": {
      "col": 1,
      "line": 101
    },
    "startBody": {
      "col": 46,
      "line": 86
    },
    "endBody": {
      "col": 1,
      "line": 101
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridColumn } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GroupHeaderClickedEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Group collapse\"\n                    description={\n                        <>\n                            <Description>\n                                Through clever usage of <PropName>onGroupHeaderClicked</PropName> you can implement\n                                group collapsing. This is a very basic version however it is possible to go much\n                                further.\n                            </Description>\n                            <MoreInfo>\n                                Cells under a certain size will not attempt to render to save some frames.\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nfunction useCollapsableColumnGroups(cols: readonly GridColumn[]) {\n    const [collapsed, setCollapsed] = React.useState<readonly string[]>([]);\n\n    const onGroupHeaderClicked = React.useCallback(\n        (colIndex: number, args: GroupHeaderClickedEventArgs) => {\n            const group = cols[colIndex].group ?? \"\";\n            setCollapsed(cv => (cv.includes(group) ? cv.filter(g => g !== group) : [...cv, group]));\n            args.preventDefault();\n        },\n        [cols]\n    );\n\n    const [selectedColumns, setSelectedColumns] = React.useState<CompactSelection>(CompactSelection.empty());\n\n    const setCols = React.useCallback((newVal: CompactSelection, trigger: string) => {\n        if (trigger === \"group\") return;\n\n        setSelectedColumns(newVal);\n    }, []);\n\n    const columns = React.useMemo(() => {\n        return cols.map(c => {\n            if (!collapsed.includes(c.group ?? \"\"))\n                return {\n                    ...c,\n                    hasMenu: true,\n                };\n            return {\n                ...c,\n                width: 8,\n                hasMenu: true,\n            };\n        });\n    }, [collapsed, cols]);\n\n    return {\n        columns,\n        onGroupHeaderClicked,\n        selectedColumns,\n        onSelectedColumnsChange: setCols,\n    };\n}\n\nexport const ColumnGroupCollapse: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100, true, true);\n\n    const groupHeaderArgs = useCollapsableColumnGroups(cols);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            {...groupHeaderArgs}\n            getCellContent={getCellContent}\n            groupHeaderHeight={24}\n            rows={1000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "column-group-collapse": {
          "startLoc": {
            "col": 46,
            "line": 86
          },
          "endLoc": {
            "col": 1,
            "line": 101
          },
          "startBody": {
            "col": 46,
            "line": 86
          },
          "endBody": {
            "col": 1,
            "line": 101
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Group collapse",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Through clever usage of ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "onGroupHeaderClicked"
          }), " you can implement group collapsing. This is a very basic version however it is possible to go much further."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "Cells under a certain size will not attempt to render to save some frames."
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
function useCollapsableColumnGroups(cols) {
  const [collapsed, setCollapsed] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  const onGroupHeaderClicked = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((colIndex, args) => {
    var _cols$colIndex$group;
    const group = (_cols$colIndex$group = cols[colIndex].group) !== null && _cols$colIndex$group !== void 0 ? _cols$colIndex$group : "";
    setCollapsed(cv => cv.includes(group) ? cv.filter(g => g !== group) : [...cv, group]);
    args.preventDefault();
  }, [cols]);
  const [selectedColumns, setSelectedColumns] = react__WEBPACK_IMPORTED_MODULE_0__.useState(_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty());
  const setCols = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newVal, trigger) => {
    if (trigger === "group") return;
    setSelectedColumns(newVal);
  }, []);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return cols.map(c => {
      var _c$group;
      if (!collapsed.includes((_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "")) return {
        ...c,
        hasMenu: true
      };
      return {
        ...c,
        width: 8,
        hasMenu: true
      };
    });
  }, [collapsed, cols]);
  return {
    columns,
    onGroupHeaderClicked,
    selectedColumns,
    onSelectedColumnsChange: setCols
  };
}
const ColumnGroupCollapse = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100, true, true);
  const groupHeaderArgs = useCollapsableColumnGroups(cols);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    ...groupHeaderArgs,
    getCellContent: getCellContent,
    groupHeaderHeight: 24,
    rows: 1000,
    rowMarkers: "both"
  });
};
ColumnGroupCollapse.displayName = "ColumnGroupCollapse";;const __namedExportsOrder = ["ColumnGroupCollapse"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-column-group-collapse-stories.ff873222.iframe.bundle.js.map