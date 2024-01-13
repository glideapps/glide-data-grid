"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2143],{

/***/ "./packages/core/src/docs/02-editing-data.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditingData": () => (/* binding */ EditingData),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport {\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Item,\n} from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst fixedData: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const EditingData: React.VFC = () => {\n    const dataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n        },\n    ]);\n\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = dataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const getFixedContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = fixedData[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {\n        if (newValue.kind !== GridCellKind.Text) {\n            // we only have text cells, might as well just die here.\n            return;\n        }\n\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const [col, row] = cell;\n        const key = indexes[col];\n        dataRef.current[row][key] = newValue.data;\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Editing Data\n\nEditing data is handled via callbacks. Taking the getting started example as a starting point, the \\`getContent\\` callback can be modified to allow editing.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const dataRow = data[row];\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const d = dataRow[indexes[col]];\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        readonly: false,\n        displayData: d,\n        data: d,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n\\`allowOverlay\\` has been set to true. This allows the overlay to come up. For explanatory purposes the \\`readonly\\` field is being set to false. This is the default value, setting it to true would allow the overlay to come up but not allow editing.`}\n            </Marked>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={getFixedContent} columns={columns} rows={dataRef.current.length} />\n            </Wrapper>\n            <Marked>\n                {`\n> You can see the editor now, but the data is not saved.\n\nImplementing the \\`onCellEdited\\` callback allows responding to cell edit events. Edit events pass back a mutated version of the original \\`GridCell\\` returned from \\`getContent\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {\n    if (newValue.kind !== GridCellKind.Text) {\n        // we only have text cells, might as well just die here.\n        return;\n    }\n\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const [col, row] = cell;\n    const key = indexes[col];\n    data[row][key] = newValue.data;\n}, []);`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    onCellEdited={onCellEdited}\n                    columns={columns}\n                    rows={dataRef.current.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(EditingData as any).storyName = \"02. Editing Data\";\n";
var __LOCATIONS_MAP__ = {
  "EditingData": {
    "startLoc": {
      "col": 38,
      "line": 137
    },
    "endLoc": {
      "col": 1,
      "line": 364
    },
    "startBody": {
      "col": 38,
      "line": 137
    },
    "endBody": {
      "col": 1,
      "line": 364
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport {\n    type EditableGridCell,\n    type GridCell,\n    GridCellKind,\n    type GridColumn,\n    type Item,\n} from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst fixedData: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const EditingData: React.VFC = () => {\n    const dataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n        },\n    ]);\n\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = dataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const getFixedContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = fixedData[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {\n        if (newValue.kind !== GridCellKind.Text) {\n            // we only have text cells, might as well just die here.\n            return;\n        }\n\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const [col, row] = cell;\n        const key = indexes[col];\n        dataRef.current[row][key] = newValue.data;\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Editing Data\n\nEditing data is handled via callbacks. Taking the getting started example as a starting point, the \\`getContent\\` callback can be modified to allow editing.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const dataRow = data[row];\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const d = dataRow[indexes[col]];\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        readonly: false,\n        displayData: d,\n        data: d,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n\\`allowOverlay\\` has been set to true. This allows the overlay to come up. For explanatory purposes the \\`readonly\\` field is being set to false. This is the default value, setting it to true would allow the overlay to come up but not allow editing.`}\n            </Marked>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={getFixedContent} columns={columns} rows={dataRef.current.length} />\n            </Wrapper>\n            <Marked>\n                {`\n> You can see the editor now, but the data is not saved.\n\nImplementing the \\`onCellEdited\\` callback allows responding to cell edit events. Edit events pass back a mutated version of the original \\`GridCell\\` returned from \\`getContent\\`.`}\n            </Marked>\n            <Highlight>\n                {`\nconst onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {\n    if (newValue.kind !== GridCellKind.Text) {\n        // we only have text cells, might as well just die here.\n        return;\n    }\n\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const [col, row] = cell;\n    const key = indexes[col];\n    data[row][key] = newValue.data;\n}, []);`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    onCellEdited={onCellEdited}\n                    columns={columns}\n                    rows={dataRef.current.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(EditingData as any).storyName = \"02. Editing Data\";\n",
      "locationsMap": {
        "editing-data": {
          "startLoc": {
            "col": 38,
            "line": 137
          },
          "endLoc": {
            "col": 1,
            "line": 364
          },
          "startBody": {
            "col": 38,
            "line": 137
          },
          "endBody": {
            "col": 1,
            "line": 364
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
const fixedData = [{
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
const EditingData = () => {
  const dataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([{
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
  }]);
  const getContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = dataRef.current[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const getFixedContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = fixedData[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const onCellEdited = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((cell, newValue) => {
    if (newValue.kind !== _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text) {
      return;
    }
    const indexes = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    dataRef.current[row][key] = newValue.data;
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
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .DocWrapper */ .kT, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Editing Data

Editing data is handled via callbacks. Taking the getting started example as a starting point, the \`getContent\` callback can be modified to allow editing.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: d,
        data: d,
    };
}, []);
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
\`allowOverlay\` has been set to true. This allows the overlay to come up. For explanatory purposes the \`readonly\` field is being set to false. This is the default value, setting it to true would allow the overlay to come up but not allow editing.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: getFixedContent,
        columns: columns,
        rows: dataRef.current.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
> You can see the editor now, but the data is not saved.

Implementing the \`onCellEdited\` callback allows responding to cell edit events. Edit events pass back a mutated version of the original \`GridCell\` returned from \`getContent\`.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
    }

    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;
}, []);`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: getContent,
        onCellEdited: onCellEdited,
        columns: columns,
        rows: dataRef.current.length
      })
    })]
  });
};
EditingData.displayName = "EditingData";
EditingData.storyName = "02. Editing Data";;const __namedExportsOrder = ["EditingData"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-02-editing-data-stories.22792b94.iframe.bundle.js.map