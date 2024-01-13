"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[5307],{

/***/ "./packages/core/src/docs/examples/custom-header.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomDrawing": () => (/* binding */ CustomDrawing),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { DrawCellCallback, DrawHeaderCallback } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Custom Drawing\"\n                    description={<Description>You can draw over or under most objects in the grid.</Description>}>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomDrawing: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);\n\n    const drawHeader: DrawHeaderCallback = React.useCallback((args, draw) => {\n        const { ctx, rect } = args;\n        ctx.beginPath();\n        ctx.rect(rect.x, rect.y, rect.width, rect.height);\n        const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);\n        lg.addColorStop(0, \"#ff00d934\");\n        lg.addColorStop(1, \"#00a2ff34\");\n        ctx.fillStyle = lg;\n        ctx.fill();\n        draw(); // draw at end to draw under the header\n    }, []);\n\n    const drawCell: DrawCellCallback = React.useCallback((args, draw) => {\n        draw(); // draw up front to draw over the cell\n        const { ctx, rect } = args;\n\n        const size = 7;\n\n        ctx.beginPath();\n        ctx.moveTo(rect.x + rect.width - size, rect.y + 1);\n        ctx.lineTo(rect.x + rect.width, rect.y + size + 1);\n        ctx.lineTo(rect.x + rect.width, rect.y + 1);\n        ctx.closePath();\n\n        ctx.save();\n        ctx.fillStyle = \"#ff0000\";\n        ctx.fill();\n        ctx.restore();\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            drawHeader={drawHeader}\n            drawCell={drawCell}\n            rows={3000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "CustomDrawing": {
    "startLoc": {
      "col": 40,
      "line": 23
    },
    "endLoc": {
      "col": 1,
      "line": 67
    },
    "startBody": {
      "col": 40,
      "line": 23
    },
    "endBody": {
      "col": 1,
      "line": 67
    }
  }
};





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport type { DrawCellCallback, DrawHeaderCallback } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Custom Drawing\"\n                    description={<Description>You can draw over or under most objects in the grid.</Description>}>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomDrawing: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);\n\n    const drawHeader: DrawHeaderCallback = React.useCallback((args, draw) => {\n        const { ctx, rect } = args;\n        ctx.beginPath();\n        ctx.rect(rect.x, rect.y, rect.width, rect.height);\n        const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);\n        lg.addColorStop(0, \"#ff00d934\");\n        lg.addColorStop(1, \"#00a2ff34\");\n        ctx.fillStyle = lg;\n        ctx.fill();\n        draw(); // draw at end to draw under the header\n    }, []);\n\n    const drawCell: DrawCellCallback = React.useCallback((args, draw) => {\n        draw(); // draw up front to draw over the cell\n        const { ctx, rect } = args;\n\n        const size = 7;\n\n        ctx.beginPath();\n        ctx.moveTo(rect.x + rect.width - size, rect.y + 1);\n        ctx.lineTo(rect.x + rect.width, rect.y + size + 1);\n        ctx.lineTo(rect.x + rect.width, rect.y + 1);\n        ctx.closePath();\n\n        ctx.save();\n        ctx.fillStyle = \"#ff0000\";\n        ctx.fill();\n        ctx.restore();\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={cols}\n            drawHeader={drawHeader}\n            drawCell={drawCell}\n            rows={3000}\n            rowMarkers=\"both\"\n        />\n    );\n};\n",
      "locationsMap": {
        "custom-drawing": {
          "startLoc": {
            "col": 40,
            "line": 23
          },
          "endLoc": {
            "col": 1,
            "line": 67
          },
          "startBody": {
            "col": 40,
            "line": 23
          },
          "endBody": {
            "col": 1,
            "line": 67
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Custom Drawing",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "You can draw over or under most objects in the grid."
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const CustomDrawing = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(1000, true, true);
  const drawHeader = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((args, draw) => {
    const {
      ctx,
      rect
    } = args;
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);
    lg.addColorStop(0, "#ff00d934");
    lg.addColorStop(1, "#00a2ff34");
    ctx.fillStyle = lg;
    ctx.fill();
    draw();
  }, []);
  const drawCell = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((args, draw) => {
    draw();
    const {
      ctx,
      rect
    } = args;
    const size = 7;
    ctx.beginPath();
    ctx.moveTo(rect.x + rect.width - size, rect.y + 1);
    ctx.lineTo(rect.x + rect.width, rect.y + size + 1);
    ctx.lineTo(rect.x + rect.width, rect.y + 1);
    ctx.closePath();
    ctx.save();
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.restore();
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: cols,
    drawHeader: drawHeader,
    drawCell: drawCell,
    rows: 3000,
    rowMarkers: "both"
  });
};
CustomDrawing.displayName = "CustomDrawing";;const __namedExportsOrder = ["CustomDrawing"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-custom-header-stories.ac3025bd.iframe.bundle.js.map