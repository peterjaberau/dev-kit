import { Draggable } from "./draggable"

interface DraggableNodeItemProps {
  id: string
  index: number
  parentId?: string
  type?: string
  children: React.ReactNode
}

/**
 * draggable wrapper for item (leaf) type nodes.
 * Uses tree mode for hierarchical drag-and-drop.
 */
export function DraggableItem({ id, index, parentId, children, type = "node-item" }: DraggableNodeItemProps) {
  return (
    <Draggable
      id={id}
      index={index}
      mode="tree"
      getData={() => ({
        type: type,
        id,
        index,
        parentId,
        hasParent: !!parentId, //isInGroup
      })}
    >
      {children}
    </Draggable>
  )
}
