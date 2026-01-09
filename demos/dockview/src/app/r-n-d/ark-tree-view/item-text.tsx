import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"


export const ItemText = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

ItemText.displayName = 'ItemText'
