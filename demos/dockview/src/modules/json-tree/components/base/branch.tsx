import React, { forwardRef, useState } from "react"
import { Collapsible } from "@chakra-ui/react"
import { useNode } from "../../selectors"

export const Branch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, children, dragState = 'idle', ...rest } = props
  const { sendToNode, isOpen } = useNode({ actorRef: nodeRef })


  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={(e: any) => sendToNode({ type: 'BRANCH_OPEN_CHANGED', isOpen: e.open })}
      data-scope="json-tree"
      data-part="branch"
      css={{
        borderRadius: "md",
        '&:has([data-part="branch-control"]:hover)': {
          boxShadow: "sm",
        },
        '& [data-part="branch-control"]:is(:hover, :focus-visible)': {
          // bg: "bg.subtle",
        },
        '& [data-part="branch-control"]:is(:hover, :focus-visible) + [data-part="branch-content"]': {
          // bg: "bg.subtle",
        },

        '& [data-part="branch-control"]:is(:hover, :focus-visible) [data-part="toolbar"]': {
          opacity: 1,
          pointerEvents: 'auto',
        },

        '&:has([data-part="branch-trigger"]:hover)': {
          boxShadow: "sm",
        },
        '& [data-part="branch-trigger"]:is(:hover, :focus-visible)': {
          // bg: "bg.subtle",
        },
        '& [data-part="branch-trigger"]:is(:hover, :focus-visible) + [data-part="branch-content"]': {
          // bg: "bg.subtle",
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
