import { useSelector } from "@xstate/react"
import { useTree } from "./tree.selector"

const indentPerLevel = 2
const toggleWidth = 4

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

  const refs = treeItemContext?.refs
  const parentRef = refs?.parent
  const childItemsRef = refs?.childItems || []

  const treeItemChildrenRef = treeItemState?.children
  const treeItemChildrenIds = Object.keys(treeItemChildrenRef || {})
  const treeItemChildrenLength = treeItemChildrenIds.length

  //view
  const viewConfig = treeItemContext?.viewConfig
  const viewRuntime = treeItemContext?.viewRuntime
  const viewControlState = viewRuntime?.control || {}
  const isControlOpen = viewControlState?.open || false

  //compute
  const isBranch = !!treeItemChildrenIds
  const isBranchNotEmpty = isBranch && treeItemChildrenIds.length > 0
  const isBranchEmpty = isBranch && treeItemChildrenIds.length === 0
  const isLeaf = !isBranch

  //addhoc
  const isBranchData = !!dataValue?.children
  const isBranchNotEmptyData = isBranchData && dataValue?.children.length > 0
  const isBranchEmptyData = isBranchData && dataValue?.children.length === 0
  const isLeafData = !isBranchData


  const getIndentStrategy = (level: number) => {

    if (isBranchNotEmpty) {
      return {
        toggleVisibility: true,
        toggleWidth: false,
        spacer: level * indentPerLevel,
        templateColumns: `${indentPerLevel}rem: ${toggleWidth}rem auto`,
      }
    } else if (isBranchEmpty) {
      return {
        toggleVisibility: false,
        toggleWidth: false,
        spacer: level * indentPerLevel,
      }
    } else {
      //leaf
      return {
        toggleVisibility: false,
        toggleWidth: true,
        spacer: level * indentPerLevel + indentPerLevel / 2,
      }
    }

  }


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

    parentRef,
    childItemsRef,
    treeItemChildrenRef,
    treeItemChildrenIds,
    treeItemChildrenLength,

    //view
    viewConfig,
    viewRuntime,
    viewControlState,
    isControlOpen,

    //compute
    isBranch,
    isBranchNotEmpty,
    isBranchEmpty,
    isLeaf,
    getIndentStrategy,

    isBranchData,
    isBranchNotEmptyData,
    isBranchEmptyData,
    isLeafData,

    //misc
    isOpen,
  }
}