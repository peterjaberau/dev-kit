import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const MenuItemImpl = forwardRef((props: any, ref: any) => {
  const {
    id,
    css,
    elemAfter,
    elemBefore,
    interactionName,
    visualContentRef,
    isDragging,
    hasDragIndicator,
    dropIndicator,
    ...rest
  } = props

  return (
    <chakra.div
      data-scope="menu-item"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})


export const MenuItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
    <chakra.div
      data-scope="menu-item"
      ref={ref}
      css={{
        ...css,
      }}
    />
  )
})
