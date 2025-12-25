import React, { forwardRef } from "react"
import { HStack } from "@chakra-ui/react"

export const JsonTreeBranchControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      css={{
        userSelect: "none",
        cursor: "pointer",
        bg: "bg.panel",

        px: 3,
      }}
      _open={{
        borderTopRadius: "md",
        borderBottomRadius: "none",
        pt: 2,
        pb: 0,
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
