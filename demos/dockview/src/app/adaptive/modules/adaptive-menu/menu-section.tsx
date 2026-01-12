import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const MenuSection = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="menu-section"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
