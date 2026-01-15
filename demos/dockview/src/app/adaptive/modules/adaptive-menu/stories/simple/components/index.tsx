import React, { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { useMenuItemDragAndDrop } from "../../../drag-and-drop/use-menu-item-drag-and-drop"
import { useMenuRoot } from "../../../use-menu-root"
import { AdaptiveMenu } from "../../.."
import { GroupDropIndicator } from "../../../drag-and-drop/group-drop-indicator"
import { useMenuItem } from "../../../use-menu-item"
import { dataHelpers } from "../../data"
import invariant from "tiny-invariant"
import { dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"



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





export const FilterMenuItem = ({ actorRef, filters, index, amountOfMenuItems }: any) => {
  const { menuItemId, dataName, dataConfig, dataValue, menuItemContext } = useMenuItem({ actorRef })

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)

  // useMenuItemDragAndDrop methods same logic as ForYouMenuItem
  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    // draggable and droptarget parts same as for-you
    draggable: {
      getInitialData: () => {
        //getTopLevelItemData('filters')
        return dataHelpers.topLevelSymbolKeys['filters']
      },
      getDragPreviewPieces: () => ({
        // elemBefore: <PersonAvatarIcon label="" />,
        content: 'Filters',
      }),
    },

    dropTarget: {
      getData: () => {
        // elemBefore: <PersonAvatarIcon label="" />,
        return dataHelpers.topLevelSymbolKeys?.["filters"]
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
      <AdaptiveMenu.ExpandableMenuItem
        isExpanded={isExpanded}
        onExpansionToggle={() => setIsExpanded((value) => !value)}
        dropIndicator={dropIndicator}
        ref={dropTargetRef}
      >
        <AdaptiveMenu.ExpandableMenuItemTrigger
          ref={draggableButtonRef}
          isDragging={state.type === "dragging"}
          hasDragIndicator
          // elemBefore={<ProjectIcon label="" color="currentColor" />}
        >
          {/* Filters */}
          {menuItemId}
        </AdaptiveMenu.ExpandableMenuItemTrigger>
        <AdaptiveMenu.ExpandableMenuItemContent>
          <FilterList filters={filters} />
        </AdaptiveMenu.ExpandableMenuItemContent>
      </AdaptiveMenu.ExpandableMenuItem>
      {dragPreview}
    </>
  )
}



function FilterLeaf({ filter }) {
  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      // getInitialData: () => getFilterData(filter),
      getInitialData: () => getFilterData(filter),
      getDragPreviewPieces: () => ({
        elemBefore: filter.icon,
        content: filter.name,
      }),
    },
    dropTarget: {
      getData: () => getFilterData(filter),
      getOperations: () => ({
        combine: "available",
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isFilterData(source.data),
    },
  })

  const [isMoveModalOpen, setIsMoveModalOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const registry = useContext(RegistryContext)
  useEffect(() => {
    const element = draggableAnchorRef.current
    invariant(element)
    registry?.registerFilter({ filterId: filter.id, element })
  }, [registry, draggableAnchorRef, filter.id])

  return (
    <>
      <LinkMenuItem
        href={filter.href}
        elemBefore={filter.icon}
        ref={draggableAnchorRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
        actionsOnHover={
          <DropdownMenu
            shouldRenderToParent
            isOpen={isMenuOpen}
            onOpenChange={() => setIsMenuOpen((current) => !current)}
            trigger={({ triggerRef, ...triggerProps }) => (
              <IconButton
                ref={triggerRef as Ref<HTMLButtonElement>}
                label="More actions"
                icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} size="small" />}
                spacing="compact"
                appearance="subtle"
                {...triggerProps}
              />
            )}
          >
            <DropdownItemGroup hasSeparator>
              <DropdownItem elemBefore={<SettingsIcon label="" />}>Settings</DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup hasSeparator>
              <DropdownItem
                elemBefore={<GrowVerticalIcon label="" />}
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsMoveModalOpen(true)
                }}
              >
                Move filter
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        }
      >
        {filter.name}
      </LinkMenuItem>
      <ModalTransition>
        {isMoveModalOpen && <FilterMoveModal onClose={() => setIsMoveModalOpen(false)} filter={filter} />}
      </ModalTransition>
      <ModalTransition>
        {isMoveModalOpen && <FilterMoveModal onClose={() => setIsMoveModalOpen(false)} filter={filter} />}
      </ModalTransition>
      {dragPreview}
    </>
  )
}

// TODO: clear in onGenerateDragPreview()?
const expandedAtDragStart = new Set<string>()

function FilterParent({ filter }: any) {
  // const lastAction = useLastAction()
  // const getData = useGetData()

  const shouldExpand = useCallback(() => {
    if (expandedAtDragStart.has(filter.id)) {
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
  }, [filter.id])

  const [isExpanded, setIsExpanded] = useState<boolean>(() => shouldExpand())
  const [isMoveModalOpen, setIsMoveModalOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => dataHelpers.topLevelSymbolKeys['filters'],
      // getFilterData(filter),
      getDragPreviewPieces: () => ({
        // elemBefore: filter.icon,
        content: filter.name,
      }),
    },
    dropTarget: {
      getData: () => dataHelpers.topLevelSymbolKeys['filters'],
        //getFilterData(filter),
      getOperations: () => ({
        combine: "available",
        "reorder-before": "available",
        "reorder-after": isExpanded ? "not-available" : "available",
      }),
      canDrop: ({ source }: any) => source.data === true // isFilterData(source.data),
    },
  })

  const [isDraggingAFilter, setIsDraggingAFilter] = useState<boolean>(false)

  // If any filter is dragging, use a cheveron to add clarity
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => true, // isFilterData(source.data),
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
      expandedAtDragStart.delete(filter.id)
    }

    if (state.type === "dragging") {
      setIsExpanded((current) => {
        if (current) {
          expandedAtDragStart.add(filter.id)
        }
        return false
      })
    }
  }, [state.type, filter.id, shouldExpand])

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
  useEffect(() => {
    const element = draggableAnchorRef.current
    invariant(element)
  }, [draggableAnchorRef, filter.id])

  return (
    <>
      <ExpandableMenuItem isExpanded={isExpanded} onExpansionToggle={() => setIsExpanded((value) => !value)}>
        <ExpandableMenuItemTrigger
          ref={draggableAnchorRef}
          href={filter.href}
          isDragging={state.type === "dragging"}
          hasDragIndicator
          visualContentRef={dropTargetRef}
          dropIndicator={dropIndicator}
          elemBefore={isDraggingAFilter ? null : filter.icon}
          actionsOnHover={
            <DropdownMenu
              shouldRenderToParent
              isOpen={isMenuOpen}
              onOpenChange={() => setIsMenuOpen((current) => !current)}
              trigger={({ triggerRef, ...triggerProps }) => (
                <IconButton
                  ref={triggerRef as Ref<HTMLButtonElement>}
                  label="More actions"
                  icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} size="small" />}
                  spacing="compact"
                  appearance="subtle"
                  {...triggerProps}
                />
              )}
            >
              <DropdownItemGroup hasSeparator>
                <DropdownItem elemBefore={<SettingsIcon label="" />}>Settings</DropdownItem>
              </DropdownItemGroup>
              <DropdownItemGroup hasSeparator>
                <DropdownItem
                  elemBefore={<GrowVerticalIcon label="" />}
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsMoveModalOpen(true)
                  }}
                >
                  Move filter
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          }
        >
          {filter.name}
        </ExpandableMenuItemTrigger>
        <ExpandableMenuItemContent>
          <FilterList filters={filter.children} />
        </ExpandableMenuItemContent>
      </ExpandableMenuItem>
      <ModalTransition>
        {isMoveModalOpen && <FilterMoveModal onClose={() => setIsMoveModalOpen(false)} filter={filter} />}
      </ModalTransition>
      {dragPreview}
    </>
  )
}

function FilterList({ filters }: any) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<"idle" | "is-innermost-over">("idle")

  useEffect(() => {
    const element = ref.current
    invariant(element)

    function onChange({ location, self }: any) {
      const [innerMost] = location.current.dropTargets.filter(
        (dropTarget: any) => dropTarget.data.type === "filter-group",
      )

      setState(innerMost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element,
      getData: () => ({ type: "filter-group" }),
      canDrop: ({ source }: any) => source.data === true, /// isFilterData(source.data),
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDrop() {
        setState("idle")
      },
    } as any)
  }, [])

  return (
    <GroupDropIndicator isActive={state === "is-innermost-over"} ref={ref}>
      {filters.map((filter: any) => (
        <Fragment key={filter.id}>
          {filter.children.length ? <FilterParent filter={filter} /> : <FilterLeaf filter={filter} />}
        </Fragment>
      ))}
    </GroupDropIndicator>
  )
}
