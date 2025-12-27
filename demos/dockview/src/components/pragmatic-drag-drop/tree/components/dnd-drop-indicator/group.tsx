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
          backgroundColor: "#E9F2FE",
          borderRadius: "2px",
          outlineOffset: "6px",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineColor: "#1868DB",
        }
      }
    >
      {children}
    </chakra.div>
  )
})
