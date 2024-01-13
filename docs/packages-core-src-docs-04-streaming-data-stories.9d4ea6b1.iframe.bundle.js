"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[699],{

/***/ "./packages/core/src/docs/04-streaming-data.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StreamingData": () => (/* binding */ StreamingData),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { type DataEditorRef } from \"../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n    update: number;\n}\n\nexport const StreamingData: React.VFC = () => {\n    const highlightDataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n            update: 0,\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n            update: 0,\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n            update: 0,\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n            update: 0,\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n            update: 0,\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n            update: 0,\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n            update: 0,\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n            update: 0,\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n            update: 0,\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n            update: 0,\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n            update: 0,\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n            update: 0,\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n            update: 0,\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n            update: 0,\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n            update: 0,\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n            update: 0,\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n            update: 0,\n        },\n    ]);\n\n    const dataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n            update: 0,\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n            update: 0,\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n            update: 0,\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n            update: 0,\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n            update: 0,\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n            update: 0,\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n            update: 0,\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n            update: 0,\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n            update: 0,\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n            update: 0,\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n            update: 0,\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n            update: 0,\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n            update: 0,\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n            update: 0,\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n            update: 0,\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n            update: 0,\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n            update: 0,\n        },\n    ]);\n\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = dataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d as string,\n            data: d as string,\n        };\n    }, []);\n\n    const getContentHighlighted = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = highlightDataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d as string,\n            data: d as string,\n            lastUpdated: dataRow.update,\n        };\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    const ref = React.useRef<DataEditorRef | null>(null);\n\n    const onButtonClick = () => {\n        // Swap the emails of 2 random people\n        const randomRow1 = Math.floor(Math.random() * dataRef.current.length);\n        const randomRow2 = Math.floor(Math.random() * dataRef.current.length);\n\n        const temp = dataRef.current[randomRow1].email;\n        dataRef.current[randomRow1].email = dataRef.current[randomRow2].email;\n        dataRef.current[randomRow2].email = temp;\n\n        ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r] })));\n    };\n\n    const onHighlightButtonClick = () => {\n        // Swap the emails of 2 random people\n        const randomRow1 = Math.floor(Math.random() * highlightDataRef.current.length);\n        const randomRow2 = Math.floor(Math.random() * highlightDataRef.current.length);\n\n        const temp = highlightDataRef.current[randomRow1].email;\n        highlightDataRef.current[randomRow1].email = highlightDataRef.current[randomRow2].email;\n        highlightDataRef.current[randomRow2].email = temp;\n\n        highlightDataRef.current[randomRow1].update = performance.now();\n        highlightDataRef.current[randomRow2].update = performance.now();\n\n        ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r] })));\n    };\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Streaming Data\n\n> Glide Data Grid is capable of streaming hundreds of thousands of updates per second. You won't need that, but every millisecond the grid doesn't take is another millisecond your app has to process data and remain responsive.\n\nStreaming data is done as a two step process.\n\n1. Update the data backing store.\n2. Inform the Glide Data Grid of the changed data.\n\nThe Grid does not care of the data is coming down over the wire or being generated locally. Informing the grid of changes to the data is done by calling the \\`updateCells\\` function on a bound ref.`}\n            </Marked>\n            <Highlight>\n                {`\nconst ref = React.useRef<DataEditorRef | null>(null);\n\nreturn <DataEditor {...rest} ref={ref} />\n`}\n            </Highlight>\n            <Marked>\n                {`\nData can now be updated by calling mutating the backing store and using the ref to update cells.`}\n            </Marked>\n            <Highlight>\n                {`\nconst onButtonClick = () => {\n    // Swap the emails of 2 random people\n    const randomRow1 = Math.floor(Math.random()*data.length);\n    const randomRow2 = Math.floor(Math.random()*data.length);\n\n    const temp = data[randomRow1].email;\n    data[randomRow1].email = data[randomRow2].email;\n    data[randomRow2].email = temp;\n\n    ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r]})));\n}\n`}\n            </Highlight>\n            <button onClick={onButtonClick}>Swappy Swappy</button>\n            <Wrapper height={400}>\n                <DataEditor ref={ref} getCellContent={getContent} columns={columns} rows={dataRef.current.length} />\n            </Wrapper>\n            <Marked>\n                {`\n## Showing updates\n        \nIf \\`getContent\\` is updated to also return the last time a cell was updated the data grid will highlight cells as they update.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const data = fetchDataFromBackend(col, row);\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        displayData: data.value,\n        data: data.value,\n        lastUpdated: data.updatedAt,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n> Note that timestamps are based on performance.now() and not Date.now(). This is to ensure that timestamps always increase monotonically and nothing weird will happen if the clock adjusts.`}\n            </Marked>\n            <button style={{ marginTop: 16 }} onClick={onHighlightButtonClick}>\n                Swapity Swap Swap\n            </button>\n            <Wrapper height={600}>\n                <DataEditor\n                    ref={ref}\n                    getCellContent={getContentHighlighted}\n                    columns={columns}\n                    rows={dataRef.current.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(StreamingData as any).storyName = \"04. Streaming Data\";\n";
var __LOCATIONS_MAP__ = {
  "StreamingData": {
    "startLoc": {
      "col": 40,
      "line": 28
    },
    "endLoc": {
      "col": 1,
      "line": 433
    },
    "startBody": {
      "col": 40,
      "line": 28
    },
    "endBody": {
      "col": 1,
      "line": 433
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { type DataEditorRef } from \"../data-editor/data-editor.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n    update: number;\n}\n\nexport const StreamingData: React.VFC = () => {\n    const highlightDataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n            update: 0,\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n            update: 0,\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n            update: 0,\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n            update: 0,\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n            update: 0,\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n            update: 0,\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n            update: 0,\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n            update: 0,\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n            update: 0,\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n            update: 0,\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n            update: 0,\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n            update: 0,\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n            update: 0,\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n            update: 0,\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n            update: 0,\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n            update: 0,\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n            update: 0,\n        },\n    ]);\n\n    const dataRef = React.useRef([\n        {\n            name: \"Deidre Morris\",\n            company: \"GONKLE\",\n            email: \"deidremorris@gonkle.com\",\n            phone: \"+1 (867) 507-3332\",\n            update: 0,\n        },\n        {\n            name: \"Sheryl Craig\",\n            company: \"EVENTAGE\",\n            email: \"sherylcraig@eventage.com\",\n            phone: \"+1 (869) 520-2227\",\n            update: 0,\n        },\n        {\n            name: \"Lidia Bowers\",\n            company: \"ANOCHA\",\n            email: \"lidiabowers@anocha.com\",\n            phone: \"+1 (808) 414-3826\",\n            update: 0,\n        },\n        {\n            name: \"Jones Norton\",\n            company: \"REPETWIRE\",\n            email: \"jonesnorton@repetwire.com\",\n            phone: \"+1 (875) 582-3320\",\n            update: 0,\n        },\n        {\n            name: \"Lula Bruce\",\n            company: \"COMDOM\",\n            email: \"lulabruce@comdom.com\",\n            phone: \"+1 (873) 452-2472\",\n            update: 0,\n        },\n        {\n            name: \"Larsen Montgomery\",\n            company: \"SQUISH\",\n            email: \"larsenmontgomery@squish.com\",\n            phone: \"+1 (893) 482-3651\",\n            update: 0,\n        },\n        {\n            name: \"Becky Bright\",\n            company: \"COMCUR\",\n            email: \"beckybright@comcur.com\",\n            phone: \"+1 (879) 494-2331\",\n            update: 0,\n        },\n        {\n            name: \"Charlotte Rowland\",\n            company: \"FROLIX\",\n            email: \"charlotterowland@frolix.com\",\n            phone: \"+1 (861) 439-2134\",\n            update: 0,\n        },\n        {\n            name: \"Sonya Hensley\",\n            company: \"GEEKETRON\",\n            email: \"sonyahensley@geeketron.com\",\n            phone: \"+1 (802) 553-2194\",\n            update: 0,\n        },\n        {\n            name: \"Stephenson Guthrie\",\n            company: \"EXOSWITCH\",\n            email: \"stephensonguthrie@exoswitch.com\",\n            phone: \"+1 (903) 449-3271\",\n            update: 0,\n        },\n        {\n            name: \"Mcmillan Cline\",\n            company: \"TURNLING\",\n            email: \"mcmillancline@turnling.com\",\n            phone: \"+1 (982) 496-2454\",\n            update: 0,\n        },\n        {\n            name: \"Kemp Davis\",\n            company: \"TETRATREX\",\n            email: \"kempdavis@tetratrex.com\",\n            phone: \"+1 (859) 594-2982\",\n            update: 0,\n        },\n        {\n            name: \"Matilda Levy\",\n            company: \"SLOFAST\",\n            email: \"matildalevy@slofast.com\",\n            phone: \"+1 (841) 521-2444\",\n            update: 0,\n        },\n        {\n            name: \"Hattie Simpson\",\n            company: \"COMTRAK\",\n            email: \"hattiesimpson@comtrak.com\",\n            phone: \"+1 (962) 587-3805\",\n            update: 0,\n        },\n        {\n            name: \"Kinney Munoz\",\n            company: \"IDETICA\",\n            email: \"kinneymunoz@idetica.com\",\n            phone: \"+1 (921) 513-2012\",\n            update: 0,\n        },\n        {\n            name: \"Lambert Raymond\",\n            company: \"TURNABOUT\",\n            email: \"lambertraymond@turnabout.com\",\n            phone: \"+1 (919) 519-2442\",\n            update: 0,\n        },\n        {\n            name: \"Bryant Dunlap\",\n            company: \"BYTREX\",\n            email: \"bryantdunlap@bytrex.com\",\n            phone: \"+1 (872) 583-2883\",\n            update: 0,\n        },\n    ]);\n\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = dataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d as string,\n            data: d as string,\n        };\n    }, []);\n\n    const getContentHighlighted = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = highlightDataRef.current[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: true,\n            displayData: d as string,\n            data: d as string,\n            lastUpdated: dataRow.update,\n        };\n    }, []);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    const ref = React.useRef<DataEditorRef | null>(null);\n\n    const onButtonClick = () => {\n        // Swap the emails of 2 random people\n        const randomRow1 = Math.floor(Math.random() * dataRef.current.length);\n        const randomRow2 = Math.floor(Math.random() * dataRef.current.length);\n\n        const temp = dataRef.current[randomRow1].email;\n        dataRef.current[randomRow1].email = dataRef.current[randomRow2].email;\n        dataRef.current[randomRow2].email = temp;\n\n        ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r] })));\n    };\n\n    const onHighlightButtonClick = () => {\n        // Swap the emails of 2 random people\n        const randomRow1 = Math.floor(Math.random() * highlightDataRef.current.length);\n        const randomRow2 = Math.floor(Math.random() * highlightDataRef.current.length);\n\n        const temp = highlightDataRef.current[randomRow1].email;\n        highlightDataRef.current[randomRow1].email = highlightDataRef.current[randomRow2].email;\n        highlightDataRef.current[randomRow2].email = temp;\n\n        highlightDataRef.current[randomRow1].update = performance.now();\n        highlightDataRef.current[randomRow2].update = performance.now();\n\n        ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r] })));\n    };\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Streaming Data\n\n> Glide Data Grid is capable of streaming hundreds of thousands of updates per second. You won't need that, but every millisecond the grid doesn't take is another millisecond your app has to process data and remain responsive.\n\nStreaming data is done as a two step process.\n\n1. Update the data backing store.\n2. Inform the Glide Data Grid of the changed data.\n\nThe Grid does not care of the data is coming down over the wire or being generated locally. Informing the grid of changes to the data is done by calling the \\`updateCells\\` function on a bound ref.`}\n            </Marked>\n            <Highlight>\n                {`\nconst ref = React.useRef<DataEditorRef | null>(null);\n\nreturn <DataEditor {...rest} ref={ref} />\n`}\n            </Highlight>\n            <Marked>\n                {`\nData can now be updated by calling mutating the backing store and using the ref to update cells.`}\n            </Marked>\n            <Highlight>\n                {`\nconst onButtonClick = () => {\n    // Swap the emails of 2 random people\n    const randomRow1 = Math.floor(Math.random()*data.length);\n    const randomRow2 = Math.floor(Math.random()*data.length);\n\n    const temp = data[randomRow1].email;\n    data[randomRow1].email = data[randomRow2].email;\n    data[randomRow2].email = temp;\n\n    ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r]})));\n}\n`}\n            </Highlight>\n            <button onClick={onButtonClick}>Swappy Swappy</button>\n            <Wrapper height={400}>\n                <DataEditor ref={ref} getCellContent={getContent} columns={columns} rows={dataRef.current.length} />\n            </Wrapper>\n            <Marked>\n                {`\n## Showing updates\n        \nIf \\`getContent\\` is updated to also return the last time a cell was updated the data grid will highlight cells as they update.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const data = fetchDataFromBackend(col, row);\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        displayData: data.value,\n        data: data.value,\n        lastUpdated: data.updatedAt,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n> Note that timestamps are based on performance.now() and not Date.now(). This is to ensure that timestamps always increase monotonically and nothing weird will happen if the clock adjusts.`}\n            </Marked>\n            <button style={{ marginTop: 16 }} onClick={onHighlightButtonClick}>\n                Swapity Swap Swap\n            </button>\n            <Wrapper height={600}>\n                <DataEditor\n                    ref={ref}\n                    getCellContent={getContentHighlighted}\n                    columns={columns}\n                    rows={dataRef.current.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(StreamingData as any).storyName = \"04. Streaming Data\";\n",
      "locationsMap": {
        "streaming-data": {
          "startLoc": {
            "col": 40,
            "line": 28
          },
          "endLoc": {
            "col": 1,
            "line": 433
          },
          "startBody": {
            "col": 40,
            "line": 28
          },
          "endBody": {
            "col": 1,
            "line": 433
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
const StreamingData = () => {
  const highlightDataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([{
    name: "Deidre Morris",
    company: "GONKLE",
    email: "deidremorris@gonkle.com",
    phone: "+1 (867) 507-3332",
    update: 0
  }, {
    name: "Sheryl Craig",
    company: "EVENTAGE",
    email: "sherylcraig@eventage.com",
    phone: "+1 (869) 520-2227",
    update: 0
  }, {
    name: "Lidia Bowers",
    company: "ANOCHA",
    email: "lidiabowers@anocha.com",
    phone: "+1 (808) 414-3826",
    update: 0
  }, {
    name: "Jones Norton",
    company: "REPETWIRE",
    email: "jonesnorton@repetwire.com",
    phone: "+1 (875) 582-3320",
    update: 0
  }, {
    name: "Lula Bruce",
    company: "COMDOM",
    email: "lulabruce@comdom.com",
    phone: "+1 (873) 452-2472",
    update: 0
  }, {
    name: "Larsen Montgomery",
    company: "SQUISH",
    email: "larsenmontgomery@squish.com",
    phone: "+1 (893) 482-3651",
    update: 0
  }, {
    name: "Becky Bright",
    company: "COMCUR",
    email: "beckybright@comcur.com",
    phone: "+1 (879) 494-2331",
    update: 0
  }, {
    name: "Charlotte Rowland",
    company: "FROLIX",
    email: "charlotterowland@frolix.com",
    phone: "+1 (861) 439-2134",
    update: 0
  }, {
    name: "Sonya Hensley",
    company: "GEEKETRON",
    email: "sonyahensley@geeketron.com",
    phone: "+1 (802) 553-2194",
    update: 0
  }, {
    name: "Stephenson Guthrie",
    company: "EXOSWITCH",
    email: "stephensonguthrie@exoswitch.com",
    phone: "+1 (903) 449-3271",
    update: 0
  }, {
    name: "Mcmillan Cline",
    company: "TURNLING",
    email: "mcmillancline@turnling.com",
    phone: "+1 (982) 496-2454",
    update: 0
  }, {
    name: "Kemp Davis",
    company: "TETRATREX",
    email: "kempdavis@tetratrex.com",
    phone: "+1 (859) 594-2982",
    update: 0
  }, {
    name: "Matilda Levy",
    company: "SLOFAST",
    email: "matildalevy@slofast.com",
    phone: "+1 (841) 521-2444",
    update: 0
  }, {
    name: "Hattie Simpson",
    company: "COMTRAK",
    email: "hattiesimpson@comtrak.com",
    phone: "+1 (962) 587-3805",
    update: 0
  }, {
    name: "Kinney Munoz",
    company: "IDETICA",
    email: "kinneymunoz@idetica.com",
    phone: "+1 (921) 513-2012",
    update: 0
  }, {
    name: "Lambert Raymond",
    company: "TURNABOUT",
    email: "lambertraymond@turnabout.com",
    phone: "+1 (919) 519-2442",
    update: 0
  }, {
    name: "Bryant Dunlap",
    company: "BYTREX",
    email: "bryantdunlap@bytrex.com",
    phone: "+1 (872) 583-2883",
    update: 0
  }]);
  const dataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([{
    name: "Deidre Morris",
    company: "GONKLE",
    email: "deidremorris@gonkle.com",
    phone: "+1 (867) 507-3332",
    update: 0
  }, {
    name: "Sheryl Craig",
    company: "EVENTAGE",
    email: "sherylcraig@eventage.com",
    phone: "+1 (869) 520-2227",
    update: 0
  }, {
    name: "Lidia Bowers",
    company: "ANOCHA",
    email: "lidiabowers@anocha.com",
    phone: "+1 (808) 414-3826",
    update: 0
  }, {
    name: "Jones Norton",
    company: "REPETWIRE",
    email: "jonesnorton@repetwire.com",
    phone: "+1 (875) 582-3320",
    update: 0
  }, {
    name: "Lula Bruce",
    company: "COMDOM",
    email: "lulabruce@comdom.com",
    phone: "+1 (873) 452-2472",
    update: 0
  }, {
    name: "Larsen Montgomery",
    company: "SQUISH",
    email: "larsenmontgomery@squish.com",
    phone: "+1 (893) 482-3651",
    update: 0
  }, {
    name: "Becky Bright",
    company: "COMCUR",
    email: "beckybright@comcur.com",
    phone: "+1 (879) 494-2331",
    update: 0
  }, {
    name: "Charlotte Rowland",
    company: "FROLIX",
    email: "charlotterowland@frolix.com",
    phone: "+1 (861) 439-2134",
    update: 0
  }, {
    name: "Sonya Hensley",
    company: "GEEKETRON",
    email: "sonyahensley@geeketron.com",
    phone: "+1 (802) 553-2194",
    update: 0
  }, {
    name: "Stephenson Guthrie",
    company: "EXOSWITCH",
    email: "stephensonguthrie@exoswitch.com",
    phone: "+1 (903) 449-3271",
    update: 0
  }, {
    name: "Mcmillan Cline",
    company: "TURNLING",
    email: "mcmillancline@turnling.com",
    phone: "+1 (982) 496-2454",
    update: 0
  }, {
    name: "Kemp Davis",
    company: "TETRATREX",
    email: "kempdavis@tetratrex.com",
    phone: "+1 (859) 594-2982",
    update: 0
  }, {
    name: "Matilda Levy",
    company: "SLOFAST",
    email: "matildalevy@slofast.com",
    phone: "+1 (841) 521-2444",
    update: 0
  }, {
    name: "Hattie Simpson",
    company: "COMTRAK",
    email: "hattiesimpson@comtrak.com",
    phone: "+1 (962) 587-3805",
    update: 0
  }, {
    name: "Kinney Munoz",
    company: "IDETICA",
    email: "kinneymunoz@idetica.com",
    phone: "+1 (921) 513-2012",
    update: 0
  }, {
    name: "Lambert Raymond",
    company: "TURNABOUT",
    email: "lambertraymond@turnabout.com",
    phone: "+1 (919) 519-2442",
    update: 0
  }, {
    name: "Bryant Dunlap",
    company: "BYTREX",
    email: "bryantdunlap@bytrex.com",
    phone: "+1 (872) 583-2883",
    update: 0
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
  const getContentHighlighted = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = highlightDataRef.current[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: true,
      displayData: d,
      data: d,
      lastUpdated: dataRow.update
    };
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
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const onButtonClick = () => {
    var _ref$current;
    const randomRow1 = Math.floor(Math.random() * dataRef.current.length);
    const randomRow2 = Math.floor(Math.random() * dataRef.current.length);
    const temp = dataRef.current[randomRow1].email;
    dataRef.current[randomRow1].email = dataRef.current[randomRow2].email;
    dataRef.current[randomRow2].email = temp;
    (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.updateCells([randomRow1, randomRow2].map(r => ({
      cell: [2, r]
    })));
  };
  const onHighlightButtonClick = () => {
    var _ref$current2;
    const randomRow1 = Math.floor(Math.random() * highlightDataRef.current.length);
    const randomRow2 = Math.floor(Math.random() * highlightDataRef.current.length);
    const temp = highlightDataRef.current[randomRow1].email;
    highlightDataRef.current[randomRow1].email = highlightDataRef.current[randomRow2].email;
    highlightDataRef.current[randomRow2].email = temp;
    highlightDataRef.current[randomRow1].update = performance.now();
    highlightDataRef.current[randomRow2].update = performance.now();
    (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || _ref$current2.updateCells([randomRow1, randomRow2].map(r => ({
      cell: [2, r]
    })));
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .DocWrapper */ .kT, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Streaming Data

> Glide Data Grid is capable of streaming hundreds of thousands of updates per second. You won't need that, but every millisecond the grid doesn't take is another millisecond your app has to process data and remain responsive.

Streaming data is done as a two step process.

1. Update the data backing store.
2. Inform the Glide Data Grid of the changed data.

The Grid does not care of the data is coming down over the wire or being generated locally. Informing the grid of changes to the data is done by calling the \`updateCells\` function on a bound ref.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const ref = React.useRef<DataEditorRef | null>(null);

return <DataEditor {...rest} ref={ref} />
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
Data can now be updated by calling mutating the backing store and using the ref to update cells.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const onButtonClick = () => {
    // Swap the emails of 2 random people
    const randomRow1 = Math.floor(Math.random()*data.length);
    const randomRow2 = Math.floor(Math.random()*data.length);

    const temp = data[randomRow1].email;
    data[randomRow1].email = data[randomRow2].email;
    data[randomRow2].email = temp;

    ref.current?.updateCells([randomRow1, randomRow2].map(r => ({ cell: [2, r]})));
}
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      onClick: onButtonClick,
      children: "Swappy Swappy"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 400,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        ref: ref,
        getCellContent: getContent,
        columns: columns,
        rows: dataRef.current.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
## Showing updates
        
If \`getContent\` is updated to also return the last time a cell was updated the data grid will highlight cells as they update.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const data = fetchDataFromBackend(col, row);
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: data.value,
        data: data.value,
        lastUpdated: data.updatedAt,
    };
}, []);
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
> Note that timestamps are based on performance.now() and not Date.now(). This is to ensure that timestamps always increase monotonically and nothing weird will happen if the clock adjusts.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      style: {
        marginTop: 16
      },
      onClick: onHighlightButtonClick,
      children: "Swapity Swap Swap"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 600,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        ref: ref,
        getCellContent: getContentHighlighted,
        columns: columns,
        rows: dataRef.current.length
      })
    })]
  });
};
StreamingData.displayName = "StreamingData";
StreamingData.storyName = "04. Streaming Data";;const __namedExportsOrder = ["StreamingData"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-04-streaming-data-stories.9d4ea6b1.iframe.bundle.js.map