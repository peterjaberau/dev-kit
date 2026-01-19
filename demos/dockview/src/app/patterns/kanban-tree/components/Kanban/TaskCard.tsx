import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa";
import type { Task } from "../../types/kanban.types";

type Props = {
    task: Task;
    columnId: string;
    onRename: (columnId: string, taskId: string, text: string) => void;
    onDelete: (columnId: string, taskId: string) => void;
};

export default function TaskCard({
                                     task,
                                     columnId,
                                     onRename,
                                     onDelete
                                 }: Props) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(task.text);

    const { setNodeRef, attributes, listeners, transform, isDragging } =
        useDraggable({
            id: `${columnId}|${task.id}`
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white p-2 rounded shadow flex items-center gap-2 ${
                isDragging ? "ring-2 ring-blue-400" : ""
            }`}
        >
            {/* DRAG HANDLE */}
            <span
                {...listeners}
                {...attributes}
                className="cursor-grab text-gray-400 hover:text-gray-600"
            >
        <FaGripVertical />
      </span>

            {/* TASK TEXT */}
            {editing ? (
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => {
                        onRename(columnId, task.id, value.trim() || task.text);
                        setEditing(false);
                    }}
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (onRename(columnId, task.id, value.trim() || task.text),
                            setEditing(false))
                    }
                    autoFocus
                    className="border rounded px-1 text-sm flex-1"
                />
            ) : (
                <span
                    onDoubleClick={() => setEditing(true)}
                    className="text-sm flex-1 cursor-pointer"
                >
          {task.text}
        </span>
            )}

            {/* DELETE */}
            <button
                onClick={() => onDelete(columnId, task.id)}
                className="text-xs text-red-500 hover:text-red-700"
            >
                ✕
            </button>
        </div>
    );
}
