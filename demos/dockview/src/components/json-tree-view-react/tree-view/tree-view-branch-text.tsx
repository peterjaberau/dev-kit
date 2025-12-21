import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'


export const TreeViewBranchText = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTextProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

TreeViewBranchText.displayName = 'TreeViewBranchText'
