import React, { forwardRef } from "react"
import { Collapsible, HStack } from "@chakra-ui/react"
import { useTreeItem } from "../../../selectors"

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  // export const BranchTrigger = forwardRef<HTMLDivElement, any>((props, ref) => {

  const { itemRef, children, ...rest } = props

  const { sendToTreeItem, isOpen } = useTreeItem({ actorRef: itemRef })


  const handleClick = (e: any) => {
    sendToTreeItem({ type: "toggle", open: !isOpen })
  }

  return (
    <HStack
      data-scope="branch"
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

