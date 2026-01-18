"use client"
import React, { forwardRef, useContext, useRef, memo, Suspense, useEffect } from "react"
import { chakra, Stack, For, Box, Badge, HStack, IconButton, Button, mergeRefs } from "@chakra-ui/react"
import { GroupDropIndicator } from "#drag-and-drop/components/dnd/drop-indicator/group"
import { DependencyContext, TreeContext } from "../../providers/tree-context"
import { useDnd } from "./use-dnd"
import { useDndTree } from "../../dnd"
import { useNode } from "../../selectors"
import { Node } from "./node"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"


export const Tree = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div {...props} ref={ref} />
})


export const TreeDraft = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, ...rest } = props
  const rootNodeSelector = useNode()
  const {
    childNames,
    dataRuntimeInfo: dataInfo,
    getChildNode,
    nodeId,
    dataName,
    dataValue,
    displayLabels,
    isOpen,
    metadata,
    sendToNode,
    parentNodeRef = null,
    parentNodeId,
    parentContext,
    parentState,
    nodeContext,
  } = rootNodeSelector

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const mergedRef = mergeRefs(rootRef, ref)
  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])


  const { groupState } = useDndTree({
    // itemRef: treeItemRef,
    sender: sendToNode,
    rootRef: rootRef,
    groupRef,
  })


  return (
    <chakra.div data-scope="tree" data-part="tree" {...props} ref={mergedRef}>
      <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
        {metadata?.children.map((item: any, index: any) => {
          return <Node key={item} itemRef={getChildNode(item)} level={0} index={index} />
        })}
      </GroupDropIndicator>
    </chakra.div>
  )
})
