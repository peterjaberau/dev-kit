import { Card, Flex, HStack, Stack } from "@chakra-ui/react"
import { ScrollArea } from "./scoll-area"

export const WrapperWithScrollArea = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Card.Root size={"sm"} h="100%" w="full" display="flex" flexDirection="column">
      <Card.Body
        p={0}
        flex="1"
        display="flex"
        overflow="hidden"

        css={{
          backgroundColor: "transparent"
        }}
      >
        <Flex
          css={{
            px: 0,
            height: 0,
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <ScrollArea>
            <Stack  minH={'100%'} justifyContent={"start"} alignItems={"center"} w={"full"} p={4}>
              {children}
            </Stack>
          </ScrollArea>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
