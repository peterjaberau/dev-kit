import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from './utils/create-split-props'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'


const splitVisibilityProps = createSplitProps()

export const TreeViewBranchContent = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const contentProps = treeView.getBranchContentProps(nodeProps)

  const [, branchContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])
  const mergedProps = mergeProps(branchContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
