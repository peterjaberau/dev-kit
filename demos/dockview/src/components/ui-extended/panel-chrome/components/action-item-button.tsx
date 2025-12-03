'use client'
import { Button } from "@chakra-ui/react"

export const ActionItemButton = ({ label, props, icon, onClick }: any) => {
  return (
    <Button size="sm" variant={props?.variant || "ghost"} onClick={onClick}>
      {icon && icon}
      {label && label}
    </Button>
  )
}
