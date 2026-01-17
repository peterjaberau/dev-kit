import { Box, Container } from "@chakra-ui/react"
import { Fragment, type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { createRegistryKey, globalRegistry } from "#adaptive-registry"
import invariant from "tiny-invariant"

import { useStableRef } from "#adaptive-shared/lib/hooks"
import { Root, MenuList, GroupDropIndicator } from "#adaptive-menu/namespaces/primitive"
import { SideNavContent } from "./components"
import { NodeLeafItem, NodeListItem } from "./node-items"

import { extractInstruction, type Instruction } from "#adaptive-menu/drag-and-drop/hitbox"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import { useMenu } from "../../use-menu"
import { useMenuManager } from "../../use-menu-manager"
import { useMenuRoot } from "../../use-menu-root"
import { useMenuItem } from "../../use-menu-item"

import { data as getInitialData } from "./data"
import { isFilterData, isProjectData, isTopLevelItemData, type TAction } from "#adaptive-menu/stories/jira/data"
import { reduce } from "#adaptive-menu/stories/jira/reducer"

function getReorderFinishIndex({ indexOfTarget, instruction }: any): number {
  if (instruction.operation === "reorder-before") {
    return indexOfTarget
  }
  if (instruction.operation === "reorder-after") {
    return indexOfTarget + 1
  }
  return indexOfTarget
}

function getPosition(index: number) {
  return index + 1
}

export function Sidebar() {
  const menuSelector = useMenu()
  const menuManagerSelector = useMenuManager()
  const menuRoot = useMenuRoot()

  const {
    getDraggableData,
    menuItemChildrenIds: rootItemsIds,
    menuItemChildrenRef: rootItemsRefs,
    isRootNode,
    menuItemId,
    dataName,
    isTopLevel,
  } = useMenuRoot()
  const { dependencies }: any = useMenuManager()

  globalRegistry.register(createRegistryKey("ADAPTIVE_MENU_ROOT", useMenuManager()))

  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<"idle" | "is-over">("idle")
  const scrollableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }: any) => source?.data?.isTopLevel,

      onDrop({ source, location }) {
        const dragging = source.data
        const [innerMost] = location.current.dropTargets

        if (!innerMost) {
          return
        }
        const dropTargetData = innerMost.data

        const instruction: Instruction | null = extractInstruction(dropTargetData)
        if (!instruction) {
          return
        }

        // top level item dragging onto top level item
        if (dragging.isTopLevel && dropTargetData.isTopLevel) {
          // this will be reorder actions

          const action = {
            type: "top-level-menu-reorder",
            value: dragging.value,
            // startIndex: 0,
            // finishIndex: 1,
            trigger: "pointer",
          }
          return
        }
      },
    })
  }, [])

  // setup auto scrolling for sidenav scroll container
  useEffect(() => {
    const scrollable = scrollableRef.current
    invariant(scrollable)
    return autoScrollForElements({
      element: scrollable,
      canScroll: ({ source }: any) => source?.data?.isTopLevel,
    })
  }, [])

  useEffect(() => {
    const element = ref.current
    invariant(element)
    return dropTargetForElements({
      element,
      canDrop: ({ source }) => true,
      onDragStart() {
        setState("is-over")
      },
      onDragEnter() {
        setState("is-over")
      },
      onDragLeave() {
        setState("idle")
      },
      onDrop() {
        setState("idle")
      },
    })
  }, [])

  return (
    <SideNavContent ref={scrollableRef}>
      <MenuList>
        <GroupDropIndicator ref={ref} isActive={state === "is-over"}>
          {rootItemsIds.map((item: any, index: any, array) => {
            return (
              <Fragment key={item}>
                <NodeListItem
                  actorRef={rootItemsRefs[item]}
                  data={rootItemsIds}
                  index={index}
                  amountOfMenuItems={array.length}
                />
              </Fragment>
            )
          })}
        </GroupDropIndicator>
      </MenuList>
    </SideNavContent>
  )
}

const Index = () => {
  return (
    <Container margin={0} padding={0} border="1px solid black" backgroundColor={"bg.panel"}>
      <Root data={getInitialData}>
        <Sidebar />
      </Root>
    </Container>
  )
}

export default Index

{
  /*  actorRef: rootItemsRefs[item],*/
}
{
  /*  data: rootItemsIds,*/
}
{
  /*  index,*/
}
{
  /*  amountOfMenuItems: array.length,*/
}
{
  /*})}*/
}
