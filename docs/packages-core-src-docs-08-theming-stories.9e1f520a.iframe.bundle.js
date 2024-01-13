"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[9237],{

/***/ "./packages/core/src/docs/08-theming.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Theming": () => (/* binding */ Theming),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\nimport type { Theme } from \"../common/styles.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const Theming: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const getContentThemed = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n\n        let theme: Partial<Theme> | undefined = undefined;\n\n        if (col === 1 && row === 1) {\n            theme = {\n                textDark: \"#FF0000\",\n            };\n        }\n\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n            themeOverride: theme,\n        };\n    }, []);\n\n    const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {\n        if (row % 2 === 0) {\n            return {\n                bgCell: \"#F9FDFF\",\n            };\n        }\n        return undefined;\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    const themeColumns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                themeOverride: {\n                    textDark: \"#225588\",\n                    baseFontStyle: \"600 13px\",\n                },\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Theming\n\nTheming the Glide Data Grid is a cascaded through 5 levels\n\n0. Default theme\n1. Global\n2. Group\n3. Column\n4. Row\n5. Cell\n\nAt each level parts of the theme can be overridden. This example will pro\n\n## Global Theming\n\nThe global theme is provided by the DataEditor by default and can be overriden by setting the \\`theme\\` prop. All themes contain the following properties.\n\n| Property | CSS Variable | Type | Description |\n|---|---|---|----|\n| accentColor | --gdg-accent-color | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |\n| accentFg | --gdg-accent-fg | string | A foreground color which works well on top of the accent color. |\n| accentLight | --gdg-accent-light | string | A lighter version of the accent color used to hint selection. |\n| textDark | --gdg-text-dark | string | The standard text color. |\n| textMedium | --gdg-text-medium | string | A lighter text color used for non-editable data in some cases. |\n| textLight | --gdg-text-light | string | An even lighter text color |\n| textBubble | --gdg-text-bubble | string | The text color used in bubbles |\n| bgIconHeader | --gdg-bg-icon-header | string | The background color for header icons |\n| fgIconHeader | --gdg-fg-icon-header | string | The foreground color for header icons |\n| textHeader | --gdg-text-header | string | The header text color |\n| textGroupHeader | --gdg-text-group-header | string \\\\| undefined | The group header text color, if none provided the \\`textHeader\\` is used instead. |\n| textHeaderSelected | --gdg-text-header-selected | string | The text color used for selected headers |\n| bgCell | --gdg-bg-cell | string | The primary background color of the data grid. |\n| bgCellMedium | --gdg-bg-cell-medium | string | Used for disabled or otherwise off colored cells. |\n| bgHeader | --gdg-bg-header | string | The header background color |\n| bgHeaderHasFocus | --gdg-bg-header-has | string | The header background color when its column contains the selected cell |\n| bgHeaderHovered | --gdg-bg-header-hovered | string | The header background color when it is hovered |\n| bgBubble | --gdg-bg-bubble | string | The background color used in bubbles |\n| bgBubbleSelected | --gdg-bg-bubble-selected | string | The background color used in bubbles when the cell is selected |\n| bgSearchResult | --gdg-bg-search-result | string | The background color used for cells which match the search string |\n| borderColor | --gdg-border-color | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |\n| horizontalBorderColor | --gdg-horizontal-border-color | string \\\\| undefined | The horizontal border color override |\n| drilldownBorder | --gdg-drilldown-border | string | The ring color of a drilldown cell |\n| linkColor | --gdg-link-color | string | What color to render links |\n| cellHorizontalPadding | --gdg-cell-horizontal-padding | number | The internal horizontal padding size of a cell. |\n| cellVerticalPadding | --gdg-cell-vertical-padding | number | The internal vertical padding size of a cell. |\n| headerFontStyle | --gdg-header-font-style | string | The font style of the header. e.g. \\`bold 15px\\` |\n| baseFontStyle | --gdg-base-font-style | string | The font style used for cells by default, e.g. \\`13px\\` |\n| fontFamily | --gdg-font-family | string | The font family used by the data grid. |\n| editorFontSize | --gdg-editor-font-size | string | The font size used by overlay editors. |\n| lineHeight | None | number | A unitless scaler which defines the height of a line of text relative to the ink size. |\n\nIf an option is missing from any theme it will be filled in with the default theme.\n`}\n            </Marked>\n            <Highlight>\n                {`\nreturn <DataEditor \n        theme={{\n          bgCell: \"#F2F9FF\"\n        }} \n        getCellContent={getContent} columns={columns} rows={data.length} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>\n                {`### Column themes\nThemes can be applied at the column level as well by setting the \\`themeOverride\\` on the \\`GridColumn\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns = React.useMemo<GridColumn[]>(() => {\n    return [\n        {\n            title: \"Name\",\n            id: \"name\",\n        },\n        {\n            title: \"Company\",\n            themeOverride: {\n                textDark: \"#225588\",\n                baseFontStyle: \"600 13px\",\n            },\n            id: \"company\",\n        },\n        {\n            title: \"Email\",\n            id: \"email\",\n        },\n        {\n            title: \"Phone\",\n            id: \"phone\",\n        },\n    ];\n}, []);\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getCellContent={getContent}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>{`### Row themes`}</Marked>\n            <Highlight>\n                {`\nconst getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {\n    if (row % 2 === 0) {\n        return {\n            bgCell: \"#F9FDFF\"\n        }\n    }\n    return undefined;\n}, []);\n\nreturn <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getRowThemeOverride={getRowThemeOverride}\n                    getCellContent={getContent}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>{`### Cell themes`}</Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    let theme: Partial<Theme> | undefined = undefined;\n    if (col === 1 && row === 1) {\n        theme = {\n            textDark: \"#FF0000\",\n        }\n    }\n    \n    const d = getDataForCell(col, row);\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        displayData: d,\n        data: d,\n        themeOverride: theme\n    };\n}, []);\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getRowThemeOverride={getRowThemeOverride}\n                    getCellContent={getContentThemed}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(Theming as any).storyName = \"08. Theming\";\n";
var __LOCATIONS_MAP__ = {
  "Theming": {
    "startLoc": {
      "col": 34,
      "line": 132
    },
    "endLoc": {
      "col": 1,
      "line": 404
    },
    "startBody": {
      "col": 34,
      "line": 132
    },
    "endBody": {
      "col": 1,
      "line": 404
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\nimport type { Theme } from \"../common/styles.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const Theming: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const getContentThemed = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n\n        let theme: Partial<Theme> | undefined = undefined;\n\n        if (col === 1 && row === 1) {\n            theme = {\n                textDark: \"#FF0000\",\n            };\n        }\n\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n            themeOverride: theme,\n        };\n    }, []);\n\n    const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {\n        if (row % 2 === 0) {\n            return {\n                bgCell: \"#F9FDFF\",\n            };\n        }\n        return undefined;\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    const themeColumns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                themeOverride: {\n                    textDark: \"#225588\",\n                    baseFontStyle: \"600 13px\",\n                },\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Theming\n\nTheming the Glide Data Grid is a cascaded through 5 levels\n\n0. Default theme\n1. Global\n2. Group\n3. Column\n4. Row\n5. Cell\n\nAt each level parts of the theme can be overridden. This example will pro\n\n## Global Theming\n\nThe global theme is provided by the DataEditor by default and can be overriden by setting the \\`theme\\` prop. All themes contain the following properties.\n\n| Property | CSS Variable | Type | Description |\n|---|---|---|----|\n| accentColor | --gdg-accent-color | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |\n| accentFg | --gdg-accent-fg | string | A foreground color which works well on top of the accent color. |\n| accentLight | --gdg-accent-light | string | A lighter version of the accent color used to hint selection. |\n| textDark | --gdg-text-dark | string | The standard text color. |\n| textMedium | --gdg-text-medium | string | A lighter text color used for non-editable data in some cases. |\n| textLight | --gdg-text-light | string | An even lighter text color |\n| textBubble | --gdg-text-bubble | string | The text color used in bubbles |\n| bgIconHeader | --gdg-bg-icon-header | string | The background color for header icons |\n| fgIconHeader | --gdg-fg-icon-header | string | The foreground color for header icons |\n| textHeader | --gdg-text-header | string | The header text color |\n| textGroupHeader | --gdg-text-group-header | string \\\\| undefined | The group header text color, if none provided the \\`textHeader\\` is used instead. |\n| textHeaderSelected | --gdg-text-header-selected | string | The text color used for selected headers |\n| bgCell | --gdg-bg-cell | string | The primary background color of the data grid. |\n| bgCellMedium | --gdg-bg-cell-medium | string | Used for disabled or otherwise off colored cells. |\n| bgHeader | --gdg-bg-header | string | The header background color |\n| bgHeaderHasFocus | --gdg-bg-header-has | string | The header background color when its column contains the selected cell |\n| bgHeaderHovered | --gdg-bg-header-hovered | string | The header background color when it is hovered |\n| bgBubble | --gdg-bg-bubble | string | The background color used in bubbles |\n| bgBubbleSelected | --gdg-bg-bubble-selected | string | The background color used in bubbles when the cell is selected |\n| bgSearchResult | --gdg-bg-search-result | string | The background color used for cells which match the search string |\n| borderColor | --gdg-border-color | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |\n| horizontalBorderColor | --gdg-horizontal-border-color | string \\\\| undefined | The horizontal border color override |\n| drilldownBorder | --gdg-drilldown-border | string | The ring color of a drilldown cell |\n| linkColor | --gdg-link-color | string | What color to render links |\n| cellHorizontalPadding | --gdg-cell-horizontal-padding | number | The internal horizontal padding size of a cell. |\n| cellVerticalPadding | --gdg-cell-vertical-padding | number | The internal vertical padding size of a cell. |\n| headerFontStyle | --gdg-header-font-style | string | The font style of the header. e.g. \\`bold 15px\\` |\n| baseFontStyle | --gdg-base-font-style | string | The font style used for cells by default, e.g. \\`13px\\` |\n| fontFamily | --gdg-font-family | string | The font family used by the data grid. |\n| editorFontSize | --gdg-editor-font-size | string | The font size used by overlay editors. |\n| lineHeight | None | number | A unitless scaler which defines the height of a line of text relative to the ink size. |\n\nIf an option is missing from any theme it will be filled in with the default theme.\n`}\n            </Marked>\n            <Highlight>\n                {`\nreturn <DataEditor \n        theme={{\n          bgCell: \"#F2F9FF\"\n        }} \n        getCellContent={getContent} columns={columns} rows={data.length} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getCellContent={getContent}\n                    columns={columns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>\n                {`### Column themes\nThemes can be applied at the column level as well by setting the \\`themeOverride\\` on the \\`GridColumn\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns = React.useMemo<GridColumn[]>(() => {\n    return [\n        {\n            title: \"Name\",\n            id: \"name\",\n        },\n        {\n            title: \"Company\",\n            themeOverride: {\n                textDark: \"#225588\",\n                baseFontStyle: \"600 13px\",\n            },\n            id: \"company\",\n        },\n        {\n            title: \"Email\",\n            id: \"email\",\n        },\n        {\n            title: \"Phone\",\n            id: \"phone\",\n        },\n    ];\n}, []);\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getCellContent={getContent}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>{`### Row themes`}</Marked>\n            <Highlight>\n                {`\nconst getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {\n    if (row % 2 === 0) {\n        return {\n            bgCell: \"#F9FDFF\"\n        }\n    }\n    return undefined;\n}, []);\n\nreturn <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getRowThemeOverride={getRowThemeOverride}\n                    getCellContent={getContent}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n            <Marked>{`### Cell themes`}</Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    let theme: Partial<Theme> | undefined = undefined;\n    if (col === 1 && row === 1) {\n        theme = {\n            textDark: \"#FF0000\",\n        }\n    }\n    \n    const d = getDataForCell(col, row);\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        displayData: d,\n        data: d,\n        themeOverride: theme\n    };\n}, []);\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    theme={{\n                        bgCell: \"#F2F9FF\",\n                    }}\n                    getRowThemeOverride={getRowThemeOverride}\n                    getCellContent={getContentThemed}\n                    columns={themeColumns}\n                    rows={data.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(Theming as any).storyName = \"08. Theming\";\n",
      "locationsMap": {
        "theming": {
          "startLoc": {
            "col": 34,
            "line": 132
          },
          "endLoc": {
            "col": 1,
            "line": 404
          },
          "startBody": {
            "col": 34,
            "line": 132
          },
          "endBody": {
            "col": 1,
            "line": 404
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
const Theming = () => {
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
  const getContentThemed = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    let theme = undefined;
    if (col === 1 && row === 1) {
      theme = {
        textDark: "#FF0000"
      };
    }
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      displayData: d,
      data: d,
      themeOverride: theme
    };
  }, []);
  const getRowThemeOverride = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(row => {
    if (row % 2 === 0) {
      return {
        bgCell: "#F9FDFF"
      };
    }
    return undefined;
  }, []);
  const columns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      id: "company"
    }, {
      title: "Email",
      id: "email"
    }, {
      title: "Phone",
      id: "phone"
    }];
  }, []);
  const themeColumns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      themeOverride: {
        textDark: "#225588",
        baseFontStyle: "600 13px"
      },
      id: "company"
    }, {
      title: "Email",
      id: "email"
    }, {
      title: "Phone",
      id: "phone"
    }];
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .DocWrapper */ .kT, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Theming

Theming the Glide Data Grid is a cascaded through 5 levels

0. Default theme
1. Global
2. Group
3. Column
4. Row
5. Cell

At each level parts of the theme can be overridden. This example will pro

## Global Theming

The global theme is provided by the DataEditor by default and can be overriden by setting the \`theme\` prop. All themes contain the following properties.

| Property | CSS Variable | Type | Description |
|---|---|---|----|
| accentColor | --gdg-accent-color | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |
| accentFg | --gdg-accent-fg | string | A foreground color which works well on top of the accent color. |
| accentLight | --gdg-accent-light | string | A lighter version of the accent color used to hint selection. |
| textDark | --gdg-text-dark | string | The standard text color. |
| textMedium | --gdg-text-medium | string | A lighter text color used for non-editable data in some cases. |
| textLight | --gdg-text-light | string | An even lighter text color |
| textBubble | --gdg-text-bubble | string | The text color used in bubbles |
| bgIconHeader | --gdg-bg-icon-header | string | The background color for header icons |
| fgIconHeader | --gdg-fg-icon-header | string | The foreground color for header icons |
| textHeader | --gdg-text-header | string | The header text color |
| textGroupHeader | --gdg-text-group-header | string \\| undefined | The group header text color, if none provided the \`textHeader\` is used instead. |
| textHeaderSelected | --gdg-text-header-selected | string | The text color used for selected headers |
| bgCell | --gdg-bg-cell | string | The primary background color of the data grid. |
| bgCellMedium | --gdg-bg-cell-medium | string | Used for disabled or otherwise off colored cells. |
| bgHeader | --gdg-bg-header | string | The header background color |
| bgHeaderHasFocus | --gdg-bg-header-has | string | The header background color when its column contains the selected cell |
| bgHeaderHovered | --gdg-bg-header-hovered | string | The header background color when it is hovered |
| bgBubble | --gdg-bg-bubble | string | The background color used in bubbles |
| bgBubbleSelected | --gdg-bg-bubble-selected | string | The background color used in bubbles when the cell is selected |
| bgSearchResult | --gdg-bg-search-result | string | The background color used for cells which match the search string |
| borderColor | --gdg-border-color | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |
| horizontalBorderColor | --gdg-horizontal-border-color | string \\| undefined | The horizontal border color override |
| drilldownBorder | --gdg-drilldown-border | string | The ring color of a drilldown cell |
| linkColor | --gdg-link-color | string | What color to render links |
| cellHorizontalPadding | --gdg-cell-horizontal-padding | number | The internal horizontal padding size of a cell. |
| cellVerticalPadding | --gdg-cell-vertical-padding | number | The internal vertical padding size of a cell. |
| headerFontStyle | --gdg-header-font-style | string | The font style of the header. e.g. \`bold 15px\` |
| baseFontStyle | --gdg-base-font-style | string | The font style used for cells by default, e.g. \`13px\` |
| fontFamily | --gdg-font-family | string | The font family used by the data grid. |
| editorFontSize | --gdg-editor-font-size | string | The font size used by overlay editors. |
| lineHeight | None | number | A unitless scaler which defines the height of a line of text relative to the ink size. |

If an option is missing from any theme it will be filled in with the default theme.
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
return <DataEditor 
        theme={{
          bgCell: "#F2F9FF"
        }} 
        getCellContent={getContent} columns={columns} rows={data.length} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        theme: {
          bgCell: "#F2F9FF"
        },
        getCellContent: getContent,
        columns: columns,
        rows: data.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `### Column themes
Themes can be applied at the column level as well by setting the \`themeOverride\` on the \`GridColumn\`.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
        },
        {
            title: "Company",
            themeOverride: {
                textDark: "#225588",
                baseFontStyle: "600 13px",
            },
            id: "company",
        },
        {
            title: "Email",
            id: "email",
        },
        {
            title: "Phone",
            id: "phone",
        },
    ];
}, []);
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        theme: {
          bgCell: "#F2F9FF"
        },
        getCellContent: getContent,
        columns: themeColumns,
        rows: data.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `### Row themes`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
        return {
            bgCell: "#F9FDFF"
        }
    }
    return undefined;
}, []);

return <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        theme: {
          bgCell: "#F2F9FF"
        },
        getRowThemeOverride: getRowThemeOverride,
        getCellContent: getContent,
        columns: themeColumns,
        rows: data.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `### Cell themes`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const getContent = React.useCallback((cell: Item): GridCell => {
    let theme: Partial<Theme> | undefined = undefined;
    if (col === 1 && row === 1) {
        theme = {
            textDark: "#FF0000",
        }
    }
    
    const d = getDataForCell(col, row);
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: d,
        data: d,
        themeOverride: theme
    };
}, []);
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        theme: {
          bgCell: "#F2F9FF"
        },
        getRowThemeOverride: getRowThemeOverride,
        getCellContent: getContentThemed,
        columns: themeColumns,
        rows: data.length
      })
    })]
  });
};
Theming.displayName = "Theming";
Theming.storyName = "08. Theming";;const __namedExportsOrder = ["Theming"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-08-theming-stories.9e1f520a.iframe.bundle.js.map