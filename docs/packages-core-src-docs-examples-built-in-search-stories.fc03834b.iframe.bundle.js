"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4545],{

/***/ "./packages/core/src/docs/examples/built-in-search.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuiltInSearch": () => (/* binding */ BuiltInSearch),
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
var __STORY__ = "import React from \"react\";\nimport { useEventListener } from \"../../common/utils.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    KeyName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Search is easy\"\n                    description={\n                        <>\n                            <Description>\n                                Search for any data in your grid by setting <PropName>showSearch</PropName>.\n                            </Description>\n                            <MoreInfo>\n                                In this story, <KeyName>Ctrl</KeyName> (<KeyName>⌘</KeyName> on Mac) +{\" \"}\n                                <KeyName>f</KeyName> toggles the search bar. Make sure you&apos;re focused on the Data\n                                Grid!\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const BuiltInSearch: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [showSearch, setShowSearch] = React.useState(false);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    useEventListener(\n        \"keydown\",\n        React.useCallback(event => {\n            if ((event.ctrlKey || event.metaKey) && event.code === \"KeyF\") {\n                setShowSearch(cv => !cv);\n                event.stopPropagation();\n                event.preventDefault();\n            }\n        }, []),\n        window,\n        false,\n        true\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            getCellsForSelection={true}\n            gridSelection={selection}\n            onGridSelectionChange={setSelection}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            showSearch={showSearch}\n            onSearchClose={() => setShowSearch(false)}\n            rows={10_000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "BuiltInSearch": {
    "startLoc": {
      "col": 40,
      "line": 44
    },
    "endLoc": {
      "col": 1,
      "line": 83
    },
    "startBody": {
      "col": 40,
      "line": 44
    },
    "endBody": {
      "col": 1,
      "line": 83
    }
  }
};









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { useEventListener } from \"../../common/utils.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    KeyName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Search is easy\"\n                    description={\n                        <>\n                            <Description>\n                                Search for any data in your grid by setting <PropName>showSearch</PropName>.\n                            </Description>\n                            <MoreInfo>\n                                In this story, <KeyName>Ctrl</KeyName> (<KeyName>⌘</KeyName> on Mac) +{\" \"}\n                                <KeyName>f</KeyName> toggles the search bar. Make sure you&apos;re focused on the Data\n                                Grid!\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const BuiltInSearch: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [showSearch, setShowSearch] = React.useState(false);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    useEventListener(\n        \"keydown\",\n        React.useCallback(event => {\n            if ((event.ctrlKey || event.metaKey) && event.code === \"KeyF\") {\n                setShowSearch(cv => !cv);\n                event.stopPropagation();\n                event.preventDefault();\n            }\n        }, []),\n        window,\n        false,\n        true\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            getCellsForSelection={true}\n            gridSelection={selection}\n            onGridSelectionChange={setSelection}\n            columns={cols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            showSearch={showSearch}\n            onSearchClose={() => setShowSearch(false)}\n            rows={10_000}\n        />\n    );\n};\n",
      "locationsMap": {
        "built-in-search": {
          "startLoc": {
            "col": 40,
            "line": 44
          },
          "endLoc": {
            "col": 1,
            "line": 83
          },
          "startBody": {
            "col": 40,
            "line": 44
          },
          "endBody": {
            "col": 1,
            "line": 83
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Search is easy",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Search for any data in your grid by setting ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "showSearch"
          }), "."]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["In this story, ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "Ctrl"
          }), " (", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "\u2318"
          }), " on Mac) +", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "f"
          }), " toggles the search bar. Make sure you're focused on the Data Grid!"]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const BuiltInSearch = () => {
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
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    getCellsForSelection: true,
    gridSelection: selection,
    onGridSelectionChange: setSelection,
    columns: cols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    showSearch: showSearch,
    onSearchClose: () => setShowSearch(false),
    rows: 10000
  });
};
BuiltInSearch.displayName = "BuiltInSearch";;const __namedExportsOrder = ["BuiltInSearch"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-built-in-search-stories.fc03834b.iframe.bundle.js.map