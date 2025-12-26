import React, { forwardRef } from "react"
import { Collapsible } from "@chakra-ui/react"

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Collapsible.Trigger
      data-scope="json-tree"
      data-part="branch-trigger"
      _open={{
        pb: 2,
      }}
      width={"full"}
      css={{ cursor: "pointer" }}
      {...props}
      ref={ref}
    />
  )
})
