"use client"

import { Button, IconButton, Text, HStack, VStack, useSlotRecipe, chakra } from "@chakra-ui/react"
import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react/floating-panel"
import { Portal } from "@ark-ui/react/portal"
import { ArrowDownLeft, Maximize2, Minus, X, GripVertical } from "lucide-react"

import { floatingPanelRecipe } from "./styles"

const Root = chakra(ArkFloatingPanel.Root)
const Trigger = chakra(ArkFloatingPanel.Trigger)
const DragTrigger = chakra(ArkFloatingPanel.DragTrigger)
const Positioner = chakra(ArkFloatingPanel.Positioner)
const Content = chakra(ArkFloatingPanel.Content)
const Header = chakra(ArkFloatingPanel.Header)
const Body = chakra(ArkFloatingPanel.Body)
const Control = chakra(ArkFloatingPanel.Control)
const Title = chakra(ArkFloatingPanel.Title)
const ResizeTrigger = chakra(ArkFloatingPanel.ResizeTrigger)



export default function FloatingPanelBasic() {
  const recipe = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles = recipe()

  return (
    <Root>
      <Trigger asChild>
        <Button colorScheme="blue" css={styles.trigger}>
          Open Panel
        </Button>
      </Trigger>

      <Portal>
        <Positioner style={styles.positioner}>
          <Content css={styles.content}>
            <DragTrigger>
              <Header css={styles.header}>
                <HStack gap="2">
                  <GripVertical size={16} />
                  <Title>
                    <Text css={styles.title}>Floating Panel</Text>
                  </Title>
                </HStack>

                <Control css={styles.controls}>
                  <StageTrigger stage="minimized" asChild>
                    <IconButton aria-label="Minimize" icon={<Minus size={12} />} css={styles.iconButton} />
                  </StageTrigger>

                  <StageTrigger stage="maximized" asChild>
                    <IconButton aria-label="Maximize" icon={<Maximize2 size={12} />} css={styles.iconButton} />
                  </StageTrigger>

                  <StageTrigger stage="default" asChild>
                    <IconButton aria-label="Restore" icon={<ArrowDownLeft size={12} />} css={styles.iconButton} />
                  </StageTrigger>

                  <CloseTrigger asChild>
                    <IconButton aria-label="Close" icon={<X size={12} />} css={styles.iconButton} />
                  </CloseTrigger>
                </Control>
              </Header>
            </DragTrigger>

            <Body css={styles.body}>
              <Text color="fg.muted">
                This is a basic floating panel. You can drag it around by the header, resize it using the edges, and
                control its state using the buttons in the header.
              </Text>
              <Text fontSize="sm" color="fg.subtle">
                Try dragging, resizing, minimizing, maximizing, or closing this panel.
              </Text>
            </Body>

            {/* Resize handles */}
            <ResizeTrigger axis="n" />
            <ResizeTrigger axis="e" />
            <ResizeTrigger axis="w" />
            <ResizeTrigger axis="s" />
            <ResizeTrigger axis="ne" />
            <ResizeTrigger axis="se" />
            <ResizeTrigger axis="sw" />
            <ResizeTrigger axis="nw" />
          </Content>
        </Positioner>
      </Portal>
    </Root>
  )
}
