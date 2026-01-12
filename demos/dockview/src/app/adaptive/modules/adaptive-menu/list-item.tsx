import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

/**
 * The contents of the list item.
 */

export const ListItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props
  return <chakra.div data-scope="list-item" role="listitem" ref={ref} {...css} {...rest} />
})
