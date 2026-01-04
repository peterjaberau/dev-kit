"use client"
import { Container, For, Stack, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useRef } from "react"
import { useNode } from "#shared/selectors"
import { useDragAndDrop } from "./use-drag-and-drop"
import { Node } from "./node"
import { NodeDrop } from "./node.drop"
import { NodeDragBranch } from "./node.drag-branch"
import { NodeDragItem } from "./node.drag-item"

export const Tree = forwardRef<HTMLDivElement, any>((props: any, ref) => {
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
    getChildNodeMetadata,
    getChildNodeState,
  } = nodeSelector

  const { handleDrop } = useDragAndDrop()

  return (
    /*

     data-slot="sidebar-group-content"
      data-sidebar="group-content"

     */

    <Container data-scope={"tree"} data-part={"tree"} ref={ref} {...rest}>
      {/* Node = SidebarMenu */}
      <Node>
        <NodeDrop
          id="tree"
          index={-1}
          mode="list-item"
          currentLevel={0}
          indentPerLevel={24}
          getData={() => ({ type: "drop-tree" })}
          onDrop={handleDrop}
        >
          <For each={metadata?.children}>
            {(child: any, index: any) => {
              const childNodeState: any = getChildNodeState(child)

              return getChildNodeState?.context?.metadata?.data?.isBranch ? (
                // render as NodeDragBranch
                <NodeDragBranch key={child} id={child} index={index} node={childNodeState} />
              ) : (
                // render as NodeDragItem
                <NodeDragItem key={child} id={child} index={index} node={childNodeState} />
              )
            }}
          </For>
        </NodeDrop>
      </Node>
    </Container>
  )
})
