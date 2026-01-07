import React, { forwardRef } from "react"
import { Collapsible, Stack, useCollapsible, mergeRefs } from "@chakra-ui/react"
import { useTreeItem } from "../../selectors"

export const Branch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props
  const { isOpen } = useTreeItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return (
    <Stack data-scope="branch" data-part="branch" ref={ref} {...rest} >
      <Collapsible.RootProvider value={collapsible}>{children}</Collapsible.RootProvider>
    </Stack>
  )
})
