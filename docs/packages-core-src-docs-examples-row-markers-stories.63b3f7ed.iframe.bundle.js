"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2672],{

/***/ "./packages/core/src/docs/examples/row-markers.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowMarkers": () => (/* binding */ RowMarkers),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row markers\"\n                    description={\n                        <>\n                            <Description>\n                                Row Markers can be controlled by setting the <PropName>rowMarkers</PropName> prop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface RowMarkersProps {\n    markers: DataEditorProps[\"rowMarkers\"];\n}\n\nexport const RowMarkers: React.VFC<RowMarkersProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(10, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers={p.markers}\n            columns={cols}\n            rows={400}\n        />\n    );\n};\n(RowMarkers as any).args = {\n    markers: \"both\",\n};\n(RowMarkers as any).argTypes = {\n    markers: {\n        control: { type: \"select\" },\n        options: [\"both\", \"checkbox\", \"number\", \"none\", \"clickable-number\"],\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "RowMarkers": {
    "startLoc": {
      "col": 54,
      "line": 39
    },
    "endLoc": {
      "col": 1,
      "line": 51
    },
    "startBody": {
      "col": 54,
      "line": 39
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
      "source": "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Row markers\"\n                    description={\n                        <>\n                            <Description>\n                                Row Markers can be controlled by setting the <PropName>rowMarkers</PropName> prop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface RowMarkersProps {\n    markers: DataEditorProps[\"rowMarkers\"];\n}\n\nexport const RowMarkers: React.VFC<RowMarkersProps> = p => {\n    const { cols, getCellContent } = useMockDataGenerator(10, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            rowMarkers={p.markers}\n            columns={cols}\n            rows={400}\n        />\n    );\n};\n(RowMarkers as any).args = {\n    markers: \"both\",\n};\n(RowMarkers as any).argTypes = {\n    markers: {\n        control: { type: \"select\" },\n        options: [\"both\", \"checkbox\", \"number\", \"none\", \"clickable-number\"],\n    },\n};\n",
      "locationsMap": {
        "row-markers": {
          "startLoc": {
            "col": 54,
            "line": 39
          },
          "endLoc": {
            "col": 1,
            "line": 51
          },
          "startBody": {
            "col": 54,
            "line": 39
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
      title: "Row markers",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Row Markers can be controlled by setting the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "rowMarkers"
          }), " prop."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const RowMarkers = p => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(10, false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    rowMarkers: p.markers,
    columns: cols,
    rows: 400
  });
};
RowMarkers.displayName = "RowMarkers";
RowMarkers.args = {
  markers: "both"
};
RowMarkers.argTypes = {
  markers: {
    control: {
      type: "select"
    },
    options: ["both", "checkbox", "number", "none", "clickable-number"]
  }
};;const __namedExportsOrder = ["RowMarkers"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-row-markers-stories.63b3f7ed.iframe.bundle.js.map