import isEqual from "fast-deep-equal"
import { StateCreator } from "zustand/vanilla"

import { TreeData, TreeNode, UniqueIdentifier } from "../../types"
import { InternalSortableTreeStore } from "../store"
import { TreeDataDispatchPayload, treeDataReducer } from "../treeDataReducer"

export interface TreeDataPublicAction {
  dispatchTreeData: (payload: TreeDataDispatchPayload) => void
  /**
   * Add nodes to the specified location
   * @param node to add
   * @param index to add to the position, defaults to the end
   */
  addNode: (node: TreeNode, index?: number) => void
  /**
   * Remove the node with the specified ID
   * @param ID The node ID to be removed
   */
  removeNode: (id: UniqueIdentifier) => void
  /**
   * Updates the contents of the specified ID node
   * @param ID The node ID to be updated
   * New content in the @param content node
   */
  updateNodeContent: (id: UniqueIdentifier, content: any) => void
  /**
   * Toggles the EXTRA display status of the specified ID node
   * @param ID The node ID to switch
   */
  toggleExtraVisible: (id: UniqueIdentifier) => void
}

export interface TreeDataSliceAction extends TreeDataPublicAction {
  internalUpdateTreeData: (treeData: TreeData, payload: TreeDataDispatchPayload) => void
}

export const crudSlice: StateCreator<
  InternalSortableTreeStore,
  [["zustand/devtools", never]],
  [],
  TreeDataSliceAction
> = (set, get) => ({
  internalUpdateTreeData: (treeData, payload) => {
    const { onTreeDataChange, treeData: prevTreeData } = get()

    if (isEqual(treeData, prevTreeData)) return

    set({ treeData })

    onTreeDataChange?.(treeData, payload)
  },
  dispatchTreeData: (payload) => {
    const { internalUpdateTreeData, treeData } = get()
    const nextTreeData = treeDataReducer(treeData, payload)

    internalUpdateTreeData(nextTreeData, payload)
  },
  //@ts-ignore
  addNode: (node: TreeNode, index: number) => {
    get().dispatchTreeData({ type: "addNode", node, index })
  },
  removeNode: (id) => {
    get().dispatchTreeData({ type: "removeNode", id })
  },
  updateNodeContent: (id, content) => {
    get().dispatchTreeData({ type: "updateNodeContent", content, id })
  },
  toggleExtraVisible: (id) => {
    get().dispatchTreeData({ type: "toggleExtraVisible", id })
  },
})
