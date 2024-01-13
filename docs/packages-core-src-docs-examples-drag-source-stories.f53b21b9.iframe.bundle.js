"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[217],{

/***/ "./packages/core/src/docs/examples/drag-source.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DragSource": () => (/* binding */ DragSource),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Drag source\"\n                    description={\n                        <>\n                            <Description>\n                                Setting the <PropName>isDraggable</PropName> prop can allow for more granular control\n                                over what is draggable in the grid via HTML drag and drop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const DragSource: React.VFC<{ isDraggable: boolean | \"header\" | \"cell\" }> = p => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(200);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            rows={5000}\n            onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}\n            onColumnMoved={(s, e) => window.alert(`Moved col ${s} to ${e}`)}\n            onColumnResize={onColumnResize}\n            isDraggable={p.isDraggable}\n            onDragStart={e => {\n                e.setData(\"text/plain\", \"Drag data here!\");\n            }}\n        />\n    );\n};\n(DragSource as any).argTypes = {\n    isDraggable: {\n        control: { type: \"select\" },\n        options: [true, false, \"cell\", \"header\"],\n    },\n};\n(DragSource as any).args = {\n    isDraggable: false,\n};\n";
var __LOCATIONS_MAP__ = {
  "DragSource": {
    "startLoc": {
      "col": 83,
      "line": 35
    },
    "endLoc": {
      "col": 1,
      "line": 54
    },
    "startBody": {
      "col": 83,
      "line": 35
    },
    "endBody": {
      "col": 1,
      "line": 54
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Drag source\"\n                    description={\n                        <>\n                            <Description>\n                                Setting the <PropName>isDraggable</PropName> prop can allow for more granular control\n                                over what is draggable in the grid via HTML drag and drop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const DragSource: React.VFC<{ isDraggable: boolean | \"header\" | \"cell\" }> = p => {\n    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(200);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            rowMarkers=\"both\"\n            rows={5000}\n            onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}\n            onColumnMoved={(s, e) => window.alert(`Moved col ${s} to ${e}`)}\n            onColumnResize={onColumnResize}\n            isDraggable={p.isDraggable}\n            onDragStart={e => {\n                e.setData(\"text/plain\", \"Drag data here!\");\n            }}\n        />\n    );\n};\n(DragSource as any).argTypes = {\n    isDraggable: {\n        control: { type: \"select\" },\n        options: [true, false, \"cell\", \"header\"],\n    },\n};\n(DragSource as any).args = {\n    isDraggable: false,\n};\n",
      "locationsMap": {
        "drag-source": {
          "startLoc": {
            "col": 83,
            "line": 35
          },
          "endLoc": {
            "col": 1,
            "line": 54
          },
          "startBody": {
            "col": 83,
            "line": 35
          },
          "endBody": {
            "col": 1,
            "line": 54
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Drag source",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["Setting the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "isDraggable"
          }), " prop can allow for more granular control over what is draggable in the grid via HTML drag and drop."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const DragSource = p => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(200);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    rowMarkers: "both",
    rows: 5000,
    onRowMoved: (s, e) => window.alert(`Moved row ${s} to ${e}`),
    onColumnMoved: (s, e) => window.alert(`Moved col ${s} to ${e}`),
    onColumnResize: onColumnResize,
    isDraggable: p.isDraggable,
    onDragStart: e => {
      e.setData("text/plain", "Drag data here!");
    }
  });
};
DragSource.displayName = "DragSource";
DragSource.argTypes = {
  isDraggable: {
    control: {
      type: "select"
    },
    options: [true, false, "cell", "header"]
  }
};
DragSource.args = {
  isDraggable: false
};;const __namedExportsOrder = ["DragSource"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-drag-source-stories.f53b21b9.iframe.bundle.js.map