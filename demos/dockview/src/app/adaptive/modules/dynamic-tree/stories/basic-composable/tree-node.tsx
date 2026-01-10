import { DynamicTree } from "#dynamic-tree"
import { ChevronRightIcon, FolderIcon, SquareCheckBigIcon } from "lucide-react"

import { GroupDropIndicator } from "#drag-and-drop/components/dnd/drop-indicator/group"
import { DropIndicator } from "#drag-and-drop/components/dnd/drop-indicator/list-item"
import { useDndNode } from "#drag-and-drop/components"
import { useEffect, useRef } from "react"
import { chakra } from "@chakra-ui/react"

export const TreeNodeComposed = (props: any) => {
  const { node, indexPath } = props

  const nodeRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const { dragState, groupState, instruction } = useDndNode({
    item: {
      id: node.id,
      scope: 'dynamic-tree-node',
    },
    isOpen: true,
    buttonRef: nodeRef,
    groupRef,
  })

  return (
    <DynamicTree.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <DynamicTree.Branch ref={nodeRef}>
          <DynamicTree.BranchControl
            css={{
              opacity: dragState === "dragging" ? 0.5 : 1,
            }}
          >
            <FolderIcon />
            <DynamicTree.BranchText>{node.name}</DynamicTree.BranchText>
            <DynamicTree.BranchIndicator>
              <ChevronRightIcon />
            </DynamicTree.BranchIndicator>
            {instruction ? <DropIndicator instruction={instruction} /> : null}
          </DynamicTree.BranchControl>
          <DynamicTree.BranchContent>
            <DynamicTree.BranchIndentGuide />
            <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
              {node.children.map((child: any, index: any) => (
                <TreeNodeComposed key={child.id} node={child} indexPath={[...indexPath, index]} />
              ))}
            </GroupDropIndicator>
          </DynamicTree.BranchContent>
        </DynamicTree.Branch>
      ) : (
        <chakra.div
          css={{
            position: "relative",
          }}
        >
          <DynamicTree.Item
            ref={nodeRef}
            css={{
              opacity: dragState === "dragging" ? 0.5 : 1,
            }}
          >
            <SquareCheckBigIcon />
            {/*<DynamicTree.ItemIndicator />*/}
            <DynamicTree.ItemText>{node.name}</DynamicTree.ItemText>
            {instruction ? <DropIndicator instruction={instruction} /> : null}
          </DynamicTree.Item>
        </chakra.div>
      )}
    </DynamicTree.NodeProvider>
  )
}
