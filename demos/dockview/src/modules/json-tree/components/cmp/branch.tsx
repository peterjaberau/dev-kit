import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const Branch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <chakra.div
    data-scope="branch"
    data-part="branch"
    {...props} ref={ref} />
})
