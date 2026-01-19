import { Card, Flex, HStack, Stack } from "@chakra-ui/react"
import { ScrollArea } from "./scoll-area"
import { ComponentRenderer } from "#adaptive/registry"

export const CardWithScrollArea = ({
  children,
  title,
  variant = "transparent",
}: {
  children: React.ReactNode
  title: string
  variant?: "subtle" | "panel" | "transparent"
}) => {
  return (
    <Card.Root size={"sm"} h={"full"} w={"full"}>
      <Card.Header borderBottom={"1px solid"} borderBottomColor={"border"} pb={3}>
        <HStack>
          <HStack flex={1}>
            <Card.Title>{title}</Card.Title>
          </HStack>
          <HStack>{/*  actions here */}</HStack>
        </HStack>
      </Card.Header>
      <Card.Body
        p={0}
        css={{
          ...(variant === "subtle"
            ? { backgroundColor: "bg.subtle" }
            : variant === "panel"
              ? { backgroundColor: "bg.panel" }
              :  {backgroundColor: "transparent"}),
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
            <Stack justifyContent={"start"} alignItems={"center"} w={"full"} p={4}>
              {children}
            </Stack>
          </ScrollArea>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
