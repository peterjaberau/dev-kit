import type { NodeProps } from '@zag-js/tree-view'
import { createSplitProps } from './helpers/utils/create-split-props'
import { useTreeViewContext } from './hooks/use-tree-view-context'
import { TreeViewNodeStateProvider } from "./hooks/use-tree-view-node-context"
import { TreeViewNodePropsProvider } from "./hooks/use-tree-view-node-props-context"


const splitNodeProps = createSplitProps<NodeProps>()

export function NodeProvider(props: any) {
  const [nodeProps, localProps] = splitNodeProps(props, ['indexPath', 'node'])
  const treeView = useTreeViewContext()
  const nodeState = treeView.getNodeState(nodeProps)
  return (
    <TreeViewNodeStateProvider value={nodeState}>
      <TreeViewNodePropsProvider value={nodeProps}>{localProps.children}</TreeViewNodePropsProvider>
    </TreeViewNodeStateProvider>
  )
}
