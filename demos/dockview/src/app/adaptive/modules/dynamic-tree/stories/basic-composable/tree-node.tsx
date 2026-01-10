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
      children: node.children,
      isBranchData: true,
      isOpen: false,
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
          </DynamicTree.BranchControl>
          {instruction ? <DropIndicator instruction={instruction} /> : null}
          <DynamicTree.BranchContent>
            <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
              <DynamicTree.BranchIndentGuide />

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
            ...(dragState === "idle" && {
              _hover: {
                backgroundColor: "bg.muted",
              },
            }),
          }}
        >
          <chakra.div>
            <DynamicTree.Item
              css={{
                opacity: dragState === "dragging" ? 0.5 : 1,
              }}
              ref={nodeRef}
            >
              <SquareCheckBigIcon />
              {/*<DynamicTree.ItemIndicator />*/}
              <DynamicTree.ItemText>{node.name}</DynamicTree.ItemText>
            </DynamicTree.Item>
            {instruction ? <DropIndicator instruction={instruction} /> : null}
          </chakra.div>
        </chakra.div>
      )}
    </DynamicTree.NodeProvider>
  )
}
