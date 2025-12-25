import React, { forwardRef } from "react"
import { Text } from "@chakra-ui/react"

export const JsonTreeNodeKey = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Text fontWeight={"semibold"} textStyle={"sm"} {...props} ref={ref} />
  )
})
