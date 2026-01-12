import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const MenuItemElementInteractive = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="menu-item-element-after"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
