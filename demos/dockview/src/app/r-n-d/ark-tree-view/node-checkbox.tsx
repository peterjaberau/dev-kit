import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useTreeViewNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"

export const NodeCheckbox = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeCheckboxProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

NodeCheckbox.displayName = 'TreeViewNodeCheckbox'
