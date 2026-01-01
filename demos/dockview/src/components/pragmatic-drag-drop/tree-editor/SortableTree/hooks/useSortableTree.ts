import { useMemoizedFn } from "ahooks"
import { useMemo } from "react"

import { dataFlattenSelector, useStoreApi } from "../store"
import { PublicSortableTreeStore } from "../store/store"
import { FlattenNode, TreeData, UniqueIdentifier } from "../types"

/**
 * SortableTree instance object
 * @template T-node data type
 */
export interface SortableTreeInstance<T = any> extends PublicSortableTreeStore {
  /**
   * Obtain the ID of the currently active node
   * @returns The ID of the currently active node
   */
  getActiveId: () => UniqueIdentifier
  /**
   * Gets an array of IDs for the currently selected node
   * @returns The ID array of the currently selected node
   */
  getSelectedIds: () => UniqueIdentifier[]
  /**
   * Get data for the current tree
   * @returns Data from the current tree
   */
  getTreeData: () => TreeData<T>
  /**
   * Get flat data for the current tree
   * @returns Flattened data for the current tree
   */
  getFlattenData: () => FlattenNode<T>[]
}

export const useSortableTree = <T>(): SortableTreeInstance<T> => {
  const storeApi = useStoreApi()

  const {
    // crud
    dispatchTreeData,
    removeNode,
    addNode,
    toggleNode,
    updateNodeContent,
    toggleExtraVisible,
    // selection
    deselectedAll,
    selectedNode,
  } = storeApi.getState()

  const getActiveId = useMemoizedFn(() => storeApi.getState().activeId)
  const getTreeData = useMemoizedFn(() => storeApi.getState().treeData)
  const getFlattenData = useMemoizedFn(() => dataFlattenSelector(storeApi.getState()))
  const getSelectedIds = useMemoizedFn(() => storeApi.getState().selectedIds)

  return useMemo(
    () => ({
      dispatchTreeData,
      toggleExtraVisible,
      removeNode,
      deselectedAll,
      addNode,
      selectedNode,
      toggleNode,
      updateNodeContent,
      getActiveId,
      getTreeData,
      getFlattenData,
      getSelectedIds,
    } as any),
    [],
  )
}
