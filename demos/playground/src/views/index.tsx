"use client"
import "../styles/dock-light.css"
import { dockViewCssVariables } from "./styles"

import {
  DockviewDefaultTab,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelHeaderProps,
  themeReplit,
} from "#dockview"
import { DockViewPanels } from "./components/dock-view-panels"
import React, { useEffect } from "react"
import { LuX } from "react-icons/lu"

import { LeftHeaderActions, RightHeaderActions, PrefixHeaderActions } from "./components/header"

import { Button, ButtonGroup, IconButton, Stack, Box, Flex, HStack } from "@chakra-ui/react"
import { useDockViewAdapter, useDockViewPanel } from "#modules/dockview/actors/selectors"


const headerComponents = {
  default: (props: IDockviewPanelHeaderProps) => {
    const { sendToDockViewAdapter } = useDockViewAdapter()
    const { id: panelId } = useDockViewPanel({ panelId: props.api.id })

    const onContextMenu = (event: React.MouseEvent) => {
      event.preventDefault()
      alert("context menu")
    }

    return (
      <ButtonGroup size="sm" variant="outline" attached>
        <Button variant="outline">{props.api.title}</Button>
        <IconButton
          variant="outline"
          onClick={() =>
            sendToDockViewAdapter({
              type: "onRemovePanel",
              payload: {
                panelId,
              },
            })
          }
        >
          <LuX />
        </IconButton>
      </ButtonGroup>
    )
  },
}

const Index = (props: { theme?: string }) => {
  const { sendToDockViewAdapter } = useDockViewAdapter()

  const onReady = (event: DockviewReadyEvent) => {
    sendToDockViewAdapter({ type: "onReady", api: event.api })
  }

  return (
    <Stack css={dockViewCssVariables}>
      <Flex
        css={{
          flexGrow: 1,
          height: 0,
        }}
      >
        <Flex
          css={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <DockviewReact
            components={DockViewPanels}
            defaultTabComponent={headerComponents.default}
            rightHeaderActionsComponent={RightHeaderActions}
            leftHeaderActionsComponent={LeftHeaderActions}
            prefixHeaderActionsComponent={PrefixHeaderActions}
            onReady={onReady}
            theme={themeReplit}
          />
        </Flex>
      </Flex>
    </Stack>
  )
}

export default Index
