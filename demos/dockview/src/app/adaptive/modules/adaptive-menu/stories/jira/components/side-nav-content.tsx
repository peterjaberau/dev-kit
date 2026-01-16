import React, { forwardRef, type ReactNode, type Ref, useMemo, useRef } from "react"

import { chakra } from "@chakra-ui/react"

export const SideNavContent = forwardRef(({ children }: any, forwardedRef: Ref<HTMLDivElement>) => {
  const internalRef = useRef<HTMLDivElement>(null)

  return (
    <chakra.div
      css={{
        //scrollContainer
        flex: 1,
        overflow: "auto",
      }}
      ref={forwardedRef}
    >
      <chakra.div
        css={{
          margin: 0,
          padding: 0,
          color: '#172B4D',
          textDecorationSkipInk: 'auto',
          paddingBlockStart: "9pt",
          paddingInlineEnd: "9pt",
          paddingBlockEnd: "9pt",
          paddingInlineStart: "9pt",
        }}
      >
        {children}
      </chakra.div>
    </chakra.div>
  )
})

