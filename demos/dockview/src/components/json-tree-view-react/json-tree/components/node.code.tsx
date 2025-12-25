import React, { forwardRef } from "react"
import { chakra, Code } from "@chakra-ui/react"

export const JsonTreeNodeCode = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Code {...props} ref={ref} />
})
