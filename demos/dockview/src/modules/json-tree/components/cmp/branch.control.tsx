import React, { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const BranchControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      data-scope="branch"
      data-part="control"
      css={{
        borderRadius: "md",
        userSelect: "none",
        cursor: "pointer",
        px: 3,
        _open: {
          borderBottomRadius: "none",
          pt: 2,
        },
      }}
      _closed={{ borderRadius: "md",
        py: 2
      }}
      justifyContent="flex-start"
      alignItems={"center"}
      flex={1}
      {...props}
      ref={ref}
    />
  )
})
