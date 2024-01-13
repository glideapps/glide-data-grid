"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8145],{

/***/ "./packages/core/src/docs/examples/multi-select-columns.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiSelectColumns": () => (/* binding */ MultiSelectColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Multi select columns\"\n                    description={\n                        <>\n                            <Description>\n                                You can select multiple columns by using the <PropName>selectedColumns</PropName> and{\" \"}\n                                <PropName>onSelectedColumnsChange</PropName> props\n                            </Description>\n                            <MoreInfo>\n                                Here you can multi select columns by using <KeyName>Ctrl</KeyName> (on Windows) or{\" \"}\n                                <KeyName>⌘</KeyName> (on Mac)\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const MultiSelectColumns: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor {...defaultProps} getCellContent={getCellContent} rowMarkers=\"both\" columns={cols} rows={100_000} />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "MultiSelectColumns": {
    "startLoc": {
      "col": 45,
      "line": 41
    },
    "endLoc": {
      "col": 1,
      "line": 47
    },
    "startBody": {
      "col": 45,
      "line": 41
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
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Multi select columns\"\n                    description={\n                        <>\n                            <Description>\n                                You can select multiple columns by using the <PropName>selectedColumns</PropName> and{\" \"}\n                                <PropName>onSelectedColumnsChange</PropName> props\n                            </Description>\n                            <MoreInfo>\n                                Here you can multi select columns by using <KeyName>Ctrl</KeyName> (on Windows) or{\" \"}\n                                <KeyName>⌘</KeyName> (on Mac)\n                            </MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const MultiSelectColumns: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    return (\n        <DataEditor {...defaultProps} getCellContent={getCellContent} rowMarkers=\"both\" columns={cols} rows={100_000} />\n    );\n};\n",
      "locationsMap": {
        "multi-select-columns": {
          "startLoc": {
            "col": 45,
            "line": 41
          },
          "endLoc": {
            "col": 1,
            "line": 47
          },
          "startBody": {
            "col": 45,
            "line": 41
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
      title: "Multi select columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["You can select multiple columns by using the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "selectedColumns"
          }), " and", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "onSelectedColumnsChange"
          }), " props"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: ["Here you can multi select columns by using ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "Ctrl"
          }), " (on Windows) or", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
            children: "\u2318"
          }), " (on Mac)"]
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const MultiSelectColumns = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    rowMarkers: "both",
    columns: cols,
    rows: 100000
  });
};
MultiSelectColumns.displayName = "MultiSelectColumns";;const __namedExportsOrder = ["MultiSelectColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-multi-select-columns-stories.246cecd0.iframe.bundle.js.map