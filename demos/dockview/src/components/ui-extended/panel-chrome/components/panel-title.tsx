'use client'
import { Text } from '@chakra-ui/react'

export const PanelTitle = ({ title }: any) => {
  return (
    <Text fontWeight={"medium"} truncate>
      {title || ""}
    </Text>
  )
}
