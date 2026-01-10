"use client"

import { AdaptiveTree, createTreeCollection, useAdaptiveTree } from "#adaptive-tree"
import { LuFile, LuFolder } from "react-icons/lu"
import { SquareCheckBigIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"

const Index = () => {
  const adaptiveTree = useAdaptiveTree({ collection })

  return (
    <AdaptiveTree.RootProvider value={adaptiveTree}>
      <AdaptiveTree.Label>Tree</AdaptiveTree.Label>
      <AdaptiveTree.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNodeComposed key={node.id} node={node} indexPath={[index]} />
        ))}
      </AdaptiveTree.Tree>
    </AdaptiveTree.RootProvider>
  )
}

const TreeNodeComposed = (props: any) => {
  const { node, indexPath } = props
  return (
    <AdaptiveTree.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <AdaptiveTree.Branch>
          <AdaptiveTree.BranchControl>
            <FolderIcon />
            <AdaptiveTree.BranchText>{node.name}</AdaptiveTree.BranchText>
            <AdaptiveTree.BranchIndicator>
              <ChevronRightIcon />
            </AdaptiveTree.BranchIndicator>
          </AdaptiveTree.BranchControl>
          <AdaptiveTree.BranchContent>
            <AdaptiveTree.BranchIndentGuide />
            {node.children.map((child: any, index: any) => (
              <TreeNodeComposed key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </AdaptiveTree.BranchContent>
        </AdaptiveTree.Branch>
      ) : (
        <AdaptiveTree.Item>
          <SquareCheckBigIcon />
          {/*<AdaptiveTree.ItemIndicator />*/}
          <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
        </AdaptiveTree.Item>
      )}
    </AdaptiveTree.NodeProvider>
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
