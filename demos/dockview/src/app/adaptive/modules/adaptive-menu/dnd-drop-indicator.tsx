import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const DndDropIndicator = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="dnd-drop-indicator"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
