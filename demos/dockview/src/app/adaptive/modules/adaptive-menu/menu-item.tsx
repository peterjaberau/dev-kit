import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"

export const MenuItemImpl = forwardRef((props: any, ref: any) => {
  const { visualContentRef, dropIndicator, onClick, isDragging, css, children, ...rest } = props

  return (
    <chakra.div
      ref={visualContentRef} // DRAG TARGET
      data-scope="menu-item"
      data-dragging={isDragging || undefined}
      css={css}
    >
      <chakra.div
        ref={ref} // INTERACTIVE TARGET
        tabIndex={0}
        onClick={onClick}
        {...rest}
      >
        {children}
      </chakra.div>
      {dropIndicator}
    </chakra.div>
  )
})


export const MenuItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  return (
      <MenuItemImpl {...props} ref={ref} />
  )
})
