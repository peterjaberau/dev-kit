import React, { useContext, useEffect } from "react"
import { Icon } from "@chakra-ui/react"
import invariant from "tiny-invariant"

import { ClockIcon } from "../icons"
import { ItemButton } from "#adaptive-menu/namespaces/primitive"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"

import { getTopLevelItemData, isTopLevelItemData } from "../data"
import { RegistryContext } from "../registry"

export function RecentMenuItem({ index, amountOfMenuItems }: { index: number; amountOfMenuItems: number }) {
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("recent"),
      getDragPreviewPieces: () => ({
        elemBefore: <Icon size={'xs'}><ClockIcon/></Icon>,
        content: "Recent",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("recent"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => isTopLevelItemData(source.data),
    },
  })
  const registry = useContext(RegistryContext)

  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
    return registry?.registerTopLevelItem({ item: "recent", element })
  }, [draggableButtonRef, registry])

  return (
    <>
      <ItemButton
        ref={draggableButtonRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
        elemBefore={<Icon size={'xs'}><ClockIcon /></Icon>}
        // actionsOnHover={
        //   <TopLevelSharedMoreMenu value={"for-you"} index={index} amountOfMenuItems={amountOfMenuItems} />
        // }
      >
        Recent
      </ItemButton>
      {dragPreview}
    </>
  )
}
