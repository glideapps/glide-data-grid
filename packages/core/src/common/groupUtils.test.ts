import type { RowGroup } from "../data-editor/use-groups";
import { flattenGroups } from "./groupUtils";

const getGroups = (): RowGroup[] => {
    return [{
        "name": "Group 1",
        "rowsCount": 0,
        "expanded": true,
        "id": "1",
        "groups": [{
            "name": "Group 1-1",
            "rowsCount": 0,
            "id": "1-1",
            "groups": [{
                "name": "Group 1-1-1",
                "rowsCount": 1,
                "groups": [],
                "expanded": true,
                "id": "1-1-1",
            }, { "name": "Group 1-1-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "1-1-2" }],
            "expanded": true,
        }, { "name": "Group 1-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "1-2" }],
    }, {
        "name": "Group 2",
        "rowsCount": 0,
        "expanded": true,
        "id": "2",
        "groups": [{
            "name": "Group 2-1",
            "rowsCount": 0,
            "id": "2-1",
            "groups": [{
                "name": "Group 2-1-1",
                "rowsCount": 1,
                "groups": [],
                "expanded": true,
                "id": "2-1-1",
            }, { "name": "Group 2-1-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "2-1-2" }],
            "expanded": true,
        }, { "name": "Group 2-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "2-2" }],
    }, {
        "name": "Group 3",
        "rowsCount": 0,
        "expanded": true,
        "id": "3",
        "groups": [{
            "name": "Group 3-1",
            "rowsCount": 0,
            "id": "3-1",
            "groups": [{
                "name": "Group 3-1-1",
                "rowsCount": 1,
                "groups": [],
                "expanded": true,
                "id": "3-1-1",
            }, { "name": "Group 3-1-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "3-1-2" }],
            "expanded": true,
        }, { "name": "Group 3-2", "rowsCount": 1, "groups": [], "expanded": true, "id": "3-2" }],
    }];
};

describe("flattenGroups", () => {

    it("matches snapshot", () => {
        const groups = getGroups();
        expect(flattenGroups(groups, true)).toMatchSnapshot();
    });

    it("collapses first group", () => {
        const groups = getGroups();
        groups[0].expanded = false;
        expect(flattenGroups(groups, true)).toMatchSnapshot();
    });

    it("has single level group", () => {
        const groups = [
            {
                name: `Group 1`,
                rowsCount: 3,
                expanded: true,
                id: "1",
                groups: [],
            },
            {
                name: `Group 2`,
                rowsCount: 3,
                expanded: true,
                id: "2",
                groups: [],
            },
            {
                name: `Group 2`,
                rowsCount: 3,
                expanded: true,
                id: "3",
                groups: [],
            },
        ];

        groups[1].expanded = false;
        expect(flattenGroups(groups, true)).toMatchSnapshot();
    });
});
