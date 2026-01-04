import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const NodeDragBranch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="node"
    data-part="drag-branch"
    {...props} ref={ref} />
})
