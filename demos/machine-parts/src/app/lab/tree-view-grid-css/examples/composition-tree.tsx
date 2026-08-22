"use client"

import { ChevronRight } from "lucide-react"
import { GroupDropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/group"
import { TreeView, useTreeViewContext } from "../components"
import type { TreeViewDataNode } from "../components"
import { useEffect, useRef, useState } from "react"
import { monitorForElements, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { extractInstruction, Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { useNodeItemDragAndDrop } from './drag-and-drop/use-node-item-drag-and-drop'
export const TreeViewCompositionTree = () => {
  const treeView = useTreeViewContext<TreeViewDataNode>()
  const refGroup = useRef<HTMLDivElement | null | any>(null)
  const [state, setState] = useState<"idle" | "is-over">("idle")

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }: any) => {
        // return treeView.isTopLevelNode(source.data)
        // isTopLevelNode --> treeView.isTopLevelNode(node)
        return true
      },
      onDrop({ source, location }) {
        const dragging = source.data
        const [innerMost] = location.current.dropTargets

        if (!innerMost) {
          return
        }
        const dropTargetData = innerMost.data

        const instruction: Instruction | null = extractInstruction(dropTargetData)
        if (!instruction) {
          return
        }

        console.log("onDrop - TreeViewCompositionTree ", { dropTargetData })
      }
    })
  }, [])



  useEffect(() => {
    const element = refGroup.current
    return dropTargetForElements({
      element,
      canDrop: ({ source }: any) => treeView.isTopLevelNode(source.data),
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


  return (
    <TreeView.Tree>
      <GroupDropIndicator ref={refGroup} isActive={state === "is-over"}>
        {treeView.nodes.map((node) => (
          <TreeViewCompositionNode key={node.id} level={1} node={node} />
        ))}
      </GroupDropIndicator>
    </TreeView.Tree>
  )
}

type TreeViewCompositionNodeProps = {
  level: number
  node: TreeViewDataNode
}

const TreeViewCompositionNode = (props: TreeViewCompositionNodeProps) => {
  const { level, node } = props
  const treeView = useTreeViewContext<TreeViewDataNode>()

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useNodeItemDragAndDrop({
    draggable: {
      // getInitialData: () => getTopLevelItemData("filters"),
      getInitialData: (): any => {
        return []
      },
      // getDragPreviewPieces: () => ({
      //   elemBefore: <FilterIcon label="" />,
      //   content: "Filters",
      // }),
    },
    dropTarget: {
      // getData: () => getTopLevelItemData("filters"),
      getData: () => [],
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      // canDrop: ({ source }) => isTopLevelItemData(source.data),
      canDrop: ({ source }: any) => treeView.isTopLevelNode(source.data),
    },
  })



  return (
    <TreeView.Node {...treeView.getNodeProps({ node, level })}>
      <TreeView.Item>
        <TreeView.ItemIndent />
        <TreeView.ItemStart>
          <TreeView.Toggle {...treeView.getToggleProps({ node })}>
            <ChevronRight aria-hidden="true" />
          </TreeView.Toggle>
        </TreeView.ItemStart>
        <TreeView.ItemContent onClick={() => treeView.selectNode(node)}>
          <TreeView.Text>{node.label}</TreeView.Text>
        </TreeView.ItemContent>
        <TreeView.ItemEnd onClick={() => treeView.selectNode(node)}>
          <TreeView.Meta>
            {treeView.isTopLevelNode(node) ? "Top" : "Nested"}
          </TreeView.Meta>
          {node.meta ? <TreeView.Meta>{node.meta}</TreeView.Meta> : null}
        </TreeView.ItemEnd>
      </TreeView.Item>
      {treeView.isBranch(node) && treeView.isExpanded(node) ? (
        <TreeView.NodeChild>
          {node.children?.map((child) => (
            <TreeViewCompositionNode key={child.id} level={level + 1} node={child} />
          ))}
        </TreeView.NodeChild>
      ) : null}
    </TreeView.Node>
  )
}
