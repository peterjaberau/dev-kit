import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const ExpandableMenuItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="expandable-menu-item"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
