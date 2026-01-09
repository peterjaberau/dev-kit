import { chakra, mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { useTreeContext, useNodePropsContext } from "../../providers"

export const Item = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

export const ItemIndicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemIndicatorProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

export const ItemText = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})
