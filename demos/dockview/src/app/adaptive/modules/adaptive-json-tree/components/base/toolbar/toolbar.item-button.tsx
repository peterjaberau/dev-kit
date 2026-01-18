import React, { forwardRef } from "react"
import { Button } from "@chakra-ui/react"

export const ToolbarItemButton = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Button variant='outline' size='2xs' data-scope="json-tree" data-part="toolbar-item-button" {...props} ref={ref} />
})
