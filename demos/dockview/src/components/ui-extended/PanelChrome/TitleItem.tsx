import { forwardRef } from "react"
import * as React from "react"
import { chakra, Button } from "@chakra-ui/react"

type TitleItemProps = {
  className?: string
  children: React.ReactNode
  onClick?: any
  href?: string
  target?: any
  title?: string
  css?: any
}

type TitleItemElement = HTMLAnchorElement & HTMLButtonElement

export const TitleItem = forwardRef<TitleItemElement, TitleItemProps>(
  ({ className, children, href, onClick, target, title,css, ...rest }, ref) => {

    if (href) {
      return (
        <chakra.a
          ref={ref}
          href={href}
          onClick={onClick}
          target={target}
          title={title}
          css={{
            cursor: 'pointer',
            ...css
          }}
          {...rest}
        >
          {children}
        </chakra.a>
      )
    } else if (onClick) {
      return (
        <Button ref={ref} variant="surface" fill="text" onClick={onClick}>
          {children}
        </Button>
      )
    } else {
      return (
        <chakra.span
          ref={ref}
          css={{
            cursor: "pointer",
          }}
          {...rest}
        >
          {children}
        </chakra.span>
      )
    }
  },
)

TitleItem.displayName = "TitleItem"

