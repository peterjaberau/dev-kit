import React, { useEffect, useRef, useState } from "react"
import { useMenuItemDragAndDrop } from "../../../drag-and-drop/use-menu-item-drag-and-drop"
import { useMenuRoot } from "../../../use-menu-root"

import { useMenuItem } from "../../../use-menu-item"
import { chakra, HStack } from "@chakra-ui/react"
import { dataHelpers } from '../../data'
import invariant from "tiny-invariant"



export const CustomMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { menuItemId, dataName, dataConfig, dataValue, menuItemContext } = useMenuItem({ actorRef })

  console.log("-----menuItemContext-----", menuItemContext)

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        //getTopLevelItemData('for-you')
        return dataHelpers.topLevelSymbolKeys[menuItemId]
      },
      getDragPreviewPieces: () => ({
        // elemBefore: <PersonAvatarIcon label="" />,
        content: dataName,
      }),
    },
    dropTarget: {
      getData: () => {
        // elemBefore: <PersonAvatarIcon label="" />,
        return dataHelpers.topLevelSymbolKeys?.[menuItemId]
      },
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => {
        // source.data = from draggable.getInitialData input.
        //isTopLevelItemData(source.data) --> isTopLevelItemData(source.data)
        return source.data === true
      },
    },
  })

  //	const registry = useContext(RegistryContext);

  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
    // return registry?.registerTopLevelItem({ item: "for-you", element })
  }, [draggableButtonRef])

  return (
    <>
      <chakra.div
        role="listitem"
        css={{ height: "2rem", minWidth: "72px", alignItems: "center", userSelect: "none" }}
        ref={draggableButtonRef}
      >
        {menuItemId}
      </chakra.div>
    </>
  )
}


export const FiltersMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { dataName, menuItemId } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)


  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("filters"),
      getDragPreviewPieces: () => ({
        elemBefore: <FilterIcon label="" />,
        content: "Filters",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("filters"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
    },
  })



  return (
    <HStack>
      {dataName} - {menuItemId}
    </HStack>
  )
}
export const ForYouMenuItem = ({ actorRef, index, amountOfMenuItems }: any) => {
  const { dataName, menuItemId, dataConfig } = useMenuItem({ actorRef })

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        /*  {"for-your": {value: "for-you"} */
        return getTopLevelItemData("for-you")
      },
      getDragPreviewPieces: () => ({
        elemBefore: <PersonAvatarIcon label="" />,
        content: "For you",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("for-you"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
    },
  })
  return (
    <chakra.div
      ref={draggableButtonRef}
      role="listitem"
      css={{ height: "2rem", minWidth: "72px", alignItems: "center", userSelect: "none" }}
    >
      {dataName}
    </chakra.div>
  )
}
export const ProjectsMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { dataName, menuItemId } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("filters"),
      getDragPreviewPieces: () => ({
        elemBefore: <FilterIcon label="" />,
        content: "Filters",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("filters"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
    },
  })

  return (
    <HStack>
      {dataName} - {menuItemId}
    </HStack>
  )
}
export const RecentMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { dataName, menuItemId } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("filters"),
      getDragPreviewPieces: () => ({
        elemBefore: <FilterIcon label="" />,
        content: "Filters",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("filters"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
    },
  })

  return (
    <HStack>
      {dataName} - {menuItemId}
    </HStack>
  )
}
export const StarredMenuItem = ({ actorRef, index, amountOfMenuItems }: any) => {

  const { dataName, menuItemId } = useMenuItem({ actorRef })

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("for-you"),
      getDragPreviewPieces: () => ({
        elemBefore: <PersonAvatarIcon label="" />,
        content: "For you",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("for-you"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
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
      <ButtonMenuItem
        ref={draggableButtonRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
        elemBefore={<PersonAvatarIcon label="" />}
        actionsOnHover={
          <TopLevelSharedMoreMenu value={"for-you"} index={index} amountOfMenuItems={amountOfMenuItems} />
        }
      >
        For you
      </ButtonMenuItem>
      {dragPreview}
    </>
  )
}

