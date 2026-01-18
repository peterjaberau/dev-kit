import React, { Fragment, useEffect, useRef, useState } from "react"
import { NodeGroup } from "./node-group"
import { NodeTopLevel } from "./node-top-level"
import { Root, MenuList, GroupDropIndicator } from "#adaptive-menu/namespaces/primitive"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { ControlItem } from "./control.item"
import invariant from "tiny-invariant"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/dist/types/entry-point/element/adapter"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { getFilterData, isFilterData } from "#adaptive-menu/stories/jira/data"
import { ControlTriggerIndicator } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui/control.trigger-indicator"
import { NodeText } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui/node.text"
import { NodeTag } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui/node.tag"
import { HStack } from "@chakra-ui/react"
import { ControlTrigger } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui/control.trigger"

export function NodeItem(props: any) {
  const { actorRef: itemRef } = props
  const {
    dataValue: item,
    menuItemChildrenRef,
    dataName,
    menuItemChildrenIds,
    isBranch,
    isBranchEmpty,
    isBranchNotEmpty,
    isLeaf,
    isBranchData,
    isBranchNotEmptyData,
    isBranchEmptyData,
    isLeafData,
    sendToMenuItem,
    isTopLevel,
    isRootNode,
    isOpen,
  } = useMenuItem({ actorRef: itemRef })

  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => item?.children || [],
    },
    dropTarget: {
      getData: () => {
        return item?.children
      },
      getOperations: () => ({
        combine: "available",
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => !!source.data?.children,
    },
  })

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <ControlItem
        ref={draggableAnchorRef}
        data-draggable={state}
        itemRef={itemRef}
        isDragging={state === "dragging"}
        hasDragIndicator
        visualContentRef={dropTargetRef}
      >
        <HStack alignItems="center" w="full" gap={0}>
          <NodeText css={{ flexGrow: 1 }}>{dataName}</NodeText>
          <NodeTag>{item.id}</NodeTag>
          <NodeTag>{isBranchData ? "Branch" : "Leaf"}</NodeTag>
        </HStack>
      </ControlItem>
      {dragPreview}
    </>
  )
}
