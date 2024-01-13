"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[392],{

/***/ "./packages/core/src/docs/examples/automatic-row-markers.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutomaticRowMarkers": () => (/* binding */ AutomaticRowMarkers),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AutomaticRowMarkers: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const dataEditor = (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"checkbox-visible\"}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Automatic Row Markers\"\n            description={\n                <>\n                    <Description>\n                        You can enable row markers with rich selection behavior using the{\" \"}\n                        <PropName>rowMarkers</PropName> prop.\n                    </Description>\n                    <MoreInfo>\n                        Use <KeyName>⇧</KeyName> + click to make range selections, and <KeyName>Ctrl</KeyName> (\n                        <KeyName>⌘</KeyName> on Mac) + click to add/remove individual rows.\n                    </MoreInfo>\n                </>\n            }>\n            {dataEditor}\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "AutomaticRowMarkers": {
    "startLoc": {
      "col": 46,
      "line": 26
    },
    "endLoc": {
      "col": 1,
      "line": 57
    },
    "startBody": {
      "col": 46,
      "line": 26
    },
    "endBody": {
      "col": 1,
      "line": 57
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const AutomaticRowMarkers: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const dataEditor = (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers={\"checkbox-visible\"}\n            getCellContent={getCellContent}\n            columns={cols}\n            rows={1000}\n        />\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Automatic Row Markers\"\n            description={\n                <>\n                    <Description>\n                        You can enable row markers with rich selection behavior using the{\" \"}\n                        <PropName>rowMarkers</PropName> prop.\n                    </Description>\n                    <MoreInfo>\n                        Use <KeyName>⇧</KeyName> + click to make range selections, and <KeyName>Ctrl</KeyName> (\n                        <KeyName>⌘</KeyName> on Mac) + click to add/remove individual rows.\n                    </MoreInfo>\n                </>\n            }>\n            {dataEditor}\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "automatic-row-markers": {
          "startLoc": {
            "col": 46,
            "line": 26
          },
          "endLoc": {
            "col": 1,
            "line": 57
          },
          "startBody": {
            "col": 46,
            "line": 26
          },
          "endBody": {
            "col": 1,
            "line": 57
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
const AutomaticRowMarkers = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  const dataEditor = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "checkbox-visible",
    getCellContent: getCellContent,
    columns: cols,
    rows: 1000
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Automatic Row Markers",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can enable row markers with rich selection behavior using the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "rowMarkers"
        }), " prop."]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["Use ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: "\u21E7"
        }), " + click to make range selections, and ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: "Ctrl"
        }), " (", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: "\u2318"
        }), " on Mac) + click to add/remove individual rows."]
      })]
    }),
    children: dataEditor
  });
};
AutomaticRowMarkers.displayName = "AutomaticRowMarkers";;const __namedExportsOrder = ["AutomaticRowMarkers"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-automatic-row-markers-stories.732fde2d.iframe.bundle.js.map