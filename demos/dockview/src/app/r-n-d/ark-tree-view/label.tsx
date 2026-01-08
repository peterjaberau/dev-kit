import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from './context'
import { chakra } from '@chakra-ui/react'

export const Label = forwardRef<HTMLHeadingElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <chakra.h3 {...mergedProps} ref={ref} />
})

Label.displayName = 'TreeViewLabel'
