import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ListItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props
  return <chakra.div role="listitem" ref={ref} {...css} {...rest} />
})
