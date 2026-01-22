"use client"
import { Tree } from "../.."
import { TreeContext } from "../../components/TreeContext"
import { useState } from "react"

interface RenderNodeProps {
  item: any
  depth: number
  activeId?: string
  onSelect: (id: string) => void
}

export const RenderNode = ({ item, depth, activeId, onSelect }: any) => {
  const [open, setOpen] = useState(true)

  const isActive = activeId === item.id
  const hasChildren = item.isDir && item.children?.length

  return (
    <Tree.Node>
      <div className="group/TreeNodeControls relative flex min-w-0 items-center">
        <Tree.NodeDirToggleIcon
          isDir={item.isDir}
          shouldRenderChildNodes={open}
          handleClickOnDir={() => setOpen((v) => !v)}
        />

        <Tree.NodeTriggers onClick={() => onSelect(item.id)}>
          <Tree.NodeLabel label={item.name} />
          <Tree.NodeOrder order={item.order} />
        </Tree.NodeTriggers>

        <Tree.NodeActions>
          <Tree.ActionsHover>
            <Tree.ActionLabel>Edit</Tree.ActionLabel>
            <Tree.ActionLabel>Delete</Tree.ActionLabel>
          </Tree.ActionsHover>
        </Tree.NodeActions>
      </div>

      {hasChildren && open && (
        <Tree.NodeChildren depth={depth + 1}>
          {item.children!.map((child: any) => (
            <RenderNode key={child.id} item={child} depth={depth + 1} activeId={activeId} onSelect={onSelect} />
          ))}
        </Tree.NodeChildren>
      )}
    </Tree.Node>
  )
}
