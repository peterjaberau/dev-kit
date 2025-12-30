import { forwardRef } from "react"

import { Link as ChakraLink, Box } from "@chakra-ui/react"
import NextLink from "next/link"
import * as cssStyles from "../css"

const focusRingStyles = {
  "&:focus, &:focus-visible": {
    outlineColor: "#4688EC",
    outlineOffset: cssStyles.positiveSpaceMap["space.025"],
    outlineStyle: "solid",
    outlineWidth: cssStyles.borderWidthMap["border.width.focused"],
  },
  "&:focus:not(:focus-visible)": {
    outline: "none",
  },
  "@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)": {
    "&:focus-visible": {
      outline: `${cssStyles.borderWidthMap["border.width"]} solid`,
    },
  },
}

const baseStyles = {
  boxSizing: "border-box",
  textDecoration: "underline",
}

const positionStyles = {
  position: "relative",
}

export const Anchor = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, href, isRouter = false, css, ...rest } = props

  return (
    <Box
      css={{
        ...baseStyles,
        ...positionStyles,
        ...focusRingStyles,
        ...css,
      }}
    >
      isRouter ? (
      <ChakraLink href={href} {...rest} ref={ref} asChild>
        <NextLink href={href || "/"}>{children}</NextLink>
      </ChakraLink>
      ) : (
      <ChakraLink href={href || "#"} {...rest} asChild ref={ref}>
        {children}
      </ChakraLink>
      )
    </Box>
  )
})
