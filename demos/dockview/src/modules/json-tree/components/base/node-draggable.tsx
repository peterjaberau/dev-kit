"use client"

// import { DropIndicator } from "#drag-drop/components/dnd-drop-indicator"
// import { GroupDropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/group';
import { GroupDropIndicator } from "#components/pragmatic-drag-drop/drop-indicator/group"
import { DependencyContext, TreeContext } from "#drag-drop/providers/tree-context"
import { useDraggableTreeItem } from "#drag-drop/hooks/use-draggable-tree-item"

import React, { forwardRef, useContext, useRef, memo } from "react"
import { Stack, For, Box } from "@chakra-ui/react"
import { useNode } from "../../selectors"
import {
  Branch,
  BranchTrigger,
  BranchControl,
  BranchContent,
  BranchIndicator,
  NodeLabel,
  NodeCode,
  NodeKey,
  NodeKeyValue,
  NodeIndicator,
  ItemDraggable,
  ItemControl,
} from "."

const indentPerLevel = 5

export const NodeDraggable = memo(forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, ...rest } = props
  const {
    childNames,
    dataRuntimeInfo: dataInfo,
    getChildNode,
    nodeId,
    dataValue,
    displayLabels,
    isOpen,
  } = useNode({ actorRef: nodeRef })


  /** START drag-drop logic */
  const itemRef: any = useRef<HTMLDivElement | null>(null)
  const childrenGroupRef = useRef<HTMLDivElement | null>(null)

  const { dispatch, uniqueContextId } = useContext(TreeContext)
  const { attachInstruction, extractInstruction, DropIndicator } = useContext(DependencyContext)

  const { dragState, groupState, instruction } = useDraggableTreeItem({
    item: {
      id: nodeId,
      children: childNames,
      isOpen: dataInfo?.isBranch && isOpen,
      isDraft: false,
    },
    buttonRef: itemRef,
    groupRef: childrenGroupRef,
    dispatch,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
  })
  /** END drag-drop logic */


  return (
    <Stack
      css={{
        // support dnd
        position: "relative",
        // opacity: dragState === "dragging" ? 0.4 : 1,
        ...(dragState === "idle" && {
          borderRadius: 3,
          cursor: "pointer",
          _hover: {
            backgroundColor: "rgba(9, 30, 66, 0.06)",
          },
        }),
      }}
      ref={ref}
      {...rest}
    >
      <Box ref={itemRef}
           css={{
             opacity: dragState === "dragging" ? 0.4 : 1
           }}
      >
        {dataInfo?.isBranch && (
          <Branch data-id={nodeId} nodeRef={nodeRef} >
            {instruction && <DropIndicator instruction={instruction} />}
            {/* always BranchControl or BranchTrigger when it comes first, consider asChild*/}
            <BranchControl asChild>
              <BranchTrigger>
                <BranchIndicator />
                <NodeKey flex={1}>{nodeId}</NodeKey>
                <NodeLabel>{displayLabels.childrenCountLabel}</NodeLabel>
                <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
              </BranchTrigger>
            </BranchControl>
            {/*{instruction && <DropIndicator instruction={instruction} />}*/}
            <BranchContent ref={childrenGroupRef}>
              <GroupDropIndicator ref={childrenGroupRef} isActive={groupState === "is-innermost-over"}>
                <Stack gap={2}>
                <For each={childNames}>
                  {(child: any, index: any) => {
                    return <NodeDraggable key={child} nodeRef={getChildNode(child)} />
                  }}
                </For>
                </Stack>
              </GroupDropIndicator>
            </BranchContent>
          </Branch>
        )}
        {dataInfo?.isScalar && (
          <ItemDraggable>
            {/*{instruction && <DropIndicator instruction={instruction} />}*/}
            <ItemControl>
              <NodeKey>{nodeId}</NodeKey>
              <NodeKeyValue flex={1}>{dataValue}</NodeKeyValue>
              <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
            </ItemControl>
          </ItemDraggable>
        )}
      </Box>
    </Stack>
  )
}))
