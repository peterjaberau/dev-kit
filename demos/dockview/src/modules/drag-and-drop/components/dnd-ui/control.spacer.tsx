import React, { forwardRef } from "react"
import { chakra, Badge, Box, HStack } from "@chakra-ui/react"

export const ControlSpacer = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {

  return (
    <HStack
      data-scope="control"
      data-part="spacer"
      // gridArea="spacer"
      css={{
        height: "full",
        gridArea: "spacer",
        backgroundColor: "yellow",
      }}
      {...props}
      ref={ref}
    />
  )
})
