import type { NodeProps } from '@zag-js/tree-view'
import { createSplitProps } from './helpers/utils/create-split-props'
import { useTreeViewContext } from './context'
import { NodeStateProvider } from "./context"
import { NodePropsProvider } from "./context"


const splitNodeProps = createSplitProps<NodeProps>()

export function NodeProvider(props: any) {
  const [nodeProps, localProps] = splitNodeProps(props, ['indexPath', 'node'])
  const treeView: any = useTreeViewContext()
  const nodeState = treeView.getNodeState(nodeProps)
  return (
    <NodeStateProvider value={nodeState}>
      <NodePropsProvider value={nodeProps}>{localProps.children}</NodePropsProvider>
    </NodeStateProvider>
  )
}
