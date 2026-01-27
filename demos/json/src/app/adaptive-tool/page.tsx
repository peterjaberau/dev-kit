'use client'
import { Container, Stack, HStack, Button, IconButton, Icon, Flex, Box, Center } from "@chakra-ui/react"
import { FilesIcon, RocketIcon, BugIcon, SettingsIcon, CircleUserIcon, ComponentIcon  } from 'lucide-react'
import * as IconsKit from '@dev-kit/icons'
import { AdaptiveTool as Tool } from './components'
import { initiateRegistry } from './register'
import { getRegistryNames, } from '#plugins'
initiateRegistry()

export default function Page() {
  return (
    <Center px={40} py={10} h="100vh">
      <Tool.Root
        input={{
          plugins: [],
          data: {},
        }}
        css={{ boxShadow: "sm", borderRadius: "md" }}
      >
        <Tool.Sidebar h={"full"}>
          <Tool.SidebarList>
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand onClick={() => console.log('---getRegistryNames', getRegistryNames())}>
                {/*home*/}
                <IconsKit.HomeIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>

            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Json*/}
                <IconsKit.BracesIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Content*/}
                <FilesIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Dev tools*/}
                <RocketIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
          </Tool.SidebarList>
          <Tool.SidebarList justifyContent="center">
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Debug*/}
                <BugIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*icons*/}
                <ComponentIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
          </Tool.SidebarList>
          <Tool.SidebarList justifyContent="flex-end">
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Settings*/}
                <SettingsIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
            <Tool.SidebarItem>
              <Tool.SidebarItemCommand>
                {/*Profile*/}
                <CircleUserIcon />
              </Tool.SidebarItemCommand>
            </Tool.SidebarItem>
          </Tool.SidebarList>
        </Tool.Sidebar>
      </Tool.Root>
    </Center>
  )
}
