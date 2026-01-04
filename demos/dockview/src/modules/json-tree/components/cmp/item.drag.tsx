import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ItemDrag = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="item"
    data-part="drag"
    {...props} ref={ref} />
})
