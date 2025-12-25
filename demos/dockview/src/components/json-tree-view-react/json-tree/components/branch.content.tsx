import React, { forwardRef } from "react"
import { Stack, Collapsible } from "@chakra-ui/react"
import { useNode } from "../selectors"

export const JsonTreeBranchContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <Collapsible.Content ref={ref} {...props}>
      <Stack css={{ py: 2, px: 2, bg: "bg.panel", }} _open={{ borderTopRadius: 0 }}>
        <Stack css={{ p: 2, bg: "bg.muted", borderRadius: "md" }}>{children}</Stack>
      </Stack>
    </Collapsible.Content>
  )
})
