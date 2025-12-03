'use client'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Toggle } from "@dev-kit/components"

export const ActionItemToggleGroup = ({ text, variant, icon, onClick, attached }: any) => {
  return (
    <ButtonGroup size="sm" variant={variant || "outline"} onClick={onClick} attached={attached || true}>
      <Button size="sm" variant={variant || "outline"} >{text}</Button>
      <Button size="sm" variant={variant || "outline"} >{text}</Button>
    </ButtonGroup>
  )
}
