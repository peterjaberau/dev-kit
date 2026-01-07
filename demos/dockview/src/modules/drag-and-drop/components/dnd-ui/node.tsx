import { forwardRef, Fragment, memo, useRef } from "react"
import { useTree, useTreeItem } from "../../selectors"
import { useDndNode } from "../dnd/use-dnd-node"
import { chakra, HStack, Box, Icon, Text, Badge } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
const indentPerLevel = 9

export const Node = memo(
  forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
    const { itemRef, level, index, ...rest } = props

    const {
      dataValue: item,
      treeItemChildrenRef,
      treeItemChildrenIds,
      sendToTreeItem,
      isOpen,
    } = useTreeItem({ actorRef: itemRef })

    const { dependencies } = useTree()
    const { DropIndicator } = dependencies

    const nodeRef = useRef<HTMLDivElement>(null)
    const groupRef = useRef<HTMLDivElement>(null)

    const toggleHandler = () => {
      sendToTreeItem({ type: "toggle", open: !isOpen })
      console.log("item--->", {
        item: item,
        length: item?.children?.length,
        children: item?.children,
        hasChildren: !!item?.children,
      })
    }

    const { dragState, groupState, instruction } = useDndNode({
      itemRef,
      buttonRef: nodeRef,
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
          data-scope="drag-drop"
          data-part="node"
          css={{
            position: "relative",
            flexGrow: 1,
            ...(dragState === "idle" && {
              _hover: {
                backgroundColor: "bg.subtle",
              },
            }),
          }}
          ref={ref}
        >
          <chakra.div
            data-scope="drag-drop"
            data-part={!!item?.children ? "branch" : "item"}
            data-index={index}
            data-level={level}
            id={`tree-item-${item.id}`}
            {...aria}
            css={{
              cursor: "pointer",
              p: 1,
            }}
            onClick={!!item?.children ? toggleHandler : undefined}
            ref={nodeRef}
          >
            <HStack
              data-scope="drag-drop"
              data-part={!!item?.children ? "branch-trigger" : "item-content"}
              css={{
                alignItems: "center",
                justifyContent: "flex-start",
                ...(dragState === "dragging" && {
                  opacity: 0.4,
                }),
              }}
            >
              {item.children?.length > 0 && (
                <Icon data-scope="drag-drop" data-part="trigger-indicator">
                  {item.isOpen ? <LuChevronDown /> : <LuChevronRight />}
                </Icon>
              )}

              <Text
                data-scope="drag-drop"
                data-part="node-title"
                css={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textAlign: "left",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Item {item.id}
              </Text>
              {item.isDraft && (
                <Badge data-scope="drag-drop" data-part="tag-indicator" variant={"outline"}>
                  Draft
                </Badge>
              )}
            </HStack>
            {instruction ? <DropIndicator instruction={instruction} /> : null}
          </chakra.div>
        </chakra.div>

        {item.children?.length > 0 && item.isOpen && (
          <chakra.div
            id={aria?.["aria-controls"]}
            pl={indentPerLevel}
            data-scope="drag-drop"
            data-part="branch-content"
          >
            <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
              {treeItemChildrenIds?.map((child: any, i: number) => {
                return <Node key={child} itemRef={treeItemChildrenRef[child]} level={level + 1} index={i} />
              })}
            </GroupDropIndicator>
          </chakra.div>
        )}
      </Fragment>
    )
  }),
)
