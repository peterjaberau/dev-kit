import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

/**
 * We are using `role="list"` instead of a `ul` element to enable more flexible
 * and list items, as long as those in-between elements have no semantics.
 */

export const List = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return <chakra.div data-scope="list" role="list" ref={ref} {...css} {...rest} />
})
