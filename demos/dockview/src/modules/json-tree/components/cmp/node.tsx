import React, { forwardRef, memo } from "react"
import { chakra, Stack } from "@chakra-ui/react"

export const Node = memo(
  forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
    return <Stack data-scope="node" data-part="node" {...props} ref={ref} />
  }),
)
