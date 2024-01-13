"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8623],{

/***/ "./packages/core/src/docs/examples/column-groups.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnGroups": () => (/* binding */ ColumnGroups),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridColumnIcon } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Column Grouping\"\n                    description={\n                        <Description>\n                            Columns in the data grid may be grouped by setting their <PropName>group</PropName>{\" \"}\n                            property.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ColumnGroups: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(20, true, true);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            onGroupHeaderRenamed={(x, y) => window.alert(`Please rename group ${x} to ${y}`)}\n            columns={cols}\n            rows={1000}\n            getGroupDetails={g => ({\n                name: g,\n                icon: g === \"\" ? undefined : GridColumnIcon.HeaderCode,\n            })}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ColumnGroups": {
    "startLoc": {
      "col": 39,
      "line": 34
    },
    "endLoc": {
      "col": 1,
      "line": 51
    },
    "startBody": {
      "col": 39,
      "line": 34
    },
    "endBody": {
      "col": 1,
      "line": 51
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridColumnIcon } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Column Grouping\"\n                    description={\n                        <Description>\n                            Columns in the data grid may be grouped by setting their <PropName>group</PropName>{\" \"}\n                            property.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ColumnGroups: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(20, true, true);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            onGroupHeaderRenamed={(x, y) => window.alert(`Please rename group ${x} to ${y}`)}\n            columns={cols}\n            rows={1000}\n            getGroupDetails={g => ({\n                name: g,\n                icon: g === \"\" ? undefined : GridColumnIcon.HeaderCode,\n            })}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "column-groups": {
          "startLoc": {
            "col": 39,
            "line": 34
          },
          "endLoc": {
            "col": 1,
            "line": 51
          },
          "startBody": {
            "col": 39,
            "line": 34
          },
          "endBody": {
            "col": 1,
            "line": 51
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Column Grouping",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Columns in the data grid may be grouped by setting their ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "group"
        }), " ", "property."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ColumnGroups = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(20, true, true);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    onGroupHeaderRenamed: (x, y) => window.alert(`Please rename group ${x} to ${y}`),
    columns: cols,
    rows: 1000,
    getGroupDetails: g => ({
      name: g,
      icon: g === "" ? undefined : _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderCode */ .PE.HeaderCode
    }),
    rowMarkers: "both"
  });
};
ColumnGroups.displayName = "ColumnGroups";;const __namedExportsOrder = ["ColumnGroups"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-column-groups-stories.9d7562bd.iframe.bundle.js.map