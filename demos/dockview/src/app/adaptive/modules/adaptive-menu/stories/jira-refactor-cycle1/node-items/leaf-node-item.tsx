import React, { useContext, useEffect } from "react"

import invariant from "tiny-invariant"

import { PersonAvatarIcon } from "../icons"
import { ItemButton } from "#adaptive-menu/namespaces/primitive"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { useMenuItem } from "#adaptive-menu/use-menu-item"

import { Icon } from "../data"

export function LeafNodeItem({ actorRef, data, index, amountOfMenuItems }: any) {
  const { dataName, menuItemId, dataValue } = useMenuItem({ actorRef })

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      // getInitialData: () => getTopLevelItemData("for-you"),
      getInitialData: () => menuItemId,
      getDragPreviewPieces: () => ({
        elemBefore: (
          <Icon size={"xs"}>
            <PersonAvatarIcon />
          </Icon>
        ),
        content: dataName,
      }),
    },
    dropTarget: {
      getData: () => true,
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      // canDrop: ({ source }: any) => isTopLevelItemData(source.data),
      canDrop: ({ source }: any) => true,
    },
  })
  // const registry = useContext(RegistryContext)

  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
    // return registry?.registerTopLevelItem({ item: "for-you", element })
  }, [draggableButtonRef])

  return (
    <>
      <ItemButton
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
        {dataName}
      </ItemButton>
      {dragPreview}
    </>
  )
}
