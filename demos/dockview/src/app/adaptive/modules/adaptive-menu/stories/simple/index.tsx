"use client"
import { forwardRef, Fragment, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { chakra, Container, HStack } from "@chakra-ui/react"

import { dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"

import { GroupDropIndicator } from "../../drag-and-drop/group-drop-indicator"
import { useMenuItemDragAndDrop } from "../../drag-and-drop/use-menu-item-drag-and-drop"

import { AdaptiveMenu } from "../.."
import { useMenu } from "../../use-menu"
import { useMenuManager } from "../../use-menu-manager"
import { useMenuRoot } from "../../use-menu-root"
import { useMenuItem } from "../../use-menu-item"

import { dataTree } from "../data"


const Index = () => {
  return (
    <Container maxW="container.sm" border="1px solid black" padding="4">
      <AdaptiveMenu.Root data={dataTree}>
        <RenderMenuItemRoot />
      </AdaptiveMenu.Root>
    </Container>
  )
}

const RenderMenuItemRoot = (props: any) => {
  const { css, ...rest } = props
  const [state, setState] = useState<"idle" | "is-over">("idle")
  const ref: any = useRef<HTMLDivElement | null>(null)


  const menuSelector = useMenu()
  const menuManagerSelector = useMenuManager()
  const menuRoot = useMenuRoot()

  const { menuItemChildrenIds: rootItemsIds } = useMenuRoot()
  const { dependencies }: any = useMenuManager()

  console.log("---rootItemsIds---", rootItemsIds)

  // monitor
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => true,
      // isTopLevelItemData(source.data) || isProjectData(source.data) || isFilterData(source.data),
      onDrop({ source, location }) {
        const dragging = source.data
        const [innerMost] = location.current.dropTargets

        if (!innerMost) {
          return
        }
        const dropTargetData = innerMost.data

        const instruction: any = dependencies.extractInstruction(dropTargetData)
        if (!instruction) {
          return
        }
      },
    })
  }, [])

  // drop target
  useEffect(() => {
    const element = ref.current
    invariant(element)
    return dropTargetForElements({
      element,
      // canDrop: ({ source }) => isTopLevelItemData(source.data),
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

  console.log({ menuSelector, menuManagerSelector, menuRoot })

  return (
    <AdaptiveMenu.MenuList>
      <GroupDropIndicator ref={ref} isActive={state === "is-over"}>
        {rootItemsIds.map((item: any, index: any, array) => {

          console.log('----item----', item)
          // topLevelMap[item]({ data, index, amountOfMenuItems: array.length })
          return (
            <Fragment key={item}>
              <HStack>{item}</HStack>
            </Fragment>
          )
        })}
      </GroupDropIndicator>
    </AdaptiveMenu.MenuList>
  )
}





export default Index
