"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import { memo } from "react"
import { useJSchemaExamples } from "../actors-model/selectors/j-schema-examples"
import { useCurrentApp } from "../actors-model/selectors/current-app"

const PanelContentComponent = memo(({ jSchemaExamplesContext, setCurrentExample }: any) => (
  <RadioCard.Root align="center" size={"sm"} onValueChange={(e: any) => setCurrentExample(e.value)}>
    <HStack wrap="wrap" gap="3">
      {jSchemaExamplesContext?.data?.map((item: any) => (
        <RadioCard.Item flex="0" whiteSpace="nowrap" key={item.name} value={item.name}>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
          </RadioCard.ItemControl>
        </RadioCard.Item>
      ))}
    </HStack>
  </RadioCard.Root>
))

export function ExamplesListPane() {
  const { jSchemaExamplesContext } = useJSchemaExamples()
  const { setCurrentExample } = useCurrentApp()

  return (
    <Pane
      title={"Examples list"}
      icon={<BiSolidTerminal />}
      leftSection={
        <IconButton variant="ghost" size="xs" borderRadius="full">
          <LuPlus />
        </IconButton>
      }
      rightSection={
        <HStack>
          <IconButton size="sm" variant="ghost">
            <LuStar />
          </IconButton>
        </HStack>
      }
    >
      <PanelContentComponent jSchemaExamplesContext={jSchemaExamplesContext} setCurrentExample={setCurrentExample} />
    </Pane>
  )
}
