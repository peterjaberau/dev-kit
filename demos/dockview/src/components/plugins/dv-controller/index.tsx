"use client"
import { HStack, RadioCard } from "@chakra-ui/react"
import { memo, useEffect, useMemo } from "react"
import { usePluginDvController } from "#actors/model/selectors"


export const DvControllerPlugin = memo(() => {
  const { isLoading, isReady, items, value, defaultValue, fireStartLoading, fireValueChange } = usePluginDvController()

  useEffect(() => {
    fireStartLoading();
  }, [])

  return (
    <RadioCard.Root
      value={value}
      onValueChange={(e) => fireValueChange(e)}
      align="center" size='sm'>
      <HStack wrap="wrap" gap="3" p={4} justifyContent='center'>
        {items.map((item: any) => (
          <RadioCard.Item flex="0" whiteSpace="nowrap" key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )


})

