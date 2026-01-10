import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useBaseTreeContext } from "."
import { chakra } from "@chakra-ui/react"

export const Label = forwardRef<HTMLHeadingElement, any>((props, ref) => {
  const tree: any = useBaseTreeContext()
  const mergedProps = mergeProps(tree.getLabelProps(), props)

  return <chakra.h3 {...mergedProps} ref={ref} />
})
