"use client"

import { Menu, Portal, createTreeCollection } from "@chakra-ui/react"
import {
  AdaptiveTree,
  useAdaptiveTreeNodeContext,
  useAdaptiveTreeContext,
  useAdaptiveTreeViewStyles,
} from "#adaptive-tree"

import { useId } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

interface TreeNodeContextMenuProps extends Menu.RootProps {
  uid: string
  node: Node
  children: React.ReactNode
}

const TreeNodeContextMenu = (props: TreeNodeContextMenuProps) => {
  const { children, uid, node, ...rest } = props

  const treeView = useAdaptiveTreeContext()
  const treeStyles = useAdaptiveTreeViewStyles()
  const nodeState = useAdaptiveTreeNodeContext()

  const attrs = nodeState.isBranch
    ? AdaptiveTree.getBranchControlProps({ node, indexPath: nodeState.indexPath })
    : AdaptiveTree.getItemProps({ node, indexPath: nodeState.indexPath })

  const styles = nodeState.isBranch ? treeStyles.branchControl : treeStyles.item

  return (
    <Menu.Root {...rest} ids={{ contextTrigger: getNodeId(uid, node.id) }}>
      <Menu.ContextTrigger as="div" {...attrs} css={styles}>
        {children}
      </Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="rename">Rename</Menu.Item>
            <Menu.Item value="delete">Delete</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const getNodeId = (uid: string, node: string) => `${uid}/${node}`

const Index = () => {
  const uid = useId()
  return (
    <AdaptiveTree.Root collection={collection} maxW="sm" ids={{ node: (value) => getNodeId(uid, value) }}>
      <AdaptiveTree.Label>Tree</AdaptiveTree.Label>
      <AdaptiveTree.Tree>
        <AdaptiveTree.Node
          indentGuide={<AdaptiveTree.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeNodeContextMenu uid={uid} node={node}>
                <LuFolder />
                <AdaptiveTree.BranchText>{node.name}</AdaptiveTree.BranchText>
              </TreeNodeContextMenu>
            ) : (
              <TreeNodeContextMenu uid={uid} node={node}>
                <LuFile />
                <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
              </TreeNodeContextMenu>
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
