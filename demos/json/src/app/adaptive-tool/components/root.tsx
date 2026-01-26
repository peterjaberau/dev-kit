import { Container, Stack, HStack, Button, IconButton, Icon, Flex, Box, SimpleGrid, GridItem } from "@chakra-ui/react"
import { forwardRef } from "react"


export const Root = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return <Box data-scope={'root'} ref={ref} css={{ width: "100%", height: "full", overflow: "hiddlen", ...css }} {...rest}>{children}</Box>
})

export const Sidebar = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <Stack ref={ref} css={{ width: "50px", borderRight: '1px solid', borderRightColor: 'border', ...css }} {...rest}>
      {children}
    </Stack>
  )
})

export const SidebarList = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <Stack ref={ref} columns={1} css={{ flex: 1, ...css }} {...rest}>
      {children}
    </Stack>
  )
})

export const SidebarItem = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <Box ref={ref} css={{ ...css }} {...rest}>
      {children}
    </Box>
  )
})
