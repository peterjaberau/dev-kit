"use client"
import { useState } from "react";
import {
    DndContext,
    DragOverlay,
    type DragEndEvent,
    type DragStartEvent
} from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import type { Column, Task } from "../../types/kanban.types";
import { initialBoard } from "../../data/initialBoard";

function Index() {
    const [columns, setColumns] = useState<Column[]>(initialBoard);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const addTask = (columnId: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: [
                            ...col.tasks,
                            { id: crypto.randomUUID(), text: "New Card" }
                        ]
                    }
                    : col
            )
        );
    };

    const renameTask = (columnId: string, taskId: string, text: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map(t =>
                            t.id === taskId ? { ...t, text } : t
                        )
                    }
                    : col
            )
        );
    };

    const deleteTask = (columnId: string, taskId: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.filter(t => t.id !== taskId)
                    }
                    : col
            )
        );
    };
    const handleDragStart = (event: DragStartEvent) => {
        const [columnId, taskId] = String(event.active.id).split("|");
        const column = columns.find(c => c.id === columnId);
        const task = column?.tasks.find(t => t.id === taskId);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const [fromColumnId, taskId] = String(active.id).split("|");
        const toColumnId = String(over.id);

        if (fromColumnId === toColumnId) return;

        setColumns(cols => {
            let movedTask: Task | undefined;

            const updated = cols.map(col => {
                if (col.id === fromColumnId) {
                    movedTask = col.tasks.find(t => t.id === taskId);
                    return {
                        ...col,
                        tasks: col.tasks.filter(t => t.id !== taskId)
                    };
                }
                return col;
            });

            return updated.map(col =>
                col.id === toColumnId && movedTask
                    ? { ...col, tasks: [...col.tasks, movedTask] }
                    : col
            );
        });
    };

    return (

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onAddTask={addTask}
                onRenameTask={renameTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="w-64 scale-105 rounded-md bg-white p-3 shadow-xl">
                <span className="text-sm font-medium">{activeTask.text}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
    )
}


export default Index