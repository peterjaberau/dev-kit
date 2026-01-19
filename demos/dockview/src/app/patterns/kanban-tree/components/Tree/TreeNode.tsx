import {useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {IoChevronForward} from "react-icons/io5";
import {FcFolder, FcLink, FcOpenedFolder} from "react-icons/fc";
import {MdDragIndicator} from "react-icons/md";
import type {TreeNode} from "../../types/tree.types";

export function TreeNodeRec({
                         node,
                         onRename,
                         onAdd,
                         onDelete
                     }: {
    node: TreeNode;
    onRename: (id: string, name: string) => void;
    onAdd: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(node.name);

    const hasChildren = node.nodes.length > 0;
    const isReadOnly = Boolean(node.url);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({ id: node.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div className="ml-4 mt-2">
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                className={`flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-md px-3 py-2 shadow-sm max-w-fit hover:bg-gray-200
                ${isDragging ? "opacity-40" : ""}`}
            >
                {hasChildren && (
                    <IoChevronForward
                        onClick={() => setOpen(!open)}
                        className={`cursor-pointer transition-transform ${
                            open ? "rotate-90" : ""
                        }`}
                    />
                )}

                {node.url ? (
                    <FcLink />
                ) : open ? (
                    <FcOpenedFolder />
                ) : (
                    <FcFolder />
                )}

                {node.url ? (
                    <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                    >
                        {node.name}
                    </a>
                ) : editing ? (
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => {
                            onRename(node.id, value.trim() || node.name);
                            setEditing(false);
                        }}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            (onRename(node.id, value.trim() || node.name),
                                setEditing(false))
                        }
                        autoFocus
                        className="border px-1 text-sm"
                    />
                ) : (
                    <span
                        onDoubleClick={() => setEditing(true)}
                        className="cursor-pointer text-sm font-medium"
                    >
                        {node.name}
                    </span>
                )}

                {!isReadOnly && (
                    <button
                        onClick={() => onAdd(node.id)}
                        className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded"
                    >
                        + Add
                    </button>
                )}

                {!isReadOnly && (
                    <button
                        onClick={() => onDelete(node.id)}
                        className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded"
                    >
                        Delete
                    </button>
                )}

                {/* DRAG HANDLE */}
                {!isReadOnly && (
                    <span
                        {...listeners}
                        className="ml-2 cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700"
                        title="Drag"
                    >
                        <MdDragIndicator size={18} />
                    </span>
                )}
            </div>

            {open && hasChildren && (
                <div className="pl-4 mt-2 space-y-2">
                    {node.nodes.map((child) => (
                        <TreeNodeRec
                            key={child.id}
                            node={child}
                            onRename={onRename}
                            onAdd={onAdd}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
