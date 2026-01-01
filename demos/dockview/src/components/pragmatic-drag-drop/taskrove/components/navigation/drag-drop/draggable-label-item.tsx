"use client"

import { DraggableItem } from "../../ui/drag-drop/draggable-item"


export function DraggableLabelItem({
  labelId,
  index,
  name,
  color,
  children,
}: any) {
  return (
    <DraggableItem
      id={labelId}
      index={index}
      mode="list"
      getData={() => ({
        type: "sidebar-label",
        labelId,
        index,
        name,
        color,
      })}
    >
      {children}
    </DraggableItem>
  )
}
