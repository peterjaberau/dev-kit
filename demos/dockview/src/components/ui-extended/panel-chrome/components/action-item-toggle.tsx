'use client'
import { Button } from "@chakra-ui/react"
import { Toggle } from "@dev-kit/components"

export const ActionItemToggle = ({ text, variant, icon, onClick }: any) => {
  return (
    <Button size="sm" variant={variant || "ghost"} onClick={onClick}>
      {icon && icon}
      {text && text}
    </Button>
  )
}
