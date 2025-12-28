"use client"

import { Fragment, memo, useCallback, useContext, useRef } from "react"
import { chakra, HStack, Icon, Text } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { DropIndicator } from "./dnd-drop-indicator"
import { DependencyContext, TreeContext } from "../providers/tree-context"
import { useDraggableTreeItem } from "../hooks/use-draggable-tree-item"
import { Stack, Badge } from "@chakra-ui/react"
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
      <chakra.div
        position="relative"
        css={{
          ...(dragState === "idle" && {
            borderRadius: 3,
            cursor: "pointer",
            _hover: {
              backgroundColor: "rgba(9, 30, 66, 0.06)",
            },
          }),
        }}
      >
        <chakra.button
          ref={buttonRef}
          onClick={toggleOpen}
          w="100%"
          bg="transparent"
          border="1px solid"
          marginBottom={1}
          p={0}
          data-index={index}
          data-level={level}
          opacity={dragState === "dragging" ? 0.4 : 1}
        >
          {instruction && <ListIndicator instruction={instruction} />}
            <HStack p={2} pl={level * indentPerLevel + 2} boxShadow={"sm"}>
              {item.children.length > 0 && <Icon>{item.isOpen ? <LuChevronDown /> : <LuChevronRight />}</Icon>}
              <Text>Item {item.id}</Text>
            </HStack>
            {/*<HStack>*/}
            {/*  <Badge>id: {item.id}</Badge>*/}
            {/*  <Badge>level: {level}</Badge>*/}
            {/*  <Badge>children#: {item.children.length}</Badge>*/}
            {/*  <Badge>isOpen: {item.isOpen}</Badge>*/}
            {/*  <Badge>index: {index}</Badge>*/}
            {/*</HStack>*/}
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
