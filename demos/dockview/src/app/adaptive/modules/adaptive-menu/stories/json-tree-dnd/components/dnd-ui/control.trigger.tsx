import React, { forwardRef } from "react"
import { Collapsible, HStack } from "@chakra-ui/react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"


export const ControlTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  // export const BranchTrigger = forwardRef<HTMLDivElement, any>((props, ref) => {

  const { itemRef, children, ...rest } = props

  const { sendToMenuItem, isOpen } = useMenuItem({ actorRef: itemRef })


  const handleClick = (e: any) => {
    sendToMenuItem({ type: "toggle", open: !isOpen })
  }

  return (
    <HStack
      data-scope="control"
      data-part="trigger"
      onClick={handleClick}
      gap={0}
      {...props}
      css={{
        '&[data-draggable="dragging"]': {
          opacity: 0.4,
        },
        height: "2rem",
        w: "full",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      ref={ref}
    />
  )
})

