import React, { forwardRef, useState } from "react"
import { Collapsible } from "@chakra-ui/react"

export const Branch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props

  return (
    <Collapsible.Root
      data-scope="json-tree"
      data-part="branch"
      css={{

        borderRadius: "md",
        '&:has([data-part="branch-trigger"]:hover)': {
          boxShadow: 'sm',
        },

        '& [data-part="branch-trigger"]:is(:hover, :focus-visible)': {
          bg: 'bg.subtle',
        },
        '& [data-part="branch-trigger"]:is(:hover, :focus-visible) + [data-part="branch-content"]': {
          bg: 'bg.subtle',
        },

      }}
      defaultOpen={false}
      unstyled
      ref={ref}
      {...rest}
    >
      {children}
    </Collapsible.Root>
  )
})
