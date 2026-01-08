import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useTreeViewContext } from "./hooks/use-tree-view-context"
import { chakra } from "@chakra-ui/react"

export const Tree = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

Tree.displayName = "TreeViewTree"
