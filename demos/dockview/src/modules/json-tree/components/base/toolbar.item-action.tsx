import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ToolbarItemAction = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="json-tree"
    data-part="toolbar-item-action"
    {...props} ref={ref} />
})
