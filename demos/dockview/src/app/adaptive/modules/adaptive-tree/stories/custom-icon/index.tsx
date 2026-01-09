"use client"

import { createTreeCollection } from "@chakra-ui/react"
import { RxFrame, RxImage, RxSquare, RxText } from "react-icons/rx"
import { AdaptiveTree } from "#adaptive-tree"
const Index = () => {
  return (
    <AdaptiveTree.Root collection={collection} maxW="sm" size="sm" defaultExpandedValue={["ROOT"]}>
      <AdaptiveTree.Label srOnly>Tree</AdaptiveTree.Label>
      <AdaptiveTree.Tree>
        <AdaptiveTree.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <AdaptiveTree.BranchControl>
                <AdaptiveTreeNodeIcon type={node.type} />
                <AdaptiveTree.BranchText fontWeight="medium">{node.name}</AdaptiveTree.BranchText>
              </AdaptiveTree.BranchControl>
            ) : (
              <AdaptiveTree.Item>
                <AdaptiveTreeNodeIcon type={node.type} />
                <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
              </AdaptiveTree.Item>
            )
          }
        />
      </AdaptiveTree.Tree>
    </AdaptiveTree.Root>
  )
}

const TreeViewNodeIcon = (props: { type: Node["type"] }) => {
  switch (props.type) {
    case "text":
      return <RxText />
    case "image":
      return <RxImage />
    case "frame":
      return <RxFrame />
    case "rectangle":
      return <RxSquare />
    default:
      return null
  }
}

interface Node {
  type: "text" | "image" | "frame" | "rectangle"
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    type: "frame",
    children: [
      {
        id: "page",
        name: "Page",
        type: "frame",
        children: [
          {
            id: "header",
            name: "Header",
            type: "frame",
            children: [
              { id: "logo", name: "Logo", type: "image" },
              { id: "nav", name: "Navigation", type: "text" },
            ],
          },
        ],
      },
      { id: "footer", name: "Footer", type: "text" },
      {
        id: "main",
        name: "Main",
        type: "frame",
        children: [
          { id: "hero", name: "Hero Section", type: "text" },
          { id: "features", name: "Features", type: "text" },
        ],
      },
    ],
  },
})
export default Index
