"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[1141],{

/***/ "./packages/core/src/docs/examples/tooltips.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltips": () => (/* binding */ Tooltips),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react_laag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-laag/dist/react-laag.esm.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport type { IBounds } from \"react-laag\";\nimport { useLayer } from \"react-laag\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GridMouseEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Tooltips\"\n                    className=\"double\"\n                    description={\n                        <Description>\n                            Using the <PropName>onItemHovered</PropName> event makes it easy to create tooltips. This\n                            story is intentionally forced to scroll vertically so layout in scrolling documents can be\n                            confirmed.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst zeroBounds = {\n    left: 0,\n    top: 0,\n    width: 0,\n    height: 0,\n    bottom: 0,\n    right: 0,\n};\n\nexport const Tooltips: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const [tooltip, setTooltip] = React.useState<{ val: string; bounds: IBounds } | undefined>();\n\n    const timeoutRef = React.useRef(0);\n\n    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {\n        if (args.kind === \"cell\") {\n            window.clearTimeout(timeoutRef.current);\n            setTooltip(undefined);\n            timeoutRef.current = window.setTimeout(() => {\n                setTooltip({\n                    val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,\n                    bounds: {\n                        // translate to react-laag types\n                        left: args.bounds.x,\n                        top: args.bounds.y,\n                        width: args.bounds.width,\n                        height: args.bounds.height,\n                        right: args.bounds.x + args.bounds.width,\n                        bottom: args.bounds.y + args.bounds.height,\n                    },\n                });\n            }, 1000);\n        } else {\n            window.clearTimeout(timeoutRef.current);\n            timeoutRef.current = 0;\n            setTooltip(undefined);\n        }\n    }, []);\n\n    React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);\n\n    const isOpen = tooltip !== undefined;\n    const { renderLayer, layerProps } = useLayer({\n        isOpen,\n        triggerOffset: 4,\n        auto: true,\n        container: \"portal\",\n        trigger: {\n            getBounds: () => tooltip?.bounds ?? zeroBounds,\n        },\n    });\n\n    return (\n        <>\n            <DataEditor\n                {...defaultProps}\n                onItemHovered={onItemHovered}\n                getCellContent={getCellContent}\n                columns={cols}\n                rowMarkers=\"both\"\n                rows={1000}\n            />\n            {isOpen &&\n                renderLayer(\n                    <div\n                        {...layerProps}\n                        style={{\n                            ...layerProps.style,\n                            padding: \"8px 12px\",\n                            color: \"white\",\n                            font: \"500 13px Inter\",\n                            backgroundColor: \"rgba(0, 0, 0, 0.85)\",\n                            borderRadius: 9,\n                        }}>\n                        {tooltip.val}\n                    </div>\n                )}\n        </>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "Tooltips": {
    "startLoc": {
      "col": 35,
      "line": 47
    },
    "endLoc": {
      "col": 1,
      "line": 119
    },
    "startBody": {
      "col": 35,
      "line": 47
    },
    "endBody": {
      "col": 1,
      "line": 119
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport type { IBounds } from \"react-laag\";\nimport { useLayer } from \"react-laag\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    PropName,\n    useMockDataGenerator,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\nimport type { GridMouseEventArgs } from \"../../internal/data-grid/event-args.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <BeautifulWrapper\n                    title=\"Tooltips\"\n                    className=\"double\"\n                    description={\n                        <Description>\n                            Using the <PropName>onItemHovered</PropName> event makes it easy to create tooltips. This\n                            story is intentionally forced to scroll vertically so layout in scrolling documents can be\n                            confirmed.\n                        </Description>\n                    }>\n                    <Story />\n                </BeautifulWrapper>\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst zeroBounds = {\n    left: 0,\n    top: 0,\n    width: 0,\n    height: 0,\n    bottom: 0,\n    right: 0,\n};\n\nexport const Tooltips: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(6);\n\n    const [tooltip, setTooltip] = React.useState<{ val: string; bounds: IBounds } | undefined>();\n\n    const timeoutRef = React.useRef(0);\n\n    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {\n        if (args.kind === \"cell\") {\n            window.clearTimeout(timeoutRef.current);\n            setTooltip(undefined);\n            timeoutRef.current = window.setTimeout(() => {\n                setTooltip({\n                    val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,\n                    bounds: {\n                        // translate to react-laag types\n                        left: args.bounds.x,\n                        top: args.bounds.y,\n                        width: args.bounds.width,\n                        height: args.bounds.height,\n                        right: args.bounds.x + args.bounds.width,\n                        bottom: args.bounds.y + args.bounds.height,\n                    },\n                });\n            }, 1000);\n        } else {\n            window.clearTimeout(timeoutRef.current);\n            timeoutRef.current = 0;\n            setTooltip(undefined);\n        }\n    }, []);\n\n    React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);\n\n    const isOpen = tooltip !== undefined;\n    const { renderLayer, layerProps } = useLayer({\n        isOpen,\n        triggerOffset: 4,\n        auto: true,\n        container: \"portal\",\n        trigger: {\n            getBounds: () => tooltip?.bounds ?? zeroBounds,\n        },\n    });\n\n    return (\n        <>\n            <DataEditor\n                {...defaultProps}\n                onItemHovered={onItemHovered}\n                getCellContent={getCellContent}\n                columns={cols}\n                rowMarkers=\"both\"\n                rows={1000}\n            />\n            {isOpen &&\n                renderLayer(\n                    <div\n                        {...layerProps}\n                        style={{\n                            ...layerProps.style,\n                            padding: \"8px 12px\",\n                            color: \"white\",\n                            font: \"500 13px Inter\",\n                            backgroundColor: \"rgba(0, 0, 0, 0.85)\",\n                            borderRadius: 9,\n                        }}>\n                        {tooltip.val}\n                    </div>\n                )}\n        </>\n    );\n};\n",
      "locationsMap": {
        "tooltips": {
          "startLoc": {
            "col": 35,
            "line": 47
          },
          "endLoc": {
            "col": 1,
            "line": 119
          },
          "startBody": {
            "col": 35,
            "line": 47
          },
          "endBody": {
            "col": 1,
            "line": 119
          }
        }
      }
    }
  },
  title: "Glide-Data-Grid/DataEditor Demos",
  decorators: [Story => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .SimpleThemeWrapper */ .X, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
      title: "Tooltips",
      className: "double",
      description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["Using the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onItemHovered"
        }), " event makes it easy to create tooltips. This story is intentionally forced to scroll vertically so layout in scrolling documents can be confirmed."]
      }),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {})
    })
  })]
});
const zeroBounds = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0
};
const Tooltips = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(6);
  const [tooltip, setTooltip] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const timeoutRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
  const onItemHovered = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(args => {
    if (args.kind === "cell") {
      window.clearTimeout(timeoutRef.current);
      setTooltip(undefined);
      timeoutRef.current = window.setTimeout(() => {
        setTooltip({
          val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,
          bounds: {
            left: args.bounds.x,
            top: args.bounds.y,
            width: args.bounds.width,
            height: args.bounds.height,
            right: args.bounds.x + args.bounds.width,
            bottom: args.bounds.y + args.bounds.height
          }
        });
      }, 1000);
    } else {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
      setTooltip(undefined);
    }
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
  const isOpen = tooltip !== undefined;
  const {
    renderLayer,
    layerProps
  } = (0,react_laag__WEBPACK_IMPORTED_MODULE_4__/* .useLayer */ .sJ)({
    isOpen,
    triggerOffset: 4,
    auto: true,
    container: "portal",
    trigger: {
      getBounds: () => {
        var _tooltip$bounds;
        return (_tooltip$bounds = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bounds) !== null && _tooltip$bounds !== void 0 ? _tooltip$bounds : zeroBounds;
      }
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      onItemHovered: onItemHovered,
      getCellContent: getCellContent,
      columns: cols,
      rowMarkers: "both",
      rows: 1000
    }), isOpen && renderLayer((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...layerProps,
      style: {
        ...layerProps.style,
        padding: "8px 12px",
        color: "white",
        font: "500 13px Inter",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        borderRadius: 9
      },
      children: tooltip.val
    }))]
  });
};;const __namedExportsOrder = ["Tooltips"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-tooltips-stories.1745967b.iframe.bundle.js.map