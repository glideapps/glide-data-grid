"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1669],{

/***/ "./packages/core/src/docs/examples/obscured-grid.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObscuredDataGrid": () => (/* binding */ ObscuredDataGrid),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "/* eslint-disable no-console */\nimport React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Obscured Data Grid\"\n                    description={\n                        <>\n                            <Description>The data grid should respect being obscured by other elements</Description>\n                            <MoreInfo>This is mostly a test area because its hard to test with unit tests.</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                    <div\n                        style={{\n                            position: \"absolute\",\n                            top: 0,\n                            left: \"50%\",\n                            width: \"50%\",\n                            height: \"100%\",\n                            background: \"rgba(0,0,0,0.5)\",\n                            zIndex: 100,\n                        }}\n                    />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ObscuredDataGrid: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            onItemHovered={x => console.log(\"onItemHovered\", x)}\n            onCellClicked={x => console.log(\"onCellClicked\", x)}\n            onHeaderClicked={x => console.log(\"onHeaderClicked\", x)}\n            onCellContextMenu={x => console.log(\"onCellContextMenu\", x)}\n            onHeaderContextMenu={x => console.log(\"onHeaderContextMenu\", x)}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={10_000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ObscuredDataGrid": {
    "startLoc": {
      "col": 43,
      "line": 45
    },
    "endLoc": {
      "col": 1,
      "line": 70
    },
    "startBody": {
      "col": 43,
      "line": 45
    },
    "endBody": {
      "col": 1,
      "line": 70
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "\nimport React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Obscured Data Grid\"\n                    description={\n                        <>\n                            <Description>The data grid should respect being obscured by other elements</Description>\n                            <MoreInfo>This is mostly a test area because its hard to test with unit tests.</MoreInfo>\n                        </>\n                    }>\n                    <Story />\n                    <div\n                        style={{\n                            position: \"absolute\",\n                            top: 0,\n                            left: \"50%\",\n                            width: \"50%\",\n                            height: \"100%\",\n                            background: \"rgba(0,0,0,0.5)\",\n                            zIndex: 100,\n                        }}\n                    />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ObscuredDataGrid: React.VFC = () => {\n    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            onItemHovered={x => console.log(\"onItemHovered\", x)}\n            onCellClicked={x => console.log(\"onCellClicked\", x)}\n            onHeaderClicked={x => console.log(\"onHeaderClicked\", x)}\n            onCellContextMenu={x => console.log(\"onCellContextMenu\", x)}\n            onHeaderContextMenu={x => console.log(\"onHeaderContextMenu\", x)}\n            columns={cols}\n            rowMarkers={\"both\"}\n            onPaste={true} // we want to allow paste to just call onCellEdited\n            onCellEdited={setCellValue} // Sets the mock cell content\n            trailingRowOptions={{\n                // How to get the trailing row to look right\n                sticky: true,\n                tint: true,\n                hint: \"New row...\",\n            }}\n            rows={10_000}\n        />\n    );\n};\n",
      "locationsMap": {
        "obscured-data-grid": {
          "startLoc": {
            "col": 43,
            "line": 45
          },
          "endLoc": {
            "col": 1,
            "line": 70
          },
          "startBody": {
            "col": 43,
            "line": 45
          },
          "endBody": {
            "col": 1,
            "line": 70
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Obscured Data Grid",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: "The data grid should respect being obscured by other elements"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "This is mostly a test area because its hard to test with unit tests."
        })]
      }),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        style: {
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: 100
        }
      })]
    })
  })]
});
const ObscuredDataGrid = () => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(60, false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    onItemHovered: x => console.log("onItemHovered", x),
    onCellClicked: x => console.log("onCellClicked", x),
    onHeaderClicked: x => console.log("onHeaderClicked", x),
    onCellContextMenu: x => console.log("onCellContextMenu", x),
    onHeaderContextMenu: x => console.log("onHeaderContextMenu", x),
    columns: cols,
    rowMarkers: "both",
    onPaste: true,
    onCellEdited: setCellValue,
    trailingRowOptions: {
      sticky: true,
      tint: true,
      hint: "New row..."
    },
    rows: 10000
  });
};
ObscuredDataGrid.displayName = "ObscuredDataGrid";;const __namedExportsOrder = ["ObscuredDataGrid"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-obscured-grid-stories.3ed9022d.iframe.bundle.js.map