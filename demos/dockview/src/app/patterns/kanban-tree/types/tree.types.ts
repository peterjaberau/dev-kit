export type TreeNode = {
    id: string;
    name: string;
    nodes: TreeNode[];
    url?: string;
};
