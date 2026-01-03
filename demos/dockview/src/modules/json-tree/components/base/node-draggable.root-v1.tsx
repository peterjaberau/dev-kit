"use client"

import { memo, useContext, useRef } from "react"
import { Box, Stack } from "@chakra-ui/react"
import { DropTarget } from './drag-and-drop/drop-target'

import { useNode } from "../../selectors"

export const NodeRootDraggable = () => {
  const { childNames, dataRuntimeInfo, getChildNode, metadata } = useNode() // ⬅️ NO ARGUMENT (root)

  /** ---------------- refs ---------------- */
  const rootRef = useRef<HTMLDivElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)

  /** ---------------- context ---------------- */
  const { dispatch, uniqueContextId } = useContext(TreeContext)
  const { extractInstruction } = useContext(DependencyContext)

  /** ---------------- drag / drop (ROOT GROUP) ---------------- */
  const { groupState } = useDraggableTree({
    rootRef,
    groupRef,
    uniqueContextId,
    extractInstruction,
    dispatch,
  })

  /** ---------------- render ---------------- */
  return (
    <Box ref={rootRef} w="100%" {...props}>
      <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
        <Stack gap={2}>
          {metadata?.children?.map((child: any, index: any) => (
            <NodeDraggable key={child} nodeRef={getChildNode(child)} level={0} index={index} />
          ))}
        </Stack>
      </GroupDropIndicator>
    </Box>
  )
}
