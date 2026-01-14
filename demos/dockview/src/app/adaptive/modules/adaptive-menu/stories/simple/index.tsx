"use client"
import { AdaptiveMenu } from "../.."
import { GroupDropIndicator } from "../../drag-and-drop/group-drop-indicator"
import { dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { chakra, Container, HStack } from "@chakra-ui/react"
import { dataTree } from "../data"
import { forwardRef, Fragment, useEffect, useRef, useState } from "react"
import { useMenu } from "../../use-menu"
import { useMenuManager } from "../../use-menu-manager"
import { useMenuRoot } from "../../use-menu-root"
import { useMenuItem } from "../../use-menu-item"
import invariant from "tiny-invariant"

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

  const { menuItemChildrenIds } = useMenuRoot()
  const { dependencies }: any = useMenuManager()

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
        {menuItemChildrenIds.map((item, index, array) => {
          // topLevelMap[item]({ data, index, amountOfMenuItems: array.length })
          return <HStack key={item}>{item}</HStack>
        })}
      </GroupDropIndicator>
    </AdaptiveMenu.MenuList>
  )

  // return <chakra.div ref={ref} data-scope="item-text" css={css} {...rest} />
}

export default Index
