import React, { forwardRef } from "react"
import { Stack, Collapsible } from "@chakra-ui/react"

export const BranchContent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <Collapsible.Content
      data-scope="json-tree"
      data-part="branch-content"
      css={{
        bg: "bg.panel",
        borderRadius: "md",
        pb: 2,
        px: 2,
      }}
      _open={{
        borderTopRadius: "none",
      }}
      ref={ref}
      {...props}
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
    </Collapsible.Content>
  )
})
