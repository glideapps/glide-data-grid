"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7991],{

/***/ "./packages/core/src/docs/examples/add-column.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddColumns": () => (/* binding */ AddColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add and remove columns\"\n                    description={\n                        <>\n                            <Description>You can add and remove columns at your disposal</Description>\n                            <MoreInfo>Use the story&apos;s controls to change the number of columns</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface AddColumnsProps {\n    columnsCount: number;\n}\n\nexport const AddColumns: React.FC<AddColumnsProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(p.columnsCount);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"number\"\n            getCellContent={getCellContent}\n            experimental={{ strict: true }}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(AddColumns as any).args = {\n    columnsCount: 10,\n};\n(AddColumns as any).argTypes = {\n    columnsCount: {\n        control: {\n            type: \"range\",\n            min: 2,\n            max: 200,\n        },\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "AddColumns": {
    "startLoc": {
      "col": 53,
      "line": 37
    },
    "endLoc": {
      "col": 1,
      "line": 50
    },
    "startBody": {
      "col": 53,
      "line": 37
    },
    "endBody": {
      "col": 1,
      "line": 50
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Add and remove columns\"\n                    description={\n                        <>\n                            <Description>You can add and remove columns at your disposal</Description>\n                            <MoreInfo>Use the story&apos;s controls to change the number of columns</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface AddColumnsProps {\n    columnsCount: number;\n}\n\nexport const AddColumns: React.FC<AddColumnsProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(p.columnsCount);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowMarkers=\"number\"\n            getCellContent={getCellContent}\n            experimental={{ strict: true }}\n            columns={cols}\n            rows={10_000}\n        />\n    );\n};\n(AddColumns as any).args = {\n    columnsCount: 10,\n};\n(AddColumns as any).argTypes = {\n    columnsCount: {\n        control: {\n            type: \"range\",\n            min: 2,\n            max: 200,\n        },\n    },\n};\n",
      "locationsMap": {
        "add-columns": {
          "startLoc": {
            "col": 53,
            "line": 37
          },
          "endLoc": {
            "col": 1,
            "line": 50
          },
          "startBody": {
            "col": 53,
            "line": 37
          },
          "endBody": {
            "col": 1,
            "line": 50
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Add and remove columns",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "You can add and remove columns at your disposal"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "Use the story's controls to change the number of columns"
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const AddColumns = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(p.columnsCount);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    rowMarkers: "number",
    getCellContent: getCellContent,
    experimental: {
      strict: true
    },
    columns: cols,
    rows: 10000
  });
};
AddColumns.displayName = "AddColumns";
AddColumns.args = {
  columnsCount: 10
};
AddColumns.argTypes = {
  columnsCount: {
    control: {
      type: "range",
      min: 2,
      max: 200
    }
  }
};;const __namedExportsOrder = ["AddColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-add-column-stories.fe78e764.iframe.bundle.js.map