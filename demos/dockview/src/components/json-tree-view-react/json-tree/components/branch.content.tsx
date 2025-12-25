import React, { forwardRef } from "react"
import { chakra, Collapsible } from "@chakra-ui/react"
import { useNode } from "../selectors"

export const JsonTreeBranchContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Collapsible.Content ref={ref} {...props} />
  )
})
