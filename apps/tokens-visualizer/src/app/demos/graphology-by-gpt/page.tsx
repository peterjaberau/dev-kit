'use client'
import { GraphByGPTDemo } from '#components/demos/graphology/graphology-by-gpt'
import {
  Container,
  For,
  Center,
  SimpleGrid,
  HStack,
  Stack,
  Button,
  Text,
  GridItem,
  DataList,
  Card,
  Flex,
  Box,
  Tag,
  Badge,
  ScrollArea,
  IconButton,
} from "@chakra-ui/react"
import { LuBug } from "react-icons/lu"
import { UIDebugger } from "#components/common/ui-debugger"
import { useState } from "react"


export default function Page() {
  const [uiDebugger, setUiDebugger]: any = useState(false)



  return (
    <Container fluid css={{ h: "100vh", p: 8 }}>
      <HStack alignItems="flex-start" css={{ h: "full", overflow: "hidden" }}>
        <ScrollArea.Root data-id="main-left-panel" css={{ h: "full", w: 350, minW: 250, maxW: 500 }}>
          <ScrollArea.Viewport>
            <ScrollArea.Content asChild>
              <Stack gap={4} css={{ p: 4 }}>
                <Card.Root css={{ boxShadow: "sm", borderRadius: "md" }}>
                  <Card.Header>
                    <Card.Title>title</Card.Title>
                    <Card.Description>description </Card.Description>
                  </Card.Header>

                  <Card.Body>
                    <UIDebugger enable={uiDebugger}>
                      <Stack gap="4">test</Stack>
                    </UIDebugger>
                  </Card.Body>
                </Card.Root>
              </Stack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>

        <ScrollArea.Root data-id="main-content-panel" css={{ flex: 1, h: "full" }}>
          <ScrollArea.Viewport>
            <ScrollArea.Content asChild>
              <Stack gap={4} css={{ p: 4, h: "full" }} >


                <GraphByGPTDemo />






                {/*<UIDebugger enable={uiDebugger} >*/}
                {/*<DocPreview />*/}
                {/*</UIDebugger>*/}
              </Stack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>

      </HStack>
    </Container>

  )
}
