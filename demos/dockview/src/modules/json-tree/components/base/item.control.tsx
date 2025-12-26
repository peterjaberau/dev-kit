import React, { forwardRef } from "react"
import { HStack } from "@chakra-ui/react"

export const ItemControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      css={{
        borderRadius: "md",
        userSelect: "none",
        cursor: "pointer",
        py: 2,
        px: 3,
      }}
      justifyContent="flex-start"
      alignItems={"center"}
      flex={1}
      {...props}
      ref={ref}
    />
  )
})
