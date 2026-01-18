import React, { forwardRef, ReactNode } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { useControlled } from "#adaptive-shared/lib/hooks"
import { IsExpandedContext, OnExpansionToggleContext, SetIsExpandedContext } from "./control.context"

export type ExpandableProps = {
  isExpanded?: boolean
  isDefaultExpanded?: boolean
  onExpansionToggle?: (isExpanded: boolean) => void
  children: ReactNode
  dropIndicator?: ReactNode
}
const relativeStyles = {
  root: {
    position: "relative",
  },
}

export const Control = forwardRef((props: any, ref: any) => {
  const {
    isExpanded: isExpandedControlled,
    isDefaultExpanded = false,
    onExpansionToggle,
    children,
    dropIndicator,
    ...rest
  } = props

  const [isExpanded, setIsExpanded] = useControlled(isExpandedControlled, () => isDefaultExpanded)

  return (
    <IsExpandedContext.Provider value={isExpanded}>
      <SetIsExpandedContext.Provider value={setIsExpanded}>
        <OnExpansionToggleContext.Provider value={onExpansionToggle ?? null}>
          {/* Wrapping  to group all the composable elements together, as part of the disclosure pattern */}
          <chakra.div ref={ref}>
            {/* Adding `position:relative` only when it's needed by the drop indicator */}
            <chakra.div
              css={{
                ...(dropIndicator && relativeStyles.root),
              }}
            >
              {children}
              {dropIndicator}
            </chakra.div>
          </chakra.div>
        </OnExpansionToggleContext.Provider>
      </SetIsExpandedContext.Provider>
    </IsExpandedContext.Provider>
  )
})
