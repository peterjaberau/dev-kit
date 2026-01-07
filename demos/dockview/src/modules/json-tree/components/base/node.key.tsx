import React, { forwardRef } from "react"
import { Text } from "@chakra-ui/react"

export const NodeKey = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Text css={{
      color: 'gray.800',
      fontWeight: '500',
      fontSize: 'sm',
      fontFamily: 'mono',
    }}  textAlign={'start'} {...props} ref={ref} />
  )
})
