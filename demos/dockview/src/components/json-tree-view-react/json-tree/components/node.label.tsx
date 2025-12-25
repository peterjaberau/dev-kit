import React, { forwardRef } from "react"
import { Text } from "@chakra-ui/react"

export const JsonTreeNodeLabel = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Text
      css={{
        fontWeight: "light",
        fontStyle: "italic",
      }}
      textStyle={"xs"}
      {...props}
      ref={ref}
    />
  )
})
