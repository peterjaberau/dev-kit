"use client"

import { Fragment, memo, useCallback, useContext, useRef } from "react"
import { chakra, HStack, Icon, Text } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
// import { GroupDropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/group';
import { GroupDropIndicator } from "../../../pragmatic-drag-drop/drop-indicator/group"
import { DependencyContext, TreeContext } from "../providers/tree-context"
import { useDraggableTreeItem } from "../hooks/use-draggable-tree-item"
import { Stack, Badge } from "@chakra-ui/react"
const indentPerLevel = 5

const TreeItem = memo(function TreeItem({ item, level, index }: { item: any; level: number; index: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const { dispatch, uniqueContextId } = useContext(TreeContext)
  const { attachInstruction, extractInstruction, DropIndicator } = useContext(DependencyContext)

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

  const aria = (() => {
    if (!item.children.length) {
      return undefined
    }
    return {
      "aria-expanded": item.isOpen,
      "aria-controls": `tree-item-${item.id}--subtree`,
    }
  })()

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
          {...aria}
          css={{
            color: "currentColor",
            border: 0,
            width: "100%",
            position: "relative",
            background: "transparent",
            margin: 0,
            padding: 0,
            borderRadius: 3,
            cursor: "pointer",
          }}
          id={`tree-item-${item.id}`}
          onClick={toggleOpen}
          ref={buttonRef}
          data-index={index}
          data-level={level}
        >
          <chakra.span
            css={{
              padding: 1,
              paddingRight: "40px",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              borderRadius: 3,
              ...(dragState === "dragging" && {
                opacity: 0.4,
              }),
            }}
          >
            {item.children.length > 0 && <Icon>{item.isOpen ? <LuChevronDown /> : <LuChevronRight />}</Icon>}

            <chakra.span
              css={{
                flexGrow: 1,
                overflow: "hidden",
                textAlign: "left",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Item {item.id}
            </chakra.span>
            <chakra.small
              css={{
                margin: 0,
                color: "fg.muted",
              }}
            >
              {item.isDraft ? <code>Draft</code> : null}
            </chakra.small>
          </chakra.span>
          {instruction ? <DropIndicator instruction={instruction} /> : null}
          <chakra.span
            css={{
              position: "absolute",
              inset: 0,
              left: `calc(-1 * ${level} * ${indentPerLevel}`,
            }}
          />
        </chakra.button>
      </chakra.div>

      {item.children.length > 0 && item.isOpen && (
        <chakra.div id={aria?.["aria-controls"]} pl={indentPerLevel}>
          <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
            {item.children.map((child: any, i: number) => (
              <TreeItem key={child.id} item={child} level={level + 1} index={i} />
            ))}
          </GroupDropIndicator>
        </chakra.div>
      )}
    </Fragment>
  )
})

export default TreeItem
