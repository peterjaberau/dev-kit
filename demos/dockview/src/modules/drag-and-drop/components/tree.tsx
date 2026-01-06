"use client"

import { useEffect, useRef } from "react"
import { Container } from "@chakra-ui/react"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { GroupDropIndicator } from "./dnd/drop-indicator/group"
import { TreeItem, useDndTree } from "."
import { useTree, useTreeItem } from "../selectors"



export function Tree() {
  const { uniqueContextId, dependencies } = useTree()
  const { extractInstruction } = dependencies
  const { treeItemChildrenIds, treeItemChildrenRef, treeItemRef } = useTreeItem()

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  const { groupState } = useDndTree({
    itemRef: treeItemRef,
    rootRef,
    groupRef,
    uniqueContextId,
    extractInstruction,
  })

  return (
    <Container ref={rootRef} px={24} css={{ py: 10 }}>
        <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
          {treeItemChildrenIds.map((item: any, index: any) => {
            return <TreeItem key={item} itemRef={treeItemChildrenRef[item]} level={0} index={index} />
          })}
        </GroupDropIndicator>
    </Container>
  )
}
