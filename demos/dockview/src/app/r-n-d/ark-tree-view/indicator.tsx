import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"


export const ItemIndicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemIndicatorProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

ItemIndicator.displayName = 'ItemIndicator'
