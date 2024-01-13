"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1369],{

/***/ "./packages/core/src/docs/examples/theme-support.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeSupport": () => (/* binding */ ThemeSupport),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst darkTheme = {\n    accentColor: \"#8c96ff\",\n    accentLight: \"rgba(202, 206, 255, 0.253)\",\n\n    textDark: \"#ffffff\",\n    textMedium: \"#b8b8b8\",\n    textLight: \"#a0a0a0\",\n    textBubble: \"#ffffff\",\n\n    bgIconHeader: \"#b8b8b8\",\n    fgIconHeader: \"#000000\",\n    textHeader: \"#a1a1a1\",\n    textHeaderSelected: \"#000000\",\n\n    bgCell: \"#16161b\",\n    bgCellMedium: \"#202027\",\n    bgHeader: \"#212121\",\n    bgHeaderHasFocus: \"#474747\",\n    bgHeaderHovered: \"#404040\",\n\n    bgBubble: \"#212121\",\n    bgBubbleSelected: \"#000000\",\n\n    bgSearchResult: \"#423c24\",\n\n    borderColor: \"rgba(225,225,225,0.2)\",\n    drilldownBorder: \"rgba(225,225,225,0.4)\",\n\n    linkColor: \"#4F5DFF\",\n\n    headerFontStyle: \"bold 14px\",\n    baseFontStyle: \"13px\",\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n};\n\nconst hotdogStand = {\n    accentColor: \"#8c96ff\",\n    accentLight: \"rgba(202, 206, 255, 0.253)\",\n\n    textDark: \"#ffffff\",\n    textMedium: \"rgba(255, 255, 255, 0.9)\",\n    textLight: \"rgba(255, 255, 255, 0.7)\",\n    textBubble: \"#000000\",\n\n    bgIconHeader: \"#880000\",\n    fgIconHeader: \"#ff5555\",\n    textHeader: \"rgba(0, 0, 0, 0.9)\",\n    textHeaderSelected: \"#000000\",\n\n    bgCell: \"#ff0000\",\n    bgCellMedium: \"#ff4d4d\",\n    bgHeader: \"#f3f300\",\n    bgHeaderHasFocus: \"#eeee00\",\n    bgHeaderHovered: \"#e0e000\",\n\n    bgBubble: \"#ffff00\",\n    bgBubbleSelected: \"#ffff00\",\n\n    bgSearchResult: \"#423c24\",\n\n    borderColor: \"#ffff00\",\n    drilldownBorder: \"#ffff00\",\n\n    linkColor: \"#4F5DFF\",\n\n    headerFontStyle: \"bold 14px\",\n    baseFontStyle: \"13px\",\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n    roundingRadius: 6,\n};\n\nexport const ThemeSupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [theme, setTheme] = React.useState<Partial<Theme>>({});\n\n    const [numRows, setNumRows] = React.useState(1000);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        setNumRows(cv => cv + 1);\n        for (let c = 0; c < 6; c++) {\n            setCellValue([c, newRow], {\n                displayData: \"\",\n                data: \"\",\n            } as any);\n        }\n    }, [numRows, setCellValue]);\n\n    return (\n        <BeautifulWrapper\n            title=\"Theme support\"\n            description={\n                <>\n                    <Description>\n                        DataGrid respects the theme provided by the <PropName>theme</PropName> prop.\n                    </Description>\n                    <MoreInfo>\n                        <button onClick={() => setTheme({})}>Light</button> or{\" \"}\n                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{\" \"}\n                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                theme={theme}\n                getCellContent={getCellContent}\n                columns={cols}\n                onRowAppended={onRowAppended}\n                trailingRowOptions={{\n                    tint: true,\n                    sticky: true,\n                }}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={numRows}\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ThemeSupport": {
    "startLoc": {
      "col": 39,
      "line": 99
    },
    "endLoc": {
      "col": 1,
      "line": 148
    },
    "startBody": {
      "col": 39,
      "line": 99
    },
    "endBody": {
      "col": 1,
      "line": 148
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport type { Theme } from \"../../common/styles.js\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    defaultProps,\n    useAllMockedKinds,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst darkTheme = {\n    accentColor: \"#8c96ff\",\n    accentLight: \"rgba(202, 206, 255, 0.253)\",\n\n    textDark: \"#ffffff\",\n    textMedium: \"#b8b8b8\",\n    textLight: \"#a0a0a0\",\n    textBubble: \"#ffffff\",\n\n    bgIconHeader: \"#b8b8b8\",\n    fgIconHeader: \"#000000\",\n    textHeader: \"#a1a1a1\",\n    textHeaderSelected: \"#000000\",\n\n    bgCell: \"#16161b\",\n    bgCellMedium: \"#202027\",\n    bgHeader: \"#212121\",\n    bgHeaderHasFocus: \"#474747\",\n    bgHeaderHovered: \"#404040\",\n\n    bgBubble: \"#212121\",\n    bgBubbleSelected: \"#000000\",\n\n    bgSearchResult: \"#423c24\",\n\n    borderColor: \"rgba(225,225,225,0.2)\",\n    drilldownBorder: \"rgba(225,225,225,0.4)\",\n\n    linkColor: \"#4F5DFF\",\n\n    headerFontStyle: \"bold 14px\",\n    baseFontStyle: \"13px\",\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n};\n\nconst hotdogStand = {\n    accentColor: \"#8c96ff\",\n    accentLight: \"rgba(202, 206, 255, 0.253)\",\n\n    textDark: \"#ffffff\",\n    textMedium: \"rgba(255, 255, 255, 0.9)\",\n    textLight: \"rgba(255, 255, 255, 0.7)\",\n    textBubble: \"#000000\",\n\n    bgIconHeader: \"#880000\",\n    fgIconHeader: \"#ff5555\",\n    textHeader: \"rgba(0, 0, 0, 0.9)\",\n    textHeaderSelected: \"#000000\",\n\n    bgCell: \"#ff0000\",\n    bgCellMedium: \"#ff4d4d\",\n    bgHeader: \"#f3f300\",\n    bgHeaderHasFocus: \"#eeee00\",\n    bgHeaderHovered: \"#e0e000\",\n\n    bgBubble: \"#ffff00\",\n    bgBubbleSelected: \"#ffff00\",\n\n    bgSearchResult: \"#423c24\",\n\n    borderColor: \"#ffff00\",\n    drilldownBorder: \"#ffff00\",\n\n    linkColor: \"#4F5DFF\",\n\n    headerFontStyle: \"bold 14px\",\n    baseFontStyle: \"13px\",\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n    roundingRadius: 6,\n};\n\nexport const ThemeSupport: React.VFC = () => {\n    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();\n\n    const [theme, setTheme] = React.useState<Partial<Theme>>({});\n\n    const [numRows, setNumRows] = React.useState(1000);\n\n    const onRowAppended = React.useCallback(() => {\n        const newRow = numRows;\n        setNumRows(cv => cv + 1);\n        for (let c = 0; c < 6; c++) {\n            setCellValue([c, newRow], {\n                displayData: \"\",\n                data: \"\",\n            } as any);\n        }\n    }, [numRows, setCellValue]);\n\n    return (\n        <BeautifulWrapper\n            title=\"Theme support\"\n            description={\n                <>\n                    <Description>\n                        DataGrid respects the theme provided by the <PropName>theme</PropName> prop.\n                    </Description>\n                    <MoreInfo>\n                        <button onClick={() => setTheme({})}>Light</button> or{\" \"}\n                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{\" \"}\n                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                theme={theme}\n                getCellContent={getCellContent}\n                columns={cols}\n                onRowAppended={onRowAppended}\n                trailingRowOptions={{\n                    tint: true,\n                    sticky: true,\n                }}\n                onCellEdited={setCellValue}\n                onColumnResize={onColumnResize}\n                rows={numRows}\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "theme-support": {
          "startLoc": {
            "col": 39,
            "line": 99
          },
          "endLoc": {
            "col": 1,
            "line": 148
          },
          "startBody": {
            "col": 39,
            "line": 99
          },
          "endBody": {
            "col": 1,
            "line": 148
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
const darkTheme = {
  accentColor: "#8c96ff",
  accentLight: "rgba(202, 206, 255, 0.253)",
  textDark: "#ffffff",
  textMedium: "#b8b8b8",
  textLight: "#a0a0a0",
  textBubble: "#ffffff",
  bgIconHeader: "#b8b8b8",
  fgIconHeader: "#000000",
  textHeader: "#a1a1a1",
  textHeaderSelected: "#000000",
  bgCell: "#16161b",
  bgCellMedium: "#202027",
  bgHeader: "#212121",
  bgHeaderHasFocus: "#474747",
  bgHeaderHovered: "#404040",
  bgBubble: "#212121",
  bgBubbleSelected: "#000000",
  bgSearchResult: "#423c24",
  borderColor: "rgba(225,225,225,0.2)",
  drilldownBorder: "rgba(225,225,225,0.4)",
  linkColor: "#4F5DFF",
  headerFontStyle: "bold 14px",
  baseFontStyle: "13px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"
};
const hotdogStand = {
  accentColor: "#8c96ff",
  accentLight: "rgba(202, 206, 255, 0.253)",
  textDark: "#ffffff",
  textMedium: "rgba(255, 255, 255, 0.9)",
  textLight: "rgba(255, 255, 255, 0.7)",
  textBubble: "#000000",
  bgIconHeader: "#880000",
  fgIconHeader: "#ff5555",
  textHeader: "rgba(0, 0, 0, 0.9)",
  textHeaderSelected: "#000000",
  bgCell: "#ff0000",
  bgCellMedium: "#ff4d4d",
  bgHeader: "#f3f300",
  bgHeaderHasFocus: "#eeee00",
  bgHeaderHovered: "#e0e000",
  bgBubble: "#ffff00",
  bgBubbleSelected: "#ffff00",
  bgSearchResult: "#423c24",
  borderColor: "#ffff00",
  drilldownBorder: "#ffff00",
  linkColor: "#4F5DFF",
  headerFontStyle: "bold 14px",
  baseFontStyle: "13px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  roundingRadius: 6
};
const ThemeSupport = () => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useAllMockedKinds */ .fl)();
  const [theme, setTheme] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});
  const [numRows, setNumRows] = react__WEBPACK_IMPORTED_MODULE_0__.useState(1000);
  const onRowAppended = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const newRow = numRows;
    setNumRows(cv => cv + 1);
    for (let c = 0; c < 6; c++) {
      setCellValue([c, newRow], {
        displayData: "",
        data: ""
      });
    }
  }, [numRows, setCellValue]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Theme support",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["DataGrid respects the theme provided by the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "theme"
        }), " prop."]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          onClick: () => setTheme({}),
          children: "Light"
        }), " or", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          onClick: () => setTheme(darkTheme),
          children: "Dark"
        }), " even", " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          onClick: () => setTheme(hotdogStand),
          children: "Hotdog Stand"
        })]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      theme: theme,
      getCellContent: getCellContent,
      columns: cols,
      onRowAppended: onRowAppended,
      trailingRowOptions: {
        tint: true,
        sticky: true
      },
      onCellEdited: setCellValue,
      onColumnResize: onColumnResize,
      rows: numRows
    })
  });
};
ThemeSupport.displayName = "ThemeSupport";;const __namedExportsOrder = ["ThemeSupport"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-theme-support-stories.747b0db0.iframe.bundle.js.map