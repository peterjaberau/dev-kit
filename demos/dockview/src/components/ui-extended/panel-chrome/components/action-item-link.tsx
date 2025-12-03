'use client'
import { Button, Link } from "@chakra-ui/react"

export const ActionItemLink = ({ text, variant, icon, href }: any) => {
  return (
    <Button size="sm" variant={variant || "plain"} asChild>
      <a href={href || "#"}>
        {text && text}
      </a>
      {icon && icon}
    </Button>
  )
}
