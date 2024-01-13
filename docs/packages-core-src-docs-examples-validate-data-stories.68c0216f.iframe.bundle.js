"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4206],{

/***/ "./packages/core/src/docs/examples/validate-data.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateData": () => (/* binding */ ValidateData),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Validate data\"\n                    description={\n                        <>\n                            <Description>\n                                Data can be validated using the <PropName>validateCell</PropName> callback\n                            </Description>\n                            <MoreInfo>This example only allows the word &quot;Valid&quot; inside text cells.</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ValidateData: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            onCellEdited={setCellValue}\n            rows={100}\n            validateCell={(_cell, newValue) => {\n                if (newValue.kind !== GridCellKind.Text) return true;\n                if (newValue.data === \"Valid\") return true;\n                if (newValue.data.toLowerCase() === \"valid\") {\n                    return {\n                        ...newValue,\n                        data: \"Valid\",\n                        selectionRange: [0, 3],\n                    };\n                }\n                return false;\n            }}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ValidateData": {
    "startLoc": {
      "col": 39,
      "line": 37
    },
    "endLoc": {
      "col": 1,
      "line": 63
    },
    "startBody": {
      "col": 39,
      "line": 37
    },
    "endBody": {
      "col": 1,
      "line": 63
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Validate data\"\n                    description={\n                        <>\n                            <Description>\n                                Data can be validated using the <PropName>validateCell</PropName> callback\n                            </Description>\n                            <MoreInfo>This example only allows the word &quot;Valid&quot; inside text cells.</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ValidateData: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true}\n            onCellEdited={setCellValue}\n            rows={100}\n            validateCell={(_cell, newValue) => {\n                if (newValue.kind !== GridCellKind.Text) return true;\n                if (newValue.data === \"Valid\") return true;\n                if (newValue.data.toLowerCase() === \"valid\") {\n                    return {\n                        ...newValue,\n                        data: \"Valid\",\n                        selectionRange: [0, 3],\n                    };\n                }\n                return false;\n            }}\n        />\n    );\n};\n",
      "locationsMap": {
        "validate-data": {
          "startLoc": {
            "col": 39,
            "line": 37
          },
          "endLoc": {
            "col": 1,
            "line": 63
          },
          "startBody": {
            "col": 39,
            "line": 37
          },
          "endBody": {
            "col": 1,
            "line": 63
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Validate data",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Data can be validated using the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "validateCell"
          }), " callback"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "This example only allows the word \"Valid\" inside text cells."
        })]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const ValidateData = () => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    onPaste: true,
    onCellEdited: setCellValue,
    rows: 100,
    validateCell: (_cell, newValue) => {
      if (newValue.kind !== _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text) return true;
      if (newValue.data === "Valid") return true;
      if (newValue.data.toLowerCase() === "valid") {
        return {
          ...newValue,
          data: "Valid",
          selectionRange: [0, 3]
        };
      }
      return false;
    }
  });
};
ValidateData.displayName = "ValidateData";;const __namedExportsOrder = ["ValidateData"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-validate-data-stories.68c0216f.iframe.bundle.js.map