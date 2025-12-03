'use client'
import { Button } from "@chakra-ui/react"
import { Toggle } from "@dev-kit/components"

export const ActionItemToggle = ({ label, props, icon }: any) => {
  return (
    <Button size="sm" variant={props?.variant || "outline"} >
      {icon && icon}
      {label && label}
    </Button>
  )
}
