import React, { forwardRef } from "react"
import { Text } from "@chakra-ui/react"

export const NodeText = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Text
      data-scope="node"
      data-part="text"
      fontWeight={"medium"}
      textAlign={"start"}
      fontSize={"15px"}
      css={{
        overflow: "hidden",
        textAlign: "left",
        verticalAlign: "middle",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      {...props}
      ref={ref}
    />
  )
})
