"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7387],{

/***/ "./packages/core/src/docs/09-menus.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menus": () => (/* binding */ Menus),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_laag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-laag/dist/react-laag.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport {\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Item,\n    type Rectangle,\n} from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\nimport { useLayer } from \"react-laag\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const Menus: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n                hasMenu: true,\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n                hasMenu: true,\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n                hasMenu: true,\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n                hasMenu: true,\n            },\n        ];\n    }, []);\n\n    const onHeaderMenuClickedStage1 = React.useCallback((col: number, position: Rectangle) => {\n        window.alert(\"Header menu clicked \" + col + JSON.stringify(position));\n    }, []);\n\n    const [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();\n\n    const onHeaderMenuClickedStage2 = React.useCallback((col: number, bounds: Rectangle) => {\n        setShowMenu({ col, bounds });\n    }, []);\n\n    const { renderLayer, layerProps } = useLayer({\n        isOpen: showMenu !== undefined,\n        triggerOffset: 4,\n        onOutsideClick: () => setShowMenu(undefined),\n        trigger: {\n            getBounds: () => ({\n                bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),\n                height: showMenu?.bounds.height ?? 0,\n                left: showMenu?.bounds.x ?? 0,\n                right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),\n                top: showMenu?.bounds.y ?? 0,\n                width: showMenu?.bounds.width ?? 0,\n            }),\n        },\n        placement: \"bottom-start\",\n        auto: true,\n        possiblePlacements: [\"bottom-start\", \"bottom-end\"],\n    });\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Menus\n\nGlide Data Grid doesn't come with built in menus. Instead it is evented and ready to work with whatever menus you want \nto use. Let's learn how to add basic menus using [react-laag](https://www.react-laag.com/). Adding menu drop down indicators to headers is as simple\nas passing a bool and listening to click events using \\`onHeaderMenuClick\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns = React.useMemo<GridColumn[]>(() => {\n    return [\n        {\n            title: \"Name\",\n            id: \"name\",\n            hasMenu: true,\n        },\n        {\n            title: \"Company\",\n            id: \"company\",\n            hasMenu: true,\n        },\n        {\n            title: \"Email\",\n            id: \"email\",\n            hasMenu: true,\n        },\n        {\n            title: \"Phone\",\n            id: \"phone\",\n            hasMenu: true,\n        },\n    ];\n}, []);\n\nconst onHeaderMenuClick = React.useCallback((col: number, position: Rectangle) => {\n    window.alert(\"Header menu clicked \" + col + JSON.stringify(position));\n}, []);\n\nreturn <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                    onHeaderMenuClick={onHeaderMenuClickedStage1}\n                />\n            </Wrapper>\n            <Marked>\n                {`\nThe provided coordinates are in page space. This makes it trivial to use [react-laag](https://www.react-laag.com/) to create a basic menu. Some \nstyling would go a long way here.`}\n            </Marked>\n            <Highlight>\n                {`\nconst [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();\n\nconst onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {\n    setShowMenu({ col, bounds });\n}, []);\n\nconst { renderLayer, layerProps } = useLayer({\n    isOpen: showMenu !== undefined,\n    triggerOffset: 4,\n    onOutsideClick: () => setShowMenu(undefined),\n    trigger: {\n        getBounds: () => ({\n            bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),\n            height: showMenu?.bounds.height ?? 0,\n            left: showMenu?.bounds.x ?? 0,\n            right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),\n            top: showMenu?.bounds.y ?? 0,\n            width: showMenu?.bounds.width ?? 0,\n        }),\n    },\n    placement: \"bottom-start\",\n    auto: true,\n    possiblePlacements: [\"bottom-start\", \"bottom-end\"],\n    });\n\nreturn <>\n    <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />\n    {showMenu !== undefined &&\n        renderLayer(\n            <div\n                {...layerProps}\n                style={{\n                    ...layerProps.style,\n                    width: 300,\n                    padding: 4,\n                    borderRadius: 8,\n                    backgroundColor: \"white\",\n                    border: \"1px solid black\",\n                }}>\n                <ul>\n                    <li>Item 1</li>\n                    <li>Item 2</li>\n                    <li>Item 3</li>\n                </ul>\n            </div>\n        )}\n</>;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                    onHeaderMenuClick={onHeaderMenuClickedStage2}\n                />\n                {showMenu !== undefined &&\n                    renderLayer(\n                        <div\n                            {...layerProps}\n                            style={{\n                                ...layerProps.style,\n                                width: 300,\n                                padding: 4,\n                                borderRadius: 8,\n                                backgroundColor: \"white\",\n                                border: \"1px solid black\",\n                            }}>\n                            <ul>\n                                <li>Item 1</li>\n                                <li>Item 2</li>\n                                <li>Item 3</li>\n                            </ul>\n                        </div>\n                    )}\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(Menus as any).storyName = \"09. Menus\";\n";
var __LOCATIONS_MAP__ = {
  "Menus": {
    "startLoc": {
      "col": 32,
      "line": 138
    },
    "endLoc": {
      "col": 1,
      "line": 343
    },
    "startBody": {
      "col": 32,
      "line": 138
    },
    "endBody": {
      "col": 1,
      "line": 343
    }
  }
};








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport {\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Item,\n    type Rectangle,\n} from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\nimport { useLayer } from \"react-laag\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const Menus: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n                hasMenu: true,\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n                hasMenu: true,\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n                hasMenu: true,\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n                hasMenu: true,\n            },\n        ];\n    }, []);\n\n    const onHeaderMenuClickedStage1 = React.useCallback((col: number, position: Rectangle) => {\n        window.alert(\"Header menu clicked \" + col + JSON.stringify(position));\n    }, []);\n\n    const [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();\n\n    const onHeaderMenuClickedStage2 = React.useCallback((col: number, bounds: Rectangle) => {\n        setShowMenu({ col, bounds });\n    }, []);\n\n    const { renderLayer, layerProps } = useLayer({\n        isOpen: showMenu !== undefined,\n        triggerOffset: 4,\n        onOutsideClick: () => setShowMenu(undefined),\n        trigger: {\n            getBounds: () => ({\n                bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),\n                height: showMenu?.bounds.height ?? 0,\n                left: showMenu?.bounds.x ?? 0,\n                right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),\n                top: showMenu?.bounds.y ?? 0,\n                width: showMenu?.bounds.width ?? 0,\n            }),\n        },\n        placement: \"bottom-start\",\n        auto: true,\n        possiblePlacements: [\"bottom-start\", \"bottom-end\"],\n    });\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Menus\n\nGlide Data Grid doesn't come with built in menus. Instead it is evented and ready to work with whatever menus you want \nto use. Let's learn how to add basic menus using [react-laag](https://www.react-laag.com/). Adding menu drop down indicators to headers is as simple\nas passing a bool and listening to click events using \\`onHeaderMenuClick\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns = React.useMemo<GridColumn[]>(() => {\n    return [\n        {\n            title: \"Name\",\n            id: \"name\",\n            hasMenu: true,\n        },\n        {\n            title: \"Company\",\n            id: \"company\",\n            hasMenu: true,\n        },\n        {\n            title: \"Email\",\n            id: \"email\",\n            hasMenu: true,\n        },\n        {\n            title: \"Phone\",\n            id: \"phone\",\n            hasMenu: true,\n        },\n    ];\n}, []);\n\nconst onHeaderMenuClick = React.useCallback((col: number, position: Rectangle) => {\n    window.alert(\"Header menu clicked \" + col + JSON.stringify(position));\n}, []);\n\nreturn <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                    onHeaderMenuClick={onHeaderMenuClickedStage1}\n                />\n            </Wrapper>\n            <Marked>\n                {`\nThe provided coordinates are in page space. This makes it trivial to use [react-laag](https://www.react-laag.com/) to create a basic menu. Some \nstyling would go a long way here.`}\n            </Marked>\n            <Highlight>\n                {`\nconst [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();\n\nconst onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {\n    setShowMenu({ col, bounds });\n}, []);\n\nconst { renderLayer, layerProps } = useLayer({\n    isOpen: showMenu !== undefined,\n    triggerOffset: 4,\n    onOutsideClick: () => setShowMenu(undefined),\n    trigger: {\n        getBounds: () => ({\n            bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),\n            height: showMenu?.bounds.height ?? 0,\n            left: showMenu?.bounds.x ?? 0,\n            right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),\n            top: showMenu?.bounds.y ?? 0,\n            width: showMenu?.bounds.width ?? 0,\n        }),\n    },\n    placement: \"bottom-start\",\n    auto: true,\n    possiblePlacements: [\"bottom-start\", \"bottom-end\"],\n    });\n\nreturn <>\n    <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />\n    {showMenu !== undefined &&\n        renderLayer(\n            <div\n                {...layerProps}\n                style={{\n                    ...layerProps.style,\n                    width: 300,\n                    padding: 4,\n                    borderRadius: 8,\n                    backgroundColor: \"white\",\n                    border: \"1px solid black\",\n                }}>\n                <ul>\n                    <li>Item 1</li>\n                    <li>Item 2</li>\n                    <li>Item 3</li>\n                </ul>\n            </div>\n        )}\n</>;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                    onHeaderMenuClick={onHeaderMenuClickedStage2}\n                />\n                {showMenu !== undefined &&\n                    renderLayer(\n                        <div\n                            {...layerProps}\n                            style={{\n                                ...layerProps.style,\n                                width: 300,\n                                padding: 4,\n                                borderRadius: 8,\n                                backgroundColor: \"white\",\n                                border: \"1px solid black\",\n                            }}>\n                            <ul>\n                                <li>Item 1</li>\n                                <li>Item 2</li>\n                                <li>Item 3</li>\n                            </ul>\n                        </div>\n                    )}\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(Menus as any).storyName = \"09. Menus\";\n",
      "locationsMap": {
        "menus": {
          "startLoc": {
            "col": 32,
            "line": 138
          },
          "endLoc": {
            "col": 1,
            "line": 343
          },
          "startBody": {
            "col": 32,
            "line": 138
          },
          "endBody": {
            "col": 1,
            "line": 343
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
const data = [{
  name: "Deidre Morris",
  company: "GONKLE",
  email: "deidremorris@gonkle.com",
  phone: "+1 (867) 507-3332"
}, {
  name: "Sheryl Craig",
  company: "EVENTAGE",
  email: "sherylcraig@eventage.com",
  phone: "+1 (869) 520-2227"
}, {
  name: "Lidia Bowers",
  company: "ANOCHA",
  email: "lidiabowers@anocha.com",
  phone: "+1 (808) 414-3826"
}, {
  name: "Jones Norton",
  company: "REPETWIRE",
  email: "jonesnorton@repetwire.com",
  phone: "+1 (875) 582-3320"
}, {
  name: "Lula Bruce",
  company: "COMDOM",
  email: "lulabruce@comdom.com",
  phone: "+1 (873) 452-2472"
}, {
  name: "Larsen Montgomery",
  company: "SQUISH",
  email: "larsenmontgomery@squish.com",
  phone: "+1 (893) 482-3651"
}, {
  name: "Becky Bright",
  company: "COMCUR",
  email: "beckybright@comcur.com",
  phone: "+1 (879) 494-2331"
}, {
  name: "Charlotte Rowland",
  company: "FROLIX",
  email: "charlotterowland@frolix.com",
  phone: "+1 (861) 439-2134"
}, {
  name: "Sonya Hensley",
  company: "GEEKETRON",
  email: "sonyahensley@geeketron.com",
  phone: "+1 (802) 553-2194"
}, {
  name: "Stephenson Guthrie",
  company: "EXOSWITCH",
  email: "stephensonguthrie@exoswitch.com",
  phone: "+1 (903) 449-3271"
}, {
  name: "Mcmillan Cline",
  company: "TURNLING",
  email: "mcmillancline@turnling.com",
  phone: "+1 (982) 496-2454"
}, {
  name: "Kemp Davis",
  company: "TETRATREX",
  email: "kempdavis@tetratrex.com",
  phone: "+1 (859) 594-2982"
}, {
  name: "Matilda Levy",
  company: "SLOFAST",
  email: "matildalevy@slofast.com",
  phone: "+1 (841) 521-2444"
}, {
  name: "Hattie Simpson",
  company: "COMTRAK",
  email: "hattiesimpson@comtrak.com",
  phone: "+1 (962) 587-3805"
}, {
  name: "Kinney Munoz",
  company: "IDETICA",
  email: "kinneymunoz@idetica.com",
  phone: "+1 (921) 513-2012"
}, {
  name: "Lambert Raymond",
  company: "TURNABOUT",
  email: "lambertraymond@turnabout.com",
  phone: "+1 (919) 519-2442"
}, {
  name: "Bryant Dunlap",
  company: "BYTREX",
  email: "bryantdunlap@bytrex.com",
  phone: "+1 (872) 583-2883"
}];
const Menus = () => {
  const getContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return [{
      title: "Name",
      id: "name",
      hasMenu: true
    }, {
      title: "Company",
      id: "company",
      hasMenu: true
    }, {
      title: "Email",
      id: "email",
      hasMenu: true
    }, {
      title: "Phone",
      id: "phone",
      hasMenu: true
    }];
  }, []);
  const onHeaderMenuClickedStage1 = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((col, position) => {
    window.alert("Header menu clicked " + col + JSON.stringify(position));
  }, []);
  const [showMenu, setShowMenu] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const onHeaderMenuClickedStage2 = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((col, bounds) => {
    setShowMenu({
      col,
      bounds
    });
  }, []);
  const {
    renderLayer,
    layerProps
  } = (0,react_laag__WEBPACK_IMPORTED_MODULE_4__/* .useLayer */ .sJ)({
    isOpen: showMenu !== undefined,
    triggerOffset: 4,
    onOutsideClick: () => setShowMenu(undefined),
    trigger: {
      getBounds: () => {
        var _showMenu$bounds$y, _showMenu$bounds$heig, _showMenu$bounds$heig2, _showMenu$bounds$x, _showMenu$bounds$x2, _showMenu$bounds$widt, _showMenu$bounds$y2, _showMenu$bounds$widt2;
        return {
          bottom: ((_showMenu$bounds$y = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.y) !== null && _showMenu$bounds$y !== void 0 ? _showMenu$bounds$y : 0) + ((_showMenu$bounds$heig = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.height) !== null && _showMenu$bounds$heig !== void 0 ? _showMenu$bounds$heig : 0),
          height: (_showMenu$bounds$heig2 = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.height) !== null && _showMenu$bounds$heig2 !== void 0 ? _showMenu$bounds$heig2 : 0,
          left: (_showMenu$bounds$x = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.x) !== null && _showMenu$bounds$x !== void 0 ? _showMenu$bounds$x : 0,
          right: ((_showMenu$bounds$x2 = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.x) !== null && _showMenu$bounds$x2 !== void 0 ? _showMenu$bounds$x2 : 0) + ((_showMenu$bounds$widt = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.width) !== null && _showMenu$bounds$widt !== void 0 ? _showMenu$bounds$widt : 0),
          top: (_showMenu$bounds$y2 = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.y) !== null && _showMenu$bounds$y2 !== void 0 ? _showMenu$bounds$y2 : 0,
          width: (_showMenu$bounds$widt2 = showMenu === null || showMenu === void 0 ? void 0 : showMenu.bounds.width) !== null && _showMenu$bounds$widt2 !== void 0 ? _showMenu$bounds$widt2 : 0
        };
      }
    },
    placement: "bottom-start",
    auto: true,
    possiblePlacements: ["bottom-start", "bottom-end"]
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .DocWrapper */ .kT, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Marked */ .M2, {
      children: `
# Menus

Glide Data Grid doesn't come with built in menus. Instead it is evented and ready to work with whatever menus you want 
to use. Let's learn how to add basic menus using [react-laag](https://www.react-laag.com/). Adding menu drop down indicators to headers is as simple
as passing a bool and listening to click events using \`onHeaderMenuClick\`.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Highlight */ .y$, {
      children: `
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
            hasMenu: true,
        },
        {
            title: "Company",
            id: "company",
            hasMenu: true,
        },
        {
            title: "Email",
            id: "email",
            hasMenu: true,
        },
        {
            title: "Phone",
            id: "phone",
            hasMenu: true,
        },
    ];
}, []);

const onHeaderMenuClick = React.useCallback((col: number, position: Rectangle) => {
    window.alert("Header menu clicked " + col + JSON.stringify(position));
}, []);

return <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />;
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__/* .DataEditorAll */ .F, {
        getCellContent: getContent,
        columns: columns,
        rows: data.length,
        onHeaderMenuClick: onHeaderMenuClickedStage1
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Marked */ .M2, {
      children: `
The provided coordinates are in page space. This makes it trivial to use [react-laag](https://www.react-laag.com/) to create a basic menu. Some 
styling would go a long way here.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Highlight */ .y$, {
      children: `
const [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();

const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setShowMenu({ col, bounds });
}, []);

const { renderLayer, layerProps } = useLayer({
    isOpen: showMenu !== undefined,
    triggerOffset: 4,
    onOutsideClick: () => setShowMenu(undefined),
    trigger: {
        getBounds: () => ({
            bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),
            height: showMenu?.bounds.height ?? 0,
            left: showMenu?.bounds.x ?? 0,
            right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),
            top: showMenu?.bounds.y ?? 0,
            width: showMenu?.bounds.width ?? 0,
        }),
    },
    placement: "bottom-start",
    auto: true,
    possiblePlacements: ["bottom-start", "bottom-end"],
    });

return <>
    <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />
    {showMenu !== undefined &&
        renderLayer(
            <div
                {...layerProps}
                style={{
                    ...layerProps.style,
                    width: 300,
                    padding: 4,
                    borderRadius: 8,
                    backgroundColor: "white",
                    border: "1px solid black",
                }}>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        )}
</>;
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_5__/* .Wrapper */ .im, {
      height: 200,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_6__/* .DataEditorAll */ .F, {
        getCellContent: getContent,
        columns: columns,
        rows: data.length,
        onHeaderMenuClick: onHeaderMenuClickedStage2
      }), showMenu !== undefined && renderLayer((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        ...layerProps,
        style: {
          ...layerProps.style,
          width: 300,
          padding: 4,
          borderRadius: 8,
          backgroundColor: "white",
          border: "1px solid black"
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
            children: "Item 1"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
            children: "Item 2"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
            children: "Item 3"
          })]
        })
      }))]
    })]
  });
};
Menus.displayName = "Menus";
Menus.storyName = "09. Menus";;const __namedExportsOrder = ["Menus"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-09-menus-stories.34a1eabe.iframe.bundle.js.map