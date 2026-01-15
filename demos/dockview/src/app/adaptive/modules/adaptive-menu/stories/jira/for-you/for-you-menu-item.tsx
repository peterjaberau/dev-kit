import React, { useContext, useEffect } from "react"

import invariant from "tiny-invariant"

import { PersonAvatarIcon } from "../icons"
import { AdaptiveMenu } from "#adaptive-menu"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"

import { getTopLevelItemData, isTopLevelItemData } from "../data"
import { RegistryContext } from "../registry"
import { Icon } from "@chakra-ui/react"

export function ForYouMenuItem({ index, amountOfMenuItems }: { index: number; amountOfMenuItems: number }) {
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("for-you"),
      getDragPreviewPieces: () => ({
        elemBefore: (
          <Icon size={"xs"}>
            <PersonAvatarIcon />
          </Icon>
        ),
        content: "For you",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("for-you"),
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
    return registry?.registerTopLevelItem({ item: "for-you", element })
  }, [draggableButtonRef, registry])

  return (
    <>
      <AdaptiveMenu.ItemButton
        ref={draggableButtonRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
        elemBefore={
          <Icon size={"xs"}>
            <PersonAvatarIcon />
          </Icon>
        }
        // actionsOnHover={
        //   <TopLevelSharedMoreMenu value={"for-you"} index={index} amountOfMenuItems={amountOfMenuItems} />
        // }
      >
        For you
      </AdaptiveMenu.ItemButton>
      {dragPreview}
    </>
  )
}
