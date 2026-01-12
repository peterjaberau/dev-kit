import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const DndDragHandle = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="dnd-drag-handle"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
