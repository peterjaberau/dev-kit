import React, { forwardRef } from "react"
import { Collapsible } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"


export const BranchIndicator = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Collapsible.Indicator
      data-scope="branch"
      data-part="indicator"
      transition="transform 0.2s" _open={{ transform: "rotate(90deg)" }} {...props} ref={ref}>
      <LuChevronRight />
    </Collapsible.Indicator>
  )
})
