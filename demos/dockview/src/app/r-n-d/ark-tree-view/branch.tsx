import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useRenderStrategyPropsContext } from './helpers/utils/render-strategy'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './hooks/use-tree-view-context'
import { useTreeViewNodeContext } from './hooks/use-tree-view-node-context'
import { useTreeViewNodePropsContext } from './hooks/use-tree-view-node-props-context'

import { TreeViewBranchBaseProps, TreeViewBranchProps } from '@ark-ui/react'


export const Branch = forwardRef<HTMLDivElement, TreeViewBranchProps>((props, ref) => {
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

Branch.displayName = 'TreeViewBranch'
