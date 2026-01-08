import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useTreeViewContext } from "./context"
import { useTreeViewNodePropsContext } from "./context"
import { chakra } from "@chakra-ui/react"

export const TreeViewBranchControl = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchControlProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

TreeViewBranchControl.displayName = "TreeViewBranchControl"
