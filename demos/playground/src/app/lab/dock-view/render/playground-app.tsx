"use client"

import { useMemo } from "react"
import { Box, Flex, Text, ClientOnly } from "@chakra-ui/react"
import { View } from "#view/react"
import type { ViewReducerAction } from "#view/core/internal"
import { RegistryTree, RegistryViewerWithCard } from "#plugins/registry-manager-plugin/view"
import { usePlayground } from "./playground-provider"

function renderTabHeader(tab: any) {
  return <Text as="span">{tab.data.title}</Text>
}

function renderTabContent(tab: any) {
  const data = tab.data ?? {}
  const componentId = data.inputs?.componentId

  return componentId ? (
    <RegistryViewerWithCard componentId={componentId} title={data.title} />
  ) : (
    <RegistryTree withCardWrapper={false} actionType="select" />
  )
}

export function PlaygroundApp() {
  const { sendToPlayground, config, runtime, layout } = usePlayground()

  const setController = useMemo(
    () => (controllerRef: any) => sendToPlayground({ type: "onSetController", controllerRef }),
    [sendToPlayground],
  )

  const callbacks = useMemo(
    () => ({
      onNewTab: (panel: { id: string }) => sendToPlayground({ type: "onNewTab", panelId: panel.id }),
      onAction: (action: ViewReducerAction) => sendToPlayground({ type: "view.action", action }),
    }),
    [sendToPlayground],
  )

  return (
    <ClientOnly>
      <Flex minW="0" minH="0" flex="1" align="center" justify="center" overflow="hidden">
        <Flex
          position="relative"
          direction="column"
          h={"full"}
          w={"full"}
          minW="48rem"
          maxW="full"
          overflow="hidden"
          borderWidth="1px"
          borderColor="border"
        >
          <Box minH="0" minW="0" flex="1" style={runtime.theme}>
            <View
              ref={setController as any}
              initialLayout={config.layout}
              resizable={config.global.resizable}
              minSize={config.global.minSize}
              resizeHandleHitSize={config.global.resizeHandleHitSize}
              showActionsButton={config.global.showActionsButton}
              showNewTabButton={config.global.showNewTabButton}
              stateControl={{ state: layout, onAction: callbacks.onAction }}
              onNewTab={callbacks.onNewTab}
              renderTabHeader={renderTabHeader}
              renderTabContent={renderTabContent}
            />
          </Box>
        </Flex>
      </Flex>
    </ClientOnly>
  )
}
