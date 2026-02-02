// ===================== InspectorDrawer.tsx =====================
// FIX:
// - Explicit zIndex for drawer panel
// - Ensure position context is correct
// - Do NOT block layout with pointer-events hacks

import { useState } from "react"
import {
  Drawer,
  Portal,
  Stack,
  HStack,
  Heading,
  CloseButton,
  Icon,
} from "@chakra-ui/react"
import { LuSearch as IconSearch } from "react-icons/lu"
import { DrawerResizer } from "#components/DrawerResizer"
import type { RefObject } from "react"

export interface InspectorDrawerProps {
  opened: boolean
  onClose: () => void
  container?: RefObject<HTMLElement> | any
}

export function InspectorDrawer({
                                  opened,
                                  onClose,
                                  container,
                                }: InspectorDrawerProps) {
  const [width, setWidth] = useState(650)

  return (
    <Drawer.Root
      open={opened}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      modal={false}
      trapFocus={false}
      closeOnInteractOutside={false}
      closeOnEscape
    >
      <Portal container={container}>


        {/* Positioner fills container */}
        <Drawer.Positioner
          pos="absolute"
          inset={0}
          zIndex={2}

        >
          <Drawer.Content
            pos="absolute"
            top={0}
            right={0}
            h="100%"
            width={width}
            maxW={width}
            bg="bg.panel"
            boxShadow="xl"
            px={6}
            py={2}
            zIndex={3} // 🔑 CRITICAL: above container background
          >
            <DrawerResizer
              minSize={500}
              maxSize={1500}
              onResize={setWidth}
            />

            <Stack h="100%">
              <HStack w="full">
                <HStack flex={1}>
                  <Icon>
                    <IconSearch />
                  </Icon>
                  <Heading size="md">Record inspector</Heading>
                </HStack>

                <Drawer.CloseTrigger asChild>
                  <CloseButton />
                </Drawer.CloseTrigger>
              </HStack>
            </Stack>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}