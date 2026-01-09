import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"

export const NodeCheckbox = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeCheckboxProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

NodeCheckbox.displayName = 'NodeCheckbox'
