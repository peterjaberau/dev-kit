import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ItemCustom = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="item-custom"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
