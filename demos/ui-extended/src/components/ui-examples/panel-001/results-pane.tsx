"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuServer as IconServer, LuChevronRight, LuStar } from "react-icons/lu"
export function ResultsPane() {
  return (
    <>
      <Pane
        title={"Query"}
        icon={<IconServer />}
        leftSection={
          <IconButton variant="subtle" size="sm">
            <LuChevronRight />
          </IconButton>
        }
        infoSection={"info"}
        rightSection={
          <HStack>
            <IconButton size={"sm"} variant={"ghost"}>
              <LuStar />
            </IconButton>
          </HStack>
        }
      >
        results pane here
      </Pane>
    </>
  )
}
