"use client"
import JsonView from "react18-json-view"
import { Fragment, memo, useCallback, useContext, useRef } from "react"
import { chakra, HStack, Stack, Icon, Text, Button, Container, Badge } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { GroupDropIndicator } from "../../../pragmatic-drag-drop/drop-indicator/group"
import { DependencyContext, TreeContext } from "../providers/tree-context"
import { useDraggableTreeItemWithActors } from "../hooks/use-draggable-tree-item-with-actors"
import { useTreeItem } from "../selectors/tree.item.selector"
import { useTree } from "../selectors/tree.selector"
const indentPerLevel = 5

const TreeItemWithActors = memo(function TreeItem({
  itemRef,
  level,
  index,
}: {
  itemRef?: any
  level: number
  index: number
}) {
  // const { sendToTreeManager, attachInstructionTreeManager, extractInstructionTreeManager } = useTreeItem()
  // const treeSelector = useTreeItem()
  // const treeItemSelector = useTreeItem()

  const {
    viewConfig,
    treeItemContext,
    dataValue: item,
    childItemsRef,
    treeItemChildrenRef,
    treeItemChildrenIds,
    sendToTreeItem,
    isOpen,
  } = useTreeItem({ actorRef: itemRef })

  const { uniqueContextId, dependencies } = useTree()
  const { attachInstruction, extractInstruction, DropIndicator } = dependencies

  const buttonRef = useRef<HTMLButtonElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  // const { dispatch } = useContext(TreeContext)
  // const { attachInstruction, extractInstruction, DropIndicator } = useContext(DependencyContext)

  const toggleHandler = () => sendToTreeItem({ type: "toggle" })

  // const toggleOpen = useCallback(() => dispatch({ type: "toggle", itemId: item.id }), [dispatch, item.id])

  const { dragState, groupState, instruction } = useDraggableTreeItemWithActors({
    itemRef,
    buttonRef,
    groupRef,
    // dispatch,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
  })

  const aria = (() => {
    if (!item.children?.length || item.children?.length === 0) {
      return undefined
    }

    // if (!item.children.length) {
    //   return undefined
    // }
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
              // border: "4px solid yellow",
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
                {/*<Badge size={"xs"} variant={"subtle"}>*/}
                {/*  {treeItemId}*/}
                {/*</Badge>*/}
                {/*{treeItemContext.viewRuntime?.dragItemId && (*/}
                {/*  <Badge size={"xs"} variant={"subtle"}>*/}
                {/*    {treeItemContext.viewRuntime?.dragItemId}*/}
                {/*  </Badge>*/}
                {/*)}*/}
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

          <Button
            size={"2xs"}
            variant={"outline"}
            // onPointerDownCapture={(e) => {
            //   e.preventDefault()
            //   e.stopPropagation()
            // }}
            onClick={(e) => {
              // e.preventDefault()
              // e.stopPropagation()
              console.log("inspect item - WITHOUT actor", {
                level,
                index,
                dragState,
                groupState,
                instruction,
                item,
                viewConfig,
                treeItemContext,
                childItemsRef,
                treeItemChildrenRef,
                treeItemChildrenIds,
              })
            }}
          >
            Inspect
          </Button>
        </HStack>
      </chakra.div>

      {item.children?.length > 0 && item.isOpen && (
        <chakra.div id={aria?.["aria-controls"]} pl={indentPerLevel}>
          <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
            {treeItemChildrenIds?.map((child: any, i: number) => {
              // <JsonView
              //   src={{
              //     child,
              //     level: level + 1,
              //     index: i,
              //
              //     treeItemChildrenIds, treeItemChildrenRef, childItemsRef, item
              //   }}
              //   collapsed={1}
              //   key={child.id}
              // />

              return <TreeItemWithActors key={child} itemRef={treeItemChildrenRef[child]} level={level + 1} index={i} />
            })}
          </GroupDropIndicator>
        </chakra.div>
      )}
    </Fragment>
  )
})

export default TreeItemWithActors

