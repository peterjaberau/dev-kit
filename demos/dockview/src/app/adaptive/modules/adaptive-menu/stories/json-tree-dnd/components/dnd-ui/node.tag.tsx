import React, { forwardRef } from "react"
import { Badge } from "@chakra-ui/react"

export const NodeTag = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <Badge data-scope="node" data-part="tag" variant={"outline"} {...props} ref={ref} />
})
