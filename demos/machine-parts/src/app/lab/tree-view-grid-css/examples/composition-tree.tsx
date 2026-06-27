"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@chakra-ui/react"
import { TreeView, useTreeViewContext } from "../components"
import type { TreeViewDataNode } from "../components"

export const TreeViewCompositionTree = () => {
  const treeView = useTreeViewContext<TreeViewDataNode>()

  return (
    <TreeView.Tree>
      {treeView.nodes.map((node) => (
        <TreeViewCompositionNode key={node.id} level={1} node={node} />
      ))}
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

  return (
    <TreeView.Node {...treeView.getNodeProps({ node, level })}>
      <TreeView.NodeIndent />
      <TreeView.NodeStart>
        <TreeView.Toggle {...treeView.getToggleProps({ node })}>
          <ChevronRight aria-hidden="true" />
        </TreeView.Toggle>
      </TreeView.NodeStart>
      <TreeView.NodeContent onClick={() => treeView.selectNode(node)}>
        <TreeView.Text>{node.label}</TreeView.Text>
      </TreeView.NodeContent>
      <TreeView.NodeEnd onClick={() => treeView.selectNode(node)}>
        {node.meta ? <TreeView.Meta>{node.meta}</TreeView.Meta> : null}
      </TreeView.NodeEnd>
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
