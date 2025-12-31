import React, { forwardRef } from "react"
import { HStack } from "@chakra-ui/react"

export const BranchControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack

      data-scope="json-tree"
      data-part="branch-control"
      css={{
        borderRadius: "md",
        // bg: "bg.panel",
        userSelect: "none",
        cursor: "pointer",
        px: 3,
        _open: {
        borderBottomRadius: "none",
        pt: 2,
        // pb: 0,
      }
      }}

      _closed={{ borderRadius: "md", py: 2 }}
      justifyContent="flex-start"
      alignItems={"center"}
      flex={1}
      {...props}
      ref={ref}
    />
  )
})
