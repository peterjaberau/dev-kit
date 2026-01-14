import React, { useEffect, useRef, useState } from "react"
import { useMenuItemDragAndDrop } from "../../../drag-and-drop/use-menu-item-drag-and-drop"
import { useMenuRoot } from "../../../use-menu-root"
import { AdaptiveMenu } from "../../.."

import { useMenuItem } from "../../../use-menu-item"
import { dataHelpers } from "../../data"
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


  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
  }, [draggableButtonRef])

  return (
    <>
      <AdaptiveMenu.ItemButton
        ref={draggableButtonRef} // interactive ref
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef} // drag target
      >
        {menuItemId}
      </AdaptiveMenu.ItemButton>
      {dragPreview}
    </>

    /*

       return (
    <>
      <AdaptiveMenu.MenuItem
        ref={draggableButtonRef} // interactive ref
        visualContentRef={dropTargetRef} // drag target
        isDragging={state.type === "dragging"}
        dropIndicator={dropIndicator}
      >
        {menuItemId}
      </AdaptiveMenu.MenuItem>

      {dragPreview}
    </>


       */
  )
}




export const ForYouMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { menuItemId, dataName, dataConfig, dataValue, menuItemContext } = useMenuItem({ actorRef })

  // console.log("-----menuItemContext-----", menuItemContext)

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

  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
  }, [draggableButtonRef])

  return (
      <>
        <AdaptiveMenu.ItemButton
            ref={draggableButtonRef} // interactive ref
            isDragging={state.type === "dragging"}
            hasDragIndicator
            dropIndicator={dropIndicator}
            visualContentRef={dropTargetRef} // drag target
        >
          {menuItemId}
        </AdaptiveMenu.ItemButton>
        {dragPreview}
      </>

      /*

           return (
        <>
          <AdaptiveMenu.MenuItem
            ref={draggableButtonRef} // interactive ref
            visualContentRef={dropTargetRef} // drag target
            isDragging={state.type === "dragging"}
            dropIndicator={dropIndicator}
          >
            {menuItemId}
          </AdaptiveMenu.MenuItem>

          {dragPreview}
        </>


           */
  )
}


export const ProjectMenuItem = ({ actorRef, data, index, amountOfMenuItems }: any) => {
  const { menuItemId, dataName, dataConfig, dataValue, menuItemContext } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)


  // useMenuItemDragAndDrop methods same logic as ForYouMenuItem
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({

    // draggable and droptarget parts same as for-you
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

  // this new comparing to ForYouMenuItem
  useEffect(() => {
    if (state.type === "dragging") {
      setIsExpanded((current) => {
        // capture current state
        wasExpandedWhenDragStartedRef.current = current
        // close when drag is starting
        return false
      })
    }

    if (state.type === "idle" && typeof wasExpandedWhenDragStartedRef.current === "boolean") {
      setIsExpanded(wasExpandedWhenDragStartedRef.current)
      wasExpandedWhenDragStartedRef.current = null
    }
  }, [state.type])


  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
  }, [draggableButtonRef])

  return (
      <>
        <AdaptiveMenu.ItemButton
            ref={draggableButtonRef} // interactive ref
            isDragging={state.type === "dragging"}
            hasDragIndicator
            dropIndicator={dropIndicator}
            visualContentRef={dropTargetRef} // drag target
        >
          {menuItemId}
        </AdaptiveMenu.ItemButton>
        {dragPreview}
      </>

      /*

           return (
        <>
          <AdaptiveMenu.MenuItem
            ref={draggableButtonRef} // interactive ref
            visualContentRef={dropTargetRef} // drag target
            isDragging={state.type === "dragging"}
            dropIndicator={dropIndicator}
          >
            {menuItemId}
          </AdaptiveMenu.MenuItem>

          {dragPreview}
        </>


           */
  )
}
