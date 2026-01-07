import { forwardRef, Fragment, memo, useRef } from "react"
import { useTree, useTreeItem } from "../../selectors"
import { useDndNode } from "../dnd/use-dnd-node"
import { chakra, HStack, Box, Icon, Text, Badge } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { Branch } from "./branch"
import { BranchTrigger } from "./branch.trigger"
import { BranchTriggerIndicator } from "./branch.trigger-indicator"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { Item } from "./item"
import { ItemContent } from "./item.content"

const indentPerLevel = 12


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
            borderRadius: "sm",
            paddingX: 1,
            flexGrow: 1,
            ...(dragState === "idle" && {
              _hover: {
                backgroundColor: "bg.muted",
              },
            }),
          }}
          ref={ref}
        >
          {/* BRANCH */}

          {!!item?.children && (
            <Branch itemRef={itemRef} data-index={index} data-level={level} id={`tree-item-${item.id}`} ref={nodeRef}>
              <BranchTrigger data-draggable={dragState} itemRef={itemRef}>
                {item.children.length > 0 && <BranchTriggerIndicator />}
                <NodeText css={{ flexGrow: 1 }}>Item {item.id}</NodeText>
                {item.isDraft && <NodeTag>Draft</NodeTag>}
                <NodeTag>Branch</NodeTag>
              </BranchTrigger>
              {instruction ? <DropIndicator instruction={instruction} /> : null}
            </Branch>
          )}

          {/* ITEM (LEAF) */}

          {!item?.children && (
            <Item data-index={index} data-level={level} id={`tree-item-${item.id}`} ref={nodeRef}>
              <ItemContent data-draggable={dragState}>
                <NodeText css={{ flexGrow: 1 }}>Item {item.id}</NodeText>
                {item.isDraft && <NodeTag>Draft</NodeTag>}
                <NodeTag>Item</NodeTag>
              </ItemContent>
              {instruction ? <DropIndicator instruction={instruction} /> : null}
            </Item>
          )}
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
