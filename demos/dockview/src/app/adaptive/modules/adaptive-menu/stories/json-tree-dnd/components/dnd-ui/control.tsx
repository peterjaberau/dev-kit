import React, { forwardRef } from "react"
import { Collapsible, useCollapsible, chakra } from "@chakra-ui/react"
import { useControlled } from "#adaptive/shared/lib/hooks"

export const Control = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const {
    itemRef,
    children,
    isOpen: isOpenControlled,
    isDefaultOpen = false,
    onOpenChange,
    dropIndicator,
    ...rest
  } = props

  const [isOpen, setIsOpen] = useControlled(isOpenControlled, isDefaultOpen)

  const collapsible = useCollapsible({
    open: isOpen,

    onOpenChange: ({ open }) => {
      setIsOpen(open)
      onOpenChange?.(open)
    },
  })

  return (
    <Collapsible.RootProvider value={collapsible}>
      <chakra.div
        css={{
          /* Adding `position:relative` only when it's needed by the drop indicator */
          ...(dropIndicator && { position: "relative" }),
        }}
        ref={ref}
      >
        {children}
        {dropIndicator}
      </chakra.div>
    </Collapsible.RootProvider>
  )
})
