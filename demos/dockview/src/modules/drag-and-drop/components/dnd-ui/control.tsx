import React, { forwardRef, useState } from "react"
import { Collapsible, Stack, useCollapsible, Grid, GridItem, chakra, HStack } from "@chakra-ui/react"
import { useTreeItem } from "../../selectors"

const intendPerLevel = 2
const toggleWidth = 1

const RenderControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, level, css, children, ...rest } = props
  const {
    sendToTreeItem,
    isOpen,
    isLeaf,
    isBranchEmpty,
    isBranchNotEmpty,

    isBranchData,
    isBranchNotEmptyData,
    isBranchEmptyData,
    isLeafData,
  } = useTreeItem({
    actorRef: itemRef,
  })

  const handleClick = () => {
    sendToTreeItem({ type: "toggle", open: !isOpen })
  }

  return (
    <HStack
      data-scope="control"
      data-part="control"
      css={{
        ...css,

        alignItems: "center",
        justifyContent: "flex-start",
        '&[data-draggable="dragging"]': { opacity: 0.4 },
        height: 8,
      }}
      ref={ref}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </HStack>
  )
})

export const Control = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, css, ...rest } = props
  const { isOpen } = useTreeItem({ actorRef: itemRef })

  const collapsible = useCollapsible({
    open: isOpen,
    onOpenChange: (e) => {},
  })

  return (
    <Collapsible.RootProvider value={collapsible}>
      <RenderControl css={{ ...css }} ref={ref} itemRef={itemRef} {...rest}>
        {children}
      </RenderControl>
    </Collapsible.RootProvider>
  )
})
