import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"
import { Collapsible } from "@chakra-ui/react"


export const JsonTreeBranch = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <Collapsible.Root defaultOpen={false} unstyled ref={ref} {...rest}>
      {children}
    </Collapsible.Root>
  )
})
