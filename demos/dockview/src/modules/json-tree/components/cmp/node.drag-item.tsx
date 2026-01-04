import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const NodeDragItem = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="node"
    data-part="drag-item"
    {...props} ref={ref} />
})
