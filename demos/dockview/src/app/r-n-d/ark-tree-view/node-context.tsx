import { useNodeContext } from './context'

export const NodeContext = (props: any) => props.children(useNodeContext())
