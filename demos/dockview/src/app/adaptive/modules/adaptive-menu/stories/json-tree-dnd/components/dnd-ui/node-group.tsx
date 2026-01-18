import { forwardRef, Fragment, memo, useCallback, useEffect, useRef, useState } from "react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { chakra, HStack } from "@chakra-ui/react"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { NodeList } from "./node-list"

import { Control } from "./control"
import { ControlTrigger } from "./control.trigger"
import { ControlContent } from "./control.content"

// TODO: clear in onGenerateDragPreview()?
const expandedAtDragStart = new Set<string>()

export const NodeGroup = (props: any) => {
  const { actorRef, level, index } = props

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
    dataChildren,
    menuItemRef,
  } = useMenuItem({ actorRef: actorRef })

  const hasChildren = !!item?.children

  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        return item?.children || []
      },
    },
    dropTarget: {
      getData: () => item?.children || [],
      getOperations: () => ({
        combine: "available",
        "reorder-before": "available",
        "reorder-after": isOpen ? "not-available" : "available",
      }),
      canDrop: ({ source }: any) => !!source.data?.children,
    },
  })

  return (
    <>
      <Control
      // isExpanded={isExpanded}
      // onExpansionToggle={() => setIsExpanded((value) => !value)}
      // actorRef={actorRef}
      // dropIndicator={dropIndicator}
      // data-index={index}
      // data-level={level}
      // ref={dropTargetRef}
      >
        <ControlTrigger
          ref={draggableAnchorRef}
          // href={filter.href}
          isDragging={state === "dragging"}
          hasDragIndicator
          visualContentRef={dropTargetRef}
          dropIndicator={dropIndicator}
        >
          <HStack alignItems="center" w="full" gap={0}>
            <NodeText css={{ flexGrow: 1 }}>{dataName}</NodeText>
            <NodeTag>{item.id}</NodeTag>
            <NodeTag>{isBranchData ? "Branch" : "Leaf"}</NodeTag>
          </HStack>
        </ControlTrigger>
        <ControlContent>
          <NodeList actorRef={menuItemRef} />
        </ControlContent>
      </Control>
      {dragPreview}
    </>
  )
}
