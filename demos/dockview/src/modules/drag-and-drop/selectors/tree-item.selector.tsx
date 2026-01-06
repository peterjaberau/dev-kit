import { useSelector } from "@xstate/react"
import { useTree } from "./tree.selector"

export const useTreeItem = ({ actorRef = null } = {}) => {
  // const { dataTreeRef } = useTree()
  // no actorRef, use the dataTreeRef from the tree as a root node for tree items
  const treeItemRef = actorRef ?? useTree().dataTreeRef

  const treeItemState: any = useSelector(treeItemRef, (state) => state)
  const sendToTreeItem = treeItemRef?.send
  const treeItemContext = treeItemState?.context

  const treeItemId = treeItemRef?.id

  const dataConfig = treeItemContext?.dataConfig
  const dataName = dataConfig?.name || "_TREE_ITEM_"
  const dataValue = dataConfig?.value


  const viewConfig = treeItemContext?.viewConfig

  const refs = treeItemContext?.refs
  const parentRef = refs?.parent
  const childItemsRef = refs?.childItems || []

  const treeItemChildrenRef = treeItemState?.children
  const treeItemChildrenIds = Object.keys(treeItemChildrenRef || {})

  // misc
  const isOpen = dataValue?.isOpen || false

  return {
    treeItemRef,
    treeItemId,
    sendToTreeItem,
    treeItemState,
    treeItemContext,

    dataConfig,
    dataName,
    dataValue,

    viewConfig,

    parentRef,
    childItemsRef,
    treeItemChildrenRef,
    treeItemChildrenIds,

    //misc
    isOpen,
  }
}