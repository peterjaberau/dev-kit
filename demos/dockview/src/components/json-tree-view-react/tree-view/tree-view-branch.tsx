import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useRenderStrategyPropsContext } from './utils/render-strategy'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodeContext } from './use-tree-view-node-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'


export const TreeViewBranch = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(treeView.getBranchProps(nodeProps), props)
  const branchContentProps = treeView.getBranchContentProps(nodeProps)

  return (
    <Collapsible.Root
      ref={ref}
      open={nodeState.expanded}
      ids={{ content: branchContentProps.id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
