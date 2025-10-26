"use client"
import 'react18-json-view/src/style.css'
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { JsonForms } from "#jSchemaBuilder/react"
import { vanillaRenderers, vanillaCells } from "#jSchemaBuilder/renderers"
import { LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import React, { memo } from "react"
import { useCurrentApp } from "../actors-model/selectors/current-app"
import JsonView from "react18-json-view"



export function JsonTreeViewerPane() {
  const { currentExample, currentViewerExample } = useCurrentApp()

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
      <JsonView
        src={{
          currentExample: currentExample ,
          currentViewerExample: currentViewerExample
        }}
        collapsed={2}
        theme={'github'}
        style={{
          fontSize: '13px',
          fontWeight: 600
        }}
      />
    </Pane>
  )
}
