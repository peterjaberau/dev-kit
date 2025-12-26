import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ToolbarItemDivider = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="json-tree"
    data-part="toolbar-item-divider"
    {...props} ref={ref} />
})
