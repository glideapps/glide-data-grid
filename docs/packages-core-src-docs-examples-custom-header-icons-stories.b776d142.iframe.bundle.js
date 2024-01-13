"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2942],{

/***/ "./packages/core/src/docs/examples/custom-header-icons.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomHeaderIcons": () => (/* binding */ CustomHeaderIcons),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { SpriteMap } from \"../../internal/data-grid/data-grid-sprites.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Custom header icons\"\n                    description={\n                        <>\n                            <Description>\n                                You can provide overrides for the default icons by passing the{\" \"}\n                                <PropName>headerIcons</PropName> prop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomHeaderIcons: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const realCols = React.useMemo(() => {\n        const c = [...cols];\n        c[3] = {\n            ...c[3],\n            title: \"CUSTOM ICON\",\n            icon: \"custom\",\n            width: 200,\n        };\n        return c;\n    }, [cols]);\n\n    const headerIcons = React.useMemo<SpriteMap>(() => {\n        return {\n            custom: p => `<svg width=\"20\" height=\"20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"2.00015\" y=\"2\" width=\"16\" height=\"16\" rx=\"4\" fill=\"${p.bgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z\" fill=\"${p.fgColor}\"/>\n                <path d=\"M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z\" fill=\"${p.fgColor}\"/>\n                <path d=\"M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z\" fill=\"${p.fgColor}\"/>\n            </svg>`,\n        };\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={realCols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            headerIcons={headerIcons}\n            rows={1000}\n        />\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "CustomHeaderIcons": {
    "startLoc": {
      "col": 44,
      "line": 36
    },
    "endLoc": {
      "col": 1,
      "line": 76
    },
    "startBody": {
      "col": 44,
      "line": 36
    },
    "endBody": {
      "col": 1,
      "line": 76
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport type { SpriteMap } from \"../../internal/data-grid/data-grid-sprites.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Custom header icons\"\n                    description={\n                        <>\n                            <Description>\n                                You can provide overrides for the default icons by passing the{\" \"}\n                                <PropName>headerIcons</PropName> prop.\n                            </Description>\n                        </>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomHeaderIcons: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const realCols = React.useMemo(() => {\n        const c = [...cols];\n        c[3] = {\n            ...c[3],\n            title: \"CUSTOM ICON\",\n            icon: \"custom\",\n            width: 200,\n        };\n        return c;\n    }, [cols]);\n\n    const headerIcons = React.useMemo<SpriteMap>(() => {\n        return {\n            custom: p => `<svg width=\"20\" height=\"20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"2.00015\" y=\"2\" width=\"16\" height=\"16\" rx=\"4\" fill=\"${p.bgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z\" fill=\"${p.fgColor}\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z\" fill=\"${p.fgColor}\"/>\n                <path d=\"M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z\" fill=\"${p.fgColor}\"/>\n                <path d=\"M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z\" fill=\"${p.fgColor}\"/>\n            </svg>`,\n        };\n    }, []);\n\n    return (\n        <DataEditor\n            {...defaultProps}\n            getCellContent={getCellContent}\n            columns={realCols}\n            onCellEdited={setCellValue}\n            onColumnResize={onColumnResize}\n            headerIcons={headerIcons}\n            rows={1000}\n        />\n    );\n};\n",
      "locationsMap": {
        "custom-header-icons": {
          "startLoc": {
            "col": 44,
            "line": 36
          },
          "endLoc": {
            "col": 1,
            "line": 76
          },
          "startBody": {
            "col": 44,
            "line": 36
          },
          "endBody": {
            "col": 1,
            "line": 76
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Custom header icons",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
          children: ["You can provide overrides for the default icons by passing the", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
            children: "headerIcons"
          }), " prop."]
        })
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const CustomHeaderIcons = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const realCols = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const c = [...cols];
    c[3] = {
      ...c[3],
      title: "CUSTOM ICON",
      icon: "custom",
      width: 200
    };
    return c;
  }, [cols]);
  const headerIcons = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      custom: p => `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.00015" y="2" width="16" height="16" rx="4" fill="${p.bgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z" fill="${p.fgColor}"/>
                <path d="M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z" fill="${p.fgColor}"/>
                <path d="M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z" fill="${p.fgColor}"/>
            </svg>`
    };
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
    ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
    getCellContent: getCellContent,
    columns: realCols,
    onCellEdited: setCellValue,
    onColumnResize: onColumnResize,
    headerIcons: headerIcons,
    rows: 1000
  });
};
CustomHeaderIcons.displayName = "CustomHeaderIcons";;const __namedExportsOrder = ["CustomHeaderIcons"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-custom-header-icons-stories.b776d142.iframe.bundle.js.map