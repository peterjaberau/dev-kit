import React, { forwardRef } from "react"
import { HStack } from "@chakra-ui/react"

export const Toolbar = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      data-scope="json-tree"
      data-part="toolbar"
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      css={{
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.15s ease",
      }}
      {...props}
    />
  )
})
