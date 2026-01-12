import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ItemLink = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="item-link"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
