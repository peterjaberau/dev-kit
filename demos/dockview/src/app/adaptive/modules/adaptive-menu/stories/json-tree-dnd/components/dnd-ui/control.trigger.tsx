import React, { forwardRef, useId, useRef } from "react"
import { chakra, Collapsible, useCollapsibleContext, HStack } from "@chakra-ui/react"
import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { ControlItem } from "./control.item"

export const ControlTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, onClick, children, visualContentRef, isDragging, hasDragIndicator, dropIndicator, ...rest }: any =
    props
  const id = useId()

  const { sendToMenuItem, isOpen } = useMenuItem({ actorRef: itemRef })

  const collapsible = useCollapsibleContext()
  const { open, setOpen, disabled } = collapsible
  const rootDivRef = useRef<HTMLDivElement>(null)

  // const handleClick = (e: any) => {
  // onClick?.(e)
  // if (disabled) return
  //
  // if (typeof openOverride === "boolean") {
  //   setOpen(openOverride)
  //   return
  // }

  // collapsible.setOpen( !isOpen )
  // sendToMenuItem({ type: "toggle", open: !isOpen })

  // }

  const handleClick = (e: any) => {
    onClick?.(e)
    if (disabled) return

    // ✅ EXPLICIT VALUE WINS
    if (isOpen !== undefined) {
      setOpen(isOpen)
      return
    }

    // ✅ DEFAULT: toggle
    setOpen(!open)
  }

  return (
    <chakra.div
      ref={rootDivRef}
      data-scope="control"
      data-part="trigger"
      gap={0}
      css={{
        '&[data-draggable="dragging"]': {
          opacity: 0.4,
        },
        height: "2rem",
        w: "full",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ControlItem
        id={id}
        onClick={handleClick}
        ref={ref}
        visualContentRef={visualContentRef}
        isDragging={isDragging}
        hasDragIndicator={hasDragIndicator}
        dropIndicator={dropIndicator}
        {...props}
      >
        {children}
      </ControlItem>
    </chakra.div>
  )
})
