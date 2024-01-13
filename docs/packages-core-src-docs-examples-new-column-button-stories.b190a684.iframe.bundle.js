"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8968],{

/***/ "./packages/core/src/docs/examples/new-column-button.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewColumnButton": () => (/* binding */ NewColumnButton),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    ColumnAddButton,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"New column button\"\n                    description={\n                        <Description>\n                            A new column button can be created using the <PropName>rightElement</PropName>.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const NewColumnButton: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(10, true);\n\n    const columns = React.useMemo(() => cols.map(c => ({ ...c, grow: 1 })), [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rightElement={\n                <ColumnAddButton>\n                    <button onClick={() => window.alert(\"Add a column!\")}>+</button>\n                </ColumnAddButton>\n            }\n            rightElementProps={{\n                fill: false,\n                sticky: false,\n            }}\n            rows={3000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "NewColumnButton": {
    "startLoc": {
      "col": 42,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 56
    },
    "startBody": {
      "col": 42,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 56
    }
  }
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n    ColumnAddButton,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"New column button\"\n                    description={\n                        <Description>\n                            A new column button can be created using the <PropName>rightElement</PropName>.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const NewColumnButton: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(10, true);\n\n    const columns = React.useMemo(() => cols.map(c => ({ ...c, grow: 1 })), [cols]);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={columns}\n            rightElement={\n                <ColumnAddButton>\n                    <button onClick={() => window.alert(\"Add a column!\")}>+</button>\n                </ColumnAddButton>\n            }\n            rightElementProps={{\n                fill: false,\n                sticky: false,\n            }}\n            rows={3000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "new-column-button": {
          "startLoc": {
            "col": 42,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 56
          },
          "startBody": {
            "col": 42,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 56
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "New column button",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["A new column button can be created using the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "rightElement"
        }), "."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const NewColumnButton = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(10, true);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => cols.map(c => ({
    ...c,
    grow: 1
  })), [cols]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: columns,
    rightElement: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .ColumnAddButton */ .YE, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        onClick: () => window.alert("Add a column!"),
        children: "+"
      })
    }),
    rightElementProps: {
      fill: false,
      sticky: false
    },
    rows: 3000,
    rowMarkers: "both"
  });
};
NewColumnButton.displayName = "NewColumnButton";;const __namedExportsOrder = ["NewColumnButton"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-new-column-button-stories.b190a684.iframe.bundle.js.map