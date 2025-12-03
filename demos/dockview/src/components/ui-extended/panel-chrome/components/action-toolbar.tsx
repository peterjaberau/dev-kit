'use client'
import { HStack } from "@chakra-ui/react"

export const ActionToobar = ({ items }: any) => {
  return (
    items && (
      <HStack>
        {items}
      </HStack>
    )
  )
}
