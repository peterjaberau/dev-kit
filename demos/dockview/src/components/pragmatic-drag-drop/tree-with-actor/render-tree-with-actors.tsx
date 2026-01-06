"use client"

import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Container, Center } from "@chakra-ui/react"
import memoizeOne from "memoize-one"
import invariant from "tiny-invariant"
import DebuggerCardWrapper from "#components/ui-common/debugger-card-wrapper"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"

import TreeItemWithActors from "./components/tree-item-with-actors"
import { GroupDropIndicator } from "../../pragmatic-drag-drop/drop-indicator/group"
import { useDraggableTreeWithActors } from "./hooks/use-draggable-tree-with-actors"

import { useTree, useTreeItem } from "./selectors"

export function RenderTreeWithActors() {
  const { uniqueContextId, dependencies } = useTree()
  const { extractInstruction } = dependencies
  const { treeItemChildrenIds, treeItemChildrenRef, treeItemRef } = useTreeItem()

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  const { groupState } = useDraggableTreeWithActors({
    itemRef: treeItemRef,
    rootRef,
    groupRef,
    uniqueContextId,
    extractInstruction,
  })

  return (
    <Container ref={rootRef} px={24} css={{ py: 10 }}>
      <DebuggerCardWrapper title="WITH Actor" autoScroll={false} args={{}}>
        <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
          {treeItemChildrenIds.map((item: any, index: any) => {
            return <TreeItemWithActors key={item} itemRef={treeItemChildrenRef[item]} level={0} index={index} />
          })}
        </GroupDropIndicator>
      </DebuggerCardWrapper>
    </Container>
  )
}
