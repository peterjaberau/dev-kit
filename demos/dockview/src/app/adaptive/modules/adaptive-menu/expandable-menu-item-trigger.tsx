import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ExpandableMenuItemTrigger = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="expandable-menu-item-trigger"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
