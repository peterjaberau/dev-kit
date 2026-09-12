"use client"

import { chakra, Card, Container, Flex, ScrollArea as ChakraScrollArea, Stack } from "@chakra-ui/react"

export interface ScrollAreaProps {
  [key: string]: any
}

export const ScrollArea = ({ children, css, ...rest }: ScrollAreaProps) => {
  return (
    <Container minW={"full"} p={0} w={"full"} {...rest} asChild>
      <ChakraScrollArea.Root variant={"hover"} size={"xs"}>
        <ChakraScrollArea.Viewport>
          <ChakraScrollArea.Content css={{ justifyContent: "center" }} h={"full"} px={0} py={0}>
            {children}
          </ChakraScrollArea.Content>
        </ChakraScrollArea.Viewport>
        <ChakraScrollArea.Scrollbar />
      </ChakraScrollArea.Root>
    </Container>
  )
}

export const WrapperWithScrollArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card.Root
      data-name="wrapper-with-scroll-area"
      size={"sm"}
      h="100%"
      w="full"
      display="flex"
      flexDirection="column"
      css={{
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <Card.Body p={0} flex="1" display="flex" overflow="hidden">
        <Flex
          css={{
            px: 0,
            height: 0,
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <ScrollArea
            css={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Stack minH={"100%"} justifyContent={"start"} alignItems={"center"} w={"full"} p={1}>
              <chakra.div
                css={{
                  width: "100%",
                  height: "100%",
                  minWidth: 0,
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                {children}
              </chakra.div>
            </Stack>
          </ScrollArea>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
