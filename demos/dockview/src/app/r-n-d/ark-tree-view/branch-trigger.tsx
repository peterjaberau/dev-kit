import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from './hooks/use-tree-view-context'
import { useTreeViewNodePropsContext } from './hooks/use-tree-view-node-props-context'
import { chakra } from '@chakra-ui/react'

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTriggerProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
