'use client'
import {useState} from "react";
import {DndContext, type DragEndEvent, DragOverlay, type DragStartEvent} from "@dnd-kit/core";
import type {TreeNode} from "../../types/tree.types";
import {initialTree} from "../../data/initialTree";
import {addNode, deleteNode, findNode, insertNode, removeNode, renameNode} from "../../helpers/treeHelpers";
import DragPreview from "./DragPreview";
import { TreeNodeRec } from "./TreeNode";

const Index = () => {
    const [tree, setTree] = useState<TreeNode>(initialTree);
    const [activeNode, setActiveNode] = useState<TreeNode | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const dragged = findNode(tree, String(event.active.id));
        if (dragged) setActiveNode(dragged);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveNode(null);

        if (!over || active.id === over.id) return;

        const draggedNode = findNode(tree, String(active.id));
        if (!draggedNode) return;

        let updatedTree = removeNode(tree, String(active.id));
        updatedTree = insertNode(updatedTree, String(over.id), draggedNode);

        setTree(updatedTree);
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <TreeNodeRec
                    node={tree}
                    onRename={(id, name) =>
                        setTree((p) => renameNode(p, id, name))
                    }
                    onAdd={(id) =>
                        setTree((p) => addNode(p, id))
                    }
                    onDelete={(id) =>
                        setTree((p) => deleteNode(p, id)!)
                    }
                />

            <DragOverlay>
                {activeNode && <DragPreview node={activeNode} />}
            </DragOverlay>
        </DndContext>
    );
}

export default Index