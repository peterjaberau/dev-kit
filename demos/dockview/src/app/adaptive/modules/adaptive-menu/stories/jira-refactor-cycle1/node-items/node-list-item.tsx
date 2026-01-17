'use client'
import React, { Fragment, type Ref, useCallback, useContext, useEffect, useRef, useState } from "react"

import invariant from "tiny-invariant"

import { Badge, HStack, Icon, IconButton } from "@chakra-ui/react"
import { AddIcon, FilterIcon, GrowVerticalIcon, ShowMoreHorizontalIcon } from "../icons"

import { ItemButton } from "#adaptive-menu/namespaces/primitive"
import { GroupDropIndicator } from "#adaptive-menu/drag-and-drop/group-drop-indicator"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import {
  ExpandableMenuItem,
  ExpandableMenuItemTrigger,
  ExpandableMenuItemContent,
} from "#adaptive-menu/namespaces/primitive"

import {
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import { useMenuItem } from "#adaptive-menu/use-menu-item"

// import { getPathToFilter } from "./filter-tree-utils"

export function NodeListItem({ actorRef, filters, index, amountOfMenuItems }: any) {
  const {
    dataName,
    menuItemId,
    dataValue: item,
    menuItemChildrenRef,
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
    isOpen,
    isRootNode,
    isTopLevel,
    getDraggableData,
  } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        return getDraggableData()
      },
      getDragPreviewPieces: () => ({
        elemBefore: (
          <Icon size={"xs"}>
            <FilterIcon />
          </Icon>
        ),
        content: dataName,
      }),
    },
    dropTarget: {
      getData: (args: any) => {
        console.log("----dropTarget.getData---", { ...args.source.data })
        return true
      },
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => true,
    },
  })

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

  // register element
  useEffect(() => {
    const element = draggableButtonRef.current
    invariant(element)
  }, [draggableButtonRef])

  return (
    <>
      <ExpandableMenuItem
        isExpanded={isExpanded}
        onExpansionToggle={() => setIsExpanded((value) => !value)}
        dropIndicator={dropIndicator}
        ref={dropTargetRef}
      >
        <ExpandableMenuItemTrigger
          ref={draggableButtonRef}
          isDragging={state.type === "dragging"}
          hasDragIndicator
          elemBefore={
            <Icon size={"xs"}>
              <FilterIcon />
            </Icon>
          }
          // elemAfter={menuItemId}
          // actionsOnHover={
          //   <>
          //     <IconButton size="xs" variant="plain">
          //       <AddIcon />
          //     </IconButton>
          //   </>
          // }
        >
          {dataName} {isTopLevel ? "(TOP LEVEL)" : ""}
        </ExpandableMenuItemTrigger>
        <ExpandableMenuItemContent>
          <NodeList actorRef={actorRef} />
        </ExpandableMenuItemContent>
      </ExpandableMenuItem>
      {dragPreview}
    </>
  )
}

function NodeGroupLeaf({ actorRef }: any) {
  const {
    dataName,
    menuItemId,
    dataValue: item,
    menuItemChildrenRef,
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
    isOpen,
    isRootNode,
    getDraggableData,
  } = useMenuItem({ actorRef })

  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        return getDraggableData()
      },
      getDragPreviewPieces: () => ({
        // elemBefore: filter.icon,
        elemBefore: (
          <Icon size={"sm"}>
            <FilterIcon />
          </Icon>
        ),

        content: dataName,
      }),
    },
    dropTarget: {
      //getFilterData(filter)
      getData: () => menuItemId,
      getOperations: () => ({
        combine: "available",
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => true,
    },
  })

  useEffect(() => {
    const element = draggableAnchorRef.current
    invariant(element)
  }, [draggableAnchorRef, menuItemId])

  return (
    <>
      <ItemButton
        asChild
        // href={filter.href}
        elemBefore={
          <Icon size={"sm"}>
            <FilterIcon />
          </Icon>
        }
        // elemAfter={menuItemId}
        ref={draggableAnchorRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
      >
        {dataName}
      </ItemButton>

      {dragPreview}
    </>
  )
}

const expandedAtDragStart = new Set<string>()

function NodeGroup({ actorRef }: any) {
  const {
    dataName,
    menuItemId,
    dataValue: item,
    menuItemChildrenRef,
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
    isOpen,
    getDraggableData,
  } = useMenuItem({ actorRef })

  // const lastAction = useLastAction()
  // const getData = useGetData()

  const shouldExpand = useCallback(() => {
    if (expandedAtDragStart.has(menuItemId)) {
      return true
    }

    // if (lastAction?.type !== "filter-move") {
    //   return false
    // }

    // A filter was moved - need to check if we should open

    // 1. Open if any child the target of an any operation
    // (ideally this call would be memoized)
    // const pathToDraggingItem = getPathToFilter(getData().filters, lastAction.draggingId)
    // if (pathToDraggingItem?.includes(filter.id)) {
    //   return true
    // }

    // 2. Was this Filter the target of a combine?
    // return lastAction.operation === "combine" && lastAction.targetId === filter.id
  }, [menuItemId])
  //lastAction, filter.id, getData
  const [isExpanded, setIsExpanded]: any = useState<boolean>((): any => shouldExpand())
  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      //getFilterData(filter),
      getInitialData: () => getDraggableData(),
      getDragPreviewPieces: () => ({
        elemBefore: (
          <Icon size={"sm"}>
            <FilterIcon />
          </Icon>
        ),
        content: `${dataName} - ${menuItemId}`,
      }),
    },
    dropTarget: {
      //getFilterData(filter)
      getData: () => menuItemId,
      getOperations: () => ({
        combine: "available",
        "reorder-before": "available",
        "reorder-after": isExpanded ? "not-available" : "available",
      }),
      canDrop: ({ source }: any) => true, //isFilterData(source.data)
    },
  })

  const [isDraggingAFilter, setIsDraggingAFilter] = useState<boolean>(false)

  // If any filter is dragging, use a cheveron to add clarity
  useEffect(() => {
    return monitorForElements({
      //isFilterData(source.data)
      canMonitor: ({ source }) => true,
      onGenerateDragPreview() {
        // just being safe and clearing before any drag is starting
        expandedAtDragStart.clear()
      },
      onDragStart() {
        setIsDraggingAFilter(true)
      },
      onDrop() {
        setIsDraggingAFilter(false)
      },
    })
  }, [])

  // Collapse when drag starting.
  // Restore the collapse state when the drag is finished
  useEffect(() => {
    // will be called when mounting, as well as when the drag finishes
    if (state.type === "idle" && shouldExpand()) {
      setIsExpanded(true)
      // expandedAtDragStart.delete(filter.id)
      expandedAtDragStart.delete(menuItemId)
    }

    if (state.type === "dragging") {
      setIsExpanded((current: any) => {
        if (current) {
          // expandedAtDragStart.add(filter.id)
          expandedAtDragStart.add(menuItemId)
        }
        return false
      })
    }
  }, [state.type, menuItemId, shouldExpand])

  // Expand if dragged over
  useEffect(() => {
    if (isExpanded) {
      return
    }

    if (state.type !== "is-over") {
      return
    }

    // Only expand if combining
    if (state.instruction?.operation !== "combine") {
      return
    }

    let timerId: number | null = window.setTimeout(() => {
      timerId = null
      setIsExpanded(true)
    }, 500)

    return () => {
      if (timerId != null) {
        clearTimeout(timerId)
        timerId = null
      }
    }
  }, [state, isExpanded])

  // register element
  // const registry = useContext(RegistryContext)
  useEffect(() => {
    const element = draggableAnchorRef.current
    invariant(element)
    // registry?.registerFilter({ filterId: filter.id, element })
  }, [draggableAnchorRef, menuItemId])
  //registry,

  return (
    <>
      <ExpandableMenuItem isExpanded={isExpanded} onExpansionToggle={() => setIsExpanded((value: any) => !value)}>
        <ExpandableMenuItemTrigger
          ref={draggableAnchorRef}
          // href={filter.href}
          isDragging={state.type === "dragging"}
          hasDragIndicator
          visualContentRef={dropTargetRef}
          dropIndicator={dropIndicator}
          // elemAfter={menuItemId}
          elemBefore={
            isDraggingAFilter ? null : (
              <Icon size={"sm"}>
                <FilterIcon />
              </Icon>
            )
          }
        >
          {dataName}
        </ExpandableMenuItemTrigger>
        <ExpandableMenuItemContent>
          <NodeList actorRef={actorRef} />
        </ExpandableMenuItemContent>
      </ExpandableMenuItem>
      {dragPreview}
    </>
  )
}

function NodeList({ actorRef }: any) {
  const {
    dataName,
    menuItemId,
    dataValue: item,
    menuItemChildrenRef,
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
    isOpen,
  } = useMenuItem({ actorRef })

  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<"idle" | "is-innermost-over">("idle")

  useEffect(() => {
    const element = ref.current
    invariant(element)

    function onChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [innerMost] = location.current.dropTargets.filter((dropTarget) => dropTarget.data.type === "general-group")

      setState(innerMost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element,
      getData: () => ({ type: "general-group" }),
      canDrop: ({ source }) => true,
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDrop() {
        setState("idle")
      },
    })
  }, [])

  return (
    <GroupDropIndicator isActive={state === "is-innermost-over"} ref={ref}>
      {menuItemChildrenIds.map((child: any, i: number) => (
        <Fragment key={child}>
          {item.children.length ? (
            <NodeGroup actorRef={menuItemChildrenRef[child]} />
          ) : (
            <NodeGroupLeaf actorRef={menuItemChildrenRef[child]} />
          )}
        </Fragment>
      ))}
    </GroupDropIndicator>
  )
}
