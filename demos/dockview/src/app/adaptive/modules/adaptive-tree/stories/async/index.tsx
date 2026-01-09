"use client"
import { AdaptiveTree } from "#adaptive-tree"
import { createTreeCollection } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder, LuLoaderCircle } from "react-icons/lu"

// mock api result
const response: Record<string, Node[]> = {
  node_modules: [
    { id: "zag-js", name: "zag-js" },
    { id: "pandacss", name: "panda" },
    { id: "@types", name: "@types", childrenCount: 2 },
  ],
  "node_modules/@types": [
    { id: "react", name: "react" },
    { id: "react-dom", name: "react-dom" },
  ],
  src: [
    { id: "app.tsx", name: "app.tsx" },
    { id: "index.ts", name: "index.ts" },
  ],
}

// function to load children of a node
function loadChildren(details: AdaptiveTree.LoadChildrenDetails<Node>): Promise<Node[]> {
  const value = details.valuePath.join("/")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response[value] ?? [])
    }, 1200)
  })
}

export const TreeViewAsync = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <AdaptiveTree.Root
      collection={collection}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e) => setCollection(e.collection)}
    >
      <AdaptiveTree.Label>Tree</AdaptiveTree.Label>
      <AdaptiveTree.Tree>
        <AdaptiveTree.Node<Node>
          indentGuide={<AdaptiveTree.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <AdaptiveTree.BranchControl>
                {nodeState.loading ? <LuLoaderCircle style={{ animation: "spin 1s infinite" }} /> : <LuFolder />}
                <AdaptiveTree.BranchText>{node.name}</AdaptiveTree.BranchText>
              </AdaptiveTree.BranchControl>
            ) : (
              <AdaptiveTree.Item>
                <LuFile />
                <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
              </AdaptiveTree.Item>
            )
          }
        />
      </AdaptiveTree.Tree>
    </AdaptiveTree.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "node_modules", name: "node_modules", childrenCount: 3 },
      { id: "src", name: "src", childrenCount: 2 },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

export default Index
