import React, { useContext, useEffect } from "react"

import invariant from "tiny-invariant"

import { StarUnstarredIcon } from "../icons"
import { ItemButton } from "#adaptive-menu/namespaces/primitive"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"

import { getTopLevelItemData, isTopLevelItemData } from "../data"
import { RegistryContext } from "../registry"
import { Icon } from "@chakra-ui/react"

export function StarredMenuItem({ index, amountOfMenuItems }: { index: number; amountOfMenuItems: number }) {
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("starred"),
      getDragPreviewPieces: () => ({
        elemBefore: (
          <Icon size={"xs"}>
            <StarUnstarredIcon />
          </Icon>
        ),
        content: "Starred",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("starred"),
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
    return registry?.registerTopLevelItem({ item: "starred", element })
  }, [draggableButtonRef, registry])

  return (
    <>
      <ItemButton
        ref={draggableButtonRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
        elemBefore={<Icon size={"xs"}><StarUnstarredIcon  /></Icon>}
        // actionsOnHover={
        //   <TopLevelSharedMoreMenu value={"for-you"} index={index} amountOfMenuItems={amountOfMenuItems} />
        // }
      >
        Starred
      </ItemButton>
      {dragPreview}
    </>
  )
}
