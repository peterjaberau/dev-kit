import { Card, Flex, HStack, Stack } from "@chakra-ui/react"
import { ScrollArea } from "./scoll-area"

export const WrapperWithScrollArea = ({
  children,
}: {
  children: React.ReactNode
}) => {
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
              {children}
            </Stack>
          </ScrollArea>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
