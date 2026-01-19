import type {Column} from "../types/kanban.types";

export const initialBoard: Column[] = [
    {
        id: "todo",
        title: "Todo",
        tasks: [
            { id: "t1", text: "Create initial project plan" },
            { id: "t2", text: "Design landing page" }
        ]
    },
    {
        id: "progress",
        title: "In Progress",
        tasks: [{ id: "t3", text: "Implement authentication" }]
    },
    {
        id: "done",
        title: "Done",
        tasks: [{ id: "t4", text: "Organize repository" }]
    }
];