import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { useMenu } from './use-menu'
/**
 * An [unordered list] for semantically grouping list items.
 */
export const MenuList = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  const { menuRef } = useMenu()

  console.log('menuRef in MenuList:', menuRef)


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
