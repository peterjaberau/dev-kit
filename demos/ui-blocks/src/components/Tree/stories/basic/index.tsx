"use client"
import { TreeContext } from "../../components/TreeContext"
import { Tree } from "../.."
import { RenderNode } from "./NodeRenderer"
import { useState } from "react"

const INITIAL_TREE: any[] = [
  {
    id: "1",
    name: "src",
    order: 1,
    isDir: true,
    children: [
      {
        id: "1-1",
        name: "components",
        order: 1,
        isDir: true,
        children: [
          { id: "1-1-1", name: "Button.tsx", order: 1, isDir: false },
          { id: "1-1-2", name: "Tree.tsx", order: 2, isDir: false },
        ],
      },
      {
        id: "1-2",
        name: "index.ts",
        order: 2,
        isDir: false,
      },
    ],
  },
  {
    id: "2",
    name: "package.json",
    order: 2,
    isDir: false,
  },
]

export const TreeBasicExample = () => {
  const [activeId, setActiveId] = useState<string>()
  const [tree] = useState<any[]>(INITIAL_TREE)

  return (
    <TreeContext.Provider
      value={{
        id: "basic-tree",
        name: "Basic Tree",
        order: 0,
        treePaddingLeft: 8,
        treePaddingRight: 8,
        nodeOffset: 16,
        showOrders: true,
      }}
    >
      <Tree.RootNode>
        <Tree.RootNodeHeader isActive={false}>
          <Tree.RootNodeControls>
            <Tree.RootNodeLabel label="Project Files" />
            <Tree.RootNodeOrder order={1} />
          </Tree.RootNodeControls>
        </Tree.RootNodeHeader>

        <Tree.RootNodeChildren>
          {tree.map((item) => (
            <RenderNode key={item.id} item={item} depth={0} activeId={activeId} onSelect={setActiveId} />
          ))}
        </Tree.RootNodeChildren>
      </Tree.RootNode>
    </TreeContext.Provider>
  )
}
