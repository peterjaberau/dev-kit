import React, { forwardRef } from "react"
import { Collapsible } from "@chakra-ui/react"

export const JsonTreeBranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Collapsible.Trigger {...props} ref={ref} />
})
