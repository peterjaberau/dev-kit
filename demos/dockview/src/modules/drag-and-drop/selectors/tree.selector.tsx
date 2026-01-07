import { useApp } from "./app.selector"
import { getSpawnedActor } from "../utils"
import { useSelector } from "@xstate/react"
import { CONSTANTS } from "../utils/constants"
import { useMemo } from "react"

export const useTree = () => {
  const { appRef } = useApp()
  const treeRef = getSpawnedActor(CONSTANTS.TREE, appRef)

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


  //drag related
  const uniqueContextId = useMemo(() => treeContext?.uniqueContextId, [])
  const dependencies = treeContext?.dependencies


  return {
    treeRef,
    treeId,
    sendToTree,
    treeState,
    treeContext,

    //drag dependencies
    uniqueContextId,
    dependencies,

    dataTree,
    dataTreeRef,

    treeChildren,
    treeChildrenIds,
    getTreeItemById,
  }
}
