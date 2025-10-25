"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { JsonForms } from "#jSchemaBuilder/react"
import {
  vanillaRenderers,
  vanillaCells,
} from '#jSchemaBuilder/renderers';
import { LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import React, { memo } from "react"
import { useCurrentApp } from "../actors-model/selectors/current-app"

const PanelContentComponent = memo(({ currentExample }: any) => (
  <JsonForms
    schema={currentExample.schema || {}}
    uischema={currentExample.uischema || {}}
    data={currentExample.data || null}
    renderers={vanillaRenderers}
    cells={vanillaCells}
    onChange={({ data, errors }) => console.log('--onChange jsonforms--', {data, errors})}
  />
))

export function JsonFormsPane() {
  const { currentExample } = useCurrentApp()

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
      <PanelContentComponent currentExample={currentExample}  />
    </Pane>
  )
}
