import { useAppRoot } from "#shared/selectors/app.root.selector"
import { useSelector } from "@xstate/react"

export const useTree = () => {
  const { appRootContext } = useAppRoot()
  const treeRef = appRootContext?.treeRef

  const treeId = treeRef?.id
  const treeState: any = useSelector(treeRef, (state) => state)
  const sendToTree = treeRef?.send
  const treeContext = treeState?.context
  // const JSONtreeSnapshot = treeState.getSnapshot().toJSON()


  /** Data Tree **/
  const dataTree = treeContext?.data
  // spawned data actors
  const dataTreeRef = treeContext?.dataRef

  /** children **/
  // spawned children actors
  const treeChildren = treeState?.children
  const treeChildrenIds = Object.keys(treeChildren || [])
  const getTreeItemById = (itemId: string) => {
    if (treeChildren) {
      return treeChildren[itemId] ?? null
    }
    return null
  }



  return {
    treeRef,
    treeId,
    sendToTree,
    treeState,
    treeContext,
    // JSONtreeSnapshot,

    dataTree,
    dataTreeRef,

    treeChildren,
    treeChildrenIds,
    getTreeItemById,
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