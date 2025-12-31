import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const Item = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <chakra.div
      data-scope="json-tree"
      data-part="item"
      css={{
        backgroundColor: "bg.panel",
        borderRadius: "md",
        _hover: {
          boxShadow: "sm",
          backgroundColor: "bg.info",
        }
      }}
      {...props} ref={ref} />
  )
})
