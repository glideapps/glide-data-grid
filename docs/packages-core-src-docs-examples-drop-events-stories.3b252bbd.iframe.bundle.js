"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2351],{

/***/ "./packages/core/src/docs/examples/drop-events.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropEvents": () => (/* binding */ DropEvents),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\n// A few supported mime types for drag and drop into cells.\nconst SUPPORTED_IMAGE_TYPES = new Set([\"image/png\", \"image/gif\", \"image/bmp\", \"image/jpeg\"]);\n\nexport const DropEvents: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [highlights, setHighlights] = React.useState<DataEditorProps[\"highlightRegions\"]>([]);\n\n    const [lastDropCell, setLastDropCell] = React.useState<Item | undefined>();\n\n    const onDrop = React.useCallback(\n        (cell: Item, dataTransfer: DataTransfer | null) => {\n            setHighlights([]);\n\n            if (dataTransfer === null) {\n                return;\n            }\n\n            const { files } = dataTransfer;\n            // This only supports one image, for simplicity.\n            if (files.length !== 1) {\n                return;\n            }\n\n            const [file] = files;\n            if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {\n                return;\n            }\n\n            const imgUrl = URL.createObjectURL(file);\n\n            setCellValue(\n                cell,\n                {\n                    kind: GridCellKind.Image,\n                    data: [imgUrl],\n                    allowOverlay: true,\n                    readonly: true,\n                },\n                true,\n                true\n            );\n\n            setLastDropCell(cell);\n        },\n        [setCellValue]\n    );\n\n    const onDragOverCell = React.useCallback(\n        (cell: Item, dataTransfer: DataTransfer | null) => {\n            if (dataTransfer === null) {\n                return;\n            }\n\n            const { items } = dataTransfer;\n            // This only supports one image, for simplicity.\n            if (items.length !== 1) {\n                return;\n            }\n\n            const [item] = items;\n            if (!SUPPORTED_IMAGE_TYPES.has(item.type)) {\n                return;\n            }\n\n            const [col, row] = cell;\n            if (getCellContent(cell).kind === GridCellKind.Image) {\n                setHighlights([\n                    {\n                        color: \"#44BB0022\",\n                        range: {\n                            x: col,\n                            y: row,\n                            width: 1,\n                            height: 1,\n                        },\n                    },\n                ]);\n            } else {\n                setHighlights([]);\n            }\n        },\n        [getCellContent]\n    );\n\n    const onDragLeave = React.useCallback(() => {\n        setHighlights([]);\n    }, []);\n\n    return (\n        <BeautifulWrapper\n            title=\"Drop events\"\n            description={\n                <>\n                    <Description>\n                        You can drag and drop into cells by using <PropName>onDragOverCell</PropName> and{\" \"}\n                        <PropName>onDrop</PropName>.\n                    </Description>\n\n                    <div>\n                        {lastDropCell === undefined ? (\n                            <MoreInfo>Nothing dropped, yet</MoreInfo>\n                        ) : (\n                            <>\n                                <MoreInfo>\n                                    You last dropped in cell <PropName>{JSON.stringify(lastDropCell)}</PropName>\n                                </MoreInfo>\n                            </>\n                        )}\n                    </div>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={1000}\n                onDrop={onDrop}\n                onDragOverCell={onDragOverCell}\n                onDragLeave={onDragLeave}\n                highlightRegions={highlights}\n                rowMarkers=\"none\"\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "DropEvents": {
    "startLoc": {
      "col": 37,
      "line": 31
    },
    "endLoc": {
      "col": 1,
      "line": 155
    },
    "startBody": {
      "col": 37,
      "line": 31
    },
    "endBody": {
      "col": 1,
      "line": 155
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { type DataEditorProps } from \"../../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Item } from \"../../internal/data-grid/data-grid-types.js\";\nimport { GridCellKind } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\n// A few supported mime types for drag and drop into cells.\nconst SUPPORTED_IMAGE_TYPES = new Set([\"image/png\", \"image/gif\", \"image/bmp\", \"image/jpeg\"]);\n\nexport const DropEvents: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [highlights, setHighlights] = React.useState<DataEditorProps[\"highlightRegions\"]>([]);\n\n    const [lastDropCell, setLastDropCell] = React.useState<Item | undefined>();\n\n    const onDrop = React.useCallback(\n        (cell: Item, dataTransfer: DataTransfer | null) => {\n            setHighlights([]);\n\n            if (dataTransfer === null) {\n                return;\n            }\n\n            const { files } = dataTransfer;\n            // This only supports one image, for simplicity.\n            if (files.length !== 1) {\n                return;\n            }\n\n            const [file] = files;\n            if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {\n                return;\n            }\n\n            const imgUrl = URL.createObjectURL(file);\n\n            setCellValue(\n                cell,\n                {\n                    kind: GridCellKind.Image,\n                    data: [imgUrl],\n                    allowOverlay: true,\n                    readonly: true,\n                },\n                true,\n                true\n            );\n\n            setLastDropCell(cell);\n        },\n        [setCellValue]\n    );\n\n    const onDragOverCell = React.useCallback(\n        (cell: Item, dataTransfer: DataTransfer | null) => {\n            if (dataTransfer === null) {\n                return;\n            }\n\n            const { items } = dataTransfer;\n            // This only supports one image, for simplicity.\n            if (items.length !== 1) {\n                return;\n            }\n\n            const [item] = items;\n            if (!SUPPORTED_IMAGE_TYPES.has(item.type)) {\n                return;\n            }\n\n            const [col, row] = cell;\n            if (getCellContent(cell).kind === GridCellKind.Image) {\n                setHighlights([\n                    {\n                        color: \"#44BB0022\",\n                        range: {\n                            x: col,\n                            y: row,\n                            width: 1,\n                            height: 1,\n                        },\n                    },\n                ]);\n            } else {\n                setHighlights([]);\n            }\n        },\n        [getCellContent]\n    );\n\n    const onDragLeave = React.useCallback(() => {\n        setHighlights([]);\n    }, []);\n\n    return (\n        <BeautifulWrapper\n            title=\"Drop events\"\n            description={\n                <>\n                    <Description>\n                        You can drag and drop into cells by using <PropName>onDragOverCell</PropName> and{\" \"}\n                        <PropName>onDrop</PropName>.\n                    </Description>\n\n                    <div>\n                        {lastDropCell === undefined ? (\n                            <MoreInfo>Nothing dropped, yet</MoreInfo>\n                        ) : (\n                            <>\n                                <MoreInfo>\n                                    You last dropped in cell <PropName>{JSON.stringify(lastDropCell)}</PropName>\n                                </MoreInfo>\n                            </>\n                        )}\n                    </div>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={1000}\n                onDrop={onDrop}\n                onDragOverCell={onDragOverCell}\n                onDragLeave={onDragLeave}\n                highlightRegions={highlights}\n                rowMarkers=\"none\"\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "drop-events": {
          "startLoc": {
            "col": 37,
            "line": 31
          },
          "endLoc": {
            "col": 1,
            "line": 155
          },
          "startBody": {
            "col": 37,
            "line": 31
          },
          "endBody": {
            "col": 1,
            "line": 155
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
const SUPPORTED_IMAGE_TYPES = new Set(["image/png", "image/gif", "image/bmp", "image/jpeg"]);
const DropEvents = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const [highlights, setHighlights] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  const [lastDropCell, setLastDropCell] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const onDrop = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((cell, dataTransfer) => {
    setHighlights([]);
    if (dataTransfer === null) {
      return;
    }
    const {
      files
    } = dataTransfer;
    if (files.length !== 1) {
      return;
    }
    const [file] = files;
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      return;
    }
    const imgUrl = URL.createObjectURL(file);
    setCellValue(cell, {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Image */ .p6.Image,
      data: [imgUrl],
      allowOverlay: true,
      readonly: true
    }, true, true);
    setLastDropCell(cell);
  }, [setCellValue]);
  const onDragOverCell = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((cell, dataTransfer) => {
    if (dataTransfer === null) {
      return;
    }
    const {
      items
    } = dataTransfer;
    if (items.length !== 1) {
      return;
    }
    const [item] = items;
    if (!SUPPORTED_IMAGE_TYPES.has(item.type)) {
      return;
    }
    const [col, row] = cell;
    if (getCellContent(cell).kind === _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_4__/* .GridCellKind.Image */ .p6.Image) {
      setHighlights([{
        color: "#44BB0022",
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }]);
    } else {
      setHighlights([]);
    }
  }, [getCellContent]);
  const onDragLeave = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    setHighlights([]);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Drop events",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["You can drag and drop into cells by using ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onDragOverCell"
        }), " and", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onDrop"
        }), "."]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        children: lastDropCell === undefined ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
          children: "Nothing dropped, yet"
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
            children: ["You last dropped in cell ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
              children: JSON.stringify(lastDropCell)
            })]
          })
        })
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      columns: cols,
      onCellEdited: setCellValue,
      onColumnResize: onColumnResize,
      rows: 1000,
      onDrop: onDrop,
      onDragOverCell: onDragOverCell,
      onDragLeave: onDragLeave,
      highlightRegions: highlights,
      rowMarkers: "none"
    })
  });
};
DropEvents.displayName = "DropEvents";;const __namedExportsOrder = ["DropEvents"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-drop-events-stories.3b252bbd.iframe.bundle.js.map