import { forwardRef, ReactNode, useRef } from "react"
import { expandableItemIndentation } from "./constants"

import {
  AreAllAncestorsExpandedContext,
  LevelContext,
  useAreAllAncestorsExpanded,
  useIsExpanded,
  useLevel,
} from "./control.context"
import { chakra } from "@chakra-ui/react"

export type ExpandableContentProps = {
  children: ReactNode
}

const styles = {
  content: {
    paddingInlineStart: expandableItemIndentation,
  },
  collapsedContent: {
    display: "none",
  },
}
export const ControlContentImpl = forwardRef((props: any, ref: any) => {
  const { css, children } = props
  // {...css}
  return (
    <chakra.div role="list" ref={ref} css={css}>
      {children}
    </chakra.div>
  )
})

export const ControlContent = forwardRef<HTMLDivElement, any>(({ children }, ref) => {
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
        <ControlContentImpl
          ref={ref}
          css={{
            ...styles.content,
            ...(!isExpanded && styles.collapsedContent),
          }}
        >
          {children}
        </ControlContentImpl>
      </AreAllAncestorsExpandedContext.Provider>
    </LevelContext.Provider>
  )
})
