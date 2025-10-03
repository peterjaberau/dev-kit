"use client"
import { Button, Container, Center, HStack, SimpleGrid, GridItem, Text } from "@chakra-ui/react"
import { useStore } from "#store"

export const ExampleStore = () => {
  const [storeState, storeRef]: any = useStore()

  return (
    <Container>
      <Center height={"100vh"}>
        <SimpleGrid columns={1} gap={10}>
          <GridItem>
            <Text textStyle="7xl" textAlign="center">
              {storeState.context.count}
            </Text>
          </GridItem>
          <GridItem>
            <HStack>
              <Button size={"xl"} onClick={() => storeRef.trigger.inc({ by: 1 })}>
                + 1
              </Button>

              <Button size={"xl"} onClick={() => storeRef.trigger.inc({ by: 3 })}>
                + 3
              </Button>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </Center>
    </Container>
  )
}
