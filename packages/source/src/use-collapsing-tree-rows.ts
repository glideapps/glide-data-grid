import type { TreeNode } from "@glideapps/glide-data-grid-cells/src/cells/tree-cell";
import React from "react";

const names = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];

const createNode = (name: string, children: TreeNode[] = []): TreeNode => ({
    name,
    children
});

const flattenTree = (tree: TreeNode): TreeNode[] => {
    const _visit = (node: TreeNode, depth: number = 0) => {
        node.depth = depth;
        flattened.push(node);
        if (node.collapsed === true) return;
        node.children.forEach(child => { _visit(child, depth + 1) });
    };

    const flattened: TreeNode[] = [];

    _visit(tree);

    return flattened;
}

export function createSampleTree(): TreeNode {
    const root = createNode("Root");

    names.forEach(nameX => {
        const nodeX = createNode(nameX);
        root.children.push(nodeX);
        names.forEach(nameY => {
            const nameXY = `${nameX} ${nameY}`;
            const nodeY = createNode(nameXY);
            nodeY.collapsed = true;
            nodeX.children.push(nodeY);
            names.forEach(nameZ => {
                const nameXYZ = `${nameX} ${nameY} ${nameZ}`;
                const nodeZ = createNode(nameXYZ);
                nodeY.children.push(nodeZ);
            });
        });
    });

    return root;
}

export function useCollapsingTreeRows(tree: TreeNode): TreeNode[] {
    return React.useMemo(() => flattenTree(tree), [tree]);
}
