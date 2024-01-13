"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[5012],{

/***/ "./packages/core/src/docs/examples/scroll-shadows.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollShadows": () => (/* binding */ ScrollShadows),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Scroll Shadows\"\n                    description={\n                        <>\n                            <Description>\n                                You can enable and disable the horizontal/vertical scroll shadows.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ScrollShadows: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    const onSelectionChange = React.useCallback((newSel: GridSelection) => {\n        let newRows = CompactSelection.empty();\n        if (newSel.current !== undefined) {\n            newRows = newRows.add([newSel.current.range.y, newSel.current.range.y + newSel.current.range.height]);\n        }\n        for (const b of newSel.current?.rangeStack ?? []) {\n            newRows = newRows.add([b.y, b.y + b.height]);\n        }\n        setSelection({\n            ...newSel,\n            rows: newRows,\n        });\n    }, []);\n\n    const theme = React.useMemo<Partial<Theme>>(\n        () => ({\n            accentLight: \"#b1f6ff\",\n            horizontalBorderColor: \"transparent\",\n            headerBottomBorderColor: \"rgba(115, 116, 131, 0.16)\",\n        }),\n        []\n    );\n\n    const getRowThemeOverride = React.useCallback(row => (row % 2 === 0 ? undefined : { bgCell: \"#f5f5f6\" }), []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"number\"}\n            gridSelection={selection}\n            onGridSelectionChange={onSelectionChange}\n            fixedShadowX={false}\n            headerHeight={26}\n            drawFocusRing={false}\n            rowHeight={22}\n            fixedShadowY={false}\n            getRowThemeOverride={getRowThemeOverride}\n            verticalBorder={false}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n            theme={theme}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ScrollShadows": {
    "startLoc": {
      "col": 40,
      "line": 31
    },
    "endLoc": {
      "col": 1,
      "line": 83
    },
    "startBody": {
      "col": 40,
      "line": 31
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
      "source": "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { GridSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { CompactSelection } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Scroll Shadows\"\n                    description={\n                        <>\n                            <Description>\n                                You can enable and disable the horizontal/vertical scroll shadows.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ScrollShadows: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const [selection, setSelection] = React.useState<GridSelection>({\n        rows: CompactSelection.empty(),\n        columns: CompactSelection.empty(),\n    });\n\n    const onSelectionChange = React.useCallback((newSel: GridSelection) => {\n        let newRows = CompactSelection.empty();\n        if (newSel.current !== undefined) {\n            newRows = newRows.add([newSel.current.range.y, newSel.current.range.y + newSel.current.range.height]);\n        }\n        for (const b of newSel.current?.rangeStack ?? []) {\n            newRows = newRows.add([b.y, b.y + b.height]);\n        }\n        setSelection({\n            ...newSel,\n            rows: newRows,\n        });\n    }, []);\n\n    const theme = React.useMemo<Partial<Theme>>(\n        () => ({\n            accentLight: \"#b1f6ff\",\n            horizontalBorderColor: \"transparent\",\n            headerBottomBorderColor: \"rgba(115, 116, 131, 0.16)\",\n        }),\n        []\n    );\n\n    const getRowThemeOverride = React.useCallback(row => (row % 2 === 0 ? undefined : { bgCell: \"#f5f5f6\" }), []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"number\"}\n            gridSelection={selection}\n            onGridSelectionChange={onSelectionChange}\n            fixedShadowX={false}\n            headerHeight={26}\n            drawFocusRing={false}\n            rowHeight={22}\n            fixedShadowY={false}\n            getRowThemeOverride={getRowThemeOverride}\n            verticalBorder={false}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n            theme={theme}\n        />\n    );\n};\n",
      "locationsMap": {
        "scroll-shadows": {
          "startLoc": {
            "col": 40,
            "line": 31
          },
          "endLoc": {
            "col": 1,
            "line": 83
          },
          "startBody": {
            "col": 40,
            "line": 31
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
      title: "Scroll Shadows",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "You can enable and disable the horizontal/vertical scroll shadows."
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ScrollShadows = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  const [selection, setSelection] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    rows: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty(),
    columns: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty()
  });
  const onSelectionChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newSel => {
    let newRows = _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .CompactSelection.empty */ .EV.empty();
    if (newSel.current !== undefined) {
      newRows = newRows.add([newSel.current.range.y, newSel.current.range.y + newSel.current.range.height]);
    }
    for (const b of (_newSel$current$range = (_newSel$current = newSel.current) === null || _newSel$current === void 0 ? void 0 : _newSel$current.rangeStack) !== null && _newSel$current$range !== void 0 ? _newSel$current$range : []) {
      var _newSel$current$range, _newSel$current;
      newRows = newRows.add([b.y, b.y + b.height]);
    }
    setSelection({
      ...newSel,
      rows: newRows
    });
  }, []);
  const theme = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    accentLight: "#b1f6ff",
    horizontalBorderColor: "transparent",
    headerBottomBorderColor: "rgba(115, 116, 131, 0.16)"
  }), []);
  const getRowThemeOverride = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(row => row % 2 === 0 ? undefined : {
    bgCell: "#f5f5f6"
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "number",
    gridSelection: selection,
    onGridSelectionChange: onSelectionChange,
    fixedShadowX: false,
    headerHeight: 26,
    drawFocusRing: false,
    rowHeight: 22,
    fixedShadowY: false,
    getRowThemeOverride: getRowThemeOverride,
    verticalBorder: false,
    getCellContent: getCellContent,
    columns: cols,
    rows: 1000,
    theme: theme
  });
};
ScrollShadows.displayName = "ScrollShadows";;const __namedExportsOrder = ["ScrollShadows"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-scroll-shadows-stories.78243043.iframe.bundle.js.map