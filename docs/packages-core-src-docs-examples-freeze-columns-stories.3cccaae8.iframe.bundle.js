"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1124],{

/***/ "./packages/core/src/docs/examples/freeze-columns.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FreezeColumns": () => (/* binding */ FreezeColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Freeze columns\"\n                    description={\n                        <Description>\n                            Columns at the start of your grid can be frozen in place by settings{\" \"}\n                            <PropName>freezeColumns</PropName> to a number greater than 0.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FreezeColumns: React.VFC<any> = (p: { freezeColumns: number }) => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            freezeColumns={p.freezeColumns}\n            getCellContent={getCellContent}\n            columns={cols}\n            verticalBorder={c => c > 0}\n            rows={1000}\n        />\n    );\n};\n(FreezeColumns as any).argTypes = {\n    freezeColumns: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 10,\n        },\n    },\n};\n(FreezeColumns as any).args = {\n    freezeColumns: 1,\n};\n";
var __LOCATIONS_MAP__ = {
  "FreezeColumns": {
    "startLoc": {
      "col": 45,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 47
    },
    "startBody": {
      "col": 45,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 47
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Freeze columns\"\n                    description={\n                        <Description>\n                            Columns at the start of your grid can be frozen in place by settings{\" \"}\n                            <PropName>freezeColumns</PropName> to a number greater than 0.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const FreezeColumns: React.VFC<any> = (p: { freezeColumns: number }) => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"both\"\n            freezeColumns={p.freezeColumns}\n            getCellContent={getCellContent}\n            columns={cols}\n            verticalBorder={c => c > 0}\n            rows={1000}\n        />\n    );\n};\n(FreezeColumns as any).argTypes = {\n    freezeColumns: {\n        control: {\n            type: \"range\",\n            min: 0,\n            max: 10,\n        },\n    },\n};\n(FreezeColumns as any).args = {\n    freezeColumns: 1,\n};\n",
      "locationsMap": {
        "freeze-columns": {
          "startLoc": {
            "col": 45,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 47
          },
          "startBody": {
            "col": 45,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 47
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Freeze columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Columns at the start of your grid can be frozen in place by settings", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "freezeColumns"
        }), " to a number greater than 0."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const FreezeColumns = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "both",
    freezeColumns: p.freezeColumns,
    getCellContent: getCellContent,
    columns: cols,
    verticalBorder: c => c > 0,
    rows: 1000
  });
};
FreezeColumns.displayName = "FreezeColumns";
FreezeColumns.argTypes = {
  freezeColumns: {
    control: {
      type: "range",
      min: 0,
      max: 10
    }
  }
};
FreezeColumns.args = {
  freezeColumns: 1
};;const __namedExportsOrder = ["FreezeColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-freeze-columns-stories.3cccaae8.iframe.bundle.js.map