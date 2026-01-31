import { chakra, Menu, Flex, Button, Portal, Avatar, Box, Badge } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"

const ItemMenuSelector = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" focusRing={"none"}>
          <Avatar.Root variant={"solid"} colorPalette={"blue"} size={"2xs"}>
            <Avatar.Fallback name="Default workspace" />
          </Avatar.Root>
          Default workspace
          <LuChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Workspaces</Menu.ItemGroupLabel>
              <Menu.Item value="default">
                <Avatar.Root variant={"solid"} colorPalette={"blue"} size={"2xs"}>
                  <Avatar.Fallback name="Default workspace" >D</Avatar.Fallback>
                </Avatar.Root>
                <Box flex="1">Default Workspace</Box>
                <Menu.ItemCommand>
                  <Badge>Sandbox</Badge>
                </Menu.ItemCommand>
              </Menu.Item>

              <Menu.Item value="personal">
                <Avatar.Root variant={"solid"} colorPalette={"blue"} size={"2xs"}>
                  <Avatar.Fallback name="My Personal Workspace">P</Avatar.Fallback>
                </Avatar.Root>
                <Box flex="1">My Personal Workspace</Box>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const Root = ({children}: any) => {
  return (
    <Flex data-scope="header" css={{ h: "56px", alignItems: "center" }}>
      {children}
    </Flex>
  )
}

const SectionLeft = ({ children }: any) => {
  return <Flex css={{ flex: 1, alignItems: "center", px: 3 }}>{children}</Flex>
}

const SectionCenter = ({ children }: any) => {
  return <Flex css={{ flex: 1, alignItems: "center", justifyContent: "center", px: 3 }}>{children}</Flex>
}

const SectionRight = ({ children }: any) => {
  return <Flex css={{ flex: 1, alignItems: "center", justifyContent: "flex-end", px: 3 }}>{children}</Flex>
}

export const Wrapper = ({ children }: any) => {
  return (
    <Flex
      data-scope="header-wrapper"
      css={{
        position: "sticky",
        top: "0",
        right: "0",
        left: "0",
        flexBasis: "auto",
        flexDirection: "column",
        flexGrow: 0,
        shrink: "0",
        borderBottomWidth: "1px",
        borderBottomColor: "border",
      }}
    >
      {children}
    </Flex>
  )
}

export const Header = {
  Root,
  Wrapper,
  SectionLeft,
  SectionCenter,
  SectionRight,
  ItemMenuSelector,
}

