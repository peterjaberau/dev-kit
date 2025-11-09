"use client"
import { HStack, RadioCard } from "@chakra-ui/react"
import { memo, useEffect, useMemo } from "react"
import { usePluginScopePicker } from "#actors/model/selectors"


export const ScopePickerPlugin = memo(() => {
  const { triggerStartLoading, triggerValueChange, isLoading, isReady, items, value, defaultValue } = usePluginScopePicker()

  useEffect(() => {
    triggerStartLoading();
  }, [])

  return (
    <RadioCard.Root
      value={value}
      onValueChange={(e) => triggerValueChange(e)}
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

