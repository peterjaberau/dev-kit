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

/**
 * We are providing `AreAllAncestorsExpandedContext` in `ExpandableMenuItemContent` rather than within `ExpandableMenuItem`,
 * so that the `ExpandableMenuItemTrigger` element is not affected by whether the current menu item is expanded or not.
 *
 * This is because the trigger is visually not a child of the `ExpandableMenuItem`. It is visible regardless
 * of whether its `ExpandableMenuItem` is expanded or not.
 *
 *
 * By combining the current ancestor and with the current menu item's state, all nested menu items will know if their
 * ancestor menu items are all expanded.
 *
 */

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
              paddingInlineStart: expandableMenuItemIndentation,
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

/*


export const ExpandableMenuItemContent = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="expandable-menu-item-content"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})

 */
