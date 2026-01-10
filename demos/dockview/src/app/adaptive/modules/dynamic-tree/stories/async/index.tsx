"use client"
import { DynamicTree, createTreeCollection } from "#dynamic-tree"
import { useState } from "react"
import { LuFile, LuFolder, LuLoaderCircle } from "react-icons/lu"

// mock api result
const response: Record<string, any> = {
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
function loadChildren(details: any): Promise<any[]> {
  const value = details.valuePath.join("/")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response[value] ?? [])
    }, 1200)
  })
}

const Index = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <DynamicTree.Root
      collection={collection}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e: any) => setCollection(e.collection)}
    >
      <DynamicTree.Label>Tree</DynamicTree.Label>
      <DynamicTree.Tree>
        <DynamicTree.Node
          indentGuide={<DynamicTree.BranchIndentGuide />}
          render={({ node, nodeState }: any) =>
            nodeState.isBranch ? (
              <DynamicTree.BranchControl>
                {nodeState.loading ? <LuLoaderCircle style={{ animation: "spin 1s infinite" }} /> : <LuFolder />}
                <DynamicTree.BranchText>{node.name}</DynamicTree.BranchText>
              </DynamicTree.BranchControl>
            ) : (
              <DynamicTree.Item>
                <LuFile />
                <DynamicTree.ItemText>{node.name}</DynamicTree.ItemText>
              </DynamicTree.Item>
            )
          }
        />
      </DynamicTree.Tree>
    </DynamicTree.Root>
  )
}

const initialCollection = createTreeCollection({
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
