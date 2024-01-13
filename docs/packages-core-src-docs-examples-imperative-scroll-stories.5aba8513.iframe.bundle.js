"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9830],{

/***/ "./packages/core/src/docs/examples/imperative-scroll.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImperativeScroll": () => (/* binding */ ImperativeScroll),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface ImperativeScrollProps {\n    paddingY: number;\n    paddingX: number;\n    vAlign?: \"start\" | \"center\" | \"end\";\n    hAlign?: \"start\" | \"center\" | \"end\";\n}\n\nexport const ImperativeScroll: React.VFC<ImperativeScrollProps> = p => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const onClick = () => {\n        ref.current?.scrollTo(4, 99, \"both\", p.paddingX, p.paddingY, {\n            vAlign: p.vAlign,\n            hAlign: p.hAlign,\n        });\n    };\n\n    return (\n        <BeautifulWrapper\n            title=\"Imperative scrolling\"\n            description={\n                <>\n                    <Description>\n                        You can imperatively scroll to a cell by calling <PropName>scrollTo</PropName> on a DataEditor\n                        ref.\n                    </Description>\n                    <MoreInfo>\n                        Click <button onClick={onClick}>Here</button> to scroll to column 4 row 100\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={ref}\n                rowMarkers=\"clickable-number\"\n                getCellContent={getCellContent}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={10_000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(ImperativeScroll as any).args = {\n    paddingY: 0,\n    paddingX: 0,\n    vAlign: \"start\",\n    hAlign: \"start\",\n};\n(ImperativeScroll as any).argTypes = {\n    paddingY: 0,\n    paddingX: 0,\n    vAlign: {\n        control: { type: \"select\" },\n        options: [\"start\", \"center\", \"end\", undefined],\n    },\n    hAlign: {\n        control: { type: \"select\" },\n        options: [\"start\", \"center\", \"end\", undefined],\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "ImperativeScroll": {
    "startLoc": {
      "col": 66,
      "line": 33
    },
    "endLoc": {
      "col": 1,
      "line": 71
    },
    "startBody": {
      "col": 66,
      "line": 33
    },
    "endBody": {
      "col": 1,
      "line": 71
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { type DataEditorRef } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface ImperativeScrollProps {\n    paddingY: number;\n    paddingX: number;\n    vAlign?: \"start\" | \"center\" | \"end\";\n    hAlign?: \"start\" | \"center\" | \"end\";\n}\n\nexport const ImperativeScroll: React.VFC<ImperativeScrollProps> = p => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const ref = React.useRef<DataEditorRef>(null);\n\n    const onClick = () => {\n        ref.current?.scrollTo(4, 99, \"both\", p.paddingX, p.paddingY, {\n            vAlign: p.vAlign,\n            hAlign: p.hAlign,\n        });\n    };\n\n    return (\n        <BeautifulWrapper\n            title=\"Imperative scrolling\"\n            description={\n                <>\n                    <Description>\n                        You can imperatively scroll to a cell by calling <PropName>scrollTo</PropName> on a DataEditor\n                        ref.\n                    </Description>\n                    <MoreInfo>\n                        Click <button onClick={onClick}>Here</button> to scroll to column 4 row 100\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={ref}\n                rowMarkers=\"clickable-number\"\n                getCellContent={getCellContent}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={10_000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(ImperativeScroll as any).args = {\n    paddingY: 0,\n    paddingX: 0,\n    vAlign: \"start\",\n    hAlign: \"start\",\n};\n(ImperativeScroll as any).argTypes = {\n    paddingY: 0,\n    paddingX: 0,\n    vAlign: {\n        control: { type: \"select\" },\n        options: [\"start\", \"center\", \"end\", undefined],\n    },\n    hAlign: {\n        control: { type: \"select\" },\n        options: [\"start\", \"center\", \"end\", undefined],\n    },\n};\n",
      "locationsMap": {
        "imperative-scroll": {
          "startLoc": {
            "col": 66,
            "line": 33
          },
          "endLoc": {
            "col": 1,
            "line": 71
          },
          "startBody": {
            "col": 66,
            "line": 33
          },
          "endBody": {
            "col": 1,
            "line": 71
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
const ImperativeScroll = p => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const onClick = () => {
    var _ref$current;
    (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.scrollTo(4, 99, "both", p.paddingX, p.paddingY, {
      vAlign: p.vAlign,
      hAlign: p.hAlign
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Imperative scrolling",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can imperatively scroll to a cell by calling ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "scrollTo"
        }), " on a DataEditor ref."]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["Click ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          onClick: onClick,
          children: "Here"
        }), " to scroll to column 4 row 100"]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      ref: ref,
      rowMarkers: "clickable-number",
      getCellContent: getCellContent,
      columns: cols,
      onCellEdited: setCellValue,
      onColumnResize: onColumnResize,
      rows: 10000
    })
  });
};
ImperativeScroll.displayName = "ImperativeScroll";
ImperativeScroll.args = {
  paddingY: 0,
  paddingX: 0,
  vAlign: "start",
  hAlign: "start"
};
ImperativeScroll.argTypes = {
  paddingY: 0,
  paddingX: 0,
  vAlign: {
    control: {
      type: "select"
    },
    options: ["start", "center", "end", undefined]
  },
  hAlign: {
    control: {
      type: "select"
    },
    options: ["start", "center", "end", undefined]
  }
};;const __namedExportsOrder = ["ImperativeScroll"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-imperative-scroll-stories.5aba8513.iframe.bundle.js.map