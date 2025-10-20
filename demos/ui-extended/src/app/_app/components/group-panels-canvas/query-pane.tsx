"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuServer as IconServer, LuChevronRight, LuStar, LuPlus } from "react-icons/lu"
export function QueryPane() {
  return (
    <>
      <Pane
        title={"Query"}
        icon={<IconServer />}
        leftSection={
          <IconButton variant="ghost" size="xs" borderRadius={'full'}>
            <LuPlus />
          </IconButton>
        }
        // infoSection={"info"}
        rightSection={
          <HStack>
            <IconButton size={"sm"} variant={"ghost"}>
              <LuStar />
            </IconButton>
          </HStack>
        }
      >
        editor or widget here
      </Pane>
    </>
  )
}
