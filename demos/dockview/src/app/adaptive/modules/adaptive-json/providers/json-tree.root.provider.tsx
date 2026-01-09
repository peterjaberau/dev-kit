import { forwardRef } from "react"
import { AdaptiveTree } from "#adaptive-tree"

export const JsonTreeRootProvider = forwardRef<HTMLDivElement, any>((props, ref) => {
  return <AdaptiveTree.RootProvider data-scope="json-tree-view" {...props} ref={ref} />
})
