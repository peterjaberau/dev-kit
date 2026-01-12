import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ItemButton = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="item-button"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
