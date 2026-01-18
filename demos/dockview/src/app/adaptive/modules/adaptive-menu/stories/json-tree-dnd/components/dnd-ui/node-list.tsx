import React, { Fragment, useEffect, useRef, useState } from "react"
import { NodeItem } from "./node-item"
import { NodeGroup } from "./node-group"
import { GroupDropIndicator } from "#adaptive-menu/drag-and-drop/group-drop-indicator"
import { useMenuItem } from "#adaptive-menu/use-menu-item"

import {
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import invariant from "tiny-invariant"

export function NodeList(props: any) {
  const { actorRef } = props

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
  } = useMenuItem({ actorRef: actorRef })

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
      canDrop: ({ source }): any => source.data?.children, //isFilterData(source.data),
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
              <NodeGroup actorRef={grandChildrenRef} />
            ) : (
              <NodeItem actorRef={grandChildrenRef} />
            )}
          </Fragment>
        )
      })}
    </GroupDropIndicator>
  )
}
