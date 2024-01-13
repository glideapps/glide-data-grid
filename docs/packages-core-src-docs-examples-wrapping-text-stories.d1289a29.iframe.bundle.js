"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[5518],{

/***/ "./packages/core/src/docs/examples/wrapping-text.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WrappingText": () => (/* binding */ WrappingText),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var lodash_range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/range.js");
/* harmony import */ var lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_range_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _faker_js_faker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport range from \"lodash/range.js\";\nimport { faker } from \"@faker-js/faker\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Wrapping Text\"\n                    description={\n                        <Description>\n                            Text cells can have wrapping text by setting the <PropName>allowWrapping</PropName> prop to\n                            true.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const WrappingText: React.VFC<{\n    alignment: \"left\" | \"center\" | \"right\";\n    length: number;\n    hyperWrapping: boolean;\n}> = p => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(6);\n\n    const suffix = React.useMemo(() => {\n        return range(0, 100).map(() => faker.lorem.sentence(p.length));\n    }, [p.length]);\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        i => {\n            const [col, row] = i;\n\n            if (col === 0) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: true,\n                    displayData: `${row},\\n${suffix[row % suffix.length]}`,\n                    data: `${row}, \\n${suffix}`,\n                    allowWrapping: true,\n                    contentAlign: p.alignment,\n                };\n            }\n            return getCellContent(i);\n        },\n        [getCellContent, p.alignment, suffix]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={80}\n            getCellContent={mangledGetCellContent}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n            experimental={{\n                hyperWrapping: p.hyperWrapping,\n            }}\n        />\n    );\n};\n(WrappingText as any).args = {\n    alignment: \"left\",\n    length: 20,\n    hyperWrapping: false,\n};\n(WrappingText as any).argTypes = {\n    alignment: {\n        control: { type: \"select\" },\n        options: [\"left\", \"center\", \"right\"],\n    },\n    length: {\n        control: {\n            type: \"range\",\n            min: 2,\n            max: 200,\n        },\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "WrappingText": {
    "startLoc": {
      "col": 5,
      "line": 40
    },
    "endLoc": {
      "col": 1,
      "line": 79
    },
    "startBody": {
      "col": 5,
      "line": 40
    },
    "endBody": {
      "col": 1,
      "line": 79
    }
  }
};









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport range from \"lodash/range.js\";\nimport { faker } from \"@faker-js/faker\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Wrapping Text\"\n                    description={\n                        <Description>\n                            Text cells can have wrapping text by setting the <PropName>allowWrapping</PropName> prop to\n                            true.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const WrappingText: React.VFC<{\n    alignment: \"left\" | \"center\" | \"right\";\n    length: number;\n    hyperWrapping: boolean;\n}> = p => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(6);\n\n    const suffix = React.useMemo(() => {\n        return range(0, 100).map(() => faker.lorem.sentence(p.length));\n    }, [p.length]);\n\n    const mangledGetCellContent = React.useCallback<typeof getCellContent>(\n        i => {\n            const [col, row] = i;\n\n            if (col === 0) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: true,\n                    displayData: `${row},\\n${suffix[row % suffix.length]}`,\n                    data: `${row}, \\n${suffix}`,\n                    allowWrapping: true,\n                    contentAlign: p.alignment,\n                };\n            }\n            return getCellContent(i);\n        },\n        [getCellContent, p.alignment, suffix]\n    );\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            rowHeight={80}\n            getCellContent={mangledGetCellContent}\n            columns={cols}\n            rows={1000}\n            onColumnResize={onColumnResize}\n            experimental={{\n                hyperWrapping: p.hyperWrapping,\n            }}\n        />\n    );\n};\n(WrappingText as any).args = {\n    alignment: \"left\",\n    length: 20,\n    hyperWrapping: false,\n};\n(WrappingText as any).argTypes = {\n    alignment: {\n        control: { type: \"select\" },\n        options: [\"left\", \"center\", \"right\"],\n    },\n    length: {\n        control: {\n            type: \"range\",\n            min: 2,\n            max: 200,\n        },\n    },\n};\n",
      "locationsMap": {
        "wrapping-text": {
          "startLoc": {
            "col": 5,
            "line": 40
          },
          "endLoc": {
            "col": 1,
            "line": 79
          },
          "startBody": {
            "col": 5,
            "line": 40
          },
          "endBody": {
            "col": 1,
            "line": 79
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .BeautifulWrapper */ .m, {
      title: "Wrapping Text",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .Description */ .dk, {
        children: ["Text cells can have wrapping text by setting the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .PropName */ .Gi, {
          children: "allowWrapping"
        }), " prop to true."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Story, {})
    })
  })]
});
const WrappingText = p => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .useMockDataGenerator */ .F9)(6);
  const suffix = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return lodash_range_js__WEBPACK_IMPORTED_MODULE_1___default()(0, 100).map(() => _faker_js_faker__WEBPACK_IMPORTED_MODULE_2__/* .faker.lorem.sentence */ .We.lorem.sentence(p.length));
  }, [p.length]);
  const mangledGetCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(i => {
    const [col, row] = i;
    if (col === 0) {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_6__/* .GridCellKind.Text */ .p6.Text,
        allowOverlay: true,
        displayData: `${row},\n${suffix[row % suffix.length]}`,
        data: `${row}, \n${suffix}`,
        allowWrapping: true,
        contentAlign: p.alignment
      };
    }
    return getCellContent(i);
  }, [getCellContent, p.alignment, suffix]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_7__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .defaultProps */ .lG,
    rowHeight: 80,
    getCellContent: mangledGetCellContent,
    columns: cols,
    rows: 1000,
    onColumnResize: onColumnResize,
    experimental: {
      hyperWrapping: p.hyperWrapping
    }
  });
};
WrappingText.displayName = "WrappingText";
WrappingText.args = {
  alignment: "left",
  length: 20,
  hyperWrapping: false
};
WrappingText.argTypes = {
  alignment: {
    control: {
      type: "select"
    },
    options: ["left", "center", "right"]
  },
  length: {
    control: {
      type: "range",
      min: 2,
      max: 200
    }
  }
};;const __namedExportsOrder = ["WrappingText"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-wrapping-text-stories.d1289a29.iframe.bundle.js.map