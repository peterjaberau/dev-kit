import { FcOpenedFolder } from "react-icons/fc";
import type { TreeNode } from "../../types/tree.types";

export default function DragPreview({ node }: { node: TreeNode }) {
    return (
        <div className="flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-md px-4 py-2 shadow-xl scale-105 opacity-90">
            <FcOpenedFolder />
            <span className="text-sm font-medium text-blue-800">
                {node.name}
            </span>
        </div>
    );
}
