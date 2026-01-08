import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useRenderStrategyPropsContext } from './helpers/utils/render-strategy'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './context'
import { useTreeViewNodeContext } from './context'
import { useTreeViewNodePropsContext } from './context'

import { TreeViewBranchBaseProps, TreeViewBranchProps } from '@ark-ui/react'


export const Branch = forwardRef<HTMLDivElement, TreeViewBranchProps>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState: any = useTreeViewNodeContext()
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
