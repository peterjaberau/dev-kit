import React, { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ControlContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      data-scope="control"
      data-part="content"
      // gridArea="content"
      css={{
        display: 'flex',
        alignItems: 'center',

      }}
      {...props}
      ref={ref}
    />
  )
})
