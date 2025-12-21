import { createSplitProps } from './utils/create-split-props'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewNodeStateProvider } from './use-tree-view-node-context'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context'

const splitNodeProps = createSplitProps()

export function TreeViewNodeProvider<T>(props: any) {
  const [nodeProps, localProps] = splitNodeProps(props, ['indexPath', 'node'])
  const treeView = useTreeViewContext()
  const nodeState = treeView.getNodeState(nodeProps)
  return (
    <TreeViewNodeStateProvider value={nodeState}>
      <TreeViewNodePropsProvider value={nodeProps}>{localProps.children}</TreeViewNodePropsProvider>
    </TreeViewNodeStateProvider>
  )
}
