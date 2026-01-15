import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { useMenuSectionContext } from "./menu-section-context"

export const MenuSectionHeading = (props: any) => {
  const { css, children, ...rest } = props
  const id = useMenuSectionContext()


  return (
    <chakra.p
      data-scope="menu-section-heading"
      id={`${id}-heading`}
      css={{
        color: "gray.700",
        font: "10px",
        fontWeight: "600",
        paddingBlock: "4px",
        paddingInlineStart: "3px",
        ...css,
      }}
    />
  )
}
