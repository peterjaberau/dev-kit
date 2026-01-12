import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const DndHitbox = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="dnd-hitbox"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
