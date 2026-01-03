"use client"

import { forwardRef, memo, useRef } from "react"
import { Stack } from "@chakra-ui/react"
import { DropTargetBranch, DraggableBranch } from "./drag-and-drop"
import { useNodeDraggable } from './use-node-draggable'
import { useNode } from "../../selectors"


export const NodeDraggableBranch = (props: any) => {
  const { nodeRef, ...rest } = props
  const { nodeId } = useNode({ actorRef: nodeRef })
  const draggableBranchRef: any = useRef<HTMLDivElement | null>(null)




  // return (
  //   //Branch header with drag and drop
  //   <DropTargetBranch id={nodeId} index={0} onDrop={handleDrop}>
  //     {/* Placeholder for Draggable Branch Content */}
  //   </DropTargetBranch>
  // )
}
