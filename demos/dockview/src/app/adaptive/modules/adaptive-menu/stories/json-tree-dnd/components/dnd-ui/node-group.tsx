import { forwardRef, Fragment, memo, useCallback, useEffect, useRef } from "react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { useMenuManager } from "#adaptive-menu/use-menu-manager"
import { useDndNode } from "../dnd/use-dnd-node"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { chakra, HStack } from "@chakra-ui/react"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { NodeList } from "./node-list"

import { Control } from "./control"
import { ControlTrigger } from "./control.trigger"
import { ControlTriggerIndicator } from "./control.trigger-indicator"
import { ControlContent } from "./control.content"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/dist/types/entry-point/element/adapter"
import { isFilterData } from "#adaptive-menu/stories/jira/data"
import { getPathToFilter } from "#adaptive-menu/stories/jira/filters/filter-tree-utils"

const indentPerLevel = 4

const expandedAtDragStart = new Set<string>()

export const NodeGroup = (props: any) => {
  const { parentActorRef: itemRef, level, index } = props

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
    menuItemRef
  } = useMenuItem({ actorRef: itemRef })

  const hasChildren = !!item?.children

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
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
        // onExpandedChange={() => sendToMenuItem({ type: 'toggle' })}
        itemRef={itemRef}
        dropIndicator={dropIndicator}
        data-index={index}
        data-level={level}
        ref={dropTargetRef}
      >
        <ControlTrigger
          ref={draggableButtonRef}
          data-draggable={state}
          itemRef={itemRef}
          isDragging={state === "dragging"}
          visualContentRef={dropTargetRef}
          dropIndicator={dropIndicator}
          hasDragIndicator
        >
          <HStack alignItems="center" w="full" gap={0}>
            <ControlTriggerIndicator itemRef={itemRef} />
            <NodeText css={{ flexGrow: 1 }}>{dataName}</NodeText>
            <NodeTag>{item.id}</NodeTag>
            <NodeTag>{isBranchData ? "Branch" : "Leaf"}</NodeTag>
          </HStack>
        </ControlTrigger>
        <ControlContent>
          <NodeList parentActorRef={menuItemRef} />
        </ControlContent>
        {/*{instruction ? <DropIndicator instruction={instruction} /> : null}*/}
      </Control>
      {dragPreview}
    </>
  )
}
