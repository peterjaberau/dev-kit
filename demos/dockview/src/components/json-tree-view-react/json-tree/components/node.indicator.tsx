import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const JsonTreeNodeIndicator = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div {...props} ref={ref} />
})
