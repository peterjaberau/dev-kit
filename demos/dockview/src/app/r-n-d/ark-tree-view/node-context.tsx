import { useTreeViewNodeContext } from './hooks/use-tree-view-node-context'

export const NodeContext = (props: any) => props.children(useTreeViewNodeContext())
