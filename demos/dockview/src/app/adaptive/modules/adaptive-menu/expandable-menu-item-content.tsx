import { forwardRef, ReactNode, useRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { List } from "./list"
import { expandableMenuItemIndentation } from "./constants"

import {
  AreAllAncestorsExpandedContext,
  LevelContext,
  useAreAllAncestorsExpanded,
  useIsExpanded,
  useLevel,
} from "./expandable-menu-item-context"

export type ExpandableMenuItemContentProps = {
  children: ReactNode
}


export const ExpandableMenuItemContent = forwardRef<HTMLDivElement, any>(({ children }, ref) => {
  const isExpanded = useIsExpanded()
  const level = useLevel()
  const hasExpanded = useRef(false)
  const areAllAncestorsExpanded = useAreAllAncestorsExpanded()

  if (!isExpanded && !hasExpanded.current) {
    return null
  }

  hasExpanded.current = true

  return (
    <LevelContext.Provider value={level + 1}>
      <AreAllAncestorsExpandedContext.Provider value={areAllAncestorsExpanded && isExpanded}>
        <List
          ref={ref}
          css={{
            content: {
              // Padding is used to achieve alignment of content when nesting expandable menu items.
              // paddingInlineStart: '"12px"',
              paddingInlineStart: `'"${expandableMenuItemIndentation}"'`,
            },
            collapsedContent: {
              display: "none",
            },
          }}
        >
          {children}
        </List>
      </AreAllAncestorsExpandedContext.Provider>
    </LevelContext.Provider>
  )
})

