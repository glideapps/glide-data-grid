"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2013],{

/***/ "./packages/core/src/docs/examples/cell-activated-event.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellActivatedEvent": () => (/* binding */ CellActivatedEvent),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    KeyName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridCell, Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { DataEditorCoreProps } from \"../../index.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CellActivatedEvent: React.VFC<Pick<DataEditorCoreProps, \"cellActivationBehavior\">> = p => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const getCellContentMangled = React.useCallback(\n        (item: Item): GridCell => {\n            const result = getCellContent(item);\n            if (item[0] === 3) {\n                return {\n                    ...result,\n                    activationBehaviorOverride: \"single-click\",\n                    hoverEffect: true,\n                } as any;\n            }\n            return result;\n        },\n        [getCellContent]\n    );\n\n    const [lastActivated, setLastActivated] = React.useState<Item | undefined>(undefined);\n\n    const onCellActivated = React.useCallback((cell: Item) => {\n        setLastActivated(cell);\n    }, []);\n\n    return (\n        <BeautifulWrapper\n            title=\"Cell Activated event\"\n            description={\n                <>\n                    <Description>\n                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName> or double click a cell, that\n                        cell is activated. You can track this with <PropName>onCellActivated</PropName>.\n                    </Description>\n                    <MoreInfo>\n                        Last activated cell:{\" \"}\n                        {lastActivated === undefined ? \"none\" : `(${lastActivated[0]}, ${lastActivated[1]})`}\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                // editorBloom={[-1, -4]}\n                cellActivationBehavior={p.cellActivationBehavior}\n                getCellContent={getCellContentMangled}\n                //initialSize={[849, 967]}\n                //scrollOffsetY={10_000}\n                getCellsForSelection={true}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                onCellActivated={onCellActivated}\n                rows={10_000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(CellActivatedEvent as any).argTypes = {\n    cellActivationBehavior: {\n        control: { type: \"select\" },\n        options: [\"double-click\", \"single-click\", \"second-click\"],\n    },\n};\n(CellActivatedEvent as any).args = {\n    cellActivationBehavior: \"second-click\",\n};\n";
var __LOCATIONS_MAP__ = {
  "CellActivatedEvent": {
    "startLoc": {
      "col": 98,
      "line": 28
    },
    "endLoc": {
      "col": 1,
      "line": 83
    },
    "startBody": {
      "col": 98,
      "line": 28
    },
    "endBody": {
      "col": 1,
      "line": 83
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    KeyName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { GridCell, Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { DataEditorCoreProps } from \"../../index.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CellActivatedEvent: React.VFC<Pick<DataEditorCoreProps, \"cellActivationBehavior\">> = p => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const getCellContentMangled = React.useCallback(\n        (item: Item): GridCell => {\n            const result = getCellContent(item);\n            if (item[0] === 3) {\n                return {\n                    ...result,\n                    activationBehaviorOverride: \"single-click\",\n                    hoverEffect: true,\n                } as any;\n            }\n            return result;\n        },\n        [getCellContent]\n    );\n\n    const [lastActivated, setLastActivated] = React.useState<Item | undefined>(undefined);\n\n    const onCellActivated = React.useCallback((cell: Item) => {\n        setLastActivated(cell);\n    }, []);\n\n    return (\n        <BeautifulWrapper\n            title=\"Cell Activated event\"\n            description={\n                <>\n                    <Description>\n                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName> or double click a cell, that\n                        cell is activated. You can track this with <PropName>onCellActivated</PropName>.\n                    </Description>\n                    <MoreInfo>\n                        Last activated cell:{\" \"}\n                        {lastActivated === undefined ? \"none\" : `(${lastActivated[0]}, ${lastActivated[1]})`}\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                // editorBloom={[-1, -4]}\n                cellActivationBehavior={p.cellActivationBehavior}\n                getCellContent={getCellContentMangled}\n                //initialSize={[849, 967]}\n                //scrollOffsetY={10_000}\n                getCellsForSelection={true}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                onCellActivated={onCellActivated}\n                rows={10_000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(CellActivatedEvent as any).argTypes = {\n    cellActivationBehavior: {\n        control: { type: \"select\" },\n        options: [\"double-click\", \"single-click\", \"second-click\"],\n    },\n};\n(CellActivatedEvent as any).args = {\n    cellActivationBehavior: \"second-click\",\n};\n",
      "locationsMap": {
        "cell-activated-event": {
          "startLoc": {
            "col": 98,
            "line": 28
          },
          "endLoc": {
            "col": 1,
            "line": 83
          },
          "startBody": {
            "col": 98,
            "line": 28
          },
          "endBody": {
            "col": 1,
            "line": 83
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
const CellActivatedEvent = p => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const getCellContentMangled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(item => {
    const result = getCellContent(item);
    if (item[0] === 3) {
      return {
        ...result,
        activationBehaviorOverride: "single-click",
        hoverEffect: true
      };
    }
    return result;
  }, [getCellContent]);
  const [lastActivated, setLastActivated] = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined);
  const onCellActivated = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    setLastActivated(cell);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Cell Activated event",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["When you tap ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: "Enter"
        }), ", ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: "Space"
        }), " or double click a cell, that cell is activated. You can track this with ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onCellActivated"
        }), "."]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["Last activated cell:", " ", lastActivated === undefined ? "none" : `(${lastActivated[0]}, ${lastActivated[1]})`]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      cellActivationBehavior: p.cellActivationBehavior,
      getCellContent: getCellContentMangled,
      getCellsForSelection: true,
      columns: cols,
      onCellEdited: setCellValue,
      onColumnResize: onColumnResize,
      onCellActivated: onCellActivated,
      rows: 10000
    })
  });
};
CellActivatedEvent.displayName = "CellActivatedEvent";
CellActivatedEvent.argTypes = {
  cellActivationBehavior: {
    control: {
      type: "select"
    },
    options: ["double-click", "single-click", "second-click"]
  }
};
CellActivatedEvent.args = {
  cellActivationBehavior: "second-click"
};;const __namedExportsOrder = ["CellActivatedEvent"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-cell-activated-event-stories.aa317c49.iframe.bundle.js.map