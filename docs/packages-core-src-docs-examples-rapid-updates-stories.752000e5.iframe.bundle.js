"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7563],{

/***/ "./packages/core/src/docs/examples/rapid-updates.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RapidUpdates": () => (/* binding */ RapidUpdates),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { DataEditorAll } from \"../../data-editor-all.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nlet num: number = 1;\nfunction rand(): number {\n    return (num = (num * 16_807) % 2_147_483_647);\n}\n\nexport const RapidUpdates: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw } = useMockDataGenerator(100);\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const countRef = React.useRef(0);\n    const displayCountRef = React.useRef<HTMLElement>(null);\n\n    React.useEffect(() => {\n        let rafID = 0;\n\n        const sendUpdate = () => {\n            const cells: {\n                cell: Item;\n            }[] = [];\n            const now = performance.now();\n            for (let x = 0; x < 5000; x++) {\n                const col = Math.max(10, rand() % 100);\n                const row = rand() % 10_000;\n\n                setCellValueRaw([col, row], {\n                    kind: GridCellKind.Text,\n                    data: x.toString(),\n                    displayData: `${x}k`,\n                    themeOverride:\n                        x % 5 !== 0\n                            ? {\n                                  bgCell: \"#f2fff4\",\n                                  textDark: \"#00d41c\",\n                              }\n                            : {\n                                  bgCell: \"#fff6f6\",\n                                  textDark: \"#d40000\",\n                              },\n                    allowOverlay: true,\n                    lastUpdated: now,\n                });\n                cells.push({ cell: [col, row] });\n            }\n            countRef.current += 5000;\n            if (displayCountRef.current !== null) {\n                displayCountRef.current.textContent = `${countRef.current}`;\n            }\n\n            ref.current?.updateCells(cells);\n\n            rafID = window.requestAnimationFrame(sendUpdate);\n        };\n\n        sendUpdate();\n\n        return () => {\n            cancelAnimationFrame(rafID);\n        };\n    }, [setCellValueRaw]);\n\n    return (\n        <BeautifulWrapper\n            title=\"Rapid updating\"\n            description={\n                <>\n                    <Description>\n                        Data grid can support many thousands of updates per seconds. The data grid can easily update\n                        data faster than a human can read it, more importantly the faster the data grid can update, the\n                        more time your code can spend doing more valuable work.\n                    </Description>\n                    <MoreInfo>\n                        Updates processed: <KeyName ref={displayCountRef} /> We could do this faster but we wrote a\n                        really crappy data store for this demo which is actually slowing down the data grid.\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditorAll {...defaultProps} ref={ref} getCellContent={getCellContent} columns={cols} rows={10_000} />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "RapidUpdates": {
    "startLoc": {
      "col": 39,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 108
    },
    "startBody": {
      "col": 39,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 108
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { DataEditorAll } from \"../../data-editor-all.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nlet num: number = 1;\nfunction rand(): number {\n    return (num = (num * 16_807) % 2_147_483_647);\n}\n\nexport const RapidUpdates: React.VFC = () => {\n    const { cols, getCellContent, setCellValueRaw } = useMockDataGenerator(100);\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const countRef = React.useRef(0);\n    const displayCountRef = React.useRef<HTMLElement>(null);\n\n    React.useEffect(() => {\n        let rafID = 0;\n\n        const sendUpdate = () => {\n            const cells: {\n                cell: Item;\n            }[] = [];\n            const now = performance.now();\n            for (let x = 0; x < 5000; x++) {\n                const col = Math.max(10, rand() % 100);\n                const row = rand() % 10_000;\n\n                setCellValueRaw([col, row], {\n                    kind: GridCellKind.Text,\n                    data: x.toString(),\n                    displayData: `${x}k`,\n                    themeOverride:\n                        x % 5 !== 0\n                            ? {\n                                  bgCell: \"#f2fff4\",\n                                  textDark: \"#00d41c\",\n                              }\n                            : {\n                                  bgCell: \"#fff6f6\",\n                                  textDark: \"#d40000\",\n                              },\n                    allowOverlay: true,\n                    lastUpdated: now,\n                });\n                cells.push({ cell: [col, row] });\n            }\n            countRef.current += 5000;\n            if (displayCountRef.current !== null) {\n                displayCountRef.current.textContent = `${countRef.current}`;\n            }\n\n            ref.current?.updateCells(cells);\n\n            rafID = window.requestAnimationFrame(sendUpdate);\n        };\n\n        sendUpdate();\n\n        return () => {\n            cancelAnimationFrame(rafID);\n        };\n    }, [setCellValueRaw]);\n\n    return (\n        <BeautifulWrapper\n            title=\"Rapid updating\"\n            description={\n                <>\n                    <Description>\n                        Data grid can support many thousands of updates per seconds. The data grid can easily update\n                        data faster than a human can read it, more importantly the faster the data grid can update, the\n                        more time your code can spend doing more valuable work.\n                    </Description>\n                    <MoreInfo>\n                        Updates processed: <KeyName ref={displayCountRef} /> We could do this faster but we wrote a\n                        really crappy data store for this demo which is actually slowing down the data grid.\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditorAll {...defaultProps} ref={ref} getCellContent={getCellContent} columns={cols} rows={10_000} />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "rapid-updates": {
          "startLoc": {
            "col": 39,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 108
          },
          "startBody": {
            "col": 39,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 108
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
let num = 1;
function rand() {
  return num = num * 16807 % 2147483647;
}
const RapidUpdates = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const countRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
  const displayCountRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let rafID = 0;
    const sendUpdate = () => {
      var _ref$current;
      const cells = [];
      const now = performance.now();
      for (let x = 0; x < 5000; x++) {
        const col = Math.max(10, rand() % 100);
        const row = rand() % 10000;
        setCellValueRaw([col, row], {
          kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Text */ .p6.Text,
          data: x.toString(),
          displayData: `${x}k`,
          themeOverride: x % 5 !== 0 ? {
            bgCell: "#f2fff4",
            textDark: "#00d41c"
          } : {
            bgCell: "#fff6f6",
            textDark: "#d40000"
          },
          allowOverlay: true,
          lastUpdated: now
        });
        cells.push({
          cell: [col, row]
        });
      }
      countRef.current += 5000;
      if (displayCountRef.current !== null) {
        displayCountRef.current.textContent = `${countRef.current}`;
      }
      (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.updateCells(cells);
      rafID = window.requestAnimationFrame(sendUpdate);
    };
    sendUpdate();
    return () => {
      cancelAnimationFrame(rafID);
    };
  }, [setCellValueRaw]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Rapid updating",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: "Data grid can support many thousands of updates per seconds. The data grid can easily update data faster than a human can read it, more importantly the faster the data grid can update, the more time your code can spend doing more valuable work."
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["Updates processed: ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          ref: displayCountRef
        }), " We could do this faster but we wrote a really crappy data store for this demo which is actually slowing down the data grid."]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      ref: ref,
      getCellContent: getCellContent,
      columns: cols,
      rows: 10000
    })
  });
};
RapidUpdates.displayName = "RapidUpdates";;const __namedExportsOrder = ["RapidUpdates"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-rapid-updates-stories.752000e5.iframe.bundle.js.map