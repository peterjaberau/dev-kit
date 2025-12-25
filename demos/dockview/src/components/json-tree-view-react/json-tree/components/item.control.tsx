import React, { forwardRef } from "react"
import { HStack } from "@chakra-ui/react"

export const JsonTreeItemControl = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return <HStack alignItems={"center"} flex={1} {...props} ref={ref} />
})
