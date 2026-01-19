import { memo, useEffect, useRef, useState } from "react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { HStack } from "@chakra-ui/react"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"

import { Control } from "./control"
import { ControlTrigger } from "./control.trigger"
import { ControlContent } from "./control.content"
import { NodeList } from "./node-list"
import invariant from "tiny-invariant"

const indentPerLevel = 4

export const NodeTopLevel = (props: any) => {
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
  } = useMenuItem({ actorRef: actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        return isTopLevel && item
      },
    },
    dropTarget: {
      getData: () => {
        return isTopLevel && item
      },
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => source.data?.isTopLevel === isTopLevel,
    },
  })

  useEffect(() => {
    if (state === "dragging") {
      setIsExpanded((current) => {
        // capture current state
        wasExpandedWhenDragStartedRef.current = current
        // close when drag is starting
        return false
      })
    }

    if (state === "idle" && typeof wasExpandedWhenDragStartedRef.current === "boolean") {
      setIsExpanded(wasExpandedWhenDragStartedRef.current)
      wasExpandedWhenDragStartedRef.current = null
    }
  }, [state])

  // register element
  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
  }, [draggableButtonRef])

  return (
    <>
      <Control
        isExpanded={isExpanded}
        onExpansionToggle={() => setIsExpanded((value) => !value)}
        dropIndicator={dropIndicator}
        ref={dropTargetRef}
      >
        <ControlTrigger ref={draggableButtonRef} actorRef={actorRef} isDragging={state === "dragging"} hasDragIndicator>
          {dataName} {isTopLevel ? "(TOP LEVEL)" : ""}
        </ControlTrigger>
        <ControlContent>
          <NodeList actorRef={actorRef} />
        </ControlContent>
      </Control>
      {dragPreview}
    </>
  )
}
