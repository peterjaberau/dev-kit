import React, { forwardRef } from "react"
import { Code } from "@chakra-ui/react"

export const NodeCode = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Code {...props} ref={ref} />
})
