import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useTreeViewNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"


export const TreeViewItemIndicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemIndicatorProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'
