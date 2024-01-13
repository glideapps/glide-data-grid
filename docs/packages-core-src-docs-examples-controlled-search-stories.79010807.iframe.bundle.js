"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4303],{

/***/ "./packages/core/src/docs/examples/controlled-search.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlledSearch": () => (/* binding */ ControlledSearch),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/common/utils.tsx");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { useEventListener } from \"../../common/utils.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection, Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Controlling search results\"\n                    description={\n                        <>\n                            <Description>\n                                Search results can be controlled via <PropName>searchResults</PropName>. You can\n                                implement any search algorithm you want, even a silly one.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ControlledSearch: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [showSearch, setShowSearch] = React.useState(false);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    useEventListener(\n        \"keydown\",\n        React.useCallback(event => {\n            if ((event.ctrlKey || event.metaKey) && event.code === \"KeyF\") {\n                setShowSearch(cv => !cv);\n                event.stopPropagation();\n                event.preventDefault();\n            }\n        }, []),\n        window,\n        false,\n        true\n    );\n\n    const [searchValue, setSearchValue] = React.useState(\"\");\n\n    const searchResults = React.useMemo(() => {\n        const result: Item[] = [];\n        for (let i = 0; i < searchValue.length; i++) {\n            result.push([3, i]);\n        }\n        return result;\n    }, [searchValue.length]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            searchResults={searchResults}\n            getCellContent={getCellContent}\n            getCellsForSelection={true}\n            gridSelection={selection}\n            onGridSelectionChange={setSelection}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            searchValue={searchValue}\n            onSearchValueChange={setSearchValue}\n            showSearch={showSearch}\n            onSearchClose={() => {\n                setShowSearch(false);\n                setSearchValue(\"\");\n            }}\n            rows={10_000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ControlledSearch": {
    "startLoc": {
      "col": 43,
      "line": 38
    },
    "endLoc": {
      "col": 1,
      "line": 93
    },
    "startBody": {
      "col": 43,
      "line": 38
    },
    "endBody": {
      "col": 1,
      "line": 93
    }
  }
};









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { useEventListener } from \"../../common/utils.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection, Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Controlling search results\"\n                    description={\n                        <>\n                            <Description>\n                                Search results can be controlled via <PropName>searchResults</PropName>. You can\n                                implement any search algorithm you want, even a silly one.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ControlledSearch: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [showSearch, setShowSearch] = React.useState(false);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    useEventListener(\n        \"keydown\",\n        React.useCallback(event => {\n            if ((event.ctrlKey || event.metaKey) && event.code === \"KeyF\") {\n                setShowSearch(cv => !cv);\n                event.stopPropagation();\n                event.preventDefault();\n            }\n        }, []),\n        window,\n        false,\n        true\n    );\n\n    const [searchValue, setSearchValue] = React.useState(\"\");\n\n    const searchResults = React.useMemo(() => {\n        const result: Item[] = [];\n        for (let i = 0; i < searchValue.length; i++) {\n            result.push([3, i]);\n        }\n        return result;\n    }, [searchValue.length]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            searchResults={searchResults}\n            getCellContent={getCellContent}\n            getCellsForSelection={true}\n            gridSelection={selection}\n            onGridSelectionChange={setSelection}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            searchValue={searchValue}\n            onSearchValueChange={setSearchValue}\n            showSearch={showSearch}\n            onSearchClose={() => {\n                setShowSearch(false);\n                setSearchValue(\"\");\n            }}\n            rows={10_000}\n        />\n    );\n};\n",
      "locationsMap": {
        "controlled-search": {
          "startLoc": {
            "col": 43,
            "line": 38
          },
          "endLoc": {
            "col": 1,
            "line": 93
          },
          "startBody": {
            "col": 43,
            "line": 38
          },
          "endBody": {
            "col": 1,
            "line": 93
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Controlling search results",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Search results can be controlled via ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "searchResults"
          }), ". You can implement any search algorithm you want, even a silly one."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ControlledSearch = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const [showSearch, setShowSearch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [selection, setSelection] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .useEventListener */ .OR)("keydown", react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if ((event.ctrlKey || event.metaKey) && event.code === "KeyF") {
      setShowSearch(cv => !cv);
      event.stopPropagation();
      event.preventDefault();
    }
  }, []), window, false, true);
  const [searchValue, setSearchValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  const searchResults = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const result = [];
    for (let i = 0; i < searchValue.length; i++) {
      result.push([3, i]);
    }
    return result;
  }, [searchValue.length]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    searchResults: searchResults,
    getCellContent: getCellContent,
    getCellsForSelection: true,
    gridSelection: selection,
    onGridSelectionChange: setSelection,
    columns: cols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    searchValue: searchValue,
    onSearchValueChange: setSearchValue,
    showSearch: showSearch,
    onSearchClose: () => {
      setShowSearch(false);
      setSearchValue("");
    },
    rows: 10000
  });
};
ControlledSearch.displayName = "ControlledSearch";;const __namedExportsOrder = ["ControlledSearch"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-controlled-search-stories.79010807.iframe.bundle.js.map