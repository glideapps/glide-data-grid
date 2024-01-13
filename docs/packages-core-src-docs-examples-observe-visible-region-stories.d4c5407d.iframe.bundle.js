"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7635],{

/***/ "./packages/core/src/docs/examples/observe-visible-region.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObserveVisibleRegion": () => (/* binding */ ObserveVisibleRegion),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/data-editor/stories/utils.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Rectangle } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ObserveVisibleRegion: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });\n\n    return (\n        <BeautifulWrapper\n            title=\"Observe Visible Region\"\n            description={\n                <>\n                    <Description>\n                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>\n                    </Description>\n                    <MoreInfo>\n                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:\n                        <KeyName>{visibleRegion.y}</KeyName> width:\n                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                rows={1000}\n                onVisibleRegionChanged={setVisibleRegion}\n            />\n        </BeautifulWrapper>\n    );\n};\n";
var __LOCATIONS_MAP__ = {
  "ObserveVisibleRegion": {
    "startLoc": {
      "col": 47,
      "line": 27
    },
    "endLoc": {
      "col": 1,
      "line": 56
    },
    "startBody": {
      "col": 47,
      "line": 27
    },
    "endBody": {
      "col": 1,
      "line": 56
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import React from \"react\";\nimport { DataEditorAll as DataEditor } from \"../../data-editor-all.js\";\nimport {\n    BeautifulWrapper,\n    Description,\n    MoreInfo,\n    PropName,\n    useMockDataGenerator,\n    KeyName,\n    defaultProps,\n} from \"../../data-editor/stories/utils.js\";\nimport type { Rectangle } from \"../../internal/data-grid/data-grid-types.js\";\nimport { SimpleThemeWrapper } from \"../../stories/story-utils.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/DataEditor Demos\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nexport const ObserveVisibleRegion: React.VFC = () => {\n    const { cols, getCellContent } = useMockDataGenerator(100);\n\n    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });\n\n    return (\n        <BeautifulWrapper\n            title=\"Observe Visible Region\"\n            description={\n                <>\n                    <Description>\n                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>\n                    </Description>\n                    <MoreInfo>\n                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:\n                        <KeyName>{visibleRegion.y}</KeyName> width:\n                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>\n                    </MoreInfo>\n                </>\n            }>\n            <DataEditor\n                {...defaultProps}\n                getCellContent={getCellContent}\n                columns={cols}\n                rows={1000}\n                onVisibleRegionChanged={setVisibleRegion}\n            />\n        </BeautifulWrapper>\n    );\n};\n",
      "locationsMap": {
        "observe-visible-region": {
          "startLoc": {
            "col": 47,
            "line": 27
          },
          "endLoc": {
            "col": 1,
            "line": 56
          },
          "startBody": {
            "col": 47,
            "line": 27
          },
          "endBody": {
            "col": 1,
            "line": 56
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
const ObserveVisibleRegion = () => {
  const {
    cols,
    getCellContent
  } = (0,_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .useMockDataGenerator */ .F9)(100);
  const [visibleRegion, setVisibleRegion] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .BeautifulWrapper */ .m, {
    title: "Observe Visible Region",
    description: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .dk, {
        children: ["The visible region can be observed using ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .PropName */ .Gi, {
          children: "onVisibleRegionChanged"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .MoreInfo */ .OX, {
        children: ["Then current visible region is x:", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: visibleRegion.x
        }), " y:", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: visibleRegion.y
        }), " width:", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: visibleRegion.width
        }), " height:", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .KeyName */ .et, {
          children: visibleRegion.height
        })]
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_4__/* .DataEditorAll */ .F, {
      ..._data_editor_stories_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultProps */ .lG,
      getCellContent: getCellContent,
      columns: cols,
      rows: 1000,
      onVisibleRegionChanged: setVisibleRegion
    })
  });
};
ObserveVisibleRegion.displayName = "ObserveVisibleRegion";;const __namedExportsOrder = ["ObserveVisibleRegion"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-examples-observe-visible-region-stories.d4c5407d.iframe.bundle.js.map