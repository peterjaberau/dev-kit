import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ControlContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <chakra.div
      data-scope="control"
      data-part="content"
      gridArea="content"
      css={{
      }}
      {...props}
      ref={ref}
    />
  )
})
