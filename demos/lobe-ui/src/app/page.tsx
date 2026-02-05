'use client';
import { Center, Container, Stack } from "@chakra-ui/react"

import ActionIconDemo from "#/ActionIcon/demos"
import ActionIconGroupDemo from "#/ActionIconGroup/demos"
import DraggablePanelDemo from "#/DraggablePanel/demos"
import DraggablePanelLayoutDemo from "#/DraggablePanel/demos/Layout"
import DraggableSideNavDemo from "#/DraggableSideNav/demos"


const Previewer = ({children}: any) => {
  return (
    <Center css={{ w: "full" }}>
      <Center
        css={{
          borderRadius: "md",
          minH: "250px",
          // bg: "bg.subtle",
          w: "1200px",
          border: "1px solid",
          borderColor: "border",
        }}
      >
        {children}
      </Center>
    </Center>
  )
}
export default function Page() {

  return (
    <Stack
      gap={10}
      css={{
        w: "full",
        p: 10,
      }}
    >
      <Previewer>
        <DraggablePanelDemo />
      </Previewer>
      <Previewer>
        <DraggablePanelLayoutDemo />
      </Previewer>

      <Previewer>
        <DraggableSideNavDemo />
      </Previewer>
    </Stack>
  )
}
