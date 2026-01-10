import { NodePropsProvider, NodeStateProvider, useNodeContext, useTreeContext } from "."
import { createSplitProps } from "#adaptive/shared"

export const NodeContext = (props: any) => props.children(useNodeContext())

const splitNodeProps = createSplitProps()

export function NodeProvider(props: any) {
  const [nodeProps, localProps]: any = splitNodeProps(props, ["indexPath", "node"] as any)
  const tree: any = useTreeContext()
  const nodeState = tree.getNodeState(nodeProps)
  return (
    <NodeStateProvider value={nodeState}>
      <NodePropsProvider value={nodeProps}>{localProps.children}</NodePropsProvider>
    </NodeStateProvider>
  )
}
