import type { RowGroup } from "../data-editor/use-groups";
import { deleteGroupByGroupRowId, flattenGroups } from "./groupUtils";

const getGroups = (): RowGroup[] => {
  return [
    {
      name: 'Group 1',
      rowsCount: 0,
      expanded: true,
      id: '1',
      parentId: '',
      groups: [
        {
          name: 'Group 1-1',
          rowsCount: 0,
          id: '1-1',
          parentId: '1',
          groups: [
            {
              name: 'Group 1-1-1',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '1-1-1',
              parentId: '1-1',
            },
            {
              name: 'Group 1-1-2',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '1-1-2',
              parentId: '1-1',
            },
          ],
          expanded: true,
        },
        { name: 'Group 1-2', rowsCount: 1, groups: [], expanded: true, id: '1-2', parentId: '1' },
      ],
    },
    {
      name: 'Group 2',
      rowsCount: 0,
      expanded: true,
      id: '2',
      parentId: '',
      groups: [
        {
          name: 'Group 2-1',
          rowsCount: 0,
          id: '2-1',
          parentId: '2',
          groups: [
            {
              name: 'Group 2-1-1',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '2-1-1',
              parentId: '2-1',
            },
            {
              name: 'Group 2-1-2',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '2-1-2',
              parentId: '2-1',
            },
          ],
          expanded: true,
        },
        { name: 'Group 2-2', rowsCount: 1, groups: [], expanded: true, id: '2-2', parentId: '2' },
      ],
    },
    {
      name: 'Group 3',
      rowsCount: 0,
      expanded: true,
      id: '3',
      parentId: '',
      groups: [
        {
          name: 'Group 3-1',
          rowsCount: 0,
          id: '3-1',
          parentId: '3',
          groups: [
            {
              name: 'Group 3-1-1',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '3-1-1',
              parentId: '3-1',
            },
            {
              name: 'Group 3-1-2',
              rowsCount: 1,
              groups: [],
              expanded: true,
              id: '3-1-2',
              parentId: '3-1',
            },
          ],
          expanded: true,
        },
        { name: 'Group 3-2', rowsCount: 1, groups: [], expanded: true, id: '3-2', parentId: '3-1' },
      ],
    },
  ];
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
        parentId: '',
      },
      {
        name: `Group 2`,
        rowsCount: 3,
        expanded: true,
        id: "2",
        groups: [],
        parentId: '',
      },
      {
        name: `Group 2`,
        rowsCount: 3,
        expanded: true,
        id: "3",
        groups: [],
        parentId: '',
            },
        ];

        groups[1].expanded = false;
        expect(flattenGroups(groups, true)).toMatchSnapshot();
    });

  it('should delete a group by groupRowId and return true', () => {
    const targetGroupRowId = '1-1-1';
    const mockData = getGroups();
    deleteGroupByGroupRowId(mockData, targetGroupRowId);

    // Ensure the group is deleted
    expect(mockData).toMatchSnapshot();
  });
  it('should return false when the groupRowId does not exist', () => {
    const targetGroupRowId = '4-3-1';
    const mockData = getGroups();
    const result = deleteGroupByGroupRowId(mockData, targetGroupRowId);

    expect(result).toBe(false);
  });

  it('should handle deleting a root-level group', () => {
    const targetGroupRowId = '1-1-1';
    const mockData = getGroups();
    const result = deleteGroupByGroupRowId(mockData, targetGroupRowId);

    expect(result).toBe(true);
    // Ensure the root-level group is deleted
    expect(mockData).toMatchSnapshot();
  });
});
