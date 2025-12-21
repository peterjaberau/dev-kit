import { useTreeViewNodeContext } from './use-tree-view-node-context'

export const TreeViewNodeContext = (props: any) => props.children(useTreeViewNodeContext())
