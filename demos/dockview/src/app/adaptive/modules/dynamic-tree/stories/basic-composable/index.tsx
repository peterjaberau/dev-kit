"use client"

import { DynamicTree, createTreeCollection, useDynamicTree } from "#dynamic-tree"
import { LuFile, LuFolder } from "react-icons/lu"
import { SquareCheckBigIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"

const Index = () => {
  const dynamicTree = useDynamicTree({ collection })

  return (
    <DynamicTree.RootProvider value={dynamicTree}>
      <DynamicTree.Label>Tree</DynamicTree.Label>
      <DynamicTree.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNodeComposed key={node.id} node={node} indexPath={[index]} />
        ))}
      </DynamicTree.Tree>
    </DynamicTree.RootProvider>
  )
}

const TreeNodeComposed = (props: any) => {
  const { node, indexPath } = props
  return (
    <DynamicTree.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <DynamicTree.Branch>
          <DynamicTree.BranchControl>
            <FolderIcon />
            <DynamicTree.BranchText>{node.name}</DynamicTree.BranchText>
            <DynamicTree.BranchIndicator>
              <ChevronRightIcon />
            </DynamicTree.BranchIndicator>
          </DynamicTree.BranchControl>
          <DynamicTree.BranchContent>
            <DynamicTree.BranchIndentGuide />
            {node.children.map((child: any, index: any) => (
              <TreeNodeComposed key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </DynamicTree.BranchContent>
        </DynamicTree.Branch>
      ) : (
        <DynamicTree.Item>
          <SquareCheckBigIcon />
          {/*<DynamicTree.ItemIndicator />*/}
          <DynamicTree.ItemText>{node.name}</DynamicTree.ItemText>
        </DynamicTree.Item>
      )}
    </DynamicTree.NodeProvider>
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
