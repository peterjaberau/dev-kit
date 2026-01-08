import React, { forwardRef } from "react"
import { Badge, Box } from "@chakra-ui/react"
import { useTreeItem } from "#drag-and-drop/selectors"

// additionalGap for toggleSize

export const NodeIndent = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, css, children, ...rest } = props
  const { isOpen, isBranchNotEmptyData, isBranchData, isBranchEmptyData } = useTreeItem({ actorRef: itemRef })

  return (
    <Box
      flexShrink={0}
      data-scope="node"
      data-part="indent"
      as="span"
      css={{
        flexShrink: 0,
        display: "inline-block",
          width: isBranchEmptyData ? "12px" : "20px", // same visual width as indicator
        backgroundColor: "red",
        ...css,
      }}
      {...rest}
      ref={ref}
    />
  )
})
