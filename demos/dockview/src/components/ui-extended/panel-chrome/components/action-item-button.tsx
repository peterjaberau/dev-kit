'use client'
import { Button } from "@chakra-ui/react"

export const ActionItemButton = ({ text, variant, icon, onClick }: any) => {
  return (
    <Button size="sm" variant={variant || "ghost"} onClick={onClick}>
      {icon && icon}
      {text && text}
    </Button>
  )
}
