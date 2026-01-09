import { mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"
import { useTreeContext } from "../providers"

export const Tree = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

