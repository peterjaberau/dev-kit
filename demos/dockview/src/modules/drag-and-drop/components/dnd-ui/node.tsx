import { forwardRef, Fragment, memo, useRef } from "react"
import { useTree, useTreeItem } from "../../selectors"
import { useDndNode } from "../dnd/use-dnd-node"
import { chakra, HStack } from "@chakra-ui/react"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"

import { Control  } from "./control"
import { ControlTrigger } from "./control.trigger"
import { ControlTriggerIndicator } from "./control.trigger-indicator"


const indentPerLevel = 4

export const Node = memo(
  forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
    const { itemRef, level, index, ...rest } = props

    const {
      dataValue: item,
      treeItemChildrenRef,
      treeItemChildrenIds,
      isBranch,
      isBranchEmpty,
      isBranchNotEmpty,
      isLeaf,
      isBranchData,
      isBranchNotEmptyData,
      isBranchEmptyData,
      isLeafData,
      sendToTreeItem,
      isOpen,
    } = useTreeItem({ actorRef: itemRef })

    const hasChildren = !!item?.children

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

          <Control itemRef={itemRef} data-index={index} data-level={level} id={`tree-item-${item.id}`} ref={nodeRef}>
            <ControlTrigger data-draggable={dragState} itemRef={itemRef}>
              <HStack alignItems="center" w="full" gap={0}>
                <ControlTriggerIndicator itemRef={itemRef} />
                <NodeText css={{ flexGrow: 1 }}>Item {item.id}</NodeText>
                {item.isDraft && <NodeTag>Draft</NodeTag>}
                <NodeTag>{isBranchData ? "Branch" : "Leaf"}</NodeTag>
              </HStack>
            </ControlTrigger>
            {instruction ? <DropIndicator instruction={instruction} /> : null}
          </Control>
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
