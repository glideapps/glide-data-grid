"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[8072],{

/***/ "./packages/core/src/docs/03-grid-column.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridColumns": () => (/* binding */ GridColumns),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, GridColumnIcon, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const GridColumns: React.VFC = () => {\n    const basicGetCellContent = React.useCallback((cell: Item): GridCell => {\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: false,\n            displayData: cell.toString(),\n            data: cell.toString(),\n        };\n    }, []);\n\n    const cols = React.useMemo(() => {\n        return [\n            {\n                title: \"First\",\n                width: 150,\n            },\n            {\n                title: \"Second\",\n                width: 150,\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Basic usage\n\n> The \\`GridColumn[]\\` passed to the \\`DataEditor\\` in the \\`columns\\` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.\n\nThere are only two mandatory properties for each \\`GridColumn\\`: \\`title\\` and \\`id\\`. The id should be a stable id and not the index of the column. Additionally a \\`width\\` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"First\", id: \"first\", width: 150 },\n    { title: \"Second\", id: \"second\", width: 150 }\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={basicGetCellContent} columns={cols} rows={50} />\n            </Wrapper>\n\n            <Marked>\n                {`\n# Header icons\n\nDefault header icons are available. They can also be reaplced by passing a new map to the \\`headerIcons\\` property.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"Name\", id: \"name\", width: 250, icon: GridColumnIcon.HeaderString, \n      overlayIcon: GridColumnIcon.RowOwnerOverlay \n    },\n    { title: \"Age\", id: \"age\", width: 100, icon: GridColumnIcon.HeaderNumber },\n    { title: \"Avatar\", id: \"avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={basicGetCellContent}\n                    columns={[\n                        {\n                            title: \"Name\",\n                            width: 250,\n                            icon: GridColumnIcon.HeaderString,\n                            overlayIcon: GridColumnIcon.RowOwnerOverlay,\n                        },\n                        { title: \"Age\", width: 120, icon: GridColumnIcon.HeaderNumber },\n                        { title: \"Avatar\", width: 100, icon: GridColumnIcon.HeaderImage },\n                    ]}\n                    rows={50}\n                />\n            </Wrapper>\n\n            <Marked>\n                {`\n# Header theming\n\nHeaders can be provided with individual theme overrides which themes both the header and its column cells.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"Name\", id=\"name\", width: 250, icon: GridColumnIcon.HeaderString },\n    { title: \"Age\", id=\"age\", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {\n        bgIconHeader: \"#00967d\",\n        textDark: \"#00c5a4\",\n        textHeader: \"#00c5a4\",\n    } },\n    { title: \"Avatar\", id=\"avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={basicGetCellContent}\n                    columns={[\n                        { title: \"Name\", width: 250, icon: GridColumnIcon.HeaderString },\n                        {\n                            title: \"Age\",\n                            width: 100,\n                            icon: GridColumnIcon.HeaderNumber,\n                            themeOverride: {\n                                bgIconHeader: \"#00967d\",\n                                textDark: \"#00c5a4\",\n                                textHeader: \"#00c5a4\",\n                            },\n                        },\n                        { title: \"Avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n                    ]}\n                    rows={50}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(GridColumns as any).storyName = \"03. Grid Columns\";\n";
var __LOCATIONS_MAP__ = {
  "GridColumns": {
    "startLoc": {
      "col": 38,
      "line": 19
    },
    "endLoc": {
      "col": 1,
      "line": 145
    },
    "startBody": {
      "col": 38,
      "line": 19
    },
    "endBody": {
      "col": 1,
      "line": 145
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, GridColumnIcon, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const GridColumns: React.VFC = () => {\n    const basicGetCellContent = React.useCallback((cell: Item): GridCell => {\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: false,\n            displayData: cell.toString(),\n            data: cell.toString(),\n        };\n    }, []);\n\n    const cols = React.useMemo(() => {\n        return [\n            {\n                title: \"First\",\n                width: 150,\n            },\n            {\n                title: \"Second\",\n                width: 150,\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Basic usage\n\n> The \\`GridColumn[]\\` passed to the \\`DataEditor\\` in the \\`columns\\` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.\n\nThere are only two mandatory properties for each \\`GridColumn\\`: \\`title\\` and \\`id\\`. The id should be a stable id and not the index of the column. Additionally a \\`width\\` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"First\", id: \"first\", width: 150 },\n    { title: \"Second\", id: \"second\", width: 150 }\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={basicGetCellContent} columns={cols} rows={50} />\n            </Wrapper>\n\n            <Marked>\n                {`\n# Header icons\n\nDefault header icons are available. They can also be reaplced by passing a new map to the \\`headerIcons\\` property.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"Name\", id: \"name\", width: 250, icon: GridColumnIcon.HeaderString, \n      overlayIcon: GridColumnIcon.RowOwnerOverlay \n    },\n    { title: \"Age\", id: \"age\", width: 100, icon: GridColumnIcon.HeaderNumber },\n    { title: \"Avatar\", id: \"avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={basicGetCellContent}\n                    columns={[\n                        {\n                            title: \"Name\",\n                            width: 250,\n                            icon: GridColumnIcon.HeaderString,\n                            overlayIcon: GridColumnIcon.RowOwnerOverlay,\n                        },\n                        { title: \"Age\", width: 120, icon: GridColumnIcon.HeaderNumber },\n                        { title: \"Avatar\", width: 100, icon: GridColumnIcon.HeaderImage },\n                    ]}\n                    rows={50}\n                />\n            </Wrapper>\n\n            <Marked>\n                {`\n# Header theming\n\nHeaders can be provided with individual theme overrides which themes both the header and its column cells.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    { title: \"Name\", id=\"name\", width: 250, icon: GridColumnIcon.HeaderString },\n    { title: \"Age\", id=\"age\", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {\n        bgIconHeader: \"#00967d\",\n        textDark: \"#00c5a4\",\n        textHeader: \"#00c5a4\",\n    } },\n    { title: \"Avatar\", id=\"avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n];\n\n<DataEditor {...rest} columns={columns} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={basicGetCellContent}\n                    columns={[\n                        { title: \"Name\", width: 250, icon: GridColumnIcon.HeaderString },\n                        {\n                            title: \"Age\",\n                            width: 100,\n                            icon: GridColumnIcon.HeaderNumber,\n                            themeOverride: {\n                                bgIconHeader: \"#00967d\",\n                                textDark: \"#00c5a4\",\n                                textHeader: \"#00c5a4\",\n                            },\n                        },\n                        { title: \"Avatar\", width: 80, icon: GridColumnIcon.HeaderImage },\n                    ]}\n                    rows={50}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(GridColumns as any).storyName = \"03. Grid Columns\";\n",
      "locationsMap": {
        "grid-columns": {
          "startLoc": {
            "col": 38,
            "line": 19
          },
          "endLoc": {
            "col": 1,
            "line": 145
          },
          "startBody": {
            "col": 38,
            "line": 19
          },
          "endBody": {
            "col": 1,
            "line": 145
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/Docs",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
  })]
});
const GridColumns = () => {
  const basicGetCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: false,
      displayData: cell.toString(),
      data: cell.toString()
    };
  }, []);
  const cols = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return [{
      title: "First",
      width: 150
    }, {
      title: "Second",
      width: 150
    }];
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .DocWrapper */ .kT, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Basic usage

> The \`GridColumn[]\` passed to the \`DataEditor\` in the \`columns\` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.

There are only two mandatory properties for each \`GridColumn\`: \`title\` and \`id\`. The id should be a stable id and not the index of the column. Additionally a \`width\` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const columns: GridColumn[] = [
    { title: "First", id: "first", width: 150 },
    { title: "Second", id: "second", width: 150 }
];

<DataEditor {...rest} columns={columns} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: basicGetCellContent,
        columns: cols,
        rows: 50
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Header icons

Default header icons are available. They can also be reaplced by passing a new map to the \`headerIcons\` property.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const columns: GridColumn[] = [
    { title: "Name", id: "name", width: 250, icon: GridColumnIcon.HeaderString, 
      overlayIcon: GridColumnIcon.RowOwnerOverlay 
    },
    { title: "Age", id: "age", width: 100, icon: GridColumnIcon.HeaderNumber },
    { title: "Avatar", id: "avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: basicGetCellContent,
        columns: [{
          title: "Name",
          width: 250,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
          overlayIcon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.RowOwnerOverlay */ .PE.RowOwnerOverlay
        }, {
          title: "Age",
          width: 120,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderNumber */ .PE.HeaderNumber
        }, {
          title: "Avatar",
          width: 100,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderImage */ .PE.HeaderImage
        }],
        rows: 50
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Header theming

Headers can be provided with individual theme overrides which themes both the header and its column cells.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const columns: GridColumn[] = [
    { title: "Name", id="name", width: 250, icon: GridColumnIcon.HeaderString },
    { title: "Age", id="age", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {
        bgIconHeader: "#00967d",
        textDark: "#00c5a4",
        textHeader: "#00c5a4",
    } },
    { title: "Avatar", id="avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: basicGetCellContent,
        columns: [{
          title: "Name",
          width: 250,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderString */ .PE.HeaderString
        }, {
          title: "Age",
          width: 100,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderNumber */ .PE.HeaderNumber,
          themeOverride: {
            bgIconHeader: "#00967d",
            textDark: "#00c5a4",
            textHeader: "#00c5a4"
          }
        }, {
          title: "Avatar",
          width: 80,
          icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridColumnIcon.HeaderImage */ .PE.HeaderImage
        }],
        rows: 50
      })
    })]
  });
};
GridColumns.displayName = "GridColumns";
GridColumns.storyName = "03. Grid Columns";;const __namedExportsOrder = ["GridColumns"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-03-grid-column-stories.b219074d.iframe.bundle.js.map