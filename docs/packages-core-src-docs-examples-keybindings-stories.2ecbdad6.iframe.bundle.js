"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7097],{

/***/ "./packages/core/src/docs/examples/keybindings.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomKeybindings": () => (/* binding */ CustomKeybindings),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _data_editor_data_editor_keybindings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor/data-editor-keybindings.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React, { useState } from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { type Keybinds, type Keybind, keybindingDefaults } from \"../../data-editor/data-editor-keybindings.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomKeybindings: React.VFC = () => {\n    const { getCellContent, cols, setCellValue } = useMockDataGenerator(30, false);\n\n    const keybindingStyle = {\n        display: \"grid\",\n        gridTemplateColumns: \"repeat(4, 1fr)\",\n        gridColumnGap: \"32px\",\n        gridRowGap: \"10px\",\n        marginBottom: \"10px\",\n        marginTop: \"20px\",\n        font: \"13px sans-serif\",\n    };\n\n    const controlGroupStyle = {\n        display: \"flex\",\n        justifyContent: \"space-between\",\n        alignItems: \"center\",\n    };\n\n    const { copy, cut, paste, pageDown, pageUp, first, last, ...rest } = keybindingDefaults;\n\n    const [keybindings, setKeybindings] = useState<Partial<Keybinds>>(rest);\n\n    const handleKeybindingChange = (key: keyof Keybinds, value: Keybind) => {\n        setKeybindings(prev => ({ ...prev, [key]: value }));\n    };\n\n    return (\n        <BeautifulWrapper\n            title=\"Custom Keybindings\"\n            description={\n                <Description>\n                    This demo showcases custom keybindings. Modify the keybindings using the controls below.\n                    <div style={keybindingStyle}>\n                        {Object.keys(rest).map(key => (\n                            <div key={key} style={controlGroupStyle}>\n                                <label>{key}: </label>\n                                <div>\n                                    <input\n                                        type=\"checkbox\"\n                                        checked={keybindings[key as keyof Keybinds] === true}\n                                        onChange={e =>\n                                            handleKeybindingChange(\n                                                key as keyof Keybinds,\n                                                e.target.checked ? true : false\n                                            )\n                                        }\n                                    />\n                                    <input\n                                        type=\"text\"\n                                        style={{ width: \"100px\" }}\n                                        value={(keybindings[key as keyof Keybinds] as string) || \"\"}\n                                        onChange={e => handleKeybindingChange(key as keyof Keybinds, e.target.value)}\n                                    />\n                                </div>\n                            </div>\n                        ))}\n                    </div>\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                onCellEdited={setCellValue}\n                keybindings={keybindings}\n                columns={cols}\n                rangeSelect=\"multi-rect\"\n                rows={100}\n                rowMarkers=\"both\"\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "CustomKeybindings": {
    "startLoc": {
      "col": 44,
      "line": 18
    },
    "endLoc": {
      "col": 1,
      "line": 90
    },
    "startBody": {
      "col": 44,
      "line": 18
    },
    "endBody": {
      "col": 1,
      "line": 90
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React, { useState } from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport { type Keybinds, type Keybind, keybindingDefaults } from \"../../data-editor/data-editor-keybindings.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const CustomKeybindings: React.VFC = () => {\n    const { getCellContent, cols, setCellValue } = useMockDataGenerator(30, false);\n\n    const keybindingStyle = {\n        display: \"grid\",\n        gridTemplateColumns: \"repeat(4, 1fr)\",\n        gridColumnGap: \"32px\",\n        gridRowGap: \"10px\",\n        marginBottom: \"10px\",\n        marginTop: \"20px\",\n        font: \"13px sans-serif\",\n    };\n\n    const controlGroupStyle = {\n        display: \"flex\",\n        justifyContent: \"space-between\",\n        alignItems: \"center\",\n    };\n\n    const { copy, cut, paste, pageDown, pageUp, first, last, ...rest } = keybindingDefaults;\n\n    const [keybindings, setKeybindings] = useState<Partial<Keybinds>>(rest);\n\n    const handleKeybindingChange = (key: keyof Keybinds, value: Keybind) => {\n        setKeybindings(prev => ({ ...prev, [key]: value }));\n    };\n\n    return (\n        <BeautifulWrapper\n            title=\"Custom Keybindings\"\n            description={\n                <Description>\n                    This demo showcases custom keybindings. Modify the keybindings using the controls below.\n                    <div style={keybindingStyle}>\n                        {Object.keys(rest).map(key => (\n                            <div key={key} style={controlGroupStyle}>\n                                <label>{key}: </label>\n                                <div>\n                                    <input\n                                        type=\"checkbox\"\n                                        checked={keybindings[key as keyof Keybinds] === true}\n                                        onChange={e =>\n                                            handleKeybindingChange(\n                                                key as keyof Keybinds,\n                                                e.target.checked ? true : false\n                                            )\n                                        }\n                                    />\n                                    <input\n                                        type=\"text\"\n                                        style={{ width: \"100px\" }}\n                                        value={(keybindings[key as keyof Keybinds] as string) || \"\"}\n                                        onChange={e => handleKeybindingChange(key as keyof Keybinds, e.target.value)}\n                                    />\n                                </div>\n                            </div>\n                        ))}\n                    </div>\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                onCellEdited={setCellValue}\n                keybindings={keybindings}\n                columns={cols}\n                rangeSelect=\"multi-rect\"\n                rows={100}\n                rowMarkers=\"both\"\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "custom-keybindings": {
          "startLoc": {
            "col": 44,
            "line": 18
          },
          "endLoc": {
            "col": 1,
            "line": 90
          },
          "startBody": {
            "col": 44,
            "line": 18
          },
          "endBody": {
            "col": 1,
            "line": 90
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
const CustomKeybindings = () => {
  const {
    getCellContent,
    cols,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(30, false);
  const keybindingStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "32px",
    gridRowGap: "10px",
    marginBottom: "10px",
    marginTop: "20px",
    font: "13px sans-serif"
  };
  const controlGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  const {
    copy,
    cut,
    paste,
    pageDown,
    pageUp,
    first,
    last,
    ...rest
  } = _data_editor_data_editor_keybindings_js__WEBPACK_IMPORTED_MODULE_4__/* .keybindingDefaults */ .p;
  const [keybindings, setKeybindings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rest);
  const handleKeybindingChange = (key, value) => {
    setKeybindings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Custom Keybindings",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
      children: ["This demo showcases custom keybindings. Modify the keybindings using the controls below.", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        style: keybindingStyle,
        children: Object.keys(rest).map(key => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          style: controlGroupStyle,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
            children: [key, ": "]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              checked: keybindings[key] === true,
              onChange: e => handleKeybindingChange(key, e.target.checked ? true : false)
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "text",
              style: {
                width: "100px"
              },
              value: keybindings[key] || "",
              onChange: e => handleKeybindingChange(key, e.target.value)
            })]
          })]
        }, key))
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      onCellEdited: setCellValue,
      keybindings: keybindings,
      columns: cols,
      rangeSelect: "multi-rect",
      rows: 100,
      rowMarkers: "both"
    })
  });
};
CustomKeybindings.displayName = "CustomKeybindings";;const __namedExportsOrder = ["CustomKeybindings"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-keybindings-stories.2ecbdad6.iframe.bundle.js.map