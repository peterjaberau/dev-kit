import React, { forwardRef } from "react"
import { Badge, Box } from "@chakra-ui/react"

// additionalGap for toggleSize

export const NodeIndent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  // const { level = 0, indentPerLevel = 2, additionalGap = 5, ...rest } = props

  return (
    <Box
      data-scope="node"
      data-part="indent"

      // width={level * indentPerLevel + additionalGap}
      backgroundColor={"red"}
      {...props}
      ref={ref}
    />
  )
})
