"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[3142],{

/***/ "./packages/core/src/docs/examples/right-to-left.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightToLeft": () => (/* binding */ RightToLeft),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Right \"\n                    description={\n                        <>\n                            <Description>\n                                The data editor automatically detects RTL in text cells and respects it.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RightToLeft: React.VFC = () => {\n    const { cols, getCellContent, setCellValue, onColumnResize } = useMockDataGenerator(60, false);\n\n    const getCellContentMangled = React.useCallback<typeof getCellContent>(\n        item => {\n            const [col, _row] = item;\n            if (col !== 0) return getCellContent(item);\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: \"אני גדעון, מומחה לאפליקציות גלייד.\",\n                displayData: \"אני גדעון, מומחה לאפליקציות גלייד.\",\n                allowWrapping: true,\n            };\n        },\n        [getCellContent]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContentMangled}\n            columns={cols}\n            onColumnResize={onColumnResize}\n            getCellsForSelection={true}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            onCellEdited={setCellValue}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "RightToLeft": {
    "startLoc": {
      "col": 38,
      "line": 29
    },
    "endLoc": {
      "col": 1,
      "line": 60
    },
    "startBody": {
      "col": 38,
      "line": 29
    },
    "endBody": {
      "col": 1,
      "line": 60
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Right \"\n                    description={\n                        <>\n                            <Description>\n                                The data editor automatically detects RTL in text cells and respects it.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const RightToLeft: React.VFC = () => {\n    const { cols, getCellContent, setCellValue, onColumnResize } = useMockDataGenerator(60, false);\n\n    const getCellContentMangled = React.useCallback<typeof getCellContent>(\n        item => {\n            const [col, _row] = item;\n            if (col !== 0) return getCellContent(item);\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: \"אני גדעון, מומחה לאפליקציות גלייד.\",\n                displayData: \"אני גדעון, מומחה לאפליקציות גלייד.\",\n                allowWrapping: true,\n            };\n        },\n        [getCellContent]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContentMangled}\n            columns={cols}\n            onColumnResize={onColumnResize}\n            getCellsForSelection={true}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            onCellEdited={setCellValue}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "right-to-left": {
          "startLoc": {
            "col": 38,
            "line": 29
          },
          "endLoc": {
            "col": 1,
            "line": 60
          },
          "startBody": {
            "col": 38,
            "line": 29
          },
          "endBody": {
            "col": 1,
            "line": 60
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Right ",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "The data editor automatically detects RTL in text cells and respects it."
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RightToLeft = () => {
  const {
    cols,
    getCellContent,
    setCellValue,
    onColumnResize
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  const getCellContentMangled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(item => {
    const [col, _row] = item;
    if (col !== 0) return getCellContent(item);
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      data: "אני גדעון, מומחה לאפליקציות גלייד.",
      displayData: "אני גדעון, מומחה לאפליקציות גלייד.",
      allowWrapping: true
    };
  }, [getCellContent]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContentMangled,
    columns: cols,
    onColumnResize: onColumnResize,
    getCellsForSelection: true,
    rowMarkers: "both",
    onPaste: true,
    onCellEdited: setCellValue,
    rows: 1000
  });
};
RightToLeft.displayName = "RightToLeft";;const __namedExportsOrder = ["RightToLeft"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-right-to-left-stories.1fe7b3d8.iframe.bundle.js.map