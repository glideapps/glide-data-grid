"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[6338],{

/***/ "./packages/core/src/docs/examples/stretch-column-size.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StretchColumnSize": () => (/* binding */ StretchColumnSize),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Column Grow\"\n                    description={\n                        <Description>\n                            Columns in the data grid may be set to grow to fill space by setting the{\" \"}\n                            <PropName>grow</PropName> prop.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const StretchColumnSize: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(5, true, true);\n\n    const hasResized = React.useRef(new Set<number>());\n\n    const columns = React.useMemo(() => {\n        return cols.map((x, i) => ({ ...x, grow: hasResized.current.has(i) ? undefined : (5 + i) / 5 }));\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rows={1000}\n            onColumnResize={(col, _newSize, colIndex, newSizeWithGrow) => {\n                hasResized.current.add(colIndex);\n                onColumnResize(col, newSizeWithGrow);\n            }}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "StretchColumnSize": {
    "startLoc": {
      "col": 44,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 55
    },
    "startBody": {
      "col": 44,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 55
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Column Grow\"\n                    description={\n                        <Description>\n                            Columns in the data grid may be set to grow to fill space by setting the{\" \"}\n                            <PropName>grow</PropName> prop.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const StretchColumnSize: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(5, true, true);\n\n    const hasResized = React.useRef(new Set<number>());\n\n    const columns = React.useMemo(() => {\n        return cols.map((x, i) => ({ ...x, grow: hasResized.current.has(i) ? undefined : (5 + i) / 5 }));\n    }, [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rows={1000}\n            onColumnResize={(col, _newSize, colIndex, newSizeWithGrow) => {\n                hasResized.current.add(colIndex);\n                onColumnResize(col, newSizeWithGrow);\n            }}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "stretch-column-size": {
          "startLoc": {
            "col": 44,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 55
          },
          "startBody": {
            "col": 44,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 55
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Column Grow",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Columns in the data grid may be set to grow to fill space by setting the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "grow"
        }), " prop."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const StretchColumnSize = () => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(5, true, true);
  const hasResized = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new Set());
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return cols.map((x, i) => ({
      ...x,
      grow: hasResized.current.has(i) ? undefined : (5 + i) / 5
    }));
  }, [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: columns,
    rows: 1000,
    onColumnResize: (col, _newSize, colIndex, newSizeWithGrow) => {
      hasResized.current.add(colIndex);
      onColumnResize(col, newSizeWithGrow);
    },
    rowMarkers: "both"
  });
};
StretchColumnSize.displayName = "StretchColumnSize";;const __namedExportsOrder = ["StretchColumnSize"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-stretch-column-size-stories.62569f75.iframe.bundle.js.map