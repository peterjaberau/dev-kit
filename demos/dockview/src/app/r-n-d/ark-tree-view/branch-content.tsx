import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from './helpers/utils/create-split-props'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './hooks/use-tree-view-context'
import { useTreeViewNodePropsContext } from './hooks/use-tree-view-node-props-context'

interface VisibilityProps {
  hidden?: boolean | undefined
  'data-state'?: string | undefined
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const TreeViewBranchContent = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const contentProps = treeView.getBranchContentProps(nodeProps)

  const [, branchContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])
  const mergedProps = mergeProps(branchContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
