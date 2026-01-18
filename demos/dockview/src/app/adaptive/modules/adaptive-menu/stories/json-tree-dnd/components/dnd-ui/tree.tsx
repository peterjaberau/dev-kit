import React, { Fragment, useEffect, useRef } from "react"
import { Node } from "."
import { NodeTopLevel } from "./node-top-level"
import { Root, MenuList, GroupDropIndicator } from "#adaptive-menu/namespaces/primitive"

import { useDndTree } from "../dnd"
import { useMenuRoot } from "#adaptive-menu/use-menu-root"

import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"

export function Tree() {
  const { menuItemChildrenIds, menuItemChildrenRef, sendToMenuItem } = useMenuRoot()
  const groupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  const { groupState }: any = useDndTree({
    sender: sendToMenuItem,
    // groupRef = dropTargetForElements = groupRef.current
    groupRef,
  })

  return (
    <MenuList>
      <GroupDropIndicator ref={groupRef} isActive={groupState === "is-over"}>
        {menuItemChildrenIds.map((item: any, index: any, array: any) => {
          return (
            <Fragment key={item}>
              <NodeTopLevel actorRef={menuItemChildrenRef[item]} level={0} index={index} />
            </Fragment>
          )
        })}
      </GroupDropIndicator>
    </MenuList>
  )
}
