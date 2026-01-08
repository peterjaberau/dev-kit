import type { NodeProps } from '@zag-js/tree-view'
import { createSplitProps } from './helpers/utils/create-split-props'
import { useTreeViewContext } from './context'
import { TreeViewNodeStateProvider } from "./context"
import { TreeViewNodePropsProvider } from "./context"


const splitNodeProps = createSplitProps<NodeProps>()

export function NodeProvider(props: any) {
  const [nodeProps, localProps] = splitNodeProps(props, ['indexPath', 'node'])
  const treeView: any = useTreeViewContext()
  const nodeState = treeView.getNodeState(nodeProps)
  return (
    <TreeViewNodeStateProvider value={nodeState}>
      <TreeViewNodePropsProvider value={nodeProps}>{localProps.children}</TreeViewNodePropsProvider>
    </TreeViewNodeStateProvider>
  )
}
