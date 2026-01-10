import React, { forwardRef, useEffect, useRef } from "react"
import { chakra } from "@chakra-ui/react"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { DragDrop, useDndTree } from ".."
import { useTreeItem } from "../../selectors"
import { mergeRefs } from "@chakra-ui/react"


export const Tree = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {

  const { treeItemChildrenIds, treeItemChildrenRef, treeItemRef, sendToTreeItem } = useTreeItem()
  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const mergedRef = mergeRefs(rootRef, ref)

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  const { groupState } = useDndTree({
    // itemRef: treeItemRef,
    sender: sendToTreeItem,
    rootRef: rootRef,
    groupRef,
  })


  return (
    <chakra.div data-scope="tree" data-part="tree" {...props} ref={mergedRef}>
      <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
        {treeItemChildrenIds.map((item: any, index: any) => {
          return <DragDrop.Node key={item} itemRef={treeItemChildrenRef[item]} level={0} index={index} />
        })}
      </GroupDropIndicator>
    </chakra.div>
  )
})
