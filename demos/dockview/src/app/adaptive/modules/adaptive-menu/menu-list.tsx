import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

/**
 * An [unordered list] for semantically grouping list items.
 */
export const MenuList = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="menu-list"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
