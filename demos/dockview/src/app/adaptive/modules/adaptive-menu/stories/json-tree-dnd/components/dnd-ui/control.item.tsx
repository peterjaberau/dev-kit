import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ControlItem = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { css, children, ...rest } = props
  return (
    <chakra.div css={{ ...css }} ref={ref} {...rest}>
      {children}
    </chakra.div>
  )
})
