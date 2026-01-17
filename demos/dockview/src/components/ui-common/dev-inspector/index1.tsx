import { Card, Flex, HStack } from "@chakra-ui/react"
import { isValidElement, cloneElement } from "react"
import { Title } from "./title"
import { ActionInspect } from "./action.inspect"
import { ActionList } from "./action.list"
import { ScrollArea } from "./scoll-area"

const Index = ({
  title,
  actions,
  inspect,
  children,
}: {
  title: string
  actions: any[]
  inspect?: any
  children?: any
}) => {
  const inspectHandler = (e: any) => console.log(`[INSPECT ${title}]----->`, inspect)

  return (
    <Card.Root size={"sm"} h={"full"} w={"full"}>
      <Card.Header borderBottom={"1px solid"} borderBottomColor={"border"} pb={3}>
        <HStack>
          <HStack>
            <Title>{title}</Title>
          </HStack>
          <ActionList>
            {actions.map((action, i) =>
              isValidElement(action) ? cloneElement(action, { key: action.key ?? i }) : action,
            )}
          </ActionList>
        </HStack>
      </Card.Header>
      <Card.Body p={0} pt={6} backgroundColor={"bg.subtle"}>
        <Flex
          css={{
            height: 0,
            overflow: "hiddlen",
            flexGrow: 1,
          }}
        >
          <ScrollArea>{children}</ScrollArea>
        </Flex>
      </Card.Body>
      <Card.Footer>
        <ActionInspect onClick={inspectHandler}>Inspect</ActionInspect>
      </Card.Footer>
    </Card.Root>
  )
}
export default Index
