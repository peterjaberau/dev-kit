import React, { forwardRef } from "react"
import { Stack, Collapsible, Box } from "@chakra-ui/react"

export const BranchContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <Collapsible.Content data-scope="json-tree" data-part="branch-content" ref={ref} {...props}>
      <Stack
        css={{
          borderRadius: "md",
          '&:not([data-open="closed"])': {
            borderTopRadius: "none",
          },
          pb: 2,
          px: 2,
        }}
      >
        <Stack
          css={{
            p: 2,
            bg: "bg.muted",
            borderRadius: "md",
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Collapsible.Content>
  )
})
