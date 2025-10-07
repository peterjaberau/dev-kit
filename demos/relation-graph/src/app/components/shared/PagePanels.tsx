"use client"
import {
  Container,
  HStack,
  Stack,
  Box,
  ScrollArea,
} from "@chakra-ui/react"

import { NavigationPanel } from "#app/components/shared/NavigationPanel"
import { ReactNode } from "react"
import { CardPanel } from "#app/components"

interface PagePanelProps {
  mainLeft?: ReactNode,
  children?: ReactNode,
  title?: string,
}

export const PagePanels = (props: PagePanelProps) => {
  return (
    <Container fluid css={{ h: "100vh", p: 8 }}>
      <HStack alignItems="flex-start" css={{ h: "full", overflow: "hidden" }}>
        <ScrollArea.Root data-id="main-left-panel" css={{ h: "full", w: 350, minW: 250, maxW: 500 }}>
          <ScrollArea.Viewport>
            <ScrollArea.Content asChild>
              <Stack gap={4} css={{ p: 4 }}>
                <NavigationPanel />
                {props.mainLeft}
                {/*<CardPanel title="Control Panel" />*/}
              </Stack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>

        <Stack gap={4} css={{ p: 4, flex: 1 }} h={'full'}>
          {props.children}

        </Stack>
      </HStack>
    </Container>
  )
}
