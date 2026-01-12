import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ExpandableMenuItemContent = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="expandable-menu-item-content"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
