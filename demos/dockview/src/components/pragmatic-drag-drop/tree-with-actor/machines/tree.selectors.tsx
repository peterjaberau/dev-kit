import { useAppRoot } from "#shared/selectors/app.root.selector"
import { useSelector } from "@xstate/react"

export const useTree = () => {
  const { appRootContext } = useAppRoot()
  const treeRef = appRootContext?.treeRef

  const treeState: any = useSelector(treeRef, (state) => state)
  const sendToTree = treeRef?.send
  const treeContext = treeState?.context

  const treeId = treeRef?.id

  const dataTree = treeContext?.data

  // spawned data actors
  const dataTreeRef = treeContext?.dataRef

  return {
    treeRef,
    treeId,
    sendToTree,
    treeState,
    treeContext,

    dataTree,
    dataTreeRef,
  }
}


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


  // spawned children actors

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

  }

}