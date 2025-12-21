import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useTreeViewContext } from './use-tree-view-context'


export const TreeViewTree = forwardRef((props: any, ref: any) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

TreeViewTree.displayName = 'TreeViewTree'
