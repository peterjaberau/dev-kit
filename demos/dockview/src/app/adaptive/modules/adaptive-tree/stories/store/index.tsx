"use client"
import { AdaptiveTree, createTreeCollection, useAdaptiveTree } from "#adaptive-tree"
import { LuFile, LuFolder } from "react-icons/lu"

const Index = () => {
  const store = useTreeView({
    collection,
    defaultExpandedValue: [],
  })

  return (
    <AdaptiveTree.RootProvider value={store}>
      <AdaptiveTree.Label>Tree</AdaptiveTree.Label>
      <pre>{JSON.stringify(store.expandedValue)}</pre>
      <AdaptiveTree.Tree>
        <AdaptiveTree.Node<Node>
          indentGuide={<AdaptiveTree.BranchIndentGuide />}
          render={({ node }) =>
            node.children ? (
              <AdaptiveTree.BranchControl>
                <LuFolder />
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
    </AdaptiveTree.RootProvider>
  )
}

interface Node {
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
