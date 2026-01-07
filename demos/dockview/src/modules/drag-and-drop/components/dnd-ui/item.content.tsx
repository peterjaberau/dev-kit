import React, { forwardRef } from "react"
import { chakra, Collapsible, HStack, Stack, useCollapsible } from "@chakra-ui/react"

export const ItemContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <HStack
      data-scope="item"
      data-part="content"
      css={{
        '&[data-draggable="dragging"]': {
          opacity: 0.4,
        },
        w: "full",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 1,
        gap: 0,
      }}
      {...props}
      ref={ref}
    />
  )
})
