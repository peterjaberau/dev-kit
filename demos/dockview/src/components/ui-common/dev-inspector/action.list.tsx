import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ActionList =  forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <HStack
      css={{
        justifyContent: "flex-end",
        alignItems: "center",
        ...css,
      }}
      {...rest}
      ref={ref}
    />
  )
})
