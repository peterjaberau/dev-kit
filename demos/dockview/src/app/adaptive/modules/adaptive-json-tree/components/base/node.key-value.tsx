import React, { forwardRef } from "react"
import { Text } from "@chakra-ui/react"

export const NodeKeyValue = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Text fontWeight={"normal"} color={"fg.info"} textStyle={"sm"} {...props} ref={ref} />
  )
})
