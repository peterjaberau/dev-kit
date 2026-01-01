import { useMemoizedFn } from "ahooks"
import { useStoreApi } from "../store"
import { UniqueIdentifier } from "../type"
/**

 * SortableList instance

 * @template T: Node data type

 */
export interface SortableListInstance {
  /**

   * Get the ID of the currently active node

   * @returns: The ID of the currently active node

   */
  getActiveId: () => UniqueIdentifier

  /**

   * Get the ID by index

   * @param index

   * @returns

   */
  getIdByIndex: (index: number) => UniqueIdentifier

  /**

   * Get the data of the current list

   * @returns: The data of the current list

   */
  getValue: () => any[]

  /**

   * Add an item

   * @param item: The data

   * @param index: The list index

   * @returns

   */
  addItem: (item?: any, index?: number) => void

  /**

   * Remove an item

   * @param index: The list index

   * @returns

   */
  removeItem: (index: number) => void

  /**
   * Update item

   * @param item Update data

   * @param index List index

   * @returns

   */
  updateItem: (item: any, index: number) => void
}
export const useSortableList = (): SortableListInstance => {
  const storeApi = useStoreApi()

  const getActiveId = useMemoizedFn(() => storeApi.getState().activeId)
  const getIdByIndex = useMemoizedFn((index?: number | any) => {
    const { keyManager }: any = storeApi.getState()
    const indexId: any = keyManager[index] || null
    return indexId
  })
  const getValue: any = useMemoizedFn(() => storeApi.getState().value)
  const addItem = (item?: any, index?: number) => storeApi.getState().dispatchListData({ type: "addItem", item, index })
  const removeItem = (index: number) => storeApi.getState().dispatchListData({ type: "removeItem", index })
  const updateItem = (item: Partial<any>, index: number) =>
    storeApi.getState().dispatchListData({ type: "updateItem", item, index })

  return {
    getActiveId,
    getValue,
    addItem,
    removeItem,
    getIdByIndex,
    updateItem,
  }
}
