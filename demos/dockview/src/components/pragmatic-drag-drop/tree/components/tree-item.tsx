"use client"

import { Fragment, memo, useCallback, useContext, useRef } from "react"
import { chakra, HStack, Icon, Text } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { DropIndicator } from "./dnd-drop-indicator"
import { DependencyContext, TreeContext } from "../providers/tree-context"
import { useDraggableTreeItem } from "../hooks/use-draggable-tree-item"

const indentPerLevel = 5


const TreeItem = memo(function TreeItem({ item, level, index }: { item: any; level: number; index: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const { dispatch, uniqueContextId } = useContext(TreeContext)
  const { attachInstruction, extractInstruction, DropIndicator: ListIndicator } = useContext(DependencyContext)

  const { dragState, groupState, instruction } = useDraggableTreeItem({
    item,
    buttonRef,
    groupRef,
    dispatch,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
  })

  const toggleOpen = useCallback(() => dispatch({ type: "toggle", itemId: item.id }), [dispatch, item.id])

  return (
    <Fragment>
      <chakra.div position="relative">
        <chakra.button
          ref={buttonRef}
          onClick={toggleOpen}
          w="100%"
          bg="transparent"
          border={0}
          p={0}
          opacity={dragState === "dragging" ? 0.4 : 1}
        >
          <HStack p={2} pl={level * indentPerLevel + 2}>
            {item.children.length > 0 && <Icon>{item.isOpen ? <LuChevronDown /> : <LuChevronRight />}</Icon>}
            <Text>Item {item.id}</Text>
          </HStack>

          {instruction && <ListIndicator instruction={instruction} />}
        </chakra.button>
      </chakra.div>

      {item.children.length > 0 && item.isOpen && (
        <chakra.div pl={indentPerLevel}>
          <DropIndicator.Group ref={groupRef} isActive={groupState === "is-innermost-over"}>
            {item.children.map((child: any, i: number) => (
              <TreeItem key={child.id} item={child} level={level + 1} index={i} />
            ))}
          </DropIndicator.Group>
        </chakra.div>
      )}
    </Fragment>
  )
})

export default TreeItem
