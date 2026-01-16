import { forwardRef } from "react"
import { chakra, HStack, Text, Heading } from "@chakra-ui/react"
import { useMenuSectionContext } from "./menu-section-context"


export const MenuSectionHeading = (props: any) => {
  const { css, children, ...rest } = props
  const id = useMenuSectionContext()


  return (
    <Heading
      id={`${id}-heading`}
      size="sm"
      colorPalette={'gray'}
    />
  )
}
