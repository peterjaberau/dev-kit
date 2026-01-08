import React, { forwardRef } from "react"
import { chakra, Badge, Box } from "@chakra-ui/react"

export const ControlSpacer = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {

  return (
    <chakra.div
      data-scope="control"
      data-part="spacer"
      gridArea="spacer"
      css={{
        gridArea: "spacer",
        backgroundColor: "yellow",
      }}
      {...props}
      ref={ref}
    />
  )
})
