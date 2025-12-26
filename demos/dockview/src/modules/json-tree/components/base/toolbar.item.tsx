import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

// will be used as a wrapper for toolbar custom and builtin items (eg. delete, create, copy...)
export const ToolbarItem = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="json-tree"
    data-part="toolbar-item"
    {...props} ref={ref} />
})
