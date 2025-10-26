"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import { memo } from "react"
import { useJSchemaExamples } from "../actors-model/selectors/j-schema-examples"
import { useCurrentApp } from "../actors-model/selectors/current-app"

const PanelContentComponent = memo(({ jSchemaExamplesContext, setCurrentViewerExample }: any) => (
  <RadioCard.Root align="center" size={"sm"} onValueChange={(e: any) => setCurrentViewerExample(e.value)}>
    <HStack wrap="wrap" gap="3">
      {Object.keys(jSchemaExamplesContext?.dataViewer)?.map((item: any) => (
        <RadioCard.Item flex="0" whiteSpace="nowrap" key={item} value={item}>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RadioCard.ItemText>{item}</RadioCard.ItemText>
          </RadioCard.ItemControl>
        </RadioCard.Item>
      ))}
    </HStack>
  </RadioCard.Root>
))

export function JsonSchemaViewerListPane() {
  const { jSchemaExamplesContext } = useJSchemaExamples()
  const { setCurrentViewerExample } = useCurrentApp()

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
      <PanelContentComponent jSchemaExamplesContext={jSchemaExamplesContext} setCurrentViewerExample={setCurrentViewerExample} />
    </Pane>
  )
}
