import { useSelector } from "@xstate/react"
import { useMenuManager } from "./use-menu-manager"

const indentPerLevel = 2
const toggleWidth = 4

export const useMenuItem = ({ actorRef = null }: any = {}) => {
  // const { dataTreeRef } = useTree()
  // no actorRef, use the dataRef from the tree as a root node for useMenuManager
  const menuItemRef = actorRef ?? useMenuManager().dataRef

  const menuItemState: any = useSelector(menuItemRef, (state) => state)
  const sendToMenuItem = menuItemRef?.send
  const menuItemContext = menuItemState?.context

  const menuItemId = menuItemRef?.id

  const dataConfig = menuItemContext?.dataConfig
  const dataName = dataConfig?.name || "_TREE_ITEM_"
  const dataValue = dataConfig?.value

  const refs = menuItemContext?.refs
  const parentRef = refs?.parent
  const childItemsRef = refs?.childItems || []

  const menuItemChildrenRef = menuItemState?.children
  const menuItemChildrenIds = Object.keys(menuItemChildrenRef || {})
  const menuItemChildrenLength = menuItemChildrenIds.length

  //view
  const viewConfig = menuItemContext?.viewConfig
  const viewRuntime = menuItemContext?.viewRuntime
  const viewControlState = viewRuntime?.control || {}
  const isControlOpen = viewControlState?.open || false

  //compute
  const isBranch = !!menuItemChildrenIds
  const isBranchNotEmpty = isBranch && menuItemChildrenIds.length > 0
  const isBranchEmpty = isBranch && menuItemChildrenIds.length === 0
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
    menuItemRef,
    menuItemId,
    sendToMenuItem,
    menuItemState,
    menuItemContext,

    dataConfig,
    dataName,
    dataValue,

    parentRef,
    childItemsRef,
    menuItemChildrenRef,
    menuItemChildrenIds,
    menuItemChildrenLength,

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
