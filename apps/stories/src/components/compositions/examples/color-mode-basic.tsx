"use client"

import { Button } from "@chakra-ui/react"
import { useColorMode } from "@dev-kit/components"

export const ColorModeBasic = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  )
}
