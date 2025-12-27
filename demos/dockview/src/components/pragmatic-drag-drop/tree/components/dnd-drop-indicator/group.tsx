import { forwardRef, type ReactNode } from "react"

import { chakra } from "@chakra-ui/react"
export const Group = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode
    isActive: boolean
  }
>(function Group({ children, isActive }, forwardedRef) {
  return (
    <chakra.div
      ref={forwardedRef}
      css={
        isActive && {
          backgroundColor: "bg.info",
          borderRadius: "xs",
          outlineOffset: "2px",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineColor: "border",
        }
      }
    >
      {children}
    </chakra.div>
  )
})
