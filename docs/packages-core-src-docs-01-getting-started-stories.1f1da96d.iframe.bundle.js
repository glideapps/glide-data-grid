"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7723],{

/***/ "./packages/core/src/docs/01-getting-started.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GettingStarted": () => (/* binding */ GettingStarted),
/* harmony export */   "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/data-editor-all.tsx");
/* harmony import */ var _stories_story_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/stories/story-utils.tsx");
/* harmony import */ var _doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./packages/core/src/docs/doc-wrapper.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
var __STORY__ = "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const GettingStarted: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: false,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const [rowMarkers, setRowMarkers] = React.useState(false);\n    const [smoothScroll, setSmoothScroll] = React.useState(false);\n    const [verticalBorder, setVerticalBorder] = React.useState(true);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Getting Started\n\nGlide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \\`getCellContent\\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`}\n            </Marked>\n            <Highlight>\n                {`\nconst data = [\n    {\n      \"name\": \"Hines Fowler\",\n      \"company\": \"BUZZNESS\",\n      \"email\": \"hinesfowler@buzzness.com\",\n      \"phone\": \"+1 (869) 405-3127\"\n    },\n    ...rest\n]\n`}\n            </Highlight>\n            <Marked>\n                {`\nThe columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a \\`title\\` and an \\`id\\`. The id is technically optional but it is best not to omit it.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    {\n        title: \"Name\",\n        id: \"name\"\n    },\n    {\n        title: \"Company\",\n        id: \"company\"\n    },\n    {\n        title: \"Email\",\n        id: \"email\"\n    },\n    {\n        title: \"Phone\",\n        id: \"phone\"\n    }\n]\n`}\n            </Highlight>\n            <Marked>\n                {`\nEach column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.\n\nFinally the data grid requires a cell fetch callback. This callback should be memoized using \\`React.useCallback\\` or be a static function.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const dataRow = data[row];\n    // dumb but simple way to do this\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const d = dataRow[indexes[col]]\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: false,\n        displayData: d,\n        data: d,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n> Avoid excessive changes to the identity of the \\`getCellContent\\` callback as the grid will re-render from scratch every time it changes.\n\nThat is all the basic requirements put together.`}\n            </Marked>\n            <Highlight>\n                {`\nreturn <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />\n            </Wrapper>\n            <Marked>\n                {`\n# Going further\n\nThere is so much more that can be done:\n\n- Header icons\n- Smooth scrolling\n- Header menus\n- Grouping\n- Row markers\n- Freeze Columns\n- Column reordering and resizing\n- Cell spans\n- Search\n- Copy/paste support\n\nHere are a few to play with.`}\n            </Marked>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={rowMarkers} onChange={e => setRowMarkers(e.target.checked)} /> Row\n                Markers\n            </label>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={smoothScroll} onChange={e => setSmoothScroll(e.target.checked)} />{\" \"}\n                Smooth Scroll\n            </label>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={verticalBorder} onChange={e => setVerticalBorder(e.target.checked)} />{\" \"}\n                Vertical Borders\n            </label>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    verticalBorder={verticalBorder}\n                    smoothScrollX={smoothScroll}\n                    smoothScrollY={smoothScroll}\n                    rowMarkers={rowMarkers ? \"both\" : \"none\"}\n                    columns={columns}\n                    rows={data.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(GettingStarted as any).storyName = \"01. Getting Started\";\n";
var __LOCATIONS_MAP__ = {
  "GettingStarted": {
    "startLoc": {
      "col": 41,
      "line": 131
    },
    "endLoc": {
      "col": 1,
      "line": 298
    },
    "startBody": {
      "col": 41,
      "line": 131
    },
    "endBody": {
      "col": 1,
      "line": 298
    }
  }
};







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  parameters: {
    "storySource": {
      "source": "import * as React from \"react\";\n\nimport { type GridCell, GridCellKind, type GridColumn, type Item } from \"../internal/data-grid/data-grid-types.js\";\nimport { DataEditorAll as DataEditor } from \"../data-editor-all.js\";\nimport { SimpleThemeWrapper } from \"../stories/story-utils.js\";\nimport { DocWrapper, Highlight, Marked, Wrapper } from \"./doc-wrapper.js\";\n\nexport default {\n    title: \"Glide-Data-Grid/Docs\",\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\ninterface DummyItem {\n    name: string;\n    company: string;\n    phone: string;\n    email: string;\n}\n\nconst data: DummyItem[] = [\n    {\n        name: \"Deidre Morris\",\n        company: \"GONKLE\",\n        email: \"deidremorris@gonkle.com\",\n        phone: \"+1 (867) 507-3332\",\n    },\n    {\n        name: \"Sheryl Craig\",\n        company: \"EVENTAGE\",\n        email: \"sherylcraig@eventage.com\",\n        phone: \"+1 (869) 520-2227\",\n    },\n    {\n        name: \"Lidia Bowers\",\n        company: \"ANOCHA\",\n        email: \"lidiabowers@anocha.com\",\n        phone: \"+1 (808) 414-3826\",\n    },\n    {\n        name: \"Jones Norton\",\n        company: \"REPETWIRE\",\n        email: \"jonesnorton@repetwire.com\",\n        phone: \"+1 (875) 582-3320\",\n    },\n    {\n        name: \"Lula Bruce\",\n        company: \"COMDOM\",\n        email: \"lulabruce@comdom.com\",\n        phone: \"+1 (873) 452-2472\",\n    },\n    {\n        name: \"Larsen Montgomery\",\n        company: \"SQUISH\",\n        email: \"larsenmontgomery@squish.com\",\n        phone: \"+1 (893) 482-3651\",\n    },\n    {\n        name: \"Becky Bright\",\n        company: \"COMCUR\",\n        email: \"beckybright@comcur.com\",\n        phone: \"+1 (879) 494-2331\",\n    },\n    {\n        name: \"Charlotte Rowland\",\n        company: \"FROLIX\",\n        email: \"charlotterowland@frolix.com\",\n        phone: \"+1 (861) 439-2134\",\n    },\n    {\n        name: \"Sonya Hensley\",\n        company: \"GEEKETRON\",\n        email: \"sonyahensley@geeketron.com\",\n        phone: \"+1 (802) 553-2194\",\n    },\n    {\n        name: \"Stephenson Guthrie\",\n        company: \"EXOSWITCH\",\n        email: \"stephensonguthrie@exoswitch.com\",\n        phone: \"+1 (903) 449-3271\",\n    },\n    {\n        name: \"Mcmillan Cline\",\n        company: \"TURNLING\",\n        email: \"mcmillancline@turnling.com\",\n        phone: \"+1 (982) 496-2454\",\n    },\n    {\n        name: \"Kemp Davis\",\n        company: \"TETRATREX\",\n        email: \"kempdavis@tetratrex.com\",\n        phone: \"+1 (859) 594-2982\",\n    },\n    {\n        name: \"Matilda Levy\",\n        company: \"SLOFAST\",\n        email: \"matildalevy@slofast.com\",\n        phone: \"+1 (841) 521-2444\",\n    },\n    {\n        name: \"Hattie Simpson\",\n        company: \"COMTRAK\",\n        email: \"hattiesimpson@comtrak.com\",\n        phone: \"+1 (962) 587-3805\",\n    },\n    {\n        name: \"Kinney Munoz\",\n        company: \"IDETICA\",\n        email: \"kinneymunoz@idetica.com\",\n        phone: \"+1 (921) 513-2012\",\n    },\n    {\n        name: \"Lambert Raymond\",\n        company: \"TURNABOUT\",\n        email: \"lambertraymond@turnabout.com\",\n        phone: \"+1 (919) 519-2442\",\n    },\n    {\n        name: \"Bryant Dunlap\",\n        company: \"BYTREX\",\n        email: \"bryantdunlap@bytrex.com\",\n        phone: \"+1 (872) 583-2883\",\n    },\n];\n\nexport const GettingStarted: React.VFC = () => {\n    const getContent = React.useCallback((cell: Item): GridCell => {\n        const [col, row] = cell;\n        const dataRow = data[row];\n        const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n        const d = dataRow[indexes[col]];\n        return {\n            kind: GridCellKind.Text,\n            allowOverlay: false,\n            displayData: d,\n            data: d,\n        };\n    }, []);\n\n    const [rowMarkers, setRowMarkers] = React.useState(false);\n    const [smoothScroll, setSmoothScroll] = React.useState(false);\n    const [verticalBorder, setVerticalBorder] = React.useState(true);\n\n    const columns = React.useMemo<GridColumn[]>(() => {\n        return [\n            {\n                title: \"Name\",\n                id: \"name\",\n            },\n            {\n                title: \"Company\",\n                id: \"company\",\n            },\n            {\n                title: \"Email\",\n                id: \"email\",\n            },\n            {\n                title: \"Phone\",\n                id: \"phone\",\n            },\n        ];\n    }, []);\n\n    return (\n        <DocWrapper>\n            <Marked>\n                {`\n# Getting Started\n\nGlide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \\`getCellContent\\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`}\n            </Marked>\n            <Highlight>\n                {`\nconst data = [\n    {\n      \"name\": \"Hines Fowler\",\n      \"company\": \"BUZZNESS\",\n      \"email\": \"hinesfowler@buzzness.com\",\n      \"phone\": \"+1 (869) 405-3127\"\n    },\n    ...rest\n]\n`}\n            </Highlight>\n            <Marked>\n                {`\nThe columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a \\`title\\` and an \\`id\\`. The id is technically optional but it is best not to omit it.`}\n            </Marked>\n            <Highlight>\n                {`\nconst columns: GridColumn[] = [\n    {\n        title: \"Name\",\n        id: \"name\"\n    },\n    {\n        title: \"Company\",\n        id: \"company\"\n    },\n    {\n        title: \"Email\",\n        id: \"email\"\n    },\n    {\n        title: \"Phone\",\n        id: \"phone\"\n    }\n]\n`}\n            </Highlight>\n            <Marked>\n                {`\nEach column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.\n\nFinally the data grid requires a cell fetch callback. This callback should be memoized using \\`React.useCallback\\` or be a static function.`}\n            </Marked>\n            <Highlight>\n                {`\nconst getContent = React.useCallback((cell: Item): GridCell => {\n    const [col, row] = cell;\n    const dataRow = data[row];\n    // dumb but simple way to do this\n    const indexes: (keyof DummyItem)[] = [\"name\", \"company\", \"email\", \"phone\"];\n    const d = dataRow[indexes[col]]\n    return {\n        kind: GridCellKind.Text,\n        allowOverlay: false,\n        displayData: d,\n        data: d,\n    };\n}, []);\n`}\n            </Highlight>\n            <Marked>\n                {`\n> Avoid excessive changes to the identity of the \\`getCellContent\\` callback as the grid will re-render from scratch every time it changes.\n\nThat is all the basic requirements put together.`}\n            </Marked>\n            <Highlight>\n                {`\nreturn <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;\n`}\n            </Highlight>\n            <Wrapper height={200}>\n                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />\n            </Wrapper>\n            <Marked>\n                {`\n# Going further\n\nThere is so much more that can be done:\n\n- Header icons\n- Smooth scrolling\n- Header menus\n- Grouping\n- Row markers\n- Freeze Columns\n- Column reordering and resizing\n- Cell spans\n- Search\n- Copy/paste support\n\nHere are a few to play with.`}\n            </Marked>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={rowMarkers} onChange={e => setRowMarkers(e.target.checked)} /> Row\n                Markers\n            </label>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={smoothScroll} onChange={e => setSmoothScroll(e.target.checked)} />{\" \"}\n                Smooth Scroll\n            </label>\n            <label style={{ display: \"block\" }}>\n                <input type=\"checkbox\" checked={verticalBorder} onChange={e => setVerticalBorder(e.target.checked)} />{\" \"}\n                Vertical Borders\n            </label>\n            <Wrapper height={200}>\n                <DataEditor\n                    getCellContent={getContent}\n                    verticalBorder={verticalBorder}\n                    smoothScrollX={smoothScroll}\n                    smoothScrollY={smoothScroll}\n                    rowMarkers={rowMarkers ? \"both\" : \"none\"}\n                    columns={columns}\n                    rows={data.length}\n                />\n            </Wrapper>\n        </DocWrapper>\n    );\n};\n(GettingStarted as any).storyName = \"01. Getting Started\";\n",
      "locationsMap": {
        "getting-started": {
          "startLoc": {
            "col": 41,
            "line": 131
          },
          "endLoc": {
            "col": 1,
            "line": 298
          },
          "startBody": {
            "col": 41,
            "line": 131
          },
          "endBody": {
            "col": 1,
            "line": 298
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
const GettingStarted = () => {
  const getContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_3__/* .GridCellKind.Text */ .p6.Text,
      allowOverlay: false,
      displayData: d,
      data: d
    };
  }, []);
  const [rowMarkers, setRowMarkers] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [smoothScroll, setSmoothScroll] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [verticalBorder, setVerticalBorder] = react__WEBPACK_IMPORTED_MODULE_0__.useState(true);
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
# Getting Started

Glide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \`getCellContent\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const data = [
    {
      "name": "Hines Fowler",
      "company": "BUZZNESS",
      "email": "hinesfowler@buzzness.com",
      "phone": "+1 (869) 405-3127"
    },
    ...rest
]
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
The columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a \`title\` and an \`id\`. The id is technically optional but it is best not to omit it.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const columns: GridColumn[] = [
    {
        title: "Name",
        id: "name"
    },
    {
        title: "Company",
        id: "company"
    },
    {
        title: "Email",
        id: "email"
    },
    {
        title: "Phone",
        id: "phone"
    }
]
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
Each column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.

Finally the data grid requires a cell fetch callback. This callback should be memoized using \`React.useCallback\` or be a static function.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    // dumb but simple way to do this
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]]
    return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d,
        data: d,
    };
}, []);
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
> Avoid excessive changes to the identity of the \`getCellContent\` callback as the grid will re-render from scratch every time it changes.

That is all the basic requirements put together.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Highlight */ .y$, {
      children: `
return <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;
`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: getContent,
        columns: columns,
        rows: data.length
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Marked */ .M2, {
      children: `
# Going further

There is so much more that can be done:

- Header icons
- Smooth scrolling
- Header menus
- Grouping
- Row markers
- Freeze Columns
- Column reordering and resizing
- Cell spans
- Search
- Copy/paste support

Here are a few to play with.`
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
      style: {
        display: "block"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "checkbox",
        checked: rowMarkers,
        onChange: e => setRowMarkers(e.target.checked)
      }), " Row Markers"]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
      style: {
        display: "block"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "checkbox",
        checked: smoothScroll,
        onChange: e => setSmoothScroll(e.target.checked)
      }), " ", "Smooth Scroll"]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
      style: {
        display: "block"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "checkbox",
        checked: verticalBorder,
        onChange: e => setVerticalBorder(e.target.checked)
      }), " ", "Vertical Borders"]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_doc_wrapper_js__WEBPACK_IMPORTED_MODULE_4__/* .Wrapper */ .im, {
      height: 200,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_data_editor_all_js__WEBPACK_IMPORTED_MODULE_5__/* .DataEditorAll */ .F, {
        getCellContent: getContent,
        verticalBorder: verticalBorder,
        smoothScrollX: smoothScroll,
        smoothScrollY: smoothScroll,
        rowMarkers: rowMarkers ? "both" : "none",
        columns: columns,
        rows: data.length
      })
    })]
  });
};
GettingStarted.displayName = "GettingStarted";
GettingStarted.storyName = "01. Getting Started";;const __namedExportsOrder = ["GettingStarted"];

/***/ })

}]);
//# sourceMappingURL=packages-core-src-docs-01-getting-started-stories.1f1da96d.iframe.bundle.js.map