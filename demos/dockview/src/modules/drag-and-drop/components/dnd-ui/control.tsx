import React, { forwardRef, useState } from "react"
import { Collapsible, Stack, useCollapsible, Grid, GridItem, chakra } from "@chakra-ui/react"
import { useTreeItem } from "../../selectors"

const ControlTriggerProvider = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, css, ...rest } = props
  const { isOpen } = useTreeItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return <Collapsible.RootProvider value={collapsible} ref={ref}>{children}</Collapsible.RootProvider>
})

const ControlTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props
  const { sendToTreeItem, isOpen } = useTreeItem({ actorRef: itemRef })
  const handleClick = () => {
    sendToTreeItem({ type: "toggle", open: !isOpen })
  }

  return (
    <chakra.div
      ref={ref}
      onClick={handleClick}
      {...rest}
      // display="contents" // keeps grid children direct
    />
  )
})

const ControlWrapper = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { css, ...rest } = props
  return (
    <Grid
      data-scope="control"
      data-part="root"
      templateColumns="1rem 1rem 1fr"
      templateAreas="'spacer toggle content'"
      css={{
        '&[data-draggable="dragging"]': { opacity: 0.4 },
        ...css,
      }}
      // defaultOpen={false}
      // unstyled
      ref={ref}
      {...rest}
    />
  )
})

export const Control = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const dataChildren = props["data-children"]

  if (!dataChildren) {
    return <ControlWrapper {...props} ref={ref} />
  }

  const { itemRef, children, css, ...rest } = props
  const { isOpen } = useTreeItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return (
    <ControlWrapper {...rest} ref={ref} css={{ ...css }}>
      <ControlTriggerProvider itemRef={itemRef}>
        <ControlTrigger></ControlTrigger>
      </ControlTriggerProvider>
    </ControlWrapper>
  )
})
