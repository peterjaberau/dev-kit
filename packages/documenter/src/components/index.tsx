import { chakra, IconButton, Icon, Button, Container, Center, Stack, HStack, Text, Splitter } from "@chakra-ui/react"
import {
  LuLink as LinkIcon,
  LuExpand as ExpandIcon,
  LuCode as CodeIcon,
  LuCopy as CopyIcon,
  LuPencil as EditCodeIcon,
} from "react-icons/lu"
import {
  PiSquareSplitHorizontalBold as HorizontalIcon,
  PiSquareSplitVerticalBold as VerticalIcon,
} from "react-icons/pi"
import ResizablePanes from "@turtle-panes/react"
import "@turtle-panes/react/style"

export const Toolbar = ({ children }: any) => {
  return <HStack flex={1}>{children}</HStack>
}

export const PreviewToolbar = () => {
  return (
    <HStack
      data-scope={"preview-toolbar"}
      flex={1}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid"}
      borderBottomColor={"border"}
    >
      <HStack flex={1} justifyContent={"flex-start"} alignItems={"center"}>
        <IconButton size={"xs"} variant={"ghost"}>
          <LinkIcon />
        </IconButton>
        <Text textStyle={"xs"}>Preview</Text>
      </HStack>
      <HStack flex={1} justifyContent={"flex-end"} alignItems={"center"}>
        <Button size={"xs"} variant={"ghost"}>
          <ExpandIcon />
          <Text textStyle={"xs"}>Enter Full Screen Mode</Text>
        </Button>
        <Button size={"xs"} variant={"ghost"}>
          <CodeIcon />
          <Text textStyle={"xs"}>Hide Code</Text>
        </Button>
      </HStack>
    </HStack>
  )
}
export const Preview = ({ children }: any) => {
  return (
    <Stack data-scope={"preview"} px={2}>
      {children}
    </Stack>
  )
}

export const EditorToolbar = () => {
  return (
    <HStack data-scope={"editor-toolbar"} flex={1} justifyContent={"space-between"} alignItems={"center"}
    borderBottom={'1px solid'} borderBottomColor={"border"}

    >
      <HStack flex={1} justifyContent={"flex-start"} alignItems={"center"}>
        <IconButton size={"xs"} variant={"ghost"}>
          <CopyIcon />
          <Text textStyle={"xs"}>Copy Code</Text>
        </IconButton>
      </HStack>
      <HStack flex={1} justifyContent={"flex-end"} alignItems={"center"}>
        <Button size={"xs"} variant={"ghost"}>
          <EditCodeIcon />
          <Text textStyle={"xs"}>Edit Code</Text>
        </Button>
        <Button size={"xs"} variant={"ghost"}>
          <VerticalIcon />
          <Text textStyle={"xs"}>Move to bottom</Text>
        </Button>
      </HStack>
    </HStack>
  )
}
export const Editor = ({ children }: any) => {
  return (
    <Stack data-scope={"editor"} px={2}>
      {children}
    </Stack>
  )
}




