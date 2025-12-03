'use client'
import { Button, Link } from "@chakra-ui/react"

export const ActionItemLink = ({ label, props, icon, href, target }: any) => {
  return (
    <Button size={props?.size || 'sm'} variant={props?.variant || "plain"} asChild>
      <a href={href || "#"} target={target || '_self'}>
        {label && label}
      </a>
      {icon && icon}
    </Button>
  )
}
