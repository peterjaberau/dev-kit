import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ToolbarItemText = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="json-tree"
    data-part="toolbar-item-text"
    {...props} ref={ref} />
})
