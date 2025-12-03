'use client'
import { HStack, For } from "@chakra-ui/react"
import React from "react"

export interface PanelHeaderProps {
  start?: React.ReactNode[]
  end?: React.ReactNode[]
}

export const PanelHeader = ({ start = [], end = [] }: any) => {
  return (
    <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
      <HStack flex={1} alignItems={"center"}>
        <For each={start}>{(item, index) => React.cloneElement(item as React.ReactElement, { key: index })}</For>
      </HStack>
      <HStack alignItems={"center"}>
        <For each={end}>{(item, index) => React.cloneElement(item as React.ReactElement, { key: index })}</For>
      </HStack>
    </HStack>
  )
}
