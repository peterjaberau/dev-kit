import { Card, Flex, HStack } from "@chakra-ui/react"
import { isValidElement, cloneElement } from "react"
import { Title } from "./title"
import { ActionInspect } from "./action.inspect"
import { ActionList } from "./action.list"
import { ActionItem } from "./action.item"
import { ScrollArea } from "#adaptive/components/ui/scoll-area"

interface ActionProps {
  label?: string
  icon?: any
  trigger?: (e: any) => void
  render?: any
  [key: string]: any
}

export const Root = ({
  title,
  actions,
  inspect,
  children,
  css,
  ...rest
}: {
  title: string
  actions?: ActionProps[]
  inspect?: any
  children?: any
  [key: string]: any
}) => {
  const inspectHandler = (e: any) => console.log(`[INSPECT ${title}]----->`, inspect)

  return (
    <Card.Root size={"sm"} h={"full"} w={"full"} css={{...css}} {...rest}>
      <Card.Header borderBottom={"1px solid"} borderBottomColor={"border"} pb={3}>
        <HStack>
          <HStack flex={1}>
            <Title>{title}</Title>
          </HStack>
          {actions && (
            <ActionList>
              {actions.map(
                (action, i) => {
                  return <ActionItem key={i} {...action} />
                },

                // isValidElement(action) ? cloneElement(action, { key: action.key ?? i }) : action,
              )}
            </ActionList>
          )}
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
