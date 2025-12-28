import { forwardRef, type ReactNode } from "react"
import { chakra } from "@chakra-ui/react"

/**
 * A drop indicator to be used when dragging over a group of items
 */
export const GroupDropIndicator = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode
    isActive: boolean
    testId?: string
  }
>(function GroupDropIndicator({ children, isActive, testId }, forwardedRef) {
  return (
    <chakra.div
      ref={forwardedRef}
      css={[
        isActive && {
          backgroundColor: "#E9F2FE",
          borderRadius: "2px",
          outlineOffset: "6px",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineColor: "#1868DB",
        },
      ]}
      data-testid={testId}
    >
      {children}
    </chakra.div>
  )
})
