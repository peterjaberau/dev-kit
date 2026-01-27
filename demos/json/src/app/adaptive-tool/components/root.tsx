import { chakra, Container, Stack, HStack, Button, IconButton, Icon, Flex, Box, SimpleGrid, GridItem } from "@chakra-ui/react"
import { forwardRef } from "react"
import { SystemProvider } from '../actors'


const RootImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, css, ...rest } = props

  return (
    <SystemProvider {...input}>
      <Box data-scope={"root"} ref={ref} css={{ width: "100%", height: "full", overflow: "hiddlen", ...css }} {...rest}>
        {children}
      </Box>
    </SystemProvider>
  )
}

export const Root = forwardRef(RootImpl)

export const Sidebar = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <Stack ref={ref} css={{ width: "50px", borderRight: "1px solid", borderRightColor: "border", ...css }} {...rest}>
      {children}
    </Stack>
  )
})

export const SidebarList = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <Stack ref={ref} columns={1} css={{ flex: 1, py:2, ...css }} {...rest}>
      <SimpleGrid>{children}</SimpleGrid>
    </Stack>
  )
})

export const SidebarItem = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <GridItem ref={ref} css={{ ...css, justifySelf: 'center' }} {...rest}>
      {children}
    </GridItem>
  )
})

export const SidebarItemCommand = forwardRef((props: any, ref: any) => {
  const { children, css, open = false, ...rest } = props

  return (
    <IconButton ref={ref} css={{ ...css }} {...rest} variant={open ? "surface" : "ghost"}>
      {children}
    </IconButton>
  )
})
