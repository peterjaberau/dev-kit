"use client"
import { Fragment, memo, useRef } from "react"
import { chakra, HStack, Icon } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { GroupDropIndicator } from "./dnd/drop-indicator/group"
import { useDndNode } from './dnd'
import { useTree, useTreeItem } from "../selectors"
const indentPerLevel = 5

export const TreeItem = memo(function TreeItem({
  itemRef,
  level,
  index,
}: {
  itemRef?: any
  level: number
  index: number
}) {
  const {
    dataValue: item,
    treeItemChildrenRef,
    treeItemChildrenIds,
    sendToTreeItem,
    isOpen,
  } = useTreeItem({ actorRef: itemRef })

  const { dependencies } = useTree()
  const { DropIndicator } = dependencies

  const buttonRef = useRef<HTMLButtonElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  const toggleHandler = () => sendToTreeItem({ type: "toggle", open: !isOpen })

  const { dragState, groupState, instruction } = useDndNode({
    item: {
      id: item.id,
    },
    isOpen: isOpen || false,
    sender: sendToTreeItem,
    itemRef,
    buttonRef,
    groupRef,
  })

  const aria = (() => {
    if (!item.children?.length || item.children?.length === 0) {
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
        <HStack>
          <chakra.button
            {...aria}
            css={{
              color: "currentColor",
              width: "100%",
              position: "relative",
              background: "transparent",
              margin: 0,
              padding: 0,
              borderRadius: 3,
              cursor: "pointer",
              border: 0,
            }}
            id={`tree-item-${item.id}`}
            onClick={toggleHandler}
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
              {item.children?.length > 0 && <Icon>{item.isOpen ? <LuChevronDown /> : <LuChevronRight />}</Icon>}

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
                // border: "4px solid blue",
                position: "absolute",
                inset: 0,
                left: `calc(-1 * ${level} * ${indentPerLevel}`,
              }}
            />
          </chakra.button>
        </HStack>
      </chakra.div>

      {item.children?.length > 0 && item.isOpen && (
        <chakra.div id={aria?.["aria-controls"]} pl={indentPerLevel}>
          <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
            {treeItemChildrenIds?.map((child: any, i: number) => {
              return <TreeItem key={child} itemRef={treeItemChildrenRef[child]} level={level + 1} index={i} />
            })}
          </GroupDropIndicator>
        </chakra.div>
      )}
    </Fragment>
  )
})

