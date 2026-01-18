import React, { Fragment, useEffect, useRef, useState } from "react"
import { NodeItem } from "./node-item"
import { NodeGroup } from "./node-group"
import { NodeTopLevel } from "./node-top-level"
import { Root, MenuList, GroupDropIndicator } from "#adaptive-menu/namespaces/primitive"
import { useMenuItem } from "#adaptive-menu/use-menu-item"

import invariant from "tiny-invariant"
import {
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/entry-point/element/adapter"

export function NodeList(props: any) {
  const { parentActorRef: itemRef } = props

  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState("idle")

  const {
    dataValue: item,
    menuItemChildrenRef,
    dataName,
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
    isTopLevel,
    isRootNode,
    isOpen,
  } = useMenuItem({ actorRef: itemRef })

  useEffect(() => {
    const element = ref.current
    invariant(element)

    function onChange({ location, self, source }: any) {
      const [innerMost] = location.current.dropTargets.filter((dropTarget: any) => dropTarget.data.type === "group")
      setState(innerMost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element,
      getData: () => ({ type: "group" }),
      canDrop: ({ source }) => true, //isFilterData(source.data),
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDrop() {
        setState("idle")
      },
    })
  }, [])

  return (
    <GroupDropIndicator isActive={state === "is-innermost-over"} ref={ref}>
      {menuItemChildrenIds?.map((child: any) => {
        const { menuItemChildrenIds: grandChildrenIds, menuItemRef: grandChildrenRef } = useMenuItem({
          actorRef: menuItemChildrenRef[child],
        })

        return (
          <Fragment key={child}>
            {grandChildrenIds.length ? (
              <NodeGroup parentActorRef={grandChildrenRef} />
            ) : (
              <NodeItem actorRef={grandChildrenRef} />
            )}
          </Fragment>
        )
      })}
    </GroupDropIndicator>
  )
}
