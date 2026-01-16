import { Box, Container } from "@chakra-ui/react"
import { Fragment, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import invariant from "tiny-invariant"

import { useStableRef } from "#adaptive-shared/lib/hooks"
import { Root, MenuList, GroupDropIndicator } from "#adaptive-menu/namespaces/primitive"
import { SideNavContent } from "./components"
import { LeafNodeItem } from "./node-items/leaf-node-item"
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

  const { menuItemChildrenIds: rootItemsIds, menuItemChildrenRef: rootItemsRefs } = useMenuRoot()
  const { dependencies }: any = useMenuManager()


  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<"idle" | "is-over">("idle")
  const scrollableRef = useRef<HTMLDivElement | null>(null)

  return (
    <SideNavContent ref={scrollableRef}>
      <MenuList>
        <GroupDropIndicator ref={ref} isActive={state === "is-over"}>
          {rootItemsIds.map((item: any, index: any, array) => {
            return (
              <Fragment key={item}>
                <LeafNodeItem actorRef={rootItemsRefs[item]} data={rootItemsIds} index={index} amountOfMenuItems={array.length} />
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
