"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Box, Flex, HStack, Icon as ChakraIcon, Text } from "@chakra-ui/react"
import { View } from "#view/react"
import { usePointerDrag } from "./use-pointer-drag"
import { RegistryTree, RegistryViewer } from "#plugins/registry-manager-plugin/view"
import { usePlayground } from "./playground-provider"

function renderTabHeader(tab: any) {
  return <Text as="span">{tab.data.title}</Text>
}

function renderTabContent(tab: any) {
  const data = tab.data ?? {}
  const componentId = data.inputs?.componentId

  return componentId ? (
    <RegistryViewer componentId={componentId} title={data.title} />
  ) : (
    <RegistryTree withCardWrapper={false} actionType="select" />
  )
}


export function PlaygroundApp() {
  const { sendToPlayground, config, runtime } = usePlayground()

  const setController = useMemo(
    () => (controllerRef: any) => sendToPlayground({ type: "onSetController", controllerRef }),
    [sendToPlayground],
  )



  return (
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
          <Box
            minH="0"
            minW="0"
            flex="1"
            style={runtime.theme}
          >
            <View
              ref={setController as any}
              initialLayout={config.layout}
              resizable={config.global.resizable}
              minSize={config.global.minSize}
              resizeHandleHitSize={config.global.resizeHandleHitSize}
              showActionsButton={config.global.showActionsButton}
              showNewTabButton={config.global.showNewTabButton}
              onNewTab={(panel: any) => sendToPlayground({ type: "onNewTab", panel })}
              onChange={(event: any) => sendToPlayground({ type: "onChange", event })}
              onActiveTabChange={(event: any) => sendToPlayground({ type: "onActiveTabChange", event })}
              onPanelSplit={(event: any) => sendToPlayground({ type: "onPanelSplit", event })}
              onTabsMove={(event: any) => sendToPlayground({ type: "onTabsMove", event })}
              onTabsOpen={(event: any) => sendToPlayground({ type: "onTabsOpen", event })}
              onTabsClose={(event: any) => sendToPlayground({ type: "onTabsClose", event })}
              onPanelsClose={(event: any) => sendToPlayground({ type: "onPanelsClose", event })}
              renderTabHeader={renderTabHeader}
              renderTabContent={renderTabContent}
            />
          </Box>
        </Flex>
      </Flex>
  )
}
