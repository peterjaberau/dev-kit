import { Container, Stack, HStack, Button, IconButton, Icon, Flex, Box, Center } from "@chakra-ui/react"
import { forwardRef } from "react"
import { AdaptiveTool } from './components'

export default function Page() {
  return (
    <Center px={40} py={10} h="100vh">
      <AdaptiveTool.Root css={{ boxShadow: "sm", borderRadius: "md" }}>
        <AdaptiveTool.Sidebar h={"full"}>
          <AdaptiveTool.SidebarList>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
          </AdaptiveTool.SidebarList>
          <AdaptiveTool.SidebarList justifyContent="center">
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
          </AdaptiveTool.SidebarList>
          <AdaptiveTool.SidebarList justifyContent="flex-end">
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
            <AdaptiveTool.SidebarItem>I</AdaptiveTool.SidebarItem>
          </AdaptiveTool.SidebarList>
        </AdaptiveTool.Sidebar>
      </AdaptiveTool.Root>
    </Center>
  )
}
