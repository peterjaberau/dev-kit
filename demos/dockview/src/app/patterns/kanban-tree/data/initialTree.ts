import type { TreeNode } from "../types/tree.types";

export const initialTree: TreeNode = {
    id: "1",
    name: "Root",
    nodes: [
        {
            id: "portfolio",
            name: "My Portfolio",
            url: "https://ansh-portfolio-swart.vercel.app/",
            nodes: []
        },
        {
            id: "2",
            name: "Level 2",
            nodes: [
                { id: "2-1", name: "Level 2-1", nodes: [] },
                {
                    id: "2-2",
                    name: "Level 2-2",
                    nodes: []
                }
            ]
        },
        {
            id: "3",
            name: "Level 3",
            nodes: [
                { id: "3-1", name: "Level 3-1", nodes: [
                    { id: "3-1-1", name: "Level 3-1-1", nodes: [] }
                    ] },
                {
                    id: "3-2",
                    name: "Level 3-2",
                    nodes: []
                }
            ]
        }
    ]
};
