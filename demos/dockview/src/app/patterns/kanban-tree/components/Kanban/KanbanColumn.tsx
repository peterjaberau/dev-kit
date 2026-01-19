import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Column } from "../../types/kanban.types";

type Props = {
    column: Column;
    onAddTask: (columnId: string) => void;
    onRenameTask: (columnId: string, taskId: string, text: string) => void;
    onDeleteTask: (columnId: string, taskId: string) => void;
};

const headerColors: Record<string, string> = {
    todo: "bg-red-100 text-red-700",
    progress: "bg-yellow-100 text-yellow-700",
    done: "bg-green-100 text-green-700"
};

export default function KanbanColumn({
                                         column,
                                         onAddTask,
                                         onRenameTask,
                                         onDeleteTask
                                     }: Props) {
    const { setNodeRef } = useDroppable({ id: column.id });

    return (
        <div
            ref={setNodeRef}
            className="h-100 w-72 bg-gray-100 rounded-lg p-3 flex-shrink-0"
        >
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-sm">{column.title}</h2>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                            headerColors[column.id]
                        }`}
                    >
            {column.tasks.length}
          </span>
                </div>

                <button
                    onClick={() => onAddTask(column.id)}
                    className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700"
                >
                    + Add
                </button>
            </div>
            <div className="space-y-2">
                {column.tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        columnId={column.id}
                        onRename={onRenameTask}
                        onDelete={onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
}
