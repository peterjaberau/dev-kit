"use client"

import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { GroupDropIndicator } from "#drag-and-drop/components/dnd/drop-indicator/group"
import { DropIndicator } from "#drag-and-drop/components/dnd/drop-indicator/list-item"
import { useDndTree, useDndNode } from "#drag-and-drop/components"
import { DynamicTree, createTreeCollection, useDynamicTree } from "#dynamic-tree"
import { TreeNodeComposed } from "./tree-node"
import { useEffect, useRef } from "react"

const Index = () => {
  const dynamicTree = useDynamicTree({ collection })

  const rootRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => liveRegion.cleanup()
  }, [])

  const { groupState } = useDndTree({
    rootRef: rootRef,
    groupRef,
  })

  return (
    <DynamicTree.RootProvider value={dynamicTree}>
      <DynamicTree.Tree ref={rootRef}>
        {collection.rootNode.children?.map((node, index) => (
          <GroupDropIndicator key={node.id} ref={groupRef} isActive={groupState === "is-innermost-over"}>
            <TreeNodeComposed  node={node} indexPath={[index]} />
          </GroupDropIndicator>
        ))}
      </DynamicTree.Tree>
    </DynamicTree.RootProvider>
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
