import { useMenuItem } from "./use-menu-item"

// const { dataTreeRef } = useTree()
// no actorRef, use the dataRef from the tree as a root node for useMenuManager
export const useMenuRoot= () => useMenuItem()