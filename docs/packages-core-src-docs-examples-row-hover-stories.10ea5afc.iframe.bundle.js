"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9863],{

/***/ "./packages/core/src/docs/examples/row-hover.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowHover": () => (/* binding */ RowHover),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GetRowThemeCallback } from \"../../internal/data-grid/render/data-grid-render.cells.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GridMouseEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row Hover Effect\"\n                    description={\n                        <Description>\n                            Through careful usage of the <PropName>onItemHovered</PropName> callback it is possible to\n                            easily create a row hover effect.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RowHover: React.VFC = () => {\n    const { cols, getCellContent } = useAllMockedKinds();\n\n    const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);\n\n    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {\n        const [_, row] = args.location;\n        setHoverRow(args.kind !== \"cell\" ? undefined : row);\n    }, []);\n\n    const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(\n        row => {\n            if (row !== hoverRow) return undefined;\n            return {\n                bgCell: \"#f7f7f7\",\n                bgCellMedium: \"#f0f0f0\",\n            };\n        },\n        [hoverRow]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            onItemHovered={onItemHovered}\n            getCellContent={getCellContent}\n            getRowThemeOverride={getRowThemeOverride}\n            columns={cols}\n            rows={300}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "RowHover": {
    "startLoc": {
      "col": 35,
      "line": 35
    },
    "endLoc": {
      "col": 1,
      "line": 67
    },
    "startBody": {
      "col": 35,
      "line": 35
    },
    "endBody": {
      "col": 1,
      "line": 67
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GetRowThemeCallback } from \"../../internal/data-grid/render/data-grid-render.cells.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GridMouseEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row Hover Effect\"\n                    description={\n                        <Description>\n                            Through careful usage of the <PropName>onItemHovered</PropName> callback it is possible to\n                            easily create a row hover effect.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RowHover: React.VFC = () => {\n    const { cols, getCellContent } = useAllMockedKinds();\n\n    const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);\n\n    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {\n        const [_, row] = args.location;\n        setHoverRow(args.kind !== \"cell\" ? undefined : row);\n    }, []);\n\n    const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(\n        row => {\n            if (row !== hoverRow) return undefined;\n            return {\n                bgCell: \"#f7f7f7\",\n                bgCellMedium: \"#f0f0f0\",\n            };\n        },\n        [hoverRow]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            onItemHovered={onItemHovered}\n            getCellContent={getCellContent}\n            getRowThemeOverride={getRowThemeOverride}\n            columns={cols}\n            rows={300}\n        />\n    );\n};\n",
      "locationsMap": {
        "row-hover": {
          "startLoc": {
            "col": 35,
            "line": 35
          },
          "endLoc": {
            "col": 1,
            "line": 67
          },
          "startBody": {
            "col": 35,
            "line": 35
          },
          "endBody": {
            "col": 1,
            "line": 67
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Row Hover Effect",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Through careful usage of the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onItemHovered"
        }), " callback it is possible to easily create a row hover effect."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RowHover = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const [hoverRow, setHoverRow] = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined);
  const onItemHovered = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(args => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== "cell" ? undefined : row);
  }, []);
  const getRowThemeOverride = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(row => {
    if (row !== hoverRow) return undefined;
    return {
      bgCell: "#f7f7f7",
      bgCellMedium: "#f0f0f0"
    };
  }, [hoverRow]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "both",
    onItemHovered: onItemHovered,
    getCellContent: getCellContent,
    getRowThemeOverride: getRowThemeOverride,
    columns: cols,
    rows: 300
  });
};
RowHover.displayName = "RowHover";;const __namedExportsOrder = ["RowHover"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-row-hover-stories.10ea5afc.iframe.bundle.js.map