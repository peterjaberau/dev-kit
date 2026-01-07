import React, { forwardRef } from "react"
import { chakra, Collapsible, HStack, Stack, useCollapsible } from "@chakra-ui/react"

export const Item = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Stack data-scope="item" data-part="item" css={{ gap: 0}} {...props} ref={ref} />
})
