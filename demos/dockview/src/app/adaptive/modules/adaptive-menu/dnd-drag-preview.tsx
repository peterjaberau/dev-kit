import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const DndDragPreview = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="dnd-drag-preview"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
