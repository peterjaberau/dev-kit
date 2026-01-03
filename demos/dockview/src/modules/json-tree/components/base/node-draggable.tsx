"use client"

// import { DropIndicator } from "#drag-drop/components/dnd-drop-indicator"
// import { GroupDropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/group';
import { GroupDropIndicator } from "#components/pragmatic-drag-drop/drop-indicator/group"
import { DependencyContext, TreeContext } from "#drag-drop/providers/tree-context"
import { useDraggableTreeItem } from "../../hooks/use-draggable-tree-item"
import { IoBugOutline as DebugIcon } from "react-icons/io5"

import React, { forwardRef, useContext, useRef, memo, Suspense } from "react"
import { Stack, For, Box, Badge, HStack, IconButton, Button } from "@chakra-ui/react"
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
  Toolbar,
  ToolbarItem,
} from "."

const indentPerLevel = 5

export const NodeDraggable = memo(
  forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
    const { nodeRef, ...rest } = props
    const nodeSelector = useNode({ actorRef: nodeRef })
    const {
      childNames,
      dataRuntimeInfo: dataInfo,
      getChildNode,
      nodeId,
      dataName,
      dataValue,
      displayLabels,
      isOpen,
      metadata,
      sendToNode,
      parentNodeRef = null,
      parentNodeId,
      parentContext,
      parentState,
      nodeContext,
    } = nodeSelector

    const handleLogs = (e: any) => {
      e.stopPropagation()
      console.log(`NODE LOGS---${nodeId} | childOf ${parentNodeId}-----`, { nodeContext, parentContext })
    }

    /** START drag-drop logic */
    const itemRef: any = useRef<HTMLDivElement | null>(null)
    const childrenGroupRef = useRef<HTMLDivElement | null>(null)

    const { dispatch, uniqueContextId } = useContext(TreeContext)
    const { attachInstruction, extractInstruction, DropIndicator } = useContext(DependencyContext)

    const { dragState, groupState, instruction } = useDraggableTreeItem({
      item: {
        id: metadata.id,
        nodeId: nodeId,
        parentId: parentNodeId,
        node: nodeContext,
        parent: parentContext,
        nodeSelector: nodeSelector,
        parentSelector: parentState
        // parent: getParentContext()
      },
      buttonRef: itemRef,
      groupRef: metadata?.data?.isBranch ? childrenGroupRef : { current: null },
      uniqueContextId,
      attachInstruction,
      extractInstruction,
      //@ts-ignore
      hasChildren: metadata?.data?.isBranch,
      isOpen,
      onExpand: () => sendToNode({ type: "BRANCH_OPEN_CHANGED", isOpen: true }),
      onCollapse: () => sendToNode({ type: "BRANCH_OPEN_CHANGED", isOpen: false }),

      // item: {
      //   id: metadata?.id,
      //   children: metadata?.children,
      //   isOpen: metadata?.data?.isBranch && metadata?.data?.isOpen,
      //   isDraft: false,
      // },
      // buttonRef: itemRef,
      // groupRef: childrenGroupRef,
      // dispatch,
      // uniqueContextId,
      // attachInstruction,
      // extractInstruction,
    })
    /** END drag-drop logic */

    return (
      <Stack
        css={{
          // support dnd
          position: "relative",
          ...(dragState === "idle" && {
            borderRadius: 3,
            cursor: "pointer",
            _hover: {
              // backgroundColor: "bg.panel",
              // backgroundColor: "rgba(9, 30, 66, 0.06)",
            },
          }),
        }}
        ref={ref}
        {...rest}
      >
        <Box
          ref={itemRef}
          css={{
            opacity: dragState === "dragging" ? 0.4 : 1,
          }}
        >
          {dataInfo?.isBranch && (
            <Branch
              data-open={metadata.data.open}
              data-drag-state={dragState}
              data-id={nodeId}
              nodeRef={nodeRef}
              dragState={dragState}
            >
              {/* always BranchControl or BranchTrigger when it comes first, consider asChild*/}
              <BranchControl data-open={metadata.data.open}>
                <BranchTrigger data-open={metadata.data.open} nodeRef={nodeRef} dragState={dragState}>
                  <BranchIndicator />
                  <NodeKey>{dataName}</NodeKey>
                  <HStack flex={1}>
                    <Badge size={"xs"} colorPalette={groupState !== "idle" ? "blue" : undefined} title={"Branch state"}>
                      {groupState}
                    </Badge>
                    <Badge size={"xs"} colorPalette={dragState !== "idle" ? "blue" : undefined} title={"Drag state"}>
                      {groupState}
                    </Badge>
                    <Badge size={"xs"} colorPalette={isOpen ? "blue" : undefined}>
                      {isOpen ? "open" : "closed"}
                    </Badge>
                    <Badge size={"xs"} title={"Node Parent ID"}>
                      {parentNodeId || "root"}
                    </Badge>
                    <Badge size={"xs"} title={"Node ID"}>
                      {nodeId}
                    </Badge>
                    {instruction?.operation && (
                      <Badge size={"xs"} variant={"solid"}>
                        {instruction?.operation}
                      </Badge>
                    )}
                    <Badge size={"xs"} colorPalette={isOpen ? "blue" : undefined}>
                      {isOpen ? "open" : "closed"}
                    </Badge>
                  </HStack>

                  <Badge size={"sm"} variant={"outline"} onClick={handleLogs}>
                    <DebugIcon />
                  </Badge>
                  <NodeLabel>{displayLabels.childrenCountLabel}</NodeLabel>
                  <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
                  {instruction ? <DropIndicator instruction={instruction} /> : null}
                </BranchTrigger>
              </BranchControl>
              <BranchContent data-open={metadata.data.open}>
                <GroupDropIndicator ref={childrenGroupRef} isActive={groupState === "is-innermost-over"}>
                  {metadata?.data?.isBranch && metadata?.data?.isOpen && (
                    <Stack gap={2}>
                      <For each={metadata?.children}>
                        {(child: any, index: any) => {
                          return <NodeDraggable key={child} nodeRef={getChildNode(child)} />
                        }}
                      </For>
                    </Stack>
                  )}
                </GroupDropIndicator>
              </BranchContent>
            </Branch>
          )}
          {dataInfo?.isScalar && (
            <ItemDraggable>
              <ItemControl>
                <NodeKey>{metadata?.name}</NodeKey>
                <NodeKeyValue>{dataValue}</NodeKeyValue>
                <HStack flex={1}>
                  <Badge size={"xs"} colorPalette={groupState !== "idle" ? "blue" : undefined} title={"Branch state"}>
                    {groupState}
                  </Badge>
                  <Badge size={"xs"} colorPalette={dragState !== "idle" ? "blue" : undefined} title={"Drag state"}>
                    {groupState}
                  </Badge>
                  <Badge size={"xs"} colorPalette={isOpen ? "blue" : undefined}>
                    {isOpen ? "open" : "closed"}
                  </Badge>
                  <Badge size={"xs"} title={"Node Parent ID"}>
                    {parentNodeId || "root"}
                  </Badge>
                  <Badge size={"xs"} title={"Node ID"}>
                    {nodeId}
                  </Badge>
                  {instruction?.operation && (
                    <Badge size={"xs"} variant={"solid"}>
                      {instruction?.operation}
                    </Badge>
                  )}
                  <Badge size={"xs"} colorPalette={isOpen ? "blue" : undefined}>
                    {isOpen ? "open" : "closed"}
                  </Badge>
                </HStack>
                <Badge size={"sm"} variant={"outline"} onClick={handleLogs}>
                  <DebugIcon />
                </Badge>
                <NodeCode>{displayLabels.dataTypeLabel}</NodeCode>
                {instruction && <DropIndicator instruction={instruction} />}
              </ItemControl>
            </ItemDraggable>
          )}
        </Box>
      </Stack>
    )
  }),
)
