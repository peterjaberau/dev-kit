import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useTreeViewContext } from './use-tree-view-context'

export const TreeViewLabel = forwardRef<HTMLHeadingElement, any>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <chakra.h3 {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'
