import type { RowGroup } from "../data-editor/use-groups";
import { flattenGroups } from "./groupUtils";
import { CustomRow, GridRowKind } from "../data-grid/data-grid-types";

const getGroups = (): RowGroup[] => {
    return [{
        "name": "Group 1",
        "rows": [],
        "expanded": true,
        "id": "1",
        "groups": [{
            "name": "Group 1-1",
            "rows": [],
            "id": "1-1",
            "groups": [{
                "name": "Group 1-1-1",
                "rows": [0],
                "groups": [],
                "expanded": true,
                "id": "1-1-1",
            }, { "name": "Group 1-1-2", "rows": [1], "groups": [], "expanded": true, "id": "1-1-2" }],
            "expanded": true,
        }, { "name": "Group 1-2", "rows": [2], "groups": [], "expanded": true, "id": "1-2" }],
    }, {
        "name": "Group 2",
        "rows": [],
        "expanded": true,
        "id": "2",
        "groups": [{
            "name": "Group 2-1",
            "rows": [],
            "id": "2-1",
            "groups": [{
                "name": "Group 2-1-1",
                "rows": [3],
                "groups": [],
                "expanded": true,
                "id": "2-1-1",
            }, { "name": "Group 2-1-2", "rows": [4], "groups": [], "expanded": true, "id": "2-1-2" }],
            "expanded": true,
        }, { "name": "Group 2-2", "rows": [5], "groups": [], "expanded": true, "id": "2-2" }],
    }, {
        "name": "Group 3",
        "rows": [],
        "expanded": true,
        "id": "3",
        "groups": [{
            "name": "Group 3-1",
            "rows": [],
            "id": "3-1",
            "groups": [{
                "name": "Group 3-1-1",
                "rows": [6],
                "groups": [],
                "expanded": true,
                "id": "3-1-1",
            }, { "name": "Group 3-1-2", "rows": [7], "groups": [], "expanded": true, "id": "3-1-2" }],
            "expanded": true,
        }, { "name": "Group 3-2", "rows": [8], "groups": [], "expanded": true, "id": "3-2" }],
    }];
};

describe("flattenGroups", () => {
    const addRecordRow: CustomRow = {
        kind: GridRowKind.Custom,
        data: {
            kind: "AddRow",
        },
        themeOverride: {
            bgCell: "#F7F7F8",
        },
    };

    it("matches snapshot", () => {
        const groups = getGroups();
        expect(flattenGroups(groups, addRecordRow)).toMatchSnapshot();
    });

    it("collapses first group", () => {
        const groups = getGroups();
        groups[0].expanded = false;
        expect(flattenGroups(groups, addRecordRow)).toMatchSnapshot();
    });

    it("has single level group", () => {
        const groups = [
            {
                name: `Group 1`,
                rows: [1, 2, 3],
                expanded: true,
                id: "1",
                groups: [],
            },
            {
                name: `Group 2`,
                rows: [4, 5, 6],
                expanded: true,
                id: "2",
                groups: [],
            },
            {
                name: `Group 2`,
                rows: [7, 8, 9],
                expanded: true,
                id: "3",
                groups: [],
            },
        ];

        groups[1].expanded = false;
        expect(flattenGroups(groups, addRecordRow)).toMatchSnapshot();
    });
});
