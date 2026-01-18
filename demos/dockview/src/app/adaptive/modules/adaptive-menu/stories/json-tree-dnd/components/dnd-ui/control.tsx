import React, { forwardRef } from "react"
import { Collapsible, Stack, useCollapsible, mergeRefs } from "@chakra-ui/react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"

export const Control = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props
  const { isOpen } = useMenuItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return (
    <Stack data-scope="control" data-part="control" gap={0} ref={ref} {...rest}>
      <Collapsible.RootProvider value={collapsible}>{children}</Collapsible.RootProvider>
    </Stack>
  )
})
