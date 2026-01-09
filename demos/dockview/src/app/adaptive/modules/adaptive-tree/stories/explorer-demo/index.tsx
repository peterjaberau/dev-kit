"use client"
import { AdaptiveTree, useAdaptiveTreeNodeContext } from "#adaptive-tree"
import { Checkmark, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder, LuSquareMinus, LuSquarePlus } from "react-icons/lu"

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

const NodeCheckbox = (props: AdaptiveTree.NodeCheckboxProps) => {
  const nodeState = useAdaptiveTreeNodeContext()
  return (
    <AdaptiveTree.NodeCheckbox aria-label="check node" {...props}>
      <Checkmark
        size="sm"
        bg={{
          base: "bg",
          _checked: "colorPalette.solid",
          _indeterminate: "colorPalette.solid",
        }}
        checked={nodeState.checked === true}
        indeterminate={nodeState.checked === "indeterminate"}
      />
    </AdaptiveTree.NodeCheckbox>
  )
}

const Index = () => {
  return (
    <AdaptiveTree.Root
      collection={collection}
      maxW="sm"
      defaultExpandedValue={["node_modules", "node_modules/@types", "src"]}
      defaultCheckedValue={[]}
    >
      <AdaptiveTree.Label mb="2" fontWeight="medium">
        Project Explorer
      </AdaptiveTree.Label>

      <AdaptiveTree.Tree>
        <AdaptiveTree.Node
          indentGuide={<AdaptiveTree.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <AdaptiveTree.BranchContent>
                <AdaptiveTree.BranchControl>
                  <AdaptiveTree.BranchTrigger>
                    {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
                  </AdaptiveTree.BranchTrigger>
                  <NodeCheckbox />
                  <LuFolder />
                  <AdaptiveTree.BranchText>{node.name}</AdaptiveTree.BranchText>
                  <AdaptiveTree.BranchIndicator />
                </AdaptiveTree.BranchControl>
              </AdaptiveTree.BranchContent>
            ) : (
              <AdaptiveTree.Item>
                <NodeCheckbox />
                <LuFile />
                <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
                <AdaptiveTree.ItemIndicator />
              </AdaptiveTree.Item>
            )
          }
        />
      </AdaptiveTree.Tree>
    </AdaptiveTree.Root>
  )
}
export default Index
