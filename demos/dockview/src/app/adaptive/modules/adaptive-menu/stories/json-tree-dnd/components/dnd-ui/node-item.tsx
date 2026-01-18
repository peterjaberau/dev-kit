import React, { Fragment, useEffect, useRef, useState } from "react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { ControlItem } from "./control.item"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { HStack } from "@chakra-ui/react"

export function NodeItem(props: any) {
  const { actorRef: actorRef } = props
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
  } = useMenuItem({ actorRef: actorRef })

  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => item?.children || [],
    },
    dropTarget: {
      getData: () => {
        return item?.children || []
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
        asChild
        // href={filter.href}
        ref={draggableAnchorRef}
        data-draggable={state}
        itemRef={actorRef}
        isDragging={state === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
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
