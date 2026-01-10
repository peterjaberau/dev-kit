"use client"

import { useContext, useEffect, useMemo, useRef } from "react"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { AdaptiveTree, createTreeCollection } from "#adaptive-tree"
import { TreeContext, DependencyContext } from "#adaptive-modules/adaptive-dnd/dnd-tree-context"
import { useDndTree } from "#adaptive-modules/adaptive-dnd/use-dnd-tree"
import { TreeNode } from "./TreeNode"
import { GroupDropIndicator } from "#modules/drag-and-drop/components/dnd/drop-indicator/group"

function Index() {
  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const context = useMemo(() => ({ uniqueContextId: Symbol("tree") }), [])

  const { extractInstruction } = useContext(DependencyContext)

  useEffect(() => {
    return () => {
      liveRegion.cleanup()
    }
  }, [])

  const { groupState } = useDndTree({
    rootRef,
    groupRef,
    uniqueContextId: context.uniqueContextId,
    extractInstruction,
  })

  return (
    <TreeContext.Provider value={context}>
      <AdaptiveTree.Root collection={collection}>
        <AdaptiveTree.Label>Tree</AdaptiveTree.Label>
        <AdaptiveTree.Tree ref={rootRef}>
          <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
            <AdaptiveTree.Node render={({ node, nodeState }: any) => <TreeNode node={node} nodeState={nodeState} />} />
          </GroupDropIndicator>
        </AdaptiveTree.Tree>
      </AdaptiveTree.Root>
    </TreeContext.Provider>
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
