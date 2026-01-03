import React, { forwardRef, useState } from "react"
import { Collapsible, Stack, useCollapsible } from "@chakra-ui/react"
import { useNode } from "../../selectors"

export const Branch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, children, dragState = "idle", ...rest } = props
  const { sendToNode, isOpen } = useNode({ actorRef: nodeRef })
  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {
      // if (dragState !== "idle") return

      // sendToNode({
      //   type: "BRANCH_OPEN_CHANGED",
      //   isOpen: e.open,
      // })
    },
  })



  return (
    <Stack
      // open={isOpen}
      // onOpenChange={(e: any) => sendToNode({ type: "BRANCH_OPEN_CHANGED", isOpen: e.open })}
      data-scope="json-tree"
      data-part="branch"
      css={{
        borderRadius: "md",
        bg: "bg.panel",
        gap: 0,

        // hover + drag state = idle
        '&[data-hovered="true"][data-drag-state="idle"]': {
          cursor: "pointer",
          bg: "bg.info",
          boxShadow: "md",
        },

        // '&:has([data-part="branch-control"]:hover)': {
        // boxShadow: "sm",
        // backgroundColor: 'bg.panel'
        // },
        '&:has([data-part="branch-control"]:is(:hover, :focus-visible)), \
         &:has([data-part="branch-control"]:is(:hover, :focus-visible) + [data-part="branch-content"])': {
          // boxShadow: "sm",
        },
        '& [data-part="branch-control"]:is(:hover, :focus-visible)': {
          // bg: "bg.subtle",
        },
        '& [data-part="branch-control"]:is(:hover, :focus-visible) + [data-part="branch-content"]': {
          // bg: "bg.subtle",
        },

        '& [data-part="branch-control"]:is(:hover, :focus-visible) [data-part="toolbar"]': {
          opacity: 1,
          pointerEvents: "auto",
        },

        '&:has([data-part="branch-trigger"]:hover)': {
          // boxShadow: "sm",
        },
        '& [data-part="branch-trigger"]:is(:hover, :focus-visible)': {
          // bg: "bg.subtle",
        },
        '& [data-part="branch-trigger"]:is(:hover, :focus-visible) + [data-part="branch-content"]': {
          // bg: "bg.subtle",
        },
      }}
      // defaultOpen={false}
      // unstyled
      ref={ref}
      {...rest}
    >
      <Collapsible.RootProvider value={collapsible}>
        {children}
      </Collapsible.RootProvider>
    </Stack>
  )
})

