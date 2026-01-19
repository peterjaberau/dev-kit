import type { TreeNode } from "../types/tree.types";

export const renameNode = (node: TreeNode, id: string, name: string): TreeNode =>
    node.id === id
        ? { ...node, name }
        : { ...node, nodes: node.nodes.map(c => renameNode(c, id, name)) };

export const addNode = (node: TreeNode, parentId: string): TreeNode =>
    node.id === parentId
        ? {
            ...node,
            nodes: [
                ...node.nodes,
                { id: crypto.randomUUID(), name: "New Node", nodes: [] }
            ]
        }
        : { ...node, nodes: node.nodes.map(c => addNode(c, parentId)) };

export const deleteNode = (node: TreeNode, id: string): TreeNode | null =>
    node.id === id
        ? null
        : {
            ...node,
            nodes: node.nodes
                .map(c => deleteNode(c, id))
                .filter(Boolean) as TreeNode[]
        };

export const findNode = (node: TreeNode, id: string): TreeNode | null => {
    if (node.id === id) return node;
    for (const c of node.nodes) {
        const found = findNode(c, id);
        if (found) return found;
    }
    return null;
};

export const removeNode = (node: TreeNode, id: string): TreeNode => ({
    ...node,
    nodes: node.nodes
        .filter(c => c.id !== id)
        .map(c => removeNode(c, id))
});

export const insertNode = (
    node: TreeNode,
    targetId: string,
    dragged: TreeNode
): TreeNode =>
    node.id === targetId
        ? { ...node, nodes: [...node.nodes, dragged] }
        : { ...node, nodes: node.nodes.map(c => insertNode(c, targetId, dragged)) };
