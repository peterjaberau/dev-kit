import { forwardRef, Fragment, memo, useRef } from "react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { useMenuManager } from "#adaptive-menu/use-menu-manager"
import { useDndNode } from "../dnd/use-dnd-node"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
import { chakra, HStack } from "@chakra-ui/react"
import { GroupDropIndicator } from "../dnd/drop-indicator/group"
import { NodeText } from "./node.text"
import { NodeTag } from "./node.tag"
import { Node } from "./node"

import { Control } from "./control"
import { ControlTrigger } from "./control.trigger"
import { ControlTriggerIndicator } from "./control.trigger-indicator"
import { ControlContent } from "./control.content"
import { NodeList } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui/node-list"

const indentPerLevel = 4

export const NodeTopLevel = memo((props: any) => {
  const { itemRef, level, index } = props

  const {
    dataValue: item,
    menuItemChildrenRef,
    dataName,
    menuItemChildrenIds,
    isBranch,
    isBranchEmpty,
    isBranchNotEmpty,
    isLeaf,
    isBranchData,
    isBranchNotEmptyData,
    isBranchEmptyData,
    isLeafData,
    sendToMenuItem,
    isTopLevel,
    isRootNode,
    isOpen,
  } = useMenuItem({ actorRef: itemRef })

  const hasChildren = !!item?.children

  const { dependencies } = useMenuManager()
  const { DropIndicator } = dependencies

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => {
        isTopLevel
      },
    },
    dropTarget: {
      getData: () => isTopLevel === true,
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => source.data?.isTopLevel === isTopLevel,
    },
  })

  return (
    <>
      <Control
        // onExpandedChange={() => sendToMenuItem({ type: 'toggle' })}
        itemRef={itemRef}
        dropIndicator={dropIndicator}
        data-index={index}
        data-level={level}
        ref={dropTargetRef}
      >
        <ControlTrigger
          ref={draggableButtonRef}
          data-draggable={state}
          itemRef={itemRef}
          isDragging={state === "dragging"}
          hasDragIndicator
        >
          <HStack alignItems="center" w="full" gap={0}>
            <ControlTriggerIndicator itemRef={itemRef} />
            <NodeText css={{ flexGrow: 1 }}>{dataName}</NodeText>
            <NodeTag>{item.id}</NodeTag>
            <NodeTag>{isBranchData ? "Branch" : "Leaf"}</NodeTag>
          </HStack>
        </ControlTrigger>
        <ControlContent>
          {menuItemChildrenIds?.map((child: any, i: number) => {
            return <NodeList key={child} itemRef={menuItemChildrenRef[child]} level={level + 1} index={i} />
          })}
        </ControlContent>
        {/*{instruction ? <DropIndicator instruction={instruction} /> : null}*/}
      </Control>
      {dragPreview}
    </>
  )
})
