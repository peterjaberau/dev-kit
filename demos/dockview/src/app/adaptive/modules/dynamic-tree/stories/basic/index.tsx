"use client"

import { DynamicTree, createTreeCollection } from "#dynamic-tree"
import { LuFile, LuFolder } from "react-icons/lu"

const Index = () => {
  return (
    <DynamicTree.Root collection={collection} maxW="sm">
      <DynamicTree.Label>Tree</DynamicTree.Label>
      <DynamicTree.Tree>
        <DynamicTree.Node
          indentGuide={<DynamicTree.BranchIndentGuide />}
          render={({ node, nodeState }: any) =>
            nodeState.isBranch ? (
              <DynamicTree.BranchControl>
                <LuFolder />
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

const collection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})
export default Index
