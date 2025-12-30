import React, { forwardRef, memo } from "react"
import { chakra, IconButton } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

export const TreeItemToggle = memo(
  forwardRef<HTMLButtonElement, any>(({ open, isBranch, hidden, css, ...props }, forwardedRef) => {
    return (
      <IconButton
        ref={forwardedRef}
        aria-expanded={open}
        variant="ghost"
        size={"xs"}
        css={{
          ...(open && {
            transform: "rotate(90deg)",
            transition: "transform 0.2s",
          }),
          ...(hidden ? { display: "none" } : !isBranch ? { visibility: "hidden" } : {}),
          ...css,
        }}
        tabIndex={-1}
        {...props}
      >
        <LuChevronRight />
      </IconButton>
    )
  }),
)
