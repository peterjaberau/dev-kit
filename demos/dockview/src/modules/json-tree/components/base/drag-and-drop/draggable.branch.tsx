import { Draggable } from "./draggable"

interface DraggableBranchProps {
  id: string //GroupID
  index: number
  children: React.ReactNode
  type?: string
}

/**
 * draggable wrapper for branch type nodes.
 * Uses tree mode for hierarchical drag-and-drop.
 */
export function DraggableBranch({ id, index, children, type = "node-branch" }: DraggableBranchProps) {
  return (
    <Draggable
      id={id}
      index={index}
      mode="tree"
      getData={() => ({
        type: type,
        id,
        index,
      })}
    >
      {children}
    </Draggable>
  )
}
