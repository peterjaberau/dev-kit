"use client"

import { Button, For, HStack } from "@chakra-ui/react"
import { toaster } from "@dev-kit/components"

export const ToasterWithStatus = () => {
  return (
    <HStack>
      <For each={["success", "error", "warning", "info"]}>
        {(type) => (
          <Button
            size="sm"
            variant="outline"
            key={type}
            onClick={() =>
              toaster.create({
                title: `Toast status is ${type}`,
                type: type,
              })
            }
          >
            {type}
          </Button>
        )}
      </For>
    </HStack>
  )
}
