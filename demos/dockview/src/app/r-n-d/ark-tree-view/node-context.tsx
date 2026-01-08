import { useTreeViewNodeContext } from './context'

export const NodeContext = (props: any) => props.children(useTreeViewNodeContext())
