import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

// additionalGap for toggleSize

export const ControlToggleIndicator = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  // const { level = 0, indentPerLevel = 2, additionalGap = 5, ...rest } = props

  return (
    <chakra.div
      data-scope="control"
      data-part="toggle"
      gridArea="toggle"
      css={{
        backgroundColor: "gray.100",
      }}
      {...props}
      ref={ref}
    />
  )
})
