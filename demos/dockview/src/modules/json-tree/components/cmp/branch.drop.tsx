import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const BranchDrop = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="branch"
    data-part="drop"
    {...props} ref={ref} />
})
