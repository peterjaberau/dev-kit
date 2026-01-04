import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const Tree = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div {...props} ref={ref} />
})
